prestoApp.directive("draggable", [function () {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            var jElm = elm;
            var options = scope.$eval(attrs.draggableOptions);
            var draggableDragEnded = scope.$eval(attrs.draggableDragEnded);

            var handlers = {
                onDragStart: function(e) {

                    jElm.addClass("dragging");

                    var dataTransfer = e.originalEvent != null ? e.originalEvent.dataTransfer : e.dataTransfer;
                    dataTransfer.effectAllowed = options.effectAllowed;

                    var data = {
                        target: scope.$eval(attrs.draggableModel),
                        originalKey: scope.$eval(attrs.draggableKey)
                    };
                    var jsonString = angular.toJson(data);
                    
                    dataTransfer.setData(options.itemType, jsonString);

                },
                onDragEnd: function(e) {
                    if (e.preventDefault) {
                        e.preventDefault();
                    }
                    jElm.removeClass("dragging");

                    if (draggableDragEnded) {

                        var dataTransfer = e.originalEvent != null ? e.originalEvent.dataTransfer : e.dataTransfer;

                        var dragKey = scope.$eval(attrs.draggableKey);

                        draggableDragEnded(dragKey, dataTransfer.dropEffect);
                    }
                }
            };

            elm.attr("draggable", "true");
            elm.bind("dragstart", handlers.onDragStart);
            elm.bind("dragend", handlers.onDragEnd);
        }
    };

}]);


prestoApp.directive("droppable", [function () {

    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            var jElm = elm;
            var options = scope.$eval(attrs.droppableOptions);

            var isAllowed = function(transferType) {
                var result = (options.typesAllowed.indexOf(transferType) != -1)
                    ? true
                    : false;
                return result;
            };

            var findDataKey = function(dataTransfer) {
                for (var i = 0; i < options.typesAllowed.length; i++) {

                    if (angular.isFunction(dataTransfer.types.indexOf)) {
                        if (dataTransfer.types.indexOf(options.typesAllowed[i]) != -1) {
                            return options.typesAllowed[i];
                        }
                    } else {
                        if (dataTransfer.types.contains(options.typesAllowed[i])) {
                            return options.typesAllowed[i];
                        }
                    }
                }
                return -1;
            };

            var handlers = {
                onDropleave: function(e) {
                    var dataTransfer = e.originalEvent != null ? e.originalEvent.dataTransfer : e.dataTransfer;

                    dataTransfer.dropEffect = "none";

                    jElm.removeClass("drag-over-top");
                    jElm.removeClass("drag-over-bottom");
                },

                onDragEnter: function(e) {
                    if (e.preventDefault) {
                        e.preventDefault();
                    }

                    var dataTransfer = e.originalEvent != null ? e.originalEvent.dataTransfer : e.dataTransfer;

                    if (isAllowed(dataTransfer.types[0])) {
                        dataTransfer.dropEffect = attrs.dropzone;
                    }
                },

                onDragOver: function(e) {
                    if (e.preventDefault) {
                        e.preventDefault();
                    }
                    jElm.removeClass("drag-over-top");
                    jElm.removeClass("drag-over-bottom");

                    var dataTransfer = e.originalEvent != null ? e.originalEvent.dataTransfer : e.dataTransfer;
                    if (isAllowed(dataTransfer.types[0])) {

                        var middleY = jElm.height() / 2;

                        if (e.originalEvent.offsetY > middleY) {
                            jElm.addClass("drag-over-bottom");
                        } else {
                            jElm.addClass("drag-over-top");
                        }

                        dataTransfer.dropEffect = attrs.dropzone;

                        return false;
                    }

                    return true;
                },

                onDropped: function(e) {

                    if (e.stopPropagation) {
                        e.stopPropagation();
                    }

                    var dataTransfer = e.originalEvent != null ? e.originalEvent.dataTransfer : e.dataTransfer;

                    dataTransfer.dropEffect = attrs.dropzone;

                    var direction = "bottom";

                    if (jElm.hasClass("drag-over-top")) {
                        direction = "top";
                    }

                    jElm.removeClass("drag-over-top");
                    jElm.removeClass("drag-over-bottom");

                    var afterDroppedHandler = scope.$eval(attrs.afterDropped);
                    if (afterDroppedHandler) {

                        var dataKey = findDataKey(dataTransfer);
                        if (dataKey == -1) {
                            console.error('something went wrong finding the datakey for the drag/drop: ');
                            return true;
                        }
                        var jsonDataStr = dataTransfer.getData(dataKey);

                        if (jsonDataStr) {

                            var data =
                            {
                                source: angular.fromJson(jsonDataStr),
                                targetDirection: direction,
                                targetScope: scope
                            };

                            afterDroppedHandler(data, dataTransfer.dropEffect);

                            return false;
                        }
                    }
                    return true;
                }
            };
            elm.bind("dragenter", handlers.onDragEnter);
            elm.bind("dragover", handlers.onDragOver);
            elm.bind("dragleave", handlers.onDropleave);
            elm.bind("drop", handlers.onDropped);

        },
    };
}]);
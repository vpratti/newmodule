// Attributes on this directive height-equals(jQuery Selector), expandable(true/false), offset-height(height in px)
//
// This Directive sets the height based on it's attribute input.
// Input needs to be set to a selector as in jquery with either a prepending '#' or '.'
// Checks for attribute 'offset-height'.  If attribute exists, reduces new height 
// by that number.
// 
// 
// Created by Andrew Moch <amoch@gannet.com>

prestoApp.directive("heightEquals", [function () {
    return {
        restrict: 'A',
        link: function ($scope, elm, attrs) {
            
            setTimeout(function () {
                var newHeight = $(attrs.heightEquals).height();
                var offsetHeight = 0;
                var expandable = attrs.autoHeight;
                var plusOrMin = newHeight - offsetHeight;
                
                if (attrs.expandable) {
                    expandable = attrs.expandable;
                }

                if (attrs.offsetHeight) {
                    offsetHeight = attrs.offsetHeight;
                    if (offsetHeight != 0) {
                        plusOrMin = parseInt(newHeight) + parseInt(offsetHeight);
                    }
                }
                
                if (expandable == true) {
                    $(elm).css('min-height', plusOrMin);
                } else {
                    $(elm).height(plusOrMin);
                }
            }, 1000);
        }
    };
}]);
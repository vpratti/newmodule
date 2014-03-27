prestoApp.filter('runtime', function() {
    return function(input) {

        if (input == 0) {
            return '00:00:00';
        }

        function padNum(number) {
            return (number < 10 ? '0' : '') + number;
        }
        
        function secondsToString(miliseconds) {
            //var numdays = Math.floor(miliseconds / 31536000);
            var numhours = Math.floor((miliseconds % 31536000) / 86400);
            var nummin = Math.floor(((miliseconds % 31536000000) % 86400) / 3600);
            var numseconds = Math.floor((((miliseconds % 31536000000) % 86400) % 3600) / 60);
            //var nummiliseconds = (((miliseconds % 31536000000) % 86400) % 3600) % 60;

            return padNum(numhours) + ':' + padNum(nummin) + ":" + padNum(numseconds);
        }

        return secondsToString(input);
    };
});
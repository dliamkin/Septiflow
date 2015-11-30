septiflowAppRouter.controller("gpsController", ['$scope', '$timeout', '$location', 'modelsrv', '$routeParams', function ($scope, $timeout, $location, modelsrv, $routeParams) {
    $scope.message = 'Everyone come and see how good bacon is!';

    initialize();

    // Application Constructor
    function initialize() {

        //alert('GPS Initialized');

        navigator.geolocation.getCurrentPosition(onSuccess, onError);

    };
    // Called when a photo is successfully retrieved
    //
    function onSuccess(position) {

        var element = document.getElementById('geolocation');

        element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' +
                            'Longitude: ' + position.coords.longitude + '<br />' +
                            'Altitude: ' + position.coords.altitude + '<br />' +
                            'Accuracy: ' + position.coords.accuracy + '<br />' +
                            'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
                            'Heading: ' + position.coords.heading + '<br />' +
                            'Speed: ' + position.coords.speed + '<br />' +
                            'Timestamp: ' + position.timestamp + '<br />';
    };
    // Called if something bad happens.
    //
    function onError(message) {
        //alert('Failed because: ' + message);
    };


}]);
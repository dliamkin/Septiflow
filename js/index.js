var app = {

    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        if (window.location.host.toLocaleLowerCase() == 'localhost' ||
            window.location.host.toLocaleLowerCase() == 'localhost:3000') {
            angular.bootstrap(document, ['septiflowApp']);
        }
        else {
            document.addEventListener('deviceready', app.onDeviceReady, false);
        }
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        if (typeof device != 'undefined') {
            console.log('This app is running on ' + device.platform);
            app._runningOnDevice = true;
            angular.bootstrap(document, ['septiflowApp']);  /////--------------->ANGULAR INITIALIZES HERE
            camera.initialize();
        }
        else {
            app.logError(me, 'onDeviceReady', new Error('The onDeviceReady event fired, but the device object is undefined'));
            return;
        }
    }
};
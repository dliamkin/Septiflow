septiflowAppRouter.controller("gpsnavController", ['$scope', '$timeout', '$location', 'modelsrv', '$routeParams', function ($scope, $timeout, $location, modelsrv, $routeParams) {
    var transportModes = {
        "android": ["driving", "walking", "transit", "bicycling"],
        "windows": ["driving", "walking", "transit"],
        "ios-google-maps": ["driving", "walking", "transit", "bicycling"],
        "ios-apple-maps": ["driving", "walking"]
    };

    function alert2(msg) {
        //alert() is not available in the Windows platform, use org.apache.cordova.dialogs i.e.
        //Instead of this if/else code, you might want to use the org.apache.cordova.dialogs plugin and call instead navigator.notification.alert in all platforms.
        if ('MSApp' in window) {
            console.log(msg);
        }
        else {
            alert(msg);
        }
    }

    function onSuccess() {
        alert2("Successfully launched navigator");
    }

    function onError(errMsg) {
        alert2("Error launching navigator: " + errMsg);
    }

    function extendDefaultOptions(opts) {
        var defaults = {};
        if (platform === "ios") {
            defaults.preferGoogleMaps = $('body.ios #prefer-google-maps input').prop('checked');
            defaults.enableDebug = true;
        } else if (platform === "android") {
            defaults.navigationMode = $('body.android #navigation-mode select').val();
        }

        return $.extend(defaults, opts);
    }

    function setTransportModes() {
        var modes;
        var $select = $('select.modes');
        switch (platform) {
            case "android":
                $select.prop('disabled', $('body.android #navigation-mode select').val() === "maps");
                modes = transportModes["android"];
                break;
            case "windows":
                modes = transportModes["windows"];
                break;
            case "ios":
                if ($('#prefer-google-maps input').prop('checked')) {
                    modes = transportModes["ios-google-maps"];
                } else {
                    modes = transportModes["ios-apple-maps"];
                }
                break;
        }
        $select.empty();
        for (var i = 0; i < modes.length; i++) {
            var mode = modes[i];
            $select.append($('<option value="' + mode + '">' + mode + '</option>'));
        }
    }

    $scope.init = function () {
        var platform;
        platform = device.platform.toLowerCase();
        if (platform.match(/win/)) {
            platform = "windows";
        }
        $('body').addClass(platform);

        launchnavigator.navigate($("1424 Hill Ave. Melbourne, Florida 32940").val(), null, onSuccess, onError, extendDefaultOptions());

        $('body.ios #prefer-google-maps input').change(setTransportModes);

        if (platform === "ios") {
            // Check if Google Maps is available on iOS device
            launchnavigator.isGoogleMapsAvailable(function (available) {
                console.log("Google Maps IS" + (available ? " " : " NOT ") + "available");
                $('#prefer-google-maps input').prop('disabled', !available);
                if (!available) {
                    $('#prefer-google-maps label').css('text-decoration', 'line-through');
                }
            });
        }

        $('body.android #navigation-mode select').change(function () {
            $('input.slat, input.slon, input.sname').prop('disabled', $(this).val() === "turn-by-turn");
            setTransportModes();
        });
        setTransportModes();

    }
}]);
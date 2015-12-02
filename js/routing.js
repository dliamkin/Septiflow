septiflowAppRouter = angular.module('septiflowApp', ['ngRoute']);
//septiflowAppRouter = angular.module("Demo", ["ngAnimate"]);

septiflowAppRouter.service('modelsrv', function () { return new model(); });



septiflowAppRouter.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'home.html',
            controller: 'homeController'
        })

        .when('/jobs', {
            templateUrl: 'jobs.html',
            controller: 'jobsController'
        })

        .when('/jobssample', {
            templateUrl: 'jobssample.html',
            controller: 'jobsController'
        })

        .when('/gps', {
            templateUrl: 'gps.html',
            controller: 'gpsController'
        })

        .when('/gpsnav', {
            templateUrl: 'gpsnav.html',
            controller: 'gpsnavController'
        })

        .when('/addingjob', {
            templateUrl: 'addingjob.html',
            controller: 'addingjobController'
        });
});

// The invoice displayed when the user first uses the app
septiflowAppRouter.constant('DEFAULT_INVOICE', {
    items1: [
      
    ],
    items2: [
      
    ],
    items3: [
      
    ]

});

// Service for accessing local storage
septiflowAppRouter.service('LocalStorage', [function () {

    var Service = {};

    // Checks to see if an invoice is stored
    var hasInvoice = function () {
        return !(localStorage['invoice'] == '' || localStorage['invoice'] == null);
    };

    // Returns a stored invoice (false if none is stored)
    Service.getInvoice = function () {
        if (hasInvoice()) {
            return JSON.parse(localStorage['invoice']);
        } else {
            return false;
        }
    };

    Service.setInvoice = function (invoice) {
        localStorage['invoice'] = JSON.stringify(invoice);
    };

    // Clears a stored invoice
    Service.clearinvoice = function () {
        localStorage['invoice'] = '';
    };

    // Clears all local storage
    Service.clear = function () {
        localStorage['invoice'] = '';
        Service.clearLogo();
    };

    return Service;

}]);

septiflowAppRouter.service('Currency', [function () {

    var service = {};

}]);

septiflowAppRouter.service("modals", function ($rootScope, $q) {
    //modal variable
    var modal = {
        deferred: null,
        params: null
    };
    return ({
        open: open,
        params: params,
        resolve: resolve
    });
    function open(type, params, pipeResponse) {
        var previousDeferred = modal.deferred;
        modal.deferred = $q.defer();
        modal.params = params;
        if (previousDeferred && pipeResponse) {
            modal.deferred.promise
                .then(previousDeferred.resolve, previousDeferred.reject)
            ;
        } else if (previousDeferred) {
            previousDeferred.reject();
        }
        $rootScope.$emit("modals.open", type);
        return (modal.deferred.promise);
    }
    function params() {
        return (modal.params || {});
    }
    function resolve(response) {
        if (!modal.deferred) {
            return;
        }
        modal.deferred.resolve(response);
        modal.deferred = modal.params = null;
        $rootScope.$emit("modals.close");
    }
 });
septiflowAppRouter.directive("bnModals", function ($rootScope, modals) {
    return (link);
    function link(scope) {
        scope.subview = null;
        $rootScope.$on(
            "modals.open",
            function handleModalOpenEvent(event, modalType) {
                scope.subview = modalType;
            }
        );
        $rootScope.$on(
            "modals.close",
            function handleModalCloseEvent(event) {
                scope.subview = null;
            }
        );
    }
});
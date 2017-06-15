(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$mdThemingProvider'];

    function config($stateProvider, $urlRouterProvider, $mdThemingProvider) {

        $mdThemingProvider.theme('default')
            .primaryPalette('brown')
            .accentPalette('orange');

        $urlRouterProvider.otherwise("/");

        $stateProvider.state("/", {
            url: "/",
            templateUrl: "components/client/client.html",
            title: "TA9-exercise client",
            controller: "ClientController",
            controllerAs: "vm"
        });

        $stateProvider.state("admin", {
            url: "/admin",
            templateUrl: "components/admin/admin.html",
            title: "TA9-exercise admin",
            controller: "AdminController",
            controllerAs: "vm"
        });
    }

})();
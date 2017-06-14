(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
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
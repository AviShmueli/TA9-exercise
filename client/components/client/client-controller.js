(function () {
    'use strict';

    angular
        .module('app')
        .controller('ClientController', ClientController);

    ClientController.$inject = [
        '$rootScope', '$scope', 'server', '$state', '$interval'
    ];

    function ClientController($rootScope, $scope, server, $state, $interval) {

        var getOSName = function () {
            alert(navigator.appVersion);
            var OSName = "Unknown OS";
            if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
            if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
            if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
            if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";
            return OSName;
        }

        var getBrowserName = function () {
            var browserName = 'Unknown Browser';
            if (navigator.userAgent.indexOf("Opera") != -1) browserName = "Opera";
            if (navigator.userAgent.indexOf("MSIE") != -1) browserName = "Internet Explorer";
            if (navigator.userAgent.indexOf("Trident") != -1) browserName = "Internet Explorer";
            if (navigator.userAgent.indexOf("Edge") != -1) browserName = "Internet Edge";
            if (navigator.userAgent.indexOf("Chrome") != -1) {
                browserName = "Chrome";
            } else {
                if (navigator.userAgent.indexOf("Safari") != -1) browserName = "Safari";
            }
            if (navigator.userAgent.indexOf("Firefox") != -1) browserName = "Firefox";
            return browserName;
        }
        var vm = this;

        vm.title = $state.current.title;

        var currTime = new Date();
        var a = navigator.appVersion;
        vm.client = {
            localTime: currTime,
            timeZone: (currTime.getTimezoneOffset() / 60) + ' hours',
            OS: getOSName(),
            browser: getBrowserName()
        };

        server.registerNewClient(vm.client).then(function (result) {
            if(result.data !== undefined){
                vm.client = result.data;
            }
        }, function (error) {

        });

        $interval(function(){
            vm.client.localTime = new Date();
        }, 1000);


    }

})();
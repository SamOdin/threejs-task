(function () {
    
    angular
        .module('main', ['ui.router', 'oc.lazyLoad', 'ngResource', 'uiRouterStyles'])
        .config(mainConfig);

        mainConfig.$inject = [
            '$interpolateProvider',
            '$ocLazyLoadProvider',
            '$stateProvider',
            '$urlRouterProvider',
            '$locationProvider',
            '$httpProvider'
        ];

        function mainConfig($interpolateProvider,
                            $ocLazyLoadProvider,
                            $stateProvider,
                            $urlRouterProvider,
                            $locationProvider,
                            $httpProvider) {

            $interpolateProvider.startSymbol('[[').endSymbol(']]');
            $locationProvider.html5Mode(true).hashPrefix('!');
            initModules($ocLazyLoadProvider);
            initStates($stateProvider, $ocLazyLoadProvider);
            $httpProvider.defaults.withCredentials = true;
            $urlRouterProvider.otherwise('/');
        }
    
})();
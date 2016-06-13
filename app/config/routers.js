function initStates($stateProvider, $ocLazyLoadProvider) {
    $stateProvider
        .state('index', {
            url: '/',
            views: {
                'layout': {
                    controller: 'indexCtrl',
                    templateUrl: '/app/modules/index/views/layout.html',
                    resolve: resolveModule (['indexCtrl'])
                }
            }
        });

    function resolveModule(moduleName) {
        return {
            loadModules: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load(moduleName);
            }]
        }
    }

}
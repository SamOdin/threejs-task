function initModules($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        modules: [
            {
                name: 'indexCtrl',
                files: ['/app/modules/index/controllers/indexCtrl.js']
            }
        ]
    });
}
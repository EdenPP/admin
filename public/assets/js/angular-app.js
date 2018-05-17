/*   
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.5
Version: 1.9.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin-v1.9/admin/
*/

var colorAdminApp = angular.module('colorAdminApp', [
    'ui.router',
    'ui.bootstrap',
    'oc.lazyLoad'
]);

colorAdminApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('UserInterceptor');
}]);

colorAdminApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/index/index/index');
    // $urlRouterProvider.html5Mode(true);

    $stateProvider
        .state('login', {
            url: '/login',
            data: { pageTitle: '用户登录' },
            resolve: {
                service: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: [
                            'assets/plugins/gritter/css/jquery.gritter.css',
                            'assets/plugins/gritter/js/jquery.gritter.js'
                        ]
                    });
                }]
            },
            templateUrl: 'views/login.html'
        })
        .state('app', {
            url: '/index',
            templateUrl: 'template/app.html',
            abstract: true
        })

        /* 以下为 system 节 */
        .state('app.index', {
            url: '/index',
            template: '<div ui-view></div>',
            abstract: true
        })
        .state('app.index.index', {
            url: '/index/index',
            templateUrl: 'views/index.html',
            data: { pageTitle: '后台首页' },
            resolve: {}
        })

        /* 以下为 system 节 */
        .state('app.system', {
            url: '/system',
            template: '<div ui-view></div>',
            abstract: true
        })
        .state('app.system.setting_index', {
            url: '/setting/index',
            templateUrl: 'views/system/setting/index.html',
            data: { pageTitle: '系统设置' },
            resolve: {}
        })
        .state('app.system.setting_add', {
            url: '/setting/add',
            templateUrl: 'views/system/setting/add.html',
            data: { pageTitle: '添加设置' },
            resolve: {}
        })
        .state('app.system.admin_index', {
            url: '/admin/index',
            templateUrl: 'views/system/admin/index.html',
            data: {pageTitle: '管理员设置'}
        })
}]);

colorAdminApp.run(['$rootScope', '$state', 'setting', function($rootScope, $state, setting) {
    $rootScope.$state = $state;
    $rootScope.setting = setting;
}]);
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

colorAdminApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index/index/index');

    $stateProvider
        .state('index', {
            url: '/index',
            templateUrl: 'template/app.html',
            abstract: true
        })
        .state('index.index', {
            url: '/index',
            template: '<div ui-view></div>',
            abstract: true
        })
        .state('index.index.index', {
            url: '/index',
            templateUrl: 'views/index.html',
            data: { pageTitle: '后台首页' },
            resolve: {}
        })
        .state('login', {
            url: '/login',
            data: { pageTitle: '用户登录' },
            templateUrl: 'views/login.html'
        })
}]);

colorAdminApp.run(['$rootScope', '$state', 'setting', function($rootScope, $state, setting) {
    $rootScope.$state = $state;
    $rootScope.setting = setting;
}]);
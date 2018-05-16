/**
 * 后台管理系统
 * Controller 编辑
 * */
var blue		= '#348fe2',
    blueLight	= '#5da5e8',
    blueDark	= '#1993E4',
    aqua		= '#49b6d6',
    aquaLight	= '#6dc5de',
    aquaDark	= '#3a92ab',
    green		= '#00acac',
    greenLight	= '#33bdbd',
    greenDark	= '#008a8a',
    orange		= '#f59c1a',
    orangeLight	= '#f7b048',
    orangeDark	= '#c47d15',
    dark		= '#2d353c',
    grey		= '#b6c2c9',
    purple		= '#727cb6',
    purpleLight	= '#8e96c5',
    purpleDark	= '#5b6392',
    red         = '#ff5b57';


/* -------------------------------
   1.0 CONTROLLER - App
------------------------------- */
colorAdminApp.controller('appController', ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state) {

    // 跳转到登录界面，这样可以在登录后自动跳转到未登录之前的那个界面
    $rootScope.$on('userIntercepted',function(errorType){
        $state.go("login", {from:$state.current.name, w:errorType});
    });

    $scope.$on('$includeContentLoaded', function() {
        App.initComponent();
    });
    $scope.$on('$viewContentLoaded', function() {
        App.initComponent();
        App.initLocalStorage();
    });
    $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

        // 如果是进入登录界面则允许
        if(toState.name=='login') {
            return;
        }

        var token = localStorage.getItem('token');
        if(!token){
            // 取消默认跳转行为
            event.preventDefault();

            //跳转到登录界面
            $state.go("login", {
                from: fromState.name,
                w: 'notLogin'
            });
        }

        // reset layout setting
        $rootScope.setting.layout.pageSidebarMinified = false;
        $rootScope.setting.layout.pageFixedFooter = false;
        $rootScope.setting.layout.pageRightSidebar = false;
        $rootScope.setting.layout.pageTwoSidebar = false;
        $rootScope.setting.layout.pageTopMenu = false;
        $rootScope.setting.layout.pageBoxedLayout = false;
        $rootScope.setting.layout.pageWithoutSidebar = false;
        $rootScope.setting.layout.pageContentFullHeight = false;
        $rootScope.setting.layout.pageContentFullWidth = false;
        $rootScope.setting.layout.paceTop = false;
        $rootScope.setting.layout.pageLanguageBar = false;
        $rootScope.setting.layout.pageSidebarTransparent = false;
        $rootScope.setting.layout.pageWideSidebar = false;
        $rootScope.setting.layout.pageLightSidebar = false;
        $rootScope.setting.layout.pageFooter = false;
        $rootScope.setting.layout.pageMegaMenu = false;
        $rootScope.setting.layout.pageWithoutHeader = false;
        $rootScope.setting.layout.pageBgWhite = false;
        
        App.scrollTop();
        $('.pace .pace-progress').addClass('hide');
        $('.pace').removeClass('pace-inactive');
    });
    $scope.$on('$stateChangeSuccess', function() {
        Pace.restart();
        App.initPageLoad();
        App.initSidebarSelection();
        App.initLocalStorage();
        App.initSidebarMobileSelection();
    });
    $scope.$on('$stateNotFound', function() {
        Pace.stop();
    });
    $scope.$on('$stateChangeError', function() {
        Pace.stop();
    });
}]);



/* -------------------------------
   2.0 CONTROLLER - Sidebar
------------------------------- */
colorAdminApp.controller('sidebarController', function($scope, $http, $q, $rootScope, $state) {
    function getMenu() {
        var deferred = $q.defer();
        $http.get('/system/menu').success(function (resp) {
            deferred.resolve(resp);
        });
        return deferred.promise;
    }

    getMenu().then(function (data) {
        $scope.menu = data.data;
    }).then(function () {
        setTimeout(function () {
            App.initSidebar();
        })
    });
});



/* -------------------------------
   3.0 CONTROLLER - Right Sidebar
------------------------------- */
colorAdminApp.controller('rightSidebarController', function($scope, $rootScope, $state) {
    var getRandomValue = function() {
        var value = [];
        for (var i = 0; i<= 19; i++) {
            value.push(Math.floor((Math.random() * 10) + 1));
        }
        return value;
    };

    $('.knob').knob();

    var blue		= '#348fe2', green		= '#00acac', purple		= '#727cb6', red         = '#ff5b57';
    var options = { height: '50px', width: '100%', fillColor: 'transparent', type: 'bar', barWidth: 8, barColor: green };

    var value = getRandomValue();
    $('#sidebar-sparkline-1').sparkline(value, options);

    value = getRandomValue();
    options.barColor = blue;
    $('#sidebar-sparkline-2').sparkline(value, options);

    value = getRandomValue();
    options.barColor = purple;
    $('#sidebar-sparkline-3').sparkline(value, options);

    value = getRandomValue();
    options.barColor = red;
    $('#sidebar-sparkline-4').sparkline(value, options);
});

function alert(obj, content) {
    obj.add({
        title: '提示信息',
        text: content ? content : ''
    });
}

function success(obj, content) {
    obj.add({
        title: '成功提示',
        text: content ? content : ''
    });
}

function error(obj, content) {
    obj.add({
        title: '错误提示',
        text: content ? content : ''
    })
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/* -------------------------------
   4.0 CONTROLLER - Header
------------------------------- */
colorAdminApp.controller('headerController', function($scope, $http, $rootScope, $state) {

    $scope.loadUserProfile = function () {
        $http.get('/user/profile').success(function (res) {
            if (res.code != 200) {
                error($.gritter, '用户信息拉取失败');
                return false;
            }

            $rootScope.user = res.data;
        });
    };
    $scope.loadUserProfile();



    // 定义退出方法
    $scope.logout = function () {
        $http.get('/logout').success(function (res) {
            if (res && res.code == 200) {
                localStorage.clear();
                $state.go('login');
            }
        });
    }
});



/* -------------------------------
   5.0 CONTROLLER - Top Menu
------------------------------- */
colorAdminApp.controller('topMenuController', function($scope, $rootScope, $state) {
    setTimeout(function() {
        App.initTopMenu();
    }, 0);
});



/* -------------------------------
   6.0 CONTROLLER - Page Loader
------------------------------- */
colorAdminApp.controller('pageLoaderController', function($scope, $rootScope, $state) {
    App.initPageLoad();
});



/* -------------------------------
   7.0 CONTROLLER - Theme Panel
------------------------------- */
colorAdminApp.controller('themePanelController', function($scope, $rootScope, $state) {
    App.initThemePanel();
});



/* -------------------------------
   8.0 CONTROLLER - Dashboard v1
------------------------------- */
colorAdminApp.controller('dashboardController', function($scope, $http, $rootScope, $state) {

});

/* -------------------------------
   60.0 CONTROLLER - Login V3
------------------------------- */
colorAdminApp.controller('loginController', function($scope, $http, $rootScope, $state) {
    $rootScope.setting.layout.pageWithoutHeader = true;
    $rootScope.setting.layout.paceTop = true;
    $rootScope.setting.layout.pageBgWhite = true;

    var token = localStorage.getItem('token');
    if (token) {
        $state.go('app.index.index');
        return;
    }

    $scope.loginForm = {
        'email':        '',
        'password':     '',
        'remember':     ''
    };

    $scope.submitForm = function(form) {

        if (!$scope.loginForm.email || !$scope.loginForm.password) {
            error($.gritter, '请输入正确的用户名和密码');
            return;
        }

        if (!validateEmail($scope.loginForm.email)) {
            error($.gritter, '请输入正确的邮箱格式');
            return;
        }

        if ($scope.loginForm.password.length < 6) {
            error($.gritter, '用户名或密码错误');
            return;
        }

        $http.post('/login', form).success(function (resp) {
            if (resp.code != 200) {
                error($.gritter, '用户名或密码错误');
            } else {
                $.gritter.removeAll();
                localStorage.setItem('token', resp.data.token);
                success($.gritter, '登录成功');
                $state.go('app.index.index');
            }
        });

    };
});

/* -------------------------------
: system/admin/index
------------------------------- */
colorAdminApp.controller('system-admin-controller', ['$scope', '$http', '$state', 'Modal', function($scope, $http, $state, Modal) {

    $scope.showModal = function () {
        Modal.success('title');
    };

    $scope.admin = {};
    $scope.getList = function (page) {
        $http.get('/user/list', {
            params: {
                page: page
            }
        }).success(function (res) {
            $scope.admin = res.data;
            var info = res.data;
            $scope.currentPage = info.current_page;
            $scope.total = info.total;
            $scope.pageSize = info.per_page;
        });
    };

    $scope.DoCtrlPagingAct = function(text, page, pageSize, total) {
        $scope.getList(page);
    };

    $scope.getList(1);
}]);
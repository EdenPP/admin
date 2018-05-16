/*   
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.5
Version: 1.9.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin-v1.9/admin/
*/

/* Global Setting
------------------------------------------------ */

colorAdminApp.factory('setting', ['$rootScope', function($rootScope) {
    var setting = {
        layout: {
            pageSidebarMinified: false,
            pageFixedFooter: false,
            pageRightSidebar: false,
            pageTwoSidebar: false,
            pageTopMenu: false,
            pageBoxedLayout: false,
            pageWithoutSidebar: false,
            pageContentFullHeight: false,
            pageContentFullWidth: false,
            pageContentInverseMode: false,
            pageSidebarTransparent: false,
            pageWithFooter: false,
            pageLightSidebar: false,
            pageMegaMenu: false,
            pageBgWhite: false,
            pageWithoutHeader: false,
            paceTop: false
        }
    };
    
    return setting;
}]);

// Modal

colorAdminApp.factory('Modal', ['$modal', function ($modal) {
    var returnFunction = null;
    var Modal = function (options) {
        var _self = this, dialog = null;
        var icons = {
            alert: {
                icon: 'fa-info-circle',
                color: 'text-aqua'
            },
            success: {
                icon: 'fa-check-circle',
                color: 'text-green'
            },
            error: {
                icon: 'fa-times-circle',
                color: 'text-red'
            }
        };
        _self.open = function () {
            _self.dialog = $modal.open({
                templateUrl: '/template/modal.html',
                backdrop: 'static',
                controller: function ($scope) {
                    options.buttons = options.buttons || [{name: "确定", cmd: "ok"}];
                    var type = options.type && icons[options.type] ? options.type : 'alert';
                    $scope.icons = icons[type];
                    $scope.type = type;
                    $scope.title = options.title || '';
                    $scope.content = options.content || '';
                    $scope.buttons = [];
                    angular.forEach((options.buttons), function (button) {
                        button.click = function () {
                            this.event = this.event || angular.noop;
                            if (this.event(self) !== false) {
                                _self.dialog.close(this.cmd);
                            }
                        };
                        $scope.buttons.push(button);
                    });
                }
            });
            return _self.dialog.result;
        };
    };
    var simpleModal = function (params, type) {
        var title, content, buttons, modal;
        if (typeof params === 'string') {
            title = params;
            content = '';
        } else {
            title = params.title;
            content = params.content;
            buttons = params.buttons
        }
        modal = new Modal({
            type: type,
            title: title,
            content: content,
            buttons: buttons
        });
        return modal.open();
    };
    returnFunction = function (data) {
        return new Modal(data);
    };
    returnFunction.success = function (params) {
        return simpleModal(params, 'success');
    };
    returnFunction.alert = function (params) {
        return simpleModal(params, 'alert');
    };
    returnFunction.error = function (params) {
        return simpleModal(params, 'error');
    };
    return returnFunction;
}]);

// 拦截请求响应事件
colorAdminApp.factory('UserInterceptor', ["$q", "$rootScope", function ($q, $rootScope) {
    return {
        request:function(config){
            if (config.url && config.url.indexOf(".html") > 0) {
                return config;
            }

            var token = localStorage.getItem('token');
            if (token) {
                config.headers["Access-Token"] = token;
            }
            config.url = '/admin' + config.url;
            return config;
        },
        response: function (resp) {
            return resp;
        },
        responseError: function (response) {
            // 判断错误码，如果是未登录
            if(response.status == 401){
                // 清空用户本地token存储的信息，如果
                localStorage.setItem("token", '');
                // 全局事件，方便其他view获取该事件，并给以相应的提示或处理
                $rootScope.$emit("userIntercepted", "notLogin", response);
            } else if (data['code'] != 200) {
                console.warn("error message: " + data.message);
            }
            return $q.reject(response);
        }
    };
}]);
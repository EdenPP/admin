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

colorAdminApp.factory('Tip', function () {
   "use strict";

    function alert(content, type) {

        var image = 'assets/img/success.png';
        if (type == 'error') {
            image = 'assets/img/error.png';
        }
        var content = content || (type == 'success' ? '操作成功' : '操作失败');

        $.gritter.add({
            title: '提示',
            text: content,
            image: image,
            sticky: false,
            time: 3000
        });
    }

    return {
        success: function (content) {
            alert(content, 'success');
        },
        error: function (content) {
            alert(content, 'error');
        }
    };
});

// Modal
colorAdminApp.factory('Modal', function () {

    "use strict";

    var modal = function (options) {

        var icon = '';
        switch (options.type) {
            case 'alert':
                icon = 'text-info fa-info-circle';
                break;
            case 'error':
                icon = 'text-danger fa-times-circle';
                break;
            case 'success':
                icon = 'text-success fa-check-circle';
                break;
            default:
                icon = 'text-info fa-info-circle';
        }

        var targetModalHtml = ''+
            '<div class="modal fade" data-modal-id="global-modal-template">'+
            '    <div class="modal-dialog">'+
            '        <div class="modal-content">'+
            '            <div class="modal-header" style="border-bottom: none;">'+
            '                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>'+
            '                <h4 class="modal-title" style="font-size: 14px; font-weight: normal;"><i class="fa m-r-5 ' + icon + '"></i> ' + options.title + '</h4>'+
            '            </div>'+
            '            <div class="modal-body" style="font-size: 16px;">'+ options.content +
            '            </div>'+
            '            <div class="modal-footer">'+
            '                <a href="javascript:;" class="btn btn-sm btn-default" data-dismiss="modal"><i class="fa fa-close"></i> 取消</a>'+
            '                <a href="javascript:;" class="btn btn-sm btn-info" data-click="confirm-reset-local-storage"><i class="fa fa-check"></i> 确定</a>'+
            '            </div>'+
            '        </div>'+
            '    </div>'+
            '</div>';

        $('body').append(targetModalHtml);
        $(document).off('click').on('click', '[data-click=confirm-reset-local-storage]', function(e) {
            e.preventDefault();
            if (options.event) {
                options.event();
            }
            $('[data-modal-id="global-modal-template"]').modal('hide');
        });

        $(document).off('hidden.bs.modal').on('hidden.bs.modal', '[data-modal-id="global-modal-template"]', function(e) {
            $('[data-modal-id="global-modal-template"]').remove();
            $('body').remove('[data-modal-id="global-modal-template"]');
        });

        return {
            open: function () {
                $('[data-modal-id="global-modal-template"]').modal('show');
            }
        };
    };

    var simpleModal = function (params, type) {
        var content, event;
        if (typeof params === 'string') {
            content = params;
            event = null;
        } else {
            content = params.content || '';
            event = params.event || null;
        }

        var obj = new modal({
            'title': '提示信息',
            'type': type,
            'content': content,
            'event': event
        });
        return obj;
    };

    return {
        success: function (params) {
            simpleModal(params, 'success').open();
        },
        alert: function (params) {
            simpleModal(params, 'alert').open();
        },
        error: function (params) {
            simpleModal(params, 'error').open();
        }
    };
});

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
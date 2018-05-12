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

colorAdminApp.factory('UserInterceptor', ["$q","$rootScope", function ($q, $rootScope) {
    console.log('here');
    return {
        request:function(config){
            config.headers["Access-Token"] = localStorage.getItem('token');
            return config;
        },
        response: function (resp) {
            if (resp.data.code && resp.data.code == 403) {
                localStorage.removeItem('token');
                $rootScope.$emit("userIntercepted", "notLogin", resp);
            }
            return resp;
        },
        responseError: function (response) {
            console.log(response);
            return;
            var data = response.data;
            // 判断错误码，如果是未登录
            if(data["code"] == 403){
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
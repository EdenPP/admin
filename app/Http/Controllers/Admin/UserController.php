<?php
/**
 * Discription:
 *
 * User: bit
 * Date: 2018/5/15
 * Time: 下午5:57
 */

namespace App\Http\Controllers\Admin;


use App\Exceptions\ResponseException;
use App\Libs\MessageCode;
use App\Libs\Response;
use App\Services\AdminUserService;

class UserController extends AdminBaseController
{

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * 获取用户列表
     * @return \Illuminate\Http\JsonResponse
     */
    public function list()
    {
        $result = AdminUserService::getAdminUserList();
        return Response::success($result);
    }

    /**
     * 获取用户数据
     * @return \Illuminate\Http\JsonResponse
     * @throws ResponseException
     */
    public function profile()
    {
        $profile = $this->getToken('user');
        if (empty($profile)) {
            throw new ResponseException(MessageCode::INNER_ERROR);
        }

        return Response::success($profile);
    }

}
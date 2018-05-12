<?php
/**
 * Discription:
 *
 * User: bit
 * Date: 2018/5/11
 * Time: 上午12:41
 */

namespace App\Http\Controllers\Admin;

use App\Exceptions\ResponseException;
use App\Libs\Response;
use App\Services\AdminUserService;
use Illuminate\Http\Request;
use App\Libs\MessageCode;

class LoginController extends AdminBaseController
{

    /**
     * LoginController constructor.
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * 后台用户登录
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws ResponseException
     */
    public function login(Request $request)
    {
        $params = $request->post();
        if (empty($params['email']) || empty($params['password'])) {
            throw new ResponseException(MessageCode::PARAMETER_ERROR);
        }

        $success = AdminUserService::checkAdminUser($params['email'], $params['password']);
        if ($success) {
            // TODO save to session
        }

        $token = md5(123456);

        return Response::success(['token' => $token]);

    }

    /**
     * 退出
     * @return \Illuminate\Http\JsonResponse
     */
    public function logOut()
    {
        return Response::error(403);
    }

}
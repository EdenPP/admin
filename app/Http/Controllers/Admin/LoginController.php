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
use App\Libs\RedisKey;
use App\Libs\Response;
use App\Services\AdminUserService;
use Illuminate\Http\Request;
use App\Libs\MessageCode;
use Illuminate\Support\Facades\Redis;
use Webpatser\Uuid\Uuid;

class LoginController extends AdminBaseController
{

    /**
     * LoginController constructor.
     */
    public function __construct()
    {
        parent::__construct();
    }

    public function demo()
    {
        return 'here';
    }

    /**
     * 后台用户登录
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws ResponseException
     * @throws \Exception
     */
    public function login(Request $request)
    {
        $params = $request->post();
        if (empty($params['email']) || empty($params['password'])) {
            throw new ResponseException(MessageCode::PARAMETER_ERROR);
        }

        $user = AdminUserService::checkAdminUser($params['email'], $params['password']);
        if ($user) {
            unset($user['password'], $user['salt']);
            $token = Uuid::generate()->string;
            $this->initToken($token);
            $this->setToken('status', true);
            $this->setToken('user', $user);
            AdminUserService::update($user['id'], ['update_ip' => $request->ip()]);
            return Response::success(['token' => $token]);
        }

        throw new ResponseException(MessageCode::AD_INVALID);
    }

    /**
     * 退出
     * @throws ResponseException
     */
    public function logOut()
    {
        if ($this->removeToken()) {
            return Response::success();
        } else {
            throw new ResponseException(MessageCode::INNER_ERROR);
        }
    }

}
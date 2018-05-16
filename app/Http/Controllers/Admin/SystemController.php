<?php
/**
 * Discription:
 *
 * User: bit
 * Date: 2018/5/15
 * Time: 下午9:23
 */

namespace App\Http\Controllers\Admin;


use App\Libs\Response;
use App\Services\AdminMenuService;

class SystemController extends AdminBaseController
{

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * 拉取菜单
     * @throws \App\Exceptions\ResponseException
     */
    public function menu()
    {
        return Response::success(AdminMenuService::getMenu());
    }

}
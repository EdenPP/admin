<?php
/**
 * Discription:
 *
 * User: bit
 * Date: 2018/5/15
 * Time: 下午9:48
 */

namespace App\Services;


use App\Exceptions\ResponseException;
use App\Libs\MessageCode;
use App\Libs\Util;
use App\Model\AdminMenuModel;

class AdminMenuService
{

    protected static $menuList = [];

    /**
     * 获取菜单
     *
     * @return array
     * @throws ResponseException
     */
    public static function getMenu()
    {
        $menu = AdminMenuModel::getInstance()->getMenu();
        if ($menu->isEmpty()) {
            return [];
        }

        try {
            $menu = Util::objToArray($menu);
            $result = self::getTree($menu, 0);
        } catch (\Exception $e) {
            throw new ResponseException(MessageCode::INNER_ERROR);
        }

        return $result;
    }

    /**
     * 无限极分类
     *
     * @param $menu
     * @param int $pid
     * @return array
     */
    public static function getTree($menu, $pid = 0)
    {
        $list = [];
        foreach($menu as &$u){
            if($u['pid']== $pid){//父级分类id等于所查找的id
                $u['children'] = self::getTree($menu, $u['id']);
                $list[]=$u;
            }
        }
        return $list;
    }

}
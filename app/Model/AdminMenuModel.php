<?php
/**
 * Discription:
 *
 * User: bit
 * Date: 2018/5/15
 * Time: 下午9:46
 */

namespace App\Model;


use Illuminate\Support\Facades\DB;

class AdminMenuModel extends DB
{

    const ADMIN_MENU_TOP = 0;

    protected $table = 'admin_menu';

    private static $_instance;

    public static function getInstance(){
        if(self::$_instance == null) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function getMenu()
    {
        return DB::table($this->table)->orderBy('sort')->get();
    }

}
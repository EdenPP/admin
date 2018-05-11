<?php
/**
 * Discription:
 *
 * User: bit
 * Date: 2018/5/11
 * Time: 上午1:39
 */

namespace App\Model;

use Illuminate\Support\Facades\DB;

class AdminUserModel extends DB
{

    // 正常
    const ADMIN_STATUS_NORMAL = 6;
    // 冻结
    const ADMIN_STATUS_FREEZING = 5;
    // 待审
    const ADMIN_STATUS_PENDING = 1;

    protected $table = 'admin_user';

    private static $_instance;

    public static function getInstance(){
        if(self::$_instance == null) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
     * 通过用户邮箱获取用户数据
     *
     * @param $email
     * @return \Illuminate\Database\Eloquent\Model|null|object|static
     */
    public function getUserByEmail($email)
    {
        return DB::table($this->table)->where('email', $email)->first();
    }





}
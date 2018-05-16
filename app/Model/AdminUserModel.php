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

class AdminUserModel extends Model
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
     * 返回列表
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function list()
    {
        $model = DB::table($this->table)
            ->orderByDesc('id');
        return $model->paginate(parent::DEFAULT_PAGESIZE);
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

    /**
     * 修改数据
     * @param string $uid
     * @param array $data
     * @return int
     */
    public function update($uid, $data)
    {
        $data['update_time'] = date('Y-m-d H:i:s');
        return DB::table($this->table)->where('id', $uid)->update($data);
    }




}
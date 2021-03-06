<?php
/**
 * Discription:
 *
 * User: bit
 * Date: 2018/5/11
 * Time: 上午1:32
 */

namespace App\Services;

use App\Exceptions\ResponseException;
use App\Libs\MessageCode;
use App\Libs\Util;
use App\Model\AdminUserModel;

class AdminUserService
{

    public static function getAdminUserByEmail(string $email)
    {

    }

    /**
     * @return mixed
     */
    public static function getAdminUserList()
    {
        $result = AdminUserModel::getInstance()->list();
        return Util::objToArray($result);
    }

    /**
     * @param $uid
     * @param array $data
     * @return int
     */
    public static function update($uid, $data = [])
    {
        return AdminUserModel::getInstance()->where('id', $uid)->update($data);
    }

    /**
     * @param $email
     * @param $password
     * @return array
     * @throws ResponseException
     */
    public static function checkAdminUser($email, $password) :array
    {

        $user = AdminUserModel::getInstance()->getUserByEmail($email);
        if (!$user) {
            throw new ResponseException(MessageCode::AD_INVALID);
        }

        $encryptNowPass = self::encryptPassword($password, $user->salt);
        if ($user->password !== $encryptNowPass || $user->status < 0) {
            throw new ResponseException(MessageCode::AD_INVALID);
        }

        if ($user->status == AdminUserModel::ADMIN_STATUS_FREEZING) {
            throw new ResponseException(MessageCode::AD_USER_FREEZING);
        }

        return Util::objToArray($user);
    }

    /**
     * 密码加密
     * @param $password
     * @param $salt
     * @return string
     */
    public static function encryptPassword($password, $salt) :string
    {
        return md5($salt . $password . strrev($salt));
    }
}
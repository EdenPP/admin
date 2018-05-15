<?php
/**
 * Discription:
 *
 * User: bit
 * Date: 2018/5/12
 * Time: 下午9:52
 */

namespace App\Libs;


class RedisKey
{

    // 保存用户Token
    const USER_TOKEN_KEY = 'admin:user:token';

    /**
     * 获取存放用户TOKEN的KEY
     * @param $token
     * @return string
     */
    public static function getTokenKey($token) :string
    {
        return sprintf("%s:%s", self::USER_TOKEN_KEY, $token);
    }

}
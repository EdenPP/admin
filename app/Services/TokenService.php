<?php
/**
 * Discription:
 *
 * User: bit
 * Date: 2018/5/15
 * Time: 下午4:10
 */

namespace App\Services;


use App\Libs\RedisKey;
use Illuminate\Support\Facades\Redis;

class TokenService
{
    /**
     * 检查用户 TOKEN 是否存在
     * @return bool
     */
    public static function checkExists(string $token) :bool
    {
        return boolval(Redis::exists(RedisKey::getTokenKey($token)));
    }

    /**
     * 设置ToKEN
     * @param string $token
     * @param array $data
     * @return mixed
     */
    public static function setValue(string $token, array $data = [])
    {
        $key = RedisKey::getTokenKey($token);
        $oldData = self::getValue($token);
        $newVal = array_merge($oldData, $data);
        $success = Redis::set($key, json_encode($newVal));
        self::setTtl($key);
        return $success ? true : false;
    }

    /**
     * @param string $key
     * @param int $ttl
     */
    public static function setTtl(string $key, $ttl = 3600)
    {
        Redis::expire($key, $ttl);
    }

    /**
     * @param $token
     * @param int $ttl
     */
    public static function resetTtl($token, $ttl = 3600)
    {
        $key = RedisKey::getTokenKey($token);
        self::setTtl($key, $ttl);
    }

    /**
     * @param string $token
     * @param $key
     * @return mixed
     */
    public static function deleteValue(string $token, $key = null)
    {

        $tokenKey = RedisKey::getTokenKey($token);
        if (empty($key)) {
            return Redis::del($tokenKey) ? true : false;
        }

        $value = self::getValue($token);
        if (isset($value[$key])) {
            unset($value[$key]);
        }

        if (empty($value)) {
            $value = [];
        }

        return Redis::set($tokenKey, json_encode($value)) ? true : false;
    }

    /**
     * @param string $token
     * @param null $field
     * @return array|mixed|null
     */
    public static function getValue(string $token, $field = null)
    {
        $key = RedisKey::getTokenKey($token);
        $oldVal = Redis::get($key);

        $value = self::unmarshalData($oldVal) ?? [];
        if (!is_null($field)) {
            return $value[$field] ?? [];
        }
        return $value;
    }

    /**
     * @param string $value
     * @return mixed|null
     */
    public static function unmarshalData($value = '')
    {
        try {
            $data = json_decode($value, true);
            return $data;
        } catch (\Exception $e) {}
        return null;
    }
}
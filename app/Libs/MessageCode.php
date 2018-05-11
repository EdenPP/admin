<?php
/**
 * Discription:
 *
 * User: bit
 * Date: 2018/5/11
 * Time: 上午11:09
 */

namespace App\Libs;

class MessageCode
{
    const OK                    = 200;
    const FORBIDDEN             = 403;

    // 1 开头的为通用错误类型
    const PARAMETER_ERROR       = 10001;    # 参数错误

    // 2 开头的为后台错误
    const AD_INVALID            = 10002;    # 用户名或密码错误
    const AD_USER_FREEZING      = 10003;    # 用户冻结

    /**
     * 打印错误消息
     * @param int $code
     * @return string
     */
    public static function getMessage(int $code = 0) :string
    {
        if ($code == 0) {
            return '';
        }
        $codeConfig = config('code');
        return $codeConfig[$code] ?? "";
    }

}
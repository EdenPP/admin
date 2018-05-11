<?php
/**
 * Discription:
 *
 * User: bit
 * Date: 2018/5/11
 * Time: 上午11:48
 */

namespace App\Libs;

class Response
{

    private static $message = [];

    public function __construct()
    {
        self::$message = config('code');
    }

    /**
     * 处理成功
     * @param $data
     * @return \Illuminate\Http\JsonResponse
     */
    public static function success($data = '')
    {
        return response()->json([
            'code'      => MessageCode::OK,
            'message'   => MessageCode::getMessage(MessageCode::OK),
            'data'      => $data,
        ]);
    }

    /**
     * 处理失败
     *
     * @param $code
     * @return \Illuminate\Http\JsonResponse
     */
    public static function error($code)
    {
        return response()->json([
            'code' => $code,
            'message' => MessageCode::getMessage($code) ?? '',
        ]);
    }

}
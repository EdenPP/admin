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
        try {
            $resp = [
                'code' => MessageCode::OK,
                'message' => MessageCode::getMessage(MessageCode::OK),
                'data' => $data,
            ];
            return response()->json($resp);
        } catch (\Exception $e) {
            echo $e->getMessage();
        }
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

    /**
     * 用户未登录
     * @return $this
     */
    public static function denied()
    {
        return response()->json('please login first', 401);
    }

}
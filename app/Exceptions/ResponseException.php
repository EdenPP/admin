<?php
/**
 * Discription:
 *
 * User: bit
 * Date: 2018/5/11
 * Time: 上午11:25
 */

namespace App\Exceptions;

use App\Libs\MessageCode;
use App\Libs\Response;
use Exception;
use Throwable;

class ResponseException extends Exception
{
    public function __construct(int $code = 0, Throwable $previous = null)
    {
        $message = MessageCode::getMessage($code);
        parent::__construct($message, $code, $previous);
    }

    /**
     * 渲染结果
     * @param $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function render($request)
    {
        return Response::error($this->getCode());
    }
}
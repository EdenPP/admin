<?php
/**
 * Discription:
 *
 * User: bit
 * Date: 2018/5/15
 * Time: 下午3:40
 */

namespace App\Http\Middleware;

use App\Libs\Response;
use App\Services\TokenService;
use Closure;
use Illuminate\Http\Request;

class AdminAuth
{
    /**
     * @param $request
     * @param Closure $next
     * @return $this|mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->getPathInfo() == '/admin/login') {
            return $next($request);
        }

        // Perform action
        $token = $request->header('Access-Token');
        if (TokenService::checkExists($token)) {
            TokenService::resetTtl($token);
            return $next($request);
        }

        return Response::denied();
    }
}
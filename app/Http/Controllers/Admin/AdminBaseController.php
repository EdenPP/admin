<?php
/**
 * Discription:
 *
 * User: bit
 * Date: 2018/5/11
 * Time: 上午1:01
 */

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\TokenService;

class AdminBaseController extends Controller
{

    private $token = '';

    public function __construct()
    {
        parent::__construct();
        $this->token = request()->header('Access-Token');
    }

    /**
     * @return array|string
     */
    public function token()
    {
        return $this->token;
    }

    /**
     * @param $token
     */
    public function initToken($token)
    {
        $this->token = $token;
    }

    /**
     * @param $key
     * @param null $value
     * @return mixed
     */
    public function setToken($key, $value = null)
    {
        if (is_null($value)) {
            return TokenService::deleteValue($this->token, $key);
        } else {
            $data[$key] = $value;
            return TokenService::setValue($this->token, $data);
        }
    }

    /**
     * @param $key
     * @return array|mixed|null
     */
    public function getToken($key)
    {
        return TokenService::getValue($this->token, $key);
    }

    /**
     * @return mixed
     */
    public function removeToken()
    {
        return TokenService::deleteValue($this->token);
    }
}
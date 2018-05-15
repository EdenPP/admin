<?php
/**
 * Discription:
 *
 * User: bit
 * Date: 2018/5/15
 * Time: 下午5:41
 */

namespace App\Libs;


class Util
{

    /**
     * 对像转数组
     * @param string $obj
     * @return mixed
     */
    public static function objToArray($obj = ""){
        return json_decode(json_encode($obj),true);
    }

}
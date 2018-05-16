<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::group(['prefix' => 'admin', 'namespace' => 'Admin', 'middleware' => ['admin.auth']], function () {
    Route::get('/demo', [
        'as' => 'demo', 'uses' =>'LoginController@demo'
    ]);

    Route::post('/login', 'LoginController@login');
    Route::get('/logout', 'LoginController@logOut');

    Route::group(['prefix' => 'user'], function () {
        Route::get('/profile', 'UserController@profile');
    });

    // 站点管理
    Route::group(['prefix' => 'system'], function () {
        Route::get('/menu', 'SystemController@menu');
    });

});
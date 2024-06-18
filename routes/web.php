<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

use App\Http\Controllers\ProductController;
use App\Http\Controllers\Product2Controller;
use App\Http\Controllers\Product3Controller;
use App\Http\Controllers\Product4Controller;

Route::get('/api/products', [ProductController::class, 'getproducts'])->name('products.get'); //取得表單路由
Route::get('/api/products2', [Product2Controller::class, 'getproducts2'])->name('products2.get'); //取得表單路由
Route::get('/api/products3', [Product3Controller::class, 'getproducts3'])->name('products3.get'); //取得表單路由
Route::get('/api/products4', [Product4Controller::class, 'getproducts4'])->name('products4.get'); //取得表單路由

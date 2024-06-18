<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Product2Controller extends Controller
{
    public function getproducts2(){
        try {
            $path = resource_path('data/products2.json');  // 确保路径正确
            $products = json_decode(file_get_contents($path), true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new \Exception("JSON 解析错误: " . json_last_error_msg());
            }
            return response()->json($products, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}

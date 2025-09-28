<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index()
    {
        // $shops = Shop::all();
        $shops = Shop::with('reviews')->get();
        // dd($shops);
        // 新着のレビューを5件取得
        $newReviews = Review::With('shop', 'user')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('Home', [
            'shops' => $shops,
            'newReviews' => $newReviews,
        ]);
    }

    public function detail($id)
    {
        $shop = Shop::find($id);

        $reviews = Review::with('user')
            ->where('shop_id', $id)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Shop/Detail', [
            'shop' => $shop,
            'reviews' => $reviews,
        ]);
    }
}

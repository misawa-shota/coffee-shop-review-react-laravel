<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Review;
use App\Models\Shop;

class ReviewController extends Controller
{
    public function create($id)
    {
        $shop = Shop::find($id);
        return Inertia::render('Review/Create', [
            'shop' => $shop,
        ]);
    }

    public function store(Request $request)
    {
        $status = "error";
        $request->validate([
            'rating' => 'required|integer|between:1,5',
            'comment' => 'required|string|max:255',
        ]);

        $reviewModel = new Review();
        $review = $reviewModel->saveReview($request);
        // ステータスメッセージ
        if($review) {
            $status = 'review-create';
        }

        return redirect()->route('shop.detail', [
            'id' => $request->shop_id,
            'status' => $status,
        ]);
    }
}

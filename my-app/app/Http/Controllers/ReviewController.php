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
        $user = auth()->user();
        $status = "error";
        $request->validate([
            'rating' => 'required|integer|between:1,5',
            'comment' => 'required|string|max:255',
        ]);

        $reviewModel = new Review();
        $review = $reviewModel->saveReview([
            'shop_id' => $request->shop_id,
            'user_id' => $user->id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);
        // ステータスメッセージ
        if($review) {
            $status = 'review-create';
        }

        return redirect()->route('shop.detail', [
            'id' => $request->shop_id,
            'status' => $status,
        ]);
    }

    // レビューの編集
    public function edit($id)
    {
        $review = Review::with('shop')->find($id);
        return Inertia::render('Review/Edit',[
            'review' => $review,
        ]);
    }

    // レビューの更新
    public function update(Request $request)
    {
        $status = "error";
        $request->validate([
            'rating' => 'required|integer|between:1,5',
            'comment' => 'required|string|max:255',
        ]);

        $reviewModel = new Review();
        $review = $reviewModel->updateReview($request);

        // ステータス
        if($review){
            $status = 'review_updated';
        }
        return redirect()->route('shop.detail', [
            'id' => $review->shop_id,
            'status' => $status,
        ]);
    }

    // レビューの削除
    public function destroy($id)
    {
        $status = "error";
        $review = Review::find($id);
        if($review){
            $review->delete();
            $status = "review_deleted";
        }
        return redirect()->route('shop.detail',[
            'id' => $review->shop_id,
            'status' => $status,
        ]);
    }
}

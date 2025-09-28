<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Review;

class ReviewController extends Controller
{
    public function create()
    {
        return Inertia::render('Review/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'rating' => 'required|integer|between:1,5',
            'comment' => 'required|string|max:255',
        ]);

        $reviewModel = new Review();
        $review = $reviewModel->saveReview($request);

        return redirect()->route('shop.detail', ['id' => $request->shop_id]);
    }
}

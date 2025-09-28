<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'shop_id',
        'user_id',
        'rating',
        'comment',
    ];

    //shopsテーブルとのリレーション
    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

    //usersテーブルとのリレーション
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function saveReview($request)
    {
        $this->shop_id = $request->shop_id;
        $this->user_id = 1; //テスト用
        $this->rating = $request->rating;
        $this->comment = $request->comment;
        $this->save();

        return $this;
    }
}

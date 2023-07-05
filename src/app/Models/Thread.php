<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Thread extends Model
{
    use HasFactory;

    protected $table = 'threads';


    protected $fillable = [
        'user_id', 'name', 'body', 'is_user_checked', 'latest_answer_time'
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function answers()
    {
        return $this->hasMany('App\Models\Answer');
    }
}

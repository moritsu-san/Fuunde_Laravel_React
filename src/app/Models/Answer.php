<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Answer extends Model
{
    use HasFactory;

    protected $table = 'answers';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'name', 'body', 'thread_id', 'user_id'
    ];

    protected $appends = ['diff_for_humans'];

    // protected $visible = [
    //     'id',
    //     'body',
    //     'thread_id',
    //     'user_id',
    //     'created_at',
    //     'updated_at',
    //     'diff_for_humans',
    //     'likes_count',
    //     'likes',
    //     'thread',
    //     'user'
    // ];

    /**
     * diffForHumans()
     *
     * @param  void
     * @return string
     */
    public function getDiffForHumansAttribute()
    {
        return Carbon::parse($this->created_at)->diffForHumans();
    }

    public function thread(): BelongsTo
    {
        return $this->belongsTo('App\Models\Thread');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo('App\Models\User');
    }

    public function likes(): BelongsToMany
    {
        return $this->belongsToMany('App\Models\User')->withTimestamps();
    }

    public function islikedBy(?User $user): bool
    {
        return $user
            ? (bool)$this->likes->where('id', $user->id)->count()
            : false;
    }
}

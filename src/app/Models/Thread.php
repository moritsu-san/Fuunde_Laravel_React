<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Thread extends Model
{
    use HasFactory;

    /**
     * Undocumented variable
     *
     * @var string
     */
    protected $table = 'threads';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id', 'body'
    ];

    protected $appends = ['diff_for_humans'];

    /**
     * The attributes that should be visible in arrays.
     *
     * @var array
     */

    protected $hidden = [];
    
    /**
     * diff_for_humans
     *
     * @param  void
     * @return string
     */
    public function getDiffForHumansAttribute()
    {
        return Carbon::parse($this->created_at)->diffForHumans();
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    /**
     * Undocumented function
     *
     * @return BelongsToMany
     */
    public function likes(): BelongsToMany 
    {
        return $this->belongsToMany('App\Models\User')->withTimestamps();
    }

    public function answers()
    {
        return $this->hasMany('App\Models\Answer');
    }

    public function islikedBy(?User $user): bool
    {
        return $user
            ? (bool)$this->likes->where('id', $user->id)->count()
            : false;
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Thread;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function post(Request $request)
    {
        $post = Thread::all();
        return response()->json($post);
    }

    public function currentUser() 
    {
        if (Auth::check()) {
            return response()->json(Auth::user());
        } else {
            return response()->json(Auth::user());
        }
    }
}

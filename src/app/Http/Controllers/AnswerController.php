<?php

namespace App\Http\Controllers;

use App\Http\Requests\AnswerRequest;
use App\Services\AnswerService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Answer;
use Throwable;

class AnswerController extends Controller
{

    protected $answer_service;

    public function __construct(AnswerService $answer_service)
    {
        $this->middleware('auth')->except(['isLiked', 'countLikes']);
        $this->answer_service = $answer_service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AnswerRequest $request, int $thread_id)
    {
        try {
            $data = $request->validated();
            $data['user_id'] = Auth::id();
            $data['name'] = Auth::user()->name;
            $this->answer_service->createNewAnswer($thread_id, $data);
        } catch (Throwable $error) {
            return redirect()->route('threads.show', $thread_id)->with('error', 'アンサーの投稿に失敗しました...');
        }

        return redirect()->route('threads.show', $thread_id)->with('success', 'アンサーを投稿しました!');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function isLiked(Answer $answer)
    {
        $isLiked = $answer->isLikedBy(Auth::user());
        return response()->json($isLiked);
    }

    public function countLikes(Answer $answer)
    {
        $countLikes = $answer->count_likes;
        return response()->json($countLikes);
    }

    public function like(Request $request, Answer $answer)
    {
        $answer->likes()->detach($request->user()->id);
        $answer->likes()->attach($request->user()->id);

        return [
            'id' => $answer->id,
            'countLikes' => $answer->count_likes,
        ];

    }

    public function unlike(Request $request, Answer $answer)
    {
        $answer->likes()->detach($request->user()->id);

        return [
            'id' => $answer->id,
            'countLikes' => $answer->count_likes,
        ];
    }
}

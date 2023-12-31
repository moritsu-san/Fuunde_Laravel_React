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
        $this->middleware('auth')->except(['indexByTime', 'indexByLike', 'countLikes']);
        $this->answer_service = $answer_service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexByTime()
    {
        $answers = $this->answer_service->getAnswersWithThreadByTime();
        return response()->json($answers);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexByLike()
    {
        $answers = $this->answer_service->getAnswersWithThreadByLike();
        return response()->json($answers);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexUserByTime(int $user_id)
    {
        $answers = $this->answer_service->getUserAnswersWithThreadByTime($user_id);
        return $answers;
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
            $body = preg_replace("/(^\s+)|(\s+$)/u", "", $request->body);
            $user_id = Auth::id();
            $answer = $this->answer_service->createAnswer($thread_id, $body, $user_id);
        } catch (Throwable $error) {
            return response($error);
        }

        return response($answer, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $thread_id)
    {
        $answers = $this->answer_service->getAnswer($thread_id);
        return $answers;
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

    public function search(Request $request) 
    {
        $keyword = preg_replace("/(^\s+)|(\s+$)/u", "", $request->trimedKeyword);
        $query = Answer::query();
        if(!empty($keyword)) {
            $query->where('body', 'LIKE', "{$keyword}%")->orWhere('body', 'LIKE', "%{$keyword}%");
        }
        $answers = $query->withCount('likes')->with(['user:id,name,username', 'likes:id,name,username', 'thread' => function ($query) {
            $query->with(['user:id,name,username'])->withCount('likes')->get();
        }])->orderBy('created_at', 'desc')->limit(20)->get();
        return $answers;
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
            'likes_count' => $answer->count_likes,
        ];

    }

    public function unlike(Request $request, Answer $answer)
    {
        $answer->likes()->detach($request->user()->id);

        return [
            'id' => $answer->id,
            'likes_count' => $answer->count_likes,
        ];
    }
}

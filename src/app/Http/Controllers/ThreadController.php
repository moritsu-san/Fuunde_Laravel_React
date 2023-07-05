<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Thread;
use App\Http\Requests\ThreadRequest;
use App\Services\ThreadService;
use App\Repositories\ThreadRepository;
use App\Services\SlackNotificationService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Throwable;

class ThreadController extends Controller
{

    protected $thread_service;
    protected $thread_repository;
    protected $slack_notification_service;

    public function __construct(
        ThreadService $thread_service,
        ThreadRepository $thread_repository,
        SlackNotificationService $slack_notification_service
    )
    {
        $this->middleware('auth')->except(['index', 'shosai']);
        $this->authorizeResource(Thread::class, 'thread');
        $this->thread_service = $thread_service;
        $this->thread_repository = $thread_repository;
        $this->slack_notification_service = $slack_notification_service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $threads = $this->thread_service->getThreadsWithAnswers(10);
        return response()->json($threads);                                                                 
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ThreadRequest $request)
    {
        try{
            $data = $request->validated();
            $data['name'] = Auth::user()->name;
            $data['user_id'] = Auth::id();

            $thread = $this->thread_service->createNewThread(Auth::id(), $data);
            $this->slack_notification_service->send(Auth::user()->name. 'がお題として"' . $request->body . '"を投稿しました。');
        } catch (Throwable $error) {
            return response()->json();
        }

        return response()->json();
    }

    /*今は使わないのでコメントアウト*/
    // public function create()
    // {
    //     return view('threads.create');
    // }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function show()
    // {
    //     // $thread = $this->thread_service->getThreadWithAnswers($id);

    //     // return $thread ?? abort(404);
    // }

    public function shosai(String $id)
    {
        $thread = $this->thread_service->getThreadWithAnswers($id);

        return $thread ?? abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Thread $thread)
    {
        return view('threads.edit', ['thread' => $thread]);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Threadrequest $request, Thread $thread)
    {
        try{
            $this->thread_service->updateThread($thread->id, $request->body);
            $this->slack_notification_service->send(Auth::user()->name. 'がお題を"' . $request->body . '"に更新しました。');
        } catch (Throwable $error) {
            return redirect()->route('threads.show', $thread->id)->with('error', 'お題の編集に失敗しました...');
        }
        return redirect()->route('threads.show', $thread->id)->with('success', '編集に成功しました!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Thread $thread)
    {
        try {
            $this->thread_repository->deleteThread($thread->id);
        } catch (Throwable $error) {
            return redirect()->route('answer.recent')->with('error', 'お題の削除に失敗しました...');
        }
        return redirect()->route('answer.recent')->with('success', 'お題を削除しました!');
    }
}

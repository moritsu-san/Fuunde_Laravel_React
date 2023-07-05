<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Requests\ThreadRequest;
use App\Services\ThreadService;
use App\Repositories\ThreadRepository;
use Illuminate\Support\Facades\Auth;
use Throwable;
use App\Http\Controllers\Controller;
use App\Models\Thread;

class ThreadController extends Controller
{

    protected $thread_service;
    protected $thread_repository;

    public function __construct(
        ThreadService $thread_service,
        ThreadRepository $thread_repository
    )
    {
        $this->middleware('auth:admin');
        $this->thread_service = $thread_service;
        $this->thread_repository = $thread_repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $threads = $this->thread_service->getThreads(10);
        return view('threads.index', compact('threads'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $thread = $this->thread_repository->findById($id);
        $thread->load('answers');
        return view('threads.show', compact('thread'));
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
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $this->thread_repository->deleteThread($id);
        } catch (Throwable $error) {
            return redirect()->route('admin.thread.index')->with('error', 'スレッドの削除に失敗しました...');
        }
        return redirect()->route('admin.threads.index')->with('success', 'スレッドを削除しました!');
    }
}

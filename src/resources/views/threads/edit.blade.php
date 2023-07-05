@extends('layouts.app')

@section('title', '記事更新')

@section('content')
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>お題の編集</h1>
        <div class="card mt-3">
            @include('components.flash-message')
          <div class="card-body pt-0">
            <div class="card-text">
              <form method="POST" action="{{ route('threads.update', $thread->id) }}">
                @method('PATCH')
                @include('components.form')
                <button type="submit" class="btn btn-primary">更新する</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
@endsection

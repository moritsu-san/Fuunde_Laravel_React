@extends('layouts.app')

@section('title', '踏んで - お題を投稿')

@section('content')
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>お題の新規投稿</h1>
        @include('components.flash-message')
        <div class="card mt-3">
          <div class="card-body pt-0">
            <div class="card-text">
              <form method="POST" action="{{ route('threads.store') }}">
                @include('components.form')
                <button type="submit" class="btn btn-primary">投稿する</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
@endsection

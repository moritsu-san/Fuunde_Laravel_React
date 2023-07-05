<div class="pt-6 pb-3 px-3 mx-auto my-4 text-center bg-purple-100 border border-purple-200 relative rounded-lg shadow-md">
    @include('components.thread-options')
    <a href="{{ route('threads.show', $thread->id) }}" class="pb-2 block border-b border-purple-300">
        <h3 class="mb-2 text-3xl font-bold tracking-tight text-gray-900">「{!! $answer_service->convertUrl($thread->body) !!}」</h3>
        <h6 class="pb-2 mb-0 text-sm text-gray-500 border-bottom">
            <i class="fa-solid fa-circle-user"></i> {{ $thread->name }} <i class="fa-solid fa-clock"></i> {{ $thread->created_at->format('Y/m/d H:i:s') }}
        </h6>
    </a>
    @if (isset($thread->answers[0]))
        <p class="mt-4 mb-0 text-lg text-gray-700">
            <i class="fa-solid fa-crown" style="color: rgb(211, 181, 13)"></i> ランキング1位 <i class="fa-solid fa-crown" style="color: rgb(211, 181, 13)"></i>
            <h4 class="mb-0 text-lg font-bold">
                「{!! $answer_service->convertUrl($thread->answers[0]->body) !!}」
            </h4>
            <h5 class="mb-6 text-sm text-gray-400">
                <i class="fa-solid fa-circle-user"></i> {{ $thread->answers[0]->name }}
                <i class="fa-solid fa-heart"></i> {{ $thread->answers[0]->count_likes }}
            </h5>
        </p>
        @include('components.show-answers-links')
    @else
        <p class="mt-4">
            <p>アンサーがまだありません</p><br>
        </p>
        @include('components.show-to-answer-links')
    @endif
</div>
{{-- <!--
  This component uses @tailwindcss/line-clamp

  yarn add @tailwindcss/line-clamp
  npm install @tailwindcss/line-clamp

  plugins: [require('@tailwindcss/line-clamp')]
-->

<article class="overflow-hidden rounded-lg border border-gray-100 shadow-sm">
    <div class="p-4 sm:p-6">
        <h3 class="card-title">「{!! $answer_service->convertUrl($thread->body) !!}」</h3>
        @include('components.thread_options')
        <h6 class="card-subtitle  pb-2 mb-0 text-muted border-bottom">
            <i class="fa-solid fa-circle-user"></i> {{ $thread->name }} <i class="fa-solid fa-clock"></i> {{ $thread->created_at->format('Y/m/d H:i:s') }}
        </h6>
        @if (isset($thread->answers[0]))
            <p class="card-text">
                <p class="mb-1">
                    <i class="fa-solid fa-crown"></i> ランキング1位 <i class="fa-solid fa-crown"></i>
                </p>
                <h4 class="card-text mb-0">
                    「{!! $answer_service->convertUrl($thread->answers[0]->body) !!}」
                </h4>
                <h5 class="small text-muted mb-1">
                    <i class="fa-solid fa-circle-user"></i> {{ $thread->answers[0]->name }}
                    <i class="fa-solid fa-heart"></i> {{ $thread->answers[0]->count_likes }}
                </h5>
            </p>
            @include('components.show-answers-links')
        @else
            <p class="card-text">
                <p>アンサーがまだありません</p><br>
            </p>
            @include('components.show-to-answer-links')
        @endif

      <a
        href="#"
        class="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
      >
        Find out more

        <span
          aria-hidden="true"
          class="block transition group-hover:translate-x-0.5"
        >
          &rarr;
        </span>
      </a>
    </div>
</article> --}}



@if (Auth::guard('admin')->check())
    <a href="{{ route('admin.threads.index') }}" class="inline-flex items-center px-3 py-1 mr-3 text-sm font-medium text-center text-white bg-teal-600 hover:bg-teal-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        一覧に戻る
    </a>
@else
    <a href="{{ route('answer.recent') }}" class="inline-flex items-center px-3 py-2 mr-3 text-sm font-medium text-center text-white bg-teal-600 hover:bg-teal-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        一覧に戻る
    </a>
@endif

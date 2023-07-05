<footer class="p-3 my-16 bg-gray-300 bg-opacity-50 sm:p-3 dark:bg-gray-900">
  <div class="max-w-5xl mx-auto md:flex md:justify-between">
      <div class="mb-6 md:mb-0">
        <a class="text-2xl text-black hover:text-gray-800 transition-colors" href="{{ route('root') }}">
          <i class="fa-solid fa-microphone-lines"></i>
          {{ config('app.name') }}
      </a>
      </div>
      <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
          <div>
              <h2 class="mb-3 text-md font-semibold text-gray-900 uppercase dark:text-white">アンサー</h2>
              <ul class="text-gray-600 dark:text-gray-400">
                  <li class="mb-1">
                      <a href="{{ route('answer.recent') }}" class="hover:underline">新着</a>
                  </li>
                  <li>
                      <a href="{{ route('answer.popular') }}" class="hover:underline">人気</a>
                  </li>
              </ul>
          </div>
          <div>
              <h2 class="mb-3 text-md font-semibold text-gray-900 uppercase dark:text-white">お題</h2>
              <ul class="text-gray-600 dark:text-gray-400">
                  <li class="mb-1">
                      <a href="{{ route('odai.recent') }}" class="hover:underline ">新着</a>
                  </li>
                  <li>
                      <a href="{{ route('odai.popular') }}" class="hover:underline">人気</a>
                  </li>
              </ul>
          </div>
          <div>
              <h2 class="mb-3 text-md font-semibold text-gray-900 uppercase dark:text-white">利用規約</h2>
              <ul class="text-gray-600 dark:text-gray-400">
                  <li class="mb-1">
                      <a href="#" class="hover:underline">プライバシーポリシー</a>
                  </li>
                  <li>
                      <a href="#" class="hover:underline">踏んでについて</a>
                  </li>
              </ul>
          </div>
      </div>
  </div>
  <hr class="my-3 border-gray-400 sm:mx-auto dark:border-gray-700 lg:my-3" />
  <div class="sm:flex sm:items-center sm:justify-between">
      <span class="text-sm text-gray-600 sm:text-center dark:text-gray-400">© 2023 <a href="{{ route('root') }}" class="hover:underline">踏んで</a>. All Rights Reserved.
      </span>
  </div>
</footer>


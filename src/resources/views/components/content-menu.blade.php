<ul class="flex">
  <li class="{{ url()->current() == route('answer.recent') || url()->current() == route('root') ? 'bg-white' : '' }} px-2 mr-3 text-gray-600 rounded-t font-bold">
      <a href="{{ route('answer.recent') }}" class="text-bold" target="_self">新着</a>
  </li>
  <li class="{{ url()->current() == route('answer.popular') ? 'bg-white' : '' }} px-2 mr-3 text-gray-600 rounded-t font-bold">
      <a href="{{ route('answer.popular') }}" target="_self">人気</a>
  </li>
</ul>

@csrf
<div class="form-group">
     <label for="thread-body">お題</label>
     <input type="text" name="body" class="form-control" id="thread-body" value="{{ $thread->body ?? old('body') }}">
</div>


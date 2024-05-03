<!-- Main Body -->
<section>
    <div class="container">
        <div class="row">
            <div class="col-sm-5 col-md-6 col-12 pb-4">
                <h1 class="text-dark mt-5">Comments</h1>
                <div class="comments-container mt-4 d-flex text-justify float-left mb-3">
                    @foreach ($blog->comments as $comment)
                        <div class="comment mb-3">
                            <h4>{{ $comment->author_name }}</h4>
                            <span>- {{ $comment->created_at->format('F d, Y') }}</span>
                            <br>
                            <p>{{ $comment->text }}</p>
                        </div>
                    @endforeach

                </div>
            </div>
            <div class="col-lg-4 col-md-5 col-sm-4 offset-md-1 offset-sm-1 col-12 mt-5">
                <form id="comment-box-form" class="comment-form" method="POST" data-action="{{ route('post-comment') }}">
                    @csrf
                    <div class="form-group">
                        <h4>Leave a comment</h4>

                        <div class="form-group mb-3">
                            <label for="name">Name</label>
                            <input id="name" type="text" class="form-control" name="author_name" value=""
                                required autocomplete="name" autofocus placeholder="Type your name"
                                style="background-color: rgb(255, 255, 255);">
                            <div id="name_error" class="error-message text-center"></div>
                        </div>


                        <label for="comment">Comment</label>
                        <textarea name="comment" id="comment" msg cols="30" rows="5" placeholder="Type your comment"
                            class="form-control" style="background-color: rgb(255, 255, 255);"></textarea>

                        <div id="comment_error" class="error-message text-center"></div>
                    </div>


                    {{-- blog id hidden input field for sending to backend --}}
                    <input type="number" name="blog_id" id="blog_id" value={{ $blog->id }} hidden>
                </form>

                <div class="form-group text-center">
                    <button type="button" id="comment-post-btn" class="btn btn-primary btn-sm btn-block mt-3">Post
                        Comment</button>
                </div>
                <div class="form-group text-center"><button hidden disabled type="button" type="button"
                        class="btn btn-primary btn-sm btn-block mt-3" id="loadingSubmittingBtn">
                        <i class="fa fa-spinner fa-spin me-3"></i>
                        Loading</button></div>
            </div>
        </div>
    </div>
</section>
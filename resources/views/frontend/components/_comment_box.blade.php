<!-- Main Body -->
<section>
    <div class="container">
        <div class="row">
            <div class="col-sm-5 col-md-6 col-12 pb-4">
                <h1 class="text-dark mt-5">Comments</h1>
                <div class="comments-container mt-4 d-flex text-justify float-left mb-3">
                    @foreach ($blog->comments as $comment)
                        <div class="comment mb-3" id="comment_{{ $comment->id }}">
                            <h4 id="author_name_text_{{ $comment->id }}">{{ $comment->author_name }}</h4>
                            <span>- {{ $comment->created_at->format('F d, Y') }}</span>
                            <br>
                            <p id="comment_text_{{ $comment->id }}">{{ $comment->text }}</p>
                            @if (auth()->check())
                                @if ($comment->user_id == auth()->user()->id)
                                    <div class="comment-edit-dlt">
                                        <!-- Edit Icon -->
                                        <a class="edit-icon text-white edit_comment_btn"
                                            data-comment-id="{{ $comment->id }}">
                                            <i class="fas fa-edit"></i>
                                        </a>


                                        <!-- Delete Icon -->
                                        <a class="text-white dlt_comment_btn" data-comment-id="{{ $comment->id }}">
                                            <i class="fas fa-trash"></i>
                                        </a>

                                    </div>
                                @endif
                            @endif


                        </div>
                    @endforeach

                </div>
            </div>
            @if (auth()->check())
                <div class="col-lg-4 col-md-5 col-sm-4 offset-md-1 offset-sm-1 col-12 mt-5">
                    <form id="comment-box-form" class="comment-form" method="POST"
                        data-action="{{ route('post-comment') }}">
                        @csrf
                        <div class="form-group">
                            <h4>Leave a comment</h4>

                            <div class="form-group mb-3">
                                <label for="name">Name</label>
                                <input id="name" type="text" class="form-control" name="author_name"
                                    value="" required autocomplete="name" autofocus placeholder="Type your name"
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
                        <input type="number" name="user_id" id="user_id" value={{ auth()->user()->id }} hidden>
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
            @else
                <p class="text-center mt-5">You have to login first for commenting on this blog.</p>
            @endif

        </div>

    </div>


</section>

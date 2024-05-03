  @extends('frontend.layouts.app')
  @section('title', 'Curl Ware' . ' - Blog Details')


  @section('content')
      <div class="container">
          <div class="">
              <div class="mt-5">

                  <img src="{{ asset('images/blog' . "/{$blog->id}-1.{$blog->image}") }}" class="image-height img-fluid mb-4"
                      alt="Post Image">

                  <h1 class="mb-4 text-dark">{{ $blog->title }}</h1>
                  <p>{{ $blog->author->name }}</p>
                  <p class="text-muted">Posted on {{ $blog->created_at->format('F d, Y') }}</p>
                  <div class="post-content">
                      <p>{!! html_entity_decode($blog->content) !!}</p>
                  </div>
              </div>
          </div>
      </div>


      <!--  comment box of blog  -->
      @include('frontend.components._comment_box')

      {{-- edit comment model --}}
      @include('frontend.components._edit_comment_modal')
  @endsection

  @section('script')
      {{-- custom js file of comment box --}}
      <script src="{{ asset('user_assets') }}/js/comment/comment.js"></script>
  @endsection

 @extends('frontend.layouts.app')
 @section('title', 'Curl Ware' . ' - Blog')
 @section('content')

     <div class="container">
         <div class="container my-4 col-lg-9 mx-auto p-0">
             <div class="row mx-0">
                 @foreach ($blogs as $blog)
                     <div class="col-md-4 mb-4">
                         <div class="rounded-4 overflow-hidden shadow-sm p-0 mr-md-3 img-hover-effect">
                             <a style="text-decoration: none;" href="{{ route('blog-details', ['id' => $blog->id]) }}"
                                 class="shadow-sm text-dark">
                                 <div class="img-sec">
                                     <img src="{{ asset('images/blog' . "/{$blog->id}-1.{$blog->image}") }}" alt="blog-image"
                                         class="w-100">
                                 </div>
                                 <div class="content-sec p-4">
                                     <h4 class="fw-semibold">{{ $blog->title }}</h4>
                                     <p class="press-author">{{ $blog->author->name }}</p>
                                     <div style="font-size: 12px;" class="text-secondary  fw-semibold">
                                         {{ $blog->created_at->format('F d, Y') }}</div>
                                     <p class="press-desc">
                                         {!! substr(html_entity_decode($blog->content), 0, 50) !!}
                                         {!! strlen($blog->content) > 50 ? '...' : '' !!}
                                     </p>

                                 </div>
                             </a>
                         </div>
                     </div>
                 @endforeach

             </div>
         </div>
     </div>
 @endsection

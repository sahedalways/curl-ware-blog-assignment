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
                                         class="w-100 custom-height">
                                 </div>
                                 <div class="content-sec p-4 ">
                                     <h4 class="fw-semibold text-dark">{{ $blog->title }}</h4>
                                     <p class="press-author">{{ $blog->author->name }}</p>
                                     <div style="font-size: 12px;" class="text-secondary  fw-semibold mb-3">
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
         {{ $blogs->appends(request()->query())->links('pagination::bootstrap-4') }}
     </div>
 @endsection

 @section('script')
     {{-- for datatable js from here --}}
     <script src="{{ asset('admin_assets') }}/plugins/table/datatable/datatables.js"></script>
     <script>
         // var e;

         c3 = $('#style-3').DataTable({
             "dom": "<'dt--top-section'<'row'<'col-12 col-sm-6 d-flex justify-content-sm-start justify-content-center'l><'col-12 col-sm-6 d-flex justify-content-sm-end justify-content-center mt-sm-0 mt-3'f>>>" +
                 "<'table-responsive'tr>" +
                 "<'dt--bottom-section d-sm-flex justify-content-sm-between text-center'<'dt--pages-count  mb-sm-0 mb-3'i><'dt--pagination'p>>",
             "oLanguage": {
                 "oPaginate": {
                     "sPrevious": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
                     "sNext": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>'
                 },
                 "sInfo": "Showing page _PAGE_ of _PAGES_",
                 "sSearch": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
                 "sSearchPlaceholder": "Search...",
                 "sLengthMenu": "Results :  _MENU_",
             },
             "stripeClasses": [],
             "lengthMenu": [5, 10, 20, 50],
             "pageLength": 5,
             bPaginate: false,
             paging: false,
             ordering: false,
             info: false,
             searching: false,
         });

         multiCheck(c3);
     </script>
 @endsection

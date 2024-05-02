@extends('backend.layouts.master')

@section('title', 'Article List')

@section('style')

    <!-- BEGIN PAGE LEVEL CUSTOM STYLES -->
    <link rel="stylesheet" type="text/css" href="{{ asset('admin_assets') }}/plugins/table/datatable/datatables.css">
    <link rel="stylesheet" type="text/css" href="{{ asset('admin_assets') }}/assets/css/forms/theme-checkbox-radio.css">
    <link rel="stylesheet" type="text/css" href="{{ asset('admin_assets') }}/plugins/table/datatable/dt-global_style.css">
    <link rel="stylesheet" type="text/css" href="{{ asset('admin_assets') }}/plugins/table/datatable/custom_dt_custom.css">
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>

    <!-- END PAGE LEVEL CUSTOM STYLES -->
@endsection

<style>
    td {
        white-space: normal !important;
    }
</style>

@section('content')

    <div class="row layout-spacing mt-3 mx-0">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">

            {{-- display error message --}}
            @if (Session::has('sms'))
                <div class="alert alert-success alert-dismissible fade show" role="alert"
                    style="
                margin: 10px 5px 10px 5px;">
                    <strong>{{ Session::get('sms') }}</strong>.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            @elseif (Session::has('warning'))
                <div class="alert alert-danger alert-dismissible fade show" role="alert"
                    style="
                margin: 10px 5px 10px 5px;">
                    <strong>{{ Session::get('warning') }}</strong>.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            @endif
            {{-- //display error message --}}
            <div class="statbox widget box box-shadow">
                <div class="widget-content widget-content-area">
                    <div class="mb-4 d-flex align-items-center justify-content-between flex-wrap">
                        <a class="btn btn-sm btn-primary float-right mr-md-4 mb-md-0 mb-3"
                            href="{{ route('article.create') }}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="feather feather-plus">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            Create New Article
                        </a>

                        {{-- search game --}}
                        <form class="mb-0" method="get">
                            <div class="float-right d-flex align-items-center">
                                <input class="form-control float-left mr-3" name="q" value="{{ request('q') }}"
                                    type="text" placeholder="search">
                                <button type="submit" class="btn btn-primary">Search</button>
                            </div>
                        </form>
                    </div>

                    <table id="style-3" class="style-3 table-hover table">
                        <thead>
                            <tr>
                                <th class="checkbox-column text-center"> # </th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Image</th>
                                <th>Author</th>
                                <th>Display Priority</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($articleData as $key => $item)
                                <tr class='clickable-row' data-href='{{ route('article.edit', $item->id) }}'>
                                    <td class="checkbox-column text-center"> {{ ++$key }} </td>
                                    <td class="text-center">
                                        {{ $item->title }}
                                    </td>
                                    <td class="text-center">
                                        {!! html_entity_decode($item->description) !!}
                                    </td>
                                    <td>
                                        @if ($item->image)
                                            <img src="{{ asset('images/article' . "/{$item->id}-1.{$item->image}") }}"
                                                alt="article-image" style="max-width: 100px; max-height: 100px;">
                                        @endif
                                    </td>
                                    <td class="text-center">
                                        {{ $item->author }}
                                    </td>

                                    @if ($item->display_priority == 'first')
                                        <td class="text-center">
                                            First
                                        </td>
                                    @elseif($item->display_priority == 'middle')
                                        <td class="text-center">
                                            Middle
                                        </td>
                                    @else
                                        <td class="text-center">
                                            Last
                                        </td>
                                    @endif


                                    <td class="text-center">
                                        <ul class="table-controls">

                                            <li>
                                                <a href="{{ route('article.edit', $item->id) }}" class="bs-tooltip"
                                                    data-toggle="tooltip" data-placement="top" title=""
                                                    data-original-title="Edit">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                        class="feather feather-edit-2 br-6 mb-1 p-1">
                                                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z">
                                                        </path>
                                                    </svg>
                                                </a>
                                            </li>

                                            <li>
                                                <a href="javascript:void(0);"
                                                    onclick="event.preventDefault(); if(confirm('Are you really want to delete?')){ document.getElementById('article-delete-{{ $item->id }}').submit() }"
                                                    class="bs-tooltip" data-toggle="tooltip" data-placement="top"
                                                    title="" data-original-title="Delete">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                        class="feather feather-trash br-6 mb-1 p-1">
                                                        <polyline points="3 6 5 6 21 6"></polyline>
                                                        <path
                                                            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                                        </path>
                                                    </svg>
                                                </a>
                                            </li>

                                        </ul>
                                    </td>
                                    {{-- delete --}}
                                    <form method="post" action="{{ route('article.destroy', $item->id) }}"
                                        id="{{ 'article-delete-' . $item->id }}">
                                        @csrf
                                        @method('DELETE')
                                    </form>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                    {{ $articleData->appends(request()->query())->links('pagination::bootstrap-4') }}

                </div>
            </div>
        </div>
    </div>

@endsection


@section('script')

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

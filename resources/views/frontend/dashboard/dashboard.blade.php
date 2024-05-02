@extends('frontend.layouts.master')

@section('title')
    {{ auth()->user()->name }}'s Dashboard
@endsection


@section('content')
    <div class="layout-px-spacing">

        @if (in_array(auth()->user()->user_type, ['admin', 'manager']))
            <div class="row layout-top-spacing">

                {{-- display error message --}}
                @if (Session::has('sms'))
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{{ Session::get('sms') }}</strong>.
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                @endif
                {{-- //display error message --}}
        @endif

    </div>
@endsection

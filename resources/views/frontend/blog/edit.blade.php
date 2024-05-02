@extends('frontend.layouts.master')

@section('title', 'Edit Blog')

@section('content')

    <div id="flStackForm" class="col-lg-12 layout-spacing layout-top-spacing">
        <div class="statbox widget box box-shadow">

            <div class="widget-header">
                {{-- display success message --}}
                @if (Session::has('sms'))
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>{{ Session::get('sms') }}</strong>.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                @endif
                {{-- display success message --}}
                <div class="row">
                    <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                        <h5>Edit Blog</h5>
                        <a class="btn btn-sm btn-primary float-right mb-3" href="{{ route('blog.index') }}">
                            <i class="fas fa-list"></i> Blog List
                        </a>
                    </div>
                </div>
            </div>

            <div class="offset-1 col-xl-10 col-md-10 col-sm-10 col-10">
                <form id="my-form" class="needs-validation" action="{{ route('blog.update', $blogDetail->id) }}"
                    method="post" enctype="multipart/form-data">
                    @csrf
                    @method('PUT')


                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label>Title<sup style="color:red;">(*)</sup></label>
                                <input id="title" type="text"
                                    class="form-control @error('title') is-invalid @enderror"
                                    placeholder="ex. Artificial Intelligence in Modern Society"
                                    value="{{ $blogDetail->title }}" name="title">
                                @error('title')
                                    <div class="alert alert-danger mt-1">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                    </div>


                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label>Description<sup style="color:red;">(*)</sup></label>
                                <textarea cols="10" rows="4" class="jqte-test" id="editor" name="content"> {{ $blogDetail->content }}</textarea>
                                @error('content')
                                    <div class="alert alert-danger mt-1">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                    </div>



                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label>Image<sup style="color:red;">(*)</sup></label>
                                <input class="form-control" id="image" name="image" type="file"
                                    accept="image/jpeg, image/png, image/jpg, image/gif">
                                @if (file_exists('images\blog' . "/{$blogDetail->id}-1.{$blogDetail->image}"))
                                    <img id="image-preview"
                                        src="{{ asset('images\blog' . "/{$blogDetail->id}-1.{$blogDetail->image}") ?? 'default_image_url' }}"
                                        alt="default_article_image" style="max-width: 100px; max-height: 100px;">
                                @endif
                                @error('image')
                                    <div class="alert alert-danger mt-1">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                    </div>



                    <div class="form-group mb-3">
                        <button id="submit" type="submit" class="btn btn-primary mt-3">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>


@endsection

@section('style')
    <link href="{{ asset('admin_assets') }}/assets/css/scrollspyNav.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="{{ asset('admin_assets') }}/plugins/select2/select2.min.css">
@endsection

@section('script')
    <script src="{{ asset('admin_assets') }}/assets/js/scrollspyNav.js"></script>
    <script src="{{ asset('admin_assets') }}/plugins/select2/select2.min.js"></script>
    <script src="{{ asset('admin_assets') }}/plugins/select2/custom-select2.js"></script>


    <script src="{{ asset('/admin_assets') }}/ckeditor/classic/ckeditor.js"></script>
    <script>
        // text editor js here
        ClassicEditor
            .create(document.querySelector('#editor'), {
                // toolbar: [ 'heading', '|', 'bold', 'italic', 'link' ]
            })
            .then(editor => {
                window.editor = editor;
            })
            .catch(err => {
                console.error(err.stack);
            });


        const title = document.querySelector('#title');
        const slug = document.querySelector('#slug');
        title.addEventListener("keyup", function(e) {
            slug.value = rep(e.target.value, " ", "-")
        });

        // for showing image js here
        document.getElementById('image').addEventListener('change', function(event) {
            var preview = document.getElementById('image-preview');
            var file = event.target.files[0];

            if (file) {
                preview.src = URL.createObjectURL(file);
            } else {
                preview.src = '{{ 'default_image_url' }}';
            }
        });
    </script>



@endsection

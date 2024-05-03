@extends('frontend.layouts.app')
@section('title', 'Curl Ware - Login')
@section('content')



    <div style="background: #ededed;" class="">

        <div class="pt-5 d-flex justify-content-center">
            <a class="navbar-brand" href="{{ url('/') }}">
                <img src="{{ asset('images/logo.png') }}" alt="Logo" class="loginLogo">
            </a>
        </div>

        <div class="row justify-content-center align-items-center w-100 py-5 full-height-center-content">
            <div class="col-md-6">
                @if (session('message'))
                    <div class="alert alert-warning">
                        {{ session('message') }}
                    </div>
                @endif
                <div class="card">
                    <div class="card-body rounded-3 p-4">
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item me-1">
                                <a class="nav-link{{ request()->routeIs('login') ? ' active' : '' }}" id="top-profile-tab"
                                    id="login-tab" data-toggle="tab" href="#login" role="tab" aria-controls="login"
                                    aria-selected="{{ request()->routeIs('login') ? 'true' : 'false' }}">Login</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link{{ request()->routeIs('register.tab') ? ' active' : '' }}"
                                    id="register-tab" data-toggle="tab" href="#register" role="tab"
                                    aria-controls="register"
                                    aria-selected="{{ request()->routeIs('register.tab') ? 'true' : 'false' }}">Register</a>
                            </li>
                        </ul>
                        <div class="tab-content mt-3" id="myTabContent">
                            <div class="tab-pane fade {{ request()->routeIs('login') ? ' show active' : '' }}"
                                id="login" role="tabpanel" aria-labelledby="login-tab">
                                <form id="loginForm" class="custom-form-bg w-100" method="POST"
                                    data-action="{{ route('login') }}">
                                    @csrf
                                    <div class="p-3 py-2">
                                        <div class="d-flex w-100 align-items-center justify-content-center">
                                            <h4 class="custom-text-color">{{ __('Login') }}</h4>
                                        </div>

                                    </div>
                                    <div class="form-group">
                                        <div class="px-4 py-2">
                                            <label class="fw-semibold primary-text-color form-label text-dark"
                                                for="email">Email</label>
                                            <input id="email" type="email"
                                                class="p-2 form-control w-100  no-outline @error('email') is-invalid @enderror"
                                                name="email" value="{{ old('email') }}" required autocomplete="email"
                                                autofocus placeholder="Type email address"
                                                style="background-color: rgb(255, 255, 255);">
                                        </div>
                                        @error('email')
                                            <span class="px-4 invalid-feedback" role="alert">{{ $message }}</span>
                                        @enderror
                                        <div id="email_error" class="error-message text-center"></div>
                                    </div>

                                    <div class="form-group">
                                        <div class=" px-4 py-2">
                                            <label class="fw-semibold form-label primary-text-color text-dark"
                                                for="password" class="text-dark">Password</label>
                                            <input placeholder="Type password" id="password" type="password"
                                                class="p-2 form-control w-100  no-outline @error('password') is-invalid @enderror"
                                                name="password" required autocomplete="current-password"
                                                style="background-color: rgb(255, 255, 255);">
                                        </div>
                                        @error('password')
                                            <span class="px-4 invalid-feedback" role="alert">{{ $message }}</span>
                                        @enderror
                                        <div id="password_error" class="error-message text-center"></div>
                                    </div>

                                    <div class="text-center my-4">
                                        <button id="login-btn" type="button"
                                            class="btn custom-button-style col-md-5 col-10 py-2">Login now</button>
                                    </div>

                                    <div class="text-center my-4"><button hidden disabled type="button"
                                            class="btn custom-button-style col-md-5 col-10 py-2" id="loadingSubmittingBtn">
                                            <i class="fa fa-spinner fa-spin me-3"></i>
                                            Loging</button></div>

                                    <div class="text-center">
                                        <a class="custom-link" href="{{ route('password.request') }}">Forgot password?</a>
                                    </div>
                                </form>
                            </div>
                            <div class="tab-pane fade {{ request()->routeIs('register.tab') ? ' show active' : '' }}"
                                id="register" role="tabpanel" aria-labelledby="register-tab">
                                <form id="registerForm" method="POST" data-action="{{ route('register') }}">
                                    @csrf
                                    <div class="p-3 py-2 text-center">
                                        <h4 class="custom-text-color">Register</h4>

                                    </div>

                                    <div class="form-group">
                                        <div class="form-group px-4 py-2">
                                            <label class="form-label primary-text-color fw-semibold text-dark"
                                                for="name">Name</label>
                                            <input id="name" type="text" class="form-control" name="name"
                                                value="" required autocomplete="name" autofocus
                                                placeholder="Type your name"
                                                style="background-color: rgb(255, 255, 255);">
                                            @error('name')
                                                <span class="text-danger">{{ $message }}</span>
                                            @enderror
                                        </div>
                                        <div id="name_error" class="error-message text-center"></div>
                                    </div>


                                    <div class="form-group">
                                        <div class="form-group px-4 py-2">
                                            <label class="form-label primary-text-color fw-semibold text-dark"
                                                for="email">Email</label>
                                            <input id="registerEmail" type="email" class="form-control" name="email"
                                                value="" required autocomplete="email" autofocus
                                                placeholder="Type email address"
                                                style="background-color: rgb(255, 255, 255);">
                                            @error('email')
                                                <span class="text-danger">{{ $message }}</span>
                                            @enderror
                                        </div>
                                        <div id="register_email_error" class="error-message text-center"></div>
                                    </div>



                                    <div class="form-group">
                                        <div class="form-group px-4 py-2">
                                            <label class="form-label primary-text-color fw-semibold text-dark"
                                                for="password">Password</label>
                                            <input placeholder="Type password" id="registerPassword" value=""
                                                type="password" class="form-control" name="password" required
                                                autocomplete="new-password" style="background-color: rgb(255, 255, 255);">
                                            @error('password')
                                                <span class="text-danger">{{ $message }}</span>
                                            @enderror
                                        </div>
                                        <div id="register_password_error" class="error-message text-center"></div>
                                    </div>

                                    <div class="form-group">
                                        <div class="form-group px-4 py-2">
                                            <label class="form-label primary-text-color fw-semibold text-dark"
                                                for="con-password">Confirm
                                                Password</label>
                                            <input id="password_confirmation" type="password" class="form-control"
                                                value="" name="password_confirmation" required
                                                autocomplete="new-password" placeholder="Type confirm password"
                                                style="background-color: rgb(255, 255, 255);">
                                        </div>
                                        <div id="confirm_password_error" class="error-message text-center"></div>
                                    </div>


                                    <div class="text-center my-4">
                                        <button type="button" class="btn custom-button-style col-md-5 col-10 py-2"
                                            id="register-btn">Register now</button>
                                    </div>

                                    <div class="text-center my-4">
                                        <button hidden disabled type="button"
                                            class="btn custom-button-style col-md-5 col-10 py-2"
                                            id="loadingRegisteringBtn">
                                            <i class="fa fa-spinner fa-spin me-3"></i> Registering
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Bootstrap JS and dependencies -->
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

        {{-- custom js files for login and register --}}
        <script src="{{ asset('/user_assets') }}/js/login.js"></script>
        <script src="{{ asset('/user_assets') }}/js/register.js"></script>

    </div>

@endsection

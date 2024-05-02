{{-- mobile menu --}}
<style>
    .collapse-menu {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.5s ease-in-out;
    }

    .expand-menu {
        max-height: 500px;
        transition: max-height 0.5s ease-in-out;
    }
</style>

<div class="navbar navbar-expand-lg py-3 d-lg-none d-block">
    <div class="container">
        <div class="d-flex align-items-center">
            <!-- Logo -->
            <div>
                <a class="navbar-brand" href="{{ url('/') }}">
                    <img src="{{ asset('images/main-logo.png') }}" alt="Logo"
                        class="d-inline-block align-top col-md-4 col-8">
                </a>
            </div>
            <!-- Toggler -->
            <button class="navbar-toggler shadow-none" type="button" onclick="toggleMenu()">
                <i id="menuIcon" class="fa fa-bars"></i>
            </button>

        </div>
        <!-- Menu -->
        <div class="collapse-menu bg-shadow justify-content-end" id="navbarNav">
            <div class="navbar-nav align-items-center py-3">
                @if (auth()->user())
                    <div class="nav-item ms-lg-4 ms-0">
                        <a class="nav-link text-white menu-hover-effect" href="{{ route('dashboard') }}">Dashboard</a>
                    </div>

                    <div class="nav-item ms-lg-4 ms-0">
                        <a class="nav-link text-white menu-hover-effect" href="{{ route('logout') }}"
                            onclick="event.preventDefault(); document.getElementById('logout-form').submit();"
                            href="#">Logout</a>

                        <form id="logout-form" action="{{ route('logout') }}" method="POST">
                            @csrf
                        </form>
                    </div>
                @else
                    <div class="nav-item ms-lg-4 ms-0">
                        <a class="nav-link text-white menu-hover-effect" href="{{ route('login') }}">Login</a>
                    </div>
                @endif

                @if (auth()->guest())
                    <div class="nav-item ms-lg-4 ms-0">
                        <a class="nav-link text-white menu-hover-effect" href="{{ route('register.tab') }}">Register</a>
                    </div>
                @endif

            </div>
        </div>
    </div>
</div>

{{-- custom header js file --}}
<script src="{{ asset('/user_assets') }}/js/header/header.js"></script>



{{-- desktop menu --}}
<nav class="navbar navbar-expand-lg py-3 d-lg-block d-none">
    <div class="container">
        <div class="d-flex">
            <!-- Logo -->
            <div class="">
                <a class="navbar-brand" href="{{ url('/') }}">
                    <img src="{{ asset('images/main-logo.png') }}" alt="Logo"
                        class="d-inline-block align-top col-xl-6 col-lg-10 col-8">
                </a>
            </div>
            <!-- Toggler -->
            <button class="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        </div>
        <!-- Menu -->
        <div class="collapse navbar-collapse bg-shadow justify-content-end" id="navbarNav">
            <ul class="navbar-nav align-items-center">

                @if (auth()->user())
                    <li class="nav-item ms-lg-4 ms-0">
                        <a class="nav-link text-white menu-hover-effect" href="{{ route('dashboard') }}">Dashboard</a>
                    </li>

                    <li class="nav-item ms-lg-4 ms-0">
                        <a class="nav-link text-white menu-hover-effect" href="{{ route('logout') }}"
                            onclick="event.preventDefault(); document.getElementById('logout-form').submit();"
                            href="#">Logout</a>

                        <form id="logout-form" action="{{ route('logout') }}" method="POST">
                            @csrf
                        </form>
                    </li>
                @else
                    <li class="nav-item ms-lg-4 ms-0">
                        <a class="nav-link text-white menu-hover-effect" href="{{ route('login') }}">Login</a>
                    </li>
                @endif

                @if (auth()->guest())
                    <li class="nav-item ms-lg-4 ms-0">
                        <a class="nav-link text-white menu-hover-effect"
                            href="{{ route('register.tab') }}">Register</a>
                    </li>
                @endif

            </ul>
        </div>
    </div>
</nav>

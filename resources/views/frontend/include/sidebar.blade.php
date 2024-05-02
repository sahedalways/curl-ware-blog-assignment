<div class="sidebar-wrapper sidebar-theme">


    @if (in_array(auth()->user()->user_type, ['user']))
        @php
            $prefix = Request::route()->getPrefix();
            $route = Route::current()->getName();
        @endphp

        <nav id="sidebar">
            <div class="shadow-bottom"></div>
            <ul class="list-unstyled menu-categories" id="accordionExample">
                {{-- Dashboard --}}
                <li class="menu">
                    <a style="text-decoration: none;" href="{{ route('dashboard') }}"
                        aria-expanded="{{ $route == 'dashboard' ? 'true' : 'false' }}"
                        class="{{ $route == 'dashboard' ? 'dropdown-toggle' : 'dropdown-toggle collapsed' }}">
                        <div class="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="feather feather-home">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                            <span>Dashboard</span>
                        </div>
                    </a>
                </li>

                </a>
                </li>



                {{-- blogs menu item here --}}
                <li class="menu">
                    <a style="text-decoration: none;" href="#blog" data-toggle="collapse" aria-expanded="false"
                        class="dropdown-toggle">
                        <div class="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M21 3H3v18h18V3zm-2 14H5M5 7h14M10 11h4" />
                            </svg>
                            <span>Blogs</span>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="feather feather-chevron-right">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </div>
                    </a>
                    <ul class="{{ $route == 'blog.index' || $route == 'blog.edit' || $route == 'blog.create' ? 'submenu list-unstyled collapse show' : 'collapse submenu list-unstyled' }}"
                        id="blog" data-parent="#accordionExample">

                        <li class="{{ $route == 'blog.index' ? 'active' : '' }}">
                            <a style="text-decoration: none;" href="{{ route('blog.index') }}">blog List</a>
                        </li>

                        <li class="{{ $route == 'blog.create' ? 'active' : '' }}">
                            <a style="text-decoration: none;" href="{{ route('blog.create') }}">Create Blog</a>
                        </li>
                    </ul>
                </li>

        </nav>
    @endif
</div>

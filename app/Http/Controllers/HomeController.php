<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;


class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    public function dashboard()
    {
        $userType = Auth::user()->user_type;

        if ($userType == 'admin') {
            return view('backend.admin.dashboard.dashboard');
        } else {
            return view('frontend.dashboard.dashboard');
        }
    }
}

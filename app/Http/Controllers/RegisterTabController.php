<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;

class RegisterTabController extends Controller
{
  public function getRegisterTab(Request $request)
  {
    return view('auth.login', ['isRegisterTab' => 1]);
  }
}

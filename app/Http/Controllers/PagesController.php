<?php

namespace App\Http\Controllers;

use App\Models\Blog;

class PagesController extends Controller
{


    public function blogItemDetails($id)
    {
        // Retrieve all blog from the database
        $blog = Blog::where('id', $id)->first();

        return view('frontend.blog_details', ['blog' => $blog]);
    }
}

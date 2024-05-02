<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Intervention\Image\ImageManagerStatic as Image;

class BlogController extends Controller
{
  public function index(Request $request)
  {
    // search query
    $q = $request->input('q');

    // Retrieve the current user's ID
    $user_id = auth()->id();

    // Query the blogs table to retrieve the latest blogs created by the current user
    $blogs = Blog::where('author_id', $user_id)->latest();


    // add search query here
    if ($q) {
      $blogs = $blogs->where('title', 'like', '%' . $q . '%');
    }

    $blogsData = $blogs->paginate(15);

    return view('frontend.blog.show', compact('blogsData'));
  }


  public function create()
  {
    return view('frontend.blog.add');
  }

  public function store(Request $request)
  {
    try {
      // Validate the incoming request data
      $validatedData = $request->validate([
        'title' => 'required|unique:blogs|max:255',
        'content' => 'required',
        'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:5048',
      ]);

      $validatedData['created_at'] = now();
      $validatedData['updated_at'] = now();
      $validatedData['author_id'] = auth()->id();

      // Process the image
      if ($request->hasFile('image')) {
        $ext = $request->file('image') ? strtolower($request->file('image')->getClientOriginalExtension()) : '';
        $validatedData['image'] = $ext;
      }

      $id = DB::table('blogs')
        ->insertGetId($validatedData);

      if ($ext) {
        $file = $request->file('image');
        $file->move(public_path('images/blog/'), $id . '-1.' . $ext);
        $pic = Image::make(public_path('images/blog/' . $id . '-1.' . $ext));

        // Save the modified image
        $pic->save();
      }


      return back()->with('sms', 'New blog created');
    } catch (\Throwable $th) {
      return back()->with('sms', $th->getMessage());
    }
  }


  public function edit($id)
  {
    $blogDetail = Blog::findOrFail($id);

    return view('frontend.blog.edit', compact('blogDetail'));
  }


  public function update(Request $request, $id)
  {
    $validatedData = $request->validate([
      'title' => 'required|max:255',
      'content' => 'required',
      'image' => 'image|mimes:jpeg,png,jpg,gif|max:5048',
    ]);


    $selected = DB::table("blogs")->find($id);
    $ext = $request->file('image');

    // Process the default image
    if ($ext) {
      // Check if the existing image file exists and delete it
      if (file_exists(public_path("images/blog/{$id}-1.{$selected->image}"))) {
        unlink(public_path("images/blog/{$id}-1.{$selected->image}"));
      }

      // Process the new image
      $file = $request->file('image');
      $ext = strtolower($file->getClientOriginalExtension());
      $file->move(public_path('images/blog/'), $id . '-1.' . $ext);
      $pic = Image::make(public_path('images/blog/' . $id . '-1.' . $ext));

      $pic->save();

      $validatedData['image'] = $ext;
    } else {
      $ext = $selected->image;
      $validatedData['image'] = $selected->image;
    }

    $update = DB::table('blogs')
      ->where('id', $id)
      ->update($validatedData);



    return redirect()->route('blog.index')->with('sms', 'Blog updated successfully.');
  }



  public function destroy($id)
  {
    $blog = Blog::findOrFail($id);

    $blog->delete();
    return redirect('/blog')->with('warning', 'You just deleted a blog');
  }
}

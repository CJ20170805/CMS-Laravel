<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function index()
    {
        $pages = Page::with('category')->get();
        $categories = Category::all();
        return Inertia::render('Admin/Release/list', [
            'pages' => $pages,
            'categories' => $categories
        ]);
    }

    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Admin/Release/index', [
            'categories' => $categories
        ]);
    }

   //show specifiy id's detail
   public function show($id)
   {
       $page = Page::with('category')->find($id);
       return Inertia::render('Admin/Release/show', [
           'page' => $page
       ]);
   }

   //update specifiy id's detail
   public function update(Request $request, $id)
   {
       $request->validate([
           'title' => 'required|string|max:255',
           'content' => 'required|string',
           'category_id' => 'required|exists:categories,id'
       ]);

       $page = Page::find($id);
       $page->update([
           'title' => $request->title,
           'content' => $request->content,
           'category_id' => $request->category_id
       ]);

       return redirect()->route('admin.release.list');
   }

   //delete specifiy id's detail
   public function destroy($id)
   {
       $page = Page::find($id);
       $page->delete();

       return redirect()->route('admin.release.list');
   }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id'
        ]);

        $page = Page::create([
            'title' => $request->title,
            'content' => $request->content,
            'user_id' => auth()->id(),
            'category_id' => $request->category_id
        ]);

        return redirect()->route('admin.release.list');
    }
}

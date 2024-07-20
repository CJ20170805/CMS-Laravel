<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function index(Request $request)
    {
        //$pages = Page::with('categories')->get();
        $categories = Category::all();
        return Inertia::render('Admin/Release/list', [
            // 'pages' => $pages,
            'categories' => $categories
        ]);
    }

    public function order(Request $request)
    {
        $sortBy = $request->query('sortBy', 'created_at');
        $sortDirection = $request->query('sortDirection', 'desc');

        $pages = Page::with('categories')->orderBy($sortBy, $sortDirection)->get();

        return response()->json($pages);
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
       $page = Page::with('categories')->find($id);
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
           'categories' => 'array',
           //'category_id' => 'required|exists:categories,id'
       ]);

       $page = Page::find($id);
       $page->update([
           'title' => $request->title,
           'content' => $request->content,
           //'category_id' => $request->category_id
       ]);
       
       if ($request->has('categories')) {
           $page->categories()->sync($request->categories);
       }


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
            // 'category_id' => 'required|exists:categories,id',
            'categories' => 'array'
        ]);

        $page = Page::create([
            'title' => $request->title,
            'content' => $request->content,
            'user_id' => auth()->id(),
            // 'category_id' => $request->category_id,
        ]);

        //$page = Page::create($request->all());

        if ($request->has('categories')) {
            $page->categories()->attach($request->categories);
        }

        return redirect()->route('admin.release.list');
    }
}

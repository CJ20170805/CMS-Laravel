<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Admin/Categories/index', [
            'categories' => $categories
        ]);
    }

    public function index()
    {
        // $categories = Category::all();
        $categories = Category::orderBy('id', 'desc')->get();

        return Inertia::render('Admin/Categories/list', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $category = Category::create($request->only('name'));

        return redirect()->route('admin.categories.list');
        
    }

    public function destroy($id)
    {
        $category = Category::find($id);
        $category->delete();
 
        return redirect()->route('admin.categories.list');
    }
 

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);
        
        $category = Category::find($id);
        $category->update($request->only('name'));

        return redirect()->route('admin.categories.list');
    }
}

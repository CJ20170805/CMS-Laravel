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
        $categories = Category::all();
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

    public function update(Request $request, Category $category)
    {
        $category->update($request->only('name'));
        return response()->json($category);
    }
}

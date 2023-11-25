<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Http\Requests\StoreBudgetRequest;
use App\Http\Requests\UpdateBudgetRequest;

class BudgetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $budgets = Budget::paginate(10);

        return response()->json($budgets);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Budget::render('Addresses/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBudgetRequest $request)
    {
        $data = $request->validated();

        $budget = Budget::create($data);

        return response()->json($budget, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $budget = Budget::find($id);

        if (!$budget) {
            return response()->json(['error' => 'Orçamento não encontrado.'], 404);
        }

        return response()->json( $budget);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return Budget::render(
            'Budgets/Edit',
            [
                'budget' => Budget::findOrFail($id),
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateBudgetRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateBudgetRequest $request, $id)
    {
        $budget = Budget::find($id);

        if (!$budget) {
            return response()->json(['error' => 'Orçamento não encontrado.'], 404);
        }

        $data = $request->validated();

        $budget->update($data);

        return response()->json($budget);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $budget = Budget::find($id);

        if (!$budget) {
            return response()->json(['error' => 'Orçamento não encontrado.'], 404);
        }

        $budget->budgetDetails()->delete(); // Exclui detalhes de orçamento associados

        $budget->delete();

        return response()->json(['message' => 'Orçamento deletado com sucesso.'], 200);
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\BudgetDetail;
use App\Http\Requests\StoreBudgetDetailRequest;
use App\Http\Requests\UpdateBudgetDetailRequest;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BudgetDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('BudgetDetails/Index', [
            'budgetDetails' =>
            BudgetDetail::latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('BudgetDetails/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBudgetDetailRequest $request)
    {
        $budgetDetail = $request->validated();

        $create = $request->user()->budgetDetails()->create($budgetDetail);

        if ($create) {
            return redirect()->route('budget-details.index');
        }
        return abort(500);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('BudgetDetails/Show', [
            'budgetDetail' => BudgetDetail::findOrFail($id),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        return Inertia::render(
            'BudgetDetails/Edit',
            [
                'budgetDetail' => BudgetDetail::findOrFail($id),
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBudgetDetailRequest $request, string $id)
    {    

        // Encontra o BudgetDetail a ser atualizado
        $budgetDetail = BudgetDetail::findOrFail($id);

        $this->authorize('update', $budgetDetail);

        // Valida os dados do formulário usando UpdateBudgetDetailRequest
        $validatedData = $request->validated();

        // Atualize outros campos com os dados validados
        $budgetDetail->update($validatedData);

        return redirect()->route('budget-details.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $budgetDetail = BudgetDetail::findOrFail($id);

        $this->authorize('delete', $budgetDetail);

        $delete = $budgetDetail->delete();

        if ($delete) {
            return redirect()->route('budget-details.index');
        }

        return abort(500);
    }
}
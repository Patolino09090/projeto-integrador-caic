<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AddressController;
use App\Http\Controllers\BudgetDetailController;
use App\Http\Controllers\BudgetTypeController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\EntityController;
use App\Http\Controllers\NeighborhoodController;
use App\Http\Controllers\PriceListController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductTypeController;
use App\Http\Controllers\StateController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\ZipCodeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::apiResource('/countries', CountryController::class);
Route::apiResource('/states', StateController::class);
Route::apiResource('/cities', CityController::class);
Route::apiResource('/neighborhoods', NeighborhoodController::class);
Route::apiResource('/zip-codes', ZipCodeController::class);
Route::apiResource('/entities', EntityController::class);
Route::apiResource('/addresses', AddressController::class);
Route::apiResource('/budgeted-types', BudgetTypeController::class);
Route::apiResource('/product-types', ProductTypeController::class);
Route::apiResource('/products', ProductController::class);
Route::apiResource('/stores', StoreController::class);
Route::apiResource('/budgets', BudgetController::class);
Route::apiResource('/budget-datails', BudgetDetailController::class);
Route::apiResource('/price-list', PriceListController::class);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ClientCompanyController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DealController;
use App\Http\Controllers\InviteController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\MyCompanyController;
use App\Http\Controllers\QuoteController;
use App\Http\Controllers\SupportMessageController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\auth;
use App\Http\Middleware\InjectoRoleIntoRequest;
use Illuminate\Support\Facades\Route;



// TODO: Take the Data from the Contact Us Form
// TODO: proress the Message & it type
// TODO: Create a Good Prompt for AI
// TODO:  Get response from the AI
// TODO:  Send the response to the user via email

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgotpassword', [AuthController::class, 'forgotPassword']);
Route::post('/resetpassword', [AuthController::class, 'resetPassword']);
Route::post('/invitation/{id}', [AuthController::class, 'registerWithInvitation']);

Route::middleware([auth::class, InjectoRoleIntoRequest::class])->group(function () {
    Route::get('/profile', [UserController::class, 'profile']);
    Route::delete('/account/delete', [UserController::class, 'deleteAccount']);
    Route::post('/profile', [UserController::class, 'update']);
    Route::patch('/changepassword', [AuthController::class, 'changePassword']);
    Route::get('/logout', [AuthController::class, 'logout']);

    Route::get('/dashboard/info', [UserController::class, 'getStats']);

    Route::post('/setup', [MyCompanyController::class, 'store']);
    Route::get('/mycompany', [MyCompanyController::class, 'index']);
    Route::post('/mycompany', [MyCompanyController::class, 'update']);

    Route::get('/invite', [InviteController::class, 'index']);
    Route::post('/invite', [InviteController::class, 'store']);
    Route::delete('/invite/revoke/{id}', [InviteController::class, 'destroy']);

    Route::get('/users', [MyCompanyController::class, 'users']);
    Route::get('/user/{id}', [MyCompanyController::class, 'getUser']);
    Route::patch('/user/{id}', [MyCompanyController::class, 'updateUserRole']);
    Route::delete('/user/{id}', [MyCompanyController::class, 'deleteUser']);

    Route::get('/clients', [ClientCompanyController::class, 'index']);
    Route::get('/client/{id}', [ClientCompanyController::class, 'getClientCompany']);
    Route::post('/client', [ClientCompanyController::class, 'store']);
    Route::put('/client/{id}', [ClientCompanyController::class, 'update']);
    Route::delete('/client/{id}', [ClientCompanyController::class, 'destroy']);

    Route::get('/contacts', [ContactController::class, 'allContacts']);
    Route::get('/client/{clientId}/contacts', [ContactController::class, 'contacts']);
    Route::get('/client/{clientId}/contact/{contactId}', [ContactController::class, 'getContact']);
    Route::post('/client/{clientId}/contact', [ContactController::class, 'storeContact']);
    Route::put('/client/{clientId}/contact/{contactId}', [ContactController::class, 'updateContact']);
    Route::delete('/client/{clientId}/contact/{contactId}', [ContactController::class, 'destroyContact']);


    Route::get('/deals', [DealController::class, 'index']);
    Route::get('/deal/{id}', [DealController::class, 'show']);
    Route::post('/deal', [DealController::class, 'store']);
    Route::put('/deal/{id}', [DealController::class, 'update']);
    Route::patch('/deal/{id}', [DealController::class, 'updateStatus']);
    Route::patch('/deal/{id}/assign', [DealController::class, 'assign']);
    Route::patch('/deal/{id}/unassign', [DealController::class, 'unassign']);
    Route::delete('/deal/{id}', [DealController::class, 'destroy']);


    Route::get('tasks', [TaskController::class, 'index']);
    Route::get('mytasks', [TaskController::class, 'myTasks']);
    Route::get('task/{id}', [TaskController::class, 'show']);
    Route::post('task', [TaskController::class, 'store']);
    Route::put('task/{id}', [TaskController::class, 'update']);
    Route::delete('task/{id}', [TaskController::class, 'destroy']);
    Route::patch('task/{id}/assign', [TaskController::class, 'assigneeTo']);
    Route::patch('task/{id}/unassign', [TaskController::class, 'unassign']);


    Route::get('/chats', [ChatController::class, 'index']);
    Route::get('/chat/{id}', [ChatController::class, 'show']);
    Route::post('/chat', [ChatController::class, 'store']);
    Route::delete('/chat/{id}', [ChatController::class, 'destroy']);

    Route::post('/messages/{chatid}', [MessageController::class, 'sendMessage']);

    Route::get('/quotes', [QuoteController::class, 'index']);
    Route::get('/quote/{id}', [QuoteController::class, 'show']);
    Route::post('/quote', [QuoteController::class, 'store']);
    Route::put('/quote/{id}', [QuoteController::class, 'update']);
    Route::delete('/quote/{id}', [QuoteController::class, 'destroy']);
    Route::post('/quote/{id}/send', [QuoteController::class, 'sendQuote']);
    Route::get('/quote/{id}/pdf', [QuoteController::class, 'exportPdf']);


});

Route::post('/support/message', [SupportMessageController::class, 'store']);


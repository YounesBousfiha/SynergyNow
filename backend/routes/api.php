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
use App\Http\Middleware\verifyRole;
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
    Route::get('/profile', [UserController::class, 'profile']); // TODO: not used
    Route::delete('/account/delete', [UserController::class, 'deleteAccount']);
    Route::post('/profile', [UserController::class, 'update'])->middleware(verifyRole::class . ':agent');
    Route::patch('/changepassword', [AuthController::class, 'changePassword'])->middleware(verifyRole::class . ':agent');
    Route::get('/logout', [AuthController::class, 'logout'])->middleware(verifyRole::class . ':agent');

    Route::get('/dashboard/info', [UserController::class, 'getStats'])->middleware(verifyRole::class . ':agent');

    Route::post('/setup', [MyCompanyController::class, 'store'])->middleware(verifyRole::class . ':superadmin');
    Route::get('/mycompany', [MyCompanyController::class, 'index'])->middleware(verifyRole::class . ':agent');
    Route::post('/mycompany', [MyCompanyController::class, 'update'])->middleware(verifyRole::class . ':superadmin');

    Route::get('/invite', [InviteController::class, 'index'])->middleware(verifyRole::class . ':superadmin');
    Route::post('/invite', [InviteController::class, 'store'])->middleware(verifyRole::class . ':superadmin');
    Route::delete('/invite/revoke/{id}', [InviteController::class, 'destroy'])->middleware(verifyRole::class . ':superadmin');

    Route::get('/users', [MyCompanyController::class, 'users'])->middleware(verifyRole::class . ':superadmin');
    Route::get('/user/{id}', [MyCompanyController::class, 'getUser'])->middleware(verifyRole::class . ':superadmin');
    Route::patch('/user/{id}', [MyCompanyController::class, 'updateUserRole'])->middleware(verifyRole::class . ':superadmin');
    Route::delete('/user/{id}', [MyCompanyController::class, 'deleteUser'])->middleware(verifyRole::class . ':superadmin');

    Route::get('/clients', [ClientCompanyController::class, 'index'])->middleware(verifyRole::class . ':agent');
    Route::get('/client/{id}', [ClientCompanyController::class, 'getClientCompany'])->middleware(verifyRole::class . ':agent');
    Route::post('/client', [ClientCompanyController::class, 'store'])->middleware(verifyRole::class . ':admin');
    Route::put('/client/{id}', [ClientCompanyController::class, 'update'])->middleware(verifyRole::class . ':admin');
    Route::delete('/client/{id}', [ClientCompanyController::class, 'destroy'])->middleware(verifyRole::class . ':admin');

    Route::get('/contacts', [ContactController::class, 'allContacts'])->middleware(verifyRole::class . ':agent');
    Route::get('/client/{clientId}/contacts', [ContactController::class, 'contacts'])->middleware(verifyRole::class . ':agent');
    Route::get('/client/{clientId}/contact/{contactId}', [ContactController::class, 'getContact'])->middleware(verifyRole::class . ':agent');
    Route::post('/client/{clientId}/contact', [ContactController::class, 'storeContact'])->middleware(verifyRole::class . ':admin');
    Route::put('/client/{clientId}/contact/{contactId}', [ContactController::class, 'updateContact'])->middleware(verifyRole::class . ':admin');
    Route::delete('/client/{clientId}/contact/{contactId}', [ContactController::class, 'destroyContact'])->middleware(verifyRole::class . ':admin');


    Route::get('/deals', [DealController::class, 'index'])->middleware(verifyRole::class . ':agent');
    Route::get('/deal/{id}', [DealController::class, 'show'])->middleware(verifyRole::class . ':agent');
    Route::post('/deal', [DealController::class, 'store'])->middleware(verifyRole::class . ':admin');
    Route::put('/deal/{id}', [DealController::class, 'update'])->middleware(verifyRole::class . ':admin');
    Route::patch('/deal/{id}', [DealController::class, 'updateStatus'])->middleware(verifyRole::class . ':admin');
    Route::patch('/deal/{id}/assign', [DealController::class, 'assign'])->middleware(verifyRole::class . ':admin');
    Route::patch('/deal/{id}/unassign', [DealController::class, 'unassign'])->middleware(verifyRole::class . ':admin');
    Route::delete('/deal/{id}', [DealController::class, 'destroy'])->middleware(verifyRole::class . ':admin');


    Route::get('tasks', [TaskController::class, 'index'])->middleware(verifyRole::class . ':agent');
    Route::get('mytasks', [TaskController::class, 'myTasks'])->middleware(verifyRole::class . ':agent');
    Route::get('task/{id}', [TaskController::class, 'show'])->middleware(verifyRole::class . ':agent');
    Route::post('task', [TaskController::class, 'store'])->middleware(verifyRole::class . ':admin');
    Route::put('task/{id}', [TaskController::class, 'update'])->middleware(verifyRole::class . ':admin');
    Route::delete('task/{id}', [TaskController::class, 'destroy'])->middleware(verifyRole::class . ':admin');
    Route::patch('task/{id}/assign', [TaskController::class, 'assigneeTo'])->middleware(verifyRole::class . ':admin');
    Route::patch('task/{id}/unassign', [TaskController::class, 'unassign'])->middleware(verifyRole::class . ':admin');


    Route::get('/chats', [ChatController::class, 'index'])->middleware(verifyRole::class . ':agent');
    Route::get('/chat/{id}', [ChatController::class, 'show'])->middleware(verifyRole::class . ':agent');
    Route::post('/chat', [ChatController::class, 'store'])->middleware(verifyRole::class . ':agent');
    Route::delete('/chat/{id}', [ChatController::class, 'destroy'])->middleware(verifyRole::class . ':agent');

    Route::post('/messages/{chatid}', [MessageController::class, 'sendMessage'])->middleware(verifyRole::class . ':agent');

    Route::get('/quotes', [QuoteController::class, 'index'])->middleware(verifyRole::class . ':agent');
    Route::get('/quote/{id}', [QuoteController::class, 'show'])->middleware(verifyRole::class . ':agent');;
    Route::post('/quote', [QuoteController::class, 'store'])->middleware(verifyRole::class . ':admin');;
    Route::put('/quote/{id}', [QuoteController::class, 'update'])->middleware(verifyRole::class . ':admin');;
    Route::delete('/quote/{id}', [QuoteController::class, 'destroy'])->middleware(verifyRole::class . ':admin');;
    Route::post('/quote/{id}/send', [QuoteController::class, 'sendQuote'])->middleware(verifyRole::class . ':agent');;
    Route::get('/quote/{id}/pdf', [QuoteController::class, 'exportPdf'])->middleware(verifyRole::class . ':agent');;


});

Route::post('/support/message', [SupportMessageController::class, 'store']);


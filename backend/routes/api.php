<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ClientCompanyController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DealController;
use App\Http\Controllers\InviteController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\MyCompanyController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\auth;
use Illuminate\Support\Facades\Route;

Route::get('/login', function () {
    return response()->json(['message' => 'API is working!']);
});


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgotpassword', [AuthController::class, 'forgotPassword']);
Route::post('/resetpassword', [AuthController::class, 'resetPassword']);

Route::middleware(auth::class)->group(function () {
    Route::get('/profile', [UserController::class, 'profile']);
    Route::patch('/profile', [UserController::class, 'updateName']);
    Route::patch('/changeemail', [UserController::class, 'changeEmail']);
    Route::delete('/account/delete', [UserController::class, 'deleteAccount']);
    Route::put('/changepassword', [AuthController::class, 'changePassword']);
    Route::get('/logout', [AuthController::class, 'logout']);

    Route::post('/setup', [MyCompanyController::class, 'store']);
    Route::get('/mycompany', [MyCompanyController::class, 'index']);
    Route::post('/mycompany', [MyCompanyController::class, 'update']);

    Route::get('/invite', [InviteController::class, 'index']);
    Route::post('/invite', [InviteController::class, 'store']);
    Route::delete('/invite/revoke/{id}', [InviteController::class, 'destroy']);
    Route::post('/invitation/{id}', [AuthController::class, 'registerWithInvitation']);

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

    Route::get('/contact/{contactId}/notes', [NoteController::class, 'ContactNotes']);
    Route::post('/contact/{contactId}/notes', [NoteController::class, 'store']);
    Route::put('/contact/{contactId}/notes/{noteId}', [NoteController::class, 'update']);
    Route::delete('/contact/{contactId}/notes/{noteId}', [NoteController::class, 'destroy']);

    Route::get('/services', [ServiceController::class, 'index']);
    Route::get('/service/{id}', [ServiceController::class, 'show']);
    Route::post('/service', [ServiceController::class, 'store']);
    Route::put('/service/{id}', [ServiceController::class, 'update']);
    Route::delete('/service/{id}', [ServiceController::class, 'destroy']);

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

    Route::get('/test-gmail', function () {
        $client = new Google_Client();
        $client->setAuthConfig(storage_path('app/google/client_secret.json'));
        $client->setRedirectUri(route('google.callback'));
        $client->addScope(Google_Service_Gmail::GMAIL_READONLY);
        $client->setAccessType('offline');
        $client->setPrompt('consent');

        if (!request()->has('code')) {
            return redirect($client->createAuthUrl()); // Redirect user to Google login
        }

        $token = $client->fetchAccessTokenWithAuthCode(request('code'));
        $client->setAccessToken($token);

        // Fetch Gmail messages
        $service = new Google_Service_Gmail($client);
        $messages = $service->users_messages->listUsersMessages('me');

        return response()->json($messages);
    })->name('google.callback');
});

<?php

namespace Tests;

use App\Exceptions\Handler;
use Exception;
use App\Models\User;
use Illuminate\Contracts\Debug\ExceptionHandler;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    protected $baseUrl;


    public function __construct( $name = null, array $data = [], $dataName = '' )
    {
        parent::__construct($name, $data, $dataName);

        $this->baseUrl = env('APP_URL');
    }

    /**
     * Sets a JWT for the current user
     *
     * @param $user
     */
    public function authenticate( $user )
    {
        JWTAuth::setToken(JWTAuth::fromUser($user));
    }

    protected function disableExceptionHandling()
    {
        $this->app->instance(ExceptionHandler::class, new class extends Handler
        {
            public function __construct()
            {
            }

            public function report( Exception $e )
            {
            }

            public function render( $request, Exception $e )
            {
                throw $e;
            }
        });
    }

    /**
     * Checks to see if validation error is present
     *
     * @param $response
     * @param $field
     */
    protected function assertValidationError( $response, $field )
    {
        $response->assertStatus(422);

        $this->assertTrue(array_has($response->decodeResponseJson(), "data.{$field}"));
    }

    /**
     * Create a user that is marked as a admin
     *
     * @return mixed
     */
    protected function userAdmin()
    {
        $user = factory(User::class)->create();
        $user->makeAdmin();

        return $user;
    }

    /**
     * Create a user that is marked as a member
     *
     * @return mixed
     */
    protected function userMember()
    {
        $user = factory(User::class)->create();
        $user->makeMember();

        return $user;
    }

    protected function outputSuccess( $data, $response )
    {
        $response->assertJson([
            'success' => true,
            'data'    => $data,
        ]);
    }

    protected function outputError( $data, $response )
    {
        $response->assertJson([
            'success' => false,
            'data'    => $data,
        ]);
    }
}

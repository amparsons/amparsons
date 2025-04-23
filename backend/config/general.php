<?php

use craft\helpers\App;

return [
    'driver' => App::env('DB_DRIVER') ?: 'mysql',
    'server' => App::env('DB_SERVER'),
    'user' => App::env('DB_USER'),
    'password' => App::env('DB_PASSWORD'),
    'database' => App::env('DB_DATABASE'),
    'port' => (int)(App::env('DB_PORT') ?: 3306),
    'tablePrefix' => App::env('DB_TABLE_PREFIX') ?: '',
];

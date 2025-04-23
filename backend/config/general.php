<?php

use craft\helpers\App;

return [
    'headlessMode' => true,
    'defaultWeekStartDay' => 1,
    'omitScriptNameInUrls' => true,
    'preloadSingles' => true,
    'preventUserEnumeration' => true,
    'aliases' => [
        '@webroot' => dirname(__DIR__) . '/web',
    ],
    'devMode' => App::env('APP_ENV') !== 'production',
];
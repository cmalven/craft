<?php
/**
 * Sentry Logger plugin config.
 *
 * Overrides the plugin settings stored in project config.
 */

use craft\helpers\App;

return [
    // Don't send PHP/Twig errors to Sentry from local development.
    'enabled' => App::env('CRAFT_ENVIRONMENT') !== 'dev',
    'anonymous' => true,
    'dsn' =>
        'https://0e2cd970258167171a672ac1c64923c5@o199825.ingest.us.sentry.io/4508365321273344',
    'release' => null,
    'environment' => null,
    'levels' => ['error', 'warning'],
    // 400s are bad requests (failed CSRF checks, expired preview tokens), mostly from bots.
    'exceptCodes' => [400, 403, 404],
    'exceptPatterns' => [],
    'userPrivacy' => [
        'cookies',
        'email',
        'id',
        'ip_address',
        'permissions',
        'username',
    ],
];

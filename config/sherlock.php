<?php
/**
 * @copyright Copyright (c) PutYourLightsOn
 */

/**
 * Sherlock config.php
 *
 * This file exists only as a template for the Sherlock settings.
 * It does nothing on its own.
 *
 * Don't edit this file, instead copy it to 'craft/config' as 'sherlock.php'
 * and make your changes there to override default settings.
 *
 * Once copied to 'craft/config', this file will be multi-environment aware as
 * well, so you can have different settings groups for each environment, just as
 * you do for 'general.php'
 */

return [
    '*' => [
        // Whether to monitor scans. If enabled, control panel alerts will be shown to all users that have access to the Sherlock plugin and notification emails will be sent if the site scan status changes from pass to fail and if any critical updates are detected.
        'monitor' => true,

        // Enter the email addresses (separated by commas) that should be notified of security issues.
        'notificationEmailAddresses' => '',

        // Whether Sherlock should be extra critical of security issues and the resulting warnings.
        'highSecurityLevel' => true,

        // Protects your site by setting HTTP response headers that provide added security.
        'headerProtectionSettings' => [
            'enabled' => true,
            'headers' => [
                [true, 'Strict-Transport-Security', 'max-age=31536000'],
                [true, 'X-Content-Type-Options', 'nosniff'],
                [true, 'X-Frame-Options', 'SAMEORIGIN'],
                [true, 'X-Xss-Protection', '1; mode=block'],
                [true, 'Referrer-Policy', 'strict-origin-when-cross-origin'],
                [true, 'Permissions-Policy', 'geolocation=()'],
                [
                    true,
                    'Expect-CT',
                    'max-age=86400, report-uri="https://xxxxx.ingest.sentry.io/api/xxxxx/security/?sentry_key=xxxxxxxxxxxxxxxxxxxx"',
                ],
            ],
        ],

        // Enables a content security policy on the front-end of your site.
        // See https://content-security-policy.com/
        'contentSecurityPolicySettings' => [
            'enabled' => true,
            'enforce' => true,
            'header' => true,
            'directives' => [
                [
                    true,
                    'report-uri',
                    'https://xxxxx.ingest.sentry.io/api/xxxxx/security/?sentry_key=xxxxxxxxxxxxxxxxxxxx',
                ],
                [true, 'default-src', "'self' https"],
                [
                    true,
                    'script-src',
                    "'self' 'unsafe-inline' 'unsafe-eval' https://localhost:3111 https://*.marker.io https://www.googletagmanager.com https://unpkg.com https://www.google.com https://www.gstatic.com",
                ],
                [
                    true,
                    'style-src',
                    "'self' 'unsafe-inline' https://localhost:3111 https://unpkg.com https://fonts.googleapis.com",
                ],
                [true, 'worker-src', 'blob: '],
                [
                    true,
                    'frame-src',
                    'https://www.google.com https://player.vimeo.com https://app.marker.io',
                ],
                [true, 'media-src', 'https://servd-xxxxxxxxx.b-cdn.net data: '],
                [true, 'child-src', 'blob: '],
                [true, 'font-src', "'self' https://localhost:3111  data: "],
                [
                    true,
                    'img-src',
                    "'self' https://localhost:3111 https://xxxxxxxxx.files.svdcdn.com https://xxxxxxxxx.transforms.svdcdn.com data: ",
                ],
                [
                    true,
                    'connect-src',
                    "'self' wss://localhost:3111 https://*.ingest.sentry.io https://*.marker.io https://www.google-analytics.com data:",
                ],
                [true, 'manifest-src', "'self'"],
            ],
        ],

        // A random 32 character string that will allow calls to the plugin API.
        //'apiKey' => '',

        // Restrict access to the control panel to the following IP addresses (logged in admins always have access).
        //'restrictControlPanelIpAddresses' =>  = [],

        // Restrict access to the front-end to the following IP addresses (logged in admins always have access).
        //'restrictFrontEndIpAddresses' =>  = [],

        // Add tests to disable to the array.
        //'disabledTests' => [],
    ],
    'dev' => [
        'monitor' => false,

        'contentSecurityPolicySettings' => [
            'enabled' => true,
            'enforce' => true,
        ],
    ],
];

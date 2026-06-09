<?php

use craft\helpers\App;

/**
 * Configuration file for Imager
 *
 * Multi-environment settings work in this file the same way as in general.php or db.php
 */

return [
    'transformer' => App::env('IMAGER_TRANSFORMER') ?: 'craft',
    'allowUpscale' => true,
    'fillTransforms' => true,
    'fillInterval' => 400,
    'useForCpThumbs' => true,
];

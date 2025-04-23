<?php

$vendorDir = dirname(__DIR__);
$rootDir = dirname(dirname(__DIR__));

return array (
  'craftcms/webhooks' => 
  array (
    'class' => 'craft\\webhooks\\Plugin',
    'basePath' => $vendorDir . '/craftcms/webhooks/src',
    'handle' => 'webhooks',
    'aliases' => 
    array (
      '@craft/webhooks' => $vendorDir . '/craftcms/webhooks/src',
    ),
    'name' => 'Webhooks',
    'version' => '3.1.0',
    'description' => 'Post webhooks when events are triggered in Craft CMS.',
    'developer' => 'Pixel & Tonic',
    'developerUrl' => 'https://pixelandtonic.com/',
    'developerEmail' => 'support@craftcms.com',
    'documentationUrl' => 'https://github.com/craftcms/webhooks/blob/master/README.md',
  ),
  'craftcms/ckeditor' => 
  array (
    'class' => 'craft\\ckeditor\\Plugin',
    'basePath' => $vendorDir . '/craftcms/ckeditor/src',
    'handle' => 'ckeditor',
    'aliases' => 
    array (
      '@craft/ckeditor' => $vendorDir . '/craftcms/ckeditor/src',
    ),
    'name' => 'CKEditor',
    'version' => '4.6.0',
    'description' => 'Edit rich text content in Craft CMS using CKEditor.',
    'developer' => 'Pixel & Tonic',
    'developerUrl' => 'https://pixelandtonic.com/',
    'developerEmail' => 'support@craftcms.com',
    'documentationUrl' => 'https://github.com/craftcms/ckeditor/blob/master/README.md',
  ),
);

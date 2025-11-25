<?php
/* common all component */
$publishPath = dirname(dirname(dirname(__FILE__)));
if (is_file($publishPath . '/.rvsdevelop')) {
    define('RVS_DEVELOP', 1); 
}
//for developer open error_reporting(E_ALL)
if (defined('RVS_DEVELOP') === false) {
	if (defined('E_DEPRECATED')) {
		error_reporting(E_ALL & ~(E_NOTICE | E_WARNING | E_STRICT | E_DEPRECATED));
	} else {
		error_reporting(E_ALL & ~(E_NOTICE));
	}
// 	$runtimeValue = @get_magic_quotes_runtime();
	$runtimeValue = (function_exists('get_magic_quotes_runtime')) ? get_magic_quotes_runtime() : false;
	if ($runtimeValue) {
		ini_set('magic_quotes_runtime', 0);
	}
	
//     $gpcValue = @get_magic_quotes_gpc();
    $gpcValue = (function_exists('get_magic_quotes_gpc')) ? get_magic_quotes_gpc() : false;
    if ($gpcValue) {
        ini_set('magic_quotes_gpc', 0);
    }
}
?>
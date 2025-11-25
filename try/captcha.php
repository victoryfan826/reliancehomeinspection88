<?
// secret key: google account: pairote@rvglobalsoft.com
// goto gen: https://www.google.com/recaptcha/admin

define('DATA_SITE_KEY', '6Lezil4UAAAAAHVcOaeatj6ziSmbq2yD0Nz22Vk4');
define('SECRET_KET', '6Lezil4UAAAAABX6mWRR9SuXFmKk4amfhPvGrU9h');

$dataSiteKey = DATA_SITE_KEY; // you got this from the signup page
$recaptCha = '<div class="g-recaptcha" data-sitekey="' . $dataSiteKey . '"></div>';
// Get reCaptcha HTML
echo "document.write('".preg_replace("/\n/", "\\n", $recaptCha)."');\n\n";
// contentloaded event
echo "var jotevent = {domLoad:[],domLoaded: function(){if (arguments.callee.done) {return;}arguments.callee.done = true;for (i = 0; i < jotevent.domLoad.length; i++) {jotevent.domLoad[i]();}},onDomLoaded: function(A){this.domLoad.push(A);if (document.addEventListener) {document.addEventListener('DOMContentLoaded', jotevent.domLoaded, null);} else {if (navigator.appVersion.indexOf('MSIE')!=-1) {document.write('<script id=__ie_onload defer ' + ((location.protocol == 'https:') ? 'src=\'javascript:void(0)\'' : 'src=//0') + '><\/script>');document.getElementById('__ie_onload').onreadystatechange = function(){if (this.readyState == 'complete') {jotevent.domLoaded()}}}}window.onload = jotevent.domLoaded}};\n\n";
// Initiate
echo "

jotevent.onDomLoaded(function(){
    if (document.getElementById('uword')) {
        document.getElementById('uword').parentNode.removeChild(document.getElementById('uword'));
    }
    if (window['validate'] !== undefined) {
        document.getElementById('recaptcha_response_field').onblur = function(){
            validate(document.getElementById('recaptcha_response_field'), 'Required');
        }
    }
    document.getElementsByName('recaptcha_challenge_field')[0].setAttribute('name', 'anum');
    document.getElementsByName('recaptcha_response_field')[0].setAttribute('name', 'qCap');
});

";

exit;

include_once "lib/db.php";
include "lib/sql_form.php";
$c = cimg();

echo "document.write(\" ".$c." \")";

?>
<?php
//if (class_exists('rvEmail') === false) {
	class rvEmail
	{
		public static function singleton($autoLoad = true)
		{
			static $instance;
			if (!isset($instance)) {
				$class = __CLASS__;
				$instance = new $class($autoLoad);
			}
			return $instance;
		}

		function onlineFormMail($message, $FormMail, $subject, $toMail, $ob)
		{
			//seagull_mod
			if (defined('SGL_CORE_DIR')) {
				require_once SGL_CORE_DIR . '/Emailer.php';
			} else {
				require_once 'Mail.php';
                require_once 'Mail/mime.php';
			}

			if (class_exists('SGL_Config') && !count($this->conf)) {
				$c = &SGL_Config::singleton();
				$this->conf = $c->aProps;
			}

			$obj = &rvEmail::singleton();

            if (class_exists('SGL_Emailer')) {
                $mail = &SGL_Emailer::factory();
            } else {
                $mail = $obj->_factory();
            }
            $crlf = (class_exists('SGL_String')) ? SGL_String::getCrlf() : $obj->getCrlf();
			$mime = new Mail_mime($crlf);
			$html = $message;
			$mime->setHTMLBody($html);
		 $headers = array ('MIME-Version' => '1.0'
		 , 'From' => $FormMail
		 , 'Subject' => $subject
		 , 'Content-Type' => "multipart/mixed;\n\tboundary=\"".$ob."\"\n"
		 , 'To' => $toMail
		 , 'Reply-To' => $FormMail
		 );
		 $body= '';
		 $body .=  $message;
		 $ok = $mail->send($toMail, $headers, $body);
		}


		function jotFormMail($email,$contentHtml, $subject, $toMail, $attachment_tmp, $attachment_name, $contentPlain)
		{
			//echo"xxxxxxxxxx";
			if (defined('SGL_CORE_DIR')) {
				require_once SGL_CORE_DIR . '/Emailer.php';
			} else {
                require_once 'Mail.php';
                require_once 'Mail/mime.php';
			}

			if (class_exists('SGL_Config') && !count($this->conf)) {
				$c = &SGL_Config::singleton();
				$a = $c->getAll();
				$this->conf = $a;
			}

			$obj = &rvEmail::singleton();

			if (class_exists('SGL_Emailer')) {
				$mail = SGL_Emailer::factory();
			} else {
				$mail = $obj->_factory();
			}

            $message = new Mail_mime();
            //form mail attach file
			$pathFile = dirname(dirname(dirname(__FILE__))) .'/form/files';
			if (is_dir($pathFile) === false) {
				@mkdir($pathFile);
			}

			foreach ($attachment_tmp as $key => $val) {
				$path_of_uploaded_file = $pathFile . '/' . $attachment_name[$key];
				if (!copy($val, $path_of_uploaded_file)) {
					echo 'error while copying the uploaded file'; exit;
				}
			    $message->addAttachment($path_of_uploaded_file);
			}


            //$message->setTXTBody($contentPlain);
            $message->setHTMLBody($contentHtml);
            $body = $contentPlain;
			$body .= $message->get();
			$extraheaders = array(
			                     'Content-Type' => 'text/html; charset=utf-8'
                                 ,'Content-Transfer-Encoding' => '7bit'
			                     ,'From' => $email
			                     ,'Subject' => $subject
			                     ,'To' => $toMail
			                     ,'Reply-To' => $email
			                     );
			$headers = $message->headers($extraheaders);
			if (!count($attachment_tmp)) {
				//is not attachfile
				//fixed header charset utf-8
				$headers['Content-Type'] = 'text/html; charset=utf-8';
			}
			//fixed subject
			$headers['Subject'] = $subject;
			//fixed body charset utf-8
			$body = str_replace('charset=ISO-8859-1', 'charset=utf-8', $body);
			//$mail = Mail::factory("mail");
			$mail->send($toMail, $headers, $body);

		}

		function &_factory()
		{
			$obj = &rvEmail::singleton();
            $conf = $obj->loadConf();
			$backend = '';
			$aParams = array();
			// setup Mail::factory backend & params using site config
			switch ($conf['backend']) {
				case '':
				case 'mail':
					$backend = 'mail';
					break;

				case 'sendmail':
					$backend = 'sendmail';
					$aParams['sendmail_path'] = $conf['sendmailPath'];
					$aParams['sendmail_args'] = $conf['sendmailArgs'];
					break;

				case 'smtp':
					$backend = 'smtp';
					if (isset($conf['smtpLocalHost'])) {
						$aParams['localhost'] = $conf['smtpLocalHost'];
					}

					$aParams['host'] = (isset($conf['smtpHost']))
					? $conf['smtpHost']
					: '127.0.0.1';

					if (isset($conf['smtpSecureTLS']) && $conf['smtpSecureTLS'] == '1') {
						$aParams['host'] = 'ssl://' . $aParams['host'];
					}

					$aParams['port'] = (isset($conf['smtpPort']))
					? $conf['smtpPort']
					: 25;

					/*if ($conf['smtpAuth']) {
						$aParams['auth']     = $conf['smtpAuth'];
						$aParams['username'] = $conf['smtpUsername'];
						$aParams['password'] = $conf['smtpPassword'];
					} else {
						$aParams['auth'] = false;
					}*/
					$aParams['auth']     = true;
					$aParams['username'] = $conf['smtpUsername'];
					$aParams['password'] = $conf['smtpPassword'];


					break;

				default:
					error_log('Unrecognised PEAR::Mail backend');
			}
			return Mail::factory($backend, $aParams);
		}

		function getRvsitebuildDir($homeUser = null)
		{
			$rvsDir = dirname(__FILE__);
			$i = 0;
			do {
				if (@is_dir($rvsDir . '/.rvsitebuilder')) {
					return $rvsDir;
				}
				$rvsDir = dirname($rvsDir);
				$i++;
			} while ($i < 30);
			die('Cannot find home dir.');
		}

		public static function _getHomeUser()
		{
			$publishPath = dirname(dirname(dirname(dirname(__FILE__))));

			if (is_file($publishPath . '/.rvsPublish.ini.php')) {
				$aCompoConf = parse_ini_file($publishPath . '/.rvsPublish.ini.php', true);
			}
			$homeDir = (isset($aCompoConf['home_user'])) ? $aCompoConf['home_user'] : self::getRvsitebuildDir();
			return $homeDir;
		}

		/**
		 * key return output
		 *
		 project_id={project_id}
		 home_user="{home_user}"
		 publish_path="{publish_path}"
		 publish_url="{publish_domain}"
		 component_path="../"
		 publish_lang_file="english-utf-8"
		 folderExists=1
		 fileOption=1
		 isResponsive=1
		 Online_Form=1.01
		 * @param string $key
		 * @return Ambigous <unknown, multitype:>
		 */
		public static function _loadPublishConf($key = '')
		{
			$path = dirname(dirname(dirname(dirname(__FILE__)))) . '/.rvsPublish.ini.php';

			$aPublish = (is_file($path)) ? parse_ini_file($path, true) : array();
			return ($key != '' && isset($aPublish[$key])) ? $aPublish[$key] : $aPublish;
		}

		function loadConf()
		{
			$obj = &rvEmail::singleton();
			$homepath = $obj->_getHomeUser();
			//scripts/ComponentAndUserFramework/setting.ini.php
			$mailConf = array();
			$projectId = (isset($this->aRVSPublist['project_id'])) ? $this->aRVSPublist['project_id'] : $obj->_loadPublishConf('project_id');
			$path = $homepath . '/.rvsitebuilder/websitepublish/' . $projectId;

			$settingFile = 'scripts/ComponentAndUserFramework/setting.ini.php';
			$path2 = $homepath . '/.rvsitebuilder/projects/' . $projectId . '/' . $settingFile;

			//case1: no compoDB
			if (is_file($path . '/Setting.ini.php')) {
				include_once $path . '/Setting.ini.php';
			} elseif (is_file($path2)) {
				//case2: is compoDB
				$aCompoConf = parse_ini_file($path2, true);
				$mailConf['backend'] = (isset($aCompoConf['backend'])) ? $aCompoConf['backend'] : 'mail';
                $mailConf['sendmailPath'] = (isset($aCompoConf['sendmailPath'])) ? $aCompoConf['sendmailPath'] : '/usr/sbin/sendmail';
                $mailConf['sendmailArgs'] = (isset($aCompoConf['sendmailArgs'])) ? $aCompoConf['sendmailArgs'] : '-t -i';
                $mailConf['smtpLocalHost'] = (isset($aCompoConf['smtpLocalHost'])) ? $aCompoConf['smtpLocalHost'] : '127.0.0.1';
                $mailConf['smtpHost'] = (isset($aCompoConf['smtpHost'])) ? $aCompoConf['smtpHost'] : 25;
                $mailConf['smtpAuth'] = (isset($aCompoConf['smtpAuth'])) ? $aCompoConf['smtpAuth'] : 0;
                $mailConf['smtpUsername'] = (isset($aCompoConf['smtpUsername'])) ? $aCompoConf['smtpUsername'] : '';
                $mailConf['smtpPassword'] = (isset($aCompoConf['smtpPassword'])) ? $aCompoConf['smtpPassword'] : '';
			} else {
				$mailConf['backend'] = 'mail';
				$mailConf['sendmailPath'] = '/usr/sbin/sendmail';
				$mailConf['sendmailArgs'] = '-t -i';
				$mailConf['smtpLocalHost'] = '127.0.0.1';
				$mailConf['smtpHost'] = 25;
				$mailConf['smtpAuth'] = 0;
				$mailConf['smtpUsername'] = '';
				$mailConf['smtpPassword'] = '';
			}
			return $mailConf;
		}

		function getCrlf()
		{
			// TODO: deal with Mac OS Classic i.e. < OS X when line ending is CR
			$crlf = (substr(PHP_OS, 0, 3) == 'WIN')
			? "\r\n"
			: "\n";
			return $crlf;
		}

		function getFormConf()
		{

		}
	}
//}
?>

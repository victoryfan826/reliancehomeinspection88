<?php
if (class_exists('TimeZone') === false) {
class TimeZone 
{
	function strftime($dateFormat, $date = null)
	{
		if (is_null($date) === false) {
			return @strftime($dateFormat, $date);
		} else {
			return @strftime($dateFormat);
		}
	}
}
}

?>
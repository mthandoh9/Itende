<?php
$d = "";
$IST = new DateTime($d, new DateTimeZone("GMT+2"));

    // change the timezone of the object without changing it's time
    $IST->setTimezone(new DateTimeZone('GMT+2'));

    // format the datetime
   echo $IST->format('Y-m-d H:i:s T');

   ?>
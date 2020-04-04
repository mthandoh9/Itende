<?php
$host ="localhost";
$db ="techfghz_techforest_db";
$user_name ="techfghz_eugene";
$password ="Paptmptd1#";

$con = mysqli_connect($host,$user_name,$password) or die("Couldn't connect");
mysqli_select_db($con,$db)or die("Couldn't Find Database");
?>
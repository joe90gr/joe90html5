<?php
echo 'sdfsd';
         $ch = curl_init();
         curl_setopt($ch, CURLOPT_URL,'http://local-html5.com/api.php/rest');
         curl_setopt($ch, CURLOPT_POST,1);
         curl_setopt($ch, CURLOPT_POSTFIELDS,'author=joe90');
         curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
         $result = curl_exec($ch);
         curl_close($ch);
?>
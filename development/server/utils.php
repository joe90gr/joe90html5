<?php
    class Utils {
         function isNotAllEmpty($test){
             foreach($test as $val){
                 if(empty($val)){
                     return true;
                 }
             }
             return false;
         }
    }

    class DbConnection{
        function prepMySQLConnection(){
            $hd = new mysqli("local-html5.com:3306", "root", "", "rest");
            if($hd->connect_errno){
                throw new RestException(500, "hey chum, what are you doing?");
                $hd = false;
            }
            return $hd;
        }
    }
?>
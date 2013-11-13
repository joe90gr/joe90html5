<?php
    require_once "Restler/vendor/restler.php";
    use Luracast\Restler\Restler;
    use Luracast\Restler\Defaults;
    Defaults::$smartAutoRouting = false;

    $r = new Restler();
    $r->addAPIClass('ConsoleSession');
    $r->handle();

    class ConsoleSession {
        function post($request_data = null){
            $hd = $this->prepMySQLConnection();
            if($hd){

//return array($username,$password,$request_data['username']);
                $username='';
                $password='';
                if( !$this->isNotAllEmpty( $request_data )  ){
                    $res = $hd->query("SELECT * FROM users WHERE username = '".$request_data['username']."'");

                    while($val = $res->fetch_row()){
                      $username = $val[1];
                      $password = $val[2];
                    }

                    if( $request_data['password'] == $password ){
                        session_start();

                        $_SESSION['username'] = $username;
                    }
                    if( $request_data['password'] == 'logout' ){
                        $_SESSION = [];
                        session_start();
                        session_unset();
                        $params = session_get_cookie_params();
                        setcookie(session_name(), '', 0, $params['path'], $params['domain'], $params['secure'], isset($params['httponly']));
                        session_destroy();
                    }

                    $hd->close();
                    if(isset($_SESSION['username'])){
                        return $_SESSION['username'];

                    }
                    else{
                        return array($username,$password,$request_data['password']);
                    }
                }
                else{
                    return "empty request";
                }

            }
            //return print_r(session_id('PHPSESSID').'::'.$_COOKIE['PHPSESSID']);
        }

        function isNotAllEmpty($test){
            foreach($test as $val){
                if(empty($val)){
                    return true;
                }
            }
            return false;
        }
        function prepMySQLConnection(){
            $hd = new mysqli("local-html5.com:3306", "root", "", "rest");
            if($hd->connect_errno){
                throw new RestException(500, "hey chum, what are you doing?");
                $hd = false;
            }
            return $hd;
        }
//        function __construct(){
//            $this->setSession();
//        }
//
//        function getSession(){
//            return $_SESSION['favcolor'];
//        }
//
//        function setSession(){
//            $_SESSION['username'] = 'joe90';
//            $_SESSION['password']   = '1q2w3e4r';
//            $_SESSION['time']     = time();
//        }


    }
?>
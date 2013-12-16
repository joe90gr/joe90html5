<?php
    require_once "Restler/vendor/restler.php";
    require_once "/utils.php";
    use Luracast\Restler\Restler;
    use Luracast\Restler\Defaults;
    Defaults::$smartAutoRouting = false;

    $r = new Restler();
    $r->addAPIClass('login');
    $r->addAPIClass('logout');
    $r->handle();

    class login {
        function __construct(){
            $this->dbComms = new DbConnection();
            $this->utils = new Utils();
            $this->userID = "";
            $this->username = "";
            $this->password = "";
        }

        function post($request_data = null){
            if( !$this->utils->isNotAllEmpty( $request_data )  ){
                $hd =  $this->dbComms->prepMySQLConnection();

                $res = $hd->query("SELECT * FROM users WHERE username = '".$request_data['username']."'");

                while($val = $res->fetch_row()){
                  $this->userID = $val[0];
                  $this->username = $val[1];
                  $this->password = $val[2];
                }

                $hd->close();

                if( $request_data['password'] == $this->password ){
                    session_start();
                    $_SESSION["userID"] = $this->userID;
                    $_SESSION["username"] = $this->username;
                    $json = '{"userID": "'.$this->userID.'", "username":"'.$this->username.'" }';
                    setcookie('userinfo', $json, 0, '/');
                    return $_SESSION;
                }
                return array('message' => "password is incorrect");
            }
            else{
                return array('Failed'=>"password wrong");;
            }

        }
//$this->setSession();
//return print_r(session_id('PHPSESSID').'::'.$_COOKIE['PHPSESSID']);
    }

    class logout {
        function post($request_data = null){
            if($request_data["logout"] == "iphone"){
                $_SESSION = [];
                session_start();
                session_unset();
                $params = session_get_cookie_params();
                setcookie(session_name(), '', 0, $params["path"], $params["domain"], $params["secure"], isset($params["httponly"]));
                setcookie('userinfo', '', 0, '/');
                session_destroy();
            }
        }
    }
?>
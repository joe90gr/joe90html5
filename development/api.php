<?php
    require_once "Restler/vendor/restler.php";
    use Luracast\Restler\Restler;
    use Luracast\Restler\Defaults;
    Defaults::$smartAutoRouting = false;

    $r = new Restler();
    $r->addAPIClass('Rest');
    $r->handle();

    class Rest{
        function post($request_data = null){
            $response = '';
            $hd = $this->prepMySQLConnection();
            if($request_data !== null){
                $author = $request_data['author'];
                $status = $request_data['status'];
                //$app_info = array($res->fetch_field_direct(1)->name => $val[1], $res->fetch_field_direct(2)->name  => $val[2]);
                $res = $hd->query("INSERT INTO tweets (id,author,status) VALUES ('','$author','$status' ) ");
                $response = array('success'=>"record created");
            }
            else{
                $response = array('Failed'=>"record not created");
            }
            $hd->close();
            return $response;
        }

        function put($id = null, $request_data = null){

            $hd = $this->prepMySQLConnection();
            if( isset($id) && isset( $request_data['author'] ) && isset( $request_data['status']) ){
                $author = $request_data['author'];
                $status = $request_data['status'];
                $res = $hd->query("UPDATE tweets SET author = '$author', status = '$status' WHERE id = '$id'  ");
                 //$res = $hd->query("UPDATE tweets SET author = $author, status = $status WHERE idd = 0  ");
                $response = array('success'=>"record created put $id $author $status");
            }
            else{
                $response = array('Failed'=>"record not created  $id $author $status");
            }
            $hd->close();
            return $response;
        }

        function delete($id = null){
            $hd = $this->prepMySQLConnection();
            $res = $hd->query("DELETE FROM tweets WHERE id = '$id'");

            $response = array('success'=>"record deleted");
            $hd->close();
            return $response;
        }

        function get(){
            $hd = $this->prepMySQLConnection();
            if($hd){
                $res = $hd->query("SELECT * FROM tweets");
                $app_info = array();

                while($val = $res->fetch_row()){
                  $array[] = array( $res->fetch_field_direct(0)->name  => $val[0], $res->fetch_field_direct(1)->name  => $val[1], $res->fetch_field_direct(2)->name => $val[2] );
                }
                $app_list = $array;
                $hd->close();
                return $app_list;
            }
        }

        function prepMySQLConnection(){
            $hd = new mysqli("local-html5.com:3306", "root", "", "rest");
            if($hd->connect_errno){
                throw new RestException(404, "hey chum, what are you doing?");
                $hd = false;
            }
            return $hd;
        }
    }
?>
<?php
    require_once "Restler/vendor/restler.php";
    require_once "/utils.php";
    use Luracast\Restler\Restler;
    use Luracast\Restler\Defaults;
    Defaults::$smartAutoRouting = false;

    $r = new Restler();
    $r->addAPIClass('Rest');
    $r->handle();

    class Rest{
        function __construct(){
            $this->dbComms = new DbConnection();
        }

        function post($request_data = null){
            $response = '';
            $hd = $this->dbComms->prepMySQLConnection();
            if(isset($request_data)){
                $author = $request_data['author'];
                $status = $request_data['status'];
                $resulst = $hd->query("INSERT INTO tweets (id,author,status) VALUES ('','$author','$status' ) ");
                $result1 = $hd->query("SELECT * FROM tweets ORDER BY id DESC LIMIT 1");
                 while($val = $result1->fetch_row()){
                 $lastID = array( $result1->fetch_field_direct(0)->name  => $val[0] );
                }
                $response =  $lastID;
            }
            else{
                $response = array('Failed'=>"record not created");
            }
            $hd->close();
            return $response;
        }

        function put($id = null, $request_data = null){
            $hd = $this->dbComms->prepMySQLConnection();
            if( isset($id) && isset( $request_data['author'] ) && isset( $request_data['status']) ){
                $author = $request_data['author'];
                $status = $request_data['status'];
                $res = $hd->query("UPDATE tweets SET author = '$author', status = '$status' WHERE id = '$id' ");
                $response = array('id'=>"$id", "author" => "$author", "status" => "$status");
            }
            else{
                $response = array('Failed'=>"record not created  $id $author $status");
            }
            $hd->close();
            return $response;
        }

        function delete($id = null){
            $hd = $this->dbComms->prepMySQLConnection();
            if(isset($id)){
                $result = $hd->query("DELETE FROM tweets WHERE id = '$id'");
                $successResponse = array("id"=>"$id");
                $failedResponse = array('error'=>"record with id:$id is not found.");
                $response = $result ? $response = $successResponse : $failedResponse;
            }
            else{
                $response = array('error'=>"record deleted");
            }

            $hd->close();
            return $response;
        }

        function get(){
            $hd = $this->dbComms->prepMySQLConnection();
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
    }
?>
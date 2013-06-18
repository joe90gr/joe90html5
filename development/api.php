<?php
// This is the API, 2 possibilities: show the app list or show a specific app by id.
// This would normally be pulled from a database but for demo purposes, I will be hardcoding the return values.



function get_app_by_id($id)
{
  // normally this info would be pulled from a database.
  // build JSON array.
  switch ($id){
    case 1:
      $app_info = array("author" => "joe", "status" => "Free");
      break;
    case 2:
         $app_info = array("author" => "sylw", "status" => "Freee");
      break;
    case 3:
      $app_info = array("author" => "The Tab Key", "status" => "Free");
      break;
    case 4:
      $app_info = array("author" => "Music Sleep Timer", "status" => "Free");
      break;
    default:
      mysql_close($hd);
  }
  return $app_info;
}

function get_app_list()
{
  //normally this info would be pulled from a database.
  //build JSON array
  //$app_list = array(array("author" => "test 1", "status" => "Web Demo"), array("author" => "test 2", "status" => "Audio Countdown"), array("author" => "test 3", "status" => "The Tab Key"), array("author" => "test 4", "status" => "Music Sleep Timer"));
      $hd = mysql_connect("local-html5.com:3306", "root", "") or die ("Unable to connect");
      mysql_select_db ("rest", $hd) or die ("Unable to select database");
      $res = mysql_query("SELECT * FROM tweets", $hd) or die ("Unable to run query");


    $app_info = array();
      while($val = mysql_fetch_row($res)){
          $array[] = array( mysql_field_name($res,1) => $val[1], mysql_field_name($res,2) => $val[2] );
      }
      $app_list = $array;
  return $app_list;
}

$possible_url = array("get_app_list", "get_app");

$value = "An error has occurred";

if (isset($_GET["action"]) && in_array($_GET["action"], $possible_url))
{
  switch ($_GET["action"])
    {
      case "get_app_list":
        $value = get_app_list();
        break;
      case "get_app":
        if (isset($_GET["id"]))
          $value = get_app_by_id($_GET["id"]);
        else
          $value = "Missing argument";
        break;
    }
}
//return JSON array
exit(json_encode($value));
?>
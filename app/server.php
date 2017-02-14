<?php
$file = $_FILES["file"]["name"];

$dir = "../../../symfony/web/assets/images/uploads/";
$ruta = substr($dir, strpos($dir, 'assets'));
if(!is_dir($dir)){
  mkdir($dir, 0777);
}
if($file && move_uploaded_file($_FILES["file"]["tmp_name"], $dir.$file)){
  echo json_encode(array('code'=>200, 'file'=>$file, 'ruta'=>$ruta));
}else {
  echo json_encode(array('code'=>400, 'message'=>''));
}
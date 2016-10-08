<?php
include_once("class.database.php");

class Users{


  public static function login(){
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);
    if(!$input)
      throw new Exception('Invalid login data!', 400);

    $username = $input['username'];
    $password = $input['password'];

    $user = Database::getDB()->getUserByName($username);

    if($user){
      if($user['password'] == $password){
        return [
          'id' => $user['id'],
          'username' => $user['username'],
          'fullname' => $user['fullname'],
          'avatar' => $user['avatar'],
          'token' => $user['token']
        ];
      }else{
        throw new Exception('Password doesnt match!', 401);
      }
    }else{
      throw new Exception('User doesnt exist!', 401);
    }
  }

  public static function auth(){
    $headers = apache_request_headers();
    $token = null;

    if(isset($headers['authorization'])){
      $matches = array();
      preg_match('/Token (.*)/', $headers['authorization'], $matches);
      if(isset($matches[1])){
        $token = $matches[1];
      }
    }

    if($token){
      $user = Database::getDB()->getUserByToken($token);
      if($user){
        return [
          'id' => $user['id'],
          'username' => $user['username'],
          'fullname' => $user['fullname'],
          'avatar' => $user['avatar'],
          'token' => $user['token']
        ];
      }else{
        throw new Exception("Unauthorized", 401);
      }
    }else{
      throw new Exception("Unauthorized", 401);
    }

    print_r($headers);
  }

  public static function logout($userId = NULL){

  }

  public static function loggedIn(){

  }

  public static function getAvatar($matches){
    $file = $matches['file'];
    $path = './avatars/' . $file . '.png';
    if(file_exists('./avatars/' . $file . '.png')){
      header('Content-Type: image/png');
      print file_get_contents($path);
    }else{
      http_response_code(404);
      echo 'File not found.';
    }
    //exit script here
    exit;
  }

}

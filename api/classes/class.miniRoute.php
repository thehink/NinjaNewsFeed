<?php
/*
    CLASS miniRoute - An extremely basic router i hacked together during a lesson
    by Benjamin Rizk

    usage:
    $router = new miniRoute();
    $router->GET('/PATH/:PARAMETER/:ANOTHER_PARAMETER', ['CLASS', 'STATIC_FUNCTION']);
    will pass an associative array to function with parameters:
    [
      'PARAMETER' => value,
      'ANOTHER_PARAMETER' => another_value
    ]

    Support for POST, GET and PUT
    $router->POST('/PATH/:PARAMETER/:ANOTHER_PARAMETER', ['CLASS1', 'STATIC_FUNCTION2']);
    $router->PUT('/PATH/:PARAMETER/:ANOTHER_PARAMETER', ['CLASS2', 'STATIC_FUNCTION3']);

    Make the router actually route
    $router->route();


    Use with .htaccess:
    RewriteEngine On
    RewriteRule ^(.*)$ index.php?path=/$1 [L,QSA]

*/


class miniRoute{

  private $paths = [
    'GET' => [],
    'POST' => [],
    'PUT' => []
  ];

  function getRequestMethod(){
    if(array_key_exists($_SERVER['REQUEST_METHOD'], $this->paths)){
      return $_SERVER['REQUEST_METHOD'];
    }else{
      return "GET";
    }
  }

  function parsePath($path, $userPath){
    $pathKeys = $this->getPathKeys($path);
    $regPath = $this->getRegex($path);
    $values = [];
    preg_match_all("/" . $regPath . "/", $userPath, $values);

    $ret = [];
    foreach ($pathKeys as $index => $pathKey) {
      $ret[$pathKey] = $values[1][$index];
    }
    return $ret;
  }

  function getRegex($path){
    return str_replace('/', '\\/', preg_replace("/:([A-z0-9]+)/", "([A-z0-9]+)", $path));
  }

  function getPathKeys($path){
    preg_match_all("/:([A-z0-9]+)/", $path, $arr);
    return $arr[1];
  }

  function matchPath($path, $userPath){
    $regPath = $this->getRegex($path);
    $isMatched = preg_match_all("/^" . $regPath . "[\/]?$/", $userPath, $matched);
    return !empty($isMatched);
  }

  function output($status,  $response=''){
	 header("Access-Control-Allow-Origin: *");
    header('Content-Type: application/json');
    http_response_code($status);
    echo json_encode([
      'status' => $status,
      'response' => $response
    ]);
  }

  public function GET($path, $func){
    $this->paths['GET'][$path] = $func;
  }

  public function POST($path, $func){
    $this->paths['POST'][$path] = $func;
  }

  public function PUT($path, $func){
    $this->paths['PUT'][$path] = $func;
  }

  public function route(){
    $userPath = $_GET['path'];
    $requestMethod = $this->getRequestMethod();

    #Loop through stored endpoints and try match the user path
    foreach($this->paths[$requestMethod] as $path => $method){
      if($this->matchPath($path, $userPath)){
        try {
          $matches = $this->parsePath($path, $userPath);
          $response = [];
          if(is_callable($method))
            $response = call_user_func($method, $matches);
          $this->output(200, $response);
        } catch (Exception $e) {
          $this->output($e->getCode(), $e->getMessage());
        }
        exit;
      }
    }
    $this->output(404, "This endpoint doesn't exist!");
  }

}

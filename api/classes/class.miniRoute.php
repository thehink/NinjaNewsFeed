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

//Methods supported.
//Could add support for more request methods by adding to this array and add a method of same name in class
  private $paths = [
    'GET' => [],
    'POST' => [],
    'PUT' => []
  ];


  function getRequestMethod(){
    if(array_key_exists($_SERVER['REQUEST_METHOD'], $this->paths)){
      return $_SERVER['REQUEST_METHOD'];
    }else{
      return false;
    }
  }


  /**
  *
  * Parse user path with our defined path to extract key value pairs
  *
  * @param    string  $path /comments/:id
  * @param    string  $userPath path requested by user /comments/the_id
  * @return      array ['id' => 'the_id']
  *
  */
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

  /**
 *
 * Convert a path string to to regex string
 *
 * @param    string  $path /comments/:id => /comments/([A-z0-9]+)
 * @return      string
 *
 */
  function getRegex($path){
    return str_replace('/', '\\/', preg_replace("/:([A-z0-9]+)/", "([A-z0-9]+)", $path));
  }

  function getPathKeys($path){
    preg_match_all("/:([A-z0-9]+)/", $path, $arr);
    return $arr[1];
  }

  /**
  *
  * Compare our path to user requested path
  *
  * @param    string  $path
  * @param    string  $userPath
  * @return      bool
  *
  */
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

  public function GET($path, $func, $middleWare = NULL){
    $this->paths['GET'][$path] = ['method' => $func, 'middleware' => $middleWare];
  }

  public function POST($path, $func, $middleWare = NULL){
    $this->paths['POST'][$path] = ['method' => $func, 'middleware' => $middleWare];
  }

  public function PUT($path, $func, $middleWare = NULL){
    $this->paths['PUT'][$path] = ['method' => $func, 'middleware' => $middleWare];
  }

  public function route(){
    $userPath = $_GET['path'];
    $requestMethod = $this->getRequestMethod();

    //check if request method is supported or display an error
    if(!$requestMethod){
      $this->output(405, 'Request Method not supported');
      exit;
    }

    //Loop through stored endpoints and try match the user path
    foreach($this->paths[$requestMethod] as $path => $funcs){
      if($this->matchPath($path, $userPath)){
        try {
          $matches = $this->parsePath($path, $userPath);
          $response = [];
          $middleware = null;

          //call middle predefined middleware method if it exists
          if(is_callable($funcs['middleware']))
            $middleware = call_user_func($funcs['middleware'], $matches);

          //call the method defined for the path if it exists
          if(is_callable($funcs['method']))
            $response = call_user_func_array($funcs['method'], [$matches, $middleware]);

          $this->output(200, $response);
        } catch (Exception $e) {
          //output error to client if an exception was cought
          $this->output($e->getCode(), $e->getMessage());
        }
        exit;
      }
    }
    $this->output(404, "This endpoint doesn't exist!");
  }

}

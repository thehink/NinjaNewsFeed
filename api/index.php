<?php
error_reporting(E_ALL);

include_once("./classes/class.database.php");
include_once("./classes/class.miniRoute.php");
include_once("./classes/class.feed.php");
include_once("./classes/class.users.php");
include_once("./classes/class.test.php");

$router = new miniRoute();

$router->GET("/", ['Test', 'asd']);

$router->GET("/feed", ['Feed', 'getFeed']);
$router->GET("/feed/:user_name", ['Feed', 'getFeedByUser']);
$router->PUT("/feed", ['Feed', 'newFeed']);


$router->GET("/avatar/:file.png", ['Users', 'getAvatar']);

$router->POST("/user/login", ['Users', 'login']);
$router->GET("/user/logout", ['Users', 'logout']);
$router->GET("/user/auth", ['Users', 'auth']);

$router->route();

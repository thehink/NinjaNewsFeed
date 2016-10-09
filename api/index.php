<?php
include_once("./classes/class.database.php");
include_once("./classes/class.miniRoute.php");
include_once("./classes/class.feed.php");
include_once("./classes/class.users.php");
include_once("./classes/class.test.php");

$router = new miniRoute();

$router->GET("/", ['Test', 'asd']);

$router->GET("/feed", ['Feed', 'getFeed']);
$router->GET("/feed/:user_name", ['Feed', 'getFeedByUser']);
$router->PUT("/feed", ['Feed', 'newPost'], ['Users', 'authUser']);
$router->GET("/post/:id", ['Feed', 'getPost']);
$router->GET("/comments/:id", ['Feed', 'getComments']);
$router->PUT("/comments", ['Feed', 'addComment'], ['Users', 'authUser']);

$router->GET("/avatar/:file.png", ['Users', 'getAvatar']);

$router->POST("/user/login", ['Users', 'login']);
$router->GET("/user/logout", ['Users', 'logout']);
$router->GET("/user/auth", ['Users', 'authUser']);

$router->route();

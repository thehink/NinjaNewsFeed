<?php
error_reporting(E_ALL);

include_once("./classes/class.database.php");
include_once("./classes/class.miniRoute.php");
include_once("./classes/class.feeds.php");
include_once("./classes/class.users.php");
include_once("./classes/class.test.php");

$router = new miniRoute();

$router->GET("/", ['Test', 'asd']);

$router->GET("/feed", ['Feeds', 'getFeeds']);
$router->GET("/feed/:user_name", ['Feeds', 'getFeedByUser']);
$router->PUT("/feed", ['Feeds', 'newFeed']);

$router->POST("/login", ['Users', 'login']);
$router->GET("/logout", ['Users', 'logout']);

$router->route();

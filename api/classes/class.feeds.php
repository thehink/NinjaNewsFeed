<?php
include_once("class.database.php");


class Feeds {
  public static function getFeedByUser($matches){
    $userName = $matches['user_name'];
    $feeds = Database::getDB()->getFeedsByUsername($userName);
    return $feeds;
  }

  public static function getFeeds(){
    $feeds = Database::getDB()->getFeeds();
    return $feeds;
  }

  public static function newFeed($userId = NULL){

  }

  public static function errorTest(){
    throw new Exception('Should catch this error');
  }
}

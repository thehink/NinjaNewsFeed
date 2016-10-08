<?php
include_once("class.database.php");


class Feed {
  public static function getFeedByUser($matches){
    $userName = $matches['user_name'];
    $feeds = Database::getDB()->getFeedsByUsername($userName);
    return $feeds;
  }

  public static function getFeed(){
    $users = [];
    $feed = Database::getDB()->getFeeds();

    foreach($feed as $i => $entry){
      $author = Database::getDB()->getUserById($entry['author']);
      $feed[$i]['published'] = date("Y-m-d H:i:s", $feed[$i]['published']);
      $feed[$i]['author'] = [
        'username' => $author['username'],
        'fullname' => $author['fullname'],
        'avatar' => $author['avatar']
      ];
    }

    return $feed;
  }

  public static function newFeed($userId = NULL){

  }

  public static function errorTest(){
    throw new Exception('Should catch this error');
  }
}

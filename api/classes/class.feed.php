<?php
include_once("class.database.php");


class Feed {
  public static function getFeedByUser($matches){
    $userName = $matches['user_name'];
    $feeds = Database::getDB()->getFeedsByUsername($userName);
    return $feeds;
  }

  public static function addComment($matches, $user){
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);
    if(!$input)
      throw new Exception('Invalid login data!', 400);

    $body = filter_var($input['body'], FILTER_SANITIZE_STRING);

    //if we were using a real database
    //Database::getDB->addPost($title, $body, $user);

    return [
      'id' => rand(20,20000),
	    'body' => $body,
      'author' => [
        'username' => $user['username'],
        'fullname' => $user['fullname'],
        'avatar' => $user['avatar']
      ],
      'published'=> date("Y-m-d H:i:s")
    ];
  }

  public static function getComments($matches){
    $id = (int)$matches['id'];
    $comments = Database::getDB()->getCommentsByPostId($id);
    foreach($comments as $i => $comment){
      $comments[$i]['published'] = date("Y-m-d H:i:s", $comments[$i]['published']);
      $comments[$i]['author'] = [
        'username' => $comments[$i]['author']['username'],
        'fullname' => $comments[$i]['author']['fullname'],
        'avatar' => $comments[$i]['author']['avatar']
      ];
    }
    return $comments;
  }

  public static function getPost($matches){
    $id = $matches['id'];

  }

  public static function getFeed(){
    $users = [];
    $feed = Database::getDB()->getFeeds();

    foreach($feed as $i => $entry){
      $author = Database::getDB()->getUserById($entry['author']);
      $feed[$i]['isLiked'] = false;
      $feed[$i]['published'] = date("Y-m-d H:i:s", $feed[$i]['published']);
      $feed[$i]['author'] = [
        'username' => $author['username'],
        'fullname' => $author['fullname'],
        'avatar' => $author['avatar']
      ];
    }

    return $feed;
  }

  public static function newPost($matches, $user){
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);
    if(!$input)
      throw new Exception('Invalid login data!', 400);

    $title = filter_var($input['title'], FILTER_SANITIZE_STRING);
    $body = filter_var($input['body'], FILTER_SANITIZE_STRING);

    //if we were using a real database
    //Database::getDB->addPost($title, $body, $user);

    return [
      'id' => rand(6,20000),
	    'title' => $title,
      'content' => $body,
      'author' => [
        'username' => $user['username'],
        'fullname' => $user['fullname'],
        'avatar' => $user['avatar']
      ],
      'published'=> date("Y-m-d H:i:s"),
      'likes' => 0
    ];

  }

  public static function errorTest(){
    throw new Exception('Should catch this error');
  }
}

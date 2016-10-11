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

    //make sure we actually got the stuff we needed: valid json with a body key
    if(!$input)
      throw new Exception('Invalid comment data!', 400);

    if(!isset($input['body']) || !isset($input['id']))
      throw new Exception("No comment body!", 400);

    //Strip input of any potentially maillicious code
    $post = Database::getDB()->getPostById((int)$input['id']);
    $body = filter_var($input['body'], FILTER_SANITIZE_STRING);

    if(!$post)
      throw new Exception("The post you tried to comment on doesn't exist in Database!", 400);

    if(strlen(str_replace(' ', '', $body)) < 3){
      throw new Exception("You need at least 3 characters!", 400);
    }else if(strlen($body) > 500){
      throw new Exception("Max 500 characters in a comment!", 400);
    }

    $success = Database::getDB()->addComment($user['id'], $post['id'], $body);

    if(!$success)
      throw new Exception("Could not add comment to database!", 400);

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

      //make sure we only send the user info we need to
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
    if(!$input || !isset($input['title']) || !isset($input['body']))
      throw new Exception('Invalid post data!', 400);


    //Strip input of any potentially maillicious code
    $title = filter_var($input['title'], FILTER_SANITIZE_STRING);
    $body = filter_var($input['body'], FILTER_SANITIZE_STRING);


    //limit character length of post title and body
    if(strlen($title) < 3 || strlen($body) < 3){
      throw new Exception('Post title and body must be 3 or more characters long!', 400);
    }else if(strlen($title) > 50){
      throw new Exception('Max 50 Characters on title!', 400);
    }else if(strlen($body) > 1000){
      throw new Exception('Max 1000 Characters in post body!', 400);
    }

    $success = Database::getDB()->addPost($user['id'], $title, $body);

    if(!$success)
      throw new Exception("Could not add post to database!", 400);

    //Return the postdata
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

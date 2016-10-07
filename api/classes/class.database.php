<?php

class Database{

  static $DB = NULL;

  /*
    @getDatabase static
    returns instance of Database
  */
  public static function getDB(){
    if(!isset(self::$DB)){
        self::$DB = new Database();
      }
      return self::$DB;
  }

  //Fake database data
  //could pretty easily be replaced by a real database
  private $users = [
    [
      'id' => 1,
      'username' => 'Someone1',
      'password' => 'thisisnotasafepassword',
      'fullname' => 'Someone Oskarsson',
      'avatar' => 'avatar1.png',
    ],
    [
      'id' => 2,
      'username' => 'Someone2',
      'password' => 'thisisnotasafepassword',
      'fullname' => 'Someone Oskarsson',
      'avatar' => 'avatar2.png',
    ],

    [
      'id' => 3,
      'username' => 'Someone3',
      'password' => 'thisisnotasafepassword',
      'fullname' => 'Someone Oskarsson',
      'avatar' => 'avatar3.png',
    ],
    [
      'id' => 4,
      'username' => 'Someone4',
      'password' => 'thisisnotasafepassword',
      'fullname' => 'Someone Oskarsson',
      'avatar' => 'avatar4.png',
    ],
    [
      'id' => 5,
      'username' => 'Someone5',
      'password' => 'thisisnotasafepassword',
      'fullname' => 'Someone Oskarsson',
      'avatar' => 'avatar5.png',
    ],
  ];

  private $feeds = [
    [
      'id' => 1,
      'content' => 'blablabla',
      'author' => 1,                    #author uid -to link the article to a author
      'published'=> 1475671668,         #timestamp easily converted to date
      'likes' => 0,
    ],
    [
      'id' => 2,
      'content' => 'blablabla',
      'author' => 2,
      'published'=> 1475671668,
      'likes' => 0,
    ],

    [
      'id' => 3,
      'content' => 'blablabla',
      'author' => 3,
      'published'=> 1475671668,
      'likes' => 0,
    ],
    [
      'id' => 4,
      'content' => 'blablabla',
      'author' => 4,
      'published'=> 1475671668,
      'likes' => 0,
    ],
    [
      'id' => 5,
      'content' => 'blablabla',
      'author' => 5,
      'published'=> 1475671668,
      'likes' => 0,
    ],
  ];

public function getUsers(){
  return $this->users;
}

 public function getUserById($userId){
   foreach($this->users as $user){
     if($user['id'] == $userId){
       return $user;
     }
   }
 }

 public function getUserByName($username){
   foreach($this->users as $user){
     if($user['username'] === $username){
       return $user;
     }
   }
 }

 public function authenticatePassword($username, $password){

 }

 public function getFeedsByUserId($userId){
   $feeds = [];
   foreach($this->feeds as $feed){
     if($userId == $feed['author']){
       array_push($feeds, $feed);
     }
   }
   return $feeds;
 }

 public function getFeedsByUsername($username){
   $feeds = [];
   $user = $this->getUserByName($username);
   foreach($this->feeds as $feed){
     if($user['id'] == $feed['author']){
       array_push($feeds, $feed);
     }
   }
   return $feeds;
 }

 public function getFeeds(){
   return $this->feeds;
 }

}

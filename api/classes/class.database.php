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

  //Hardcoded data
  //could pretty easily be replaced by a real database
  private $comments = [
    [
      'id' => 1,
      'body' => 'This is a comment',
      'post' => 1,
      'author' => 1,
      'published' => 1475671668,
    ],
    [
      'id' => 2,
      'body' => 'This is a comment',
      'post' => 1,
      'author' => 1,
      'published' => 1475641668,
    ],
    [
      'id' => 3,
      'body' => 'This is a comment',
      'post' => 1,
      'author' => 4,
      'published' => 1475671668,
    ],
    [
      'id' => 4,
      'body' => 'This is a comment',
      'post' => 3,
      'author' => 1,
      'published' => 1475371668,
    ],
    [
      'id' => 5,
      'body' => 'This is a comment',
      'post' => 3,
      'author' => 2,
      'published' => 1475651668,
    ],
    [
      'id' => 6,
      'body' => 'This is a comment',
      'post' => 2,
      'author' => 4,
      'published' => 1477671668,
    ],
    [
      'id' => 7,
      'body' => 'This is a comment',
      'post' => 2,
      'author' => 2,
      'published' => 1425671668,
    ]
  ];

  private $users = [
    [
      'id' => 1,
      'username' => 'asd',
      'password' => 'asd',
      'fullname' => 'Someone Oskarsson',
      'avatar' => 'avatar1.png',
      'token' => 'g52yh54wu723gh7t89gega'
    ],
    [
      'id' => 2,
      'username' => 'Someone2',
      'password' => 'thisisnotasafepassword',
      'fullname' => 'Someone Oskarsson',
      'avatar' => 'avatar2.png',
      'token' => 'q4j67nw54uw54y54j7'
    ],

    [
      'id' => 3,
      'username' => 'Someone3',
      'password' => 'thisisnotasafepassword',
      'fullname' => 'Someone Oskarsson',
      'avatar' => 'avatar3.png',
      'token' => '2u56un6u356yhryhthr'
    ],
    [
      'id' => 4,
      'username' => 'Someone4',
      'password' => 'thisisnotasafepassword',
      'fullname' => 'Someone Oskarsson',
      'avatar' => 'avatar4.png',
      'token' => 'g52yh54wu7237g547q547g5ygh7t89gega'
    ],
    [
      'id' => 5,
      'username' => 'Someone5',
      'password' => 'thisisnotasafepassword',
      'fullname' => 'Someone Oskarsson',
      'avatar' => 'avatar5.png',
      'token' => '36u5uh36yurxtshsrt'
    ],
  ];

  private $feed = [
    [
      'id' => 1,
	  'title' => 'Lorem ipsum',
      'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'author' => 1,                    #author uid -to link the article to a author
      'published'=> 1274671668,         #timestamp easily converted to date
      'likes' => 0,
    ],
    [
      'id' => 2,
	  'title' => 'Lorem ipsum',
      'content' => 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
      'author' => 2,
      'published'=> 1475675668,
      'likes' => 5,
    ],

    [
      'id' => 3,
	  'title' => 'Lorem ipsum',
      'content' => 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?',
      'author' => 3,
      'published'=> 1477671668,
      'likes' => 9000,
    ],
    [
      'id' => 4,
	  'title' => 'Lorem ipsum',
      'content' => 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
      'author' => 4,
      'published'=> 1475691668,
      'likes' => 0,
    ],
    [
      'id' => 5,
	  'title' => 'Lorem ipsum',
      'content' => 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.',
      'author' => 5,
      'published'=> 1465771361,
      'likes' => 0,
    ],
  ];

public function getUsers(){
  return $this->users;
}

 public function getUserById($userId){
   foreach($this->users as $user){
     if($user['id'] === $userId){
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

 public function getUserByToken($token){
   foreach($this->users as $user){
     if($user['token'] === $token){
       return $user;
     }
   }
 }

 public function authenticatePassword($username, $password){

 }

 public function getCommentsByPostId($id){
   $comments = [];
   $dataComments = $this->comments;

   //sort comments by date published newer first
   usort($dataComments, function($a, $b){
     return $a['published'] < $b['published'];
   });

   foreach($dataComments as $comment){
     if($id === $comment['post']){

       $comment['author'] = $this->getUserById($comment['author']);
       array_push($comments, $comment);
     }
   }
   return $comments;
 }

 public function getPostById(){
   $post = [];
   foreach($this->feed as $post){
     if($userId === $feed['author']){
       array_push($feeds, $feed);
     }
   }
 }

 public function getFeedByUserId($userId){
   $feed = [];
   foreach($this->feed as $post){
     if($userId === $post['author']){
       array_push($feeds, $post);
     }
   }
   return $feed;
 }

 public function getFeedByUsername($username){
   $feed = [];
   $user = $this->getUserByName($username);
   foreach($this->feed as $post){
     if($user['id'] === $post['author']){
       array_push($feeds, $post);
     }
   }
   return $feed;
 }

 public function getFeeds(){
   $feed = $this->feed;

   //sort feed by date published newer first
   usort($feed, function($a, $b){
     return $a['published'] < $b['published'];
   });
   return $feed;
 }

}

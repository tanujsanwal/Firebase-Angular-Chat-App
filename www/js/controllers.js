angular.module('chatRoom.controllers', [])

.controller('RoomListCtrl', function($scope, $timeout, $firebase, $location) {
  var ref = new Firebase('https://funchatapp.firebaseio.com/opened_rooms');
  $scope.rooms = $firebase(ref);


  $scope.rightButtons = [
    {
      type: 'button-energized',
      content: '<i class="icon ion-plus"></i>',
      tap: function(e) {
        $location.path("/new");
      }
    }
  ];


        $scope.leftButtons = [
            {
                type: 'button-energized',
                content: '<i class="icon ion-arrow-left-c"></i>',
                tap: function(e) {
                    $location.path('/');
                }
            }
        ];

     /* $scope.loginData = {username:"tanuj1@techanipr.com", password:"tanuj" };
      // Perform the login action when the user submits the login form
      var ref1 = new Firebase("https://funchatapp.firebaseio.com/users");
      $scope.username = $firebase(ref1.username);
      $scope.password = $firebase(ref1.password);
      alert($firebase(ref1.password));

      $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);


        if($scope.username == $scope.loginData.username && $scope.password ==$scope.loginData.password ){

          $location.path("/home");

        }
else{
          alert("enter correct username and password");
        }
      };*/


    })

.controller('RoomCreateCtrl', function($scope, $timeout, $firebase, $location) {
  var ref = new Firebase('https://funchatapp.firebaseio.com/opened_rooms');
  $scope.rooms = $firebase(ref);

  $scope.createRoom = function(roomName, roomDescription) {
    if (!roomName) return;
      
    var roomId = Math.floor(Math.random() * 5000001);
      
    $scope.rooms.$add({
      id: roomId,
      title: roomName,
      slug: roomName.split(/\s+/g).join('-'),
      description: roomDescription
    });
    
    $location.path('/rooms/' + roomId);
  };


        $scope.leftButtons = [
            {
                type: 'button-energized',
                content: '<i class="icon ion-arrow-left-c"></i>',
                tap: function(e) {
                    $location.path('/home');
                }
            }
        ];
})


.controller('RoomCtrl', function($scope, $stateParams, $timeout, $firebase, $location, $ionicScrollDelegate) {
  var roomRef = new Firebase('https://funchatapp.firebaseio.com/opened_rooms/');
  var messagesRef = new Firebase('https://funchatapp.firebaseio.com/rooms/' + $stateParams.roomId);

  $scope.newMessage = "";
  $scope.roomsObj = $firebase(roomRef);
  $scope.messagesObj = $firebase(messagesRef);
 /* $scope.username = 'User' + Math.floor(Math.random() * 501);*/
      $scope.username = window.localStorage['username'];
        $scope.pic = 'http://graph.facebook.com/'+$scope.username+'/picture' ;
  $scope.leftButtons = [
    { 
      type: 'button-energized',
      content: '<i class="icon ion-arrow-left-c"></i>',
      tap: function(e) {
        $location.path('/home');
      }
    }
  ]

  var scrollBottom = function() {
    // Resize and then scroll to the bottom
    $ionicScrollDelegate.resize();
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom();
    });
  };

  $scope.$watch('messagesObj', function (value) {
    var messagesObj = angular.fromJson(angular.toJson(value));
    $timeout(function () {scrollBottom()});
    $scope.messages = [];

    angular.forEach(messagesObj, function (message, key) {
      $scope.messages.push(message);
    });

    if ($scope.messages.length) {
      loaded = true;
    }
  }, true);

  $scope.$watch('roomsObj', function (value) {
    var roomsObj = angular.fromJson(angular.toJson(value));
    $scope.room = false;

    angular.forEach(roomsObj, function (room, key) {
      if ($scope.room) return;
      if (room.id == $stateParams.roomId) {
        $scope.room = room;
      };
    });
  }, true);
    
  $scope.submitAddMessage = function() {
    $scope.messagesObj.$add({
      created_by: this.username,
      content: this.newMessage,
        pic:this.pic,
      created_at: new Date()
    });
    this.newMessage = "";

    scrollBottom();
  };
})

.controller('AboutCtrl', function($scope) {})

.controller('LoginCtrl', function($scope , $location , $firebase) {

        $scope.doLogin = function () {


        var ref = new Firebase("https://funchatapp.firebaseio.com/");
        var auth = $firebaseAuth(ref);
        auth.$authWithOAuthPopup("facebook").then(function (authData) {

            console.log("Logged in as:", authData.uid);

        }).catch(function (error) {
            console.error("Authentication failed: ", error);
        });

    }

     /* var roomRef1 = new Firebase('https://funchatapp.firebaseio.com/opened_rooms/users');

      $scope.roomsObj1 = $firebase(roomRef1);

alert($scope.roomsObj1.username);
      console.log($scope.roomsObj1.password);
      */
     /* $scope.dofb =function() {
        var isNewUser = true;
        var ref = new Firebase("https://funchatapp.firebaseio.com");

        ref.authWithOAuthPopup("facebook", function (error, authData) {
          if (!error) {
            scope: "email,user_likes";
            console.log("Authenticated successfully with payload:", authData);
            console.log(authData.facebook.accessToken);
            console.log(authData.facebook.displayName);
            console.log(authData.facebook.email);
            console.log(authData.facebook.cachedUserProfile)
            if (isNewUser) {
              // save new user's profile into Firebase so we can
              // list users, use them in security rules, and show profiles
              ref.child('facebookusers').child(authData.facebook.id).set({
                displayName: authData.facebook.displayName,

                provider_id: authData.facebook.id
              });
            }
            $scope.result = authData.facebook;
          } else {
            console.log("Login Failed!", error);
          }
        });

      }*/
      $scope.loginData = {};
      $scope.doLogin = function () {

        window.localStorage['username'] = $scope.loginData.username;


        $location.path('/home');


      }
    })
.controller('AppCtrl', function($scope, $state) {});
Callbacks={}

Callbacks.Sync={
  howOldAreMyUsers:function(){
    var myUsers = Server.Sync.listOfUsers()
    myUsers.forEach(function(username){
      age = Server.Sync.ageOf(username)
      console.log(username+' is '+age+ ' years old')
    })
  }
}

Callbacks.Async={
  howOldAreMyUsers:function(){
    Server.Async.listOfUsers(function(myUsers){
      myUsers.forEach(function(user){
        Server.Async.ageOf(user,function(username,age){
          console.log(username +' is '+age+ ' years old')
        })
      })
    })
  }
}

Callbacks.Error={
  howOldAreMyUsers:function(){
    Server.Error.listOfUsers(function(myUsers){
      myUsers.forEach(function(user){
        Server.Error.ageOf(user,function(username,age){
          console.log(username +' is '+age+ ' years old')
        },function(username){
          console.log("we could not retrieve the age of "+username+", sorry :P")
        })
      })
    },function(){
      console.log("we could not retrieve the user list , sorry :P")
    })
  }
}

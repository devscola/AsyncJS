Server={}

Server.Sync={

    usersData: {  "Mateja": 24,
                  "Xavi": 46,
                  "Helen Con Jota": 67,
                  "Raul con dieresis": 50},

    users: ["Mateja","Xavi","Helen Con Jota","Raul con dieresis"],

    listOfUsers: function(){
      return this.users
    },

    ageOf: function(user){
      return this.usersData[user]
    }

}

Server.Async={
  listOfUsers: function(callback){
    setTimeout(function(){
      callback (Server.Sync.listOfUsers())
    },2000)
  },

  ageOf: function(user,callback){
    setTimeout(function(){
      callback (user,Server.Sync.ageOf(user))
    },2000)
  }
}

Server.Error={
  listOfUsers: function(callback,errorHandler){
    if(this.timeForError()){
      console.log("error")
      errorHandler()
    }else{
      console.log('notError')
      Server.Async.listOfUsers(callback)
    }
  },

  ageOf: function(user,callback,errorHandler){
    if(this.timeForError()){
      console.log("error")
      errorHandler(user)
    }else{
      console.log('notError')
      Server.Async.ageOf(user,callback)
    }
  },

  timeForError: function(){
    return Math.round(Math.random())
  }
}


Server.Promises={
  listOfUsers: function(){
    return new Promise((resolve, reject) => {
    Server.Error.listOfUsers( (users) => resolve(users),
                              () => reject("could not retrieve user list")
                            )
    })
  },

  ageOf: function(user){
    return new Promise((resolve, reject) => {
    Server.Error.ageOf(user,(user,age) => resolve({user,age}),
                            (user) => reject("could not retrieve the age of " + user)
                      )
    })
  }
}

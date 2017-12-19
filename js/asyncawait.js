AsyncAwait={}

AsyncAwait.Error={

  howOldAreMyUsers: async function(){
    try{
      users = await Server.Promises.listOfUsers()
      this.askAges(users)
    }catch(message){
      console.log(message)
    }
  },

  askAges: async function(users){
    users.forEach(async function(username){
      try{
        userData = await Server.Promises.ageOf(username)
        console.log(userData.user+' is '+userData.age+ ' years old')
      }catch(message){
        console.log(message)
      }
    })
  },

}

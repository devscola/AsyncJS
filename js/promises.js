Promises={}

Promises.Error={

  howOldAreMyUsers:function(){
    Server.Promises.listOfUsers()
      .then(this.askAges)
      .catch((message)=>{console.log(message)})
  },

  askAges:function(users){
    users.forEach(function(username){
      Server.Promises.ageOf(username)
      .then((data)=>{
        console.log(data.user+' is '+data.age+ ' years old')
      })
      .catch((message)=>{console.log(message)})
    })
  },

}

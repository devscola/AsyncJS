Bus={

    subscriptions: {},

    subscribe: function(topic, handler) {
        this.ensureTopic(topic);
        this.subscriptions[topic].push(handler);
    },

    publish: function(topic, data) {
        if (!this.subscriptions[topic]) return;
        this.subscriptions[topic].forEach(function(handler) {
            handler(data);
        });
    },

    ensureTopic: function(topic) {
        if (this.subscriptions[topic]) return;

        this.subscriptions[topic] = [];
    }
}


backend={
  initialize: function(){
    Bus.subscribe('get.users',this.listOfUsers)
    Bus.subscribe('get.age',this.ageOf)
  },

  listOfUsers:function(){
    Server.Promises.listOfUsers()
      .then((users)=>{Bus.publish('user.list',users)})
      .catch((message)=>{Bus.publish('error',message)})
  },

  ageOf:function(user){
    Server.Promises.ageOf(user)
      .then((data)=>{Bus.publish('user.data', data)})
      .catch((message)=>{Bus.publish('error',message)})
  }
}

fail={
  initialize: function(){
    Bus.subscribe('error',this.printError)
  },

  printError: function(message){
    console.error(message)
  }
}

logic={
  initialize: function(){
    Bus.subscribe('user.list',this.askAges)
  },

  askAges: function(users){
    users.forEach((user)=>{
      Bus.publish('get.age',user)
    })
  }
}

success={
  initialize: function(){
    Bus.subscribe('user.data',this.printSuccess)
    Bus.subscribe('error',this.printSuccess)
  },

  printSuccess: function(data){
    console.log(data.user+' is '+data.age+ ' years old')
  }
}

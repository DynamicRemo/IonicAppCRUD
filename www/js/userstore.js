angular.module('UserDirectory.userstore', [])
	.factory('UserStore', function(){
		var users = angular.fromJson(window.localStorage['users'] || '[]' );

		function persist(){
			window.localStorage['users'] = angular.toJson(users);
		}

		return {
		  list: function(){
		    return users;
		  },

		  get: function(userId){
		    for(var i=0; i<users.length; i++){
		      if(users[i].id == userId){
		        return users[i];
		      }
		    }
		    return undefined;
		  }, 

		  create: function(user){
		    users.push(user);
		    persist();
		  }, 

		  update: function(user){
		    for(var i=0; i<users.length; i++){
		      if(users[i].id == user.id){
		        users[i] = user;
		        persist();
		      }
		    }
		  },

		  move: function(user, fromIndex, toIndex){
		  	users.splice(fromIndex, 1);
		  	users.splice(toIndex, 0, user);
		  	persist();
		  },

		  remove: function(userId){
		    for(var i=0; i<users.length; i++){
		      if(users[i].id == userId){
		        users.splice(i, 1);
		        persist();
		        return;
		      }
		    }
		  },

		  visual: function(){
		  	var continents = ["Asia", "Europe", "America", "Australia", "Antartica", "Africa"];
		  	var gender = ['Male', 'Female'];
		  	var arrMale = [];
		  	var arrFemale = [];
		  	var pie_data = [];

		    for(var i=0; i<continents.length; i++){
			  	var male = female = 0;
			    for(var j=0; j<users.length; j++){
			    	if(users[j].nationality == continents[i]){
			    		if(users[j].gender == 'man'){
			    			male++;
			    		}
			    		if(users[j].gender == 'woman'){
			    			female++;
			    		}
			    	}
		      }
		    	arrMale.push(male);
		    	arrFemale.push(female);
		    	pie_data.push(male+female);
		    }

		  	return [
		  		continents,
		  		gender,
		  		[
		  			arrMale,
		  			arrFemale
		  		],
		  		pie_data
		  	];
		  }

		};
	});
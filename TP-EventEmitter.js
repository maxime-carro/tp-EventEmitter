function EventEmitter()
{
	this.callbacks = {};
}

EventEmitter.prototype = {
	on: function(event, fn){ // Fonction qui permet d'ajouter un évènement pour lequel la fonction fn sera exécutée
		if(!this.callbacks.hasOwnProperty(event))
		{
			this.callbacks[event] = [{fn:fn, times:-1}];
		}
		else
		{
			this.callbacks[event].push({fn:fn, times:-1});
		}
		return this;
	},

	times: function(event, times, fn){ // Fonction qui permet d'ajouter un évènement pour lequel la fonction fn sera exécutée un certain nombre de fois
		if(!this.callbacks.hasOwnProperty(event))
		{
			this.callbacks[event] = [{fn:fn, times:times}];
		}
		else
		{
			this.callbacks[event].push({fn:fn, times:times});
		}
		return this;
	},
	
	once: function(event, fn){ // Fonction qui permet d'ajouter un évènement pour lequel la fonction fn sera exécutée une fois seulement
		return this.times(event, 1, fn);
	},
	
	off: function(event, fn){ // Fonction qui permet de supprimer un évènement de la liste des évènement à écouter
		if(typeof event == "undefined")
		{
			this.callbacks = {};
		}
		if(this.callbacks.hasOwnProperty(event))
		{
			if(fn != "undefined")
			{
				/*if(this.callbacks[event].indexOf(fn) != -1)
				{
					this.callbacks[event].splice(this.callbacks[event].indexOf(fn), 1);
				}*/
				
				var funs = this.callbacks[event];
				for(var key in funs)
				{
					if(funs[key].fn == fn)
					{
						this.callbacks[event].splice(key, 1);
						break;
					}
				}
			}
			else
			{
				delete this.callbacks[event];
			}
			
		}
		return this;
	},

	emit: function(event /* args... */){ // Fonction qui permet d'émettre un message via les arguments, passés aux fonctions associés à l'évènement donné
		if(this.callbacks.hasOwnProperty(event))
		{
			var funs = this.callbacks[event];
			var args =  Array.prototype.slice.call(arguments, 1).join(' ');
			for(var key in funs )
			{
				if(funs[key].times>0)
				{
					funs[key].times--;
					funs[key].fn(args);
				}
				else if(funs[key].times == -1)
				{
					funs[key].fn(args);
				}
			}
		}
		return this;
	}
	
	
};

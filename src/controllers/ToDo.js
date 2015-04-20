var _ = require('underscore');
var models = require('../models');

var ToDo = models.ToDo;

var todoPage = function(req, res){
	ToDo.ToDoModel.findByOwner(req.session.account._id, function(err, docs){
		if(err){
			console.log(err);
			return res.status(400).json({error:'An error occurred'});
		}
		
		res.render('app', {todos: docs});
	});
};

var makeToDo = function(req, res){
	console.log("make todo");
	if(!req.body.desc){
		return res.status(400).json({error: "What do you want to do"});
	}
	
	var UID;
	var repeated;
	var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
	do{
		UID = "";
		repeated = false;
		for(var i = 0; i < 5; i++){
			UID += chars.charAt(Math.floor(Math.random() * chars.length));
		}
		ToDo.ToDoModel.findByOwner(req.session.account._id, function(err, docs){
			if(err){
				console.log(err);
				return res.status(400).json({error:'An error occurred'});
			}
			
			for(var val in docs){
				if(UID === val.uid){
					repeated = true;
				}
			}
		});
	}while(repeated);
	
	
	var todoData = {
		uid: UID,
		desc: req.body.desc,
		owner: req.session.account._id
	};
	
	var newToDo = new ToDo.ToDoModel(todoData);
	
	newToDo.save(function(err){
		if(err){
			console.log(err);
			return res.status(400).json({error:'An error occurred'});
		}
		
		res.json({redirect:'/todo'});
	});
};

var doneToDo = function(req, res){
	var finishedToDo = {
		uid: req.query.uid,
		owner: req.session.account._id
	};
	
	deleteToDo = new ToDo.ToDoModel(finishedToDo);
	
	deleteToDo.remove(function(err){
		if(err){
			console.log(err);
			return res.status(400).json({error:'An error occurred'});
		}
		
		res.json({redirect:'/todo'});
	});
};

module.exports.todoPage = todoPage;
module.exports.makeToDo = makeToDo;
module.exports.doneToDo = doneToDo;
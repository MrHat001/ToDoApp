var mongoose = require('mongoose');
var _ = require('underscore');

var ToDoModel;

var ToDoSchema = new mongoose.Schema({
	uid: {
		type: String,
		required: true,
	},
	
	desc: {
		type: String,
		required: true,
		trim: true,
	},
	
	owner: {
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'Account'
	},
	
	createData: {
		type: Date,
		default: Date.now
	}
});

ToDoSchema.methods.toAPI = function(){
	return {
		desc: this.desc
	};
};

ToDoSchema.statics.findByOwner = function(ownerId, callback){
	var search = {
		owner: mongoose.Types.ObjectId(ownerId)
	};
	
	return ToDoModel.find(search).select('desc').exec(callback);
};

ToDoSchema.statics.findById = function(ownerId, itemId, callback){
	var search = {
		uid: mongoose.Types.ObjectId(itemId),
		owner: mongoose.Types.ObjectId(ownerId)
	};
	
	return ToDoModel.find(search).select('desc').exec(callback);
};

ToDoModel = mongoose.model('ToDo', ToDoSchema);

module.exports.ToDoModel = ToDoModel;
module.exports.ToDoSchema = ToDoSchema;
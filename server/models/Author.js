const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const AuthorSchema = new mongoose.Schema({
	firstname:{
		type: String
	},
	lastname:{
		type: String
	},
	image:{
		url:{
			type:String
		}
	},
	description:{
		type: String
	},
	slug:{
		type: String,
		unique: true,
		slug: ['firstname', 'lastname']
	},
	published:{
		type:Boolean,
		default: true
	},
	userId:{
		type:Types.ObjectId,
		ref:'User'
	},
	special:{
	  type:Boolean
	},
	views:{
	  type:Number,
	  default:0
	},
	createdAt:{
		type:Date,
		default:Date.now
	},
	updatedAt:{
		type:Date
	},
	publishedAt:{
		type:Date,
		default:Date.now
	}
},{
	toObject:{
		virtuals: true
	},
	toJSON: {
		virtuals: true
	}
});

AuthorSchema.virtual('name').get(function(){
	return this.firstname + ' ' + this.lastname;
});

module.exports = mongoose.model('Author', AuthorSchema);
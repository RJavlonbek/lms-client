var mongoose=require('mongoose');
var Types=mongoose.Schema.Types;

var ArticleSchema=new mongoose.Schema({
	title:{
		type:String,
		required:true
	},
	slug:{
		type:String,
		unique:true,
		slug:'title'
	},
	image:{
		url:{
			type:String
		}
	},
	subtitle:{
		type:String
	},
	paragraphs:[{
		content:{
			type:String
		}
	}],
	category:[{
		type:Types.ObjectId,
		ref:'Category'
	}],
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
});

module.exports=mongoose.model('Article',ArticleSchema);
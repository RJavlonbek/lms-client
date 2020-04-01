const path = require('path');
const Author=require('../models/Author');

const authorAPI={
	get:function(req,res,next){
		if(req.query.id){
			Author.findById(req.query.id).populate('category').exec((err, author)=>{
				if(err) return next(err);
				if(author && author._id){
					res.json(author);
				}else{
					res.json({});
				}
			});
		}else{
			Author.find({}, 'name firstname lastname image', (err,authors)=>{
				if(err) return next(err);
				if(authors && authors.length){
					res.json(authors);
				}else{
					res.json([]);
				}
			});
		}
	},
	store:function(req,res,next){
		const b=req.body;
		const cloudUrl = 'https://cloud.javelin.uz/files/medium';
		let file=req.files ? req.files.image : null;
		let extension = '';
		let filename = ''; // it will be sent inside response, so that client can use it to store that file to the cloud

		if(file){
			console.log(file);
			extension=file.name.split('.').pop();
			console.log('extension: '+extension);
		}

		if(b.id && b.id.length){  // editing
			Author.findById(b.id,(err, author)=>{
				author.firstname=b.firstname;
				author.lastname=b.lastname;
				author.description = b.description;

				if(extension){
					filename = '/author/' + author._id + '.' + extension;
					author.image = {
						url: cloudUrl + filename
					};
				}
				

				author.save(function(err,result){
					if(err) return next(err);
					// result.populate('category',(err,populatedAuthor)=>{
					// 	res.json({
					// 		result:'success',
					// 		data:populatedAuthor,
					// 		filename
					// 	});
					// });
					res.json({
						result: 'success',
						data: result,
						filename
					});
				});
			});
		}else{
			var author= new Author;
			author.firstname=b.firstname;
			author.lastname = b.lastname;
			author.description = b.description;
			author.userId=req.session.user ? req.session.user._id : null;

			if(extension){
				filename = '/author/' + author._id + '.' + extension;
				author.image = {
					url: cloudUrl + filename
				};
			}

			author.save(function(err,result){
				if(err) return next(err);
				// result.populate('category',(err,populatedAuthor)=>{
				// 	res.json({
				// 		result:'success',
				// 		data:populatedAuthor,
				// 		filename
				// 	});
				// });
				return res.json({
					result:'success',
					data:result,
					filename
				});
			});
		}
	},
	delete:function(req,res,next){
		const id=req.body.id;
		console.log(req.body);
		if(id){
			Author.findByIdAndRemove(id,(err,r)=>{
				if(err) return next(err);
				if(r && r._id){
					res.json({
						result:'success',
						data:r
					});
				}else{
					res.json({
						result:'error',
						message:'not-found'
					});
				}
			});
		}else{
			res.json({
				result:'error',
				message:'id-not-given'
			});
		}
	}
}

module.exports=authorAPI;
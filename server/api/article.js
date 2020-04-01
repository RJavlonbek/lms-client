const path = require('path');
const Article=require('../models/Article');

const articleAPI={
	get:function(req,res,next){
		if(req.query.id){
			Article.findById(req.query.id).populate('category').exec((err, article)=>{
				if(err) return next(err);
				if(article && article._id){
					res.json(article);
				}else{
					res.json({});
				}
			});
		}else{
			Article.find({}).populate('category').populate({
				path: 'author',
				select: ['firstname', 'lastname', 'name', 'image', 'slug', 'description']
			}).exec((err,articles)=>{
				if(err) return next(err);
				if(articles && articles.length){
					res.json(articles);
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

		let category = JSON.parse(b.category);
		let paragraphs = JSON.parse(b.paragraphs);

		if(file){
			console.log(file);
			extension=file.name.split('.').pop();
			console.log('extension: '+extension);
		}

		if(b.id && b.id.length){  // editing
			Article.findById(b.id,(err, article)=>{
				article.title=b.title;
				article.subtitle=b.subtitle;
				article.category=category;
				article.paragraphs = paragraphs;
				article.author = b.author;

				if(extension){
					filename = '/article/' + article._id + '.' + extension;
					article.image = {
						url: cloudUrl + filename
					};
				}
				

				article.save(function(err,result){
					if(err) return next(err);
					result.populate('category').populate({
						path: 'author',
						select: ['firstname', 'lastname', 'name', 'image', 'slug']
					}, (err,populatedArticle)=>{
						res.json({
							result:'success',
							data:populatedArticle,
							filename
						});
					});
				});
			});
		}else{
			var article= new Article;
			article.title=b.title;
			article.subtitle=b.subtitle;
			article.category=category;
			article.author = b.author;
			article.paragraphs = paragraphs;
			article.userId=req.session.user._id;

			if(extension){
				filename = '/article/' + article._id + '.' + extension;
				article.image = {
					url: cloudUrl + filename
				};
			}

			article.save(function(err,result){
				if(err) return next(err);
				result.populate('category',(err,populatedArticle)=>{
					res.json({
						result:'success',
						data:populatedArticle,
						filename
					});
				});
			});
		}
	},
	delete:function(req,res,next){
		const id=req.body.id;
		console.log(req.body);
		if(id){
			Article.findByIdAndRemove(id,(err,r)=>{
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

module.exports=articleAPI;
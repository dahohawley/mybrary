const express = require("express");
const router = express.Router();
const Books = require("../models/books");
const Authors = require("../models/author")
const multer = require('multer')
const path = require('path');
const uploadPath = path.join('public', Books.coverImageBasePath);
const imageMimeTypes = ["images/jpeg", 'images/png', 'images/gif'];
const upload = multer({
	dest: uploadPath,
	fileFilter: (req, file, callback) => {
		callback(null)
	}
})

// All Authors Route
router.get("/", async (req, res) => {
	res.render("books/index");
});

/* New Books Route */
router.get("/new", async (req, res) => {
	try {
		const authors = await Authors.find();
		const books = new Books();
		res.render('books/new', { authors: authors, books: books })
	} catch (error) {
		res.redirect('/books');
	}

	res.render("books/new");
});

/* Create Posted data */
router.post("/", upload.single('cover '), async (req, res) => {
	const fileName = req.file != null ? req.file.filename : null;

	params = req.body;
	const books = new Books({
		title: params.title,
		author: params.author,
		publishDate: new Date(params.publishDate),
		pageCount: params.pageCount,
		description: params.description,
		coverImageName: fileName,
	});

	try {
		const newBook = await books.save();
		res.redirect('books');
	} catch (error) {

	}
});

module.exports = router;

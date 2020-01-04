/*
Get all the published backend courses
sort them by their name,
pick only their name and author,
and display them.
*/
const mongoose = require('mongoose');

mongoose
	.connect('mongodb://localhost/mongo--exercises', { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Connecting to MongoDB');
	})
	.catch((err) => {
		console.log('Error occured', err);
	});

const courseSchema = new mongoose.Schema({
	name: String,
	author: String,
	tags: [String],
	date: { type: Date, default: Date.now },
	isPublished: Boolean,
	price: Number
});
// https://stackoverflow.com/questions/40079200/how-to-declare-collection-name-and-model-name-in-mongoose
// https://samwize.com/2014/03/07/what-mongoose-never-explain-to-you-on-case-sentivity/
const Course = mongoose.model('Course', courseSchema);
/*
Yes this happens when you set the model only with 2 parameters. If you give the third parameter it writes all the data to the 'camelCase' named collection: mongoose.model('name', schema, 'collectionName')
*/

async function getCourses() {
	return await Course
		.find({ tags: 'backend', isPublished: true })
		.sort({ name: 1 })
		.select({ name: 1, author: 1 });


}

async function run() {
	const courses = await getCourses();
	console.log(courses);
}

run();



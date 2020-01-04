const mongoose = require('mongoose');

// connect method returns promise
mongoose
	.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Connected to MongoDB...'))
	.catch((err) => console.error('Could not connect to MongoDB...', err));

// Define shape of the document(= table in Relational DB) in MongoDB
// Scheme is a part of mongoose, not mongoDB
// Schema Types:
/*
- String
- Number
- Date
- Buffer --> Binary Data
- Boolean
- ObjectID
- Array
*/
const courseSchema = new mongoose.Schema({
	name: String,
	author: String,
	tags: [ String ],
	date: { type: Date, default: Date.now },
	isPublished: Boolean
});

// Classes, objects
// Human (Blueprint), John(Instance)
// Course (Model), nodeCourse

const Course = mongoose.model('Course', courseSchema);

// 관계형 DB 에서는 아래 구조를 생성하려면 many to many or 적어도 3개의 Tables 가 필요하다
// const course = new Course({
//     name: 'Node.js Course',
//     author: 'Su',
//     tags: ['node', 'backend'],
//     isPublished: true
// });

// Asynchronous Operation because it may take some time to save data in Database
// const result = await course.save();
// console.log(result);

// Check out unique identifier
// async function createCourse()
async function createCourse() {
	const course = new Course({
		name: 'React Course',
		author: 'Su',
		tags: [ 'React', 'frontend' ],
		isPublished: true
	});

	const result = await course.save();
	console.log(result);
}

async function getCourses() {
	// Comparison Query Operators
	/*
    eq (equal)
    ne (not equal)
    gt (greater than)
    gte (greater than or equal to)
    lt (less than)
    lte (less than or equal to)
    in
    nin (not in)
    */
	// Find course which is greater than 10 dollars
	const coursesThatGreaterThanTen = await Course.find({ price: { $gt: 10 } });

	// Find course which is between 10 an 20
	// Course.find({price: {$gte: 10, $lte: 20}})

	// Find course which is 10 or 15 or 20 dollars
	// Course.find({price: {$in: [10, 15, 20]}})

	// const courses = await Course.find(); For All Courses
	// 1 indicates ascending order
	const courses = await Course.find({ author: 'Su', isPublished: true })
		.limit(10)
		.sort({ name: 1 })
		.select({ name: 1, tags: 1 });
	console.log(courses);

	// logical Query Operators
	// or
	// and
	const course = await Course.find().or([ { author: 'Mosh' }, { isPublished: 'true' } ]).and([]);

	// Regular Expressions
	// Starts with Su
	const course = await Course.find({ author: /^Mosh/ });

	// Ends with Su
	const course = await Course.find({ author: /su$/ });

	// Case in-sensitive
	const course = await Course.find({ author: /su$/i });

	// Contains Su
	const course = await Course.find({ author: /.*Su.*/ });

	// Counting - Get Number of Documents
	// return the number of documents which match these criterias
	const course = await Course.find({ author: 'su', isPublished: true }).limit(10).count();

	// Pagination - skip method
	const pageNumber = 2;
	const pageSize = 10;
	// In real world app, we pass these values through query strings
	// /api/courses?pageNumber=2&pageSize=10
	const course = await Course.find({ author: 'Su', isPublished: true })
		.skip((pageNumber - 1) * pageSize)
		.limit(pageSize)
		.sort({ name: 1 });
}

// createCourse();
getCourses();

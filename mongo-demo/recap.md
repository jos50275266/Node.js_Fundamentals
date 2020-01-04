1. DB에 연결하는 법
2. Schemas 작성하는 법
3. Models 작성하는 법
4. DB에 정보 저장하는 법
5. DB에 정보 저장하는 법 - CRUD
6. DB에 저장한 정보를 효율적으로 읽어오는 법

CRUD Operations using Mongoose and MongoDB So, in this section, you learned that: 

-MongoDB is an open-source document database. It stores data in flexible, JSON-like documents.

-In relational databases we have tables and rows, in MongoDB we have collections and documents. A document can contain sub-documents. 

-We don’t have relationships between documents. -To connect to MongoDB: 

```javascript
// Connecting to MongoDB
const mongoose = require(‘mongoose’);mongoose.connect(‘mongodb://localhost/playground')   .then(() => console.log(‘Connected...’))   
 .catch(err => console.error(‘Connection failed...’));
 
 
 -To store objects in MongoDB, we need to define a Mongoose schema first. The schema defines the shape of documents in MongoDB. 
 // Defining a schema 
 const courseSchema = new mongoose.Schema({      
     name: String,     
     price: Number 
});
```

- We can use a SchemaType object to provide additional details: 

```javascript
// Using a SchemaType object 
const courseSchema = new mongoose.Schema({     
    isPublished: { type: Boolean, default: false } 
    });
```

-Supported types are: String, Number, Date, Buffer (for storing binary data), Boolean and ObjectID. 

-Once we have a schema, we need to compile it into a model. A model is like a class. It’s a blueprint for creating objects: 

```javascript
// Creating a model 
const Course = mongoose.model(‘Course’, courseSchema);
```


CRUD Operations 
```javascript
// Saving a document 
let course = new Course({ name: ‘...’ });
course = await course.save();
```

```javascript
// Querying documents 
const courses = await Course   
.find({ author: ‘Mosh’, isPublished: true })   
.skip(10)   
.limit(10)   
.sort({ name: 1, price: -1 })   
.select({ name: 1, price: 1 });
```

```javascript
// Updating a document (query first) 
const course = await Course.findById(id);
if (!course) return; 
course.set({ name: ‘...’ });
course.save();
```

```javascript
// Updating a document (update first) 
const result = await Course.update({ _id: id }, {    
    $set: { name: ‘...’ }
    });
```

```javascript
// Updating a document (update first) and return it
const result = await Course.findByIdAndUpdate({ _id: id }, {    
    $set: { name: ‘...’ }}, 
    { new: true });
```

```javascript
// Removing a document 
const result = await Course.deleteOne({ _id: id });
const result = await Course.deleteMany({ _id: id });
const course = await Course.findByIdAndRemove(id);
```
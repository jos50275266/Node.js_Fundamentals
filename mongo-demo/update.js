const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'React Course',
        author: 'Su',
        tags: ['React', 'frontend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
        .find({ author: 'Su', isPublished: true })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });

    console.log(courses);
}

async function firstUpdateApproach(id) {
    // MongoDB 에는 두 가지의 Update 방식이 있다
    /* Approach1: Query First
    1. findById()
    2. Modify its properties
    3. save()
    */
    const course = await Course.findById(id);
    if (!course) return;
    course.isPublished = true;
    course.author = 'Another Author'

    const result = await course.save()
    console.log(result);
    // 위 방식과 아래는 동일
    // course.set({
    //     isPublished: true,
    //     author: 'Another Author'
    // })
}

/*
- 이 방식은 input을 client로 부터 받을때 유용하다.
- 예를 들면, ispublished가 true이면 author의 이름의 변경이 허용되지 않는 상황
Approach: Update first
1. update directly
optionally: get the updated document
*/

async function secondUpdateApproach(id) {
    // Check out mongodb update operators
    // 예를들면 $inc 같은 것은 페이스북의 like 기능에 사용할 수 있다.
    // course가 아니라 update 결과 임으로 변수명이 result
    const result = await Course.updateOne({ _id: id }, {
        $set: {
            author: 'Mosh',
            isPublished: false
        }
    });
    // 모든 ispublished : false인 곳을 update할려면
    // Course.update({isPublished: false})

    console.log(result);
}

async function thirdUpdateApproach(id) {
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Jason',
            isPublished: true
        }
    }, { new: true });
    console.log(course)
    // 이 경우 {new: true} 을 안주면 update 되기 전의 값이 log된다.
}

// 하나씩 다 찍어보고 결과 값을 비교해보자. updateOne의 경우 결과는 안보여주고, 
// {n: 1, nModified: 1, ok: 1} 와 같은 식으로만 결과값을 출력한다.

thirdUpdateApproach('5e10ae03a9d1160317532e5a')
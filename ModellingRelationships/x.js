// Course, Author

// Trade off between Query Performance vs consistency

// Using References (Normalization) --> Consistency 
/*
분리된(Separate) Collection 이 있어야하고, course 에서는 author의 id 값을 reference해 사용한다.
관계형DB에는 아래와 같은 구조가 enforces data integrity라고 한다.
몽고에서는 NoSql은 일반적으로 아래와 같은 형태를 사용하지않는다.

첫번째 접근법에는 author를 정의하는 별도의 장소, course를 정의하는 별도의 장소가있다
하지만 만약 내가 내일 이름을 Mosh라고 변경한다면, 내가 변경해야하는 부분은 둘 중 
한 곳만 변경하면된다(author), 그리고 course는 author가 업데이트되는 즉시 확인이 가능하다
그러므로 consistency에 유리하다, 
하지만, course 쿼리를 할때마다 related document인 author를 load(query) 해서,
Embedded 구조에 비해 Performance가 떨어진다.
*/
let author = {
    name: 'Yongsu'
}

let course = {
    author: 'id'
}


// Using Embedded Documents (Denormalization) --> Performance
/*
Embedding 구조의 Document이다. Embedding document inside of document
이 접근법은, 한 번의 Query 만으로 course + author를 모두 다 확인할 수 있어서 Reference 방식에
비해서 Performance가 뛰어나다, 하지만 이 방식에서 만약 내가 내일 author의 이름을 변경하면면,
다수의 course documents가 update 되어야 하는 문제가 발생한다. 그리고 만약 이 update 동작이
성공적으로 완수되지않으면 정상적으로 update 되지 않은 document가 발생할 가능성이있다.
그 결과, inconsisceny 데이터가 될 수 있다 비록 performance가 좋을지라도,
정보 변경이 많은 경우 비적합한 방식이다.
*/
let course = {
    author: {
        name: 'Yongsu'
    }
}

// Hybrid
/*
위 두 방식을 적절히 섞은 방식이 Hybrid 이다.
이방식은 author에 50개의 properties가 있다고 생각해보자,
그 중에 course에는 author의 50개 중 일부만 필요할 때 아래와 같이 구조가 발생한다.

아래와 같이 하면 query performance를 최적화할 수 있다. (50개 모두가 아닌 일부만 참조)
이 경우는 snapshot at a point in time에 유용하다, 예를 들면, E-Commerce
, order, product, shoppoing, 왜냐하면 알고싶은 정보가 특정 시점의 특정 상품의 가격 등이라서
*/

let author = {
    name: 'Yongsu'
    // 50 other properties
}

let course = {
    author: {
        id: 'ref of author document',
        name: 'Yongsu'
    }
}

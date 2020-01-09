# Error-Handling

## Case-1
1. Executing Mongodb through "mongod" command
2. Executing nodemon index.js 
3. Kill mongodb server
4. Call /api/genres 
5. Pausing for about 30 seconds

In this error case we have two different approaches to deal with this error:
- 상황: 데이터베이스를 실행하고 서버를 켰고, 서버에서 request를 보내고 이 request에 대한 response를 하기전 서버 혹은 데이터베이스 서버의 문제로 정상적으로 동작이 되지 않는 상황

First_Approach (express-async-errors): 
    1. genres.js 에서 router.get('/')은 DB로 부터 저장된 모든 genre에 관한 데이터를 response로 주는 동작이다, 즉 서버의 요청으로 DB에서 정보를 가져와 응답해야하는 상황이다.
    2. 이때 이 과정은 비동기(Async)로 발생한다 그 이유는 DB에서 자료를 처리하는 시간이 걸리기 때문에 single-thread인 nodejs의 특성상 효율적인 thread 사용을 위해서다.
    3. 비동기로 req-res 동작을 하는 도중 문제가 발생할 때 우리는 try-catch 문을 이용해 오류를 잡아낸다.
    4. 하지만, 모든 부분에 try-catch를 다 일일이 적는 것은 hard-coding이기 때문에 이 점을 좀 더 용이하기 위해 middleware의 개념을 이용한다.
    5. 아래 코드는 app.use()를 이용해 middleware stack에 추가해주지 않으면 서버는 아래 코드들이 http request-response와 관련있는 동작인지 알 방법이 없다 그러므로 app.use(error)와 같은 
    방식으로 코드를 실행하는 방식을 취한다.
```javascript error.js
module.exports = function (err, req, res, next) {
    res.status(500).send('Something Failed');
}
```
    6. 특징은 app.use(error) 을 해줄때 index/app.js 파일의 middleware 정의 부분 중 최하단에 위치해야한다 그 이유는 모든 동작이 끝나고 최종적으로 오류가 처리되기 때문이다. 
    7. 본래는 아래와 같이 try... catch 구문을 하나의 middleware 함수로 만들어 return 값으로 (req, res, next) 주고 callback 함수로 handler 인자값을 받는 방식으로 일일이 아래 처럼 router.get 함수 안의
    callback 함수를 asyncMiddleware 함수로 감싸줌으로 인해 여러번의 try..catch 문을 사용하지 않고 오류를 처리해야하지만, express-async-errors 가 async.js 함수의 기능을 해주기 때문에 express-async-errors를 지원하지 않는 경우를 제외하고 굳이 일일이 정의할 필요가 없고 위의 error.js 와 같이 logging message만 별도로 작성해주면된다. 

```javascript 
    const asyncMiddleware = require('async.js')

    router.get('/', async asyncMiddleware((req, res, next) => {
        ...something
    }))
``` 
```javascript async.js
module.exports = function (handler) {
    // 이게 가능한 이유는 router.get() --> express module 내의 callback 함수를 감싸면 return (req, res, next) 가 http module으로 인식할 수 있기 때문이다.
    // https://stackoverflow.com/questions/7337572/what-does-middleware-and-app-use-actually-mean-in-expressjs
    return async (req, res, next) => {
        try {
            await handler(req, res);
        }

        catch (ex) {
            // function (err, req, res, next) 에서 ex(exception)을 next middleware 함수에
            // 인자값으로 전달해주면, express-async-errors가 다른 middleware의 마지막 시점에서 err parameter를 잡아내고 그 후 아래 error.js 에 개발자가 정의한 오류를 
            // 출력해준다.
            next(ex)
        }
    }
}
```




```

Second_Approach (try... catch): 

두번째 방식은 아래와 같이 일일이 Async/Await 방식으로 try.. catch 구문으로 서버 연결 중 데이터베이스 연결이 끊기거나 서버가 끊기는 등의 문제가 발생할 수 있는 router를 아래 함수로 감싸서 실행하고 에러가 발생하면 아래 error.js 에 ex(exception)을날림으로써 적절히 Error Handling을 한다. index.js에서 모든 middleware의 제일 마지막에 app.use(error) referecing 방식으로 실행해준다.
여기서 referencing의 의미는 예를 들면, calling function은 nodemon something.js 실행시 어떤 이유든지간에 프로그램이 실행되면 바로 함수가 실행됨을 의미하고, referencing은 아래 예시에서는 next(ex)이 발생시 실행됨을 의미한다. 더 쉽게 설명하면, try 에서 걸리면 자동으로 res.send()가 되 동작이 끝남으로 그 다음 middleware로 넘어가지않지만, 만약 이것이 catch에 걸리면 next() middleware 함수가 실행되 그 마지막 Error Handling 함수가 실행되는 방식으로 실행되어야 하기 때문에 calling function 대신 referencing function의 방식으로 코드를 작성했다.
<!-- https://stackoverflow.com/questions/15886272/what-is-the-difference-between-a-function-call-and-function-reference -->

https://stackoverflow.com/questions/7337572/ what-does-middleware-and-app-use-actually-mean-in-expressjs
```javascript  async.js
module.exports = function (handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        }

        catch (ex) {
            next(ex)
        }
    }
}
```

```javascript error.js
module.exports = function (err, req, res, next) {
    res.status(500).send('Something Failed.');
}
```

```javascript index.js
const error = require('./error.js')
...
app.use(error);
```
무한로딩됨.. try catch or require('express-async-errors') 없으면


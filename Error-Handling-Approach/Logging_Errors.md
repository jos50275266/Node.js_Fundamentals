# Logging Errors - winston

- Transport 
    - console
    - file
    - http 
    - MongoDB
    - CouchDB
    - Redis
    - Loggly

1. uncaught exception
```javascript
// 이 경우 synchronous code 에서 발생한 에러만을 검출할 수 있다.
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: 'logfile.log'})
    ]
})


process.on('uncaughtException', (ex) => {
    console.log('We GOT AN UNCAUGHT EXCEPTION');
    logger.error(ex.message)
    process.exit(1); // 0: success
})

throw new Error('Something Failed During Startup.')
```

2. unhandledRejection
```javascript
// 이 경우 Asynchronous code 에서 발생한 에러 검출에 사용될 수 있다.
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: 'logfile.log'})
    ]
})

process.on('unhandledRejection', ex => {
    console.log('We GOT AN UNHANDLED REJECTION');
    logger.error(ex.message);
    process.exit(1);
})

const p = Promise.reject(new Error('Something Failed miserably!'));
p.then(() => console.log('Done')).catch();
```

3. winston의 handleExceptions method를 이용해 에러잡기
```javascript
// handleExceptions method는 오직 unhandledRejection 에러만 검출이 가능한데 트릭을 활용해
// 비동기 코드에서 오류 발생시 throw ex를 해주면 동기처럼 인식해 비동기 오류도 검출할 수 있게된다.
winston.handleExceptions(new winston.transports.File({filename: 'uncaughtException.log'}))

process.on('unhandledRejection', ex => {
    throw ex;
})
```

// Add another transport
// winston.add(new winston.transports.File({ filename: 'logfile.log' }))
winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly' }))
// DB에 log 라는 collection에 오류가 document로 저장됨.
// https://codesquery.com/nodejs-logging-tutorial/

// 아래 에러는 Express 및 winston이 잡아내지 못하는 에러다, uncaught exceptions
// 이러한 경우 server에 콘솔 찍지않는이상 어떤 문제인지 알 수 없다. 이 문제를 해결하기위해
// process object의 eventEmitter를 이용한다.

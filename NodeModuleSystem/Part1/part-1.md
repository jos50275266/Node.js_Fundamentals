<h1>Node.js Fundamentals Part-1</h1>

<h3> window vs global </h3>
<p> Browser 에서는 window object가 global scope을 가진다. global scope의 의미는 어떤 파일이든 상관없이 접근할 수 있음을.  예를 들면,

```
console.log();
setTimeout();
clearTimeout();
// 등이 예시가 될 수 있다. 본래는 아래와 같이 window가 prefix 되어야 하지만 생략하고 사용해도 무방하다

window.console.log() === console.log
window.setTimeout() === setTimeout

위와 같은 논리로 Browser에서는
var message = '';
window.message

변수 message는 global scope을 가지게 됨으로 window object를 이용해 접근할 수 있다.
```

</p>

<p>
하지만 Node.js runtime environment 에서는 Browser와 같은 논리로 동작하면 문제가 발생하기 때문에 global 이라는 개념을 이용해 다르게 동작한다. 예를 들면,

```
var message = ''
console.log(global.message); // --> 'undefined'이 출력된다.
```

Node.js 실행 환경에서 위와 같은 방식을 취하는 이유는 한 프로그램을 만들 때 여러 개의 파일로 구성될 때 Browser 처럼 global scope으로 함수 혹은 변수가 생성되면 이후 overwrite 등과 같은 문제가 발생하기 때문이다. 이러한 문제를 방지하기 위해서, Node.js는 module(a file) 이라는 개념을 이용했다. 즉, 의존성 있고, 유지보수가 쉬운 프로그램 작성을 위해 한 파일(module)에 정의된 함수/변수는 모두 해당 파일(모듈) 의 scope에 한정된다. OOP의 용어로는 Private과 유사한 개념이라 생각할 수 있다. 만일 Private 상태의 다른 모듈의 함수/변수 등을 사용하려면, import를 통해 필요한 것을 public으로 변경하는 방식을 이용해야 한다.

module을 출력해보면 아래와 같은 결과 값이 나온다.

```
console.log(module);

Module {
    id: '.',
    path: 'C:\\Users\\user\\Desktop\\nodejs_fundamentals\\Node.js_Fundamentals\\NodeModuleSystem',
    exports: {},
    parent: null,
    filename: 'C:\\Users\\user\\Desktop\\nodejs_fundamentals\\Node.js_Fundamentals\\NodeModuleSystem\\module.js',
    loaded: false,
    children: [],
    paths: [
      'C:\\Users\\user\\Desktop\\nodejs_fundamentals\\Node.js_Fundamentals\\NodeModuleSystem\\node_modules',
      'C:\\Users\\user\\Desktop\\nodejs_fundamentals\\Node.js_Fundamentals\\node_modules',
      'C:\\Users\\user\\Desktop\\nodejs_fundamentals\\node_modules',
      'C:\\Users\\user\\Desktop\\node_modules',
      'C:\\Users\\user\\node_modules',
      'C:\\Users\\node_modules',
      'C:\\node_modules'
    ]
  }
```

예를 들어, 아래와 같이 module.exports를 통해 object 방식으로 public으로 만들어 주고 싶은 것만 export 하는 방식을 취하고 module을 다시 출력해보면 아래 출력된 결과와 같이 exports 라는 프로퍼티에 exports 한 요소가 key: value 방식으로 등록된 것을 알 수 있다. 만일 key를 주지 않고 하나의 함수만 export 하는 것 또한 가능하다.

```
logger.js

var url = "http://loggerger.io/log";

function log(message) {
    console.log(message)
}


module.exports.log = log;
module.exports.url = url;

console.log(module);

// result
Module {
  id: '.',
  path: 'C:\\Users\\user\\Desktop\\nodejs_fundamentals\\Node.js_Fundamentals\\NodeModuleSystem',
  exports: { endPoint: 'http://mylogger.io/log', url: 'http://mylogger.io/log' },
  parent: null,
  filename: 'C:\\Users\\user\\Desktop\\nodejs_fundamentals\\Node.js_Fundamentals\\NodeModuleSystem\\logger.js',
  loaded: false,
  children: [],
  paths: [
    'C:\\Users\\user\\Desktop\\nodejs_fundamentals\\Node.js_Fundamentals\\NodeModuleSystem\\node_modules',
    'C:\\Users\\user\\Desktop\\nodejs_fundamentals\\Node.js_Fundamentals\\node_modules',
    'C:\\Users\\user\\Desktop\\nodejs_fundamentals\\node_modules',
    'C:\\Users\\user\\Desktop\\node_modules',
    'C:\\Users\\user\\node_modules',
    'C:\\Users\\node_modules',
    'C:\\node_modules'
  ]
}

```

그리고 app.js 에서 logger에서 export한 것을 사용하려면 require를 이용해 아래와 같이 이용할 수 있다.

```
// app.js
const logger = require("./logger.js");

logger.log("message");
```

만약 logger module 에서 아래와 같이 함수 자체를 key값 없이 export 한다면,

```
// logger.js
var url = "http://loggerger.io/log";

function log(message) {
    console.log(message)
}


module.exports = log
```

app.js 모듈에서는 아래와 같이 dot notation 없이 바로 실행할 수 있다 마치 logger 라는 함수가 있는 것처럼

```
const logger = require('./logger.js');

logger('message');
```

</p>

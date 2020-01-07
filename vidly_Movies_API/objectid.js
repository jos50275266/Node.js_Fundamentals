// _id: 5e1358975437dd01c8c7acb4
// 24 characters: 
// every 2 characters represent byte
// This object Id is almost unique, not 100% 

// Total 12 bytes
// first 4 bytes: timestamp
// We can extract this time
// next 3 bytes: machine identifier
// next 2 bytes: process identifier
// next 3 bytes : counter (auto incrementing number)

// 1 byte = 8 bits (0 or 1)
// 2 ^ 8 = 256 = 1 byte can store 
// 2 ^ 24 = 16M = 3 byte (counter)

// 왜 mongoDB 에는 sql 처럼 auto-increment와 같이 uniqueness를 완벽히 보장하지 않을까?
// mongoDB의 확성성의 용이함을 위해

// Driver --> MongoDB
// MongoDB 위에 생성한 App이 Highly Scalable한 이유가 Driver 단 에서 _id를 생성하기때문이다.
// MongoDB가 NEW UNIQUE IDENTIFIER를 생성하기까지 기다리지 않아도 되기 때문이다.

// 즉, mongoose가 실행되는 mongoose는 Driver에게 _id를 생성하라 지시한다.
// You can also explicitly generate this id
const mongoose = require('mongoose');
const id = new mongoose.Types.ObjectId();
console.log(id); // In memory에 있다 not DB
console.log(id.getTimestamp()); // Timestamp 가져오는 법

const isValid = mongoose.Types.ObjectId.isValid('1234');
console.log(isValid);
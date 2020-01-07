const bcrypt = require('bcryptjs')

// 1234 --> abcd (Hashing Algorithm --> One Way)
// Salt --> random string which add before or after string
// Always Async Usage
async function run() {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash('1234', salt);
    console.log(salt);
    console.log(hashed);
}

run();


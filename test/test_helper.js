const mongoose = require('mongoose');

before('Start database connection', (done) => {
    const uri = 'mongodb://localhost/test-user'
    mongoose.connect(uri, { useMongoClient: true })
    .catch(err => console.log(err));
    mongoose.connection.once('open', done);
});

beforeEach('Remove all data each test file', async () => {
    await mongoose.connection.db.dropDatabase(); //Drop db before each file
});

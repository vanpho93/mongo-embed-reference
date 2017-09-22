const assert = require('assert');
const User = require('../src/User');

describe('Can create a user', () => {
    beforeEach('Remove all user in User collection', async () => {
        await User.remove({});
    });

    it('Can create user using instance method', async () => {
        const user = new User({ name: 'Pho', age: 10 });
        await user.save();
        const userFromDb = await User.findOne({});
        assert(user._id.toString() === userFromDb._id.toString());
    });

    it('Can create user using class method', async () => {
        await User.insertMany([{ name: 'Pho', age: 10 }]);
        const userFromDb = await User.findOne({});
        assert(userFromDb.name === 'Pho');
    });
});

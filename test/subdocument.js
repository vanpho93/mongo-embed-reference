const assert = require('assert');
const User = require('../src/User');

describe('Subdocument testing', () => {
    it('Create a user with 2 cars', async () => {
        const user = new User({
            name: 'Pho',
            age: 10,
            cars: [{ branch: 'Honda', color: 'red' }, { branch: 'Ford', color: 'black' }]
        });
        await user.save();

        const userInDb = await User.findOne();
        assert(userInDb.name === 'Pho');
        assert(userInDb.cars[0].branch === 'Honda');
        assert(userInDb.cars[1].branch === 'Ford');
    });

    it('Can create 2 people named Pho', async () => {
        const user = new User({
            name: 'Pho',
            age: 10
        });
        await user.save();
    });

    it('Can remove a subdocument', async () => {
        const user = new User({
            name: 'Pho',
            age: 10,
            cars: [{ branch: 'Honda', color: 'red' }, { branch: 'Ford', color: 'black' }]
        });
        await user.save();
        const userInDb = await User.findOne();
        // Lấy ra từ mảng, gọi remove là hàm động bộ, sau đó nhớ gọi save
        userInDb.cars[1].remove();
        await userInDb.save();
        const userInDb2 = await User.findOne();
        assert(userInDb2.cars.length === 1);
        assert(userInDb2.cars[0].color === 'red');
    });

    it('Can update a subdocument', async () => {
        const user = new User({
            name: 'Pho',
            age: 10,
            cars: [{ branch: 'Honda', color: 'red' }, { branch: 'Ford', color: 'black' }]
        });
        await user.save();
        const userInDb = await User.findOne();
        //Sau khi update xong thì gọi save();
        userInDb.cars[0].branch = 'Suzuki';
        await userInDb.save();
        const userInDb2 = await User.findOne();
        assert(userInDb2.cars[0].branch === 'Suzuki');
    });

    it('Can add new car to a user', async () => {
        const user = new User({
            name: 'Pho',
            age: 10,
            cars: [{ branch: 'Honda', color: 'red' }, { branch: 'Ford', color: 'black' }]
        });
        await user.save();
        const userInDb = await User.findOne();
        //Sử dụng hàm push để thêm mới.
        userInDb.cars.push({ branch: 'Suzuki', color: 'blue' });
        await userInDb.save();
        const userInDb2 = await User.findOne();
        assert(userInDb2.cars.length === 3);
        assert(userInDb2.cars[2].branch === 'Suzuki');
    });
});


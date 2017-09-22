const assert = require('assert');
const User = require('../src/User');
const Post = require('../src/Post');

describe('Can create a post for user', () => {
    it('Create 1 post for user', async () => {
        const user = new User({ name: 'Pho', age: 10 });
        await user.save();
        const user2 = await User.findOne({});
        const post = new Post({ title: 'Javascript is awsome', content: 'Just kidding' });
        await post.save();
        user2.posts.push(post);
        await user2.save();
        const user3 = await User.findOne({}).populate('posts');
        assert(user3.posts[0].title === 'Javascript is awsome');
    });
});

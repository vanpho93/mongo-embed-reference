const assert = require('assert');
const User = require('../src/User');
const Post = require('../src/Post');

describe('Can create a post for user', () => {
    beforeEach('Create user and posts for testing', async () => {
        const user = new User({ name: 'Pho', age: 10 });
        const post = new Post({ title: 'Javascript is awsome', content: 'Just kidding' });
        const post2 = new Post({ title: 'Javascript is such', content: 'Just kidding' });
        user.posts.push(post, post2);
        await user.save();
        await post.save();
        await post2.save();
    });

    it('Before each run perfectly', async () => {
        const userNum = await User.count();
        const postNum = await Post.count();
        assert(userNum === 1);
        assert(postNum === 2);
    });

    it('Can add a new post', async () => {
        const user = await User.findOne();
        const post = new Post({ title: 'Javascript is modern', content: 'Just kidding' });
        user.posts.push(post);
        await post.save();
        await user.save();
        const user2 = await User.findOne().populate('posts'); // remember to push an 's'
        assert(user2.posts.length === 3);
        assert(user2.posts[2].title === 'Javascript is modern');
    });

    it('Can remove a post', async () => {
        const user = await User.findOne().populate('posts');
        const post = user.posts[0];
        await post.remove();
        const postNum = await Post.count();
        assert(postNum === 1);
        // Lưu ý ở đây 1 tí nhé các bạn.
        const user2 = await User.findOne().populate('posts');
        const user3 = await User.findOne();
        assert(user2.posts.length === 1);
        assert(user3.posts.length === 2);
    });
});

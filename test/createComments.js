const assert = require('assert');
const User = require('../src/User');
const Post = require('../src/Post');
const Comment = require('../src/Comment');

describe('Can create a post for user', () => {
    beforeEach('Create user and post, comments for testing', async () => {
        const user = new User({ name: 'Pho', age: 10 });
        const user2 = new User({ name: 'Ha', age: 12 });
        const post = new Post({ title: 'Javascript is awsome', content: 'Just kidding' });
        const comment1 = new Comment({ content: 'I am a js dev', user });
        const comment2 = new Comment({ content: 'I am a js dev', user: user2 });

        user.posts.push(post);
        post.comments.push(comment1, comment2);

        await Promise.all([user.save(), user2.save(), post.save(), comment1.save(), comment2.save()]);
        assert(await User.count() === 2);
        assert(await Comment.count() === 2);
        assert(await Post.count() === 1);
    });

    it('Info link correctly', async () => {
        const user = await User.findOne({}, { _id: 0}).populate({
            path: 'posts',
            populate: {
                path: 'comments',
                model: 'comment'
            }
        });
        console.log(user.posts);
    });
});

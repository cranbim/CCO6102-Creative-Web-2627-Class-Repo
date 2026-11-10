// lib/postData.js — everything to do with POSTS on the class wall lives here.
// Same pattern as userData.js: routes call these functions, never Mongoose.

import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
	{
		// maxlength: Mongoose rejects anything longer — a wall post, not an essay.
		text: { type: String, required: true, maxlength: 280 },

		// We store the author's USERNAME on each post. Simple to read back.
		// (The "proper" way is to store the user's id and link the two documents
		// with ref/populate — one of the discussion points at the end of class.)
		author: { type: String, required: true }
	},
	{
		// timestamps: true makes Mongoose add createdAt and updatedAt for us.
		timestamps: true,
		toJSON: {
			virtuals: true,
			transform: function (doc, ret) {
				delete ret._id;
				delete ret.__v;
				return ret;
			}
		}
	}
);

export const Post = mongoose.model('Post', postSchema);

// Every post on the wall, newest first.
// sort({ createdAt: -1 }) means "by createdAt, biggest (newest) first".
export async function getAllPosts() {
	const posts = await Post.find().sort({ createdAt: -1 });
	return posts;
}

// Save a new post. Note who the author is: the routes in server.js pass in
// the username of the user found FROM THE TOKEN, never a name the caller sent.
export async function createPost(text, author) {
	const post = await Post.create({ text: text, author: author });
	return post;
}

// LAB 3 — step 1: write getPostsByAuthor(author).
// It looks just like getAllPosts above, but find() gets a filter:
//   Post.find({ author: author })
// Keep the newest-first sort. Remember to export it.

import { baseApi } from "./base";

export function getPosts(options) {
  return baseApi.get("posts", options);
}

export function getPost(postId, options) {
  return baseApi.get(`posts/${postId}`, options);
}

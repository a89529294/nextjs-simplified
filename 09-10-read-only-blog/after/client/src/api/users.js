import { baseApi } from "./base";

export function getUsers(options) {
  return baseApi.get("users", options);
}

export function getUser(userId, options) {
  return baseApi.get(`users/${userId}`, options);
}

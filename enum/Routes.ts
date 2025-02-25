/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
export enum RoutesAPI {
  login = "/user/login",
  register = "/user/register",
  requestReset = "/reset/request",
  resetPWD = "/reset/",
  about = "/",
  publish = "/post/",
  profile = "/profile/",
  simpleProfile = "/profile/s/",
  unfollow = "/unfollow/",
  follow = "/follow/",
  updateProfile = "/profile/",
  getConfigPrivacy = "/profile/config/privacy",
  updateConfigPrivacy = "/profile/config",
  getMyPostForEditAPI = "/post/",
  removeMyPost = "/post/",
  updatePost = "/post/",
  likeRoute = "/post/like/",
  simplePost = "/post/s/",
  comment = "/comment/",
  marked = "/marked/",
  foryou = "/home/foryou",
  getComments = "/comment/",
}

export enum Routes {
  home = "/home",
  login = "/login",
  register = "/register",
  profile = "/profile",
  post = "/post?id=",
}

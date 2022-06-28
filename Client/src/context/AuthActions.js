export const LoginStart = (userCreds) => ({
  type:"LOGIN_START"
})

export const LoginSuccess = (user) => ({
  type:"LOGIN_SUCCESS",
  payload:user,
})

export const LoginFail = (error) => ({
  type:"LOGIN_START",
  payload:error
})

export const Follow = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});

export const Unfollow = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});
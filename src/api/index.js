import request from "./requests";

export const reqWorksList = () => {
    return request({url:"/opus/opusList", method:"get"})
}
export const reqIdentifyCode = () => {
    return request({url:"/login/captcha", method:"get"})
}

export const login = (params) => request({
    url:'/login',
    method:'post',
    params:params,
})
import request from "./requests";

export const reqWorksList = () => {
    return request({url:"/feiyi/opus/opusList", method:"get"})
}

export const reqGetSearchInfo = (params) => request({
    url:'/',
    method:'post',
    data:params,
})
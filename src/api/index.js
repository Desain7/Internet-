import request from "./requests";

//登录相关请求
//#region 
export const reqIdentifyCode = () => request({url:"/login/captcha", method:"get"})


export const login = (params) => request({
    url:'/login',
    method:'post',
    params:params,
})
//#endregion

//用户信息配置
//#region 
export const register = (params) => request({
    url:'/userConfig/register',
    method:'post',
    params:params,
})
export const reqUpdatePass = (params) => request({
    url:'/userConfig/update',
    method:'post',
    params:params,
})
export const reqForgetPass = (params) => request({
    url:'/userConfig/forgetPassword',
    method:'post',
    params:params,
})
export const reqValidateCode = (params) => request({
    url:'/userConfig/getCode',
    method:'post',
    params:params,
})
export const reqUpdateUser = (data) => request({
    url:'/user/update',
    method:'post',
    data:data,
})
export const reqUserInfo = (query) => request({
    url:'/user/getByEmail',
    method:'get',
    params:query,
})

//#endregion

//作品相关请求
//#region 
export const reqWorksList = (params) =>  request({url:"/opus/opusList", method:"get", params:params})

export const reqAuthorWork = () =>  request({url:"/opus/list/1", method:"get"})

export const reqSaveWork = (data) => request({
    url:'/opus/save',
    method:'post',
    data:data
})

export const reqUpdateWork = (data) => request({
    url:'/opus/update',
    method:'post',
    data:data
})

export const reqDeleteWork = (data) => request({
    url:'/opus/delete',
    method:'post',
    data:data
})

export const reqWorkInform = (params) => request({
    url:'/opus/getOpusAndConfig',
    method:'get',
    params:params
})

export const reqHotWorks = () => request({
    url:'/opus/getHot',
    method:'get',
})

export const reqUploadPhoto = (params) => request({
    url:'/opusPhoto/upload',
    method:'post',
    params:params
})

export const reqDeletePhoto = (params) => request({
    url:'/opusPhoto/deleteById',
    method:'delete',
    params:params
})

export const reqCollectionList = (params) => request({
    url:'/collection',
    method:'get',
    params:params
})
export const reqSupportList = (params) => request({
    url:'/support',
    method:'get',
    params:params
})

//#endregion

//评论相关请求
//#region 
export const reqSupportComment = (query) => request({
    url:'/comments/support/2',
    method:'get',
    query:query
})
export const reqCommentsList = (query) => request({
    url:'/comments/getAll',
    method:'get',
    query:query
})
export const reqComment = (params) => request({
    url:'/comments',
    method:'get',
    params:params
})
export const reqDeleteComment = (params) => request({
    url:`/comments/delete/${params}`,
    method:'delete',
})
//#endregion

//作者相关请求
//#region 
export const reqAuthorInform = () => request({url:'/author/info/2', method:'get'})

export const reqSaveAuthor = (data) => request({
    url:'/author/save',
    method:'post',
    data:data,
})

export const reqUpdateAuthor = (params) => request({
    url:'/author/update',
    method:'post',
    params:params,
})
//#endregion

//视频相关请求
//#region 
export const reqUpdateVideo = (params) => request({
    url:'/vod/uploadAlyVideo',
    method:'post',
    params:params
})
export const reqDeleteVideo = (params) => request({
    url:'/vod/deleteBatch',
    method:'post',
    params:params
})
export const reqDeleteVideoById = (params) => request({
    url:'/vod/removeAlyVideo/c2f8d9be5fe34e9484bd240c101b37bd',
    method:'post',
    params:params
})

export const reqVideoAuth = (params) => request({
    url:'/vod/getPlayAuth/f6f9ba561e5c416fa31d6967e09caba3',
    method:'get',
    params:params
})
export const reqVideoAddress = (params) => request({
    url:'/vod/getPlayInfo/f6f9ba561e5c416fa31d6967e09caba3',
    method:'get',
    params:params
})
//#endregion
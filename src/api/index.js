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
export const reqUploadAvatar = (params) => request({
    url:'/user/uploadHead',
    method:'post',
    params:params,
})
export const reqUpdateUser = (params) => request({
    url:'/user/update',
    method:'post',
    params:params,
})
export const reqUserInfo = (query) => request({
    url:'/user/getByEmail',
    method:'get',
    query:query,
})

//#endregion

//作品相关请求
//#region 
export const reqWorksList = () =>  request({url:"/opus/opusList", method:"get"})

export const reqAuthorWork = () =>  request({url:"/opus/list/1", method:"get"})

export const reqSearchWork = (params) => request({
    url:'/opus/likeOpus',
    method:'get',
    params:params
})

export const reqSaveWork = (params) => request({
    url:'/opus/save',
    method:'post',
    params:params
})

export const reqUpdateWork = (params) => request({
    url:'/opus/update',
    method:'post',
    params:params
})

export const reqDeleteWork = (params) => request({
    url:'/opus/delete',
    method:'post',
    params:params
})

export const reqWorkInform = (params) => request({
    url:'/opus/getOpusAndConfig',
    method:'get',
    params:params
})

export const reqUploadPhoto = (query, params) => request({
    url:'/opus/delete',
    method:'post',
    query:query,
    params:params
})

export const reqCollectionList = (query) => request({
    url:'/collection',
    method:'get',
    query:query
})
export const reqSupportList = (query) => request({
    url:'/support',
    method:'get',
    query:query
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
export const reqComment = (query) => request({
    url:'/comments',
    method:'get',
    query:query
})
export const reqDeleteComment = (query) => request({
    url:'/comments/delete/1',
    method:'delete',
    query:query
})
//#endregion

//作者相关请求
//#region 
export const reqAuthorInform = () => request({url:'/author/info/2', method:'get'})

export const reqSaveAuthor = (params) => request({
    url:'/author/save',
    method:'post',
    params:params,
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
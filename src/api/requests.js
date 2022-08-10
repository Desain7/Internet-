import axios from "axios"
import nprogress from "nprogress"
import "nprogress/nprogress.css"

const request = axios.create({
    baseURL: "/api",
    timeout:5000,
})

request.interceptors.request.use((config) => {
    nprogress.start()
    if (localStorage.getItem('feiyiuser')){
        let user = localStorage.getItem('feiyiuser')
        config.headers.token = user.token
    }
    return config
})


request.interceptors.response.use((res) => {
    nprogress.done()
    return res.data
}, (error) => {
    error
    return Promise.reject(new Error('Fail to get data'))
})

export default request
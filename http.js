import axios from "axios"

const http = axios.create({
    baseURL:"http://localhost:3000"
})

http.interceptors.request.use(function(config){
    if(localStorage.getItem("id")&&localStorage.getItem("token")){
        config.headers.Authorization = "Bearer "+localStorage.getItem("token")
    }
    return config
},function(error){
    return Promise.reject(error)
})

http.interceptors.response.use(function(response){
    return response
},function(error){
    if(error.response.status == 401 || error.response.status == 402){
        router.push("/login")
        vue.prototype.$msg.fail(error.response.data.message)
    }
    return Promise.reject(error)
})

export default http
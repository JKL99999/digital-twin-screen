/**
 * 简化版 Axios 封装 (通用版)
 * * 功能：
 * 1. 实例化 Axios
 * 2. 请求拦截器：判断并自动携带 Token
 * 3. 响应拦截器：统一处理业务错误（如 401 Token 失效）
 */
import axios from "axios"
import { Message, MessageBox } from "element-ui"
import { getToken } from "@/service/lib/localToken" // 确保路径正确

// 1. 创建 axios 实例
const service = axios.create({
    // process.env.VUE_APP_BASE_API 对应 .env 文件中的 base url
    baseURL: process.env.VUE_APP_BASE_API, // 所有的请求地址前缀部分
    withCredentials: true, // 跨域请求时发送 cookie
    timeout: 5000, // 请求超时时间
})

// 2. 请求拦截器
service.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么

        // 从 Cookie (localToken.js) 中获取 Token
        const token = getToken()

        // 如果 Token 存在，则注入到 Header 中
        if (token) {
            // 【注意】：这里需要根据你后端接口定义的 Header 名称进行修改
            // 常见情况 1：标准 JWT 格式 -> 'Authorization': 'Bearer ' + token
            // 常见情况 2：自定义名称 -> 'token': token

            // 假设后端接受的 Header 键名为 'Authorization'
            config.headers["Authorization"] = token
            // config.headers['token'] = token // 如果后端要 'token' 字段，就用这行
        }

        return config
    },
    error => {
        // 处理请求错误
        console.log(error)
        return Promise.reject(error)
    }
)

// 3. 响应拦截器
service.interceptors.response.use(
    response => {
        // 拿到后端返回的数据主体
        const res = response.data

        // 假设后端约定：code === 20000 代表成功
        // (如果你的后端成功状态码是 200，请改为 res.code !== 200)
        if (res.code !== 20000) {
            // 打印错误码用于调试
            console.log("业务错误 Code:", res.code)

            // === 核心逻辑：处理 Token 失效 (401) ===
            if (res.code === 401) {
                // 拦截到 401，说明 Token 过期或未登录
                MessageBox.confirm("登录状态已失效，请重新登录", "系统提示", {
                    confirmButtonText: "重新登录",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                    .then(() => {
                        // 用户点击“重新登录”，跳转逻辑
                        // 方式 A: 强制刷新页面，触发路由守卫重定向
                        // window.location.reload()

                        // 方式 B: 直接跳转到登录页 (假设登录页路由是 /login)
                        window.location.href = "/login"
                    })
                    .catch(() => {
                        // 用户点击取消，留在当前页
                    })
            } else {
                // === 其他业务错误 (如 500, 参数错误等) ===
                Message({
                    message: res.message || "系统繁忙，请稍后再试",
                    type: "error",
                    duration: 5 * 1000,
                })
            }

            // 抛出错误，中断后续 .then() 执行
            return Promise.reject(new Error(res.message || "Error"))
        } else {
            // 业务成功，直接返回数据
            return res
        }
    },
    error => {
        // === 处理 HTTP 网络层面的错误 ===
        // 例如：404 Not Found, 500 Internal Server Error, 网络断开
        console.log("err" + error)
        Message({
            message: error.message || "网络请求失败",
            type: "error",
            duration: 5 * 1000,
        })
        return Promise.reject(error)
    }
)

export default service

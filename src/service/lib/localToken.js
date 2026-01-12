/**
 * 本文件用于在前端通过 Cookie 管理站点 Token。
 * 统一封装三件事：读取(getToken)、写入(setToken)、移除(removeToken)。
 *
 * 工作原理：
 * - 基于 js-cookie，在键名 `siteTokenKey` 下存储 Token（来自 `@/settings`）。
 * - 默认写入会话 Cookie；如果需要持久登录可设置 `expires`。
 *
 * 使用示例：
 *   setToken('YOUR_TOKEN');
 *   const token = getToken();
 *   removeToken();
 *
 * 安全建议：
 * - 生产环境建议设置 `sameSite: 'Lax'` 或 `Strict`、`secure: true`、`path: '/'`。
 * - 将敏感操作配合 CSRF 防护；不要在可被第三方站点访问的上下文暴露 Token。
 */
import Cookies from "js-cookie"
import { siteTokenKey } from "@/settings"

/**
 * 获取本地Token
 * @author LiQingSong
 */
export function getToken() {
    return Cookies.get(siteTokenKey)
}

/**
 * 设置存储Token
 * @author LiQingSong
 */
export function setToken(token) {
    return Cookies.set(siteTokenKey, token)
}

/**
 * 移除本地Token
 * @author LiQingSong
 */
export function removeToken() {
    return Cookies.remove(siteTokenKey)
}

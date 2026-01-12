import request from "@/service/lib/request"

//获取viewtoken的接口
export function getViewToken(id) {
    return request({
        url: `/digital/model/getViewToken`,
        method: "get",
        params: {
            id: id,
        },
    })
}

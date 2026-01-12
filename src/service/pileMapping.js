import request from "@/service/lib/request"

//获取viewtoken的接口
export function getPileInfoByElementId(elementId) {
    return request({
        url: `/digital/pileMapping/getPileInfoByElementId`,
        method: "get",
        params: {
            elementId: elementId,
        },
    })
}

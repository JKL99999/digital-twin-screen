import request from "@/service/lib/request"

//获取桩基信息的接口
export function getInfoByPileNumber(pileNumber) {
    return request({
        url: `/digital/pileInfo/getInfoByPileNumber`,
        method: "get",
        params: {
            pileNumber: pileNumber,
        },
    })
}

// 条件查询带分页桩基施工信息1
export function list(data) {
    return request({
        url: `/digital/pileInfo/list`,
        method: "post",
        data,
    })
}

// 通过excel上传,更新施工信息
export function importPileConstructRecord(file) {
    const formData = new FormData()
    // 'file' 必须与后端 @RequestParam("file") 名字一致
    formData.append("file", file)

    return request({
        url: "/digital/pile_record/import",
        method: "post",
        data: formData,
        // 如果需要上传进度条，可以加 onUploadProgress
    })
}

//获取开累完成的桩号 getFinishedThisMonth
export function getAllCompletedPiles(params) {
    return request({
        url: `/digital/pile_record/getAllCompletedPiles`,
        method: "get",
        params,
    })
}

//获取本月完成的桩号 getFinishedThisMonth
export function getFinishedThisMonth(params) {
    return request({
        url: `/digital/pile_record/getFinishedThisMonth`,
        method: "get",
        params,
    })
}

//获取开累完成的桩号 getFinishedThisWeek
export function getFinishedThisWeek(params) {
    return request({
        url: `/digital/pile_record/getFinishedThisWeek`,
        method: "get",
        params,
    })
}

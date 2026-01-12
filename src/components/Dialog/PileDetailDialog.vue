<template>
    <el-dialog
        :visible.sync="localVisible"
        :show-close="false"
        width="1104px"
        custom-class="pile-detail-dialog"
        :before-close="handleClose"
        :append-to-body="true"
    >
        <div class="custom-header-wrapper">
            <img src="@/assets/img/top-center.png" alt="" class="header-img" />
            <span class="header-title">桩基详细参数</span>
        </div>

        <div class="detail-content-wrapper">
            <div class="detail-header">
                <div class="left-info">
                    <span class="pile-code">{{ selectedPileNumber || "GTLZ-286" }}</span>
                    <el-tag v-if="constructStatus === 1" effect="dark" type="success" size="small" class="status-tag"
                        >已完成</el-tag
                    >
                    <el-tag v-else effect="dark" type="warning" size="small" class="status-tag">未完成</el-tag>
                </div>
                <div class="right-search">
                    <el-input
                        v-model="searchKeyword"
                        placeholder="请输入桩基编号搜索"
                        size="small"
                        class="custom-input"
                        clearable
                        @keyup.enter.native="handleSearch"
                    ></el-input>
                </div>
            </div>

            <div class="detail-body">
                <div class="left-part">
                    <div class="section-block">
                        <div class="section-title"><span class="num-box">1</span> 施工信息</div>
                        <el-row class="info-grid">
                            <el-col :span="8" v-for="(item, index) in constructionData" :key="'c' + index">
                                <div class="info-item">
                                    <span class="label" :title="item.label">{{ item.label }}</span>
                                    <span class="value" :title="item.value">{{ item.value }}</span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>

                    <div class="section-block">
                        <div class="section-title"><span class="num-box">2</span> 试验信息 (自检)</div>
                        <el-row class="info-grid">
                            <el-col :span="8" v-for="(item, index) in selfCheckData" :key="'s' + index">
                                <div class="info-item">
                                    <span class="label" :title="item.label">{{ item.label }}</span>
                                    <span class="value" :title="item.value">{{ item.value }}</span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>

                <div class="right-part">
                    <div class="section-block">
                        <div class="section-title"><span class="num-box">3</span> 试验信息 (三检)</div>
                        <el-row class="info-grid">
                            <el-col :span="8" v-for="(item, index) in thirdCheckData" :key="'t' + index">
                                <div class="info-item">
                                    <span class="label" :title="item.label">{{ item.label }}</span>
                                    <span class="value" :title="item.value">{{ item.value }}</span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>

                    <div class="section-block">
                        <div class="section-title"><span class="num-box">4</span> 现场验收信息</div>
                        <div class="single-text-row">验收时间：{{ acceptanceTime }}</div>
                    </div>

                    <div class="section-block">
                        <div class="section-title">
                            <span class="num-box">5</span> 挂接附件信息 (图片/视频/文件等超链接)
                        </div>

                        <div class="attachment-list">
                            <div class="attach-row">
                                <i class="el-icon-picture-outline icon-blue"></i>
                                <span class="attach-label">图片：过程照片...</span>
                                <a href="#" class="link-text">www.xxx.com</a>
                            </div>
                            <div class="attach-row">
                                <i class="el-icon-video-camera icon-blue"></i>
                                <span class="attach-label">视频：数字化设备...</span>
                                <a href="#" class="link-text">www.xxx.com</a>
                            </div>
                            <div class="attach-row" style="align-items: flex-start">
                                <i class="el-icon-document icon-blue" style="margin-top: 2px"></i>
                                <span class="attach-label">文件：自检报告</span>
                                <div class="multi-links">
                                    <a href="#" class="link-text">www.xxx.com</a>
                                    <a href="#" class="link-text">三检报告</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import { getInfoByPileNumber } from "@/service/pile.js"
import { getPileInfoByElementId } from "@/service/pileMapping.js"
// 引入所有配置
import { CONSTRUCTION_FIELD_MAP, SELF_CHECK_FIELD_MAP, THIRD_CHECK_FIELD_MAP } from "@/const/pileConfig.js"
// 通用映射处理函数（纯逻辑，不依赖组件实例）
const mapDataToFields = (dataObj, configMap) => {
    const source = dataObj || {}
    return configMap.map(field => {
        let val = source[field.prop]

        // 空值处理
        if (val === null || val === undefined || val === "") {
            val = "-"
        }
        // 单位拼接
        else if (field.unit) {
            val = `${val}${field.unit}`
        }

        return { label: field.label, value: val }
    })
}
export default {
    name: "PileDetailDialog",
    props: {
        visible: { type: Boolean, default: false },
        pileId: { type: String, default: "" },
    },
    data() {
        return {
            pileNmuber: "",
            searchKeyword: "",
            acceptanceTime: "2025年5月23日",
            // 数据保持不变...
            constructionData: mapDataToFields({}, CONSTRUCTION_FIELD_MAP),
            selfCheckData: mapDataToFields({}, SELF_CHECK_FIELD_MAP),
            thirdCheckData: mapDataToFields({}, THIRD_CHECK_FIELD_MAP),

            selectedPileNumber: null,
            selectedElementId: null,
            constructStatus: 0,
        }
    },
    computed: {
        localVisible: {
            get() {
                return this.visible
            },
            set(val) {
                this.$emit("update:visible", val)
            },
        },
    },
    methods: {
        handleClose() {
            this.localVisible = false
        },

        async getPileInfoByElementId(elementId) {
            try {
                const res = await getPileInfoByElementId(elementId)
                if (res && res.data && res.data.item) {
                    const item = res.data.item
                    this.selectedPileNumber = item.pileNumber
                    this.constructStatus = item.constructStatus

                    // 1. 处理施工信息 (constructRecord)
                    this.constructionData = mapDataToFields(item.constructRecord, CONSTRUCTION_FIELD_MAP)

                    // 2. 处理自检信息 (qualityTest)
                    this.selfCheckData = mapDataToFields(item.qualityTest, SELF_CHECK_FIELD_MAP)

                    // 3. 处理三检信息 (thirdPartyTest)
                    this.thirdCheckData = mapDataToFields(item.thirdPartyTest, THIRD_CHECK_FIELD_MAP)
                }
            } catch (error) {
                console.error("获取桩基详情失败", error)
            }
        },

        handleSearch() {
            this.getInfoByPileNumber(this.searchKeyword)
        },

        async getInfoByPileNumber(pileNumber) {
            try {
                const res = await getInfoByPileNumber(pileNumber)
                if (res.data && res.data.item) {
                    this.selectedElementId = res.data.item.elementId
                    this.getPileInfoByElementId(this.selectedElementId)
                }
            } catch {
                console.error("获取构件信息失败")
            }
        },
    },
    watch: {
        pileId(val) {
            if (val && this.visible) {
                // 注意这里是用 this.visible 或 this.localVisible
                this.getPileInfoByElementId(val)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
$border-color: #1c4c74;
$text-blue: #00eaff;
$text-white: #ffffff;

/* 深度选择器定制 Dialog */
::v-deep .pile-detail-dialog {
    background: #0e1a2a;
    box-shadow: 0px 2px 8px 0px rgba(23, 159, 222, 0.4);
    border-radius: 12px;
    border: 1px solid #c0ebff;

    /* === 核心修改：居中定位开始 === */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 !important; /* 强制去除 Element UI 默认的 margin-top: 15vh */
    /* === 核心修改：居中定位结束 === */

    overflow: visible; /* 允许头部图片溢出边界 */

    /* 固定大小 */
    width: 1104px !important;
    height: 517px !important;

    /* 隐藏 ElementUI 默认头部 */
    .el-dialog__header {
        display: none;
    }

    /* 调整 Body 填充 */
    .el-dialog__body {
        padding: 0;
        height: 100%;
        width: 100%;
    }
}

/* 自定义顶部 Header 样式 */
.custom-header-wrapper {
    position: absolute;
    top: -24px; /* 根据图片实际高度调整，让其骑在边框上 */
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;

    .header-img {
        height: 44px; /* 根据实际图片大小调整 */
        width: auto;
        display: block;
    }

    .header-title {
        position: absolute;
        color: #fff;
        font-weight: bold;
        font-size: 16px;
        letter-spacing: 1px;
        text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
        top: 45%; /* 微调垂直居中 */
        transform: translateY(-50%);
    }
}

/* 内容包裹层 */
.detail-content-wrapper {
    padding: 30px 20px 20px 20px; /* 顶部留多一点给Header */
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

/* 顶部搜索栏 */
.detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px dashed $border-color;
    flex-shrink: 0; /* 防止被压缩 */

    .left-info {
        display: flex;
        align-items: center;
        gap: 10px;
        .pile-code {
            font-size: 20px;
            font-weight: bold;
            color: $text-white;
        }
    }
    .custom-input {
        width: 250px;
        ::v-deep .el-input__inner {
            background-color: rgba(255, 255, 255, 0.1);
            border: 1px solid $border-color;
            color: $text-white;
            height: 32px;
            line-height: 32px;
        }
        ::v-deep .el-input__icon {
            line-height: 32px;
        }
    }
}

/* 主体内容区 - 左右布局 */
.detail-body {
    display: flex;
    gap: 20px;
    overflow: hidden; /* 固定高度，若内容过多则隐藏，符合“固定大小”要求 */
    /* 如果希望内容过多时内部滚动，可改为 overflow-y: auto; */

    .left-part,
    .right-part {
        flex: 1;
        width: 50%;
    }
}

/* 区块通用 */
.section-block {
    margin-bottom: 15px;

    .section-title {
        font-size: 13px;
        color: $text-white;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        font-weight: bold;

        .num-box {
            display: inline-block;
            width: 18px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            background-color: #007acc;
            color: #fff;
            font-size: 12px;
            margin-right: 6px;
            border-radius: 2px;
        }
    }
}

/* 表格样式优化（更紧凑以适应固定高度） */
.info-grid {
    border-top: 1px solid $border-color;
    border-left: 1px solid $border-color;

    .info-item {
        display: flex;
        font-size: 12px;
        height: 28px; /* 压低高度 */
        line-height: 28px;
        width: 100%;
        border-right: 1px solid $border-color;
        border-bottom: 1px solid $border-color;

        .label {
            width: 40%;
            background-color: rgba(255, 255, 255, 0.05);
            color: #b0c4de;
            padding: 0 5px;
            border-right: 1px solid $border-color;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .value {
            width: 60%;
            padding: 0 5px;
            color: $text-white;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}

.single-text-row,
.attachment-list {
    font-size: 12px;
    padding-left: 24px;
    color: #ccc;
    .link-text {
        color: $text-blue;
        text-decoration: none;
        margin-left: 5px;
    }
}
</style>

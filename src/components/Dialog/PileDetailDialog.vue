<template>
    <el-dialog
        title="桩基详细参数"
        :visible.sync="localVisible"
        width="1000px"
        custom-class="pile-detail-dialog"
        :before-close="handleClose"
        :append-to-body="true"
        top="5vh"
    >
        <div class="detail-header">
            <div class="left-info">
                <span class="pile-code">{{ pileId || "GTLZ-XXX" }}</span>
                <el-tag effect="dark" type="success" size="small" class="status-tag">已完成</el-tag>
            </div>
            <div class="right-search">
                <el-input
                    v-model="searchKeyword"
                    placeholder="请输入桩基编号搜索"
                    size="small"
                    suffix-icon="el-icon-search"
                    class="custom-input"
                ></el-input>
            </div>
        </div>

        <div class="dialog-content-scroll">
            <div class="section-block">
                <div class="section-title"><span class="num-box">1</span> 施工信息</div>
                <el-row class="info-grid">
                    <el-col :span="8" v-for="(item, index) in constructionData" :key="'c' + index">
                        <div class="info-item">
                            <span class="label">{{ item.label }}</span>
                            <span class="value">{{ item.value }}</span>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <div class="section-block">
                <div class="section-title"><span class="num-box">2</span> 试验信息 (自检)</div>
                <el-row class="info-grid">
                    <el-col :span="8" v-for="(item, index) in selfCheckData" :key="'s' + index">
                        <div class="info-item">
                            <span class="label">{{ item.label }}</span>
                            <span class="value">{{ item.value }}</span>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <div class="section-block">
                <div class="section-title"><span class="num-box">3</span> 试验信息 (三检)</div>
                <el-row class="info-grid">
                    <el-col :span="8" v-for="(item, index) in thirdCheckData" :key="'t' + index">
                        <div class="info-item">
                            <span class="label">{{ item.label }}</span>
                            <span class="value">{{ item.value }}</span>
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
                    <span class="num-box">5</span> 挂接附件信息 (图片/视频/文件等超链接) 可实现点击查阅
                </div>

                <div class="attachment-list">
                    <div class="attach-row">
                        <i class="el-icon-picture-outline icon-blue"></i>
                        <span class="attach-label">图片：过程照片-数字化设备提供、验收照片等</span>
                        <a href="#" class="link-text">www.xxx.com</a>
                    </div>
                    <div class="attach-row">
                        <i class="el-icon-video-camera icon-blue"></i>
                        <span class="attach-label">视频：数字化设备提供</span>
                        <a href="#" class="link-text">www.xxx.com</a>
                    </div>
                    <div class="attach-row" style="align-items: flex-start">
                        <i class="el-icon-document icon-blue" style="margin-top: 2px"></i>
                        <span class="attach-label">文件：自检报告</span>
                        <div class="multi-links">
                            <a href="#" class="link-text">www.xxx.com</a>
                            <a href="#" class="link-text">三检报告</a>
                            <a href="#" class="link-text">www.xxx.com</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: "PileDetailDialog",
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        pileId: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            searchKeyword: "",
            acceptanceTime: "2025年5月23日",
            // 下面是模拟数据，您需要在 fetchData 中替换为接口返回的数据
            constructionData: [
                { label: "工区", value: "设计水泥" },
                { label: "桩基类型", value: "设计水泥" },
                { label: "桩基编号", value: "设计水泥" },
                { label: "桩径-搭接", value: "设计水泥" },
                { label: "桩长", value: "设计水泥" },
                { label: "间距", value: "设计水泥" },
                { label: "桩顶标高", value: "设计水泥" },
                { label: "设计方量", value: "设计水泥" },
                { label: "水泥", value: "设计水泥" },
                { label: "设计水泥掺量", value: "设计水泥" },
                { label: "设计水灰比", value: "设计水泥" },
                { label: "桩基分区/检验批分区", value: "设计水泥" },
                { label: "施工时间", value: "设计水泥" },
                { label: "施工状态", value: "设计水泥" },
                { label: "施工队伍", value: "设计水泥" },
                { label: "开始时间", value: "设计水泥" },
                { label: "垂直度", value: "设计水泥" },
                { label: "钻入深度", value: "设计水泥" },
                { label: "下钻速度", value: "设计水泥" },
                { label: "提升时间", value: "设计水泥" },
                { label: "提升速度", value: "设计水泥" },
                { label: "设计水灰比", value: "设计水泥" },
                { label: "实际水灰比", value: "设计水泥" },
                { label: "喷浆压力", value: "设计水泥" },
                { label: "结束时间", value: "设计水泥" },
                { label: "单桩喷浆量", value: "设计水泥" },
                { label: "水泥浆比重", value: "设计水泥" },
                { label: "施工机械", value: "设计水泥" },
            ],
            selfCheckData: [
                { label: "工程部位", value: "设计水泥" },
                { label: "代表数量", value: "设计水泥" },
                { label: "样品厚度", value: "设计水泥" },
                { label: "检测项目", value: "设计水泥" },
                { label: "强度等级", value: "设计水泥" },
                { label: "委托组数", value: "设计水泥" },
                { label: "成型日期", value: "设计水泥" },
                { label: "委托日期", value: "设计水泥" },
                { label: "自检报告日期", value: "设计水泥" },
                { label: "自检报告编号", value: "设计水泥" },
                { label: "28d结果", value: "设计水泥" },
            ],
            thirdCheckData: [
                { label: "工程部位", value: "设计水泥" },
                { label: "代表数量", value: "设计水泥" },
                { label: "样品规格", value: "设计水泥" },
                { label: "检测项目", value: "设计水泥" },
                { label: "强度等级", value: "设计水泥" },
                { label: "委托组数", value: "设计水泥" },
                { label: "三检报告日期", value: "设计水泥" },
                { label: "三检报告编号", value: "设计水泥" },
                { label: "28d结果", value: "设计水泥" },
            ],
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
    watch: {
        // 当弹窗打开或桩号变化时，请求接口
        pileId(newVal) {
            if (newVal && this.localVisible) {
                this.fetchData()
            }
        },
        visible(newVal) {
            if (newVal) {
                this.fetchData()
            }
        },
    },
    methods: {
        handleClose() {
            this.localVisible = false
        },
        fetchData() {
            console.log("Fetching data for pile:", this.pileId)
            // TODO: 在这里调用您的后端接口
            // axios.get(`/api/pile/${this.pileId}`).then(res => { this.constructionData = res.data... })
        },
    },
}
</script>

<style lang="scss" scoped>
/* 定义变量，方便调整颜色 */
$bg-color: rgba(4, 28, 52, 0.95);
$border-color: #1c4c74;
$text-blue: #00eaff;
$text-white: #ffffff;
$highlight-bg: rgba(0, 234, 255, 0.1);

/* 深度选择器覆盖 Element UI 默认 Dialog 样式 */
::v-deep .pile-detail-dialog {
    width: 1104px;
    height: 517px;
    background: #0e1a2a;
    box-shadow: 0px 2px 8px 0px rgba(23, 159, 222, 0.4);
    border-radius: 12px 12px 12px 12px;
    border: 1px solid #c0ebff;

    .el-dialog__header {
        background: linear-gradient(to bottom, #093457, #041c34);
        border-bottom: 1px solid $border-color;
        padding: 15px 20px;

        .el-dialog__title {
            color: $text-white;
            font-weight: bold;
            letter-spacing: 1px;
            text-shadow: 0 0 5px $text-blue;
        }
        .el-dialog__close {
            color: $text-blue;
            &:hover {
                color: #fff;
            }
        }
    }

    .el-dialog__body {
        padding: 20px;
        color: #ccc;
    }
}

/* 顶部信息栏样式 */
.detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px dashed $border-color;

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

    /* 自定义输入框样式 */
    .custom-input {
        width: 250px;
        ::v-deep .el-input__inner {
            background-color: rgba(255, 255, 255, 0.1);
            border: 1px solid $border-color;
            color: $text-white;
            border-radius: 4px;
            &:focus {
                border-color: $text-blue;
            }
        }
    }
}

/* 滚动区域，防止弹窗过长 */
.dialog-content-scroll {
    max-height: 65vh;
    overflow-y: auto;
    padding-right: 10px;

    /* 自定义滚动条 */
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background: $border-color;
        border-radius: 3px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
}

/* 通用区块样式 */
.section-block {
    margin-bottom: 20px;

    .section-title {
        font-size: 14px;
        color: $text-white;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        font-weight: bold;

        .num-box {
            display: inline-block;
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            background-color: #007acc;
            color: #fff;
            font-size: 12px;
            margin-right: 8px;
            border-radius: 2px;
        }
    }
}

/* 网格数据样式 */
.info-grid {
    border-top: 1px solid $border-color;
    border-left: 1px solid $border-color;

    .el-col {
        border-right: 1px solid $border-color;
        border-bottom: 1px solid $border-color;
    }

    .info-item {
        display: flex;
        font-size: 12px;
        line-height: 32px; /* 控制行高 */

        .label {
            width: 40%;
            background-color: rgba(255, 255, 255, 0.05);
            color: #b0c4de; /* 浅蓝灰色 */
            padding-left: 10px;
            border-right: 1px solid $border-color;
        }

        .value {
            width: 60%;
            padding-left: 10px;
            color: $text-white;
        }
    }
}

/* 简单的单行文本样式 */
.single-text-row {
    font-size: 13px;
    color: $text-white;
    padding-left: 28px; /* 对齐文字 */
}

/* 附件列表样式 */
.attachment-list {
    padding-left: 28px;
    font-size: 13px;

    .attach-row {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        color: #ccc;

        .icon-blue {
            color: $text-blue;
            font-size: 16px;
            margin-right: 8px;
        }

        .attach-label {
            margin-right: 15px;
        }

        .link-text {
            color: $text-blue;
            text-decoration: none;
            margin-right: 15px;
            &:hover {
                text-decoration: underline;
                color: #fff;
            }
        }

        .multi-links {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
    }
}
</style>

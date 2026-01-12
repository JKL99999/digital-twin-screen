<template>
    <div class="app-container">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>桩基施工记录管理</span>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button type="info" plain icon="el-icon-upload2" size="mini" @click="handleImport"
                            >Excel导入</el-button
                        >
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                            type="warning"
                            plain
                            icon="el-icon-download"
                            size="mini"
                            @click="handleDownloadTemplate"
                            >下载模板</el-button
                        >
                    </el-col>
                </el-row>

                <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="88px">
                    <el-form-item label="施工状态:" prop="constructStatus">
                        <el-select
                            v-model="queryParams.constructStatus"
                            placeholder="请选择施工状态"
                            clearable
                            size="small"
                            @change="handleQuery"
                        >
                            <el-option label="全部" :value="null" />
                            <el-option label="已施工" value="1" />
                            <el-option label="未施工" value="0" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="工区:" prop="workArea">
                        <el-input
                            v-model="queryParams.workArea"
                            placeholder="请输入工区"
                            clearable
                            size="small"
                            @keyup.enter.native="handleQuery"
                        />
                    </el-form-item>

                    <el-form-item label="桩号:" prop="pileNumber">
                        <el-input
                            v-model="queryParams.pileNumber"
                            placeholder="请输入桩号"
                            clearable
                            size="small"
                            @keyup.enter.native="handleQuery"
                        />
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery"
                            >搜索</el-button
                        >
                        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <el-table v-loading="loading" :data="recordList" border stripe style="width: 100%; margin-top: 20px">
                <el-table-column type="selection" width="55" align="center" fixed="left" />
                <el-table-column label="序号" type="index" width="50" align="center" fixed="left" />

                <el-table-column label="关联桩号" align="center" prop="pileNumber" fixed="left" width="120" sortable />
                <el-table-column label="工区" align="center" prop="workArea" fixed="left" width="100" />
                <el-table-column
                    label="桩基类型"
                    align="center"
                    prop="pileType"
                    fixed="left"
                    width="120"
                    show-overflow-tooltip
                />
                <el-table-column label="桩径(mm)" align="center" prop="pileDiameter" width="100" />
                <el-table-column label="搭接长度(mm)" align="center" prop="overlapLength" width="120" />
                <el-table-column label="桩长(m)" align="center" prop="designLength" width="100" />
                <el-table-column label="间距(mm)" align="center" prop="spacing" width="100" />
                <el-table-column label="桩顶标高(m)" align="center" prop="pileTopElevation" width="120" />
                <el-table-column label="设计方量(m3)" align="center" prop="designVolume" width="120" />
                <el-table-column label="水泥品种" align="center" prop="cementType" width="120" />
                <el-table-column label="设计水泥掺量" align="center" prop="designCementDosage" width="120" />
                <el-table-column label="设计水灰比" align="center" prop="designWaterCementRatio" width="120" />
                <el-table-column label="桩基分区" align="center" prop="pilePartition" width="120" />

                <el-table-column label="施工时间" align="center" prop="constructionDate" width="100">
                    <template slot-scope="scope">
                        <span>{{ parseTime(scope.row.construction_date, "{y}-{m}-{d}") }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="施工状态" align="center" prop="constructionStatus" width="100">
                    <template slot-scope="scope">
                        <el-tag :type="statusTagFilter(scope.row.constructionStatus)">
                            {{ formatStatus(scope.row.constructionStatus) }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    label="施工队伍"
                    align="center"
                    prop="constructionTeam"
                    width="150"
                    show-overflow-tooltip
                />
                <el-table-column label="开钻时间" align="center" prop="startTime" width="160">
                    <template slot-scope="scope">
                        <span>{{ parseTime(scope.row.start_time) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="竖直度(%)" align="center" prop="verticality" width="100" />
                <el-table-column label="钻入深度(m)" align="center" prop="drillingDepth" width="110" />
                <el-table-column label="下钻速度(m/min)" align="center" prop="designDrillingSpeed" width="140" />
                <el-table-column label="提升时间" align="center" prop="liftingTime" width="160">
                    <template slot-scope="scope">
                        <span>{{ parseTime(scope.row.lifting_time) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="提升速度(m/min)" align="center" prop="designLiftingSpeed" width="140" />
                <el-table-column label="实际水灰比" align="center" prop="actualWaterCementRatio" width="100" />
                <el-table-column label="喷浆压力(MPa)" align="center" prop="groutingPressure" width="120" />
                <el-table-column label="结束时间" align="center" prop="endTime" width="160">
                    <template slot-scope="scope">
                        <span>{{ parseTime(scope.row.end_time) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="单桩喷浆量(m3)" align="center" prop="concreteVolume" width="140" />
                <el-table-column label="水泥浆比重" align="center" prop="slurrySpecificGravity" width="120" />
                <el-table-column label="施工机械" align="center" prop="drillingMachine" width="120" />

                <el-table-column
                    label="操作"
                    align="center"
                    fixed="right"
                    width="150"
                    class-name="small-padding fixed-width"
                >
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
                            >修改</el-button
                        >
                        <el-button
                            size="mini"
                            type="text"
                            icon="el-icon-delete"
                            class="text-danger"
                            @click="handleDelete(scope.row)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
                class="pagination-container"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryParams.current"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="queryParams.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
        </el-card>

        <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
            <el-upload
                ref="upload"
                :limit="1"
                accept=".xlsx, .xls"
                :headers="upload.headers"
                action="#"
                :disabled="upload.isUploading"
                :http-request="httpRequest"
                :auto-upload="false"
                drag
            >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip text-center" slot="tip">
                    <span>仅允许导入xls、xlsx格式文件。</span>
                    <el-link
                        type="primary"
                        :underline="false"
                        style="font-size: 12px; vertical-align: baseline"
                        @click="handleDownloadTemplate"
                        >下载模板</el-link
                    >
                </div>
            </el-upload>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitFileForm">确 定</el-button>
                <el-button @click="upload.open = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { list } from "@/service/pile.js"
import { importPileConstructRecord } from "@/service/pile.js"
export default {
    name: "PileInfoManagement",
    data() {
        return {
            // 遮罩层
            loading: true,
            // 显示搜索条件
            showSearch: true,
            // 总条数
            total: 0,
            // 桩基施工记录表格数据
            recordList: [],
            // 查询参数
            queryParams: {
                current: 1,
                limit: 10,
                constructStatus: null,
                workArea: null,
                pileNumber: null,
            },
            // 导入参数配置
            upload: {
                // 是否显示弹出层
                open: false,
                // 弹出层标题
                title: "",
                // 是否禁用上传
                isUploading: false,
            },
        }
    },
    created() {
        this.search()
    },
    methods: {
        // 获取 Token 的辅助方法 (根据你的项目实际情况修改)
        getToken() {
            return localStorage.getItem("token") || ""
        },

        // --- 1. 查询列表 ---

        async search() {
            this.loading = true
            const res = await list(this.queryParams)
            this.recordList = res.data.list.rows
            this.total = res.data.list.total
            this.loading = false
        },

        // --- 2. 搜索与重置 ---
        handleQuery() {
            this.queryParams.current = 1
            this.search()
        },
        resetQuery() {
            this.$refs["queryForm"].resetFields()
            this.handleQuery()
        },

        // --- 3. 导入 Excel 相关 ---
        handleImport() {
            this.upload.title = "桩基施工记录导入"
            this.upload.open = true
        },
        // 下载模板
        handleDownloadTemplate() {
            window.location.href =
                "https://mccsbc.obs.cn-east-3.myhuaweicloud.com/project/37/xlsx/%E6%A1%A9%E5%9F%BA%E6%96%BD%E5%B7%A5%E4%BF%A1%E6%81%AF-1768200179146.xlsx"
        },
        // 自定义上传
        httpRequest(params) {
            this.upload.isUploading = true
            importPileConstructRecord(params.file)
                .then(response => {
                    this.upload.open = false
                    this.upload.isUploading = false
                    this.$refs.upload.clearFiles()
                    this.$alert(response.msg || "导入成功", "导入结果", { dangerouslyUseHTMLString: true })
                })
                .catch(() => {
                    this.upload.isUploading = false
                    this.$message.error("上传失败，请重试")
                })
        },
        // 提交上传文件
        submitFileForm() {
            this.$refs.upload.submit()
        },

        // --- 4. 分页事件 ---
        handleSizeChange(val) {
            this.queryParams.limit = val
            this.search()
        },
        handleCurrentChange(val) {
            this.queryParams.current = val
            this.search()
        },

        // --- 5. 辅助方法 ---
        handleUpdate(row) {
            this.$message.info("点击了修改: " + row.pile_number)
        },
        handleDelete(row) {
            this.$confirm('是否确认删除桩号为"' + row.pile_number + '"的数据项？', "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    // delPileConstructRecord(row.id);
                    this.$message.success("删除成功")
                    this.getList()
                })
                .catch(() => {})
        },
        // 简单的日期格式化
        parseTime(time, pattern) {
            if (arguments.length === 0 || !time) {
                return null
            }
            const format = pattern || "{y}-{m}-{d} {h}:{i}:{s}"
            let date
            if (typeof time === "object") {
                date = time
            } else {
                if (typeof time === "string" && /^[0-9]+$/.test(time)) {
                    time = parseInt(time)
                }
                if (typeof time === "number" && time.toString().length === 10) {
                    time = time * 1000
                }
                date = new Date(time)
            }
            const formatObj = {
                y: date.getFullYear(),
                m: date.getMonth() + 1,
                d: date.getDate(),
                h: date.getHours(),
                i: date.getMinutes(),
                s: date.getSeconds(),
                a: date.getDay(),
            }
            const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
                let value = formatObj[key]
                // Note: getDay() returns 0 on Sunday
                if (key === "a") {
                    return ["日", "一", "二", "三", "四", "五", "六"][value]
                }
                if (result.length > 0 && value < 10) {
                    value = "0" + value
                }
                return value || 0
            })
            return time_str
        },
        // 格式化施工状态文本
        formatStatus(status) {
            if (status === "1") {
                return "已施工"
            }
            return "未施工"
        },
        // 状态标签颜色
        statusTagFilter(status) {
            if (status === "1") {
                return "success"
            }
            return "info"
        },
    },
}
</script>

<style lang="scss" scoped>
.app-container {
    background-color: #f0f2f5; // 浅灰背景
    min-height: 100vh;
}

.box-card {
    margin-bottom: 20px;
}

.mb8 {
    margin-bottom: 8px;
}

.text-danger {
    color: #ff4d4f;
    &:hover {
        color: #ff7875;
    }
}

.pagination-container {
    margin-top: 20px;
    text-align: right;
}

/* 调整表格头部样式 */
::v-deep .el-table th {
    background-color: #f8f8f9;
    color: #515a6e;
    font-weight: 600;
}
</style>

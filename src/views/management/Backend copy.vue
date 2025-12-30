<template>
    <div class="backend-container">
        <div class="backend-header">
            <div class="header-left">
                <i class="el-icon-office-building logo-icon"></i>
                <span class="system-title">桩基可视化施工管理系统</span>
            </div>
            <div class="header-right">
                <div class="action-btn" @click="goHome">
                    <i class="el-icon-monitor"></i>
                    <span>打开数据看板</span>
                </div>
            </div>
        </div>

        <div class="backend-body">
            <div class="sidebar-container">
                <el-menu
                    :default-active="$route.path"
                    class="el-menu-vertical"
                    background-color="#ffffff"
                    text-color="#606266"
                    active-text-color="#409EFF"
                    :router="true"
                >
                    <el-menu-item index="/backend/project-info">
                        <i class="el-icon-document-copy"></i>
                        <span slot="title">项目基础信息</span>
                    </el-menu-item>

                    <el-menu-item index="/backend/construction-map">
                        <i class="el-icon-picture-outline"></i>
                        <span slot="title">施工图管理</span>
                    </el-menu-item>

                    <el-menu-item index="/backend/partition">
                        <i class="el-icon-menu"></i>
                        <span slot="title">施工分区管理</span>
                    </el-menu-item>

                    <el-menu-item index="/backend/pile-design">
                        <i class="el-icon-location-information"></i>
                        <span slot="title">桩基设计信息</span>
                    </el-menu-item>

                    <el-menu-item index="/backend/construction-record">
                        <i class="el-icon-document"></i>
                        <span slot="title">桩基施工记录</span>
                    </el-menu-item>

                    <el-menu-item index="/backend/admin">
                        <i class="el-icon-setting"></i>
                        <span slot="title">超级用户后台</span>
                    </el-menu-item>
                </el-menu>
            </div>

            <div class="main-content">
                <div class="content-wrapper">
                    <router-view key="key" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "BackendLayout",
    computed: {
        // 确保路由切换时组件刷新（可选）
        key() {
            return this.$route.path
        },
    },
    methods: {
        goHome() {
            // 点击右上角返回可视化大屏 Home 页面
            this.$router.push("/home")
        },
    },
}
</script>

<style lang="scss" scoped>
/* 容器占满全屏，防止出现外层滚动条 */
.backend-container {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

/* 顶部 Header 样式 */
.backend-header {
    height: 60px;
    background-color: #2b3648; /* 截图中的深色背景 */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    flex-shrink: 0; /* 防止头部被压缩 */

    .header-left {
        display: flex;
        align-items: center;
        color: #fff;

        .logo-icon {
            font-size: 24px;
            margin-right: 10px;
            color: #ffd04b; /* 图标点缀色 */
        }

        .system-title {
            font-size: 18px;
            font-weight: bold;
            letter-spacing: 1px;
        }
    }

    .header-right {
        .action-btn {
            color: #fff;
            cursor: pointer;
            font-size: 14px;
            display: flex;
            align-items: center;
            opacity: 0.8;
            transition: opacity 0.3s;

            &:hover {
                opacity: 1;
            }

            i {
                margin-right: 5px;
                font-size: 16px;
            }
        }
    }
}

/* 下方主体 Flex 布局 */
.backend-body {
    display: flex;
    background-color: #f0f2f5; /* 整体浅灰背景 */
}

/* 左侧侧边栏 */
.sidebar-container {
    width: 220px;
    background-color: #fff;
    border-right: 1px solid #e6e6e6;
    flex-shrink: 0;

    /* 去除 Element Menu 默认的右边框 */
    .el-menu {
        border-right: none;
    }

    /* 调整菜单项样式以匹配截图 */
    ::v-deep .el-menu-item {
        font-size: 14px;

        i {
            color: #909399;
            margin-right: 10px;
        }

        &.is-active {
            background-color: #e6f7ff !important; /* 选中时的浅蓝背景 */
            border-right: 3px solid #1890ff; /* 选中时的右侧蓝条 */

            i {
                color: #409eff;
            }
        }
    }
}

/* 右侧内容区 */
.main-content {
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto; /* 让内容区垂直滚动 */

    .content-wrapper {
        background-color: #fff;
        min-height: 100%;
        border-radius: 4px;
        padding: 20px;
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    }
}
</style>

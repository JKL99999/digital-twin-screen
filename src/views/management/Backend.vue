<template>
    <div class="backend-container">
        <header class="backend-header">
            <div class="logo">桩基可视化施工管理系统</div>
            <div class="header-right" @click="goHome">打开数据看板</div>
        </header>

        <div class="backend-content">
            <aside class="sidebar-nav">
                <div class="menu-item" @click="goProjectInfo">项目基础信息</div>
                <div class="menu-item active" @click="goPileledger">桩基施工记录</div>
            </aside>

            <main class="main-content">
                <div class="card-area">
                    <router-view />
                </div>
            </main>
        </div>
    </div>
</template>

<script>
export default {
    name: "backend",
    components: {},
    data() {
        return {}
    },
    methods: {
        goHome() {
            this.$router.push("/home")
        },
        goProjectInfo() {
            this.$router.push("/backend/projectInfo")
        },
        goPileledger() {
            this.$router.push("/backend/pileledger")
        },
    },
}
</script>

<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.backend-container {
    width: 100vw;
    height: 100vh; // 必须设置高度为视口高度
    display: flex;
    flex-direction: column; // 让 header 和 content 上下排列

    .backend-header {
        height: 50px;
        background-color: #2c3e50; // 图片中的深蓝色
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        flex-shrink: 0; // 防止头部被压缩
    }

    .backend-content {
        flex: 1; // 自动填满剩下所有的竖向空间
        display: flex; // 内部左右排列
        overflow: hidden; // 防止溢出

        .sidebar-nav {
            width: 220px;
            background-color: #ffffff;
            border-right: 1px solid #e8e8e8;

            .menu-item {
                padding: 15px 20px;
                font-size: 14px;
                &.active {
                    color: #1890ff;
                    background-color: #e6f7ff;
                    border-right: 3px solid #1890ff;
                }
            }
        }

        .main-content {
            flex: 1;
            background-color: #f0f2f5; // 浅灰色背景
            padding: 20px;
            overflow-y: auto; // 内容多了可以滚动

            .card-area {
                background: #fff;
                min-height: 100%;
                border-radius: 4px;
                padding: 20px;
            }
        }
    }
}
</style>

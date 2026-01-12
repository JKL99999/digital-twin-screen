<template>
    <div class="backend-container">
        <header class="backend-header">
            <div class="logo">
                <svg viewBox="0 0 1024 1024" width="24" height="24" style="margin-right: 10px; fill: currentColor">
                    <path
                        d="M128 128h320v320H128V128z m448 0h320v320H576V128zM128 576h320v320H128V576z m448 0h320v320H576V576z"
                    ></path>
                </svg>
                桩基可视化施工管理系统
            </div>
            <div class="header-right" @click="goHome">
                <svg viewBox="0 0 1024 1024" width="18" height="18" style="margin-right: 6px; fill: currentColor">
                    <path
                        d="M896 128H128c-35.3 0-64 28.7-64 64v448c0 35.3 28.7 64 64 64h320v96H352c-17.7 0-32 14.3-32 32s14.3 32 32 32h320c17.7 0 32-14.3 32-32s-14.3-32-32-32H576v-96h320c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64z m0 512H128V192h768v448z"
                    ></path>
                </svg>
                打开数据看板
            </div>
        </header>

        <div class="backend-content">
            <aside class="sidebar-nav">
                <div
                    class="menu-item"
                    :class="{ active: activeMenu === 'projectInfo' }"
                    @click="handleMenuClick('projectInfo', '/backend/projectInfo')"
                >
                    项目基础信息
                </div>
                <div
                    class="menu-item"
                    :class="{ active: activeMenu === 'pileledger' }"
                    @click="handleMenuClick('pileledger', '/backend/pileledger')"
                >
                    桩基施工记录
                </div>
                <div
                    class="menu-item"
                    :class="{ active: activeMenu === 'selfCheck' }"
                    @click="handleMenuClick('selfCheck', '/backend/projectInfo')"
                >
                    桩基自检信息
                </div>
                <div
                    class="menu-item"
                    :class="{ active: activeMenu === 'thirdCheck' }"
                    @click="handleMenuClick('thirdCheck', '/backend/projectInfo')"
                >
                    桩基三检信息
                </div>
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
        return {
            activeMenu: "pileledger",
        }
    },
    methods: {
        goHome() {
            this.$router.push("/home")
        },
        handleMenuClick(key, path) {
            this.activeMenu = key
            if (path && this.$route.path !== path) {
                this.$router.push(path)
            }
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

        .logo {
            display: flex;
            align-items: center;
            font-weight: bold;
            font-size: 18px;
        }

        .header-right {
            display: flex;
            align-items: center;
            cursor: pointer;
            font-size: 14px;
        }
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

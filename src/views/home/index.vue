<template>
    <div class="dashboard-container">
        <!-- Header -->
        <div class="header">
            <div class="header-decoration-left" />
            <div class="header-content">
                <div class="header-left">
                    <img src="@/assets/img/clock.png" alt="" />
                    <span class="time"> {{ currentTime }}</span>
                    <span class="weather"> 晴天 6℃</span>
                </div>
                <div class="header-center">
                    <h1 class="title">浦东机场T3航站区港湾机坪</h1>
                    <div class="title-glow" />
                </div>
                <div class="header-right">
                    <span class="update-time">数据更新于: {{ updateTime }}</span>
                    <div class="icon-btn" @click="goBackend">
                        <img src="@/assets/img/laptop.png" alt="" />
                    </div>
                    <div class="icon-btn" @click="goPersonal">
                        <img src="@/assets/img/people.png" alt="" />
                    </div>
                    <button class="exit-btn" @click="exitBtn">退出</button>
                </div>
            </div>
            <div class="header-decoration-right" />
        </div>

        <!-- Top Navigation -->
        <div class="top_nav">
            <div class="nav-tabs">
                <div class="tab-item" :class="{ active: activeLeftBtnIndex === 0 }" @click="setActiveLeftBtn(0)">
                    开累完成
                </div>
                <div class="tab-item" :class="{ active: activeLeftBtnIndex === 1 }" @click="setActiveLeftBtn(1)">
                    本月完成
                </div>
                <div class="tab-item" :class="{ active: activeLeftBtnIndex === 2 }" @click="setActiveLeftBtn(2)">
                    本周完成
                </div>
            </div>

            <div class="nav-buttons">
                <div class="search-bar">
                    <el-input type="text" placeholder="请输入桩基编号搜索" v-model="pileNumber" clearable />
                    <button class="search-btn" @click="searchPile">🔍</button>
                </div>

                <div class="nav-buttons__right">
                    <button class="nav-btn" :class="{ active: typeADisplay }" @click="typeABtn">
                        <img src="@/assets/img/typeA.png" alt="" /> 类型
                    </button>
                    <button class="nav-btn" :class="{ active: typeBDisplay }" @click="typeBBtn">
                        <img src="@/assets/img/typeB.png" alt="" /> 图纸
                    </button>
                    <button class="nav-btn" :class="{ active: typeCDisplay }" @click="typeCBtn">
                        <img src="@/assets/img/typeC.png" alt="" /> 分区
                    </button>
                    <button class="nav-btn active"><img src="@/assets/img/typeD.png" alt="" /> 现场验收</button>
                    <button class="nav-btn"><img src="@/assets/img/typeE.png" alt="" /> 现场试验</button>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="main_content">
            <!-- Left Panel -->
            <div class="main_content_left">
                <!-- Section 1: Progress Stats -->
                <div class="panel-box progress-section">
                    <div class="panel-header">
                        <img src="@/assets/img/statistics.png" alt="" class="header-img" />
                        <span class="header-title">施工进度统计</span>
                    </div>
                    <div class="date-range">
                        <el-date-picker
                            v-model="rangeDate"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                        >
                        </el-date-picker>
                    </div>

                    <div class="progress-container">
                        <!-- Left: Donut Chart -->
                        <div class="chart-area">
                            <div class="donut-chart">
                                <div class="percentage">97.38%</div>
                                <div class="label">总完成率</div>
                            </div>
                            <div class="chart-legend">
                                <div class="legend-item"><span class="dot done" /> 完成 2789</div>
                                <div class="legend-item"><span class="dot todo" /> 未完成 75</div>
                            </div>
                        </div>

                        <!-- Right: Bars -->
                        <div class="bars-area">
                            <div v-for="(item, index) in progressData" :key="index" class="bar-item">
                                <div class="bar-info">
                                    <span class="bar-name">{{ item.name }}</span>
                                    <span class="bar-val">{{ item.value }}</span>
                                </div>
                                <div class="progress-bg">
                                    <div class="progress-fill" :style="{ width: item.percent }" />
                                </div>
                                <div class="bar-percent">{{ item.percent }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Section 2: Zone Grid -->
                <div class="panel-box zone-section">
                    <div class="zone-grid">
                        <div v-for="(zone, index) in zoneData" :key="index" class="zone-card">
                            <div class="zone-header">
                                <span class="zone-icon">🏗️</span>
                                <span class="zone-title">{{ zone.title }}</span>
                            </div>
                            <div class="zone-progress">
                                <div class="progress-bg">
                                    <div class="progress-fill" :style="{ width: zone.percent }" />
                                </div>
                            </div>
                            <div class="zone-stats">
                                <span class="percent-text">{{ zone.percent }}</span>
                                <span class="fraction">{{ zone.current }}/{{ zone.total }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Section 3: Quantity Stats -->
                <div class="panel-box quantity-section">
                    <div class="panel-header-sm">
                        <span>🔵 工程量统计</span>
                        <span class="header-right-text">总数量: 4,000根 总体积: 20,000m³</span>
                    </div>
                    <div class="quantity-table">
                        <div class="q-row header-row">
                            <span class="col-1">三标 标段</span>
                            <span class="col-2">总计: 1,000根/5,000m³</span>
                        </div>
                        <div class="q-row sub-header">
                            <span>类型</span>
                            <span>数量</span>
                            <span>体积</span>
                        </div>
                        <div class="q-row">
                            <span>0.6m桩长20m(类型1)</span>
                            <span class="highlight">500根</span>
                            <span class="highlight">2500m³</span>
                        </div>
                        <div class="q-row">
                            <span>0.6m桩长15m(类型2)</span>
                            <span class="highlight">500根</span>
                            <span class="highlight">2500m³</span>
                        </div>
                        <div class="pagination-dots"><span /><span class="active" /><span /></div>
                    </div>
                </div>
            </div>

            <!-- Right Panel (Map/Model) -->
            <div class="main_content_right">
                <!-- Grid Background -->
                <!-- <div class="grid-bg" /> -->

                <!-- <div class="floating-panel acceptance-list">
                    <div class="fp-header">验收列表</div>
                    <div class="fp-content">
                        <div class="list-item"><span class="dot-blue" /> 2025年3月20日</div>
                        <div class="list-item"><span class="dot-white" /> 2025年3月21日</div>
                    </div>
                </div> -->

                <div id="domId" class="model" />
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <div class="footer-tabs">
                <div class="footer-tab" :class="{ active: activeFooterIndex === 0 }" @click="setActiveTab(0)" />
                <div class="footer-tab" :class="{ active: activeFooterIndex === 1 }" @click="setActiveTab(1)" />
                <div class="footer-tab" :class="{ active: activeFooterIndex === 2 }" @click="setActiveTab(2)" />
                <div class="footer-tab" :class="{ active: activeFooterIndex === 3 }" @click="setActiveTab(3)" />
                <div class="footer-tab" :class="{ active: activeFooterIndex === 4 }" @click="setActiveTab(4)" />
                <div class="footer-tab" :class="{ active: activeFooterIndex === 5 }" @click="setActiveTab(5)" />
            </div>
        </div>
        <!-- 桩基详细信息弹窗 -->
        <pile-detail-dialog :visible.sync="dialogVisible" :pile-id="currentPileId" />
    </div>
</template>

<script>
import { getViewToken } from "@/service/model.js"
import { getInfoByPileNumber, getAllCompletedPiles, getFinishedThisMonth, getFinishedThisWeek } from "@/service/pile.js"
import PileDetailDialog from "@/components/Dialog/PileDetailDialog.vue"
export default {
    name: "Home",
    components: {
        PileDetailDialog,
    },
    data() {
        return {
            currentTime: "", // 新增：用于存放实时时间字符串
            clockTimer: null, // 新增：用于存放定时器ID
            progressData: [
                { name: "三标", value: "1331/1343", percent: "99%" },
                { name: "四标", value: "1458/1521", percent: "96%" },
                { name: "五标", value: "1331/1343", percent: "99%" },
                { name: "六标", value: "1458/1521", percent: "96%" },
            ],
            zoneData: [
                { title: "三标 - A区", percent: "50%", current: 500, total: 986 },
                { title: "三标 - B区", percent: "98.78%", current: 611, total: 635 },
                { title: "四标 - A区", percent: "100%", current: 357, total: 357 },
                { title: "四标 - B区", percent: "95.29%", current: 243, total: 255 },
                { title: "五标 - A区", percent: "95.72%", current: 604, total: 631 },
                { title: "五标 - B区", percent: "98.78%", current: 974, total: 986 },
            ],
            activeFooterIndex: 0,
            activeLeftBtnIndex: 0,
            typeADisplay: false,
            //图纸是否加载
            typeBDisplay: false,
            // 分区是否加载
            typeCDisplay: false,
            updateTime: "2025-12-18",

            //存放bimface实例的一些引用
            viewer3D: null,
            app: null,
            model3D: null,
            // 若未传入，将在 mounted 中设置演示 Token
            // 基础模型 Token
            baseModelViewToken: "",
            // 基础模型 ID
            baseModelId: "2008461429430026241",
            // 图纸模型 Token
            dwgModelViewToken: "",
            // 图纸模型 ID
            dwgModelId: "2008738724321488897",

            //桩基编号
            pileNumber: null,
            //映射的构件编号
            selectedElementId: null,

            //缩放到定位构件的列表
            searchComponents: [],
            isBModelAdded: false,
            isCModelAdded: false,
            //着色的构件列表
            overridedElementIds: [],

            //模型ID

            modelId: "10000776931924",
            modelId_2: "10000955511347",
            modelId_3: "10000776931926",

            //弹窗信息
            dialogVisible: false,
            currentPileId: "",

            //桩号信息

            toBeRenderElementIds: [],
            //大屏搜索时间范围
            rangeDate: null,
        }
    },
    //vue声明周期钩子函数
    created() {
        this.getBaseViewToken()
    },

    // 新增：组件挂载后启动定时器
    mounted() {
        this.startClock()
    },
    // 新增：组件销毁前清除定时器，防止内存泄漏
    beforeDestroy() {
        if (this.clockTimer) {
            clearInterval(this.clockTimer)
        }
    },
    methods: {
        //获取模型的viewToken
        async getBaseViewToken() {
            try {
                const infoBase = await getViewToken(this.baseModelId)
                this.baseModelViewToken = infoBase.data.viewToken

                const infoDwg = await getViewToken(this.dwgModelId)
                this.dwgModelViewToken = infoDwg.data.viewToken

                this.initBimface()
            } catch (error) {
                console.error("获取 viewToken 失败：", error)
            }
        },
        //根据桩号获取构件信息
        async getInfoByPileNumber(pileNumber) {
            try {
                const res = await getInfoByPileNumber(pileNumber)
                this.selectedElementId = res.data.item.elementId
                this.zoomToComponents(this.selectedElementId)
                this.toBeRenderElementIds = [this.selectedElementId]
                this.changeColor(this.toBeRenderElementIds)
            } catch {
                console.error("获取构件信息失败")
            }
        },

        // 获取开累完成的构件集合
        async getAllCompletedPiles() {
            try {
                const res = await getAllCompletedPiles()
                this.overridedElementIds = res.data.list
                this.changeColor(this.overridedElementIds)
            } catch {
                console.error("获取构件信息失败")
            }
        },

        async getFinishedThisMonth() {
            try {
                const res = await getFinishedThisMonth()
                this.overridedElementIds = res.data.list
                this.changeColor(this.overridedElementIds)
            } catch {
                console.error("获取构件信息失败")
            }
        },

        async getFinishedThisWeek() {
            try {
                const res = await getFinishedThisWeek()
                this.overridedElementIds = res.data.list
                this.changeColor(this.overridedElementIds)
            } catch {
                console.error("获取构件信息失败")
            }
        },

        // 修改构件的颜色
        changeColor(ids) {
            //首先清除所有构件的颜色到初始状态
            this.model3D.clearOverrideColorComponents()
            // 设定一个颜色和透明度
            const Color = window.Glodon.Web.Graphics.Color
            const color = new Color("#EE799F", 1.0)

            this.model3D.overrideComponentsColorById(ids, color)
            this.viewer3D.render()
        },

        // 到后台页面
        goBackend() {
            this.$router.push("/backend")
        },
        // 到个人页面
        goPersonal() {
            this.$router.push("/personal")
        },
        // 退出系统
        exitBtn() {
            this.$router.push("/login")
        },

        //桩号搜索
        searchPile() {
            this.getInfoByPileNumber(this.pileNumber)
        },
        setActiveTab(num) {
            this.activeFooterIndex = num
        },
        // 左侧按钮切换,开累完成、本月完成、本周完成
        setActiveLeftBtn(num) {
            this.activeLeftBtnIndex = num
            if (num === 0) {
                this.rangeDate = null
                this.getAllCompletedPiles()
            } else if (num === 1) {
                this.rangeDate = null
                this.getFinishedThisMonth()
            } else if (num === 2) {
                this.rangeDate = null
                this.getFinishedThisWeek()
            }
        },
        // 新增：启动时钟的方法
        startClock() {
            this.formatTime() // 立即执行一次，避免刷新时有1秒空白
            this.clockTimer = setInterval(() => {
                this.formatTime()
            }, 1000)
        },
        // 新增：格式化时间的方法
        formatTime() {
            const date = new Date()
            const year = date.getFullYear()
            // 月份从0开始，所以要+1；padStart用于补齐0
            const month = String(date.getMonth() + 1).padStart(2, "0")
            const day = String(date.getDate()).padStart(2, "0")

            const hours = String(date.getHours()).padStart(2, "0")
            const minutes = String(date.getMinutes()).padStart(2, "0")
            const seconds = String(date.getSeconds()).padStart(2, "0")

            // 处理星期
            const weekArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
            const week = weekArr[date.getDay()]

            // 拼接成：2025-11-26 星期三 09:25:38 格式
            this.currentTime = `${year}-${month}-${day} ${week} ${hours}:${minutes}:${seconds}`
        },

        //点击类型按钮时的操作
        typeABtn() {
            this.typeADisplay = !this.typeADisplay
        },
        //点击图纸按钮时的操作
        typeBBtn() {
            if (!this.typeBDisplay) {
                this.addBModel()
                this.typeBDisplay = !this.typeBDisplay
            } else {
                this.removeBModel()
                this.typeBDisplay = !this.typeBDisplay
            }
        },
        addBModel() {
            if (this.isBModelAdded) {
                return
            }
            // cc78628cd1fb4aa1a5dc3130e671b2a7 58713f304f5a4812a81019405421ba41 e752d8642acb456783d188e248573997
            this.viewer3D.loadModel({
                // 待加载模型的浏览凭证
                viewToken: this.dwgModelViewToken || "084e6c20777e438a912b8607ea340256",
                // 自定义模型ID，默认为文件ID
                modelId: this.modelId_2,
            })
        },
        removeBModel() {
            if (!this.isBModelAdded) {
                return
            }
            this.viewer3D.removeModel(this.modelId_2)
            this.isBModelAdded = false
            this.viewer3D.render()
        },

        //点击分区按钮时的操作
        typeCBtn() {
            if (!this.typeCDisplay) {
                this.addCModel()
                this.typeCDisplay = !this.typeCDisplay
            } else {
                this.removeCModel()
                this.typeCDisplay = !this.typeCDisplay
            }
        },
        addCModel() {
            if (this.isCModelAdded) {
                return
            }
            this.viewer3D.loadModel({
                // 待加载模型的浏览凭证
                viewToken: "0c110455343242ebae2dc3c2b3389a13",
                // 自定义模型ID，默认为文件ID
                modelId: this.modelId_3,
            })
        },
        removeCModel() {
            if (!this.isCModelAdded) {
                return
            }
            this.viewer3D.removeModel(this.modelId_3)
            this.isCModelAdded = false
            this.viewer3D.render()
        },

        //加载BImface的方法
        // 初始化并加载场景（整合 demo999 的回调）
        initBimface() {
            try {
                // await this.loadBimfaceSdk()
                // 若未传入 viewToken，使用示例 Token（仅演示）
                console.log(this.baseModelViewToken, "查看信息3")
                const loaderConfig = new window.BimfaceSDKLoaderConfig()
                loaderConfig.viewToken = this.baseModelViewToken
                window.BimfaceSDKLoader.load(loaderConfig, this.successCallback, this.failureCallback)
            } catch (e) {
                // eslint-disable-next-line no-console
                console.error("Bimface SDK 加载失败", e)
            }
        },

        onAdded() {
            this.model3D = this.viewer3D.getModel()
            this.viewer3D.render()
        },

        getData(data) {
            //获取构件属性
            console.log(data, "我被点击了")
            if (data.objectType === "Component") {
                this.dialogVisible = true
                this.currentPileId = data.elementId
                // alert(data.elementId)
                // alert(JSON.stringify(data))
            }
        },

        changeBackground() {
            document.querySelector(".bf-view").style.background =
                "url('https://mccsbc.obs.cn-east-3.myhuaweicloud.com/project/37/png/bg01-1764923528132.png')"
            document.querySelector(".bf-view").style.backgroundSize = "cover"
            window.onresize = function () {
                this.viewer3D.resize(document.documentElement.clientWidth, document.documentElement.clientHeight)
            }
            //改变背景
            /* eslint-disable */
            this.viewer3D.render()
            //启用俯视图
        },

        initDisplayStyle() {
            /* eslint-disable */
            //启用俯视图
            this.viewer3D.setView(Glodon.Bimface.Viewer.ViewOption.Top)
            //启用正交视图
            this.viewer3D.setCameraType("OrthographicCamera")
            //禁用场景旋转
            this.viewer3D.enableOrbit(false)
            // 渲染3D模型
            this.viewer3D.render();
        },
        //设置模型主视图
        // todo
        setMainView() {
            let homeview = this.viewer3D.getCameraStatus()
            this.viewer3D.getCamera().setHomeView({ status: homeview })
            // window.alert(JSON.stringify(homeview))
        },
        // 成功回调：创建 WebApplication3D 并渲染
        successCallback(viewMetaData) {
            console.log(viewMetaData, "查看信息1")
            const dom = document.getElementById("domId")
            const webAppConfig = new window.Glodon.Bimface.Application.WebApplication3DConfig()
            webAppConfig.domElement = dom
            webAppConfig.enableViewHouse = false
            webAppConfig.globalUnit = window.Glodon.Bimface.Common.Units.LengthUnits.Millimeter
            this.app = new window.Glodon.Bimface.Application.WebApplication3D(webAppConfig)
            this.app.addView(this.baseModelViewToken)
            this.viewer3D = this.app.getViewer()
            // this.viewer3D.addEventListener(window.Glodon.Bimface.Viewer.Viewer3DEvent.ViewAdded, this.onAdded)
            // // 初始化页面展示效果
            // this.viewer3D.addEventListener(window.Glodon.Bimface.Viewer.Viewer3DEvent.ViewAdded, this.changeBackground)
            // this.viewer3D.addEventListener(window.Glodon.Bimface.Viewer.Viewer3DEvent.ViewAdded, this.initDisplayStyle)
            this.viewer3D.addEventListener(window.Glodon.Bimface.Viewer.Viewer3DEvent.ViewAdded, () => {
                // 1. 基础设置（背景等）
                this.onAdded();
                this.changeBackground();

                // 2. 【插入你需要的逻辑】定义渲染完成后的回调
                const onRenderComplete = () => {
                    // A. 马上移除监听，防止后续操作重复触发
                    this.viewer3D.removeEventListener(window.Glodon.Bimface.Viewer.Viewer3DEvent.Rendered, onRenderComplete);
                    
                    // B. 此时俯视图肯定渲染好了，执行保存
                   setTimeout(() => {
                        console.log("延时结束，自动保存为默认 Home 视图...");
                        this.setMainView();
                    }, 1500);
                };

                // 3. 【关键】先挂载监听器 (必须在调用 initDisplayStyle 之前！)
                // 这样才能捕获到 initDisplayStyle 引起的画面变化
                this.viewer3D.addEventListener(window.Glodon.Bimface.Viewer.Viewer3DEvent.Rendered, onRenderComplete);

                // 4. 执行视图切换 (切换到俯视图、正交模式)
                // 这行代码执行后，引擎会开始渲染，随即触发上面的 onRenderComplete
                this.initDisplayStyle();
                
                });
            //添加图纸模型事件回调
            this.viewer3D.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.ModelAdded, ()=> {
                    if (this.isBModelAdded) {
                        return
                    }
                    //从viewer3D对象中获取模型对象model3D
                    let model3D = this.viewer3D.getModel(this.modelId_2);
                    if(model3D){
                    // 平移模型
                    model3D.setModelTranslation({ x: 0, y: 0, z: 150000 });
                    model3D.setModelScale({ x: 0, y: 0, z: 0 }, 0.0394);
                    this.isBModelAdded = true
                    }
                    
                });
            //添加分区模型事件回调
            this.viewer3D.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.ModelAdded, ()=> {
                    if (this.isCModelAdded) {
                        return
                    }
                    //从viewer3D对象中获取模型对象model3D
                    let model3D = this.viewer3D.getModel(this.modelId_3);
                    if(model3D){
                    // 平移模型
                    model3D.setModelTranslation({ x: 160000, y: 0, z: 0 });
                    this.isCModelAdded = true
                    }
                });
            // 添加鼠标点击事件
            this.viewer3D.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.MouseClicked, 
                this.getData
            )
            console.log(this.viewer3D, "查看信息2")
        },
        // 失败回调
        failureCallback(error) {
            // eslint-disable-next-line no-console
            console.log(error)
        },

        //操作模型的方法
         zoomToComponents(pileNumber) {
            this.searchComponents = []
            this.searchComponents.push(pileNumber)
            this.viewer3D.getModel().clearSelectedComponents()
            this.viewer3D.getModel().setSelectedComponentsById(this.searchComponents)
            this.viewer3D.getModel().zoomToSelectedComponents()
            this.$message({
                message: "已缩放到构件",
                type: "success",
            })
        },
    },
}
</script>

<style lang="scss" scoped>
/* Reset & Fonts */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

/* Colors Variables (Simulated SCSS variables) */
$bg-dark: #051020;
$panel-bg: rgba(13, 39, 66, 0.6);
$border-blue: #2b769a;
$text-primary: #ffffff;
$text-secondary: #00deff;
$accent-blue: #0096ff;
$font-family: "Microsoft YaHei", sans-serif;

.dashboard-container {
    width: 100vw;
    height: 100vh;
    // background: radial-gradient(91% 91% at 89% 132%, rgba(23, 159, 222, 0.2) 0%, rgba(23, 159, 222, 0) 100%),
    //     radial-gradient(51% 51% at 28% 96%, rgba(23, 159, 222, 0.2) 0%, rgba(23, 159, 222, 0) 100%), #0e1a2a;
    background-image: url("~@/assets/img/background.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: $text-primary;
    font-family: $font-family;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.header {
    height: 110px;
    width: 100%;
    background: url("~@/assets/img/headerBg.png") no-repeat center center;
    background-size: 100% 100%; 
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;

    .header-content {
        display: flex;
        width: 100%;
        padding: 0 20px;
        z-index: 2;

        .header-left {
            flex: 1; /* 占据左侧 */
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .header-right {
            flex: 1; /* 占据右侧 */
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 20px;
        }
    }

    .header-center {
        position: absolute;
        left: 50%;
        top: 45%; /* 根据你底图的视觉中心微调，比如 20px 或 50% */
        transform: translate(-50%, -50%);
        text-align: center;
        white-space: nowrap;
        pointer-events: none;
        z-index: 1; /* 标题在底层背景之上，但在交互按钮之下 */

        .title {
            font-size: 32px;
            font-weight: 800;
            /* 渐变样式保持不变 */
            background: linear-gradient(90deg, #ffffff 0%, #c0ebff 35%, #ffffff 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }
    }
    .icon-btn {
        background: transparent;
        border: none;
        cursor: pointer;
    }

    .exit-btn {
        background: transparent;
        border: 1px solid #a0cfff;
        color: #a0cfff;
        padding: 4px 12px;
        border-radius: 4px;
        cursor: pointer;
        &:hover {
            background: rgba(255, 255, 255, 0.1);
        }
    }
}

/* --- Top Nav --- */
.top_nav {
    height: 50px;
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 0 20px;
    margin-top: 10px;

    .nav-tabs {
        display: flex;
        gap: 0px; /* Overlap slightly */

        .tab-item {
            width: 180px;
            height: 44px;
            background-image: url("~@/assets/img/btn_normal.png");
            cursor: pointer;
            color: #8ab;
            line-height: 44px;
            text-align: center;
            font-size: 14px;
            font-weight: bold;
            &.active {
                background-image: url("~@/assets/img/btn_active.png");
                color: #fff;
                z-index: 2;
            }
        }
    }
    .nav-buttons {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex: 1;
        margin-left: 7px;

        .search-bar {
            display: flex;
            align-items: center;
            border: 1px solid $border-blue;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 4px;
            overflow: hidden;

            ::v-deep .el-input__inner {
                background: transparent;
                border: none;
                color: #fff;
                padding: 8px;
                height: auto;
                line-height: normal;
                outline: none;
            }
            ::v-deep .el-input {
                width: 248px;
            }
            button {
                background: $border-blue;
                border: none;
                color: #fff;
                padding: 9px 12px;
                cursor: pointer;
            }
        }

        .nav-buttons__right {
            display: flex;
            gap: 10px;
            flex-wrap: nowrap; /* 强制按钮组在一行显示，不换行 */

            .nav-btn {
                background: rgba(13, 39, 66, 0.6);
                border: 1px solid $border-blue;
                color: #a0cfff;
                padding: 6px 15px;
                border-radius: 4px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 6px;
                /* --- 核心修改部分 --- */
                white-space: nowrap;  /* 强制文字不换行 */
                flex-shrink: 0;       /* 防止按钮被 flex 容器挤压变形 */
                /* -------------------- */

                &.active{
                    background: rgba(0, 150, 255, 0.3);
                    border-color: $text-secondary;
                    color: #fff;
                }
            }
        }
    }
}

/* --- Main Content --- */
.main_content {
    flex-grow: 1;
    display: flex;
    gap: 16px;
    padding: 16px 20px;
    overflow: hidden;

    /* Left Panel */
    .main_content_left {
        margin-top: 20px;
        width: 530px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        flex-shrink: 0;

        .panel-box {
            background: $panel-bg;
            border: 1px solid $border-blue;
            border-radius: 6px;
            padding: 12px;
            position: relative;

            &::before {
                /* Corner accent */
                content: "";
                position: absolute;
                top: -1px;
                left: -1px;
                width: 10px;
                height: 10px;
                border-top: 2px solid $text-secondary;
                border-left: 2px solid $text-secondary;
            }

            .panel-header {
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
        }

        /* Progress Section */
        .progress-section {
            .date-range {
                margin: 15px auto 10px;
                width: 304px;
                height: 32px;
                background: rgba(245, 252, 255, 0.1);
                border-radius: 4px;
                border: 1px solid rgba(192, 235, 255, 0.4);
                display: flex;
                align-items: center;

                ::v-deep .el-date-editor {
                    width: 100%;
                    height: 100%;
                    background: transparent;
                    border: none;
                    padding: 0 10px;

                    .el-range-input {
                        background: transparent;
                        color: #fff;
                    }
                    .el-range-separator {
                        color: #fff;
                        line-height: 30px;
                    }
                    .el-input__icon {
                        line-height: 30px;
                    }
                }
            }

            .progress-container {
                display: flex;
                align-items: center;

                .chart-area {
                    width: 40%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    .donut-chart {
                        width: 100px;
                        height: 100px;
                        border-radius: 50%;
                        background: conic-gradient($accent-blue 0% 97%, #333 97% 100%);
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        margin-bottom: 10px;
                        box-shadow: 0 0 15px rgba(0, 150, 255, 0.3);

                        &::after {
                            content: "";
                            position: absolute;
                            width: 80px;
                            height: 80px;
                            background: $bg-dark;
                            border-radius: 50%;
                        }

                        .percentage,
                        .label {
                            z-index: 1;
                            position: relative;
                        }
                        .percentage {
                            font-size: 20px;
                            font-weight: bold;
                            color: #fff;
                        }
                        .label {
                            font-size: 10px;
                            color: #8ab;
                        }
                    }

                    .chart-legend {
                        font-size: 12px;
                        .legend-item {
                            display: flex;
                            align-items: center;
                            gap: 5px;
                            margin-bottom: 2px;
                        }
                        .dot {
                            width: 8px;
                            height: 8px;
                            border-radius: 2px;
                        }
                        .done {
                            background: $accent-blue;
                        }
                        .todo {
                            background: #555;
                        }
                    }
                }

                .bars-area {
                    width: 60%;
                    padding-left: 10px;

                    .bar-item {
                        margin-bottom: 8px;
                        font-size: 12px;

                        .bar-info {
                            display: flex;
                            justify-content: space-between;
                            color: #a0cfff;
                            margin-bottom: 2px;
                        }
                        .progress-bg {
                            height: 6px;
                            background: rgba(255, 255, 255, 0.1);
                            border-radius: 3px;
                            overflow: hidden;
                            position: relative;
                        }
                        .progress-fill {
                            height: 100%;
                            background: linear-gradient(90deg, #0096ff, #00deff);
                        }
                    }
                }
            }
        }

        /* Zone Section */
        .zone-section {
            flex-grow: 1;
            overflow-y: auto;

            &::-webkit-scrollbar {
                width: 4px;
            }
            &::-webkit-scrollbar-thumb {
                border-radius: 4px;
                background: #02a3eeea;
            }
            &::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.05);
            }

            .zone-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;

                .zone-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(43, 118, 154, 0.3);
                    padding: 8px;
                    border-radius: 4px;

                    .zone-header {
                        display: flex;
                        align-items: center;
                        gap: 5px;
                        font-size: 13px;
                        color: #fff;
                        margin-bottom: 5px;
                    }
                    .progress-bg {
                        height: 4px;
                        background: #333;
                        margin-bottom: 5px;
                        .progress-fill {
                            height: 100%;
                            background: $text-secondary;
                        }
                    }
                    .zone-stats {
                        display: flex;
                        justify-content: space-between;
                        font-size: 12px;
                        color: #8ab;
                        .percent-text {
                            color: $text-secondary;
                        }
                    }
                }
            }
        }

        /* Quantity Section */
        .quantity-section {
            .panel-header-sm {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 8px;
                color: #fff;
                .header-right-text {
                    font-size: 10px;
                    color: #8ab;
                    font-weight: normal;
                }
            }
            .quantity-table {
                font-size: 12px;
                .q-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 6px 0;
                    border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
                    &:last-child {
                        border-bottom: none;
                    }
                }
                .header-row {
                    color: $text-secondary;
                    border-bottom: 1px solid $border-blue;
                    margin-bottom: 5px;
                }
                .sub-header {
                    color: #8ab;
                }
                .highlight {
                    color: $text-secondary;
                }

                .pagination-dots {
                    display: flex;
                    justify-content: center;
                    gap: 5px;
                    margin-top: 5px;
                    span {
                        width: 6px;
                        height: 6px;
                        background: #555;
                        border-radius: 50%;
                        &.active {
                            background: #fff;
                        }
                    }
                }
            }
        }
    }

    /* Right Panel */
    .main_content_right {
        flex-grow: 1;
        position: relative;
        border: 1px solid $border-blue;
        border-radius: 6px;
        // background: radial-gradient(circle at center, rgba(13, 39, 66, 0.3) 0%, rgba(5, 16, 32, 0.8) 100%);
        box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5);

        // .grid-bg {
        //     position: absolute;
        //     top: 0;
        //     left: 0;
        //     width: 100%;
        //     height: 100%;
        //     background-image: linear-gradient(rgba(43, 118, 154, 0.1) 1px, transparent 1px),
        //         linear-gradient(90deg, rgba(43, 118, 154, 0.1) 1px, transparent 1px);
        //     background-size: 40px 40px;
        //     z-index: -1;
        // }

        /* Floating Acceptance List */
        // .acceptance-list {
        //     position: absolute;
        //     top: 20px;
        //     right: 20px;
        //     width: 200px;
        //     background: rgba(13, 39, 66, 0.9);
        //     border: 1px solid $border-blue;
        //     border-radius: 4px;
        //     z-index: 2;

        //     .fp-header {
        //         background: $accent-blue;
        //         color: #fff;
        //         padding: 8px;
        //         font-size: 14px;
        //         text-align: center;
        //     }
        //     .fp-content {
        //         padding: 10px;
        //         .list-item {
        //             display: flex;
        //             align-items: center;
        //             gap: 10px;
        //             font-size: 12px;
        //             margin-bottom: 8px;
        //             color: #fff;
        //             .dot-blue {
        //                 width: 8px;
        //                 height: 8px;
        //                 border-radius: 50%;
        //                 background: $text-secondary;
        //             }
        //             .dot-white {
        //                 width: 8px;
        //                 height: 8px;
        //                 border-radius: 50%;
        //                 background: #fff;
        //             }
        //         }
        //     }
        // }

        /* Floating Toolbar */
        // .floating-toolbar {
        //     position: absolute;
        //     bottom: 20px;
        //     left: 50%;
        //     transform: translateX(-50%);
        //     background: rgba(13, 39, 66, 0.9);
        //     border: 1px solid $border-blue;
        //     border-radius: 8px;
        //     padding: 8px 15px;
        //     display: flex;
        //     gap: 15px;
        //     align-items: center;
        //     z-index: 2;
        // }

        .model {
            width: 100%;
            height: 100%;
        }

        //进度条样式
        ::v-deep .bf-loading .bf-loading-gif{
            background-image: url("https://mccsbc.obs.cn-east-3.myhuaweicloud.com/image/user/bim/logo.gif") !important;
        }

        //构建详情
        ::v-deep .gld-bf-tree:before {
            content: "\e601";
        }

        //底部菜单栏

        // ::v-deep .gld-bf-firstperson,
        //关掉一些按钮gld-bf-home

        ::v-deep .bf-toolbar-bottom {
            // display: none;
            background: rgba(28, 67, 72, 0.9);
        }
        // ::v-deep .gld-bf-home {
        //     display: none;
        // }
        //漫游
        ::v-deep .gld-bf-firstperson {
            display: none;
        }
        // 地图
         ::v-deep .gld-bf-map {
            display: none;
        }
        // 最大化
        ::v-deep .gld-bf-maximize {
            display: none;
        }
        // 设置
        ::v-deep .gld-bf-settings {
            display: none;
        }
        ::v-deep .bf-toolbar,
        ::v-deep .bf-toolbar-button .bf-sub-toolbar {
            background: rgba(28, 67, 72, 0.9);
            box-shadow: inset 0px 0px 20px 0px rgba(23, 189, 211, 0.5);
            border-radius: 2px 2px 2px 2px;
            opacity: 1;
            border: 1px solid;
            border-image: linear-gradient(135deg, rgba(3, 119, 135, 0.4), rgba(23, 189, 211, 0.3), rgba(58, 226, 249, 0.2)) 1 1;
        }
        ::v-deep .gld-bf-section-plane-pick,
        ::v-deep .gld-bf-section-axial,
        ::v-deep .gld-bf-sectionbox1 {
            display: inline-block !important;
        }
        ::v-deep .bf-button {
            color: rgba(197, 240, 245, 1) !important;
            font-family: "font_family" !important;
            font-size: 32px;
            font-style: normal;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        ::v-deep .gld-bf-home:before {
            content: "\e601";
        }
        ::v-deep .gld-bf-zoomrect:before {
            content: "\e608";
        }
        // 测量
        ::v-deep .gld-bf-measure:before {
            content: "\e604";
        }
        ::v-deep .gld-bf-sectionboxZjw:before {
            content: "\e606";
        }
        // 剖切
        ::v-deep .gld-bf-sectionbox {
            display: none;
        }
        ::v-deep .gld-bf-map:before {
            content: "\e609";
        }
        ::v-deep .gld-bf-section-plane-pick:before {
            content: "\e607";
        }
        ::v-deep .gld-bf-section-axial:before {
            content: "\e60a";
        }
        ::v-deep .gld-bf-sectionbox1:before {
            content: "\e60b";
        }
        // 构件详情
        ::v-deep .gld-bf-properties:before {
            content: "\e602";
        }
        // 基本信息
        ::v-deep .gld-bf-information:before {
            content: "\e600";
        }
        // 全屏幕
        ::v-deep .gld-bf-maximize:before,
        ::v-deep .gld-bf-minimize:before {
            content: "\e603";
        }
        ::v-deep .gld-bf-route:before {
            content: "\e60e";
        }
        ::v-deep .gld-bf-third-person-lg:before {
            content: "\e60f";
        }
        ::v-deep .bf-modelTree-panel:before {
            display: block;
        }
        ::v-deep .bf-info-power {
            display: none;
        }
        ::v-deep .bf-button.bf-checked {
            background: transparent;
            border-color: #17bdd3;
        }
        ::v-deep .bf-info-list-more li {
            color: #c5f0f5 !important;
        }
        ::v-deep .gld-bf-firstperson:before {
            content: "\e60c";
        }
        .rightFilter ::v-deep .el-dialog__title {
            font-size: 14px;
            font-family: Roboto-Bold, Roboto;
            font-weight: bold;
            line-height: 16px;
            text-shadow: 0px 3px 4px rgba(9, 29, 32, 0.4);
            background: linear-gradient(180deg, #c5f0f5 0%, #3ae2f9 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        ::v-deep .bf-loading-progress {
            color: white;
        }
        ::v-deep .bf-map-big-panel {
            width: 630px !important;
        }
        ::v-deep .bf-walk-exit {
            background: transparent !important;
        }
        ::v-deep .bf-map-isolate,
        ::v-deep .bf-map-section {
            color: #c5f0f5;
            background: rgba(3, 119, 135, 0.2) !important;
            cursor: pointer;
        }
        ::v-deep .bf-menu .bf-menu-item {
            color: #c5f0f5 !important;
        }

        ::v-deep .el-image-viewer__canvas {
            width: 80%;
            height: 70%;
            margin: 50px auto;
        }
        
        

    }
}

/* --- Footer --- */
.footer {
    /* 设定基准字体大小：1920px 宽时 1em = 100px，实现基于屏幕宽度的自适应 */
    font-size: calc(100vw / 19.2);
    height: 1em;
    background-image: url("~@/assets/img/footerBg.png");
    background-position: center bottom;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 0;

    @media  screen and (max-width: 1800px){
        display: none;
    }

    .footer-tabs {
        display: flex;
        align-items: flex-end;
        gap: 10px;

        .footer-tab {
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100% 100%;
        }

        /* 为每个 tab 单独设置图片 */
        .footer-tab:nth-child(1) {
            //基础样式
            width: 2.19em;
            height: 0.75em;
            cursor: pointer;
            /* 设置默认状态的背景图片 */
            background-image: url("~@/assets/img/footer_btn01.png");

            /* 当它被激活或鼠标悬停时，切换背景图片 */
            &.active,
            &:hover {
                background-image: url("~@/assets/img/footer_btn01_active.png"); /* 新的图片地址 */
            }
        }
        .footer-tab:nth-child(2) {
            //基础样2
            width: 2.19em;
            height: 0.82em;
            cursor: pointer;
            /* 设置默认状态的背景图片 */
            background-image: url("~@/assets/img/footer_btn02.png");

            /* 当它被激活或鼠标悬停时，切换背景图片 */
            &.active,
            &:hover {
                background-image: url("~@/assets/img/footer_btn02_active.png"); /* 新的图片地址 */
            }
        }
        .footer-tab:nth-child(3) {
            //基础样式
            width: 2.19em;
            height: 0.89em;
            cursor: pointer;
            /* 设置默认状态的背景图片 */
            background-image: url("~@/assets/img/footer_btn03.png");

            /* 当它被激活或鼠标悬停时，切换背景图片 */
            &.active,
            &:hover {
                background-image: url("~@/assets/img/footer_btn03_active.png"); /* 新的图片地址 */
            }
        }
        .footer-tab:nth-child(4) {
            //基础样式
            width: 2.19em;
            height: 0.89em;
            cursor: pointer;
            /* 设置默认状态的背景图片 */
            background-image: url("~@/assets/img/footer_btn04.png");

            /* 当它被激活或鼠标悬停时，切换背景图片 */
            &.active,
            &:hover {
                background-image: url("~@/assets/img/footer_btn04_active.png"); /* 新的图片地址 */
            }
        }
        .footer-tab:nth-child(5) {
            //基础样式
            width: 2.19em;
            height: 0.82em;
            cursor: pointer;
            /* 设置默认状态的背景图片 */
            background-image: url("~@/assets/img/footer_btn05.png");

            /* 当它被激活或鼠标悬停时，切换背景图片 */
            &.active,
            &:hover {
                background-image: url("~@/assets/img/footer_btn05_active.png"); /* 新的图片地址 */
            }
        }
        .footer-tab:nth-child(6) {
            //基础样式
            width: 2.19em;
            height: 0.75em;
            cursor: pointer;
            /* 设置默认状态的背景图片 */
            background-image: url("~@/assets/img/footer_btn06.png");

            /* 当它被激活或鼠标悬停时，切换背景图片 */
            &.active,
            &:hover {
                background-image: url("~@/assets/img/footer_btn06_active.png"); /* 新的图片地址 */
            }
        }
    }
}
</style>

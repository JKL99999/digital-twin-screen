<template>
  <div class="dashboard-container">
    <!-- Header -->
    <div class="header">
      <div class="header-decoration-left" />
      <div class="header-content">
        <div class="header-left">
          <span class="time"
            ><i class="icon-clock" /> 2025-11-26 星期三 09:25:38</span
          >
          <span class="weather"><i class="icon-sun" /> 晴天 6℃</span>
        </div>
        <div class="header-center">
          <h1 class="title">浦东机场T3航站区港湾机坪</h1>
          <div class="title-glow" />
        </div>
        <div class="header-right">
          <span class="update-time">数据更新于: 2025-11-26</span>
          <div class="icon-btn" title="文件夹">📂</div>
          <div class="icon-btn" title="用户">👤</div>
          <button class="exit-btn">退出</button>
        </div>
      </div>
      <div class="header-decoration-right" />
    </div>

    <!-- Top Navigation -->
    <div class="top_nav">
      <div class="nav-tabs">
        <div class="tab-item active">开累完成</div>
        <div class="tab-item">本月完成</div>
        <div class="tab-item">本周完成</div>
      </div>

      <div class="search-bar">
        <input type="text" placeholder="请输入桩机编号搜索" />
        <button class="search-btn">🔍</button>
      </div>

      <div class="nav-buttons">
        <button class="nav-btn"><i>📦</i> 类型</button>
        <button class="nav-btn"><i>🗺️</i> 图纸</button>
        <button class="nav-btn"><i>🔲</i> 分区</button>
        <button class="nav-btn active"><i>✅</i> 现场验收</button>
        <button class="nav-btn"><i>🧪</i> 现场试验</button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main_content">
      <!-- Left Panel -->
      <div class="main_content_left">
        <!-- Section 1: Progress Stats -->
        <div class="panel-box progress-section">
          <div class="panel-header">施工进度统计</div>
          <div class="date-range">
            <span>📅 开始日期</span> 至 <span>结束日期</span>
          </div>

          <div class="progress-container">
            <!-- Left: Donut Chart -->
            <div class="chart-area">
              <div class="donut-chart">
                <div class="percentage">97.38%</div>
                <div class="label">总完成率</div>
              </div>
              <div class="chart-legend">
                <div class="legend-item">
                  <span class="dot done" /> 完成 2789
                </div>
                <div class="legend-item">
                  <span class="dot todo" /> 未完成 75
                </div>
              </div>
            </div>

            <!-- Right: Bars -->
            <div class="bars-area">
              <div
                v-for="(item, index) in progressData"
                :key="index"
                class="bar-item"
              >
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
            <div
              v-for="(zone, index) in zoneData"
              :key="index"
              class="zone-card"
            >
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
                <span class="fraction"
                  >{{ zone.current }}/{{ zone.total }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Section 3: Quantity Stats -->
        <div class="panel-box quantity-section">
          <div class="panel-header-sm">
            <span>🔵 工程量统计</span>
            <span class="header-right-text"
              >总数量: 4,000根 总体积: 20,000m³</span
            >
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
            <div class="pagination-dots">
              <span /><span class="active" /><span />
            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel (Map/Model) -->
      <div class="main_content_right">
        <!-- Grid Background -->
        <div class="grid-bg" />

        <!-- Floating Box: Acceptance List -->
        <div class="floating-panel acceptance-list">
          <div class="fp-header">验收列表</div>
          <div class="fp-content">
            <div class="list-item"><span class="dot-blue" /> 2025年3月20日</div>
            <div class="list-item">
              <span class="dot-white" /> 2025年3月21日
            </div>
          </div>
        </div>

        <!-- Floating Toolbar (Bottom Center) -->
        <div class="floating-toolbar">
          <button class="tool-btn home-btn">🏠</button>
          <button class="tool-btn">📷</button>
          <button class="tool-btn">📏</button>
          <div class="divider" />
          <button class="tool-btn">📍</button>
          <button class="tool-btn">ℹ️</button>
          <button class="tool-btn">🌐</button>
          <button class="tool-btn">📋</button>
          <button class="tool-btn">⚙️</button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="footer-tabs">
        <div
          class="footer-tab"
          :class="{ active: activeFooterIndex === 0 }"
          @click="setActiveTab(0)"
        />
        <div
          class="footer-tab"
          :class="{ active: activeFooterIndex === 1 }"
          @click="setActiveTab(1)"
        />
        <div
          class="footer-tab"
          :class="{ active: activeFooterIndex === 2 }"
          @click="setActiveTab(2)"
        />
        <div
          class="footer-tab"
          :class="{ active: activeFooterIndex === 3 }"
          @click="setActiveTab(3)"
        />
        <div
          class="footer-tab"
          :class="{ active: activeFooterIndex === 4 }"
          @click="setActiveTab(4)"
        />
        <div
          class="footer-tab"
          :class="{ active: activeFooterIndex === 5 }"
          @click="setActiveTab(5)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      progressData: [
        { name: "三标", value: "1331/1343", percent: "99%" },
        { name: "四标", value: "1458/1521", percent: "96%" },
        { name: "五标", value: "1331/1343", percent: "99%" },
        { name: "六标", value: "1458/1521", percent: "96%" },
      ],
      zoneData: [
        { title: "三标 - A区", percent: "98.78%", current: 974, total: 986 },
        { title: "三标 - B区", percent: "98.78%", current: 611, total: 635 },
        { title: "四标 - A区", percent: "100%", current: 357, total: 357 },
        { title: "四标 - B区", percent: "95.29%", current: 243, total: 255 },
        { title: "五标 - A区", percent: "95.72%", current: 604, total: 631 },
        { title: "五标 - B区", percent: "98.78%", current: 974, total: 986 },
      ],
      activeFooterIndex: 0,
    };
  },
  methods: {
    setActiveTab(num) {
      this.activeFooterIndex = num;
    },
  },
};
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
  background: radial-gradient(
      91% 91% at 89% 132%,
      rgba(23, 159, 222, 0.2) 0%,
      rgba(23, 159, 222, 0) 100%
    ),
    radial-gradient(
      51% 51% at 28% 96%,
      rgba(23, 159, 222, 0.2) 0%,
      rgba(23, 159, 222, 0) 100%
    ),
    #0e1a2a;
  color: $text-primary;
  font-family: $font-family;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* --- Header --- */
.header {
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: url("~@/assets/img/headerBg.png");
  border-bottom: 2px solid $border-blue;
  position: relative;
  box-shadow: 0 0 20px rgba(0, 150, 255, 0.2);
  z-index: 10;

  .header-content {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 20px;
    margin-top: 10px;
  }

  .header-left,
  .header-right {
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 14px;
    color: #a0cfff;
  }

  .header-center {
    text-align: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 20px;

    .title {
      font-family: Source Han Sans CN, Source Han Sans CN;
      font-weight: 800;
      font-size: 32px;
      line-height: 40px;
      text-shadow: 0px 2px 4px rgba(14, 26, 42, 0.4);
      text-align: center;
      font-style: normal;
      text-transform: none;

      /* --- 关键修改部分 --- */
      background: linear-gradient(90deg, #ffffff 0%, #c0ebff 35%, #179fde 100%);
      -webkit-background-clip: text; /* 将背景裁剪到文字上 */
      background-clip: text; /* 标准写法 */
      color: transparent; /* 必须让文字颜色透明，才能看到底下的背景渐变 */
      /* -------------------- */
    }
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
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-top: 10px;

  .nav-tabs {
    display: flex;
    gap: -10px; /* Overlap slightly */

    .tab-item {
      padding: 8px 30px;
      background: linear-gradient(
        180deg,
        rgba(10, 50, 90, 0.8),
        rgba(5, 20, 40, 0.8)
      );
      border: 1px solid $border-blue;
      cursor: pointer;
      clip-path: polygon(10% 0, 90% 0, 100% 100%, 0% 100%);
      color: #8ab;
      font-weight: bold;

      &.active {
        background: linear-gradient(180deg, #007acc, #004080);
        color: #fff;
        z-index: 2;
        border-color: #00deff;
        box-shadow: 0 0 10px rgba(0, 222, 255, 0.4);
      }
    }
  }

  .search-bar {
    display: flex;
    align-items: center;
    border: 1px solid $border-blue;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    overflow: hidden;

    input {
      background: transparent;
      border: none;
      color: #fff;
      padding: 8px;
      width: 200px;
      outline: none;
    }
    button {
      background: $border-blue;
      border: none;
      color: #fff;
      padding: 8px 12px;
      cursor: pointer;
    }
  }

  .nav-buttons {
    display: flex;
    gap: 10px;

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

      &.active,
      &:hover {
        background: rgba(0, 150, 255, 0.3);
        border-color: $text-secondary;
        color: #fff;
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
    width: 450px;
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
        font-size: 16px;
        color: $text-secondary;
        border-bottom: 2px solid rgba(43, 118, 154, 0.5);
        padding-bottom: 8px;
        margin-bottom: 10px;
        font-weight: bold;
        text-shadow: 0 0 5px $text-secondary;
      }
    }

    /* Progress Section */
    .progress-section {
      .date-range {
        font-size: 12px;
        color: #8ab;
        margin-bottom: 10px;
        background: rgba(0, 0, 0, 0.2);
        padding: 4px;
        border-radius: 4px;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.1);
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
    background: radial-gradient(
      circle at center,
      rgba(13, 39, 66, 0.3) 0%,
      rgba(5, 16, 32, 0.8) 100%
    );
    box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5);

    .grid-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(
          rgba(43, 118, 154, 0.1) 1px,
          transparent 1px
        ),
        linear-gradient(90deg, rgba(43, 118, 154, 0.1) 1px, transparent 1px);
      background-size: 40px 40px;
      z-index: 0;
    }

    /* Floating Acceptance List */
    .acceptance-list {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 200px;
      background: rgba(13, 39, 66, 0.9);
      border: 1px solid $border-blue;
      border-radius: 4px;
      z-index: 2;

      .fp-header {
        background: $accent-blue;
        color: #fff;
        padding: 8px;
        font-size: 14px;
        text-align: center;
      }
      .fp-content {
        padding: 10px;
        .list-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          margin-bottom: 8px;
          color: #fff;
          .dot-blue {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: $text-secondary;
          }
          .dot-white {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #fff;
          }
        }
      }
    }

    /* Floating Toolbar */
    .floating-toolbar {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(13, 39, 66, 0.9);
      border: 1px solid $border-blue;
      border-radius: 8px;
      padding: 8px 15px;
      display: flex;
      gap: 15px;
      align-items: center;
      z-index: 2;

      .tool-btn {
        background: transparent;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: #a0cfff;
        transition: 0.2s;

        &:hover {
          color: #fff;
          transform: scale(1.1);
        }
      }
      .divider {
        width: 1px;
        height: 20px;
        background: rgba(255, 255, 255, 0.2);
      }
    }
  }
}

/* --- Footer --- */
.footer {
  height: 100px;
  background-image: url("~@/assets/img/footerBg.png");
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 0;

  .footer-tabs {
    display: flex;
    align-items: flex-end;
    gap: 10px;

    /* 为每个 tab 单独设置图片 */
    .footer-tab:nth-child(1) {
      //基础样式
      width: 219px;
      height: 75px;
      cursor: pointer;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain; /* 或 cover，根据需求调整 */
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
      width: 219px;
      height: 82px;
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
      width: 219px;
      height: 89px;
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
      width: 219px;
      height: 89px;
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
      width: 219px;
      height: 82px;
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
      width: 219px;
      height: 75px;
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

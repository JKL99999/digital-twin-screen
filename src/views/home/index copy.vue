<template>
  <div class="dashboard-container">
    <header class="header">
      <div class="header-left">
        <span class="time">🕒 2025-11-26 星期三 09:25:38</span>
        <span class="weather">☀️ 晴天 6℃</span>
      </div>
      <div class="header-center">
        <h1 class="title">浦东机场T3航站区港湾机坪</h1>
        <div class="title-decoration"></div>
      </div>
      <div class="header-right">
        <span class="update-time">数据更新于: 2025-11-26</span>
        <div class="icon-btn">📂</div>
        <div class="icon-btn">👤</div>
        <button class="exit-btn">退出</button>
      </div>
    </header>

    <div class="main-body">
      
      <aside class="left-panel">
        <div class="panel-tabs">
          <div class="tab active">开累完成</div>
          <div class="tab">本月完成</div>
          <div class="tab">本周完成</div>
        </div>

        <div class="card section-progress">
          <div class="section-title">施工进度统计</div>
          <div class="progress-content">
            <div class="chart-donut">
              <div class="donut-circle">
                <span class="percent">97.38%</span>
                <span class="label">总完成率</span>
              </div>
              <div class="legend">
                <div class="item"><span class="dot blue"></span>完成 2789</div>
                <div class="item"><span class="dot gray"></span>未完成 75</div>
              </div>
            </div>
            <div class="chart-bars">
              <div class="bar-row" v-for="(item, index) in progressData" :key="index">
                <div class="row-label">{{ item.name }}</div>
                <div class="row-bar-area">
                  <div class="bar-bg">
                    <div class="bar-fill" :style="{ width: item.percent }"></div>
                  </div>
                  <div class="row-value">{{ item.value }}</div>
                </div>
                <div class="row-percent">{{ item.percent }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="card-grid">
          <div class="mini-card" v-for="(card, i) in zoneData" :key="i">
            <div class="card-header">
              <span class="icon">🏗️</span> {{ card.title }}
            </div>
            <div class="card-body">
              <div class="percent">{{ card.percent }}</div>
              <div class="fraction">
                <span class="curr">{{ card.current }}</span>/<span class="total">{{ card.total }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card section-table">
          <div class="section-title">
            <span>🕘 工程量统计</span>
            <span class="sub-info">总数量: 4,000根 总体积: 20,000m³</span>
          </div>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>类型</th>
                  <th>数量</th>
                  <th>体积</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0.6m桩长20m(类型1)</td>
                  <td class="highlight">500根</td>
                  <td class="highlight">2500m³</td>
                </tr>
                <tr>
                  <td>0.6m桩长15m(类型2)</td>
                  <td class="highlight">500根</td>
                  <td class="highlight">2500m³</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </aside>

      <section class="center-map-area">
        <div class="search-bar">
          <input type="text" placeholder="请输入桩机编号搜索" />
          <button class="search-btn">🔍</button>
        </div>

        <div class="top-right-tools">
          <button class="tool-btn">类型</button>
          <button class="tool-btn">图纸</button>
          <button class="tool-btn">分区</button>
          <button class="tool-btn active">☑ 现场验收</button>
          <button class="tool-btn">现场试验</button>
        </div>

        <div class="floating-list">
          <div class="list-header">验收列表</div>
          <div class="list-item">🔵 2025年3月20日</div>
          <div class="list-item">🔵 2025年3月21日</div>
        </div>

        <div class="bottom-floating-tools">
          <div class="tool-icon">🏠</div>
          <div class="tool-icon">🗺️</div>
          <div class="tool-icon">📏</div>
          <div class="tool-icon">⚙️</div>
          <div class="tool-icon">ℹ️</div>
        </div>

        <div class="map-placeholder">
          <div class="map-shape"></div>
        </div>
      </section>
    </div>

    <footer class="footer-nav">
      <div class="nav-item active">桩基</div>
      <div class="nav-item">山皮石垫层</div>
      <div class="nav-item">水稳底基层</div>
      <div class="nav-item">水稳上基层</div>
      <div class="nav-item">道面</div>
      <div class="nav-item">排水工程</div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      // 模拟左侧进度条数据
      progressData: [
        { name: '三标', value: '1331/1343', percent: '99%' },
        { name: '四标', value: '1458/1521', percent: '96%' },
        { name: '五标', value: '1331/1343', percent: '99%' },
        { name: '六标', value: '1458/1521', percent: '96%' }
      ],
      // 模拟左侧 Grid 数据
      zoneData: [
        { title: '三标 - A区', percent: '98.78%', current: 974, total: 986 },
        { title: '三标 - B区', percent: '98.78%', current: 611, total: 635 },
        { title: '四标 - A区', percent: '100%', current: 357, total: 357 },
        { title: '四标 - B区', percent: '95.29%', current: 243, total: 255 },
        { title: '五标 - A区', percent: '95.72%', current: 604, total: 631 },
        { title: '五标 - B区', percent: '98.78%', current: 974, total: 986 }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
/* 颜色变量定义 
  完全还原图片中的深蓝/科技蓝配色
*/
$bg-color: #051224;
$panel-bg: rgba(12, 36, 65, 0.7);
$border-color: #1e4f7a;
$neon-blue: #00eaff;
$text-white: #ffffff;
$text-label: #8daac7;
$header-gradient-start: #0a2a4d;
$header-gradient-end: #051224;

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.dashboard-container {
  width: 100vw;
  height: 100vh;
  background-color: $bg-color;
  background-image: radial-gradient(circle at center, #0a2540 0%, #020b16 100%);
  color: $text-white;
  font-family: "Microsoft YaHei", sans-serif;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  /* 1. Header 样式 */
  .header {
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background: url('data:image/svg+xml;utf8,<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><path d="M0,0 L100%,0 L100%,50 L80%,70 L20%,70 L0,50 Z" fill="rgba(10,42,77,0.5)"/></svg>') no-repeat center top;
    background-size: 100% 100%;
    border-bottom: 2px solid $border-color;
    box-shadow: 0 0 15px rgba(0, 234, 255, 0.2);
    position: relative;
    z-index: 10;

    .header-left, .header-right {
      display: flex;
      align-items: center;
      gap: 15px;
      font-size: 12px;
      color: $neon-blue;
    }

    .header-center {
      text-align: center;
      .title {
        font-size: 24px;
        font-weight: bold;
        letter-spacing: 2px;
        text-shadow: 0 0 10px $neon-blue;
        background: linear-gradient(180deg, #fff, #90cbfb);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .title-decoration {
        height: 2px;
        width: 100%;
        background: linear-gradient(90deg, transparent, $neon-blue, transparent);
        margin-top: 5px;
      }
    }

    .exit-btn {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid $neon-blue;
      color: $text-white;
      padding: 4px 12px;
      cursor: pointer;
      &:hover { background: $neon-blue; color: #000; }
    }
  }

  /* 主体区域 */
  .main-body {
    flex: 1;
    display: flex;
    padding: 15px;
    gap: 15px;
    position: relative;
  }

  /* 2. 左侧面板样式 */
  .left-panel {
    width: 380px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 5;

    .panel-tabs {
      display: flex;
      gap: 5px;
      margin-bottom: 5px;
      .tab {
        flex: 1;
        text-align: center;
        padding: 8px 0;
        background: rgba(12, 36, 65, 0.5);
        border: 1px solid $border-color;
        cursor: pointer;
        clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%, 0% 25%); // 模拟梯形切角
        font-size: 13px;
        
        &.active {
          background: rgba(0, 234, 255, 0.2);
          border-color: $neon-blue;
          color: $neon-blue;
          font-weight: bold;
        }
      }
    }

    .card {
      background: $panel-bg;
      border: 1px solid $border-color;
      padding: 10px;
      position: relative;
      &::before { /* 模拟边框四个角的装饰 */
        content: ''; position: absolute; top: -1px; left: -1px; width: 10px; height: 10px;
        border-top: 2px solid $neon-blue; border-left: 2px solid $neon-blue;
      }
      &::after {
        content: ''; position: absolute; bottom: -1px; right: -1px; width: 10px; height: 10px;
        border-bottom: 2px solid $neon-blue; border-right: 2px solid $neon-blue;
      }

      .section-title {
        font-size: 14px;
        font-weight: bold;
        color: $neon-blue;
        border-left: 3px solid $neon-blue;
        padding-left: 8px;
        margin-bottom: 10px;
        background: linear-gradient(90deg, rgba(0,234,255,0.1), transparent);
        display: flex;
        justify-content: space-between;
        
        .sub-info {
          font-size: 12px;
          color: $text-label;
          font-weight: normal;
        }
      }
    }

    /* 进度统计区域 */
    .section-progress .progress-content {
      display: flex;
      align-items: center;
      
      .chart-donut {
        width: 100px;
        text-align: center;
        .donut-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 8px solid #0d2a46;
          border-top-color: $neon-blue;
          border-right-color: $neon-blue;
          border-bottom-color: $neon-blue; /* 75% filled simulation */
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          box-shadow: 0 0 10px rgba(0,234,255,0.2);

          .percent { font-size: 14px; font-weight: bold; }
          .label { font-size: 10px; color: $text-label; }
        }
        .legend {
          font-size: 10px;
          margin-top: 5px;
          .item { display: flex; align-items: center; gap: 4px; color: $text-label; justify-content: center;}
          .dot { width: 6px; height: 6px; display: block; }
          .dot.blue { background: $neon-blue; }
          .dot.gray { background: #666; }
        }
      }

      .chart-bars {
        flex: 1;
        padding-left: 10px;
        .bar-row {
          display: flex;
          align-items: center;
          font-size: 12px;
          margin-bottom: 6px;
          .row-label { width: 30px; color: $text-label; }
          .row-bar-area {
            flex: 1;
            margin: 0 5px;
            .bar-bg { height: 6px; background: #0d2a46; border-radius: 3px; overflow: hidden; }
            .bar-fill { height: 100%; background: $neon-blue; box-shadow: 0 0 5px $neon-blue; }
            .row-value { font-size: 10px; text-align: right; color: #fff; transform: scale(0.9); }
          }
          .row-percent { width: 30px; text-align: right; color: $neon-blue; }
        }
      }
    }

    /* 标段 Grid 区域 */
    .card-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      
      .mini-card {
        background: rgba(12, 36, 65, 0.4);
        border: 1px solid rgba(30, 79, 122, 0.5);
        padding: 8px;
        
        .card-header {
          font-size: 12px;
          color: $text-label;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding-bottom: 4px;
          margin-bottom: 4px;
        }
        .card-body {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          .percent { color: $neon-blue; font-size: 16px; font-weight: bold; }
          .fraction { font-size: 12px; color: #aaa; .curr { color: $neon-blue; }}
        }
      }
    }

    /* 表格区域 */
    .section-table {
      flex: 1; /* 占据剩余高度 */
      .table-container {
        font-size: 12px;
        table {
          width: 100%;
          border-collapse: collapse;
          th { text-align: left; color: $text-label; padding: 5px; border-bottom: 1px solid $border-color; }
          td { padding: 6px 5px; border-bottom: 1px solid rgba(255,255,255,0.05); }
          .highlight { color: $neon-blue; }
        }
      }
    }
  }

  /* 3. 中间地图区域样式 */
  .center-map-area {
    flex: 1;
    position: relative;
    border: 1px solid $border-color;
    background: rgba(0,0,0,0.2);
    
    /* 搜索栏 */
    .search-bar {
      position: absolute;
      top: 15px;
      left: 15px;
      display: flex;
      z-index: 10;
      input {
        background: rgba(0,0,0,0.5);
        border: 1px solid $border-color;
        color: #fff;
        padding: 6px 10px;
        width: 200px;
        outline: none;
      }
      .search-btn {
        background: $border-color;
        border: none;
        color: #fff;
        width: 30px;
        cursor: pointer;
      }
    }

    /* 右上角工具栏 */
    .top-right-tools {
      position: absolute;
      top: 15px;
      right: 15px;
      display: flex;
      gap: 5px;
      z-index: 10;
      .tool-btn {
        background: rgba(12, 36, 65, 0.8);
        border: 1px solid $border-color;
        color: $text-label;
        padding: 5px 10px;
        font-size: 12px;
        cursor: pointer;
        &.active {
          background: rgba(0, 234, 255, 0.2);
          border-color: $neon-blue;
          color: #fff;
          box-shadow: 0 0 8px rgba(0, 234, 255, 0.3);
        }
      }
    }

    /* 悬浮列表 */
    .floating-list {
      position: absolute;
      top: 60px;
      right: 15px;
      width: 140px;
      background: rgba(12, 36, 65, 0.9);
      border: 1px solid $neon-blue;
      padding: 10px;
      z-index: 10;
      .list-header {
        font-size: 12px;
        color: $neon-blue;
        margin-bottom: 5px;
        background: rgba(0, 234, 255, 0.1);
        padding: 2px 5px;
      }
      .list-item {
        font-size: 11px;
        margin-bottom: 4px;
        color: #ddd;
      }
    }

    /* 底部悬浮工具条 */
    .bottom-floating-tools {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0,0,0,0.6);
      border: 1px solid $border-color;
      display: flex;
      padding: 5px 15px;
      border-radius: 20px;
      gap: 15px;
      z-index: 10;
      .tool-icon {
        font-size: 18px;
        cursor: pointer;
        transition: transform 0.2s;
        &:hover { transform: scale(1.2); color: $neon-blue; }
      }
    }

    /* 模拟点阵地图占位符 */
    .map-placeholder {
      width: 100%;
      height: 100%;
      /* 创建点阵背景效果 */
      background-image: radial-gradient(rgba(0, 234, 255, 0.2) 1px, transparent 1px);
      background-size: 20px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      
      /* 模拟中间那个发光的图形 */
      .map-shape {
        width: 60%;
        height: 50%;
        border: 1px dashed rgba(0, 234, 255, 0.3);
        background: rgba(0, 234, 255, 0.05);
        clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%); /* 梯形 */
        box-shadow: 0 0 50px rgba(0, 234, 255, 0.1);
        position: relative;
        
        &::after {
          content: "MAP ZONE";
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          color: rgba(255,255,255,0.1);
          font-size: 40px;
          font-weight: bold;
        }
      }
    }
  }

  /* 4. 底部导航 Footer 样式 */
  .footer-nav {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 5px;
    padding-bottom: 5px;
    background: linear-gradient(to top, rgba(0, 234, 255, 0.05), transparent);

    .nav-item {
      flex: 1;
      max-width: 150px;
      text-align: center;
      padding: 10px 0;
      background: rgba(12, 36, 65, 0.8);
      border: 1px solid $border-color;
      border-bottom: 3px solid transparent;
      transform: skewX(-15deg); /* 倾斜效果 */
      cursor: pointer;
      color: $text-label;
      font-size: 14px;
      font-weight: bold;
      transition: all 0.3s;

      &:hover, &.active {
        background: linear-gradient(180deg, rgba(12,36,65,0.9), rgba(0,234,255,0.3));
        border-color: $neon-blue;
        border-bottom-color: $neon-blue;
        color: #fff;
        box-shadow: 0 0 15px rgba(0,234,255,0.3);
      }
    }
  }
}
</style>
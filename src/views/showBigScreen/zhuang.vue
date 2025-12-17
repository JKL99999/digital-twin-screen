<template>
  <div class="bg01">
    <header class="header">
      <h3>浦东机场3轴桩基数据可视化</h3>
    </header>

    <div class="wrapper">
      <div class="container-fluid">
        <div class="row fill-h">
          <div class="col-lg-3 fill-h">
            <div class="xpanel-wrapper xpanel-wrapper-2">
              <div class="xpanel">
                <div id="flyMap" class="fill-h" />
              </div>
            </div>
            <div class="xpanel-wrapper xpanel-wrapper-2">
              <div class="xpanel">
                <div id="worldMap" class="fill-h" />
              </div>
            </div>
          </div>
          <div class="col-lg-6 fill-h">
            <div class="xpanel-wrapper xpanel-wrapper-1">
              <div class="xpanel">
                <div id="scatterMap" class="fill-h" />
              </div>
            </div>
          </div>
          <div class="col-lg-3 fill-h">
            <div class="xpanel-wrapper xpanel-wrapper-3">
              <div class="xpanel">
                <div id="provinceMap" class="fill-h" />
              </div>
            </div>
            <div class="xpanel-wrapper xpanel-wrapper-3">
              <div class="xpanel">
                <div id="cityMap" class="fill-h" />
              </div>
            </div>
            <div class="xpanel-wrapper xpanel-wrapper-3">
              <div class="xpanel">
                <div id="countyMap" class="fill-h" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
</script>
<style lang="scss">
html, body {
  width: 100%;
  height: 100%;
  min-height: 635px;
  font-family: "microsoft yahei", arial, sans-serif;
  background-color: #0f1c30;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
body.bg01 { background-image: url("~@/views/showBigScreen/img/bg01.png"); }
body.bg02 { background-image: url("~@/views/showBigScreen/img/bg02.png"); }
body.bg03 { background-image: url("~@/views/showBigScreen/img/bg03.png"); }
body.bg04 { background-image: url("~@/views/showBigScreen/img/bg04.png"); }
.bg01 { background-image: url("~@/views/showBigScreen/img/bg01.png"); }
.header {
  margin: 0 auto;
  width: 100%;
  height: 65px;
  max-width: 1920px;
  background: url("~@/views/showBigScreen/img/header.png") center no-repeat;
}
.header h3 {
  margin: 0;
  padding: 0;
  line-height: 50px;
  text-align: center;
  font-size: 24px;
  color: #5dc2fe;
}
.wrapper { position: absolute; top: 80px; bottom: 0; left: 0; right: 0; min-height: 555px; }
.container-fluid { height: 100%; min-height: 100%; }
.row { margin-left: -7px; margin-right: -8px; }
.col-lg-3 { width: 25%; }
.col-lg-6 { width: 50%; }
.row>div { padding-left: 7px; padding-right: 8px; }
.xpanel-wrapper { padding-bottom: 15px; box-sizing: border-box; }
.xpanel-wrapper-1 { height: 100%; }
.xpanel-wrapper-2 { height: 50%; }
.xpanel-wrapper-3 { height: 33.33333%; }
.xpanel {
  padding: 15px;
  height: 100%;
  min-height: 170px;
  background: url("~@/views/showBigScreen/img/panel.png") center no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
}
.fill-h { height: 100%; min-height: 100%; }
.no-margin { margin: 0 !important; }
.no-padding { padding: 0 !important; }
::-webkit-scrollbar { width: 0; height: 0; }
::-webkit-scrollbar-track { background-color: transparent; }
::-webkit-scrollbar-thumb { border-radius: 5px; background-color: rgba(0, 0, 0, 0.3); }
</style>

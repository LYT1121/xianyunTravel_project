<template>
  <div class="map" style="padding-top:50px;margin-left:40px">高德地图
      <div id="container"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    window.onLoad = function() {
        // 创建地图 container容器的id
      var map = new AMap.Map('container', {
        zoom:11,//级别
        center: [118.397428, 31.90923],//中心点坐标
        viewMode:'3D',//使用3D视图
        pitch:55, // 地图俯仰角度，有效范围 0 度- 83 度
    });
    };
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=0962302565d99f25b879e2d93eb8e6ab&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>

<style lang="less" scoped>
#container{
    margin: 20px 0;
    margin-left: 40px;
    width: 500px;
    height: 300px;
}
</style>
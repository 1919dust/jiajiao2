<template>
  <div id="app">
    <div id="login">
      <vue-particles
          color="#555"
          :particleOpacity="0.7"
          :particlesNumber="150"
          shapeType="circle"
          :particleSize="4"
          linesColor="#555"
          :linesWidth="1"
          :lineLinked="true"
          :lineOpacity="0.4"
          :linesDistance="150"
          :moveSpeed="2"
          :hoverEffect="true"
          hoverMode="grab"
          :clickEffect="false"
          clickMode="push"
          class="login"
      />
    </div>
    <router-view/>
  </div>
</template>

<style>
body{
  margin:0;
  padding:0;
  border:0;
  background-color : rgb(239,239,239);
}
.login{
  position: fixed;
  top: 0;
  width: 100%;
}
</style>

<style src="@/assets/css/import.css"></style>
<template>
  <div id="app">
    <modals-container/>
    <template v-if="$route.path.indexOf('before_login') != -1 || $route.path == '/pageNotFound'">
      <router-view></router-view>
    </template>
    <template v-else>

      <!-- 모달 배경 -->
      <div class="modal_bg" v-if="this.$store.state.loading"></div>

      <!-- 로딩 화면 -->
      <div class="loading_wrap" style="display: block" v-if="this.$store.state.loading">
        <div class="loading"></div>
      </div>

      <Header/>
      <div id="container">
        <SideMenu/>
        <transition name="view">
          <router-view :key="$route.fullPath"></router-view>
        </transition>
      </div>
    </template>
  </div>
</template>

<script>

  import constants from './plugins/constants';
  import Header from './components/header/header'
  import SideMenu from './components/side_menu/side_menu.vue'

  export default {

    name: 'app',
    components: {
      Header,
      SideMenu
    },
    beforeCreate() {
      let language = constants.LANGUAGE;
      this.$i18n.locale = language;
    }
  }
</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  .view-enter-active, .view-leave-acitve {
    transition: opacity 0.5s;
  }

  .view-leave-acitve {
    position: absolute;
  }

  .view-enter, .view-leave-to {
    opacity: 0;
  }

  .modal_bg {
    display: block;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .loading_wrap {
    z-index: 1000
  }
</style>

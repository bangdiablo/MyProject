<style src="@/assets/css/import.css"></style>
<template>
    <div class="wrap">

        <template v-if="isNoHeaderTemplate($route.path)">
          <router-view></router-view>
        </template>

        <template v-else-if="isBeforeLoginTemplate($route.path)">
          <router-view></router-view>
        </template>

        <template v-else>
            <Header/>

            <div class="container">

              <SideMenu/>

              <transition name="view">
                <router-view></router-view>
              </transition>

            </div>
        </template>

        <!-- S : 모달 배경 -->
        <div class="modal_bg"></div>
        <!-- E : 모달 배경 -->
    </div>
</template>

<script>
  import Header from './components/common/Header'
  import SideMenu from './components/common/SideMenu'
  import constants from "../../user-site-front/src/plugins/constants";

  export default {

    name: 'app',
    components: {
      Header,
      SideMenu
    },
    beforeCreate() {
      let language = constants.LANGUAGE;
      this.$i18n.locale = language;
    },
    methods: {

      isNoHeaderTemplate(path) {

        const noHeaderTemplatePathArr = ['home', 'not_found'];
        let isNoHeaderTemplate = false,
            noHeaderTemplatePath,
            i;

        for (i = 0; i < noHeaderTemplatePathArr.length; i++) {

          noHeaderTemplatePath = noHeaderTemplatePathArr[i];

          if (path.indexOf(noHeaderTemplatePath) > -1) {
            isNoHeaderTemplate = true;
            break;
          }
        }

        return isNoHeaderTemplate;
      },

      isBeforeLoginTemplate(path) {

        const beforeLoginTemplatePathArr = ['before_login'];
        let isBeforeLoginTemplate = false,
            beforeLoginTemplatePath,
            i;

        for (i = 0; i < beforeLoginTemplatePathArr.length; i++) {

          beforeLoginTemplatePath = beforeLoginTemplatePathArr[i];

          if (path.indexOf(beforeLoginTemplatePath) > -1) {
            isBeforeLoginTemplate = true;
            break;
          }
        }

        return isBeforeLoginTemplate;
      }
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

  .loading_wrap {
    z-index: 1000
  }
</style>

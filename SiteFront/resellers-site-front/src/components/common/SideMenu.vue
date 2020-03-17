<template>
    <nav>
        <ul>
            <!-- a 태그 class="on" 활성화 -->
            <li>
                <router-link :to="$t('path.home.url')" title="대시보드" :class="{on:isCurrentMenu($t('path.home.url'))}">
                    <span class="nav_ico dashboard"></span>{{$t('lnb.home')}}
                </router-link>
            </li>

            <li>
                <router-link :to="$t('path.reseller.url')" title="리셀러 관리" :class="{on:isCurrentMenu($t('path.reseller.url'))}">
                    <span class="nav_ico reseller"></span>{{$t('lnb.reseller')}}
                </router-link>
            </li>
            <li>
                <router-link :to="$t('path.account.url')" title="계정관리" :class="{on:isCurrentMenu($t('path.account.url'))}">
                  <span class="nav_ico account"></span>{{$t('lnb.account')}}
                </router-link>
            </li>
            <li>
                <router-link :to="$t('path.plan.url')" title="플랜" :class="{on:isCurrentMenu($t('path.plan.url'))}">
                    <span class="nav_ico plan"></span>{{$t('lnb.plan')}}
                </router-link>
            </li>
            <li>
                <router-link :to="$t('path.license.url')" title="라이센스 관리" :class="{on:isCurrentMenu($t('path.license.url'))}">
                    <span class="nav_ico license"></span>{{$t('lnb.license')}}
                </router-link>
            </li>
            <li>
                <router-link :to="$t('path.report.url')" title="리포트" :class="{on:isCurrentMenu($t('path.report.url'))}">
                    <span class="nav_ico report"></span>{{$t('lnb.report')}}
                </router-link>
            </li>
            <li>
                <router-link :to="$t('path.setting.url')" title="설정" :class="{on:isCurrentMenu($t('path.setting.url'))}">
                    <span class="nav_ico settings"></span>{{$t('lnb.setting')}}
                </router-link>
            </li>
        </ul>
    </nav>

</template>

<script>

  import $ from 'jquery';
  import {mapState} from 'vuex'

  export default {
    name: 'SideMenu',
    data: function () {
      return {
        isOpened: {
          connected_device: false,
          my_file: false,
          share: false,
          management: false,
          report: false
        }
      }
    },
    computed: {
      path: function () {
        return this.$route.path;
      },
      currentUpperMenu: function () {

        let currentUpperMenu;
        const currentMenu = this.$store.state.main.currentMenu;
        const currentMenuArr = currentMenu.split("/");

        if (currentMenuArr.length >= 2) {

          currentUpperMenu = currentMenuArr[1];
        }

        return currentUpperMenu;
      },
      isCurrentUpperMenu: function () {

        return (upperMenuName) => {

          let isCurrentUpperMenu = false;
          const currentMenu = this.$store.state.main.currentMenu;
          const currentMenuArr = currentMenu.split("/");

          if (currentMenuArr.length >= 2) {

            isCurrentUpperMenu = upperMenuName == currentMenuArr[1] ? true : false;
          }

          return isCurrentUpperMenu;
        }
      },
      isCurrentMenu: function (event) {

        return (url) => {

          return this.$store.state.main.currentMenu == url;
        };
      },
      ...mapState('main', ['admin'])
    },
    methods: {

      toggleOpened(event) {

        const id = event.target.dataset.id;
        this.isOpened[id] = !this.isOpened[id];
      },

      goLink(path) {

        this.initPageLoadInfo();

        if (this.$route.fullPath === path)
          location.reload();
        else
          this.$router.push({path: path});
      },

      initPageLoadInfo() {

        this.$store.dispatch('main/setPageLoadInfo', {});
      },
    },
    mounted() {

      // 새로고침 시, 선택된 메뉴의 상위 메뉴 opened
      if (this.currentUpperMenu != undefined) {

        this.isOpened[this.currentUpperMenu] = true;
      }

      $(document).ready(function ($) {
        jQuery("nav").mCustomScrollbar({
          theme: "minimal-dark"
        });
      });
    }
  }
</script>

<style scoped>

</style>

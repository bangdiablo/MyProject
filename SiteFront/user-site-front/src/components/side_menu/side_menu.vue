<template>
  <nav id="gnb">
    <h2>Global Navigation</h2>
    <ul>
      <li>
        <router-link :to="$t('path.home.url')" :class="{active:isCurrentMenu($t('path.home.url'))}"><i class="home"></i>{{
          $t('lnb.home')}}
        </router-link>
      </li>

      <li class="deps">
        <a :data-id="'connected_device'" @click="toggleOpened"
           :class="{active:isCurrentUpperMenu('connected_device')}">
          <i class="device"></i>{{ $t('lnb.connected-device')}}
        </a>
        <ul v-if="isOpened.connected_device" style="display:block">
          <li><a href="#">{{ $t('lnb.connected-device-all')}}</a></li>
          <li v-for="item in conected_device_info.data" @click="GetConnectedDeviceFileList(item.bs_storage_id)">
            <router-link :to="{ name : 'device', params:{device_name : item.bs_system} }"
                         :class="{active:isCurrentMenu(item.bs_system)}">{{ item.bs_system }}
            </router-link>
          </li>
        </ul>
      </li>

      <li>
        <router-link :to="$t('path.cloud_drive.url')" :class="{active:isCurrentMenu($t('path.cloud_drive.url'))}"><i
          class="cloud"></i>{{
          $t('lnb.cloud-drive')}}
        </router-link>
      </li>

      <li>
        <router-link :to="$t('path.favorite.url')" :class="{active:isCurrentMenu($t('path.favorite.url'))}"  ><i
          class="bookmark"  ></i>{{
          $t('lnb.favorite')}}
        </router-link>
      </li>

      <li class="deps">
        <a :data-id="'share'" @click="toggleOpened" :class="{active:isCurrentUpperMenu('share')}">
          <i class="share"></i>{{ $t('lnb.share')}}
        </a>
        <ul v-if="isOpened.share" style="display:block">
          <li>
            <router-link :to="$t('path.share.get_shared.url')"
                         :class="{active:isCurrentMenu($t('path.share.get_shared.url'))}">{{
              $t('lnb.share-get-shared')}}
            </router-link>
          </li>
          <li>
            <router-link :to="$t('path.share.share.url')" :class="{active:isCurrentMenu($t('path.share.share.url'))}">{{
              $t('lnb.share-share')}}
            </router-link>
          </li>
        </ul>
      </li>

      <li>
        <router-link :to="$t('path.recycle_bin.url')" :class="{active:isCurrentMenu($t('path.recycle_bin.url'))}"><i
          class="recycleBin"></i>{{
          $t('lnb.recycle-bin')}}
        </router-link>
      </li>

      <li class="deps">
        <a :data-id="'storage_service'" @click="toggleOpened"
           :class="{active:isCurrentUpperMenu('storage_service')}"><i class="storage"></i>{{
          $t('lnb.storage-service')}}</a>
        <ul v-if="isOpened.storage_service" style="display:block">
          <li v-if="stroage_service_info.google_drive">
            <router-link :to="$t('path.storage_service.googledrive.url')"
                         :class="{active:isCurrentMenu($t('path.storage_service.googledrive.url'))}">Google Drvie
            </router-link>
          </li>
          <li>
            <button type="button" class="btn_add" @click="storage_service_add">{{ $t('lnb.storage-service-add')}}
            </button>
          </li>
        </ul>
      </li>

      <!--      <li class="deps">-->
      <!--        <a :data-id="'my_file'" @click="toggleOpened" :class="{active:isCurrentUpperMenu(urls.my_file.index)}">-->
      <!--          <i class="myfile"></i>{{ $t('lnb.my-file') }}-->
      <!--        </a>-->
      <!--        <ul v-show="isOpened.my_file" style="display:block">-->
      <!--          <li>-->
      <!--            <router-link :to="urls.my_file.category" :class="{active:isCurrentMenu(urls.my_file.category)}">{{-->
      <!--              $t('lnb.my-file-category')}}-->
      <!--            </router-link>-->
      <!--          </li>-->
      <!--          <li>-->
      <!--            <router-link :to="urls.my_file.owner" :class="{active:isCurrentMenu(urls.my_file.owner)}">{{-->
      <!--              $t('lnb.my-file-owner')}}-->
      <!--            </router-link>-->
      <!--          </li>-->
      <!--          <li>-->
      <!--            <router-link :to="urls.my_file.size" :class="{active:isCurrentMenu(urls.my_file.size)}">{{-->
      <!--              $t('lnb.my-file-size')}}-->
      <!--            </router-link>-->
      <!--          </li>-->
      <!--          <li>-->
      <!--            <router-link :to="urls.my_file.change_day" :class="{active:isCurrentMenu(urls.my_file.change_day)}">{{-->
      <!--              $t('lnb.my-file-change-day')}}-->
      <!--            </router-link>-->
      <!--          </li>-->
      <!--          <li>-->
      <!--            <router-link :to="urls.my_file.storage_kind" :class="{active:isCurrentMenu(urls.my_file.storage_kind)}">{{-->
      <!--              $t('lnb.my-file-storage-kind')}}-->
      <!--            </router-link>-->
      <!--          </li>-->
      <!--        </ul>-->
      <!--      </li>-->
      <template v-if="admin">
        <li class="deps">
          <a :data-id="'management'" @click="toggleOpened"
             :class="{active:isCurrentUpperMenu('management')}"><i class="admin"></i>{{ $t('lnb.management')}}</a>
          <ul v-if="isOpened.management" style="display:block">
            <li>
              <a @click="goLink($t('path.management.user_server.url'))"
                 :class="{active:isCurrentMenu($t('path.management.user_server.url'))}">{{$t('lnb.management-user-server')}}</a>
              <!--              <router-link :to="$t('path.management.user_server.url')"-->
              <!--                           :class="{active:isCurrentMenu($t('path.management.user_server.url'))}" @click.native="initPageLoadInfo">{{-->
              <!--                $t('lnb.management-user-server')}}-->
              <!--              </router-link>-->
            </li>
            <li>
              <router-link :to="$t('path.management.policy.url')"
                           :class="{active:isCurrentMenu($t('path.management.policy.url'))}">{{
                $t('lnb.management-policy')}}
              </router-link>
            </li>
            <li>
              <router-link :to="$t('path.management.setting.url')"
                           :class="{active:isCurrentMenu($t('path.management.setting.url'))}">{{
                $t('lnb.management-setting')}}
              </router-link>
            </li>
          </ul>
        </li>
        <li class="deps">
          <a :data-id="'report'" @click="toggleOpened" :class="{active:isCurrentUpperMenu('report')}"><i
            class="report"></i>{{ $t('lnb.report')}}</a>
          <ul v-if="isOpened.report" style="display:block">
            <li>
              <router-link to="/report/audit_report"
                           :class="{active:isCurrentMenu($t('path.report.audit_report.url'))}">
                {{ $t('lnb.report-audit')}}
              </router-link>
            </li>
            <li>
              <router-link to="/report/report_and_statistics"
                           :class="{active:isCurrentMenu($t('path.report.report_and_statistics.url'))}">
                {{ $t('lnb.report-statistics')}}
              </router-link>
            </li>
          </ul>
        </li>
        <li><a href="#"><i class="purchase"></i>{{ $t('lnb.buying')}}</a></li>
      </template>

    </ul>
  </nav>

</template>

<script>

  import $ from 'jquery';
  import {mapState} from 'vuex'
  import StorageServiceAdd from '../../views/stroage_service/storage_service_add.vue'

  export default {

    components: {
      StorageServiceAdd
    },
    data: function () {
      return {
        isOpened: {
          connected_device: false,
          my_file: false,
          share: false,
          storage_service: false,
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
      stroage_service_info: function () {
        return this.$store.state.storage_service.storage_service;
      },
      conected_device_info: function () {
        return this.$store.state.connected_device.devices;
      },
      ...mapState('main', ['admin'])
    },
    methods: {

      toggleOpened(event) {

        const id = event.target.dataset.id;
        this.isOpened[id] = !this.isOpened[id];
      },
      storage_service_add() {
        this.$modal.show(StorageServiceAdd, {
          modal: this.$modal
        }, {
          name: 'dynamic-modal',
          width: '330px',
          height: '130px',
          draggable: false,
          clickToClose: false
        });
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

      GetConnectedDeviceFileList(key) {
        this.$store.dispatch("connected_device/GetConnectedDeviceFileList", {
          item: key,
        })
      },
    },
    mounted() {
      $(document).ready(function ($) {
        jQuery("nav#gnb").mCustomScrollbar({
          theme: "minimal-dark"
        });

        jQuery("article#contents.main").mCustomScrollbar({
          theme: "minimal-dark"
        });

        //셀렉트박스 UI
        jQuery(".selectbox_ui").each(function () {
          initSelectBox(jQuery(this)) //비동기로 셀렉트 박스를 만들었을 경우 initSelectBox(jQuery("#아이디")) 로 실행시켜줘야 함
        })
      });

      // 새로고침 시, 선택된 메뉴의 상위 메뉴 opened
      if (this.currentUpperMenu != undefined) {

        this.isOpened[this.currentUpperMenu] = true;
      }

      if (this.stroage_service_info.google_drive == true) {

        this.$store.dispatch('storage_service/getGoogleDrive');

      }

      this.$store.dispatch('connected_device/getConnectedDeviceName');

    }
  }
</script>

<style scoped>
  a {
    cursor: pointer;
  }


</style>

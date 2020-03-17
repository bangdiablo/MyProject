<template>
  <div class="file_folder_info" v-show="visible">
    <ul class="ffi_navi">
      <li><a href="#" :class="{active: tab == 'detail'}" @click="tab ='detail'">자세한사항</a></li>
      <li v-if="detail_info_flg === 'file'" ><a href="#" :class="{active: tab == 'version'}" @click="tab ='version'">버전 표시</a></li>
    </ul>
    <div class="ffi_cont">
      <div class="ffi_detail" v-show="tab == 'detail'" v-bind:stype="{'border-top': '50px solid white' }">
        <h3 v-if="detail_info_flg === 'folder'"><img src="@/assets/images/sub/ico_ft_photo.png" alt="" class="ico"/>{{
          detail_info.dir_name }}</h3>
        <h3 v-else-if="detail_info_flg === 'file'"><img src="@/assets/images/sub/ico_ft_photo.png" alt="" class="ico"/>{{
          detail_info.file_name }}</h3>
        <div class="screen_shot">

          <template  v-if="detail_info_flg === 'folder'">
          <img src="@/assets/images/sub/preview_ft_folder.png" alt="" class="none_photo"/>

          </template>
          <template v-else>
          <!--  require 이슈로          -->
          <img src="@/assets/images/sub/preview_ft_word.png" class="none_photo"
               v-if="detail_info.ext == '.docs' || detail_info.ext == '.doc' "/>
          <img src="@/assets/images/sub/preview_ft_pdf.png" class="none_photo" v-else-if="detail_info.ext == '.pdf'"/>
          <img src="@/assets/images/sub/preview_ft_pp.png" class="none_photo"
               v-else-if="detail_info.ext == '.pptx' || detail_info.ext == '.ppt'"/>
          <img src="@/assets/images/sub/preview_ft_excel.png" class="none_photo"
               v-else-if="detail_info.ext == '.xlsx' || detail_info.ext == '.xls' "/>
          <img src="@/assets/images/sub/preview_ft_photo.png" class="none_photo" v-else-if="detail_info.type == 'image' "/>
          <img src="@/assets/images/sub/preview_ft_music.png" class="none_photo" v-else-if="detail_info.type == 'audio' "/>
          <img src="@/assets/images/sub/preview_ft_video.png" class="file_type" v-else-if="detail_info.type == 'video' "/>
          <img src="@/assets/images/sub/preview_ft_etc.png" class="none_photo" v-else/>
          </template>

          <!--	<img src="@/assets/images/sub/preview_ft_video.png" alt="" class="none_photo" />
          <img src="@/assets/images/sub/preview_ft_etc.png" alt="" class="none_photo" />-->
        </div>
        <ul class="menu">
          <li><a href="#"><img src="@/assets/images/sub/btn_ffi_download.png" alt="Download"/></a></li>
          <li><a href="#"><img src="@/assets/images/sub/btn_ffi_share.png" alt="Share"/></a></li>
          <li><a href="#"><img src="@/assets/images/sub/btn_ffi_delete.png" alt="Delete"/></a></li>
        </ul>
        <ul class="info">
          <li v-if="detail_info_flg === 'file'"><strong class="category">종류</strong><span class="field">{{ detail_info.kind }}</span>
          </li>
          <li v-if="detail_info_flg === 'file'"><strong class="category">사이즈</strong><span class="field">{{ formatFileSize(detail_info.file_size) }}</span>
          </li>
          <li><strong class="category">장소</strong><span class="field">{{ detail_info.full_path }}</span></li>
          <li v-if="detail_info_flg === 'file'"><strong class="category">변경일</strong><span class="field">{{ kstDate(detail_info.modify_date) }}</span>
          </li>
          <li v-if="detail_info_flg === 'file'"><strong class="category">작성일</strong><span class="field">{{ kstDate(detail_info.create_date) }}</span>
          </li>
          <li><strong class="category">백업일</strong><span class="field">{{ kstDate(detail_info.backup_date) }}</span>
          </li>
          <li><strong class="category">단말</strong><span class="field">{{ detail_info.storage_name }}</span></li>
        </ul>
      </div>

      <div class="ffi_version" v-show="tab == 'version'">
        <h3 class="hidden_cont">버전표시</h3>
        <ul class="histroy" v-for="item in version_info">
          <li>
            <h4>{{ kstDate(item.backup_date) }}</h4>
            <ul>
              <li>이름 : {{ detail_info.file_name }}</li>
              <li>사이즈 : {{ formatFileSize(detail_info.file_size) }}</li>
              <li v-if="detail_info.bucket_class=='S'">종류 : 일반 스토리지</li>
              <li v-else>종류 : 콜드 스토리지</li>
            </ul>
            <div class="menu">
              <button type="button"><img src="@/assets/images/sub/btn_ffi_download.png" alt="Download"/></button>
              <button type="button"><img src="@/assets/images/sub/btn_ffi_delete.png" alt="Delete"/></button>
            </div>
          </li>
          <!--          <li>-->
          <!--            <h4>9월 6일 이전 기록된 활동 없음</h4>-->
          <!--          </li>-->
        </ul>
      </div>
    </div>
    <button type="button" class="btn_close" @click="close"><img
      src="@/assets/images/component/btn_popup_close.png" alt="Close"/>
    </button>
  </div>
</template>

<script>

  import {contentMixin} from '../../common/contentMixin'
  import {EventBus} from "../../plugins/event-bus";

  export default {
    name: "detail_info",
    mixins: [contentMixin],
    data() {
      return {
        tab:'detail'
      }
    },
    props: {
      visible: {
        type: Boolean,
        require: true,
        default: false
      },
      detail_info: {
        type: Object,
        require: true
      },
      version_info: {},
      currentTab: {
        type: String,
        require: true,
        default: 'detail'
      },
      detail_info_flg: {
        type: String,
        require: true
      },
    },
    methods:{
      close() {
        EventBus.$emit('update_visible')
      },

    },
  }
</script>

<style scoped>
  /* File Folder Info */
  .file_folder_info {
    display: block;
  }

  .file_folder_info .ffi_cont .ffi_detail {
    display: block;
  }

  .file_folder_info .ffi_cont .ffi_version {
    display: block;
  }

  .file_folder_info.none_tabMenu .ffi_navi {
    display: block;
  }


</style>

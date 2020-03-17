<template>
  <div>
    <div class="file_folder_info none_category_navi" v-show="visible" ref="file_folder_info">
      <ul class="ffi_navi">
        <li><a href="#" :class="{active: currentTab == 'detail'}"
               @click="currentInfo.currentTab = 'detail'">자세한사항</a></li>
        <li><a href="#" :class="{active: currentTab == 'version'}"
               @click="currentInfo.currentTab = 'version'">버전 표시</a></li>
      </ul>
      <div class="ffi_cont">
        <div class="ffi_detail" v-show="currentTab == 'detail'">
          <h3><img src="@/assets/images/sub/ico_ft_photo.png" alt="" class="ico"/>{{detail_info.fi_name}}</h3>
          <!-- <h3><img src="@/assets/images/ico_ft_folder.png" alt="" />백업파일 123</h3>
          <h3><img src="@/assets/images/ico_ft_document.png" alt="" />백업파일 123.doc</h3>
          <h3><img src="@/assets/images/ico_ft_video.png" alt="" />백업파일 123.avi</h3>
          <h3><img src="@/assets/images/ico_ft_etc.png" alt="" />백업파일 123.dwg</h3> -->
          <div class="screen_shot">
            <img src="@/assets/images/sub/temp_photo2.png" alt="" class="photo"/>
            <!--<img src="@/assets/images/sub/preview_ft_folder.png" alt="" class="none_photo" />
            <img src="@/assets/images/sub/preview_ft_document.png" alt="" class="none_photo" />
            <img src="@/assets/images/sub/preview_ft_video.png" alt="" class="none_photo" />
            <img src="@/assets/images/sub/preview_ft_etc.png" alt="" class="none_photo" />-->
          </div>
          <ul class="menu">
            <li><a href="#"><img src="@/assets/images/sub/btn_ffi_download.png" alt="Download"/></a>
            </li>
            <li><a href="#"><img src="@/assets/images/sub/btn_ffi_share.png" alt="Share"/></a></li>
            <li><a href="#"><img src="@/assets/images/sub/btn_ffi_delete.png" alt="Delete"/></a></li>
          </ul>
          <ul class="info">
            <li><strong class="category">종류</strong><span class="field">기타</span></li>
            <li><strong class="category">사이즈</strong><span class="field">{{ formatFileSize(detail_info.fi_file_size) }}</span></li>
            <!--  2020/1/13 내부 협의로 장소는 필요없다고 하여 삭제           -->
<!--            <li><strong class="category">장소</strong><span class="field"> google</span></li>-->
            <li><strong class="category">변경일</strong><span class="field">{{ fmtDate(detail_info.fi_modifydate)}}</span></li>
            <li><strong class="category">작성일</strong><span class="field">{{ fmtDate(detail_info.fi_createdate)}}</span>
            </li>
            <li><strong class="category">백업일</strong><span class="field">{{ fmtDate(detail_info.fi_backupdate)}}</span>
            </li>
            <li><strong class="category">단말</strong><span class="field">GoogleDrive</span></li>
          </ul>
        </div>
        <div class="ffi_version" v-show="currentTab == 'version'">
          <h3 class="hidden_cont">버전표시</h3>
          <ul class="histroy">
            <li>
              <h4>9월 6일 오후 03:15:24</h4>
              <ul>
                <li>이름 : 08-23일.txt</li>
                <li>사이즈 : 1.28KB</li>
                <li>종류 : 일반적인 스토리지</li>
              </ul>
              <div class="menu">
                <button type="button"><img src="@/assets/images/sub/btn_ffi_download.png"
                                           alt="Download"/></button>
                <button type="button"><img src="@/assets/images/sub/btn_ffi_delete.png"
                                           alt="Delete"/></button>
              </div>
            </li>
            <li>
              <h4>9월 6일 오후 03:15:24</h4>
              <ul>
                <li>이름 : 08-23일.txt</li>
                <li>사이즈 : 1.28KB</li>
                <li>종류 : 일반적인 스토리지</li>
              </ul>
              <div class="menu">
                <button type="button"><img src="@/assets/images/sub/btn_ffi_download.png"
                                           alt="Download"/></button>
                <button type="button"><img src="@/assets/images/sub/btn_ffi_delete.png"
                                           alt="Delete"/></button>
              </div>
            </li>
            <li>
              <h4>9월 6일 오후 03:15:24</h4>
              <ul>
                <li>이름 : 08-23일.txt</li>
                <li>사이즈 : 1.28KB</li>
                <li>종류 : 일반적인 스토리지</li>
              </ul>
              <div class="menu">
                <button type="button"><img src="@/assets/images/sub/btn_ffi_download.png"
                                           alt="Download"/></button>
                <button type="button"><img src="@/assets/images/sub/btn_ffi_delete.png"
                                           alt="Delete"/></button>
              </div>
            </li>
            <li>
              <h4>9월 6일 이전 기록된 활동 없음</h4>
            </li>
          </ul>
        </div>
      </div>
      <button type="button" class="btn_close" @click="visible = false">
        <img src="@/assets/images/component/btn_popup_close.png" alt="Close"/>
      </button>
    </div>

  </div>
</template>

<script>

  import {contentMixin} from '../../common/contentMixin'

  export default {
    name: "detail_info",
    mixins: [contentMixin],

    props: {
      visible: {
        type: Boolean,
        require: true,
        default: false
      },
      currentTab: {
        type: String,
        require: true,
        default: 'detail'
      },
      file_name: {
        type: String,
        require: true,
        default: ''
      },
      detail_info: {
        type: Object,
        require: true
      },

    },
    mounted() {
      console.log("detail_info======", this.detail_info)
    }


  }
</script>

<style scoped>

</style>

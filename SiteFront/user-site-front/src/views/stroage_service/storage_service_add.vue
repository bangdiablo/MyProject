<!--    메인 표시되는 화면은 폴더명 == 파일명으로 사용바랍니다.            -->
<template>
  <!-- 스토리지 서비스 추가 -->
  <div class="layer_popup" style="display:block">
    <h3>스토리지 서비스 추가</h3>
    <div class="storage_connect_info">
      <!--      <h4><img src="@/assets/images/sub/ico_sci_dropbox.png" alt="" class="ico"/>DropBox-->
      <!--        <time datetime="2018-03-20 09:10">2018.03.20 오전 09:10 연결됨</time>-->
      <!--        <button type="button" class="btn_disconnect">연결해제</button>-->
      <!--      </h4>-->
      <!--      <div class="account_current">-->
      <!--        <h5>gilding@aoskorea.co.kr</h5>-->
      <!--        <div class="ac_stats">-->
      <!--          <h6>전체 0% 사용 (1.0MB / 2.0GB)</h6>-->
      <!--          <div class="range">-->
      <!--            <span class="bar photo" style="width:20%">사진</span>-->
      <!--            <span class="bar document" style="width:10%">문서</span>-->
      <!--            <span class="bar audio" style="width:10%">오디오</span>-->
      <!--            <span class="bar video" style="width:10%">동영상</span>-->
      <!--            <span class="bar etc" style="width:10%">기타</span>-->
      <!--            <span class="bar recycle" style="width:30%">휴지통</span>-->
      <!--          </div>-->
      <!--          <ul>-->
      <!--            <li><i class="photo"></i>사진 : 0% (0개/0KB)</li>-->
      <!--            <li><i class="audio"></i>오디오 : 0% (0개/0KB)</li>-->
      <!--            <li><i class="document"></i>문서 : 0% (0개/0KB)</li>-->
      <!--            <li><i class="video"></i>동영상 : 0% (0개/0KB)</li>-->
      <!--            <li><i class="etc"></i>기타 : 0% (0개/0KB)</li>-->
      <!--            <li><i class="recycle"></i>휴지통 : 0% (0개/0KB)-->
      <!--              <button class="btn_move">이동</button>-->
      <!--              Dropbox는 휴지통 용량을 표시하지 않습니다.-->
      <!--            </li>-->
      <!--          </ul>-->
      <!--        </div>-->
      <!--      </div>-->
      <div v-if="stroage_service_info.google_drive">
        <h4><img src="@/assets/images/sub/ico_sci_google.png" alt="" class="ico"/>Google Drive
          <time datetime="2018-03-20 09:10">{{ fmtDate(google_info.create_date) }} 연결됨</time>
          <button type="button" class="btn_disconnect" :disabled="google_info.btn_disconnect"
                  @click="disconnected_google_drive">연결해제
          </button>
          </time></h4>
        <div class="account_current">
          <h5>{{google_info.owner_email}}</h5>
          <div class="ac_stats">
            <h6>전체 0% 사용 (1.0MB / 2.0GB)</h6>
            <div class="range">
              <span class="bar photo" style="width:20%">사진</span>
              <span class="bar document" style="width:10%">문서</span>
              <span class="bar audio" style="width:10%">오디오</span>
              <span class="bar video" style="width:10%">동영상</span>
              <span class="bar etc" style="width:10%">기타</span>
              <span class="bar recycle" style="width:30%">휴지통</span>
            </div>
            <ul>
              <li><i class="photo"></i>사진 : 0% (0개/0KB)</li>
              <li><i class="audio"></i>오디오 : 0% (0개/0KB)</li>
              <li><i class="document"></i>문서 : 0% (0개/0KB)</li>
              <li><i class="video"></i>동영상 : 0% (0개/0KB)</li>
              <li><i class="etc"></i>기타 : 0% (0개/0KB)</li>
              <li><i class="recycle"></i>휴지통 : 0% (0개/0KB)
                <button class="btn_move">이동</button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!--      <h4><img src="@/assets/images/sub/ico_sci_onedrive.png" alt="" class="ico"/>OneDrive-->
      <!--        <time datetime="2018-03-20 09:10">2018.03.20 오전 09:10 연결됨</time>-->
      <!--        <button type="button" class="btn_disconnect">연결해제</button>-->
      <!--      </h4>-->
      <!--      <div class="account_current">-->
      <!--        <h5>gilding@aoskorea.co.kr</h5>-->
      <!--        <div class="ac_stats">-->
      <!--          <h6>전체 0% 사용 (1.0MB / 2.0GB)</h6>-->
      <!--          <div class="range">-->
      <!--            <span class="bar photo" style="width:20%">사진</span>-->
      <!--            <span class="bar document" style="width:10%">문서</span>-->
      <!--            <span class="bar audio" style="width:10%">오디오</span>-->
      <!--            <span class="bar video" style="width:10%">동영상</span>-->
      <!--            <span class="bar etc" style="width:10%">기타</span>-->
      <!--            <span class="bar recycle" style="width:30%">휴지통</span>-->
      <!--          </div>-->
      <!--          <ul>-->
      <!--            <li><i class="photo"></i>사진 : 0% (0개/0KB)</li>-->
      <!--            <li><i class="audio"></i>오디오 : 0% (0개/0KB)</li>-->
      <!--            <li><i class="document"></i>문서 : 0% (0개/0KB)</li>-->
      <!--            <li><i class="video"></i>동영상 : 0% (0개/0KB)</li>-->
      <!--            <li><i class="etc"></i>기타 : 0% (0개/0KB)</li>-->
      <!--            <li><i class="recycle"></i>휴지통 : 0% (0개/0KB)-->
      <!--              <button class="btn_move">이동</button>-->
      <!--            </li>-->
      <!--          </ul>-->
      <!--        </div>-->
      <!--      </div>-->


      <!--      <h4><img src="@/assets/images/sub/ico_sci_box.png" alt="" class="ico"/>Box-->
      <!--        <time datetime="2018-03-20 09:10">2018.03.20 오전 09:10 연결됨</time>-->
      <!--        <button type="button" class="btn_disconnect">연결해제</button>-->
      <!--      </h4>-->
      <!--      <div class="account_current">-->
      <!--        <h5>gilding@aoskorea.co.kr</h5>-->
      <!--        <div class="ac_stats">-->
      <!--          <h6>전체 0% 사용 (1.0MB / 2.0GB)</h6>-->
      <!--          <div class="range">-->
      <!--            <span class="bar photo" style="width:20%">사진</span>-->
      <!--            <span class="bar document" style="width:10%">문서</span>-->
      <!--            <span class="bar audio" style="width:10%">오디오</span>-->
      <!--            <span class="bar video" style="width:10%">동영상</span>-->
      <!--            <span class="bar etc" style="width:10%">기타</span>-->
      <!--            <span class="bar recycle" style="width:30%">휴지통</span>-->
      <!--          </div>-->
      <!--          <ul>-->
      <!--            <li><i class="photo"></i>사진 : 0% (0개/0KB)</li>-->
      <!--            <li><i class="audio"></i>오디오 : 0% (0개/0KB)</li>-->
      <!--            <li><i class="document"></i>문서 : 0% (0개/0KB)</li>-->
      <!--            <li><i class="video"></i>동영상 : 0% (0개/0KB)</li>-->
      <!--            <li><i class="etc"></i>기타 : 0% (0개/0KB)</li>-->
      <!--            <li><i class="recycle"></i>휴지통 : 0% (0개/0KB)-->
      <!--              <button class="btn_move">이동</button>-->
      <!--            </li>-->
      <!--          </ul>-->
      <!--        </div>-->
      <!--      </div>-->

    </div>
    <ul class="storage_account_connect">
      <li><img src="@/assets/images/sub/ico_sci_dropbox.png" alt="" class="ico"/>Dropbox
        <button type="button">계정연결</button>
      </li>
      <li><img src="@/assets/images/sub/ico_sci_google.png" alt="" class="ico"/>Google Drive
        <button type="button" @click="GetAuth" :disabled="google_info.btn_connect">계정연결</button>
      </li>
      <li><img src="@/assets/images/sub/ico_sci_onedrive.png" alt="" class="ico"/>OneDrive
        <button type="button">계정연결</button>
      </li>
      <li><img src="@/assets/images/sub/ico_sci_box.png" alt="" class="ico"/>Box
        <button type="button">계정연결</button>
      </li>
    </ul>
    <div class="btn_set">
      <div class="right">
        <button type="button" class="btn_basic cancel" @click="popupClose">취소</button>
        <button type="button" class="btn_basic submit">확인</button>
      </div>
    </div>
    <button class="btn_close" @click="popupClose"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기"/>
    </button>

  </div>
</template>

<script>

  import {mapMutations} from 'vuex'
  import {contentMixin} from '../../common/contentMixin'

  export default {
    mixins: [contentMixin],

    data() {
      return {

        get_storage_service: {},
        google_info: {
          btn_connect: false,
          btn_disconnect: true,
          create_date: '',
          owner_email: ''
        }
      }
    },


    computed: {
      stroage_service_info: function () {
        return this.$store.state.storage_service.storage_service;
      },
    },
    mounted() {

      // storage_service 연결 유무에 따라 해당하는 정보 가져오기
      if (this.stroage_service_info.google_drive == true) {
        this.get_storage_service['google_drive'] = true
        this.google_info.btn_connect = !this.google_info.btn_connect
        this.google_info.btn_disconnect = !this.google_info.btn_disconnect
      }
      var storage_service = this.get_storage_service
      var qs = require('qs');
      if (Object.keys(storage_service).length > 0) {
        axios.post("/storage_service/get_storage_service/", {
            storage: storage_service
          }
        ).then(response => {

          console.log("moutend_==============>", response)
          this.google_info.create_date = response.data.data.google_drive_settings.createdate
          this.google_info.owner_email = response.data.data.google_drive_settings.email

        }).catch(error => {
          console.log(error)
        });

      }


    },
    methods: {
      data() {
        return {}
      },
      popupClose() {
        this.$emit('close')
      },
      GetAuth() {
        this.$gAuth.getAuthCode()
          .then(authCode => {
            this.popupClose();
            this.$store.state.loading = true;

            console.log("authCode", authCode)

            axios.post("/storage_service/connect_to_google_drive/", {
                code: authCode,
                redirect_uri: 'postmessage'
              }
            ).then(response => {
              console.log("response=========>", response)
              this.$router.push('/storage_service/googledrive/')
              var storage_service = response.data.data.storage_service
              this.$store.commit('storage_service/set_storage_service_google_drive_to_true', storage_service)
            }).catch(error => {
              console.log(error)
            });
          })
      },
      disconnected_google_drive() {
        axios.post("/storage_service/disconnected_google_drive/", {
          }
        ).then(response => {

        }).catch(error => {
          console.log(error)
        });

      }
    }
  }
</script>

<style>
  .layer_popup {
    display: block;
  }

  .modal_bg {
    display: block;
  }

  .layer_popup .storage_connect_info h4 button.btn_disconnect {
    color: #0f0f0f;
  }


</style>

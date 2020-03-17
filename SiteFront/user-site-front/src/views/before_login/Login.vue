<!--    메인 표시되는 화면은 폴더명 == 파일명으로 사용바랍니다.            -->
<template>
  <div id="member_container">
    <section id="member_info">
      <before-login-header/>
      <div class="member_form">
        <h2>{{$t('before_login.button_login')}}</h2>
        <div class="visual">
          <img src="@/assets/images/member/visual_login.png" alt=""/>
        </div>
        <fieldset>
          <legend>로그인정보 입력</legend>
          <p class="field">
            <label for="memberId">{{ $t('before_login.input_email') }}</label>
            <input type="text" :placeholder="$t('before_login.input_email')" id="memberId"
                   :class="{'has-value':valid.email['has-value'], 'has-error':valid.email['has-error']}" v-model="email"
                   @change="checkEmail"/>
            <span class="input-image green" v-if="validEmail">{{ $t('common.comment.valid') }}</span>
          </p>
          <div class="input-error">
            <span class="red" ref="commentToEmail"></span>
          </div>

          <p class="field">
            <label for="memberPw">{{ $t('before_login.input_password') }}</label>
            <input type="password" :placeholder="$t('before_login.input_password')" id="memberPw"
                   :class="{'has-value':valid.password['has-value'], 'has-error':valid.password['has-error']}"
                   v-model="password" @keyup.enter="onLogin" @change="checkPassword"/>
            <span class="input-image green" v-if="validPassword">{{ $t('common.comment.valid') }}</span>
          </p>
          <div class="input-error">
            <span class="red" ref="commentToPassword"></span>
          </div>

          <p class="save_login_info">
            <label><input type="checkbox" v-model="remember"/>{{ $t('before_login.checkbox_memory') }}</label>
          </p>
          <p class="error_msg red" v-if="invalidEmailOrPassword">{{ failLoginMessage }}</p>
          <p class="btn_set">
            <button type="button" @click="onLogin" ref="btnLogin">{{$t('before_login.button_login')}}
            </button>
          </p>
          <p class="find_password">
            {{ $t('before_login.msg_password') }}
            <router-link to="/before_login/findPassword">{{ $t('before_login.msg_click') }}</router-link>
          </p>
        </fieldset>
      </div>
      <before-login-footer/>
    </section>
  </div>
</template>

<script>
  import constants from '../../plugins/constants'
  import before_login_header from '../../components/header/before_login_header'
  import before_login_footer from '../../components/footer/before_login_footer'
  import sjcl from 'sjcl'


  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: '',
        remember: false,
        language: 'KO',
        valid: {
          email: {
            'has-value': false,
            'has-error': false
          },
          password: {
            'has-value': false,
            'has-error': false
          }
        },
        invalidEmailOrPassword: false,
        encryptPassword: 'legaltech',
        failLoginMessage: this.$t('common.comment.invalidEmail')
      }
    },
    computed: {
      validEmail() {

        return this.valid.email['has-value'] && !this.valid.email['has-error'];
      },
      validPassword() {

        return this.valid.password['has-value'] && !this.valid.password['has-error'];
      }
    },
    components: {
      'before-login-header': before_login_header,
      'before-login-footer': before_login_footer,
    },
    methods: {
      onLogin() {

        this.checkEmail();
        this.checkPassword();

        if (this.validEmail && this.validPassword) {

          // 기억하기 시, 쿠키 생성
          if (this.remember) {

            this.$cookies.set("cvv_t", sjcl.encrypt(this.encryptPassword, this.email), Infinity);

          } else {

            this.$cookies.remove("cvv_t");
          }

          // 로그인 시도
          let qs = require('qs');

          axios.post('/before_login/login/',
            // qs.stringify(
                  {
              'email': this.email,
              'password': this.password,
              'language': this.language

             }
             //)
        ).then(result => {
            // request.getResponseHeader('some_header')

            let data = result.data;

            console.log("data====>", data)

            // 성공 시
            if (data.code == 1000) {

              this.$store.dispatch('main/setAdmin', data.isAdmin);    // 관리자 여부 설정

              var storage_service = data.storage_service

              this.$store.commit('storage_service/set_storage_service_google_drive_to_true', storage_service)

              this.$router.push('/');                                 // 메인화면 이동

            // 2단계 인증 시
            } else if (data.code == 'secondCertification') {

              this.$router.push({name: 'authen', params:{ 'userId': data.userId, userName: data.userName}});

              // 실패 시
            } else {

              // 비활성화 유저 (-2002)
              if (data.code == -2002) {

                this.failLoginMessage = this.$t('common.comment.failToLogin_inactive');

              } else {

                this.failLoginMessage = this.$t('common.comment.failToLogin');
              }

              this.invalidEmailOrPassword = true;
            }

          }).catch(ex => {
            console.log(ex);
          });
        }
      },

      // check email adress
      checkEmail() {

        let comment = "";

        // email이 비어있는지 확인
        if (this.email == "") {

          comment = this.$t('common.comment.essential');
          this.valid.email["has-error"] = true;

          // email이 유효한지 확인
        } else if (!checkValidEmail(this.email)) {

          comment = this.$t('common.comment.invalidEmail');
          this.valid.email["has-error"] = true;

        } else {

          this.valid.email["has-error"] = false;
        }

        this.valid.email["has-value"] = true;
        this.$refs.commentToEmail.innerHTML = "";

        if (this.valid.email["has-error"]) {

          this.$refs.commentToEmail.innerHTML = comment;
        }
      },

      // check password
      checkPassword() {

        let comment = "";

        // password가 비어있는지 확인
        if (this.password == "") {

          comment = this.$t('common.comment.essential');
          this.valid.password["has-error"] = true;

          // password가 6자리 이상인지 확인
        } else if (this.password.length < 6) {

          comment = this.$t('common.comment.tooShortPassword');
          this.valid.password["has-error"] = true;

        } else {

          this.valid.password["has-error"] = false;
        }

        this.valid.password["has-value"] = true;
        this.$refs.commentToPassword.innerHTML = "";

        if (this.valid.password["has-error"]) {

          this.$refs.commentToPassword.innerHTML = comment;
        }
      }
    },
    mounted() {

      // TEST 계정
      if (constants.TEST) {
        this.email = 'test02@test.com';
        this.password = '1234';
      }

      // if (this.email == '' || this.password == '') {
      //     this.$refs.btnLogin.style.backgroundColor = '#585858';
      //     this.$refs.btnLogin.disabled = true;
      // } else {
      //     this.$refs.btnLogin.style.backgroundColor = '#53A9E4';
      //     this.$refs.btnLogin.disabled = false;
      // }

      console.log(this.$i18n.locale)

      // let ciphertext = sjcl.encrypt("legaltech", "Hello World!")

      // console.log(ciphertext)
      // console.log(plaintext)

      // 이메일, 기억하기 세팅
      let cvv_t = this.$cookies.get("cvv_t");

      if (cvv_t != undefined) {

        this.email = sjcl.decrypt(this.encryptPassword, JSON.stringify(cvv_t));
        this.remember = true;
        this.checkEmail();
      }
    }
  }
</script>
<style scoped>

</style>

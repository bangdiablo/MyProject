<!--    메인 표시되는 화면은 폴더명 == 파일명으로 사용바랍니다.            -->
<template>
    <div id="member_container">
        <section id="member_info">
            <before-login-header/>
            <div class="member_form">
                <h2>{{$t('find_password.title')}}</h2>
                <div class="visual">
                    <img src="@/assets/images/member/visual_login.png" alt=""/>
                </div>
                <p class="ask_msg">
                    {{ $t('find_password.subTitle1') }}<br />
                    {{ $t('find_password.subTitle2') }}
                </p>

                <fieldset>
                    <legend>이메일 입력</legend>
                    <p class="field">
                        <label for="findEmail">{{ $t('find_password.text_email') }}</label>
                        <input type="text" :placeholder="$t('find_password.text_email')" v-model="email" id="findEmail" :class="{'has-value':valid.email['has-value'], 'has-error':valid.email['has-error']}" @keyup.enter="sendEmail"/>
                        <span class="input-image green" v-if="validEmail">{{ $t('common.comment.valid') }}</span>
                    </p>
                    <p class="error_msg red" v-show="invalidEmail" ref="commentToEmail">유효한 메일 주소를 입력하세요.</p>
                    <p class="btn_set">
                        <button type="button" @click="sendEmail" ref="btnSend">{{$t('find_password.button_send')}}</button>
                    </p>
                </fieldset>
            </div>
            <before-login-footer/>
        </section>
    </div>
</template>

<script>
    import {commonMethodsMixin} from '../../common/commonMethodsMixin'
    import before_login_header from '../../components/header/before_login_header'
    import before_login_footer from '../../components/footer/before_login_footer'

    export default {
        name: 'Login',
        mixins: [commonMethodsMixin],
        data() {
            return {
                email: '',
                valid : {
                    email: {
                        'has-value': false,
                        'has-error': false
                    }
                },
                invalidEmail : false
            }
        },
        computed: {
            validEmail () {

                return this.valid.email['has-value'] && !this.valid.email['has-error'];
            }
        },
        components: {
            'before-login-header': before_login_header,
            'before-login-footer': before_login_footer,
        },
        methods: {

            // attempt to find email
            sendEmail() {

                this.checkEmailForm();
                console.log(this.validEmail)

                if (this.validEmail) {
                    
                    // 입력한 메일 주소를 가지는 계정이 있는지 확인
                    axios.post('/before_login/sendEmailToResetPassword/', {
                            'email': this.email,
                            'langType': this.$store.state.main.langType
                        }).then(result => {

                            let data = result.data;

                            if (data.code == 1000) {

                                alert(this.$t('common.comment.checkYourEmail'));
                                this.$router.push('/before_login/login');

                            } else {

                                this.invalidEmail = true;

                                // 비활성화 유저 (-2002)
                                if (data.code == -2002) {

                                    this.$refs.commentToEmail.innerHTML = this.$t('common.comment.failToLogin_inactive');

                                } else {

                                    this.$refs.commentToEmail.innerHTML = this.$t('common.comment.noExistEmail');
                                }

                            }

                            console.log(data);

                        }).catch(ex => {

                            alert(ex);
                        });
                }
            },

            // 이메일 형식 검사 (비었는지 or 형태)
            checkEmailForm() {

                let comment = "";

                // email이 비어있는지 확인
                if (this.email == "") {

                    comment = this.$t('common.comment.essential');
                    this.valid.email["has-error"] = true;
                    this.invalidEmail = true;

                // email이 유효한지 확인
                } else if (!checkValidEmail(this.email)) {

                    comment = this.$t('common.comment.invalidEmail');
                    this.valid.email["has-error"] = true;
                    this.invalidEmail = true;

                } else {

                    this.valid.email["has-error"] = false;
                    this.invalidEmail = false;
                }

                this.valid.email["has-value"] = true;

                if (this.invalidEmail == true) {

                    this.$refs.commentToEmail.innerHTML = "";
                }

                if (this.valid.email["has-error"]) {

                    this.$refs.commentToEmail.innerHTML = comment;
                }
            }
        }
    }
</script>
<style>
</style>

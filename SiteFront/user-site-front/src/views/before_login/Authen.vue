<!--    메인 표시되는 화면은 폴더명 == 파일명으로 사용바랍니다.            -->
<template>
    <div id="member_container">
        <section id="member_info">
            <before-login-header/>
            <div class="member_form">
                <h2>2단계 인증</h2>
                <div class="visual">
                    <img src="@/assets/images/member/visual_authen.png" alt="" />
                </div>
                <p class="ask_msg">
                    <strong>{{userName}}님</strong><br>
                    계정에 로그인하려면<br>
                    2단계 인증 코드를 입력하십시오.
                </p>
                <fieldset>
                    <legend>인증 정보 입력</legend>
                    <p class="field"><label for="findEmail">2단계 인증 코드 :</label><input type="text" placeholder="2단계 인증 코드" v-model="verificationCode" id="findEmail" /></p>
                    <p class="error_msg" v-show="error">{{errorMessage}}</p>
                    <p class="btn_set"><button type="button" @click="submit">제출</button></p>
                    <p class="find_password">권한 부여 코드를 입력하는 데 문제가 있습니까?<br /><a href="#">백업 코드 입력</a></p>
                </fieldset>
            </div>
            <before-login-footer/>
        </section>
    </div>
</template>

<script>

    import before_login_header from '../../components/header/before_login_header'
    import before_login_footer from '../../components/footer/before_login_footer'

    export default {
        name: 'authen',
        data() {
            return {
                language: 'KO',
                userId : '',
                userName: '',
                verificationCode: '',
                error: false,
                errorMessage: ''
            }
        },
        computed: {

        },
        components: {
            'before-login-header': before_login_header,
            'before-login-footer': before_login_footer,
        },
        methods: {
            submit() {

                let userId = this.userId,
                    verificationCode = this.verificationCode;

                if (verificationCode.trim() === '') {

                    this.error = true;
                    this.errorMessage = '인증 코드를 입력하세요.';
                    return;
                }

                axios.post('/before_login/secondCertification/',{
                    userId: userId,
                    verificationCode: verificationCode,
                    language: this.language
                }).then(response => {

                    console.log(this)
                    let data = response.data;

                    if (data.code == 1000) {

                        let storage_service = data.storage_service;
                        this.$store.dispatch('main/setAdmin', data.isAdmin);    // 관리자 여부 설정
                        this.$store.commit('storage_service/set_storage_service_google_drive_to_true', storage_service)
                        this.$router.push('/');                                 // 메인화면 이동

                    } else {

                        this.error = true;
                        this.errorMessage = '인증 코드가 올바르지 않습니다.';
                        return;
                    }

                }).catch(ex => {

                    console.log(ex);
                });
            }
        },
        created() {

            this.userId = this.$route.params.userId;
            this.userName = this.$route.params.userName;

            if (this.userId == undefined) {
                alert("잘못된 접근입니다.");
                this.$router.push('/before_login/login');
            }
        }
    }

</script>

<style>
</style>

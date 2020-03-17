<!--    메인 표시되는 화면은 폴더명 == 파일명으로 사용바랍니다.            -->
<template>
    <div id="member_container">
        <section id="member_info">
            <before-login-header/>
            <div class="member_form">
                <h2>비밀번호 변경</h2>
                <div class="visual">
                    <img src="@/assets/images/member/visual_login.png" alt="" />
                </div>
                <p class="ask_msg">
                    새 비밀번호를 입력하세요.
                </p>
                <fieldset>
                    <legend>정보 입력</legend>
                    <p class="field"><input type="text" placeholder="이메일 주소" v-model="email" disabled/></p>
                    <p class="field"><input type="password" placeholder="비밀번호" v-model="password" /></p>
                    <p class="field"><input type="password" placeholder="비밀번호 확인" v-model="rePassword" /></p>
                    <p class="error_msg" v-show="error">{{errorMessage}}</p>
                    <p class="btn_set"><button type="button" @click="send">보내기</button></p>
                </fieldset>
            </div>
            <before-login-footer/>
        </section>
    </div>
</template>

<script>
    import BeforeLoginHeader from '../../components/common/BeforeLoginHeader'
    import BeforeLoginFooter from '../../components/common/BeforeLoginFooter'

    export default {
        data() {
            return {
                k: '',
                email: '',
                password: '',
                rePassword: '',
                error: false,
                errorMessage: '비밀번호가 일치하지 않습니다.'
            }
        },
        components: {
            BeforeLoginHeader,
            BeforeLoginFooter,
        },
        methods: {

            check(keyword) {

                let result = false;

                switch (keyword) {

                    case 'email':
                        result = this.checkEmail();
                        break;

                    case 'password':
                        result = this.checkPassword();
                        break;

                    case 'rePassword':
                        result = this.checkRePassword();
                        break;
                }

                return result;
            },

            checkEmail() {

                let email = this.email,
                    message = "이메일 주소를 올바르게 입력해주세요.";

                if (!validEmail(email)) {

                    if (email.trim() == '')
                        message = '이메일 주소를 입력해주세요.'

                    this.showError(true, message);
                    return false;
                }

                return true;
            },

            checkPassword() {

                let password = this.password.trim(),
                    message = '';

                if (password == '') {

                    message = '비밀번호를 입력해주세요.';
                    this.showError(true, message);
                    return false;
                }

                if (password.length < 6) {

                    message = '비밀번호는 6자 이상이어야 합니다.';
                    this.showError(true, message);
                    return false;
                }

                return true;
            },

            checkRePassword() {

                let rePassword = this.rePassword.trim(),
                    message = '비밀번호 확인을 입력해주세요.';

                if (rePassword == '') {

                    this.showError(true, message);
                    return false;
                }

                if (this.password.trim() != this.rePassword.trim()) {

                    message = '비밀번호와 비밀번호 확인이 같지 않습니다.';
                    this.showError(true, message);
                    return false;
                }

                return true;
            },

            showError(show, message = '') {

                this.error = show;
                this.errorMessage = message;
            },

            // 보내기
            send() {

                if (!this.check('email')) return;
                if (!this.check('password')) return;
                if (!this.check('rePassword')) return;

                axios.post("/before_login/resetPassword/", {
                    k: this.k,
                    email: this.email,
                    password: this.password,
                    rePassword: this.rePassword,
                }).then(response => {

                    let data = response.data,
                        message = '';

                    // 기존 비밀 번호와 같아도 됨
                    if (data.code === 1000) {

                        alert("비밀번호가 변경되었습니다. 로그인해주세요.");
                        this.$router.push("/before_login/login/");

                    } else {

                        console.log(data);

                        // WRONG_PASSWORD
                        if (data.code === -2001) {

                            message = "비밀번호는 6자 이상이어야 합니다.";

                        // WRONG_RE_PASSWORD
                        } else if (data.code === -2004)  {

                            message = '비밀번호와 비밀번호 확인이 같지 않습니다.';

                        // NO_AUTHORITY
                        } else if (data.code === -4001)  {

                            message = "본인의 이메일 주소를 입력해주세요.";

                        // NO_EXIST_USER
                        } else if (data.code === -2014)  {

                            message = "존재하지 않는 이메일 주소입니다.";

                        // IMPROPER_MAIL_LINK
                        } else if (data.code === -7003)  {

                            this.$router.push("/pageNotFound");
                        }

                        this.showError(true, message);
                    }

                }).catch(ex => {

                    console.log(ex);
                });
            }
        },
        created() {

            this.k = this.$route.query.k;

            // 유효한 링크인지 확인
            axios.post("/before_login/checkValidKey/", {
                kType: 'password',
                k: this.k
            }).then(response => {

                let data = response.data;

                if (data.code === 1000) {

                    this.email = data.email;

                } else {

                    this.$router.push('/pageNotFound');
                }

            }).catch(ex => {

                console.log(ex);
            });
        }
    }

    function validEmail(email) {

        let regex=/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

        return (email != '' && email != 'undefined' && regex.test(email));
    }
</script>

<style>
</style>

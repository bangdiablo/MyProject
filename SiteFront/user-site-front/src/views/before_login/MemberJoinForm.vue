<!--    메인 표시되는 화면은 폴더명 == 파일명으로 사용바랍니다.            -->
<template>
    <div id="member_container">
        <section id="member_info">
            <before-login-header/>
            <div class="member_form">
                <h2>회원가입</h2>

                <fieldset>
                    <legend>로그인정보 입력</legend>
                    <p class="field"><label for="findEmail">이름:</label><input type="text" v-model="user.name" ref="name" placeholder="이름"  @blur="checkField('name')"/></p>
                    <p class="field"><label for="findEmail">이메일 주소:</label><input type="text" v-model="user.email" ref="email" placeholder="이메일 주소" @blur="checkField('email')"/></p>
                    <p class="field"><label for="findEmail">비밀번호:</label><input type="password" v-model="user.password" ref="password" placeholder="비밀번호" @blur="checkField('password')"/></p>
                    <p class="field"><label for="findEmail">비밀번호 확인:</label><input type="password" v-model="user.rePassword" ref="rePassword" placeholder="비밀번호 확인" @blur="checkField('rePassword')"/></p>
                    <p class="field"><label for="findEmail">전화번호(임의):</label><input type="text" v-model="user.telNumber" ref="telNumber" placeholder="전화번호(임의)" /></p>
                    <p class="field"><label for="findEmail">라이센스 키:</label><input type="text" v-model="user.licenseKey" ref="licenseKey" placeholder="라이센스 키" /></p>
                    <p><input type="checkbox" v-model="user.checkAgree" title="선택">등록함으로써 당신은 이용약관,제품 사용 허락 계약 및 개인정보보호정책에 동의한 것으로 봅니다. </p>
                    <p class="error_msg" v-show="errorMessage.show">{{errorMessage.value}}</p>
                    <p class="btn_set"><button type="button" @click="clickRegistButton">등록</button></p>
                    <p class="find_password">이미 계정을 가지고 있는 경우 <router-link to="/before_login/login">계정에 로그인</router-link></p>
                </fieldset>
            </div>
            <before-login-footer/>
        </section>
    </div>
</template>

<script>

    import before_login_header from '../../components/header/before_login_header'
    import before_login_footer from '../../components/footer/before_login_footer'

    let isExecutedGrecaptcha = false,
        intervalGrecaptcha,
        _token;

    export default {
        data() {
            return {
                user : {
					name: 		'',     // 이름
					email: 		'',     // 메일주소
					password: 	'',     // 비밀번호
					rePassword: '',   	// 비밀번호 확인
                    telNumber:  '',     // 전화번호
                    licenseKey: '',     // 라이센스 키,
                    checkAgree: false,  // 동의 체크
				},
                errorMessage: {
                    value: '',
                    show: false
                }
            }
        },
        computed: {

        },
        components: {
            'before-login-header': before_login_header,
            'before-login-footer': before_login_footer,
        },
        methods: {

            checkAllField() {

                let user = this.user,
                    validForm = false;

                for (let prop in user) {

                    if (prop === 'telNumber') continue;

                    validForm = this.checkField(prop);

                    if (!validForm) {

                        if (this.$refs[prop] !== undefined)
                            this.$refs[prop].focus();

                        break;
                    }
                }

                return validForm;
            },

            checkField(prop, callback) {

        		let value = this.user[prop],
					show = false,
					message;

        		// 항목이 비었는지 검사
				if (value === '' || value === false) {

				    show = true;

        			switch(prop) {

        				case 'name':
							message = "이름을 입력해주세요.";
							break;

						case 'email':
							message = "메일 주소를 입력해주세요.";
							break;

						case 'password':
							message = "비밀번호를 입력해주세요.";
							break;

						case 'rePassword':
							message = "비밀번호 확인을 입력해주세요.";
							break;

                        case 'licenseKey':
                            message = "라이센스 키를 입력해주세요.";
                            break;

                        case 'checkAgree':
                            message = "등록을 원하시면 개인정보보호정책에 동의해주세요.";
                            break;
					}

				} else {

				    show = false;

				    // 항목이 유효한지 검사
                    switch(prop) {

                        case 'email':
                            if (!validEmail(value)) {
                                message = "유효하지 않은 메일 주소입니다. 확인해주세요.";
                                show = true;
                            }
                            break;

                        case 'password':

                            if (value.length < 6) {

                                message = "6자리 이상으로 설정해주세요.";
                                show = true;

                            } else {

                                if (this.user.rePassword != '' && this.user.rePassword !== this.user.password) {

                                    message = "비밀번호가 일치하지 않습니다.";
                                    show = true;
                                }
                            }
                            break;

                        case 'rePassword':
                            if (this.user.rePassword != '' && this.user.rePassword !== this.user.password) {

                                message = "비밀번호가 일치하지 않습니다.";
                                show = true;
                            }
                            break;

                        case 'licenseKey':
                            break;
                    }
        		}

				this.errorMessage.value = message;
				this.errorMessage.show = show;

                return !show;
			},

            checkExistEmail() {

        		axios.post('/before_login/checkExistEmail/', {email: this.user.email}).then(result => {

                    if (result.data.code == 1000) {

                        // 라이센스 키 유효한지 검사
						this.checkLicenseKey();

                    } else {

						this.errorMessage.value = "사용할 수 없는 메일 주소입니다. 확인해주세요.";
						this.errorMessage.show = true;

					}

				}).catch(ex => {

					console.log(ex);
				});
			},

            checkLicenseKey() {

                axios.post('/before_login/checkLicenseKey/', {licenseKey: this.user.licenseKey}).then(result => {

					if (result.data.code == 1000) {

					    // reCaptcha 검사
						this.checkRecaptcha();

					} else {

						this.errorMessage.value = "유효하지 않은 라이센스 키입니다. 확인해주세요.";
						this.errorMessage.show = true;
					}

				}).catch(ex => {

					console.log(ex);
				});
            },

            checkRecaptcha() {

                axios.post("/before_login/checkRecaptcha/", {token: _token}).then(response => {

                    let data = response.data,
                        recaptchaResult = data.result;
                    console.log(recaptchaResult)
                    if (data.code === 1000) {

                        if (recaptchaResult.score > 0.5) {

                            // 회원 가입
                            this.joinMember();

                        } else {

                            this.errorMessage.value = "로봇일 가능성이 있습니다. 다시 시도해주세요.";
						    this.errorMessage.show = true;
                        }

                    } else {

						this.errorMessage.value = "reCaptcha에 오류가 있습니다. 다시 시도해주세요.";
						this.errorMessage.show = true;
					}

                }).catch(ex => {

                    console.log(ex);
                });
            },

            // 회원 가입
            joinMember() {

                // 등록
                axios.post('/before_login/registMemberWithLicenseKey/', this.user).then(result => {

                    let data = result.data,
                        code = data.code;

                    if (code === 1000) {

                        alert('유저 등록이 완료되었습니다.');
                        this.$router.push("/before_login/login");

                    } else if (code === -2005) {

                        alert("이미 존재하는 이메일입니다.");
                    }

                }).catch(ex => {

                    console.log(ex);
                });
            },

            // 등록 버튼 클릭
            clickRegistButton() {

                // 회원가입 양식 유효성 검사
                if (this.checkAllField())
                    this.checkExistEmail(); // 존재하는 이메일인지 확인
            },
        },
        created() {

            // key가 유효한지 확인. 유효하지 않을 경우, error page로 이동
            let k = this.$route.query.k;

            if (k == undefined) {

                this.$router.push('/pageNotFound');

            } else {

                axios.post("/management/checkEmailKey/", {k: k}).then(response => {

                    let data = response.data;

                    if (data.code !== 1000) {

                        this.$router.push('/pageNotFound');
                    }

                }).catch(ex => {

                    console.log(ex);
                });
            }

            let recaptchaScript = document.createElement('script');
            recaptchaScript.setAttribute('src', 'https://www.google.com/recaptcha/api.js?render=6LfkR9wUAAAAAPNEBWg4T-Al3ds98UWzEL_GFKbS');
            document.head.appendChild(recaptchaScript);
        },
        mounted() {

            let self = this;

            $(function () {

               intervalGrecaptcha = setInterval(executeGrecaptcha, 1000);
            });
        }
    }

    function executeGrecaptcha() {

        if (grecaptcha != undefined && !isExecutedGrecaptcha) {

            console.log("실행됨")
            isExecutedGrecaptcha = true;
            grecaptcha.ready(function() {

                grecaptcha.execute('6LfkR9wUAAAAAPNEBWg4T-Al3ds98UWzEL_GFKbS', {action: 'homepage'}).then(function(token) {

                    _token = token;
                });
            });

        } else {

            if (isExecutedGrecaptcha)
                clearInterval(intervalGrecaptcha);
        }
    }

    function validEmail(email) {

        let regex = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;

        return (email != '' && email != 'undefined' && regex.test(email));
    }
</script>

<style scoped>
.robot {
    padding: 10px 20px 20px 20px;
}
</style>

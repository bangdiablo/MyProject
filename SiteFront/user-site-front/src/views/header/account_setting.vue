<!-- 계정 설정 -->

<template>
    <article id="contents" class="sub" @keydown.esc="closeLayerPopup">
		<location/>

		<ul class="category_navi">
			<li><a href="#" :class="{active: activeTab == 'general'}" @click="changeActiveTab" data-active="general">일반</a></li>
			<li><a href="#" :class="{active: activeTab == 'security'}" @click="changeActiveTab" data-active="security">보안</a></li>
		</ul>
		<div class="content">

			<div v-show="activeTab == 'general'">
				<h3>기본사항</h3>
				<table class="board_view">
					<caption>기본사항</caption>
					<colgroup>
						<col style="width:200px" />
						<col style="width:*" />
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">이름</th>
							<td>{{userName}}<button type="button" class="btn_edit" @click="openLayerPopup('nameChangeLayer')">수정</button></td>
						</tr>
						<tr>
							<th scope="row">메일 주소</th>
							<td>{{email}} <button type="button" class="btn_edit" @click="openLayerPopup('emailChangeLayer')">수정</button></td>
						</tr>
                        <tr>
                            <th scope="row">언어 선택</th>
                            <td><span class="selected_language" :class="langClass">{{languageName}}</span> <button type="button" class="btn_edit" @click="openLayerPopup('selectLanguageLayer')">수정</button></td>
                            <!-- "span"태그 class 에 "kr","jp","us"로 아이콘 변경 -->
                        </tr>
					</tbody>
				</table>
				<h3 class="bottom_line">데이터 저장 장소</h3>
				<p><strong>Asia Pacific(Tokyo)</strong></p>
				<p>모든 데이터와 정보는 이 곳에 저장됩니다.</p>
			</div>

			<div v-show="activeTab == 'security'">
				<h3>비밀번호</h3>
                <table class="board_view">
                    <caption>비밀번호</caption>
                    <colgroup>
                        <col style="width:200px" />
                        <col style="width:*" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th scope="row">현재 비밀번호</th>
                            <td><button type="button" class="btn_edit" @click="openLayerPopup('passwordLayer')">수정</button></td>
                        </tr>
                    </tbody>
                </table>

				<h3 class="bottom_line">2단계 인증</h3>
				<p><input type="checkbox" style="position:relative; top:-2px;" @change="changeSecondCertificationLayer" ref="secondCertificationCheckbox"/><strong>2단계 인증 사용</strong></p>
				<p>로그인할 때마다 비밀번호 외에  6자리 보안 코드가 필요합니다.</p>

                <h3 class="bottom_line title_marginTop">관리자에게 파일 검색 허용</h3>
                <div class="file_search_status_wrap">
                    <span class="file_search_status">{{permitfileName}}</span>
                    <button type="button" class="btn_edit" @click="openLayerPopup('permitFileLayer')">수정</button>
                </div>
                <p>허용 시 업로드한 파일들을 관리자가 검색하여 볼 수 있습니다.</p>
			</div>
		</div>


        <!-- 메일 주소 변경 -->
        <div class="layer_popup" ref="emailChangeLayer">
            <h3>메일 주소 변경</h3>
            <fieldset class="write_form">
                <legend>메일 주소 변경</legend>
                <p>
			<span class="category">
				<label for="chMailAddress">메일 주소</label>
			</span>
                    <span class="field">
				<input type="text" placeholder="" :value="email" id="chMailAddress" ref="userEmail" @keydown.enter="changeEmail"/>
			</span>
                </p>
            </fieldset>

            <div class="btn_set">
                <div class="right">
                    <button type="button" class="btn_basic cancel" @click="closeLayerPopup">취소</button>
                    <button type="button" class="btn_basic submit" @click="changeEmail">확인</button>
                </div>
            </div>
            <button class="btn_close" @click="closeLayerPopup"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
        </div>

        <!-- 이름 변경 -->
        <div class="layer_popup" ref="nameChangeLayer">
            <h3>이름 변경</h3>
            <fieldset class="write_form">
                <legend>이름 변경</legend>
                <p>
			<span class="category">
				<label for="chUserName">이름</label>
			</span>
                    <span class="field">
				<input type="text" placeholder="" :value="userName" id="chUserName" ref="userName" @keydown.enter="changeName"/>
			</span>
                </p>
            </fieldset>

            <div class="btn_set">
                <div class="right">
                    <button type="button" class="btn_basic cancel" @click="closeLayerPopup">취소</button>
                    <button type="button" class="btn_basic submit" @click="changeName">확인</button>
                </div>
            </div>
            <button class="btn_close" @click="closeLayerPopup"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
        </div>

        <!-- 언어 선택 -->
        <div class="layer_popup" ref="selectLanguageLayer">
            <h3>언어 선택</h3>
            <fieldset class="write_form width_auto">
                <legend>언어 선택</legend>
                <p>
                    <span class="category">
                        <label for="chMailAddress">언어 선택</label>
                    </span>
                    <span class="field">
                        <span class="basic_select selectbox_ui">
                            <b class="selected_txt"></b>
                            <select class="language" v-model="selectLanguageLayer.selectedLanguage">
                                <template v-if="this.language == 'KR'">
                                    <option value="KR" selected>한국어</option>
                                    <option value="JP">일본어</option>
                                    <option value="EN">영어</option>
                                </template>
                                <template v-else-if="this.language == 'JP'">
                                    <option value="KR" selected>韓国語</option>
                                    <option value="JP">日本語</option>
                                    <option value="EN">英語</option>
                                </template>
                                <template v-else-if="this.language == 'EN'">
                                    <option value="KR" selected>Korean</option>
                                    <option value="JP">Japanese</option>
                                    <option value="EN">English</option>
                                </template>
                            </select>
                        </span>
                    </span>
                </p>
            </fieldset>
            <div class="btn_set">
                <div class="right">
                    <button type="button" class="btn_basic cancel" @click="closeLayerPopup">취소</button>
                    <button type="button" class="btn_basic submit" @click="changeLanguage">확인</button>
                </div>
            </div>
            <button class="btn_close" @click="closeLayerPopup"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
        </div>

        <!-- 2단계 인증 -->
        <div class="layer_popup" style="display: none;">
            <h3>2단계 인증</h3>
            <div class="qrcode_area">
                <img src="@/assets/images/sub/sample_qrcode.png" alt="" />
                <!-- QR코드 - 넓이:92 , 높이:92 -->
            </div>
            <fieldset class="write_form">
                <legend>2단계 인증</legend>
                <p>
			<span class="category">
				<label for="confirmCode">코드</label>
			</span>
                    <span class="field">
				<input type="password" placeholder="" value="" id="confirmCode" />
			</span>
                </p>
            </fieldset>

            <div class="btn_set">
                <div class="right">
                    <button type="button" class="btn_basic cancel">취소</button>
                    <button type="button" class="btn_basic submit">확인</button>
                </div>
            </div>
            <button class="btn_close"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
        </div>

        <!-- 2단계 인증 설정-->
        <div class="layer_popup" ref="secondCertificationLayer">
            <h3>2단계 인증 설정</h3>
            <div class="security_step">
                <ul>
                    <li :class="{step01:true, on:isTurn(1)}"><!-- 다음 단계로 이동 할수록 on 클래스가 추가됨-->
                        <span><strong>Step1</strong></span>
                        <p>Installing Google Authenticator</p>
                    </li>
                    <li :class="{step02:true, on:isTurn(2)}">
                        <span><strong>Step2</strong></span>
                        <p>Synchronisation</p>
                    </li>
                    <li :class="{step03:true, on:isTurn(3)}">
                        <span><strong>Step3</strong></span>
                        <p>Validation</p>
                    </li>
                    <li :class="{step04:true, on:isTurn(4)}">
                        <span><strong>Step4</strong></span>
                        <p>Recorvery Codes</p>
                    </li>
                </ul>
            </div>
            <div class="google_area">
                <div v-if="isCurrentStep(1)">
                    <p>Please install Google Authenticator on your mobile.</p>
                    <p>When the installation is done, click on countinue.</p>

                    <p>Launch your application store and search for</p>
                    <b>Google Authenticator</b>
                </div>

                <div v-show="isCurrentStep(2)">
                    <div>
                        <img :src="qrcodeUrl"/>
                    </div>
                    <b>{{certify}}</b>
                    <p>를 입력하세요.</p>
                </div>

                <div v-if="isCurrentStep(3)">
                    <span class="category">
                        <label for="confirmCode">코드</label>
                    </span>
                    <span class="field">
                        <input type="text" placeholder="" v-model.number="secondCertificationLayer.verificationCode" />
                    </span>
                </div>

                <div v-if="isCurrentStep(4)">
                    끝
                </div>
            </div>
            <div class="btn_set">
                <div class="right">
                    <button type="button" class="btn_basic cancel" @click="closeLayerPopup" v-if="showWhenStepIn(1)">취소</button>
                    <button type="button" class="btn_basic cancel" @click="prevStep" v-if="showWhenStepIn(2,3)">이전</button>
                    <button type="button" class="btn_basic submit" @click="nextStep" v-if="showWhenStepIn(1,2,3)">다음</button>
                    <button type="button" class="btn_basic submit" @click="closeLayerPopup" v-if="showWhenStepIn(4)">완료</button>
                </div>
            </div>
            <button class="btn_close" @click="closeLayerPopup"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
        </div>

        <!-- 비밀번호 변경 -->
        <div class="layer_popup" ref="passwordLayer">
            <h3>비밀번호 변경</h3>
            <fieldset class="write_form">
                <legend>비밀번호 변경</legend>
                <p>
			<span class="category">
				<label for="currentPW">현재 비밀번호</label>
			</span>
                    <span class="field">
				<input type="password" placeholder="" v-model="passwordLayer.currentPW" ref="currentPW" />
			</span>
                </p>
                <p>
			<span class="category">
				<label for="newPW">새 비밀번호</label>
			</span>
                    <span class="field">
				<input type="password" placeholder="" v-model="passwordLayer.newPW" ref="newPW" />
			</span>
                </p>
                <p>
			<span class="category">
				<label for="newPWCheck">새 비밀번호 확인</label>
			</span>
                    <span class="field">
				<input type="password" placeholder="" v-model="passwordLayer.newPWCheck" ref="newPWCheck" />
			</span>
                </p>
            </fieldset>

            <div class="btn_set">
                <div class="right">
                    <button type="button" class="btn_basic cancel" @click="closeLayerPopup">취소</button>
                    <button type="button" class="btn_basic submit" @click="changePassword">확인</button>
                </div>
            </div>
            <button class="btn_close" @click="closeLayerPopup"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
        </div>

        <!-- 관리자에게 파일검색 허용 -->
        <div class="layer_popup" ref="permitFileLayer">
            <h3>관리자에게 파일검색 허용</h3>
            <fieldset class="file_search_settings">
                <legend>관리자에게 파일검색 허용</legend>
                <div class="category">
                    <label for="">관리자에게 파일검색 허용</label>
                </div>
                <div class="radio_wrap">
                    <label for="permitfileY">
                        <input type="radio" name="permitfile" value="Y" v-model="permitFileLayer.selectedPermitFile" id="permitfileY"/>허용
                    </label>
                    <label for="permitfileN">
                        <input type="radio" name="permitfile" value="N" v-model="permitFileLayer.selectedPermitFile" id="permitfileN"/>미허용
                    </label>
                </div>
            </fieldset>
            <div class="btn_set">
                <div class="right">
                    <button type="button" class="btn_basic cancel" @click="closeLayerPopup">취소</button>
                    <button type="button" class="btn_basic submit" @click="changePermitfile">확인</button>
                </div>
            </div>
            <button class="btn_close" @click="closeLayerPopup"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
        </div>

        <!-- 모달 배경 -->
        <div class="modal_bg modal"></div>
	</article>
</template>

<script>

    import $ from "jquery";

	export default {
		data(){
			return {
			    id: this.$store.state.header.user.id,
                qrcodeUrl  : '',
                certify: '',
                activeTab: 'general',
                passwordLayer: {
                    currentPW: '',
                    newPW: '',
                    newPWCheck: ''
                },
                secondCertificationLayer: {
                    currentStep: 1,
                    verificationCode: ''
                },
                selectLanguageLayer: {
                    selectedLanguage: ''
                },
                permitFileLayer: {
			        selectedPermitFile: ''
                },
                user: {
			        name: ''
                },
			}
		},

        computed: {
		    userName() {
		        let userName = this.firstname;

		        if (this.lastname)
		            userName += ' ' + this.lastname;

		      return userName;
            },
            firstname() {

                return this.$store.state.header.user.firstname;
            },
            lastname() {

                return this.$store.state.header.user.lastname;
            },
            email() {

                return this.$store.state.header.user.email;
            },
            language() {
		        return this.$store.state.header.user.lang;
            },
            permitfile() {
		        return this.$store.state.header.user.permitfile;
            },
            permitfileName() {
		        return this.permitfile === 'Y' ? '허용':'미허용';
            },
            isTurn() {

		        return (stepNum) =>{

		            return this.secondCertificationLayer.currentStep >= stepNum;
                }
            },
            isCurrentStep() {

		        return (stepNum) =>{

		            return this.secondCertificationLayer.currentStep === stepNum;
                }
            },
            languageName() {

		        let languageName = ''

		        switch(this.language) {

		            case 'KR':
		                languageName = '한국어';
		                break;

                    case 'JP':
                        languageName = '일본어';
		                break;

                    case 'EN':
                        languageName = '영어';
		                break;
                }

                return languageName;
            },
            langClass() {

		        let langClass = ''

		        switch(this.language) {

		            case 'KR':
		                langClass = 'kr';
		                break;

                    case 'JP':
                        langClass = 'jp';
		                break;

                    case 'EN':
                        langClass = 'us';
		                break;
                }

                return langClass;
            }
        },
        watch: {
		  secondCertificationLayer : {

		      deep: true,

              handler(deep) {

		          let currentStep = deep.currentStep;

		          if (currentStep == 4)
		              this.$refs.secondCertificationCheckbox.checked = true;
              }
          }
        },
        updated() {

        	$(function () {

				//셀렉트박스 UI
				jQuery(".selectbox_ui").each(function() {
					initSelectBox(jQuery(this)) //비동기로 셀렉트 박스를 만들었을 경우 initSelectBox(jQuery("#아이디")) 로 실행시켜줘야 함
				})
			});
		},
		methods : {
		    changeSecondCertificationLayer(event) {

		        let checked = event.target.checked;

		        if (checked) {

		            this.secondCertificationLayer.currentStep = 1;
		            this.certify = '';
                    this.qrcodeUrl = '';
		            this.openLayerPopup('secondCertificationLayer');
		            event.target.checked = !event.target.checked;

                } else {

                    if(confirm("2단계 인증을 취소하시겠습니까?")) {

                        this.removeCertify(event);
                        return;

                    } else {

                        event.target.checked = !event.target.checked;
                    }
                }
            },

            // 2단계 인증 해제
            removeCertify(event) {

		        axios.post('/header/removeCertify/', {userId: this.id}).then(response => {

		            let data = response.data;

		            if (data.code === 1000) {

		                this.$store.dispatch('setUser', {existCertify: false});

                    } else {

		                alert('에러가 발생했습니다.');
		                event.target.checked = !event.target.checked;
                    }
                }).catch(ex => {

                    alert('에러가 발생했습니다.');
                    event.target.checked = !event.target.checked;
                    console.log(ex);
                });
            },

		    showWhenStepIn() {

		        let currentStep = this.secondCertificationLayer.currentStep,
                    show = false;

		        for (let i = 0; i < arguments.length; i++) {

		            if (currentStep == arguments[i])
		                show = true;
                }

		        return show;
            },

            // 이전 단계
            prevStep() {

                if (this.secondCertificationLayer.currentStep > 1)
                    this.secondCertificationLayer.currentStep -= 1;
            },

            // 다음 단계
            nextStep() {

		        let currentStep = this.secondCertificationLayer.currentStep,
                    verificationCode = this.secondCertificationLayer.verificationCode;

                if (currentStep > 3) return;

                // 1단계에서 2단계로 갈 때 OTP키 확인
                if (currentStep == 1) {

                    this.getOTPKey();
                    return false;
                }

                // 3단계에서 다음으로 넘어갈 때 검증
                if (currentStep == 3) {

                    if (verificationCode != '')
                        this.checkVerificationCode();

                    return false;
                }

                this.secondCertificationLayer.currentStep += 1;

            },

            // OTP Key 조회
            getOTPKey() {

		        let self = this,
                    userId = this.id;

		        axios.post('/header/getOTPKey/', {userId: userId}).then(response => {

                    let code = response.data.code,
                        certify = response.data.certify,
                        imgResponse = response.data.imgResponse;

                    if (code === 1000) {

                        self.certify = certify;
                        this.getQrcode();
                    }

                }).catch(ex => {

                    console.log(ex);
                })
            },

            // QR code 조회
            getQrcode() {

		        let self = this,
                    userId = this.id,
                    certify = this.certify;

		        axios.post('/header/getQrcode/', {userId: userId, certify: certify}).then(response => {

		            this.$nextTick(function () {

		                this.qrcodeUrl = response.data.qrcodeUrl;
		                this.secondCertificationLayer.currentStep += 1;
                    });

                }).catch(ex => {

                    console.log(ex);
                });
            },

            // 검증 코드 체크
            checkVerificationCode() {

		        let self = this,
                    userId = this.id,
                    certify = this.certify,
                    verificationCode = this.secondCertificationLayer.verificationCode;

		        axios.post("/header/checkVerificationCode/", {
		            userId: userId,
                    certify: certify,
		            verificationCode: verificationCode
		        }).then(response => {

                    let valid = response.data.valid;

                    if (valid) {

                        self.secondCertificationLayer.currentStep += 1;
                        this.$store.dispatch('setUser', {existCertify: true});

                    } else {

                        alert('틀림!')
                    }

                }).catch(ex => {

                    console.log(ex);
                })

            },

			changeActiveTab (event) {

				this.activeTab = event.target.dataset.active;
			},
            openLayerPopup(layerName) {

		        $(".modal").show();
		        $(this.$refs[layerName]).show();

			    switch (layerName) {

                    case 'emailChangeLayer':
                    case 'nameChangeLayer':
                        this.$nextTick(function () {

                            this.$refs[layerName].getElementsByClassName('field')[0].getElementsByTagName('input')[0].select();
                        })
                        break;

                    case 'passwordLayer':
                        this.passwordLayer.currentPW = '';
                        this.passwordLayer.newPW = '';
                        this.passwordLayer.newPWCheck = '';
                        break;

                    case 'selectLanguageLayer':
                        this.selectLanguageLayer.selectedLanguage = this.language;
                        break;

                    case 'permitFileLayer':
                        this.permitFileLayer.selectedPermitFile = this.permitfile;
                        break;
                }
            },
            closeLayerPopup(event) {

		        $('.modal').hide();
		        $(".layer_popup").hide();
            },
            changeName() {

                let userName = this.$refs.userName.value,
                    userNameArr = userName.split(" "),
                    firstname = '',
                    lastname = '';

                if (userNameArr.length === 1) {

                    firstname = userNameArr[0];

                } else {

                    lastname = userNameArr.pop();
                    firstname = userNameArr.join(" ");
                }

                let params = {
                    id : this.id,
                    firstname : firstname,
                    lastname: lastname
                };

                this.updateUserInfo(params);
            },
            changeEmail() {

                let email = this.$refs.userEmail.value,
                    params = {
                        id : this.id,
                        email : email
                    };

                this.updateUserInfo(params);
            },
            changePassword() {

			    let currentPassword  = this.$refs.currentPW.value,
                    newPassword      = this.$refs.newPW.value,
                    newPasswordCheck = this.$refs.newPWCheck.value;

			    if (newPassword !== newPasswordCheck) {
			        alert("새로운 비밀번호가 일치하지 않습니다.");
                    return;
                }

			    let params = {
			        id: this.id,
                    currentPassword : currentPassword,
                    newPassword : newPassword,
                    newPasswordCheck : newPasswordCheck
                };

                this.updateUserInfo(params);
            },
            updateUserInfo(params) {

                let qs = require('qs');

                axios.post('/header/updateUserInfo/', qs.stringify(params))
                    .then(response => {

                        let data = response.data;

                        if (data.code == 1000) {

                            alert("저장했습니다.");
                            this.closeLayerPopup({keyCode: true});
                            this.$store.dispatch('setUser', params);

                        } else {

                            let message =  '';

                            switch (data.code) {

                                // WRONG_PASSWORD
                                case -2001:
                                    message = "비밀번호가 올바르지 않습니다.";
                                    break;

                                // WRONG_RE_PASSWORD
                                case -2004:
                                    message = "새로운 비밀번호가 일치하지 않습니다.";
                                    break;

                                // INTERNAL_SERVER_ERROR
                                case -1000:
                                    message = "오류가 발생했습니다. 다시 시도해주세요.";
                                    break;
                            }

                            alert(message);
                        }

                    }).catch(ex => {

                        console.log(ex);
                    });
            },

            changeLanguage() {

		        const lang = this.selectLanguageLayer.selectedLanguage;

		        axios.post('/header/changeLanguage/', {lang: lang}).then(response => {

                    const data = response.data;

                    if (data.code === 1000) {

		                this.$i18n.locale = lang;
		                this.$store.dispatch('setUser', {lang: lang});
		                this.closeLayerPopup();
                    }

                }).catch(ex => {

                    console.log(ex);
                });
            },

            changePermitfile() {

		        const permitfile = this.permitFileLayer.selectedPermitFile;

		        axios.post('/header/changePermitfile/', {permitfile: permitfile}).then(response => {

                    const data = response.data;

                    if (data.code === 1000) {

		                this.$store.dispatch('setUser', {permitfile: permitfile});
		                this.closeLayerPopup();
                    }

                }).catch(ex => {

                    console.log(ex);
                });
            }
		},
        mounted() {

		    let self = this;

		    this.user.name = this.firstname;

		    if (this.lastname)
		        this.user.name += ' ' +  this.lastname;

		    this.$nextTick(function() {

                this.$refs.secondCertificationCheckbox.checked = this.$store.getters.user.existCertify;
            });
        },
	}
</script>

<style scoped>

</style>

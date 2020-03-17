<template>
    <article id="contents" class="sub">
		<location />

		<div class="content">
			<p class="intro_guide">유저를 추가하려면 다음 정보를 입력하세요.</p>
			<table class="board_view">
				<caption>수동으로 초대</caption>
				<colgroup>
					<col style="width:230px" />
					<col style="width:*" />
				</colgroup>
				<tbody>
					<tr>
						<th scope="row"><label for="userName">이름</label><strong class="essential">*</strong></th>
						<td>
							<input type="text" id="userName" v-model="user.name" style="width: 340px" @blur="checkField('name')"/>
							<div v-show="comment.name.show">
								<p class="error_msg">{{comment.name.message}}</p>
							</div>
						</td>
					</tr>
					<tr>
						<th scope="row"><label for="mailAdress">메일 주소</label><strong class="essential">*</strong></th>
						<td>
							<input type="email" id="mailAdress" v-model="user.email" style="width: 340px" @blur="checkField('email')" />
							<div v-show="comment.email.show">
								<p class="error_msg">{{comment.email.message}}</p>
							</div>
						</td>
					</tr>
					<tr>
						<th scope="row"><label for="userPassword">비밀번호</label><strong class="essential">*</strong></th>
						<td>
							<input type="password" id="userPassword" v-model="user.password" style="width: 340px" @blur="checkField('password')" />
							<div v-show="comment.password.show">
								<p class="error_msg">{{comment.password.message}}</p>
							</div>
						</td>
					</tr>
					<tr>
						<th scope="row"><label for="userPasswordCheck">비밀번호 확인</label><strong class="essential">*</strong></th>
						<td>
							<input type="password" id="userPasswordCheck" v-model="user.rePassword" style="width: 340px" @blur="checkField('rePassword')" />
							<div v-show="comment.rePassword.show">
								<p class="error_msg">{{comment.rePassword.message}}</p>
							</div>
						</td>
					</tr>
					<tr>
						<th scope="row"><label for="searchPermission">검색 허가</label></th>
						<td>
							<span class="basic_select selectbox_ui">
								<b class="selected_txt"></b>
								<select id="searchPermission" style="width: 340px"  v-model="user.permitSearch">
									<option value="2">백업으로 검색</option>
									<option value="0">백업 전용</option>
									<option value="1">검색 전용</option>
								</select>
							</span>
						</td>
					</tr>
					<tr>
						<th scope="row"><label for="normalStorageLimit">일반 스토리지 제한(GB)</label></th>
						<td>
							<input type="text" id="normalStorageLimit" style="width: 340px"
								   v-model="user.gnrllimit" v-bind:disabled="user.gnrlunlimit"
								   @blur="blurNumberOnly('gnrllimit', $event)" @keyup="numberOnly('gnrllimit', $event)"/>
							<p class="add_option"><input type="checkbox" v-model="user.gnrlunlimit" @click="checkUnlimit('gnrllimit', $event)"/>무제한</p>
						</td>
					</tr>
					<tr>
						<th scope="row"><label for="coldStorageLimit">콜드 스토리지 제한(GB)</label></th>
						<td>
							<input type="text" id="coldStorageLimit" style="width: 340px"
								   v-model="user.coldlimit" v-bind:disabled="user.coldunlimit"
								   @blur="blurNumberOnly('coldlimit', $event)" @keyup="numberOnly('coldlimit', $event)"/>
							<p class="add_option"><input type="checkbox" v-model="user.coldunlimit" @click="checkUnlimit('coldlimit', $event)" />무제한</p>
						</td>
					</tr>
					<tr>
						<th scope="row"><label for="ocrPageLimit">OCR 페이지 수 제한(Page)</label></th>
						<td>
							<input type="text" id="ocrPageLimit" style="width: 340px"
								   v-model="user.ocrlimit" v-bind:disabled="user.ocrunlimit"
								   @blur="blurNumberOnly('ocrlimit', $event)" @keyup="numberOnly('ocrlimit', $event)"/>
							<p class="add_option"><input type="checkbox" v-model="user.ocrunlimit" @click="checkUnlimit('ocrlimit', $event)"/>무제한</p>
						</td>
					</tr>
					<tr>
						<th scope="row"><label for="userPolicy">정책</label></th>
						<td>
							<span class="basic_select selectbox_ui">
								<b class="selected_txt"></b>
								<select id="userPolicy" style="width: 340px" v-model="user.policy">
									<option value="">사용자 정의</option>
									<template v-for="policy in policyList">
										<option :value="policy.bp_id">{{policy.bp_name}}</option>
									</template>
								</select>
							</span>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="board_btn_set">
				<button type="button" class="btn_basic submit" @click="clickAddButton">추가</button>
                <router-link to="/management/user_server"><button type="button" class="btn_basic cancel">취소</button></router-link>
			</div>
			<ul class="desc_list">
				<li>AOSBOX AI plus에 사용자를 초청하려면 <router-link to="/management/user_server/mail_invitation">메일로 초대</router-link>를 사용합니다.</li>
				<li>복수의 유저를 일괄적으로 추가하려면 <router-link to="/management/user_server/csv_invitation">CSV파일에서 일괄 추가</router-link>를 사용합니다.</li>
			</ul>
		</div>
	</article>
</template>

<script>

	import constants from "../../../plugins/constants";

    export default {
        name: "ManualInvitation",
        data () {
          return {
				user : {
					name: 		'',     // 이름
					email: 		'',     // 메일주소
					password: 	'',     // 비밀번호
					rePassword: 	'',   	// 비밀번호 확인
					permitSearch: '2', 	// 검색 허가
					gnrllimit: 	'',    	// 일반 스토리지 제한
					gnrlunlimit: 	true,	// 일반 스토리지 무제한 체크
					coldlimit: 	'',		// 콜드 스토리지 제한
					coldunlimit: 	true,  // 콜드 스토리지 무제한 체크
					ocrlimit: 	'',     // OCR 페이지 수 제한
					ocrunlimit: 	true,  // OCR 페이지 수 무제한 체크
					policy: 		'',      // 정책
				},
			  	comment: {
					name: {
						message: "",
						show: false
					},
					email: {
						message: "",
						show: false
					},
					password: {
						message: "",
						show: false
					},
					rePassword: {
						message: "",
						show: false
					},
			  },
			  policyList: []
          }
        },
        computed: {

        },
        methods: {

        	checkField(prop, callback) {

        		let value = this.user[prop],
					show = false,
					showRePassword = false,
					message;

        		// 항목이 비었는지 검사
				if (value === '') {

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
					}

					this.comment[prop].message = message;
        			this.comment[prop].show = true;
					return false;

				} else {

        			this.comment[prop].show = false;

        			// 항목이 유효한지 검사
					switch(prop) {

						case 'email':
							if (!validEmail(value)) {
								message = "유효하지 않은 메일 주소입니다. 확인해주세요.";
								show = true;
							}
							break;

						case 'password':
							// 6자리 이상 비밀번호 체크
							if (this.checkPasswordLength()) {

								// 비밀번호, 비밀번호 확인 일치 여부 체크
								if (!this.checkMatchPassword()) {

									prop = 'rePassword';
									message = "비밀번호가 일치하지 않습니다.";
									show = true;
								}

							} else {

								message = "6자리 이상으로 설정해주세요.";
								show = true;
							}
							break;

						case 'rePassword':
							// 비밀번호, 비밀번호 확인 일치 여부 체크
							if (!this.checkMatchPassword()) {

								message = "비밀번호가 일치하지 않습니다.";
								show = true;
							}
							break;
					}

					this.comment[prop].message = message;
					this.comment[prop].show = show;

					if (show) return false;

					// 존재하는 이메일인지 확인 필요
					if (prop === 'email' && show == false)
						this.checkExistEmail(callback);

					return true;
        		}
			},

			checkExistEmail(callback) {

        		axios.post('/before_login/checkExistEmail/', {email: this.user.email}).then(result => {

					if (result.data.code == -2005) {

						this.comment.email.message = "사용할 수 없는 메일 주소입니다. 확인해주세요.";
						this.comment.email.show = true;

					} else {

						if (callback) callback();
					}

				}).catch(ex => {

					console.log(ex);
				});
			},

			// 6자리 이상 비밀번호 체크
			checkPasswordLength() {

        		const password = this.user.password;

				if (password.length < 6) return false;

				return true;
			},

			// 비밀번호, 비밀번호 확인 일치 여부 체크
			checkMatchPassword() {

        		const rePassword = this.user.rePassword,
					  password = this.user.password;

        		if (rePassword != '' && rePassword !== password) {

        			return false;


				} else {

        			return true;
				}
			},

        	numberOnly(prop, event) {

        		let _pattern = /^\d*[.]\d{1,2}$/, 	// 현재 value값이 소수점 둘째짜리 숫자이면 더이상 입력 불가
					value = this.user[prop],
					lengthLimit = 5,
					arr = value.split("."),
					arr1;

        		value = value.replace(/[^0-9.]/g,"");

        		// .이 있을 경우
				if ((value.match(/\./g) || []).length) {

					if (arr[0] === "") {
						arr[0] = 0;
					}

					arr1 = arr.splice(0, 2);
					value = arr1.join(".") + arr.join("");

					if (value.indexOf(".") != value.length - 1) {

						lengthLimit++;

						// 소수점 둘째자리가 넘어갈 경우
						if (!_pattern.test(value)) {

							arr = value.split(".");
							arr[1] = arr[1].slice(0, 2);
							value = arr.join(".");
						}
					}
				}

				if (value.length > lengthLimit)
					value = value.slice(0, lengthLimit);

        		this.user[prop] = value;
			},

			blurNumberOnly(prop, event) {

        		let value = this.user[prop];

        		if (value.indexOf(".") == value.length - 1)
        			this.user[prop] = value.slice(0, value.length - 1);
			},

        	// 무제한 체크
        	checkUnlimit(prop, event) {

        		if (event.target.checked)
        			this.user[prop] = '';
			},

			// 추가 버튼
			clickAddButton() {

				// 입력 양식 확인
				if (!this.checkField('name')) return false;
				if (!this.checkField('password')) return false;
				if (!this.checkField('rePassword')) return false;
				this.checkField('email', this.registMember);
			},

			// 회원 등록
			registMember() {

        		let valid = true;

        		for (let prop in this.comment) {

					if (this.comment[prop].show)
						valid = false;
				}

				if (valid) {

					axios.post('/management/registMember/', this.user).then(result => {

						let data = result.data,
							code = data.code;

						if (code == "1000") {

							alert('유저 등록이 완료되었습니다.');
							this.$router.push("/management/user_server");

						} else if (code == '-2005') {

							alert("이미 존재하는 이메일입니다.");
						}

					}).catch(ex => {

						console.log(ex);
					});
				}
			}
        },
		created() {

        	// 정책
			axios.post('/management/getPolicyList/').then(result => {

				let data = result.data;

				if (data.code === 1000)
					this.policyList = data.policyList

			}).catch(ex => {

				console.log(ex);
			});

		},
        mounted() {

            //셀렉트박스 UI
            $(".selectbox_ui").each(function () {
                initSelectBox($(this)) //비동기로 셀렉트 박스를 만들었을 경우 initSelectBox(jQuery("#아이디")) 로 실행시켜줘야 함
            })
        }
    }


    function validEmail(email) {

        let regex=/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

        return (email != '' && email != 'undefined' && regex.test(email));
    }
</script>

<style scoped>
.board_btn_set {
    text-align: left;
}
</style>

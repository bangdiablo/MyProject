<template>
  <header id="header">
    <h1>
      <router-link to="/main"><img src="@/assets/images/layout/logo.svg" alt="AOSBOX"/></router-link>
    </h1>
    <div class="search_form">
      <fieldset class="total_search">
        <legend>통합검색</legend>
        <p>
          <input type="text" placeholder="検索語を入力してください。" title="検索語を入力してください。"/>
<!--          <button type="button" class="btn_filter" @click="search_filter=!search_filter"><img-->
<!--            src="@/assets/images/layout/btn_search_filter.png" alt="상세필터"/></button>-->
          <button type="button" class="btn_search"><img src="@/assets/images/layout/btn_search.png" alt="검색"/></button>
        </p>
      </fieldset>
      <fieldset v-show="search_filter" class="search_filter">
        <legend>상세필터</legend>
        <ul>
          <li>
            <strong class="category"><label for="sf_category">카테고리</label></strong>
            <span class="field">
						<span class="basic_select selectbox_ui">
							<b class="selected_txt"></b>
							<select id="sf_category">
								<option value="">전체</option>
							</select>
						</span>
					</span>
          </li>
          <li>
            <strong class="category"><label for="sf_filesize">파일사이즈</label></strong>
            <span class="field">
						<span class="basic_select selectbox_ui">
							<b class="selected_txt"></b>
							<select id="sf_filesize">
								<option value="">모든사이즈</option>
							</select>
						</span>
					</span>
          </li>
          <li>
            <strong class="category"><label for="sf_category">변경일</label></strong>
            <span class="field">
						<span class="basic_datepicker">
							<input type="text" placeholder="하나의 날"/>
							<button type="button"><img src="@/assets/images/component/btn_calendar.png" alt="캘린더"/></button>
						</span>
					</span>
          </li>
          <li>
            <strong class="category"><label for="sf_deletefile">삭제된파일</label></strong>
            <span class="field">
						<span class="basic_select selectbox_ui">
							<b class="selected_txt"></b>
							<select id="sf_deletefile">
								<option value="">삭제된 파일은 제외</option>
							</select>
						</span>
					</span>
          </li>
          <li>
            <strong class="category"><label for="sf_device">검색위치</label></strong>
            <span class="field">
						<span class="basic_select selectbox_ui">
							<b class="selected_txt"></b>
							<select id="sf_device">
								<option value="">자신의단말기</option>
							</select>
						</span>
					</span>
          </li>
        </ul>
        <div class="btn_setting_search">
          <button type="button" class="btn_basic">설정 리셋</button>
          <button type="button" class="btn_basic submit">검색</button>
        </div>
      </fieldset>
    </div>

    <div class="g_menu">
      <button type="button" class="btn_install_aosbox"><img src="@/assets/images/layout/logo_install_aosbox.png" alt=""
                                                            class="ico"/>AOSBOX セットアップ
      </button>

      <button type="button" class="btn_user_menu" @click="user_menu_click" ><img
        src="@/assets/images/layout/ico_um_user.png" alt="" class="ico"/>{{username}}
      </button>
      <div class="user_menu" @mouseover="user_menu_over" @mouseleave="user_menu_out" v-bind:style="user_menu">
        <ul>
          <li>
            <router-link to="/account_setting">
                <img src="@/assets/images/layout/ico_um_account.png" alt="" class="ico"/>{{$t('header.account-setting')}}
            </router-link>
          </li>
          <li>
            <a @click="openLayer('inquiryLayer')">
                <img src="@/assets/images/layout/ico_um_contact.png" alt="" class="ico"/>
                {{$t('header.inquiry')}}
            </a>
          </li>
          <li>
            <a @click="openLayer('problemReportingLayer')">
                <img src="@/assets/images/layout/ico_um_report.png" alt="" class="ico"/>
                {{ $t('header.problem-reporting')}}
            </a>
          </li>
          <li>
            <a href="#" @click="logout">
                <img src="@/assets/images/layout/ico_um_logout.png" alt="" class="ico"/>
                {{$t('header.logout')}}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- 문의 -->
    <div class="layer_popup" ref="inquiryLayer">
        <h3>문의</h3>
        <fieldset class="write_form">
            <legend>문의</legend>
            <p>
                <span class="category">
                    <label for="">이름</label>
                </span>
                <span class="field">
                    <input type="text" placeholder="" v-model="layer.name" maxlength="100"/>
                </span>
            </p>
            <p>
                <span class="category">
                    <label for="">메일</label>
                </span>
                <span class="field">
                    <input type="text" placeholder=""  v-model="layer.email" maxlength="200" />
                </span>
            </p>
            <p>
                <span class="category">
                    <label for="">전화번호</label>
                </span>
                <span class="field">
                    <input type="text" placeholder=""  v-model="layer.phone" maxlength="100" />
                </span>
            </p>
            <p>
                <span class="category">
                    <label for="">메시지</label>
                </span>
                <span class="field inquiry_textBox">
                    <textarea name="" cols="" rows="" placeholder="" v-model="layer.message"></textarea>
                </span>
            </p>
        </fieldset>
        <div class="btn_set">
            <div class="right">
                <button type="button" class="btn_basic submit" @click="sendFaq">보내기</button>
            </div>
        </div>
        <button class="btn_close" @click="closeLayer"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
    </div>

    <!-- 문제 보고-->
    <div class="layer_popup" ref="problemReportingLayer">
        <h3>문제 보고</h3>
        <fieldset class="write_form">
            <legend>문제 보고</legend>
            <p>
                <span class="category">
                    <label for="">이름</label>
                </span>
                <span class="field">
                    <input type="text" placeholder="" v-model="layer.name" maxlength="100"/>
                </span>
            </p>
            <p>
                <span class="category">
                    <label for="">메일</label>
                </span>
                <span class="field">
                    <input type="text" placeholder=""  v-model="layer.email" maxlength="200"/>
                </span>
            </p>
            <p>
                <span class="category">
                    <label for="">전화번호</label>
                </span>
                <span class="field">
                    <input type="text" placeholder=""  v-model="layer.phone" maxlength="100"/>
                </span>
            </p>
            <p>
                <span class="category">
                    <label for="">메시지</label>
                </span>
                <span class="field inquiry_textBox">
                    <textarea name="" cols="" rows="" placeholder="" v-model="layer.message"></textarea>
                </span>
            </p>
        </fieldset>

        <div class="btn_set">
            <div class="right">
                <button type="button" class="btn_basic submit" @click="sendFaq">보내기</button>
            </div>
        </div>
        <button class="btn_close" @click="closeLayer"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
    </div>

    <!-- 모달 배경 -->
    <div class="modal_bg" ref="modal"></div>
  </header>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            user_menu: {
                display: 'none'
            },
            search_filter: false,
            layer: {
                type: '',
                name: '',
                email: '',
                phone: '',
                message: ''
            }
        }
    },
    computed: {

        username() {

            return this.$store.getters.user.firstname + " " + this.$store.getters.user.lastname
        }
    },
    methods: {

        user_menu_click: function () {

            if (this.user_menu.display == 'block')
                this.user_menu.display = 'none';
            else
                this.user_menu.display = 'block';
        },

        user_menu_over: function () {
            this.user_menu.display = 'block'
        },

        user_menu_out: function () {

            this.user_menu.display = 'none'
        },

        logout: function () {

            axios.post('/main/logout/').then(result => {

                let data = result.data;

                if (data.code == 1000) {

                    this.$store.dispatch('main/setAdmin', false);
                    this.$router.push("/before_login/login");
                }
            });
        },

        // 레이어 팝업 보이기
        openLayer(layerName) {

            for (let prop in this.layer) {

                this.layer[prop] = '';
            }

            this.layer.type = layerName;

            $(this.$refs.modal).show();
            $(this.$refs[layerName]).show();
        },

        // 레이어 팝업 숨기기
        closeLayer() {

            $(this.$refs.modal).hide();
            $(".layer_popup").hide();
        },

        sendFaq() {

            // 폼 검사
            if (!this.checkForm()) return;

            axios.post('/header/sendFaq/', this.layer).then(response => {

                let data = response.data;

                if (data.code === 1000) {

                    alert("정상적으로 전송되었습니다.");
                    this.closeLayer();
                }

            }).catch(ex => {

                console.log(ex);
            });
        },

        checkForm() {

            let name = this.layer.name.trim(),
                email = this.layer.email.trim(),
                phone = this.layer.phone.trim(),
                message = this.layer.message.trim();

            /*** 빈 문자열 검사 ***/
            if (isBlank(name)) {

                alert("이름을 적어주세요.");
                return false;
            }

            if (isBlank(email)) {

                alert("메일을 적어주세요.");
                return false;
            }

            if (isBlank(message)) {

                alert("메시지를 적어주세요.");
                return false;
            }

            /*** email 유효성 검사 ***/
            if (!checkValidEmail(email)) {

                alert("올바른 이메일 형식이 아닙니다.");
                return false;
            }

            this.layer.name = name;
            this.layer.email = email;
            this.layer.phone = phone;
            this.layer.message = message;

            return true;
        }
    },
    created() {

        axios.post('/main/userinfo/').then(result => {

            let data = result.data;

            if (data.code == 1000) {

                this.$store.dispatch('setUser', data);
                this.$store.dispatch('main/setAdmin', data.isAdmin);    // 관리자 여부 설정

                console.log('data.lang', data.lang)
                if (data.lang)
                    this.$i18n.locale = data.lang;

            } else {

                alert(this.$t('common.comment.wrongLoginInfo'));
                this.$router.push("/before_login/login");
            }
        });
    }
}

// 빈 칸 검사
function isBlank(str) {

    return str.trim() === '';
}

</script>

<style scoped>

</style>

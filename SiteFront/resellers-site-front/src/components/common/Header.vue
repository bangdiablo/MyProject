<template>
   <header>
        <h1 class="aosbox_logo">
            <a href="/" title="aos box"><span class="">AOSBOX</span></a>
        </h1>
        <div class="my_link clear_both">
            <a href="#" class="my_notification" title="알림">
                <span class="blind">알림</span>
                <span class="bell_number">25</span>
            </a>
            <a href="#" class="my_info" title="내 정보" @click="user_menu_click">
                <span class="blind">내 정보</span>
            </a>
            <div class="user_menu" @mouseover="user_menu_over" @mouseleave="user_menu_out" v-bind:style="user_menu">
                <ul>
                  <li>
                    <router-link to="/account_setting">
                        <img src="@/assets/images/layout/ico_um_account.png" alt="" class="ico"/>{{$t('header.account-setting')}}
                    </router-link>
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

            // return this.$store.getters.user.firstname + " " + this.$store.getters.user.lastname
            return "홍길동";
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

        // axios.post('/main/userinfo/').then(result => {
        //
        //     let data = result.data;
        //
        //     if (data.code == 1000) {
        //
        //         this.$store.dispatch('setUser', data);
        //         this.$store.dispatch('main/setAdmin', data.isAdmin);    // 관리자 여부 설정
        //
        //         if (data.lang)
        //             this.$i18n.locale = data.lang;
        //
        //     } else {
        //
        //         alert(this.$t('common.comment.wrongLoginInfo'));
        //         this.$router.push("/before_login/login");
        //     }
        // }).catch(ex => {
        //
        //     console.log(ex);
        //     // alert(this.$t('common.comment.wrongLoginInfo'));
        //     // this.$router.push("/before_login/login");
        // });
    }
}

// 빈 칸 검사
function isBlank(str) {

    return str.trim() === '';
}

</script>

<style scoped>
.layer_popup {
    display: none;
}

header .user_menu {
    width: 110px;
	position: absolute;
	z-index: 90;
	top: 37px;
	right: 0px;
	display: none;
	padding-bottom: 5px;
	border: 1px solid #CCD4DC;
	border-radius: 3px;
	background-color: white;
	box-shadow: 2.121px 2.121px 5px 0px rgba(187, 206, 238, 0.4);
}
header .user_menu h4 {
	height: 5px;
	padding: 0px 24px;
	text-indent: -9999px;
	overflow: hidden;
}
header .user_menu ul li {
	text-align: left;
	line-height: 0;
}
header .user_menu ul li a {
	display: block;
	padding: 8px 16px;
	line-height: 120%;
}
header .user_menu ul li a:hover {
	background-color: #F5F9FC;
}
header .user_menu ul li a img.ico {
	position: relative;
	top: -2px;
	margin-right: 6px;
}
</style>

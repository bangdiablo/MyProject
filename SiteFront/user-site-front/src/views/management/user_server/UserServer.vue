<template>
  <article id="contents" class="sub">
    <location/>

    <ul class="category_navi">
      <li class="select_style_none" :class="{ico_new: haveNew.User}">
        <span v-on:click="activeTab=1" class="basic_select selectbox_ui" v-bind:class="[ activeTab ===1 ? 'active' : '']"> <!-- selectBox 에 활성화 상태 => class "active" -->
            <b class="selected_txt"></b>
            <select id="userType" v-model="userType" @change="getUserList">
                <option value="all">사용자</option>
                <option value="backup">백업전용</option>
                <option value="search">검색전용</option>
            </select>
        </span>
      </li>
      <li>
        <a v-on:click="activeTab=2" v-bind:class="[ activeTab ===2 ? 'active' : '']">
            <img src="@/assets/images/sub/ico_cn_new.png" alt="신규" class="new" v-show="haveNew.Computer"/>
            컴퓨터
        </a>
      </li>
      <li>
        <a v-on:click="activeTab=3" v-bind:class="[ activeTab ===3 ? 'active' : '']">
            <img src="@/assets/images/sub/ico_cn_new.png" alt="신규" class="new" v-show="haveNew.Server"/>
            서버
        </a>
      </li>
    </ul>

    <div class="content">
        <div v-show="isActiveTab(1)">
            <User ref="user" @setHaveNew="setHaveNew" :userType="userType"/>
        </div>
        <div v-show="isActiveTab(2)">
            <Computer ref="computer" @setHaveNew="setHaveNew"/>
        </div>
        <div v-show="isActiveTab(3)">
            <Server ref="server" @setHaveNew="setHaveNew"/>
        </div>
    </div>
  </article>
</template>

<script>
  import User from '../../../components/management/user_server/User.vue'
  import Computer from '../../../components/management/user_server/Computer.vue'
  import Server from '../../../components/management/user_server/Server.vue'

export default {
    name: "UserServer",
    components: {
        User,
        Computer,
        Server
    },
    data() {
        return {
            activeTab: 0,
            haveNew: {
                User: false,
                Computer: false,
                Server: false
            },
            userType: 'all'
        }
    },
    computed: {

        isActiveTab() {

            return (value) => this.activeTab === value
        }
    },
    methods: {

        setHaveNew(typeName, value) {

            this.haveNew[typeName] = value;
        },
        getUserList() {

            this.$refs.user.getUserList();
        }
    },
    created() {

        this.activeTab = 1;
    },
    mounted() {

        jQuery(".selectbox_ui").each(function() {
            initSelectBox(jQuery(this)) //비동기로 셀렉트 박스를 만들었을 경우 initSelectBox(jQuery("#아이디")) 로 실행시켜줘야 함
        });

        $("#userType").on('mousedown', function(e) {

            if ($(this).closest("span").hasClass("active"))
                return;
            else
                e.preventDefault();
        });
    }
}
</script>

<style scoped>
  a {
    cursor: pointer;
  }

  article#contents.sub ul.category_navi + .content {
    border-top-width: 222px;
  }

</style>

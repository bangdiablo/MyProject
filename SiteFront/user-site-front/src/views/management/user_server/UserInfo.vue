<template>
    <article id="contents" class="sub">
        <location/>

        <div class="content">
            <h3>
                <img src="@/assets/images/sub/ico_user_info.png" alt="" class="ico" />
                <strong class="user_info">
                    {{user.fullname}}
                    <template v-if="user.roleid === 1">
                        (<img src="@/assets/images/sub/ico_ui_admin.png" alt="" class="ico" />관리자)
                    </template>
                    <span class="email"><a :href="'mailto:' + user.email">{{user.email}}</a></span>
                </strong>
                <span class="btn_set">
					<router-link :to="{ path : '/management/user_server'}">
                        <button type="button"><img src="@/assets/images/component/btn_edit_list.png" alt="" class="ico" /><span class="txt">목록으로</span></button>
                    </router-link>
				</span>
            </h3>
            <table class="board_view">
                <colgroup>
                    <col style="width:200px" />
                    <col style="width:*" />
                    <col style="width:180px" />
                    <col style="width:*" />
                </colgroup>
                <tbody>
                <tr>
                    <th scope="row">작성일</th>
                    <td>{{expressDate(user.createdate)}}</td>
                    <th scope="row">정책</th>
                    <td>{{setPolicyName(user.policyname)}}</td>
                </tr>
                <tr>
                    <th scope="row">전회 사용</th>
                    <td>{{expressDate(user.modifydate)}}</td>
                    <th scope="row">상황</th>
                    <td>{{status}}</td>
                </tr>
                <tr>
                    <th scope="row">콜드 스토리지 사용 중</th>
                    <td>{{expressUsed(user.coldsto)}}</td>
                    <th scope="row">콜드 스토리지 제한</th>
                    <td>{{expressLimit(user.coldlimit)}}</td>
                </tr>
                <tr>
                    <th scope="row">사용중인 OCR</th>
                    <td>{{expressUsed(user.ocr, '페이지')}}</td>
                    <th scope="row">OCR 페이지 수</th>
                    <td>{{expressLimit(user.ocrlimit, '페이지')}}</td>
                </tr>
                <tr>
                    <th scope="row">일반 스토리지 사용 중</th>
                    <td>{{expressUsed(user.gnrlsto)}}</td>
                    <th scope="row">일반 스토리지 제한</th>
                    <td>{{expressLimit(user.gnrllimit)}}</td>
                </tr>
                </tbody>
            </table>
            <ul class="category_navi inner">
                <li>
                    <a v-on:click="activeTab=1" v-bind:class="[ isActiveTab(1) ? 'active' : '']">
                        컴퓨터
                        ({{totalListCount.Computer}})
                    </a>
                </li>
                <li>
                    <a v-on:click="activeTab=2" v-bind:class="[ isActiveTab(2) ? 'active' : '']">
                        서버
                        ({{totalListCount.Server}})
                    </a>
                </li>
                 <li>
                    <a v-on:click="activeTab=3" v-bind:class="[ isActiveTab(3) ? 'active' : '']">
                        모바일
                        ({{totalListCount.Mobile}})
                    </a>
                </li>
                 <li>
                    <a v-on:click="activeTab=4" v-bind:class="[ isActiveTab(4) ? 'active' : '']">
                        클라우드 드라이브
                        ({{totalListCount.Cloud}})
                    </a>
                </li>
                 <li>
                    <a v-on:click="activeTab=5" v-bind:class="[ isActiveTab(5) ? 'active' : '']">
                        서비스
                        ({{totalListCount.CloudDriveService}})
                    </a>
                </li>
            </ul>

            <div v-show="isActiveTab(1)">
                <Computer @setTotalListCount="setTotalListCount"></Computer>
            </div>
            <div v-show="isActiveTab(2)">
                <Server @setTotalListCount="setTotalListCount"></Server>
            </div>
            <div v-show="isActiveTab(3)">
                <Mobile @setTotalListCount="setTotalListCount"></Mobile>
            </div>
            <div v-show="isActiveTab(4)">
                <CloudDrive @setTotalListCount="setTotalListCount"></CloudDrive>
            </div>
            <div v-show="isActiveTab(5)">
                <Service @setTotalListCount="setTotalListCount"></Service>
            </div>
        </div>

    </article>
</template>

<script>
    import Computer from '../../../components/management/user_server/UserInfoComputer.vue'
    import Server from '../../../components/management/user_server/UserInfoServer.vue'
    import Mobile from '../../../components/management/user_server/UserInfoMobile.vue'
    import CloudDrive from '../../../components/management/user_server/UserInfoCloudDrive.vue'
    import Service from '../../../components/management/user_server/UserInfoService.vue'

    export default {
        name: "UserInfo",
        components: {
            Computer,
            Server,
            Mobile,
            CloudDrive,
            Service,
        },
        data() {
            return {
                activeTab: 0,
                user: {
                    accountid: 0,
                    coldlimit: 0,
                    coldsto: 0,
                    createdate: '',
                    email: '',
                    firstname: '',
                    gnrllimit: 0,
                    gnrlsto: 0,
                    id: 0,
                    labelid: '',
                    lastname: '',
                    modifydate: '',
                    name: '',
                    ocr: 0,
                    ocrlimit: 0,
                    permission: '',
                    permit: 0,
                    policy: 0,
                    policyname: '',
                    roleid : 0,
                    status: 0
                },
                beforePageInfo: '',
                totalListCount: {
                    Computer: 0,
                    Server: 0,
                    Mobile: 0,
                    Cloud: 0,
                    CloudDriveService: 0
                }
            }
        },
        computed: {
            isActiveTab() {

                return (value) => this.activeTab === value
            },
            status() {

                let status = this.user.status,
                    val;

                if (status === 1) {

                    val = '유효';

                } else if (status === 2) {

                    val = '일시정지';

                } else if (status === 3) {

                    val = '탈퇴';
                }

                return val;
            }
        },
        methods: {

            setTotalListCount(listType, totalListCount) {

                this.totalListCount[listType] = totalListCount;
            },
            setPolicyName(policyname) {

                return policyname ? policyname : '사용자 정의';
            },
            expressUsed(value, unit) {

                if (value == null)
                    value = 0;
                else
                    value = numberWithCommas(value);

                unit = unit === undefined ? " GB" : " 페이지";

                return value + unit;
            },
            expressLimit(value, unit) {

                unit = unit === undefined ? " GB" : " 페이지";

                if (value == 0 || value === undefined)
                    value = "제한없음";
                else
                    value = numberWithCommas(value) + unit;

                return value;
            },
            expressDate(value) {

                return new Date(value).format('yyyy.MM.dd');
            },
        },
        created() {

            this.beforePageInfo = this.$route.query;

            let userId = this.$route.params.userId;

            axios.post("/management/user_server/detail/user/" + userId + "/").then(response => {

                if (response.status == 200) {

                    let user = response.data.user[0];

                    for (let prop in user) {

                        this.user[prop.replace('bu_', '')] = user[prop];
                    }
                }
            }).catch(ex => {

                console.log(ex);
            });

            this.activeTab = 1;
        },
        mounted() {

            jQuery("nav#gnb").mCustomScrollbar({
                theme:"minimal-dark"
            });
            jQuery("article#contents.sub .content").mCustomScrollbar({
                theme:"minimal-dark"
            });

            //셀렉트박스 UI
            jQuery(".selectbox_ui").each(function() {
                initSelectBox(jQuery(this)) //비동기로 셀렉트 박스를 만들었을 경우 initSelectBox(jQuery("#아이디")) 로 실행시켜줘야 함
            })
        }
    }

function numberWithCommas(x) {

    let value;

    try {

        value= x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } catch (ex) {

        console.log(ex)
        console.log(x)
    }

    return value;
}
</script>

<style scoped>

</style>

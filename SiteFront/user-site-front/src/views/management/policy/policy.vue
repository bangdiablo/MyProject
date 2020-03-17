<template>
    <article id="contents" class="sub">
        <location/>
        <div class="content">
            <div class="admin_list">
                <div class="board_search_edit">
                    <fieldset class="search_form left">
                        <legend>정책검색</legend>
                        <p>
                            <input type="text" title="검색어 입력" ref="searchpolicy" v-model="searchpolicy"
                                   @keyup.enter="searchPolicy"/>
                            <button type="button" class="btn_search" @click="searchPolicy"><img
                                    src="@/assets/images/component/btn_bse_search.png"
                                    alt="검색"/></button>
                        </p>
                    </fieldset>
                    <div class="btn_edit right">
                        <button type="button"><img src="@/assets/images/component/btn_edit_policy.png" alt=""
                                                   class="ico"/>
                            <router-link to="/management/create_policy"><span
                                    class="txt">{{ $t('policy.policy_create') }}</span></router-link>
                        </button>
                    </div>
                </div>
                <table class="board_list">
                    <caption>파일리스트</caption>
                    <colgroup>
<!--                        <col style="width:70px"/>-->
                        <col style="width:200px"/>
                        <col style="width:150px"/>
                        <col style="width:150px"/>
                        <col style="width:200px"/>
                        <col style="width:150px"/>
                    </colgroup>
                    <thead>
                    <tr>
<!--                        <th scope="col"><input type="checkbox" :title="$t('policy.check_all')" v-model="selectAll"-->
<!--                                               @click="select"/>-->
<!--                        </th>-->
                        <th scope="col"><a href="javascript:void(0)" class="sorting"
                                           @click="sorting('bp_name'), isActive1 = !isActive1"
                                           :class="[isActive1 ? 'on' : ''] ">{{ $t('policy.policy_name') }}</a>
                        </th>
                        <th scope="col"><a href="javascript:void(0)" class="sorting"
                                           @click="sorting('usercnt'), isActive2 = !isActive2"
                                           :class="[isActive2 ? 'on' : '']">{{ $t('policy.user_cnt') }}</a>
                        </th>
                        <th scope="col"><a href="javascript:void(0)" class="sorting"
                                           @click="sorting('servercnt'), isActive3 = !isActive3"
                                           :class="[isActive3 ? 'on' : '']">{{ $t('policy.server_cnt') }}</a>
                        </th>
                        <th scope="col"><a href="javascript:void(0)" class="sorting"
                                           @click="sorting('bp_createdate'), isActive4 = !isActive4"
                                           :class="[isActive4 ? 'on' : '']">{{ $t('policy.create_date') }}</a>
                        </th>
                        <th scope="col">{{ $t('policy.etc') }}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in policyList" :key="index" :class="{on: item.on}">
<!--                        <td><input type="checkbox" :title="$t('policy.check')" v-model="selected" :value="item.bp_id"/>-->
<!--                        </td>-->
                        <td class="left">{{item.bp_name}}</td>
                        <td class="link"><a @click="policyUserPopup(item.bp_id, 'U')">{{item.usercnt}}</a></td>
                        <td class="link"><a @click="policyUserPopup(item.bp_id, 'S')">{{item.servercnt}}</a></td>
                        <td>{{item.bp_createdate | formatDate}}</td>
                        <td class="item_edit">
                            <button type="button">
                                <router-link v-bind:to="`/management/regist_policy/${item.bp_id}/`"><i
                                        class="modify">수정</i></router-link>
                            </button>
                            <button type="button"><i class="delete" @click="deletePolicy(item.bp_id)">삭제</i></button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="board_empty" v-if="policyList == 0 || policyList == null ">
                    <img src="@/assets/images/component/ico_admin_empty.png" alt="" class="ico"/>
                    <p>정책이 없습니다.</p>
                </div>
                <div class="page_navi">
                    <a @click="prevPage" class="guide prev"><img src="@/assets/images/component/btn_page_prev.png"
                                                                 alt="Prev"
                                                                 class="ico"></a>
                    <a v-for="Page in Pages" @click="selectPage(Page)" class="num"
                       :class="{ active: Page == pageNum+1 }">{{Page}}</a>

                    <a @click="nextPage" class="guide next"><img src="@/assets/images/component/btn_page_next.png"
                                                                 alt="Next"
                                                                 class="ico"></a>
                </div>
                <!--<div class="board_empty">
                  <img src="@/assets/images/component/ico_admin_empty.png" alt="" class="ico" />
                  <p>정책이 없습니다.</p>
                </div>-->
            </div>
            <modals-container/>
        </div>
    </article>
</template>

<script>
    import moment from 'moment'
    import policyUserPopup from './policy_popup'
    import $ from "jquery";
    import {mapState} from 'vuex'
    import {EventBus} from "../../../plugins/event-bus";

    export default {
        data() {
            return {
                policy_list: [],
                list: [],
                firstList: "",
                pageNum: 0,
                pageSize: 10,
                currentSortDir: 'desc',
                currentSort: "",
                selectAll: false,
                selected: [],
                active_el: undefined,
                isActive: false,
                isActive1: false,
                isActive2: false,
                isActive3: false,
                isActive4: false,
                bp_id: '',
                bp_div: '',
                searchpolicy: '',
            }
        },
        components: {
            appMyModal: policyUserPopup,
        },
        computed: {
            userinfo() {
                return this.$store.state.header.user;
            },
            policyList() {
                let start = this.pageNum * Number(this.pageSize),
                    end = start + Number(this.pageSize);

                return this.policy_list.slice(start, end)
                    .sort(function (a, b) {
                        let modifier = 1;
                        if (this.currentSortDir === 'desc') modifier = -1;
                        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                        return 0;
                    }.bind(this));
            },
            policySize() {
                return this.policy_list.length;
            },
            setPolicyData() {
                return this.$store.state.management.policy.setPolicy
            },
            Pages() {
                let page = []
                let maxpage = Math.ceil(this.policySize / this.pageSize);
                let Num = this.pageNum;
                let start = 0;
                let end = 0;
                if (Num < 3) {
                    start = 1
                    if (start + 4 < maxpage) {
                        end = start + 4
                    } else {
                        end = maxpage
                    }
                } else {
                    start = Num - 1
                    if (start + 4 < maxpage) {
                        end = start + 4
                    } else {
                        end = maxpage
                        start = end - 4
                    }
                }
                for (let index = start; index <= end; index++) {
                    page.push(index);
                }
                return page
            },
        },
        watch: {
            pageSize() {
                this.pageNum = 0
            }
        },
        methods: {
            /* 정책리스트 */
            get_policy_list(data) {
                axios.get('/management/policy_list/',
                    {
                        params: {
                            userid: data.userid,
                            email: data.email,
                            accountid: data.accountid
                        }
                    }
                )
                    .then((response) => {
                        // console.log("response.data===", response.data)
                        this.policy_list = response.data
                    })
            },
            nextPage() {
                if (this.pageNum < Math.ceil(this.policySize / this.pageSize) - 1) {
                    this.pageNum += 1;
                } else {
                    //alert("마지막 페이지 입니다.");
                }
            },
            prevPage() {
                if (this.pageNum > 0) {
                    this.pageNum -= 1;
                } else {
                    // alert("첫번째 페이지 입니다.");
                }
            },
            selectPage(num) {
                this.pageNum = num - 1
            },
            select() {
                this.selected = [];
                if (!this.selectAll) {
                    for (let i in this.policy_list) {
                        this.selected.push(this.policy_list[i].bp_id);
                    }
                }
            },
            sorting(key) {
                this.currentSort = key
                this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
                this.isActive = !this.isActive
                // return this.active_el = key
            },
            policyUserPopup(bp_id, div) {
                //MODAL
                this.$modal.show(policyUserPopup, {
                    bp_id: bp_id,
                    bp_div: div,
                    modal: this.$modal
                }, {
                    name: 'dynamic-modal',
                    width: '330px',
                    height: '130px',
                    draggable: false,
                })
            },
            searchPolicy() {
                if (this.searchpolicy != "") {
                    this.search_manage()
                } else {
                    // alert('검색어를 입력해주세요')
                    // alert('検索語を入力してください。');
                    // this.$refs.searchpolicy.focus()
                    const userid = this.$store.state.header.user.id
                    const email = this.$store.state.header.user.email
                    var accountid = this.$store.state.header.user.resellerid

                    let data = {
                        userid: userid,
                        email: email,
                        accountid: accountid
                    }
                    this.get_policy_list(data)
                }
            },
            search_manage() {
                const userid = this.$store.state.header.user.id
                const email = this.$store.state.header.user.email
                const searchval = this.searchpolicy
                //임시-START
                var accountid = this.$store.state.header.user.resellerid

                // if (undefined !== accountid) {
                //     accountid = 9
                // } else {
                //     accountid = this.$store.state.header.user.resellerid
                // }
                //임시-END
                let data = {
                    userid: userid,
                    email: email,
                    accountid: accountid,
                    searchval: searchval
                }

                axios.get('/management/policy_search/',
                    {
                        params: {
                            userid: data.userid,
                            email: data.email,
                            accountid: data.accountid,
                            searchval: data.searchval
                        }
                    }
                ).then((response) => {
                    // console.log("response.data===", response.data)
                    this.policy_list = response.data
                })

            },
            deletePolicy(bp_id) {
                if (confirm("이 정책을 삭제해도 되겠습니까?")) {
                    axios.delete('/management/policy_delete/' + bp_id)
                        .then((response) => {
                            // alert("삭제 되었습니다.")
                            alert("削除されました。");
                            let data = {
                                userid: this.$store.state.header.user.id,
                                email: this.$store.state.header.user.email,
                                accountid: this.$store.state.header.user.resellerid
                            }
                            this.get_policy_list(data)
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
            }
        },
        created() {
            const userid = this.$store.state.header.user.id
            const email = this.$store.state.header.user.email
            // const accountid = this.$store.state.header.user.accountid

            //임시정책테스트-START
            var accountid = this.$store.state.header.user.resellerid
            // if (accountid == '') {
            //     accountid = 9
            // } else {
            //     accountid = accountid
            // }
            //임시정책테스트-END

            let data = {
                userid: userid,
                email: email,
                accountid: accountid
            }
            // console.log("accountid==", accountid)

            // if (undefined !== accountid && accountid != '') {
                this.get_policy_list(data)
            // }
            // this.get_policy_list(data)
            // EventBus.$emit('coldstoragefile_searchList')
        },
        filters: {
            formatDate: function (value) {
                if (value) {
                    return moment(String(value)).format('YYYY-MM-DD')
                }
            }
        },
        mounted() {
            // $(document).ready(function ($) {
            //   jQuery("article#contents.sub .content").mCustomScrollbar({
            //     theme: "minimal-dark"
            //   });
            //
            //   //셀렉트박스 UI
            //   jQuery(".selectbox_ui").each(function () {
            //     initSelectBox(jQuery(this)) //비동기로 셀렉트 박스를 만들었을 경우 initSelectBox(jQuery("#아이디")) 로 실행시켜줘야 함
            //   })
            // });
        }
    }
</script>

<style scoped>
    .link {
        cursor: pointer;
    }

</style>

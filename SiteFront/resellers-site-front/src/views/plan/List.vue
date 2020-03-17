<template>
    <section class="content">

        <!-- title bar -->
        <TitleBar/>

        <!-- sub_content -->
        <article class="sub_content">
            <div class="filter_wrap clear_both">

                <!-- search -->
                <ListSearch/>

                <div class="filter_btnList float_right">
                    <ul>
                        <li><router-link to="/plan/add" class="btn_filter_common" title="플랜추가"><span class="btn_filter ico_addReseller"></span>플랜추가</router-link></li>
                        <!-- class="on" 으로 활성 -->
                    </ul>
                </div>
            </div>

            <template v-if="list.length > 0">
                <div class="list_wrap">
                    <table cellspacing="0" class="table_type01">
                        <caption>계정 목록</caption>
                        <thead>
                            <tr>
                                <!-- class="on" 추가하면 화살표 위로 바뀜 -->
                                <th scope="col"><a href="javascript:void(0)" class="sorting inactive">종류<span class="ico_upDown on"></span></a></th>
                                <th scope="col"><a href="javascript:void(0)" class="sorting inactive">플랜명<span class="ico_upDown"></span></a></th>
                                <th scope="col"><a href="javascript:void(0)" class="sorting inactive">기간<span class="ico_upDown"></span></a></th>
                                <th scope="col"><a href="javascript:void(0)" class="sorting inactive">리셀러<span class="ico_upDown"></span></a></th>
                                <th scope="col"><a href="javascript:void(0)" class="sorting inactive">사용자<span class="ico_upDown"></span></a></th>
                                <th scope="col"><a href="javascript:void(0)" class="sorting inactive">상태<span class="ico_upDown"></span></a></th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- 선택 row class="on" -->
                            <tr class="pointer" v-for="item in list" :key="item.id">
                                <td>{{item.kind_name}}</td>
                                <td>{{item.plan_name}}</td>
                                <td>{{expressDate(item.expiration_date)}}</td>
                                <td>{{item.reseller_cnt}}</td>
                                <td>{{expressLimit(item.user_limit)}}</td>
                                <td>
                                    <span v-if="item.status === 1" class="text_ico ico_available">사용가능</span>
                                    <span v-else-if="item.status === 2" class="text_ico ico_unavailable">사용불가</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- S : page -->
                <ListPaging :pageInfo="pageInfo" :listCnt="list.length" @getList="getList"/>
                <!-- E : page -->

            </template>

            <div class="list_wrap" v-else>
                <img src="@/assets/images/component/ico_admin_empty.png" alt="" class="ico" />
                <p>플랜이 없습니다.</p>
            </div>

        </article>

    </section>
</template>

<script>
    import ListPaging from "../../components/common/ListPaging";
    import ListSearch from '../../components/common/ListSearch'
    import mixinDate from '../../mixin/date'

    export default {
        name: "List",
        components: {
            ListPaging,
            ListSearch,
        },
        mixins: [mixinDate],
        data() {
            return {
                list: [
                    {
                        checked: false,
                        id: 1,
                        kind: 1,
                        kind_name: 'Business',
                        plan_name: 'sdi1213',
                        expiration_date: null,
                        reseller_cnt: 3,
                        user_limit: 0,
                        status: 1,
                        status_name: '사용 가능',
                    },
                    {
                        checked: false,
                        id: 2,
                        kind: 2,
                        kind_name: 'Home',
                        plan_name: 'HomeSpecial',
                        expiration_date: new Date(2024, 1, 23),
                        reseller_cnt: 5,
                        user_limit: 40,
                        status: 1,
                        status_name: '사용 가능',
                    },
                    {
                        checked: false,
                        id: 3,
                        kind: 1,
                        kind_name: 'Business',
                        plan_name: 'BusiPlaner',
                        expiration_date: null,
                        reseller_cnt: 1,
                        user_limit: 0,
                        status: 2,
                        status_name: '사용 불가',
                    },
                ],
                pageInfo: {
                    totalData: 3,       // 총 데이터 수
                    currentPage: 1,     // 현재 페이지
                    pagesPerOnce: 10,   // 한 번에 보이는 페이지 수
                    dataPerPage: 10,    // 한 페이지에 보이는 data 수
                    searchText: '',
                    orderName: '',
                    orderType: ''
                },
            }
        },
        methods: {

            expressDate(date) {

                if (date === null) {
                    return '무제한';
                }

                return this.dateFormat(date);
            },

            expressLimit(limit) {

                if (limit === 0) {
                    return "무제한";
                } else {
                    return limit;
                }
            }
        },
        mounted() {

          $(function () {

              jQuery("section.content .sub_content").mCustomScrollbar({
                  theme:"minimal-dark"
              });
          });
        },
    }
</script>

<style scoped>

</style>
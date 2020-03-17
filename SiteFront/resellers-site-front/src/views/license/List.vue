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
                        <li><router-link to="/license/add" class="btn_filter_common" title="라이센스 추가"><span class="btn_filter ico_addReseller"></span>라이센스 추가</router-link></li>
                        <li><button type="button" class="btn_filter_common" title="내보내기"><span class="btn_filter ico_export"></span>내보내기</button></li>
                        <li><button type="button" class="btn_filter_common" title="일괄변경"><span class="btn_filter ico_change"></span>일괄변경</button></li>
                        <!-- class="on" 으로 활성 -->
                    </ul>
                </div>
            </div>

            <template v-if="list.length > 0">
                <div class="list_wrap">
                    <table cellspacing="0" class="table_type01">
                        <caption>라이센스 목록</caption>
                        <thead>
                            <tr>
                                <!-- class="on" 추가하면 화살표 위로 바뀜 -->
                                <th scope="col"><a href="javascript:void(0)" class="sorting inactive">라이센스<span class="ico_upDown on"></span></a></th>
                                <th scope="col"><a href="javascript:void(0)" class="sorting inactive">회사명<span class="ico_upDown"></span></a></th>
                                <th scope="col"><a href="javascript:void(0)" class="sorting inactive">발급일<span class="ico_upDown"></span></a></th>
                                <th scope="col"><a href="javascript:void(0)" class="sorting inactive">활성일<span class="ico_upDown"></span></a></th>
                                <th scope="col"><a href="javascript:void(0)" class="sorting inactive">종료일<span class="ico_upDown"></span></a></th>
                                <th scope="col"><a href="javascript:void(0)" class="sorting inactive">기간<span class="ico_upDown"></span></a></th>
                                <th scope="col"><a href="javascript:void(0)" class="sorting inactive">상태<span class="ico_upDown"></span></a></th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- 선택 row class="on" -->
                            <tr class="pointer" v-for="item in list" :key="item.id">
                                <td>{{item.license}}</td>
                                <td>{{item.company_name}}</td>
                                <td>{{expressDate(item.publish_date)}}</td>
                                <td>{{expressDate(item.activate_date)}}</td>
                                <td>{{expressDate(item.expiration_date)}}</td>
                                <td>{{item.duration_name}}</td>
                                <td>
                                    <span v-if="item.status === 0" class="text_ico ico_unused">미사용</span>
                                    <span v-else-if="item.status === 1" class="text_ico ico_completedUse">사용완료</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- S : page -->
                <ListPaging :pageInfo="pageInfo" :listCnt="list.length" @getList="getList"/>
                <!-- E : page -->

            </template>

            <div class="board_empty" v-else>
                <img src="@/assets/images/component/ico_admin_empty.png" alt="" class="ico" />
                <p>라이센스가 없습니다.</p>
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
                        license: '12345678901234',
                        company: 4,
                        company_name: 'Samsung',
                        publish_date: new Date (2020, 2, 15),
                        activate_date: null,
                        expiration_date: null,
                        duration: '1',
                        duration_name: '6개월',
                        status: 0,
                        status_name: '미사용',
                    },
                    {
                        checked: false,
                        id: 2,
                        license: '12345678901235',
                        company: 5,
                        company_name: 'LG',
                        publish_date: new Date (2020, 2, 16),
                        activate_date: new Date (2020, 2, 16),
                        expiration_date: new Date (2021, 2, 16),
                        duration: '2',
                        duration_name: '1년',
                        status: 1,
                        status_name: '사용 완료',
                    },
                    {
                        checked: false,
                        id: 3,
                        license: '12345678901236',
                        company: 6,
                        company_name: 'SK',
                        publish_date: new Date (2020, 2, 17),
                        activate_date: new Date (2020, 2, 17),
                        expiration_date: new Date (2022, 2, 17),
                        duration: '3',
                        duration_name: '2년',
                        status: 1,
                        status_name: '사용 완료',
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

            expressDate(date, dateType) {

                let nullValue = '-';

                if (dateType === 'infinity') {
                    nullValue = '무제한';
                }

                if (date === null) {
                    return nullValue;
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
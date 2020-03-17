<template>
    <div>
        <div class="list_wrap">
            <table cellspacing="0" class="table_type01">
                <caption>감사 리포트 리스트</caption>
                <thead>
                    <tr>
                        <!-- class="on" 추가하면 화살표 위로 바뀜 -->
                        <th scope="col"><a href="javascript:void(0)" class="sorting inactive">일시<span class="ico_upDown on"></span></a></th>
                        <th scope="col"><a href="javascript:void(0)" class="sorting inactive">실행자<span class="ico_upDown"></span></a></th>
                        <th scope="col"><a href="javascript:void(0)" class="sorting inactive">권한<span class="ico_upDown"></span></a></th>
                        <th scope="col"><a href="javascript:void(0)" class="sorting inactive">조작<span class="ico_upDown"></span></a></th>
                        <th scope="col"><a href="javascript:void(0)" class="sorting inactive">대상<span class="ico_upDown"></span></a></th>
                    </tr>
                </thead>
                <tbody>
                    <!-- 선택 row class="on" -->
                    <tr class="pointer" v-for="item in list" :key="item.id">
                        <td>{{expressDate(item.datetime, 'yyyy-MM-dd HH:mm a/p')}}</td>
                        <td>{{item.account_name}}</td>
                        <td>{{item.auth_name}}</td>
                        <td>{{item.device_name}}</td>
                        <td>{{item.status_name}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- S : page -->
        <ListPaging :pageInfo="pageInfo" :listCnt="list.length"/>
        <!-- E : page -->
    </div>
</template>

<script>
    import ListPaging from "../common/ListPaging";
    import ListSearch from "../common/ListSearch";
    import mixinDate from "../../mixin/date";

    export default {
        name: "ListNormal",
        components: {
            ListPaging,
            ListSearch,
        },
        mixins: [mixinDate],
        data() {
            return {
                list: [
                    {
                        id: 1,
                        datetime: new Date(2020, 2, 21, 22, 10, 23),
                        account_name: 'AOSBOXInteli',
                        auth_name: '관리자',
                        device_name: 'SEO-DESIGN',
                        status: 1,
                        status_name: '백업 개시',
                    },
                    {
                        id: 2,
                        datetime: new Date(2020, 2, 21, 22, 8, 23),
                        account_name: 'DS Comp',
                        auth_name: '계정',
                        device_name: 'DESKTOP-417C9EI',
                        status: 2,
                        status_name: '백업 종료',
                    },
                    {
                        id: 3,
                        datetime: new Date(2020, 2, 21, 15, 10, 23),
                        account_name: 'AOSBOXInteli',
                        auth_name: 'JHI',
                        device_name: 'DROPBOX',
                        status: 3,
                        status_name: '복원 시작',
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

            expressDate(date, dateFormat) {

                if (date === null) {
                    return '무제한';
                }

                return this.dateFormat(date, dateFormat);
            },

            expressLimit(limit) {

                if (limit === 0) {
                    return "무제한";
                } else {
                    return limit;
                }
            }
        }
    }
</script>

<style scoped>

</style>
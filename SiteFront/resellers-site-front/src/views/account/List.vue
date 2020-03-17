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
                        <li><router-link to="/account/add" class="btn_filter_common" title="계정추가"><span class="btn_filter ico_addReseller"></span>계정추가</router-link></li>
                        <li><button type="button" class="btn_filter_common" title="내보내기"><span class="btn_filter ico_export"></span>내보내기</button></li>
                        <li><button type="button" class="btn_filter_common" title="계정활성화"><span class="btn_filter ico_activeAccount"></span>계정활성화</button></li>
                        <li><button type="button" class="btn_filter_common" title="계정일시정지"><span class="btn_filter ico_suspensionAccount"></span>계정일시정지</button></li>
                        <li><button type="button" class="btn_filter_common" title="계정삭제"><span class="btn_filter ico_deleteAccount"></span>계정삭제</button></li>
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
                                <th scope="col"><input type="checkbox" title="전체선택"></th>
                                <!-- class="on" 추가하면 화살표 위로 바뀜 -->
                                <th scope="col"><a href="javascript:void(0)" class="sorting inactive">회사명<span class="ico_upDown on"></span></a></th>
                                <th scope="col"><a href="javascript:void(0)" class="sorting inactive">등록일<span class="ico_upDown"></span></a></th>
                                <th scope="col"><a href="javascript:void(0)" class="sorting inactive">종류<span class="ico_upDown"></span></a></th>
                                <th scope="col"><a href="javascript:void(0)" class="sorting inactive">사용자<span class="ico_upDown"></span></a></th>
                                <th scope="col"><a href="javascript:void(0)" class="sorting inactive">상태<span class="ico_upDown"></span></a></th>
                                <th scope="col"><a href="javascript:void(0)" class="sorting inactive">유효기간<span class="ico_upDown"></span></a></th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- 선택 row class="on" -->
                            <tr class="pointer" v-for="item in list" :key="item.id">
                                <td @click.stop><input type="checkbox" title="선택" v-model:cheked="item.checked" /></td>
                                <td>{{item.company_name}}</td>
                                <td>{{dateFormat(item.reg_date)}}</td>
                                <td>{{item.kind_name}}</td>
                                <td>{{expressUserColumn(item.user_used, item.user_limit)}}</td>
                                <td>
                                    <span v-if="item.status === 1" class="text_ico ico_approved">유효</span>
                                    <span v-if="item.status === 2" class="text_ico ico_pendingApproval">일시정지</span>
                                </td>
                                <td>{{dateFormat(item.expiration_date)}}</td>
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
                <p>계정이 없습니다.</p>
            </div>

        </article>

        <!-- S : layer_popup 계정 미선택 -->
        <div class="layer_popup">
            <div class="layer_inner">
                <div class="layer_content none_title canceled">
                    <strong>Canceled</strong>
                    <p class="default_text">계정을 선택하세요</p>
                    <!-- 이미 활성화 된 리셀러를 선택한 경우 -->
                    <!-- <p>이미 활성화 되고 있습니다.</p> -->
                    <button type="button" class="btn_layer_common btn_red">OK</button>
                </div>
            </div>
        </div>
        <!-- E : layer_popup 계정 미선택 -->

        <!-- S : layer_popup 계정 활성화 -->
        <div class="layer_popup">
            <div class="layer_inner">
                <div class="layer_content checked">
                    <h5>계정 활성화</h5>
                    <div class="content_inner">
                        <p class="default_text">선택한 항목을 활성화 하시겠습니까?</p>

                        <div class="layer_btn_wrap">
                            <button type="button" class="btn_layer_common btn_blue">OK</button>
                            <button type="button" class="btn_layer_common btn_white">취소</button>
                        </div>
                    </div>
                    <button class="btn_close" type="button">
                        <span class="blind">닫기</span>
                        <span class="ico_close"></span>
                    </button>
                </div>
            </div>
        </div>
        <!-- E : layer_popup 계정 활성화 -->

        <!-- S : layer_popup 계정 일시정지 -->
        <div class="layer_popup">
            <div class="layer_inner">
                <div class="layer_content confirm">
                    <h5>계정 일시정지</h5>
                    <div class="content_inner">
                        <p class="default_text">선택한 항목을 일시정지해도 되겠습니까?</p>

                        <div class="layer_btn_wrap">
                            <button type="button" class="btn_layer_common btn_blue">OK</button>
                            <button type="button" class="btn_layer_common btn_white">취소</button>
                        </div>
                    </div>
                    <button class="btn_close" type="button">
                        <span class="blind">닫기</span>
                        <span class="ico_close"></span>
                    </button>
                </div>
            </div>
        </div>
        <!-- E : layer_popup 계정 활성화 -->

        <!-- S : layer_popup 계정 삭제 -->
        <div class="layer_popup">
            <div class="layer_inner">
                <div class="layer_content confirm">
                    <h5>계정 삭제</h5>
                    <div class="content_inner">
                        <p class="default_text">선택한 계정을 삭제하시겠습니까?</p>

                        <div class="layer_btn_wrap">
                            <button type="button" class="btn_layer_common btn_blue">OK</button>
                            <button type="button" class="btn_layer_common btn_white">취소</button>
                        </div>
                    </div>
                    <button class="btn_close" type="button">
                        <span class="blind">닫기</span>
                        <span class="ico_close"></span>
                    </button>
                </div>
            </div>
        </div>
        <!-- E : layer_popup 계정 삭제 -->
    </section>
</template>

<script>
    import ListPaging from '../../components/common/ListPaging'
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
                        company_id: '4',
                        company_name: 'Samsung',
                        reg_date: new Date(2020, 2, 13),
                        kind: 1,
                        kind_name: 'Business',
                        user_used: 3,
                        user_limit: 0,
                        status: 1,
                        status_name: '유효',
                        expiration_date: new Date(2022, 2, 13)
                    },
                    {
                        checked: false,
                        id: 2,
                        company_id: '5',
                        company_name: 'LG',
                        reg_date: new Date(2020, 2, 14),
                        kind: 1,
                        kind_name: 'Business',
                        user_used: 25,
                        user_limit: 0,
                        status: 2,
                        status_name: '일시정지',
                        expiration_date: new Date(2022, 4, 14)
                    },
                    {
                        checked: false,
                        id: 3,
                        company_id: '6',
                        company_name: 'SK',
                        reg_date: new Date(2020, 2, 15),
                        kind: 2,
                        kind_name: 'Home',
                        user_used: 17,
                        user_limit: 0,
                        status: 1,
                        status_name: '유효',
                        expiration_date: new Date(2022, 8, 15)
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

            expressUserColumn(usedUser, limitedUser) {

                if (limitedUser === 0) {
                    limitedUser = '무제한';
                }

                return usedUser + " / " + limitedUser;
            },

            getList() {

                let obj = JSON.parse(JSON.stringify(this.list[this.list.length - 1]));
                obj.id++;
                this.list.push(obj);
            }
        },
        created () {

            this.getList();
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
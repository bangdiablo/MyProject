<template>
    <section class="content">

        <!-- title bar -->
        <TitleBar/>

        <!-- sub_content -->
        <article class="sub_content">
            <div class="filter_wrap clear_both">

                <!-- search -->
                <ListSearch @getList="getList"/>

                <div class="filter_btnList float_right">
                    <ul>
                        <li><router-link to="/reseller/add" class="btn_filter_common" title="리셀러추가"><span class="btn_filter ico_addReseller"></span>리셀러추가</router-link></li>
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
                        <caption>리셀러 관리</caption>
                        <thead>
                            <tr>
                                <th scope="col"><input type="checkbox" title="전체선택"></th>
                                <!-- class="on" 추가하면 화살표 위로 바뀜 -->
                                <th scope="col"><a href="javascript:void(0)" class="sorting" @click="sortList" data-sort="id">코드명<span class="ico_upDown"></span></a></th>
                                <th scope="col"><a href="javascript:void(0)" class="sorting" @click="sortList" data-sort="companyname">회사명<span class="ico_upDown"></span></a></th>
                                <th scope="col"><a href="javascript:void(0)" class="sorting" @click="sortList" data-sort="createdate">등록일<span class="ico_upDown"></span></a></th>
                                <th scope="col"><a href="javascript:void(0)" class="sorting" @click="sortList" data-sort="license_cnt">보유라이센스<span class="ico_upDown"></span></a></th>
                                <th scope="col"><a href="javascript:void(0)" class="sorting" @click="sortList" data-sort="plan_cnt">보유플랜<span class="ico_upDown"></span></a></th>
                                <th scope="col"><a href="javascript:void(0)" class="sorting" @click="sortList" data-sort="account_cnt">계정<span class="ico_upDown"></span></a></th>
                                <th scope="col"><a href="javascript:void(0)" class="sorting" @click="sortList" data-sort="status">상태<span class="ico_upDown"></span></a></th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- 선택 row class="on" -->
                            <tr class="pointer" v-for="item in list" :key="item.id">
                                <td @click.stop><input type="checkbox" title="선택" v-model:cheked="item.checked" /></td>
                                <td>{{item.id}}</td>
                                <td>{{item.companyname}}</td>
                                <td>{{dateFormat(item.createdate)}}</td>
                                <td>{{item.license_cnt}}</td>
                                <td>{{item.plan_cnt}}</td>
                                <td>{{item.account_cnt}}</td>
                                <td>
                                    <span v-if="item.status === 'A'" class="text_ico ico_approved">유효</span>
                                    <span v-else-if="item.status === 'S'" class="text_ico ico_pendingApproval">일시정지</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- S : page -->
                    <ListPaging :pageInfo="pageInfo"/>
                    <!-- E : page -->
                </div>
            </template>

            <div class="list_wrap" v-else>
                  <img src="@/assets/images/component/ico_admin_empty.png" alt="" class="ico" />
                <p>리셀러가 없습니다.</p>
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
                list: [],
                pageInfo: {
                    totalData: 0,       // 총 데이터 수
                    currentPage: 1,     // 현재 페이지
                    pagesPerOnce: 10,   // 한 번에 보이는 페이지 수
                    dataPerPage: 10,    // 한 페이지에 보이는 data 수
                    searchText: '',
                    orderName: '',
                    orderType: ''
                },
            }
        },
        created() {

            this.getList();
        },
        mounted() {

            $(function () {

                jQuery("section.content .sub_content").mCustomScrollbar({
                    theme:"minimal-dark"
                });
            });
        },
        methods: {

            getList () {

                const self = this;

                // this.$nextTick(function() {

                    axios.post("/reseller/", {
                        searchText: self.pageInfo.searchText,
                        currentPage: self.pageInfo.currentPage,
                        dataPerPage: self.pageInfo.dataPerPage,
                        orderName : self.pageInfo.orderName,
                        orderType : self.pageInfo.orderType
                    }).then(response => {

                        if (response.status == 200) {

                            let dataList = response.data.list,
                                totalListCount = response.data.totalListCount;

                            self.pageInfo.totalData = totalListCount;

                            let list = [];

                            for (let i = 0; i < dataList.length; i++) {

                                let data = dataList[i];
                                let obj = {};

                                for (let prop in data) {

                                    let newPropName = prop.replace('rs_', '');

                                    obj[newPropName] = data[prop];

                                    // switch(prop) {
                                    //     case 'bu_gnrlsto':
                                    //     case 'bu_coldsto':
                                    //     case 'bu_ocr':
                                    //         if (data[prop] == null)
                                    //             obj[newPropName] = 0;
                                    //         break;
                                    //
                                    //     case 'bu_gnrllimit':
                                    //     case 'bu_coldlimit':
                                    //     case 'bu_ocrlimit':
                                    //         if (data[prop] == 0)
                                    //             obj[newPropName] = '';
                                    //         break;
                                    //
                                    //     default:
                                    //         // do nothing
                                    // }
                                }

                                // obj.id = boxUsers[i].bu_id;
                                obj.checked = false;
                                // obj.userContext = {
                                //     show: false,
                                //     user: {show: false},
                                //     policy: {show: false},
                                //     restrict: {show: false}
                                // };

                                list.push(obj);
                            }

                            self.list = list;
                            // this.$store.dispatch('management/setUserList', list);
                        }
                    }).catch(ex => {

                        console.log(ex);
                    });
                // });
            },

            // 목록 정렬
            sortList(event) {

                this.setSort(event);
                this.getList();
            },

            setSort(event) {

                let $target = $(event.target).find("span"),
                    $sortings = $("a.sorting span"),
                    orderName = '',
                    orderType = '';

                // 나머지 비활성화
                $sortings.each(function () {

                    if ($(this)[0] != $target[0]) {

                        $(this).addClass('inactive').removeClass('on');
                    }
                });

                if ($target.hasClass('inactive')) {

                    // 해당 항목 활성화
                    $target.removeClass('inactive');
                    $target.addClass('on');

                } else {

                    if ($target.hasClass('on')) {

                        $target.removeClass('on');

                    } else {

                        $target.addClass('inactive');
                    }
                }

                $sortings.each(function () {

                    if ($(this).hasClass("inactive")) {
                        // do nothing
                    } else {

                        orderName = $(this).parent().data("sort");
                        orderType = $(this).hasClass('on') ? 'asc' : 'desc';
                    }
                });

                this.pageInfo.orderName = orderName;
                this.pageInfo.orderType = orderType;
            }
        }
    }
</script>

<style scoped>

</style>
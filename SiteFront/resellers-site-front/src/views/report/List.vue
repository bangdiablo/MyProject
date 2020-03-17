<template>
    <section class="content">

        <!-- title bar -->
        <TitleBar/>

        <article class="sub_content sub_account_add sub_common">
            <div class="tabMenu_2depth">
                <ul class="clear_both">
                    <li><a v-on:click="activeTab=1" v-bind:class="[ activeTab === 1 ? 'active' : '']">일반 리포트</a></li>
                    <li><a v-on:click="activeTab=2" v-bind:class="[ activeTab === 2 ? 'active' : '']">감사 리포트</a></li>
                </ul>
            </div>
            <div class="filter_wrap clear_both">
                <div class="filter_btnList float_right">
                    <ul class="clear_both">
                        <li class="position_rel">
                            <button type="button" class="btn_filter_common" title="フィルター"><span class="btn_filter ico_addReseller"></span>フィルター</button>
                            <!-- S : 필터 레이어 -->
                            <div class="layer_popup_filter">
                                <h5>필터설정</h5>
                                <div class="layer_content">
                                    <fieldset class="range_form">
                                        <legend>필터 상세</legend>
                                        <table cellspacing="0" class="filter_table" width="100%">
                                            <tbody>
                                                <tr class="col_01">
                                                    <th>상태</th>
                                                    <td>
                                                        <span class="basic_select selectbox_ui">
                                                            <b class="selected_txt">모두</b>
                                                            <!-- class="focus" 추가 되면 화살표 방향 반대 -->
                                                            <select>
                                                                <option value="">모두</option>
                                                                <option value="">백업 개시</option>
                                                                <option value="">백업 종료</option>
                                                                <option value="">백업 일시 정지</option>
                                                                <option value="">백업 재개</option>
                                                                <option value="">복원 시작</option>
                                                                <option value="">제한</option>
                                                                <option value="">백업되지 않음</option>
                                                                <option value="">정지</option>
                                                                <option value="">공간 부족</option>
                                                                <option value="">종료 표시</option>
                                                            </select>
                                                        </span>
                                                    </td>
                                                    <th>계정</th>
                                                    <td>
                                                        <span class="basic_select selectbox_ui">
                                                            <b class="selected_txt">모두</b>
                                                            <!-- class="focus" 추가 되면 화살표 방향 반대 -->
                                                            <select>
                                                                <option value="">모두</option>
                                                                <option value="">백업 개시</option>
                                                                <option value="">백업 종료</option>
                                                                <option value="">백업 일시 정지</option>
                                                                <option value="">백업 재개</option>
                                                                <option value="">복원 시작</option>
                                                                <option value="">제한</option>
                                                            </select>
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>시작</th>
                                                    <td>
                                                        <span class="basic_datepicker">
                                                            <input type="text" placeholder="YYYY/MM/DD" id="startDate">
                                                            <button type="button" class="btn_caledar"></button>
                                                        </span>
                                                    </td>
                                                    <th>종료</th>
                                                    <td>
                                                        <span class="basic_datepicker">
                                                            <input type="text" placeholder="YYYY/MM/DD" id="endDate">
                                                            <button type="button" class="btn_caledar"></button>
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </fieldset>
                                    <div class="layer_btn_wrap">
                                        <button type="button" class="btn_layer_common btn_white" title="초기화">초기화</button>
                                        <button type="button" class="btn_layer_common btn_blue" title="설정">설정</button>
                                    </div>
                                </div>
                                <button class="btn_close" type="button">
                                    <span class="blind">닫기</span>
                                    <span class="ico_close"></span>
                                </button>
                            </div>
                            <!-- E : 필터 레이어 -->
                        </li>
                        <li><button type="button" class="btn_filter_common" title="내보내기"><span class="btn_filter ico_export"></span>내보내기</button></li>
                    </ul>
                </div>
            </div>

            <div v-show="isActiveTab(1)">
                <Normal/>
            </div>
            <div v-show="isActiveTab(2)">
                <Audit/>
            </div>

            <!-- S : page -->

            <!-- E : page -->
        </article>


<!--        <ul class="category_navi">-->
<!--          <li>-->
<!--            <a v-on:click="activeTab=1" v-bind:class="[ activeTab === 1 ? 'active' : '']">일반 리포트</a>-->
<!--          </li>-->
<!--          <li>-->
<!--            <a v-on:click="activeTab=2" v-bind:class="[ activeTab === 2 ? 'active' : '']">감사 리포트</a>-->
<!--          </li>-->
<!--        </ul>-->

<!--        <div class="content">-->
<!--            <div v-show="isActiveTab(1)">-->
<!--                <Normal/>-->
<!--            </div>-->
<!--            <div v-show="isActiveTab(2)">-->
<!--                <Audit/>-->
<!--            </div>-->
<!--        </div>-->
    </section>
</template>

<script>
    import Normal from '../../components/report/ListNormal'
    import Audit from '../../components/report/ListAudit'

    export default {
        name: "List",
        components: {
            Normal,
            Audit
        },
        data() {
            return {
                activeTab: 1
            }
        },
        computed: {
            isActiveTab() {

                return (activeTab) => {

                    return activeTab === this.activeTab;
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
.layer_popup_filter {
    display: none;
}
</style>
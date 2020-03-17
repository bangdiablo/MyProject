<template>
    <section class="content">
        <article class="sub_title">
            <h2><span class="ico_license">라이센스 관리</span></h2>
            <div class="location">
                <span>홈</span>
                <span class="gt_sign">&gt;</span>
                <span class="">라이센스 관리</span>
                <span class="gt_sign">&gt;</span>
                <span class="on">라이센스 정보</span>
                <!-- 현재 페이지 class="on" -->
            </div>
        </article>
        <article class="sub_content sub_common">
            <h3>라이센스 정보
                <a href="./license_main.html" class="btn_common01 btn_next_title"><span class="ico_list"></span>목록으로</a>
            </h3>
            <div class="info_wrap">
                <div class="info_top clear_both">
                    <div class="info_left">
                        <span class="thumbnail license"></span>
                        <span class="company_name">ライセンス</span>
                        <span class="status"><span class="text_ico ico_available"></span>D010257602751561</span>
                    </div>
                    <div class="info_right">
                        <div class="details clear_both">
                            <span class="h4">상세정보</span>
                            <div class="btn_list">
                                <ul>
                                    <li>
                                        <a href="./license_add.html" class="btn_common01" title="변경"><span class="ico_default ico_extend"></span>연장</a>
                                    </li>
                                    <li>
                                        <a href="./license_add.html" class="btn_common01" title="변경"><span class="ico_default ico_editName"></span>변경</a>
                                    </li>
                                    <li>
                                        <button type="button" class="btn_common01" title="삭제"><span class="ico_default ico_deleteAccount"></span>삭제</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <table cellspacing="0" cellpadding="0" class="table_type02">
                            <caption>라이센스 상세정보</caption>
                            <colgroup>
                                <col style="width:25%">
                                <col style="width:25%">
                                <col style="width:25%">
                                <col style="width:25%">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>회사명</th>
                                    <td>AOSBOXIntelli</td>
                                    <th>할당 메일주소</th>
                                    <td>dksjdkldflkdfkjl@aoskorea.com</td>
                                </tr>
                                <tr>
                                    <th>기간</th>
                                    <td>1년</td>
                                    <th>발급일</th>
                                    <td>2020-01-13</td>
                                </tr>
                                <tr>
                                    <th>발급수</th>
                                    <td>20</td>
                                    <th>발급자</th>
                                    <td>aosteam</td>
                                </tr>
                                <tr>
                                    <th>활성일</th>
                                    <td>2020-01-03</td>
                                    <th>종류</th>
                                    <td>데모용</td>
                                </tr>
                                <tr>
                                    <th>종료일</th>
                                    <td>2020-01-03</td>
                                    <th>상태</th>
                                    <td>미사용</td>
                                </tr>
                                <tr>
                                    <th>메모</th>
                                    <td colspan="3" class="position_rel">영업 겁나 못하는 리셀러에게 발급함<button type="button" class="btn_editMemo"><span class="blind">메모수정</span></button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="info_bottom clear_both">
                    <div class="graph_wrap storage">
                        <div class="graph">
                            <img src="@/assets/images/sub/sample_graph_01.png" alt="그래프 샘플">
                            <span class="percent">100%</span>
                        </div>
                        <div class="graph_text">
                            <b>일반 스토리지</b><br>
                            <span>할당량&nbsp;:&nbsp;</span><b>1000GB</b>
                        </div>
                    </div>
                    <div class="graph_wrap cold_storage">
                        <div class="graph">
                            <img src="@/assets/images/sub/sample_graph_02.png" alt="그래프 샘플">
                            <span class="percent">65%</span>
                        </div>
                        <div class="graph_text">
                            <b>콜드 스토리지</b><br>
                            <span>할당량&nbsp;:&nbsp;</span><b>1000GB</b>
                        </div>
                    </div>
                    <div class="graph_wrap ocr">
                        <div class="graph">
                            <img src="@/assets/images/sub/sample_graph_03.png" alt="그래프 샘플">
                            <span class="percent">65%</span>
                        </div>
                        <div class="graph_text">
                            <b>OCR</b><br>
                            <span>할당량&nbsp;:&nbsp;</span><b>1000GB</b>
                        </div>
                    </div>
                </div>
            </div>
            <div class="info_tabMenu">
                <ul class="clear_both">
                    <li><a href="http://" class="on">유저</a></li>
                    <!-- 선택 된 탭메뉴 a class="on" -->
                </ul>
            </div>
            <div class="filter_wrap clear_both">
                <div class="filter_search float_left">
                    <fieldset class="search_form left">
                        <legend>검색</legend>
                        <p>
                            <input type="text" title="검색어 입력" placeholder="검색">
                            <button type="button" class="btn_search">
                                <span class="blind">검색</span>
                                <span class="btn_search_ico"></span>
                            </button>
                        </p>
                    </fieldset>
                </div>
                <div class="filter_btnList float_right">
                    <ul>
                        <li><button type="button" class="btn_filter_common" title="내보내기"><span class="btn_filter ico_export"></span>내보내기</button></li>
                        <!-- class="on" 으로 활성 -->
                    </ul>
                </div>
            </div>
            <div class="list_wrap">
                <table cellspacing="0" class="table_type01">
                    <caption>유저 목록</caption>
                    <thead>
                        <tr>
                            <th scope="col"><a href="javascript:void(0)" class="sorting">이름<span class="ico_upDown on"></span></a></th>
                            <!-- class="on" 추가하면 화살표 위로 바뀜 -->
                            <th scope="col"><a href="javascript:void(0)" class="sorting">메일주소<span class="ico_upDown"></span></a></th>
                            <th scope="col"><a href="javascript:void(0)" class="sorting">관리자 권한<span class="ico_upDown"></span></a></th>
                            <th scope="col"><a href="javascript:void(0)" class="sorting">단말기<span class="ico_upDown"></span></a></th>
                            <th scope="col"><a href="javascript:void(0)" class="sorting">생성일<span class="ico_upDown"></span></a></th>
                            <th scope="col"><a href="javascript:void(0)" class="sorting">상태<span class="ico_upDown"></span></a></th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- 선택 row class="on" -->
                        <tr class="on">
                            <td>JHJ</td>
                            <td>abc@abc.com</td>
                            <td>O</td>
                            <td>3</td>
                            <td>2017-03-22</td>
                            <td><span class="text_ico ico_available">유효</span></td>
                        </tr>
                        <tr>
                            <td>BG yu</td>
                            <td>abc@abc.com</td>
                            <td>X</td>
                            <td>10</td>
                            <td>2017-03-22</td>
                            <td><span class="text_ico ico_pause">일시정지</span></td>
                        </tr>
                        <tr>
                            <td>JHJ</td>
                            <td>abc@abc.com</td>
                            <td>O</td>
                            <td>3</td>
                            <td>2017-03-22</td>
                            <td><span class="text_ico ico_available">유효</span></td>
                        </tr>
                        <tr>
                            <td>BG yu</td>
                            <td>abc@abc.com</td>
                            <td>X</td>
                            <td>10</td>
                            <td>2017-03-22</td>
                            <td><span class="text_ico ico_pause">일시정지</span></td>
                        </tr>
                        <tr>
                            <td>JHJ</td>
                            <td>abc@abc.com</td>
                            <td>O</td>
                            <td>3</td>
                            <td>2017-03-22</td>
                            <td><span class="text_ico ico_available">유효</span></td>
                        </tr>
                        <tr>
                            <td>BG yu</td>
                            <td>abc@abc.com</td>
                            <td>X</td>
                            <td>10</td>
                            <td>2017-03-22</td>
                            <td><span class="text_ico ico_pause">일시정지</span></td>
                        </tr>
                        <tr>
                            <td>JHJ</td>
                            <td>abc@abc.com</td>
                            <td>O</td>
                            <td>3</td>
                            <td>2017-03-22</td>
                            <td><span class="text_ico ico_available">유효</span></td>
                        </tr>
                        <tr>
                            <td>BG yu</td>
                            <td>abc@abc.com</td>
                            <td>X</td>
                            <td>10</td>
                            <td>2017-03-22</td>
                            <td><span class="text_ico ico_pause">일시정지</span></td>
                        </tr>
                        <tr>
                            <td>JHJ</td>
                            <td>abc@abc.com</td>
                            <td>O</td>
                            <td>3</td>
                            <td>2017-03-22</td>
                            <td><span class="text_ico ico_available">유효</span></td>
                        </tr>
                        <tr>
                            <td>BG yu</td>
                            <td>abc@abc.com</td>
                            <td>X</td>
                            <td>10</td>
                            <td>2017-03-22</td>
                            <td><span class="text_ico ico_pause">일시정지</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>


            <!-- S : page -->

            <!-- E : page -->

        </article>
    </section>
</template>

<script>
    export default {
        name: "Detail"
    }
</script>

<style scoped>

</style>
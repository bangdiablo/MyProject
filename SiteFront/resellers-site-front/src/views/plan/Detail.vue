<template>
    <section class="content">
        <article class="sub_title">
            <h2><span class="ico_plan">플랜</span></h2>
            <div class="location">
                <span>홈</span>
                <span class="gt_sign">&gt;</span>
                <span class="">플랜</span>
                <span class="gt_sign">&gt;</span>
                <span class="on">플랜 정보</span>
                <!-- 현재 페이지 class="on" -->
            </div>
        </article>
        <article class="sub_content sub_common">
            <h3>플랜 정보
                <a href="./plan_main.html" class="btn_common01 btn_next_title"><span class="ico_list"></span>목록으로</a>
            </h3>
            <div class="info_wrap">
                <div class="info_top clear_both">
                    <div class="info_left">
                        <span class="thumbnail plan"></span>
                        <span class="company_name">Home</span>
                        <span class="status"><span class="text_ico ico_available"></span>사용가능</span>
                    </div>
                    <div class="info_right">
                        <div class="details clear_both">
                            <span class="h4">상세정보</span>
                            <div class="btn_list">
                                <ul>
                                    <li>
                                        <button type="button" class="btn_common01" title="플랜 명 변경"><span class="ico_default ico_editName"></span>플랜 명 변경</button>
                                    </li>
                                        <li>
                                        <button type="button" class="btn_common01" title="삭제"><span class="ico_default ico_deleteAccount"></span>삭제</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <table cellspacing="0" cellpadding="0" class="table_type02">
                            <caption>플랜 상세정보</caption>
                            <colgroup>
                                <col style="width:25%">
                                <col style="width:25%">
                                <col style="width:25%">
                                <col style="width:25%">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>플랜 종류</th>
                                    <td>Home</td>
                                    <th>플랜명</th>
                                    <td>Hadi plan</td>
                                </tr>
                                <tr>
                                    <th>기간</th>
                                    <td>무제한</td>
                                    <th>리셀러</th>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <th>사용자</th>
                                    <td>무제한</td>
                                    <th>감사</th>
                                    <td>NA</td>
                                </tr>
                                <tr>
                                    <th>백업 형식</th>
                                    <td>컴퓨터</td>
                                    <th>외장 드라이브</th>
                                    <td>N</td>
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
                    <li><a href="http://" class="on">라이센스 관리</a></li>
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
            </div>

            <!-- S : tabMenu - 라이센스 관리-->
            <div class="list_wrap">
                <table cellspacing="0" class="table_type01">
                    <caption>라이센스 목록</caption>
                    <thead>
                        <tr>
                            <th scope="col"><a href="javascript:void(0)" class="sorting">라이센스<span class="ico_upDown on"></span></a></th>
                            <!-- class="on" 추가하면 화살표 위로 바뀜 -->
                            <th scope="col"><a href="javascript:void(0)" class="sorting">작성일<span class="ico_upDown"></span></a></th>
                            <th scope="col"><a href="javascript:void(0)" class="sorting">활성일<span class="ico_upDown"></span></a></th>
                            <th scope="col"><a href="javascript:void(0)" class="sorting">만료날짜<span class="ico_upDown"></span></a></th>
                            <th scope="col"><a href="javascript:void(0)" class="sorting">기간<span class="ico_upDown"></span></a></th>
                            <th scope="col"><a href="javascript:void(0)" class="sorting">상태<span class="ico_upDown"></span></a></th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- 선택 row class="on" -->
                        <tr class="on">
                            <td>D21548738124862</td>
                            <td>2018-02-28</td>
                            <td>2018-02-28</td>
                            <td>2018-02-28</td>
                            <td>1년</td>
                            <td><span class="text_ico ico_unused">미사용</span></td>
                        </tr>
                        <tr>
                            <td>D21548738124862</td>
                            <td>2018-02-28</td>
                            <td>2018-02-28</td>
                            <td>2018-02-28</td>
                            <td>1년</td>
                            <td><span class="text_ico ico_completedUse">사용완료</span></td>
                        </tr>
                        <tr>
                            <td>D21548738124862</td>
                            <td>2018-02-28</td>
                            <td>2018-02-28</td>
                            <td>2018-02-28</td>
                            <td>1년</td>
                            <td><span class="text_ico ico_completedUse">사용완료</span></td>
                        </tr>
                        <tr>
                            <td>D21548738124862</td>
                            <td>2018-02-28</td>
                            <td>2018-02-28</td>
                            <td>2018-02-28</td>
                            <td>1년</td>
                            <td><span class="text_ico ico_completedUse">사용완료</span></td>
                        </tr>
                        <tr>
                            <td>D21548738124862</td>
                            <td>2018-02-28</td>
                            <td>2018-02-28</td>
                            <td>2018-02-28</td>
                            <td>1년</td>
                            <td><span class="text_ico ico_completedUse">사용완료</span></td>
                        </tr>
                        <tr>
                            <td>D21548738124862</td>
                            <td>2018-02-28</td>
                            <td>2018-02-28</td>
                            <td>2018-02-28</td>
                            <td>1년</td>
                            <td><span class="text_ico ico_completedUse">사용완료</span></td>
                        </tr>
                        <tr>
                            <td>D21548738124862</td>
                            <td>2018-02-28</td>
                            <td>2018-02-28</td>
                            <td>2018-02-28</td>
                            <td>1년</td>
                            <td><span class="text_ico ico_completedUse">사용완료</span></td>
                        </tr>
                        <tr>
                            <td>D21548738124862</td>
                            <td>2018-02-28</td>
                            <td>2018-02-28</td>
                            <td>2018-02-28</td>
                            <td>1년</td>
                            <td><span class="text_ico ico_completedUse">사용완료</span></td>
                        </tr>
                        <tr>
                            <td>D21548738124862</td>
                            <td>2018-02-28</td>
                            <td>2018-02-28</td>
                            <td>2018-02-28</td>
                            <td>1년</td>
                            <td><span class="text_ico ico_completedUse">사용완료</span></td>
                        </tr>
                        <tr>
                            <td>D21548738124862</td>
                            <td>2018-02-28</td>
                            <td>2018-02-28</td>
                            <td>2018-02-28</td>
                            <td>1년</td>
                            <td><span class="text_ico ico_unused">미사용</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- E : tabMenu - 유저-->


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
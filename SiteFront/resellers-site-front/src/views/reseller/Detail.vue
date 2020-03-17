<template>
    <section class="content">
        <article class="sub_title">
            <h2><span class="ico_reseller">리셀러 관리</span></h2>
            <div class="location">
                <span>홈</span>
                <span class="gt_sign">&gt;</span>
                <span class="">리셀러 관리</span>
                <span class="gt_sign">&gt;</span>
                <span class="on">리셀러 정보</span>
                <!-- 현재 페이지 class="on" -->
            </div>
        </article>
        <article class="sub_content sub_common">
            <h3>리셀러 정보
                <a href="../account/account_main.html" class="btn_next_title"><span class="ico_list"></span>목록으로</a>
            </h3>
            <div class="info_wrap">
                <div class="info_top clear_both">
                    <div class="info_left">
                        <span class="thumbnail reseller_company"></span>
                        <span class="company_name">AOS KOREA</span>
                        <span class="email">aoskorea.aiplustest@aos.com</span>
                    </div>
                    <div class="info_right">
                        <div class="details clear_both">
                            <span class="h4">상세정보</span>
                            <div class="btn_list">
                                <ul>
                                    <li>
                                        <button type="button" class="btn_common01" title="계정활성화"><span class="ico_default ico_activeAccount"></span>계정활성화</button>
                                    </li>
                                    <li>
                                        <button type="button" class="btn_common01" title="계정정지"><span class="ico_default ico_suspensionAccount"></span>계정정지</button></li>
                                    <li><button type="button" class="btn_common01" title="계정삭제"><span class="ico_default ico_deleteAccount"></span>계정삭제</button></li>
                                    <li><button type="button" class="btn_common01" title="회사명변경"><span class="ico_default ico_editName"></span>회사명변경</button></li>
                                </ul>
                            </div>
                        </div>
                        <table cellspacing="0" cellpadding="0" class="table_type02">
                            <caption>리셀러 상세정보</caption>
                            <colgroup>
                                <col style="width:25%">
                                <col style="width:25%">
                                <col style="width:25%">
                                <col style="width:25%">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>코드명</th>
                                    <td>35248</td>
                                    <th>계정</th>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <th>등록일</th>
                                    <td>2018-02-28</td>
                                    <th>상태</th>
                                    <td>유효</td>
                                </tr>
                                <tr>
                                    <th>보유 라이센스</th>
                                    <td>40개</td>
                                    <th>보유 플랜</th>
                                    <td>5개</td>
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
                            <span>할당량&nbsp;:&nbsp;</span><b>1000GB</b><br>
                            <span>사용량 &nbsp;:&nbsp;</span><b>2.21GB</b>
                        </div>
                    </div>
                    <div class="graph_wrap cold_storage">
                        <div class="graph">
                            <img src="@/assets/images/sub/sample_graph_02.png" alt="그래프 샘플">
                            <span class="percent">65%</span>
                        </div>
                        <div class="graph_text">
                            <b>콜드 스토리지</b><br>
                            <span>할당량&nbsp;:&nbsp;</span><b>1000GB</b><br>
                            <span>사용량&nbsp;:&nbsp;</span><b>2.21GB</b>
                        </div>
                    </div>
                    <div class="graph_wrap ocr">
                        <div class="graph">
                            <img src="@/assets/images/sub/sample_graph_03.png" alt="그래프 샘플">
                            <span class="percent">65%</span>
                        </div>
                        <div class="graph_text">
                            <b>OCR</b><br>
                            <span>할당량&nbsp;:&nbsp;</span><b>1000GB</b><br>
                            <span>사용량&nbsp;:&nbsp;</span><b>2.21GB</b>
                        </div>
                    </div>
                </div>
            </div>
            <div class="info_tabMenu">
                <ul class="clear_both">
                    <li><a href="http://" class="on">라이센스 관리</a></li>
                    <!-- 선택 된 탭메뉴 a class="on" -->
                    <li><a href="http://">플랜 관리</a></li>
                    <li><a href="http://">계정</a></li>
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

            <!-- S : tabMenu - 라이센스 관리-->
            <div class="list_wrap" style="display: block;">
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
                            <td>12448226</td>
                            <td>2020-12-31</td>
                            <td>2020-12-31</td>
                            <td>2020-12-31</td>
                            <td>3년</td>
                            <td><span class="text_ico ico_approved">승인</span></td>
                        </tr>
                        <tr>
                            <td>12448226</td>
                            <td>2020-12-31</td>
                            <td>2020-12-31</td>
                            <td>2020-12-31</td>
                            <td>1년</td>
                            <td><span class="text_ico ico_pendingApproval">승인대기</span></td>
                        </tr>
                        <tr>
                            <td>12448226</td>
                            <td>2020-12-31</td>
                            <td>2020-12-31</td>
                            <td>2020-12-31</td>
                            <td>6개월</td>
                            <td><span class="text_ico ico_approved">승인</span></td>
                        </tr>
                        <tr>
                            <td>12448226</td>
                            <td>2020-12-31</td>
                            <td>2020-12-31</td>
                            <td>2020-12-31</td>
                            <td>3년</td>
                            <td><span class="text_ico ico_pendingApproval">승인대기</span></td>
                        </tr>
                        <tr>
                            <td>12448226</td>
                            <td>2020-12-31</td>
                            <td>2020-12-31</td>
                            <td>2020-12-31</td>
                            <td>1년</td>
                            <td><span class="text_ico ico_approved">승인</span></td>
                        </tr>
                        <tr>
                            <td>12448226</td>
                            <td>2020-12-31</td>
                            <td>2020-12-31</td>
                            <td>2020-12-31</td>
                            <td>6개월</td>
                            <td><span class="text_ico ico_pendingApproval">승인대기</span></td>
                        </tr>
                        <tr>
                            <td>12448226</td>
                            <td>2020-12-31</td>
                            <td>2020-12-31</td>
                            <td>2020-12-31</td>
                            <td>3년</td>
                            <td><span class="text_ico ico_approved">승인</span></td>
                        </tr>
                        <tr>
                            <td>12448226</td>
                            <td>2020-12-31</td>
                            <td>2020-12-31</td>
                            <td>2020-12-31</td>
                            <td>1년</td>
                            <td><span class="text_ico ico_approved">승인</span></td>
                        </tr>
                        <tr>
                            <td>12448226</td>
                            <td>2020-12-31</td>
                            <td>2020-12-31</td>
                            <td>2020-12-31</td>
                            <td>6개월</td>
                            <td><span class="text_ico ico_approved">승인</span></td>
                        </tr>
                        <tr>
                            <td>12448226</td>
                            <td>2020-12-31</td>
                            <td>2020-12-31</td>
                            <td>2020-12-31</td>
                            <td>3년</td>
                            <td><span class="text_ico ico_pendingApproval">승인대기</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- E : tabMenu - 라이센스 관리-->

            <!-- S : tabMenu - 플랜 관리 -->
            <div class="list_wrap" style="display: none;">
                <table cellspacing="0" class="table_type01">
                    <caption>플랜 목록</caption>
                    <thead>
                        <tr>
                            <th scope="col"><a href="javascript:void(0)" class="sorting">종류<span class="ico_upDown on"></span></a></th>
                            <!-- class="on" 추가하면 화살표 위로 바뀜 -->
                            <th scope="col"><a href="javascript:void(0)" class="sorting">플랜명<span class="ico_upDown"></span></a></th>
                            <th scope="col"><a href="javascript:void(0)" class="sorting">기간<span class="ico_upDown"></span></a></th>
                            <th scope="col"><a href="javascript:void(0)" class="sorting">리셀러<span class="ico_upDown"></span></a></th>
                            <th scope="col"><a href="javascript:void(0)" class="sorting">사용자<span class="ico_upDown"></span></a></th>
                            <th scope="col"><a href="javascript:void(0)" class="sorting">상태<span class="ico_upDown"></span></a></th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- 선택 row class="on" -->
                        <tr class="on">
                            <td>Business</td>
                            <td>Homeplan</td>
                            <td>무제한</td>
                            <td>3</td>
                            <td>무제한</td>
                            <td><span class="text_ico ico_available">사용가능</span></td>
                        </tr>
                        <tr>
                            <td>HOME</td>
                            <td>Jhj</td>
                            <td>3년</td>
                            <td>3</td>
                            <td>3년</td>
                            <td><span class="text_ico ico_unavailable">사용불가</span></td>
                        </tr>
                        <tr>
                            <td>HOME</td>
                            <td>Jhj</td>
                            <td>3년</td>
                            <td>3</td>
                            <td>3년</td>
                            <td><span class="text_ico ico_available">사용가능</span></td>
                        </tr>
                        <tr>
                            <td>HOME</td>
                            <td>Jhj</td>
                            <td>3년</td>
                            <td>3</td>
                            <td>3년</td>
                            <td><span class="text_ico ico_unavailable">사용불가</span></td>
                        </tr>
                        <tr>
                            <td>HOME</td>
                            <td>Jhj</td>
                            <td>3년</td>
                            <td>3</td>
                            <td>3년</td>
                            <td><span class="text_ico ico_available">사용가능</span></td>
                        </tr>
                        <tr>
                            <td>HOME</td>
                            <td>Jhj</td>
                            <td>3년</td>
                            <td>3</td>
                            <td>3년</td>
                            <td><span class="text_ico ico_unavailable">사용불가</span></td>
                        </tr>
                        <tr>
                            <td>HOME</td>
                            <td>Jhj</td>
                            <td>3년</td>
                            <td>3</td>
                            <td>3년</td>
                            <td><span class="text_ico ico_unavailable">사용불가</span></td>
                        </tr>
                        <tr>
                            <td>HOME</td>
                            <td>Jhj</td>
                            <td>3년</td>
                            <td>3</td>
                            <td>3년</td>
                            <td><span class="text_ico ico_available">사용가능</span></td>
                        </tr>
                        <tr>
                            <td>HOME</td>
                            <td>Jhj</td>
                            <td>3년</td>
                            <td>3</td>
                            <td>3년</td>
                            <td><span class="text_ico ico_unavailable">사용불가</span></td>
                        </tr>
                        <tr>
                            <td>HOME</td>
                            <td>Jhj</td>
                            <td>3년</td>
                            <td>3</td>
                            <td>3년</td>
                            <td><span class="text_ico ico_available">사용가능</span></td>
                        </tr>
                        <tr>
                            <td>HOME</td>
                            <td>Jhj</td>
                            <td>3년</td>
                            <td>3</td>
                            <td>3년</td>
                            <td><span class="text_ico ico_unavailable">사용불가</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- E : tabMenu - 플랜 관리 -->

            <!-- S : tabMenu - 계정 -->
            <div class="list_wrap" style="display: none;">
                <table cellspacing="0" class="table_type01">
                    <caption>계정 목록</caption>
                    <thead>
                        <tr>
                            <th scope="col"><input type="checkbox" title="전체선택"></th>
                            <th scope="col"><a href="javascript:void(0)" class="sorting">회사명<span class="ico_upDown on"></span></a></th>
                            <!-- class="on" 추가하면 화살표 위로 바뀜 -->
                            <th scope="col"><a href="javascript:void(0)" class="sorting">등록일<span class="ico_upDown"></span></a></th>
                            <th scope="col"><a href="javascript:void(0)" class="sorting">종류<span class="ico_upDown"></span></a></th>
                            <th scope="col"><a href="javascript:void(0)" class="sorting">사용자<span class="ico_upDown"></span></a></th>
                            <th scope="col"><a href="javascript:void(0)" class="sorting">상태<span class="ico_upDown"></span></a></th>
                            <th scope="col"><a href="javascript:void(0)" class="sorting">유효기간<span class="ico_upDown"></span></a></th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- 선택 row class="on" -->
                        <tr class="on">
                            <td><input type="checkbox"></td>
                            <td>AOSBOXIntelli</td>
                            <td>2020-12-31</td>
                            <td>HOME</td>
                            <td>3&nbsp;/&nbsp;무제한</td>
                            <td><span class="text_ico ico_available">유효</span></td>
                            <td>2020-12-31</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox"></td>
                            <td>DS Comp</td>
                            <td>2020-12-31</td>
                            <td>Business</td>
                            <td>25&nbsp;/&nbsp;무제한</td>
                            <td><span class="text_ico ico_available">유효</span></td>
                            <td>2020-12-31</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox"></td>
                            <td>DS Comp</td>
                            <td>2020-12-31</td>
                            <td>Business</td>
                            <td>25&nbsp;/&nbsp;무제한</td>
                            <td><span class="text_ico ico_available">유효</span></td>
                            <td>2020-12-31</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox"></td>
                            <td>DS Comp</td>
                            <td>2020-12-31</td>
                            <td>Business</td>
                            <td>25&nbsp;/&nbsp;무제한</td>
                            <td><span class="text_ico ico_available">유효</span></td>
                            <td>2020-12-31</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox"></td>
                            <td>DS Comp</td>
                            <td>2020-12-31</td>
                            <td>Business</td>
                            <td>25&nbsp;/&nbsp;무제한</td>
                            <td><span class="text_ico ico_available">유효</span></td>
                            <td>2020-12-31</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox"></td>
                            <td>DS Comp</td>
                            <td>2020-12-31</td>
                            <td>Business</td>
                            <td>25&nbsp;/&nbsp;무제한</td>
                            <td><span class="text_ico ico_available">유효</span></td>
                            <td>2020-12-31</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox"></td>
                            <td>DS Comp</td>
                            <td>2020-12-31</td>
                            <td>Business</td>
                            <td>25&nbsp;/&nbsp;무제한</td>
                            <td><span class="text_ico ico_available">유효</span></td>
                            <td>2020-12-31</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox"></td>
                            <td>DS Comp</td>
                            <td>2020-12-31</td>
                            <td>Business</td>
                            <td>25&nbsp;/&nbsp;무제한</td>
                            <td><span class="text_ico ico_available">유효</span></td>
                            <td>2020-12-31</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox"></td>
                            <td>DS Comp</td>
                            <td>2020-12-31</td>
                            <td>Business</td>
                            <td>25&nbsp;/&nbsp;무제한</td>
                            <td><span class="text_ico ico_available">유효</span></td>
                            <td>2020-12-31</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox"></td>
                            <td>DS Comp</td>
                            <td>2020-12-31</td>
                            <td>Business</td>
                            <td>25&nbsp;/&nbsp;무제한</td>
                            <td><span class="text_ico ico_available">유효</span></td>
                            <td>2020-12-31</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- E : tabMenu - 계정 -->

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
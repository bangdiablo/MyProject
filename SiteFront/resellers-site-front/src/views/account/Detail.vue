<template>
    <section class="content">
        <article class="sub_title">
            <h2><span class="ico_account">계정 관리</span></h2>
            <div class="location">
                <span>홈</span>
                <span class="gt_sign">&gt;</span>
                <span class="">계정 관리</span>
                <span class="gt_sign">&gt;</span>
                <span class="on">계정 정보</span>
                <!-- 현재 페이지 class="on" -->
            </div>
        </article>
        <article class="sub_content sub_common">
            <h3>계정 정보
                <a href="./account_main.html" class="btn_common01 btn_next_title"><span class="ico_list"></span>목록으로</a>
            </h3>
            <div class="info_wrap">
                <div class="info_top clear_both">
                    <div class="info_left">
                        <span class="thumbnail account"></span>
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
                                        <button type="button" class="btn_common01" title="계정정지"><span class="ico_default ico_suspensionAccount"></span>계정정지</button>
                                    </li>
                                    <li>
                                        <button type="button" class="btn_common01" title="계정삭제"><span class="ico_default ico_deleteAccount"></span>계정삭제</button>
                                    </li>
                                    <li>
                                        <button type="button" class="btn_common01" title="회사명변경"><span class="ico_default ico_editName"></span>회사명변경</button>
                                    </li>
                                    <li>
                                        <a href="#" class="btn_common01" title="계정관리" target="_blank"><span class="ico_default ico_managementAccount"></span>계정관리</a>
                                    </li>
                                    <li>
                                        <a href="../license/license_add.html" class="btn_common01" title="라이센스변경"><span class="ico_default ico_changeLicense"></span>라이센스변경</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <table cellspacing="0" cellpadding="0" class="table_type02">
                            <caption>계정 상세정보</caption>
                            <colgroup>
                                <col style="width:25%">
                                <col style="width:25%">
                                <col style="width:25%">
                                <col style="width:25%">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>사용자</th>
                                    <td>3&nbsp;/&nbsp;무제한</td>
                                    <th>상태</th>
                                    <td>유효</td>
                                </tr>
                                <tr>
                                    <th>라이센스 종류</th>
                                    <td>Business</td>
                                    <th>라이센스 키</th>
                                    <td>D21548738124862</td>
                                </tr>
                                <tr>
                                    <th>플랜 명</th>
                                    <td>Homeplan1</td>
                                    <th>유효기간</th>
                                    <td>2019.10.21</td>
                                </tr>
                                <tr>
                                    <th>등록일</th>
                                    <td>2018-02-28</td>
                                    <th>변경일</th>
                                    <td>2019-10-21</td>
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

            <!-- S : tabMenu - 유저-->
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
                            <td>Jhj</td>
                            <td>abc@abc.com</td>
                            <td>O</td>
                            <td>8</td>
                            <td>2017-03-22</td>
                            <td><span class="text_ico ico_approved">승인</span></td>
                        </tr>
                        <tr>
                            <td>BG yu</td>
                            <td>abc@abc.com</td>
                            <td>X</td>
                            <td>6</td>
                            <td>2017-03-22</td>
                            <td><span class="text_ico ico_pendingApproval">승인대기</span></td>
                        </tr>
                        <tr>
                            <td>JE.SEO</td>
                            <td>abc@abc.com</td>
                            <td>O</td>
                            <td>6</td>
                            <td>2017-03-22</td>
                            <td><span class="text_ico ico_approved">승인</span></td>
                        </tr>
                        <tr>
                            <td>JE.SEO</td>
                            <td>abc@abc.com</td>
                            <td>X</td>
                            <td>6</td>
                            <td>2017-03-22</td>
                            <td><span class="text_ico ico_pendingApproval">승인대기</span></td>
                        </tr>
                        <tr>
                            <td>JE.SEO</td>
                            <td>abc@abc.com</td>
                            <td>X</td>
                            <td>6</td>
                            <td>2017-03-22</td>
                            <td><span class="text_ico ico_approved">승인</span></td>
                        </tr>
                        <tr>
                            <td>JE.SEO</td>
                            <td>abc@abc.com</td>
                            <td>X</td>
                            <td>6</td>
                            <td>2017-03-22</td>
                            <td><span class="text_ico ico_pendingApproval">승인대기</span></td>
                        </tr>
                        <tr>
                            <td>JE.SEO</td>
                            <td>abc@abc.com</td>
                            <td>X</td>
                            <td>6</td>
                            <td>2017-03-22</td>
                            <td><span class="text_ico ico_approved">승인</span></td>
                        </tr>
                        <tr>
                            <td>JE.SEO</td>
                            <td>abc@abc.com</td>
                            <td>X</td>
                            <td>6</td>
                            <td>2017-03-22</td>
                            <td><span class="text_ico ico_approved">승인</span></td>
                        </tr>
                        <tr>
                            <td>JE.SEO</td>
                            <td>abc@abc.com</td>
                            <td>X</td>
                            <td>6</td>
                            <td>2017-03-22</td>
                            <td><span class="text_ico ico_approved">승인</span></td>
                        </tr>
                        <tr>
                        <td>JE.SEO</td>
                            <td>abc@abc.com</td>
                            <td>X</td>
                            <td>6</td>
                            <td>2017-03-22</td>
                            <td><span class="text_ico ico_pendingApproval">승인대기</span></td>
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
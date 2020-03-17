<template>
    <section class="content">
        <article class="sub_title">
            <h2><span class="ico_account">계정 관리</span></h2>
            <div class="location">
                <span>홈</span>
                <span class="gt_sign">&gt;</span>
                <span class="">계정 관리</span>
                <span class="gt_sign">&gt;</span>
                <span class="on">단말기 정보</span>
                <!-- 현재 페이지 class="on" -->
            </div>
        </article>
        <article class="sub_content sub_common">
            <h3>단말기 정보
                <a href="./account_main.html" class="btn_common01 btn_next_title"><span class="ico_list"></span>목록으로</a>
            </h3>
            <div class="info_wrap">
                <div class="info_top clear_both">
                    <div class="info_left">
                        <span class="thumbnail account_terminal"></span>
                        <span class="company_name">DESKTOP-9HQEECE</span>
                    </div>
                    <div class="info_right">
                        <div class="details clear_both">
                            <span class="h4">상세정보</span>
                            <div class="btn_list">
                                <ul>
                                    <li>
                                        <button type="button" class="btn_common01" title="업그레이드 메일 송신"><span class="ico_default ico_sendMail"></span>업그레이드 메일 송신</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <table cellspacing="0" cellpadding="0" class="table_type02">
                            <caption>단말기 상세정보</caption>
                            <colgroup>
                                <col style="width:25%">
                                <col style="width:25%">
                                <col style="width:25%">
                                <col style="width:25%">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>이름</th>
                                    <td>DESKTOP-9HQEECE</td>
                                    <th>시스템계정</th>
                                    <td>legaltech</td>
                                </tr>
                                <tr>
                                    <th>종류</th>
                                    <td>데스크탑</td>
                                    <th>상태</th>
                                    <td>유효</td>
                                </tr>
                                <tr>
                                    <th>마지막 백업</th>
                                    <td>2019-03-22</td>
                                    <th>마지막 다운로드</th>
                                    <td>2019-03-22</td>
                                </tr>
                                <tr>
                                    <th>작성일</th>
                                    <td>2018-02-28</td>
                                    <th>OS 버전</th>
                                    <td>Windows 10 Pro 64-bit</td>
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


            <!-- S : page -->

            <!-- E : page -->

        </article>
    </section>
</template>

<script>
    export default {
        name: "DetailUserDevice"
    }
</script>

<style scoped>

</style>
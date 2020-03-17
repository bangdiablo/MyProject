<template>
  <article id="contents" class="sub">
    <location/>

    <ul class="category_navi">
        <li><a href="#" class="active"><img src="@/assets/images/sub/ico_cn_new.png" alt="신규" class="new" />&nbsp;스마트 리포트</a></li>
        <li><a href="#">상황 목록</a></li>
    </ul>
    <div class="content">
        <div class="admin_list">
            <div class="board_search_edit">
                <fieldset class="search_form left">
                    <legend>사용자검색</legend>
                    <p>
                        <input type="text" title="검색어 입력" />
                        <button type="button" class="btn_search"><img src="@/assets/images/component/btn_bse_search.png" alt="검색" /></button>
                    </p>
                </fieldset>
                <div class="btn_edit right">
                    <button type="button"><img src="@/assets/images/component/btn_edit_filter.png" alt="" class="ico" /><span class="txt">필터 설정</span></button>
                    <button type="button"><img src="@/assets/images/component/btn_edit_export.png" alt="" class="ico btn_edit_export" /><span class="txt">내보내기</span></button>
                    <button type="button"><img src="@/assets/images/component/btn_edit_sandMail.png" alt="" class="ico" /><span class="txt">메일 정기발송</span></button>
                </div>
            </div>
            <table class="board_list">
                <caption>사용자 목록</caption>
                <colgroup>
                    <col style="width:*px" />
                    <col style="width:*px" />
                    <col style="width:*px" />
                    <col style="width:130px" />
                    <col style="width:*px" />
                    <col style="width:130px" />
                    <col style="width:*px" />
                    <col style="width:*px" />
                    <col style="width:*px" />
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col"><a href="javascript:void(0)" class="sorting">기기명</a></th>
                        <th scope="col"><a href="javascript:void(0)" class="sorting on">유저명</a></th>
                        <th scope="col"><a href="javascript:void(0)" class="sorting">기기종류</a></th>
                        <th scope="col"><a href="javascript:void(0)" class="sorting">백업상황</a></th>
                        <th scope="col"><a href="javascript:void(0)" class="sorting">마지막 백업</a></th>
                        <th scope="col"><a href="javascript:void(0)" class="sorting">연결상태</a></th>
                        <th scope="col"><a href="javascript:void(0)" class="sorting">일반스토리지</a></th>
                        <th scope="col"><a href="javascript:void(0)" class="sorting">콜드스토리지</a></th>
                        <th scope="col"><a href="javascript:void(0)" class="sorting">OCR 페이지 수</a></th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="on">
                        <td class="left">DESKTOP-이름</td>
                        <td><a href="#">Jung Hwang Jin</a></td>
                        <td>Window</td>
                        <td class="left"><img src="@/assets/images/sub/ico_ad_report_unused.png" alt="미사용" class="ico_admin" />미사용</td>
                        <td>2019.12.16</td>
                        <td class="left"><img src="@/assets/images/sub/ico_ad_report_offline.png" alt="오프라인" class="ico_admin" />오프라인</td>
                        <td>3.32 GB / 10 GB</td>
                        <td>0 페이지 / 제한 없음</td>
                        <td>0 페이지 / 제한 없음</td>
                    </tr>
                    <tr>
                        <td class="left">DESKTOP-이름</td>
                        <td><a href="#">KN Lee</a></td>
                        <td>Window</td>
                        <td class="left"><img src="@/assets/images/sub/ico_ad_report_protected.png" alt="보호됨" class="ico_admin" />보호됨</td>
                        <td>2019.12.16</td>
                        <td class="left"><img src="@/assets/images/sub/ico_ad_report_online.png" alt="온라인" class="ico_admin" />온라인</td>
                        <td>3.32 GB / 10 GB</td>
                        <td>0 페이지 / 제한 없음</td>
                        <td>0 페이지 / 제한 없음</td>
                    </tr>
                    <tr>
                        <td class="left">DESKTOP-이름</td>
                        <td><a href="#">KN Lee</a></td>
                        <td>Window</td>
                        <td class="left"><img src="@/assets/images/sub/ico_ad_report_partiallyProtected.png" alt="일부보호" class="ico_admin" />일부보호</td>
                        <td>2019.12.16</td>
                        <td class="left"><img src="@/assets/images/sub/ico_ad_report_online.png" alt="온라인" class="ico_admin" />온라인</td>
                        <td>3.32 GB / 10 GB</td>
                        <td>0 페이지 / 제한 없음</td>
                        <td>0 페이지 / 제한 없음</td>
                    </tr>
                    <tr>
                        <td class="left">DESKTOP-이름</td>
                        <td><a href="#">KN Lee</a></td>
                        <td>Window</td>
                        <td class="left"><img src="@/assets/images/sub/ico_ad_report_unprotected.png" alt="미보호" class="ico_admin" />미보호</td>
                        <td>2019.12.16</td>
                        <td class="left"><img src="@/assets/images/sub/ico_ad_report_online.png" alt="관온라인리자" class="ico_admin" />온라인</td>
                        <td>3.32 GB / 10 GB</td>
                        <td>0 페이지 / 제한 없음</td>
                        <td>0 페이지 / 제한 없음</td>
                    </tr>
                    <tr>
                        <td class="left">DESKTOP-이름</td>
                        <td><a href="#">KN Lee</a></td>
                        <td>Window</td>
                        <td class="left"><img src="@/assets/images/sub/ico_ad_report_protected.png" alt="보호됨" class="ico_admin" />보호됨</td>
                        <td>2019.12.16</td>
                        <td class="left"><img src="@/assets/images/sub/ico_ad_report_online.png" alt="온라인" class="ico_admin" />온라인</td>
                        <td>3.32 GB / 10 GB</td>
                        <td>0 페이지 / 제한 없음</td>
                        <td>0 페이지 / 제한 없음</td>
                    </tr>
                    <tr>
                        <td class="left">DESKTOP-이름</td>
                        <td><a href="#">KN Lee</a></td>
                        <td>Window</td>
                        <td class="left"><img src="@/assets/images/sub/ico_ad_report_protected.png" alt="보호됨" class="ico_admin" />보호됨</td>
                        <td>2019.12.16</td>
                        <td class="left"><img src="@/assets/images/sub/ico_ad_report_online.png" alt="온라인" class="ico_admin" />온라인</td>
                        <td>3.32 GB / 10 GB</td>
                        <td>0 페이지 / 제한 없음</td>
                        <td>0 페이지 / 제한 없음</td>
                    </tr>
                    <tr>
                        <td class="left">DESKTOP-이름</td>
                        <td><a href="#">KN Lee</a></td>
                        <td>Window</td>
                        <td class="left"><img src="@/assets/images/sub/ico_ad_report_protected.png" alt="보호됨" class="ico_admin" />보호됨</td>
                        <td>2019.12.16</td>
                        <td class="left"><img src="@/assets/images/sub/ico_ad_report_online.png" alt="온라인" class="ico_admin" />온라인</td>
                        <td>3.32 GB / 10 GB</td>
                        <td>0 페이지 / 제한 없음</td>
                        <td>0 페이지 / 제한 없음</td>
                    </tr>
                    <tr>
                        <td class="left">DESKTOP-이름</td>
                        <td><a href="#">KN Lee</a></td>
                        <td>Window</td>
                        <td class="left"><img src="@/assets/images/sub/ico_ad_report_protected.png" alt="관리자" class="ico_admin" />보호됨</td>
                        <td>2019.12.16</td>
                        <td class="left"><img src="@/assets/images/sub/ico_ad_report_online.png" alt="관리자" class="ico_admin" />온라인</td>
                        <td>3.32 GB / 10 GB</td>
                        <td>0 페이지 / 제한 없음</td>
                        <td>0 페이지 / 제한 없음</td>
                    </tr>
                    <tr>
                        <td class="left">DESKTOP-이름</td>
                        <td><a href="#">KN Lee</a></td>
                        <td>Window</td>
                        <td class="left"><img src="@/assets/images/sub/ico_ad_report_protected.png" alt="보호됨" class="ico_admin" />보호됨</td>
                        <td>2019.12.16</td>
                        <td class="left"><img src="@/assets/images/sub/ico_ad_report_online.png" alt="온라 인" class="ico_admin" />온라인</td>
                        <td>3.32 GB / 10 GB</td>
                        <td>0 페이지 / 제한 없음</td>
                        <td>0 페이지 / 제한 없음</td>
                    </tr>
                    <tr>
                        <td class="left">DESKTOP-이름</td>
                        <td><a href="#">KN Lee</a></td>
                        <td>Window</td>
                        <td class="left"><img src="@/assets/images/sub/ico_ad_report_protected.png" alt="보호됨" class="ico_admin" />보호됨</td>
                        <td>2019.12.16</td>
                        <td class="left"><img src="@/assets/images/sub/ico_ad_report_online.png" alt="온라인" class="ico_admin" />온라인</td>
                        <td>3.32 GB / 10 GB</td>
                        <td>0 페이지 / 제한 없음</td>
                        <td>0 페이지 / 제한 없음</td>
                    </tr>
                </tbody>
            </table>
            <div class="pageWrap clear_both">
                <div class="page_location float_left">
                    Showing to 5 of 25 rows
                    <span class="basic_select selectbox_ui">
                        <b class="selected_txt">사이즈</b>
                        <select>
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="">3</option>
                            <option value="">4</option>
                            <option value="">5</option>
                            <option value="">6</option>
                            <option value="">7</option>
                        </select>
                    </span>
                    rows per page
                </div>
                <div class="page_navi">
                    <a href="#" class="guide prev"><img src="@/assets/images/component/btn_page_prev.png" alt="Prev" class="ico"></a>
                    <a href="#" class="num active">1</a>
                    <a href="#" class="num">2</a>
                    <a href="#" class="num">3</a>
                    <a href="#" class="num">4</a>
                    <a href="#" class="num">5</a>
                    <a href="#" class="guide next"><img src="@/assets/images/component/btn_page_next.png" alt="Next" class="ico"></a>
                </div>
            </div>
        </div>
    </div>
  </article>
</template>

<script>
  export default {
    name: "report"
  }
</script>

<style scoped>

</style>

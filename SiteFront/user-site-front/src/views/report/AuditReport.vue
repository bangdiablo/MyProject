<template>
  <article id="contents" class="sub">
    <location/>

    <div class="content">
      <div class="file_folder_list">
        <div class="board_search_edit">
          <fieldset class="search_form left">
            <legend>감사 보고서 검색</legend>
            <p>
              <input type="text" title="검색어 입력"/>
              <button type="button" class="btn_filter"><img src="@/assets/images/component/btn_bse_filter.png"
                                                            alt="상세필터"/></button>감사보고서
              <button type="button" class="btn_search"><img src="@/assets/images/component/btn_bse_search.png"
                                                            alt="검색"/></button>
            </p>
          </fieldset>
          <fieldset class="search_filter left">
            <legend>상세필터</legend>
            <ul>
              <li>
                <strong class="category"><label for="bse_action">動作</label></strong>
                <span class="field">
									<span class="basic_select selectbox_ui">
										<b class="selected_txt"></b>
										<select id="bse_action">
											<option value="">모두</option>
										</select>
									</span>
								</span>
              </li>
              <li>
                <strong class="category"><label for="bse_start">開始</label></strong>
                <span class="field">
									<span class="basic_datepicker">
										<input type="text" placeholder="시작일" id="bse_start"/>
										<button type="button"><img src="@/assets/images/component/btn_calendar.png" alt="캘린더"/></button>
									</span>
								</span>
              </li>
              <li>
                <strong class="category"><label for="bse_end">終了</label></strong>
                <span class="field">
									<span class="basic_datepicker">
										<input type="text" placeholder="종료일" id="bse_end"/>
										<button type="button"><img src="@/assets/images/component/btn_calendar.png" alt="캘린더"/></button>
									</span>
								</span>
              </li>
              <li>
                <strong class="category"><label for="bse_user">ユーザー</label></strong>
                <span class="field">
									<span class="basic_select selectbox_ui">
										<b class="selected_txt"></b>
										<select id="bse_user">
											<option value="">모두</option>
										</select>
									</span>
								</span>
              </li>
              <li>
                <strong class="category"><label for="bse_computer">端末</label></strong>
                <span class="field">
									<span class="basic_select selectbox_ui">
										<b class="selected_txt"></b>
										<select id="bse_computer">
											<option value="">모두</option>
										</select>
									</span>
								</span>
              </li>
            </ul>
            <div class="btn_setting_search">
              <button type="button" class="btn_basic">설정 리셋</button>
              <button type="button" class="btn_basic submit">검색</button>
            </div>
          </fieldset>
          <div class="btn_edit right">
            <button type="button"><img src="@/assets/images/component/btn_edit_download.png" alt="" class="ico"/><span
              class="txt">다운로드</span></button>
          </div>
        </div>
        <table class="board_list">
          <caption>파일리스트</caption>
          <colgroup>
            <col style="width:70px"/>
            <col style="width:240px"/>
            <col style="width:*px"/>
            <col style="width:220px"/>
            <col style="width:280px"/>
          </colgroup>
          <thead>
          <tr>
            <th scope="col"><input type="checkbox" title="전체선택"/></th>
            <th scope="col"><a href="javascript:void(0)" class="sorting">날짜와 시간</a></th>
            <th scope="col"><a href="javascript:void(0)" class="sorting on">사용자</a></th>
            <th scope="col"><a href="javascript:void(0)" class="sorting">동작</a></th>
            <th scope="col"><a href="javascript:void(0)" class="sorting">대상</a></th>
          </tr>
          </thead>
          <tbody>
          <tr class="on">
            <td><input type="checkbox" title="선택"/></td>
            <td>2019-11-19. 오후 5:13:29</td>
            <td class="left">bg.kim@legaltech.co.kr</td>
            <td>사용자의 일시 정지</td>
            <td class="left">(Cloud Drive)NoSQL데이터 모델링. pdf</td>
          </tr>
          <tr>
            <td><input type="checkbox" title="선택"/></td>
            <td>2019-11-19. 오후 4:06:10</td>
            <td class="left">hj.jung@legaltech.co.kr</td>
            <td>계정의 패스워드를 변경</td>
            <td class="left">Jung Hwang Jin</td>
          </tr>
          <tr>
            <td><input type="checkbox" title="선택"/></td>
            <td>2019-11-19. 오후 4:06:10</td>
            <td class="left">hj.jung@legaltech.co.kr</td>
            <td>계정의 패스워드를 변경</td>
            <td class="left">Jung Hwang Jin</td>
          </tr>
          <tr>
            <td><input type="checkbox" title="선택"/></td>
            <td>2019-11-19. 오후 4:06:10</td>
            <td class="left">hj.jung@legaltech.co.kr</td>
            <td>계정의 패스워드를 변경</td>
            <td class="left">Jung Hwang Jin</td>
          </tr>
          <tr>
            <td><input type="checkbox" title="선택"/></td>
            <td>2019-11-19. 오후 4:06:10</td>
            <td class="left">hj.jung@legaltech.co.kr</td>
            <td>계정의 패스워드를 변경</td>
            <td class="left">Jung Hwang Jin</td>
          </tr>
          <tr>
            <td><input type="checkbox" title="선택"/></td>
            <td>2019-11-19. 오후 4:06:10</td>
            <td class="left">hj.jung@legaltech.co.kr</td>
            <td>계정의 패스워드를 변경</td>
            <td class="left">Jung Hwang Jin</td>
          </tr>
          <tr>
            <td><input type="checkbox" title="선택"/></td>
            <td>2019-11-19. 오후 4:06:10</td>
            <td class="left">hj.jung@legaltech.co.kr</td>
            <td>계정의 패스워드를 변경</td>
            <td class="left">Jung Hwang Jin</td>
          </tr>
          <tr>
            <td><input type="checkbox" title="선택"/></td>
            <td>2019-11-19. 오후 4:06:10</td>
            <td class="left">hj.jung@legaltech.co.kr</td>
            <td>계정의 패스워드를 변경</td>
            <td class="left">Jung Hwang Jin</td>
          </tr>
          <tr>
            <td><input type="checkbox" title="선택"/></td>
            <td>2019-11-19. 오후 4:06:10</td>
            <td class="left">hj.jung@legaltech.co.kr</td>
            <td>계정의 패스워드를 변경</td>
            <td class="left">Jung Hwang Jin</td>
          </tr>
          <tr>
            <td><input type="checkbox" title="선택"/></td>
            <td>2019-11-19. 오후 4:06:10</td>
            <td class="left">hj.jung@legaltech.co.kr</td>
            <td>계정의 패스워드를 변경</td>
            <td class="left">Jung Hwang Jin</td>
          </tr>
          </tbody>
        </table>
        <div class="page_navi">
          <a href="#" class="guide prev"><img src="@/assets/images/component/btn_page_prev.png" alt="Prev" class="ico"></a>
          <a href="#" class="num active">1</a>
          <a href="#" class="num">2</a>
          <a href="#" class="num">3</a>
          <a href="#" class="num">4</a>
          <a href="#" class="num">5</a>
          <a href="#" class="guide next"><img src="@/assets/images/component/btn_page_next.png" alt="Next" class="ico"></a>
        </div>
        <!--<div class="board_empty">
          <img src="@/assets/images/component/ico_file_empty.png" alt="" class="ico" />
          <p>파일이 없습니다.</p>
        </div>-->
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

<template>
    <div class="policy_write_form">
      <h3>일반설정</h3>
      <ul class="pwf_check_list">
        <li>
          <label>
            <input type="checkbox"/>숨긴 파일 포함
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox"/>배터리 모드 유효화
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox"/>컴퓨터 시작 시 AOSBOX AI plus를 기동
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox"/>다중 스레드에서 업로드(네트워크 속도에 영향을 줍니다)
          </label>
        </li>
      </ul>
      <h3>업로드 시 사용하는 접속 방법</h3>
      <ul class="pwf_check_list">
        <li>
          <label>
            <input type="checkbox"/>유선 LAN
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox"/>무선 LAN(WiFi)
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox"/>모바일 데이터 통신(3G/LTE)
          </label>
        </li>
      </ul>
      <h3>백업일정</h3>
      <table class="setting">
        <caption>백업일정</caption>
        <colgroup>
          <col style="width:300px"/>
          <col style="width:*"/>
        </colgroup>
        <tbody>
        <tr>
          <th scope="row" rowspan="2">
                            <span class="category">
                                <label for="cyclicalRun"><input type="radio"/>주기적으로 실행</label>
                            </span>
            <span class="field">
                                <span class="basic_select selectbox_ui">
                                    <b class="selected_txt"></b>
                                    <select name="" id="cyclicalRun">
                                        <option value="">선택</option>
                                    </select>
                                </span>
                            </span>
          </th>
          <td>
                            <span class="category">
                                <label for="backupData">백업 데이터 무결성 검사 실행 간격</label>
                            </span>
            <span class="field">
                                <span class="basic_select selectbox_ui">
                                    <b class="selected_txt"></b>
                                    <select name="" id="backupData">
                                        <option value="">선택</option>
                                    </select>
                                </span>
                            </span>
          </td>
        </tr>
        <tr>
          <td>
                            <span class="category">
                                <label for="blockLevelBackup">블록 레벨 백업 실행 간격</label>
                            </span>
            <span class="field">
                                <span class="basic_select selectbox_ui">
                                    <b class="selected_txt"></b>
                                    <select name="" id="blockLevelBackup">
                                        <option value="">선택</option>
                                    </select>
                                </span>
                            </span>
          </td>
        </tr>
        </tbody>
      </table>
      <p class="error_msg">※ 경고:간격을 짧게 하면 컴퓨터 성능에 영향을 미칠 수 있습니다.</p>
      <table class="setting">
        <caption>백업일정</caption>
        <colgroup>
          <col style="width:300px"/>
          <col style="width:*"/>
        </colgroup>
        <tbody>
        <tr>
          <th scope="row" rowspan="2">
                            <span class="category">
                                <label for="scheduleRun"><input type="radio"/>일정에 따라 실행</label>
                            </span>
            <span class="field">
                                <span class="basic_select selectbox_ui">
                                    <b class="selected_txt"></b>
                                    <select name="" id="scheduleRun">
                                        <option value="">선택</option>
                                    </select>
                                </span>
                            </span>
          </th>
          <td>
                            <span class="category">
                                <label for="startPostTime">게시시각</label>
                            </span>
            <span class="field">
                                <span class="basic_datepicker" style="width:160px;"><input type="text" id="startPostTime"/><button
                type="button"><img src="@/assets/images/component/btn_clock.png" alt="시계"/></button></span>
                            </span>
            <span class="category">
                                <label for="endPostTime"><input type="checkbox"/>종료시각</label>
                            </span>
            <span class="field">
                                <span class="basic_datepicker" style="width:160px;"><input type="text" id="endPostTime"/><button
                type="button"><img src="@/assets/images/component/btn_clock.png" alt="시계"/></button></span>
                            </span>
          </td>
        </tr>
        <tr>
          <td>
            <span class="category">요일</span>
            <span class="field">
                                <label class="check_radio"><input type="checkbox"/>월</label><label class="check_radio"><input
              type="checkbox"/>화</label><label class="check_radio"><input type="checkbox"/>수</label><label
              class="check_radio"><input type="checkbox"/>목</label><label class="check_radio"><input
              type="checkbox"/>금</label><label class="check_radio"><input type="checkbox"/>토</label><label
              class="check_radio"><input type="checkbox"/>일</label>
                            </span>
          </td>
        </tr>
        </tbody>
      </table>
      <p class="error_msg">※ 경고:간격을 짧게 하면 컴퓨터 성능에 영향을 미칠 수 있습니다.</p>
      <h3>네트워크 대역 조정</h3>
      <table class="setting">
        <caption>네트워크 대역 조정</caption>
        <colgroup>
          <col style="width:300px"/>
          <col style="width:*"/>
        </colgroup>
        <thead>
        <tr>
          <th scope="col">
            <label><input type="checkbox"/>네트워크 대역 조정을 유효하게 한다</label>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
                            <span class="category">
                                <label for="uploadSpeed">업로드 속도 조절</label>
                            </span>
            <span class="field">
                                <span class="basic_select selectbox_ui">
                                    <b class="selected_txt"></b>
                                    <select name="" id="uploadSpeed">
                                        <option value="">선택</option>
                                    </select>
                                </span>
                            </span>
          </td>
        </tr>
        </tbody>
      </table>
      <table class="setting">
        <caption>네트워크 대역 조정</caption>
        <colgroup>
          <col style="width:300px"/>
          <col style="width:*"/>
        </colgroup>
        <thead>
        <tr>
          <th scope="col">
            <label><input type="checkbox"/>대역 조정의 일정을 유효하게 한다</label>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
                            <span class="category">
                                <label for="startPostTime2">게시시각</label>
                            </span>
            <span class="field">
                                <span class="basic_datepicker"><input type="text" id="startPostTime2"/><button type="button"><img
                src="@/assets/images/component/btn_clock.png" alt="시계"/></button></span>
                            </span>
            <span class="category">
                                <label for="endPostTime2">종료시각</label>
                            </span>
            <span class="field">
                                <span class="basic_datepicker"><input type="text" id="endPostTime2"/><button type="button"><img
                src="@/assets/images/component/btn_clock.png" alt="시계"/></button></span>
                            </span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
  import $ from "jquery";

  export default {

    mounted() {
      $(document).ready(function ($) {
        jQuery("article#contents.sub .content").mCustomScrollbar({
          theme: "minimal-dark"
        });

        //셀렉트박스 UI
        jQuery(".selectbox_ui").each(function () {
          initSelectBox(jQuery(this)) //비동기로 셀렉트 박스를 만들었을 경우 initSelectBox(jQuery("#아이디")) 로 실행시켜줘야 함
        })
      });

    }


  }
</script>

<style scoped>

</style>

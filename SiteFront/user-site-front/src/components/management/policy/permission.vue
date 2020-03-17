<template>
  <div class="policy_write_form">
    <h3>Web 관리 페이지의 권한</h3>
    <ul class="pwf_check_list">
      <li>
        <label>
          <input type="checkbox"/>데이터 삭제 가능
        </label>
      </li>
      <li>
        <label>
          <input type="checkbox"/>공유 가능
        </label>
      </li>
      <li>
        <label>
          <input type="checkbox"/>로그인에 사용할 메일 주소 변경 허용
        </label>
      </li>
      <li>
        <label>
          <input type="checkbox"/>패스워드의 변경 허용
        </label>
      </li>
      <li>
        <label>
          <input type="checkbox"/>사용자 이름 변경 허가
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
    <h3>클라이언트의 권한</h3>
    <table class="setting">
      <caption>클라이언트의 권한</caption>
      <colgroup>
        <col style="width:300px"/>
        <col style="width:*"/>
      </colgroup>
      <thead>
      <tr>
        <th scope="col">
          <label><input type="radio"/>클라이언트 패스 코드 설정</label>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>
          <p style="margin-bottom:10px">AOSBOX AI plus클라이언트에서 백업된 데이터를 표시 또는 복원할 때 패스 코드 입력을 필요로 합니다.</p>
          <p>
            <input type="text" style="width:36px;"/>
            <input type="text" style="width:36px;"/>
            <input type="text" style="width:36px;"/>
            <input type="text" style="width:36px;"/>
            <span class="error_msg">4자리수의 패스코드를 입력하세요</span>
          </p>
        </td>
      </tr>
      </tbody>
    </table>
    <table class="setting">
      <caption>클라이언트의 권한</caption>
      <colgroup>
        <col style="width:300px"/>
        <col style="width:*"/>
      </colgroup>
      <thead>
      <tr>
        <th scope="col">
          <label><input type="radio"/>AOSBOX AI plus권한의 커스터마이즈</label>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>
                          <span class="field">
                              <label class="check_radio"><input type="checkbox"/>즉시 백업 가능</label><label class="check_radio"><input
            type="checkbox"/>일시 정지 및 재개 가능</label><label class="check_radio"><input type="checkbox"/>AOSBOX 종료 허가</label><label
            class="check_radio"><input type="checkbox"/>AOSBOX 언인스톨 허가</label>
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

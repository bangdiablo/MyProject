<template>
  <div class="policy_write_form">
    <h3>수동 선택</h3>
    <div class="pwf_fieldset">
      <h4>파일위치 <span class="note">(폴더 위치 지정은 다음 형식이어야 합니다. C:\Users\(사용자 이름)\Desktop\)</span></h4>
      <table>
        <caption>파일위치</caption>
        <colgroup>
          <col style="width:104px;"/>
          <col style="width:*;"/>
          <col style="width:40px;"/>
        </colgroup>
        <tbody>
        <tr>
          <td>
            <button type="button" class="btn_variable">변수삽입</button>
          </td>
          <td><input type="text" title="폴더 위치 입력"/></td>
          <td>
            <button class="btn_add"><img src="@/assets/images/sub/btn_pwf_add.png" alt="추가"/></button>
          </td>
        </tr>
        <tr>
          <td>
            <button type="button" class="btn_variable">변수삽입</button>
          </td>
          <td><input type="text" title="폴더 위치 입력"/></td>
          <td>
            <button class="btn_delete"><img src="@/assets/images/component/btn_edit_delete.png" alt="삭제"/>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="pwf_fieldset">
      <h4>폴더위치 <span class="note">(폴더 위치 지정은 다음 형식이어야 합니다. C:\Users\(사용자 이름)\Desktop\)</span></h4>
      <table>
        <caption>파일위치</caption>
        <colgroup>
          <col style="width:104px;"/>
          <col style="width:104px;"/>
          <col style="width:*;"/>
          <col style="width:34px;"/>
        </colgroup>
        <tbody>
        <tr>
          <td>
            <button type="button" class="btn_variable">변수삽입</button>
          </td>
          <td>
            <button type="button" class="btn_variable">필터추가</button>
          </td>
          <td><input type="text" title="폴더 위치 입력"/></td>
          <td>
            <button class="btn_add"><img src="@/assets/images/sub/btn_pwf_add.png" alt="추가"/></button>
          </td>
        </tr>
        <tr>
          <td>
            <button type="button" class="btn_variable">변수삽입</button>
          </td>
          <td>
            <button type="button" class="btn_variable" disabled="disabled">필터추가</button>
          </td>
          <td><input type="text" title="폴더 위치 입력"/></td>
          <td>
            <button class="btn_delete"><img src="@/assets/images/component/btn_edit_delete.png" alt="삭제"/>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
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

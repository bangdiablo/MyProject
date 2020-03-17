<template>
  <div class="policy_write_form">
    <h3>섀도우 복사를 하는 확장자</h3>
    <div class="pwf_fieldset">
      <h4>이들의 확장자를 가진 파일은 볼륨 섀도 복사본 서비스를 통해서 백업됩니다.</h4>
      <table>
        <caption>섀도우 복사를 하는 확장자</caption>
        <tbody>
        <tr>
          <td><textarea name="" id="" cols="30" rows="10"
                        placeholder="확장자는 세미 콜론으로 구분하여 주세요(예:*. doc;*. txt;*. pst)"></textarea></td>
        </tr>
        </tbody>
      </table>
    </div>

    <h3>블록 레벨 백업을 실시하는 확장자</h3>
    <div class="pwf_fieldset">
      <h4>다음의 확장자를 가진 파일은 블록 레벨에서 변경 부분만 백업됩니다. <span class="note">(5MB이상의 파일만 지원됩니다)</span></h4>
      <table>
        <caption>블록 레벨 백업을 실시하는 확장자</caption>
        <tbody>
        <tr>
          <td><textarea name="" id="" cols="30" rows="10"
                        placeholder="확장자는 세미 콜론으로 구분하여 주세요(예:*. doc;*. txt;*. pst)"></textarea></td>
        </tr>
        </tbody>
      </table>
    </div>

    <h3>추천 백업의 확장자</h3>
    <div class="pwf_fieldset">
      <h4>연하장 데이터 <span class="note">(이 추천 백업 항목에는 다음의 확장자가 포함되어 있습니다.)</span></h4>
      <table>
        <caption>블록 레벨 백업을 실시하는 확장자</caption>
        <tbody>
        <tr>
          <td><textarea name="" id="" cols="30" rows="10">azw.tpz.azw1.chm.lit.pdb.pdf.mobi.prc.tr.tr2.tr3.fb2.opf.aeh.lrf.lrx.epub.pdg.pkg.dnl.djvu.kml.arg.bfl.bkk.brn.ceb.ebk.ebo.ebx.etd.f4b.</textarea>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="pwf_fieldset">
      <h4>회계 파일 <span class="note">(이 추천 백업 항목에는 다음의 확장자가 포함되어 있습니다.)</span></h4>
      <table>
        <caption>블록 레벨 백업을 실시하는 확장자</caption>
        <tbody>
        <tr>
          <td><textarea name="" id="" cols="30" rows="10">mny.qbw.qel.qsd.qph.qbb.tax.t01.t02.t03.t04.t05.t06.t07.t08.t09.ptb.qdf.ypr.kyr.ypb.acc.saccp.jbmny.qbw.qel.qsd.qph.qbb.tax.t01.t02.t03.t04.t05.t06.t07.t08.t09.ptb.qdf.ypr.kyr.ypb.acc.saccp.jbi.jbf.ldf.mdf.hb1.hb2.hb3.hb4.hb5.mny.qbw.qel.qsd.qph.qbb.tax.t01.t02.t03.t04.t05.t06.t07.t08.t09.ptb.qdf.ypr.kyr.ypb.acc.saccp.jbi.jbf.ldf.mdf.hb1.hb2.hb3.hb4.hb5.mny.qbw.qel.qsd.qph.qbb.tax.t01.t02.t03.t04.t05.t06.t07.t08.t09.ptb.qdf.ypr.kyr.ypb.acc.saccp.jbi.jbf.ldf.mdf.hb1.hb2.hb3.hb4.hb5.mny.qbw.qel.qsd.qph.qbb.tax.t01.t02.t03.t04.t05.t06.t07.t08.t09.ptb.qdf.ypr.kyr.ypb.acc.saccp.jbi.jbf.ldf.mdf.hb1.hb2.hb3.hb4.hb5.mny.qbw.qel.qsd.qph.qbb.tax.t01.t02.t03.t04.t05.t06.t07.t08.t09.ptb.qdf.ypr.kyr.ypb.acc.saccp.jbi.jbf.ldf.mdf.hb1.hb2.hb3.hb4.hb5.mny</textarea>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <h3>전체의 제외 항목</h3>
    <div class="pwf_fieldset">
      <h4>모든 경우 다음의 확장자를 백업하지 않음</h4>
      <table>
        <caption>블록 레벨 백업을 실시하는 확장자</caption>
        <tbody>
        <tr>
          <td><textarea name="" id="" cols="30" rows="10"
                        placeholder="확장자는 세미 콜론으로 구분하여 주세요(예:*. doc;*. txt;*. pst)"></textarea></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="pwf_fieldset">
      <h4>폴더 단위로 제외 <span class="note">(폴더 위치 지정은 다음 형식이어야 합니다. C:\Users\(사용자 이름)\Desktop\)</span></h4>
      <table>
        <caption>파일위치</caption>
        <colgroup>
          <col style="width:104px;"/>
          <col style="width:*;"/>
          <col style="width:34px;"/>
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
      <h4>제외 파일 <span class="note">(폴더 위치 지정은 다음 형식이어야 합니다. C:\Users\(사용자 이름)\Desktop\)</span></h4>
      <table>
        <caption>파일위치</caption>
        <colgroup>
          <col style="width:104px;"/>
          <col style="width:*;"/>
          <col style="width:34px;"/>
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

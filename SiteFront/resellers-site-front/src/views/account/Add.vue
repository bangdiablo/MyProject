<template>
    <section class="content">
        <article class="sub_title">
            <h2><span class="ico_account">계정 관리</span></h2>
            <div class="location">
                <span>홈</span>
                <span class="gt_sign">&gt;</span>
                <span class="">계정 관리</span>
                <span class="gt_sign">&gt;</span>
                <span class="on">계정 추가</span>
                <!-- 현재 페이지 class="on" -->
            </div>
        </article>
        <article class="sub_content sub_account_add sub_common">
            <div class="tabMenu_2depth">
                <ul class="clear_both">
                    <li><a href="http://" class="active">메일로 초대</a></li>
                    <li><a href="http://">일괄 초대</a></li>
                </ul>
            </div>
            <!-- S : tabMenu 메일로 초대 -->
            <div style="display: block;">
                <h3>메일로 초대</h3>
                <p>계정을 추가하려면 다음 정보를 입력하세요.</p>
                <fieldset class="add_reseller_form">
                    <legend>리셀러 추가</legend>
                    <div class="input_text_wrap">
                        <h4>메일주소</h4>
                        <input type="text">
                        <span class="bottom_text">메일 주소는 쉼표, 세미 콜론 또는 공백으로 구분합니다.</span>
                    </div>
                    <div class="input_text_wrap">
                        <h4>제목</h4>
                        <input type="text">
                    </div>
                    <div class="input_text_wrap">
                        <h4>메시지</h4>
                        <textarea name="" id="" cols="30" rows="10" ></textarea>
                    </div>
                    <div class="input_text_wrap clear_both">
                        <h4>라이센스</h4>
                        <span class="basic_select selectbox_ui category01">
                            <b class="selected_txt">데모용</b>
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
                        <span class="basic_select selectbox_ui category02">
                            <b class="selected_txt">선택하세요</b>
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
                    </div>
                </fieldset>
                <div class="btn_wrap">
                    <button class="btn_common submit">보내기</button>
                    <button class="btn_common cancel">취소</button>
                </div>
            </div>
            <!-- E : tabMenu 메일로 초대 -->


            <!-- S : tabMenu 일괄 초대 -->
            <div class="position_rel" style="display: none;">
                <h3>CSV 파일 업로드
                    <button type="button" class="btn_common01 btn_next_title"><span class="ico_csv"></span>엑셀 샘플 다운로드</button>
                </h3>
                <div class="area_file_add">
                    <p>Drop and Drop files here or Click</p>
                </div>
                <div class="btn_wrap">
                    <button class="btn_common submit">보내기</button>
                    <button class="btn_common cancel">취소</button>
                </div>
            </div>
            <!-- E : tabMenu 일괄 초대 -->
        </article>
    </section>
</template>

<script>
    export default {
        name: "Add"
    }
</script>

<style scoped>

</style>
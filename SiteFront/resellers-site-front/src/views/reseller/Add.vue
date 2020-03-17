<template>
    <section class="content">
        <article class="sub_title">
            <h2><span class="ico_reseller">리셀러 관리</span></h2>
            <div class="location">
                <span>홈</span>
                <span class="gt_sign">&gt;</span>
                <span class="">리셀러 관리</span>
                <span class="gt_sign">&gt;</span>
                <span class="on">리셀러 추가</span>
                <!-- 현재 페이지 class="on" -->
            </div>
        </article>
        <article class="sub_content">
            <h3>리셀러 추가</h3>
            <p>리셀러를 추가하려면 다음 정보를 입력하세요.</p>
            <fieldset class="add_reseller_form">
                <legend>리셀러 추가</legend>
                <div class="input_text_wrap">
                    <h4>&#42;이름</h4>
                    <input type="text">
                </div>
                <div class="input_text_wrap">
                    <h4>&#42;회사명</h4>
                    <input type="text">
                </div>
                <div class="input_text_wrap">
                    <h4>&#42;메일 주소</h4>
                    <input type="text">
                </div>
                <div class="input_text_wrap">
                    <h4>&#42;패스워드</h4>
                    <input type="text">
                </div>
                <div class="input_text_wrap">
                    <h4>&#42;패스워드 확인</h4>
                    <input type="text" class="noneMargin_input">
                    <span class="bottom_text warning_text">패스워드가 일치하지 않습니다.</span>
                </div>
            </fieldset>
            <div class="btn_wrap">
                <button class="btn_common submit">추가</button>
                <button class="btn_common cancel">취소</button>
            </div>
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
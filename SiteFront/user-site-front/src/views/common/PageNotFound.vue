<template>
    <article id="contents" class="sub">
        <div class="content page_notFound">
            <div class="error_textBox codeNum404">
                <h4>페이지를 찾을 수 없습니다.</h4>
                <p>주소가 잘못 입력되었거나, 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.<br>입력하신 주소가 정확한지 다시 한번 확인해 주세요.</p>
<!--                <h4>PAGE NOT FOUND!</h4>-->
<!--				<p>The page you were looking for doesn't exist!</p>-->
                <router-link to="/" class="btn_back">Back to Home</router-link>
            </div>
        </div>
    </article>
<!--    <div>-->
<!--        <p>-->
<!--        Not Found-->
<!--        </p>-->
<!--        <p>-->
<!--            <router-link to="/" tag="button">홈으로</router-link>-->
<!--        </p>-->
<!--    </div>-->
</template>

<script>
    export default {

        name: "pageNotFound"
    }
</script>

<style>
</style>

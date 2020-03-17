<template>
    <div>
        <p>이 로고는 리셀러 시스템에서 사용됩니다.<br>
        로고는 다음과 같은 형식으로 작성하십시오&nbsp;&#58;&nbsp;PNG&nbsp;/&nbsp;투명성&nbsp;/&nbsp;크기&nbsp;160px&nbsp;x&nbsp;50px</p>
        <div class="file_add_wrap">
            <img src="@/assets/images/sub/logo_sample.png" alt="로고"><br>
            <span>
                <button type="button" class="btn_file_add" title="파일선택">파일 선택</button>
                선택된 파일 없음
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DetailLogo"
    }
</script>

<style scoped>

</style>
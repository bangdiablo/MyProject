<!--    메인 표시되는 화면은 폴더명 == 파일명으로 사용바랍니다.            -->

<template>

</template>

<script>
    export default {

        mounted() {

            // 로그인 확인용
            axios.post("/main/main/").then(response => {

                if (response.status == 200) {

                    this.$router.push('/main');
                }
            }).catch(response => {

                this.$router.push('/before_login/login');
            })
        }
    }
</script>

<style>
</style>

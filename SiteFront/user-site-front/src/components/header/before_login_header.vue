<!--    메인 표시되는 화면은 폴더명 == 파일명으로 사용바랍니다.            -->
<template>
    <h1><router-link to="/before_login/login"><img src="@/assets//images/layout/logo.svg" alt="AOSBOX"/></router-link></h1>
</template>

<script>
</script>
<style>
.red { color: red; }
.green { color: green; }
.input-error {
    text-align: right;
    font-size: 13px;
    color: #f44040;
    height: 22px;
}
.input-image {
    position: absolute;
    width: 26px;
    height: 26px;
    top: 9px;
    right: 0px;
}
section#member_info .member_form fieldset p.field input.has-value.has-error[type="text"],
section#member_info .member_form fieldset p.field input.has-value.has-error[type="password"] {
	width: 100%;
	padding: 10px 0px 9px;
	height: 36px;
	border-radius: 0px;
	border-width: 0px 0px 2px;
	border-style: solid;
	border-color: crimson;
}
</style>

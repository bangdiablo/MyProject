<template>
    <article id="contents" class="sub">
        <div class="content page_notFound">
			<div class="error_textBox codeNum500">
				<span class="errorNumber">500</span>
				<h4>INTERNAL SERVER ERROR!</h4>
				<p>Please try after some time</p>
			</div>
			<router-link to="/" class="btn_back">Back to Home</router-link>
		</div>
    </article>
</template>

<script>
    export default {

        name: "internalServerError"
    }
</script>

<style>
</style>

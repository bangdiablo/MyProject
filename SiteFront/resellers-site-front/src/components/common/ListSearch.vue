<template>
    <div class="filter_search float_left">
        <fieldset class="search_form left">
            <legend>검색</legend>
            <p>
                <input type="text" title="검색어 입력" placeholder="검색" v-model="searchText" @keydown.enter="getList()">
                <button type="button" class="btn_search"  @click="getList()">
                    <span class="blind">검색</span>
                    <span class="btn_search_ico"></span>
                </button>
            </p>
        </fieldset>
    </div>
</template>

<script>
    export default {
        name: "ListSearch",
        data() {

            return {
                searchText : ''
            }
        },
        methods: {

            getList() {

                this.$parent.$data.pageInfo.searchText = this.searchText;
                this.$emit("getList");
            }
        }
    }
</script>

<style scoped>

</style>
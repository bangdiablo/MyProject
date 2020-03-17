<template>
    <div class="pageWrap clear_both">
        <div class="page_location float_left">
            Showing to {{listCnt}} of {{pageInfo.totalData}} rows
            <span class="basic_select selectbox_ui">
                <b class="selected_txt">1</b>
                <select>
                    <option value="10" :selected="pageInfo.dataPerPage === 10">10</option>
                    <option value="20" :selected="pageInfo.dataPerPage === 20">20</option>
                    <option value="30" :selected="pageInfo.dataPerPage === 30">30</option>
                    <option value="50" :selected="pageInfo.dataPerPage === 50">50</option>
                    <option value="100" :selected="pageInfo.dataPerPage === 100">100</option>
                </select>
            </span>
            rows per page
        </div>
        <div class="page_navi">
            <a class="btn_page first" href="#">
                <span class="icon_arrow"><em class="blind">목록에서 처음 페이지 이동</em></span>
            </a>
            <a href="#" class="btn_page prev" @click="$emit('getList', prevPage)">
                <span class="icon_arrow"><em class="blind">이전 페이지 이동</em></span>
            </a>

            <template v-for="page in pageArr">
                <a href="#" class="num" :class="{active: page.active}" @click="$emit('getList', page.pageNo)">{{ page.pageNo }}</a>
            </template>

            <a href="#" class="btn_page next" @click="$emit('getList', nextPage)">
                <span class="icon_arrow"><em class="blind">다음 페이지 이동</em></span>
            </a>
            <a class="btn_page last" href="#">
                <span class="icon_arrow"><em class="blind">목록에서 마지막 페이지 이동</em></span>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ListPaging",
        props:['pageInfo', 'listCnt'],
        computed: {
            currentPage() {

              return this.pageInfo.currentPage;
            },
            prevPage() {

                const currentPage = this.pageInfo.currentPage,
                      pagesPerOnce = this.pageInfo.pagesPerOnce;

                let page,
                    prevPage;

                if (currentPage > pagesPerOnce) {

                    if (currentPage % pagesPerOnce == 0)
                        page = currentPage - pagesPerOnce;
                    else
                        page = currentPage - currentPage % pagesPerOnce;

                    prevPage = page;

                } else {

                    prevPage = 1;
                }

                return prevPage;
            },
            pageArr() {

                const pagesPerOnce = this.pageInfo.pagesPerOnce,
                      totalPages = this.totalPages,
                      pageGroupNo = this.pageGroupNo;

                let pageArr = [];

                if (totalPages === 0) return pageArr;

                for (let i = pageGroupNo * pagesPerOnce + 1; i <= (pageGroupNo + 1) * pagesPerOnce; i++) {

                    let obj = {pageNo: i};

                    if (this.pageInfo.currentPage == i) {

                        obj.active = true;

                    } else {

                        obj.active = false;
                    }

                    pageArr.push(obj);

                    if (totalPages == i)
                        break;
                }

                return pageArr;
            },
            nextPage() {

                const pagesPerOnce = this.pageInfo.pagesPerOnce,
                      totalPages = this.totalPages,
                      pageGroupNo = this.pageGroupNo;

                let page,
                    nextPage;

                if (totalPages > (pageGroupNo + 1) * pagesPerOnce) {

                    page = (pageGroupNo + 1) * pagesPerOnce + 1;
                    nextPage = page;

                } else {

                    // nextPage = this.pageInfo.currentPage;
                    nextPage = totalPages;
                }

                return nextPage;
            },
            totalPages() {

                const totalData = this.pageInfo.totalData,
                    dataPerPage = this.pageInfo.dataPerPage;

                let totalPages;

                if (totalData % dataPerPage == 0)
                    totalPages = Math.floor(totalData / dataPerPage);
                else
                    totalPages = Math.floor(totalData / dataPerPage) + 1;

                return totalPages;
            },
            pageGroupNo() {

                return Math.floor((this.pageInfo.currentPage - 1) / this.pageInfo.pagesPerOnce);
            },
        },
        mounted() {

            //셀렉트박스 UI
            jQuery(".selectbox_ui").each(function () {
              initSelectBox(jQuery(this)) //비동기로 셀렉트 박스를 만들었을 경우 initSelectBox(jQuery("#아이디")) 로 실행시켜줘야 함
            })
        },
        methods : {

            showingPages() {

                return this.pageInfo.totalData < this.pageInfo.dataPerPage ? this.pageInfo.totalData : this.pageInfo.dataPerPage;
            }
        }
    }
</script>

<style scoped>
.page_navi .btn_page.next {
    margin-left: 10px;
}
</style>
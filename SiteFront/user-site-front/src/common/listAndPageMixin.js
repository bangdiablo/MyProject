export const listAndPageMixin = {

    data() {
        return {
            list: [],
            pageInfo: {
                totalData: 0,       // 총 데이터 수
                currentPage: 1,     // 현재 페이지
                pagesPerOnce: 10,   // 한 번에 보이는 페이지 수
                dataPerPage: 10,    // 한 페이지에 보이는 data 수
                searchText: '',
                orderName: '',
                orderType: ''
            },
        }
    },
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
        checkedAll: {

            get() {

                let count = 0;

                for (let i = 0; i < this.list.length; i++) {

                  if (this.list[i].checked) count++;
                }

                return this.list.length === count;
            },
            set(val) {

                if (val)
                    this.list.setAllObjProp('checked', true);
                else
                    this.list.setAllObjProp('checked', false);
            }
        },
    },
}
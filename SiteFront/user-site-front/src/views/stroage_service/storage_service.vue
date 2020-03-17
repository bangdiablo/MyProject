<template>
  <article id="contents" class="sub">
    <location/>

    <div class="content">
      <div class="file_folder_list">
        <div class="board_search_edit">
          <div class="btn_edit left">
            <button type="button" v-show="fileSelected" @click="clickBtnDownload">
              <img src="@/assets/images/sub/btn_affe_download.png" alt="" class="ico"/>
              <span class="txt">다운로드</span>
            </button>
            <button type="button" v-show="fileSelected" @click="clickBtnShare">
              <img src="@/assets/images/sub/btn_affe_share.png" alt="" class="ico"/>
              <span class="txt">공유</span>
            </button>
            <button type="button" v-show="fileSelected" @click="clickBtnDelete">
              <img src="@/assets/images/sub/btn_affe_delete.png" alt="" class="ico"/>
              <span class="txt">삭제</span>
            </button>
          </div>
          <div class="ico_btn_edit right">
            <button type="button" @click="templateType='list'" v-show="templateType === 'thumbnail'">
              <img src="@/assets/images/sub/btn_affe_list.png" alt="리스트형태"/>
            </button>
            <button type="button" @click="templateType='thumbnail'" v-show="templateType === 'list'">
              <img src="@/assets/images/sub/btn_affe_thumbnail.png" alt="썸네일형태"/>
            </button>
            <button type="button" @click="showDeletedFile = !showDeletedFile" v-show="!showDeletedFile">
              <img src="@/assets/images/sub/ico_affe_delete_show.png" alt="삭제된 파일 표시"/>
            </button>
            <button type="button" @click="showDeletedFile = !showDeletedFile" v-show="showDeletedFile">
              <img src="@/assets/images/sub/ico_affe_delete_hide.png" alt="삭제된 파일 감추기"/>
            </button>
            <button type="button" @click="refreshList">
              <img src="@/assets/images/sub/ico_affe_reload.png" alt="새로고침"/>
            </button>
          </div>
        </div>

        <!-- list -->
        <table class="board_list" v-if="templateType == 'list'">
          <caption>파일리스트</caption>
          <colgroup>
            <col style="width:70px"/>
            <col style="width:*px"/>
            <col style="width:150px"/>
            <col style="width:150px"/>
            <col style="width:200px"/>
          </colgroup>
          <thead>
          <tr>
            <th scope="col"/>
            <th scope="col"><a href="javascript:void(0)" class="sorting">이름</a></th>
            <th scope="col"><a href="javascript:void(0)" class="sorting on">변경일</a></th>
            <th scope="col"><a href="javascript:void(0)" class="sorting">사이즈</a></th>
            <th scope="col">기타</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in list" @click="clickRow(item); toggleCheckedToList(item.fi_id);"
              @dblclick="dblclick(item)"
              :key="item.fi_id"
              :class="{on: item.on}">
            <td>
              <input type="checkbox" title="선택" v-model:cheked="item.checked"/>
            </td>
            <td class="left">
              <img v-bind:src="item.icoImgUrl" class="file_type"/>
              <a href="#">{{ item.fi_name }}</a>
            </td>
            <td>{{ fmtDate(item.fi_modifydate) }}</td>
            <td>{{ formatFileSize(item.fi_file_size) }}</td>
            <td class="item_edit">
              <button type="button" @click.stop="fileDownLoad(item)"><i class="download">다운로드</i></button>
              <button type="button" @click.stop="clickBtnShareOne(item.fi_id)"><i class="share">공유</i></button>
              <button type="button" @click.stop="clickBtnDetail(item.fi_id)"><i class="detail">상세보기</i></button>
              <button type="button" @click.stop="clickBtnEtc(item.fi_id)"><i class="more">더 많은</i></button>
            </td>
          </tr>
          </tbody>
        </table>
        <!-- thumbnail -->
        <ul class="board_thumbnail" v-else-if="templateType == 'thumbnail'">
          <li v-for="item in list" :key="item.fi_id">
            <label :class="{on: item.on}">
              <input type="checkbox" v-model:cheked="item.checked"/>
              <span class="screen_shot">
                                <img v-bind:src="item.previewImgUrl" alt="" class="none_photo"/>

                <!-- 미리보기 있을 때 -->
                <!--                                <img v-bind:src="item.previewImgUrl" alt="" :class="{none_photo: !isPhoto(item.type), photo: isPhoto(item.type)}"/>-->
              </span>
              <span class="file_name">
                                <img v-bind:src="item.icoImgUrl" alt="" class="ico"/>{{ item.fi_name }}
              </span>
            </label>
          </li>
        </ul>
      </div>
    </div>
    <!-- 상세정보  Start -->
    <DetailInfo :visible="currentInfo.isActive" :currentTab="currentInfo.currentTab"
                :file_name="currentInfo.file_name" :detail_info="detail_info"/>
    <!-- 상세정보  End -->
    <!-- 모달 배경 -->
    <div class="modal_bg"></div>
  </article>
</template>

<script>


  import {contentMixin} from '../../common/contentMixin'
  import $ from "jquery";

  import DetailInfo from './detail_info.vue'

  export default {
    name: 'Share',
    components: {
      DetailInfo
    },
    mixins: [contentMixin],
    data() {
      return {
        file_list: new Map(),
        firstList: '',
        templateType: 'list',
        showDeletedFile: false,
        /* 상세정보창 관련 */
        currentInfo: {
          id: '', // 현재 표시되는 정보의 id
          isActive: false, // 활성화 여부
          currentTab: 'detail', // 현재 탭
          file_name: ''
        },
        detail_info: {},
        checked: false,
      }
    },
    computed: {
      list() {
        return this.$store.state.storage_service.lists.list
      },
      info() {
        return this.list.getObjectById('id', this.currentInfo.id)
      },
      // checkedAll: {
      //   get() {
      //     let count = 0;
      //     for (let i = 0; i < this.list.length; i++) {
      //       if (this.list[i].checked) count++
      //     }
      //
      //     return this.list.length === count
      //   },
      //   set(val) {
      //     if (val) {
      //       this.list.setAllObjProp('checked', true)
      //     } else {
      //       this.list.setAllObjProp('checked', false)
      //     }
      //   }
      // },
      fileSelected() {
        return this.list.countObjProp('checked', true) > 0
      }
    },
    created() {
      // for (i = 0; i < list.length; i++) {
      //   list[i].icoImgUrl = this.getFileUrl('ico_ft_' + list[i].type + '.png');
      //   list[i].previewImgUrl = this.getFileUrl('preview_ft_' + list[i].type + '.png')
      // }

    },
    mounted() {
      $(document).ready(function ($) {

        jQuery("article#contents.sub .content").mCustomScrollbar({
          theme: "minimal-dark"
        });

        //셀렉트박스 UI
        jQuery(".selectbox_ui").each(function () {
          initSelectBox(jQuery(this)) //비동기로 셀렉트 박스를 만들었을 경우 initSelectBox(jQuery("#아이디")) 로 실행시켜줘야 함
        })
      });

      // 새로고침 시, 선택된 메뉴의 상위 메뉴 opened
      if (this.currentUpperMenu != undefined) {

        this.isOpened[this.currentUpperMenu] = true;
      }
    },
    methods: {

      isPhoto(type) {
        return type === 'photo'
      },

      /* 상단 다운로드 클릭 */
      clickBtnDownload() {

        const count = this.list.countObjProp('checked', true);

        var target_list = []

        for (var i = 0; i < this.list.length; i++) {
          if (this.list[i].checked == true) {
            target_list.push(this.list[i])
          }
        }

        console.log("target_list", target_list)


        // TODO
        // 모달창 팝업 예정
        // 멀티 선택시, ZIP파일로 다운로드 진행
      },

      /* 상단 공유 클릭 */
      clickBtnShare() {

        const count = this.list.countObjProp('checked', true);

        alert(`${count}개가 선택되었습니다. 공유?`);

        // TODO
        // 모달창 팝업 예정
      },

      /* 상단 삭제 클릭 */
      clickBtnDelete() {

        const count = this.list.countObjProp('checked', true);

        var target_list = []

        for (var i = 0; i < this.list.length; i++) {
          if (this.list[i].checked == true) {
            target_list.push(this.list[i])
          }
        }



        let data = {
          list: target_list
        };

        axios.post('/storage_service/delete/',
          data
        ).then(response => {
          location.reload()
        }).catch(error => {
          console.log(error)

        });


        console.log("target_list", target_list)


        // TODO
        // 모달창 팝업 예정
      },

      /* 상단 새로고침 클릭 */
      refreshList() {
        this.list = JSON.parse(JSON.stringify(this.firstList))
      },

      /* row 클릭 */
      clickRow(item) {
        this.onlyOneOnToList(item.fi_id); // on
        console.log("clickRow", item.fi_id);
        this.currentInfo.id = item.fi_id // detail 정보변경
        //         // 폴더일 경우
        // if (item.fi_is_folder == true) {
        //   this.getFolderList(item)
        // }
      },

      dblclick(item) {

        // 폴더일 경우
        if (item.fi_is_folder == true) {
          this.getFolderList(item)
        }
      },
      getFolderList(item) {
        this.$store.dispatch("storage_service/getFolderList", {
          item: item,
          vm: this
        })
      },
      /* row 하나에만 on */
      onlyOneOnToList(key) {
        this.list.setAllObjProp('on', false);
        this.list.getObjectById('id', key).on = true
      },

      /* toggle row checked */
      toggleCheckedToList(key) {
        const item = this.list.getObjectById('id', key);
        item.checked = !item.checked
      },

      /* 다운로드 클릭 */
      clickBtnDownloadOne(key) {
        this.onlyOneOnToList(key); // on
        this.currentInfo.id = key; // detail 정보변경

        fileDownLoad()

        // TODO
        // 모달창 팝업 예정
      },

      /* 공유 클릭 */
      clickBtnShareOne(key) {
        this.onlyOneOnToList(key); // on
        this.currentInfo.id = key; // detail 정보변경
        alert('공유?')

        // TODO
        // 모달창 팝업 예정
      },

      /* 상세보기 클릭 */
      clickBtnDetail(key) {

        console.log("key==>", this.currentInfo.isActive);

        if (!this.currentInfo.isActive) {
          this.currentInfo.currentTab = 'detail'
        }

        let item = this.list.getObjectById('fi_id', key);

        this.detail_info = item;

        this.currentInfo.isActive = this.currentInfo.id == key ? !this.currentInfo.isActive : true;

        this.onlyOneOnToList(key); // on
        this.currentInfo.id = key // detail 정보변경
      },

      clickBtnEtc(key) {
        this.onlyOneOnToList(key); // on
        this.currentInfo.id = key; // detail 정보변경
        alert('컨텍스트 메뉴 표시 예정')
        // TODO
        // 컨텍스트 메뉴 표시 예정
        // 미리보기 / 클라우드 드라이브에 복사 / 즐겨찾기 등록 / 태그 추가 / 버전 표시 / 삭제
      }
    }
  }
</script>

<style>
</style>

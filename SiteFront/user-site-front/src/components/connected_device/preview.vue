<template>
  <div>
    <!-- S : 이미지 뷰어 -->
    <div class="overlay_bg show" v-show="visible">
      <div class="overlay_wrap">
        <div class="overlay_imgView">
          <div class="pbImgOverlay">
            <img src="@/assets/images/sub/preview_ft_word.png" class="none_photo"
                 v-if="preview_info.ext == '.docs' || preview_info.ext == '.doc'" :title="preview_info.file_name"/>
            <img src="@/assets/images/sub/preview_ft_pdf.png" class="none_photo"
                 v-else-if="preview_info.ext == '.pdf'" :title="preview_info.file_name"/>
            <img src="@/assets/images/sub/preview_ft_pp.png" class="none_photo"
                 v-else-if="preview_info.ext == '.pptx' || preview_info.ext == '.ppt'" :title="preview_info.file_name"/>
            <img src="@/assets/images/sub/preview_ft_excel.png" class="none_photo"
                 v-else-if="preview_info.ext == '.xlsx' || preview_info.ext == '.xls' "
                 :title="preview_info.file_name"/>
            <img src="@/assets/images/sub/preview_ft_photo.png" class="none_photo"
                 v-else-if="preview_info.type == 'image'" :title="preview_info.file_name"/>
            <img src="@/assets/images/sub/preview_ft_music.png" class="none_photo"
                 v-else-if="preview_info.type == 'audio'" :title="preview_info.file_name"/>
            <img src="@/assets/images/sub/preview_ft_video.png" class="file_type"
                 v-else-if="preview_info.type == 'video'" :title="preview_info.file_name"/>
            <img src="@/assets/images/sub/preview_ft_etc.png" class="none_photo" v-else :title="preview_info.file_name"
            />
          </div>
        </div>
        <div class="overlay_header">
          <button type="button" class="btn_back" title="돌아가기" @click="close"><span class="blind">돌아가기</span></button>
          <div class="fileName">{{ preview_info.file_name }}</div>
          <div class="btn_wrap">
            <button type="button" class="btn_download" title="내려받기"><span class="blind">내려받기</span></button>
            <button type="button" class="btn_share" title="공유하기"><span class="blind">공유하기</span></button>


            <button type="button" class="btn_bookMark selected" title="즐겨찾기 해제" v-if="preview_info.favorite_flag=='Y'"
                    @click="clickBtnFavoriteDel"><span class="blind">즐겨찾기</span></button>
            <button type="button" class="btn_bookMark" title="즐겨찾기" v-else><span class="blind">즐겨찾기</span></button>


            <button type="button" class="on btn_more" title="더보기"
                    @click.stop="clickBtnMore($event,preview_info.id)"><span
              class="blind">더보기</span></button>
            <!-- button class = "on" 으로 상태표시 -->
          </div>
        </div>

        <div class="overlay_imgList" v-show="list_show">
          <ul>
            <li v-for="(item, idx) in file_list" :key="item.id" :class="{'active': item.id === preview_info.id }"
                :id="'list_' + idx">
              <!-- 선택된 이미지 class="active" TODO 개선할것!!!-->
              <a href="#" @click="click_list_row($event, item.id)">
                <img src="@/assets/images/sub/preview_ft_word.png" class="none_photo"
                     v-if="item.ext == '.docs' || item.ext == '.doc' " :title="item.file_name"/>
                <img src="@/assets/images/sub/preview_ft_pdf.png" class="none_photo"
                     v-else-if="item.ext == '.pdf'" :title="item.file_name"/>
                <img src="@/assets/images/sub/preview_ft_pp.png" class="none_photo"
                     v-else-if="item.ext == '.pptx' || item.ext == '.ppt'" :title="item.file_name"/>
                <img src="@/assets/images/sub/preview_ft_excel.png" class="none_photo"
                     v-else-if="item.ext == '.xlsx' || item.ext == '.xls' " :title="item.file_name"/>
                <img src="@/assets/images/sub/preview_ft_photo.png" class="none_photo"
                     v-else-if="item.type == 'image'" :title="item.file_name"/>
                <img src="@/assets/images/sub/preview_ft_music.png" class="none_photo"
                     v-else-if="item.type == 'audio'" :title="item.file_name"/>
                <img src="@/assets/images/sub/preview_ft_video.png" class="file_type"
                     v-else-if="item.type == 'video'" :title="item.file_name"/>
                <img src="@/assets/images/sub/preview_ft_etc.png" class="none_photo" v-else :title="item.file_name"/>
              </a>
            </li>
          </ul>
        </div>

        <transition name="fade" mode="out-in">
          <div class="overlay_zoom">
            <!-- 파일이 이미지일 경우 표시-->
            <span v-if="preview_info.type == 'image'">
            <button type="button" class="btn_zoomOut" title="축소"><span class="blind">축소</span></button>
            <button type="button" class="btn_zoomFull" title="전체화면"><span class="blind">전체화면</span></button>
            <button type="button" class="btn_zoomIn" title="확대"><span class="blind">확대</span></button>
            </span>

            <button type="button" class="btn_viewList" title="리스트보기" @click="view_list"><span
              class="blind">리스트 보기</span></button>
            <button type="button" class="btn_view" title="이미지 보기"><span class="blind">이미지 보기</span></button>
            <button type="button" class="btn_view_blank" title="새창으로 보기" v-if="preview_info.type !== 'image'"
                    @click="open_viewer">
              <span class="ico_view_blank"></span>中を見る
            </button>
          </div>
        </transition>


        <button type="button" class="btn_prevNext btn_prev" @click="prev_item" v-if="prev_item_no !== 0"><span
          class="blind">이전</span>
        </button>
        <button type="button" class="btn_prevNext btn_next" @click="next_item" v-if="this.next_item_no !== -1"><span
          class="blind">다음</span></button>
      </div>

      <div class="fileInfo_wrap" v-show="detail_show">
        <div class="fileInfo_name">{{ preview_info.file_name }}
          <button type="button" class="btn_fileInfo_close" @click="btn_close">닫기</button>
        </div>
        <table cellpadding="0" cellspacing="0">
          <caption>파일 상세정보</caption>
          <colgroup width="70"/>
          <tbody>
          <tr>
            <th>종류</th>
            <td>{{ preview_info.kind }}</td>
          </tr>
          <tr>
            <th>사이즈</th>
            <td>{{ formatFileSize(preview_info.file_size) }}</td>
          </tr>
          <tr>
            <th>장소</th>
            <td>{{ preview_info.full_path }}</td>
          </tr>
          <tr>
            <th>변경일</th>
            <td>{{ kstDate(preview_info.modify_date) }}</td>
          </tr>
          <tr>
            <th>작성일</th>
            <td>{{ kstDate(preview_info.create_date) }}</td>
          </tr>
          <tr>
            <th>백업일</th>
            <td>{{ kstDate(preview_info.backup_date) }}</td>
          </tr>
          <tr>
            <th>단말</th>
            <td>{{ preview_info.storage_name }}</td>
          </tr>
          </tbody>

        </table>
        <div class="input_tagBox">
			<span class="keyword">
				tag1<button type="button" class="btn_delete"><img src="@/assets/images/sub/btn_tag_delete.png"
                                                          alt="삭제"></button>
			</span>
          <span class="keyword">
				tag1<button type="button" class="btn_delete"><img src="@/assets/images/sub/btn_tag_delete.png"
                                                          alt="삭제"></button>
			</span>
          <input type="text" placeholder="태그입력">
          <button type="button" class="btn_inputTag_edit"><span class="blind">태그입력</span></button>
        </div>
      </div>
    </div>
    <!-- E : 이미지 뷰어 -->


    <!-- S : 뷰어 호출 레이어 -->
    <div class="layer_popup view" id="viewer_show">
      <div class="view_inner">
        <div class="area_view"></div>
        <div class="file_folder_info none_tabMenu">
          <ul class="ffi_navi">
            <li><a href="#" class="active">자세한사항</a></li>
          </ul>
          <div class="ffi_cont">
            <div class="ffi_detail" style="display:block">
              <h3><img src="@/assets/images/sub/ico_ft_photo.png" alt="" class="ico"/>백업파일 123.jpg</h3>
              <div class="screen_shot">
                <img src="@/assets/images/sub/preview_ft_photo.png" alt="" class="photo"/>
              </div>
              <ul class="info">
                <li><strong class="category">종류</strong><span class="field">기타</span></li>
                <li><strong class="category">사이즈</strong><span class="field">32.20KB</span></li>
                <li><strong class="category">장소</strong><span class="field">C:\Users\aoskorea\Desktopesktopesktopesktopesktopesktop</span>
                </li>
                <li><strong class="category">변경일</strong><span class="field">2019.4.10 오후 3:03:34</span></li>
                <li><strong class="category">작성일</strong><span class="field">2019.4.10 오후 3:03:34</span></li>
                <li><strong class="category">백업일</strong><span class="field">2019.4.10 오후 3:03:34</span></li>
                <li><strong class="category">단말</strong><span class="field">DESKTOP-9HQEECE</span></li>
              </ul>
            </div>

          </div>
        </div>
      </div>
      <button type="button" class="btn_close"><img src="@/assets/images/component/btn_popup_close.png" alt="Close"></button>
    </div>
    <!-- E : 뷰어 호출 레이어 -->

    <div class="menu_layer_preview">
      <ul>
        <li><a href="#">클라우드 드라이브 복사</a></li>
        <li><a href="#">태그 추가</a></li>
        <li><a href="#">삭제</a></li>
        <li @click.stop="clickBtnDetail"><a href="#">상세</a></li>
      </ul>
    </div>

  </div>
</template>

<script>

  import {contentMixin} from '../../common/contentMixin'
  import {EventBus} from "../../plugins/event-bus.js"
  import $ from "jquery";

  export default {
    mixins: [contentMixin],

    props: {
      visible: {
        type: Boolean,
        require: true,
        default: false
      },
      file_name: {
        type: String,
        require: true,
      },
      file_id: {
        type: String,
        require: true,
        default: ''
      },
      preview_data: {
        type: Object,
        require: true
      },
      item_idx: {
        type: Number
      },
      category_tab: {
        type: String,
        require: true,
      },
    },
    computed: {
      fileList() {
        return this.$store.state.connected_device.files
      },
      next_page() {
        return this.$store.state.connected_device.next_page;
      },
      has_next() {
        return this.$store.state.connected_device.has_next;
      },
    },
    data: function () {
      return {
        detail_show: false,
        list_show: false,
        preview_info: [],
        index_page: '',
        pageNum: 0,
        next_item_no: 0,
        prev_item_no: 0,
        btn_show: false,
        last_idx: 0,
        prev_idx: 0,
        file_list: [],

      }
    },
    mounted() {
      EventBus.$on('preview_open', item_idx => {
        this.preview_info = this.fileList[item_idx];
        this.file_list = this.current_list(this.preview_info);
        this.prev_item_no = this.file_list.indexOf(this.preview_info);
        let next_item = this.fileList[item_idx + 1];
        this.next_item_no = this.file_list.lastIndexOf(next_item);
      });
      jQuery(".overlay_imgList").mCustomScrollbar({
        theme: "minimal-dark",
        horizontalScroll: true,
        autoScrollOnFocus: true,
        scrollInertia: 400, //
      });
    },
    methods: {
      current_list(item) {
        // 현재 선택되어진 대상의 인덱스를 가져오기
        let idx = this.fileList.indexOf(item);

        let start = 0;
        let end = 23;
        if (idx > 10) {
          start = idx - 11;
          end = idx + 11;
        }
        return this.fileList.slice(start, end)
      },

      close() {
        EventBus.$emit('update_visible')
      },
      click_list_row(e, id) {

        this.preview_info = this.file_list.getObjectById('id', id);
        let item_idx = this.file_list.indexOf(this.preview_info);
        let prev_item = this.fileList[item_idx];
        this.prev_item_no = this.fileList.indexOf(prev_item);

        if (this.prev_item_no === 0) {
          this.file_list = this.current_list(this.preview_info);
        }
        if (!this.has_next) {
          let next_item = this.fileList[item_idx + 1];
          this.next_item_no = this.fileList.lastIndexOf(next_item);
        }
      },
      fileName() {
      },
      next_item() {
        this.next_item_no = this.file_list.indexOf(this.preview_info) + 1;
        this.preview_info = this.file_list[this.next_item_no];
        this.prev_item_no = this.file_list.indexOf(this.preview_info);
        let next_item = this.file_list[this.next_item_no + 1];
        this.last_idx = this.file_list.lastIndexOf(this.preview_info);
        // 마지막 인덱스
        if (this.last_idx === -1) {
          this.preview_info = this.file_list[this.next_item_no - 1];
          this.file_list = this.current_list(this.preview_info);
        }
        if (this.last_idx === -1 && this.has_next === true) {

          let page = document.querySelector('#page').value;
          if (page == this.next_page) {
            document.querySelector('#page').value = parseInt(page) + 1;
            if (this.category_tab == 'default') {
              this.callMoreList(page);
            } else {
              this.callMoreCategoryList(page);
            }
          }
        }
      },

      // TODO 코드가 중복됨 개선 필요!!!!!!!!!
      callMoreCategoryList: function (page) {
        if (page > this.last_page) {
          return;
        }
        this.$store.dispatch("connected_device/getFileByCategory", {
          storage_id: this.$store.state.connected_device.storage_id,
          category: this.category_tab,
          page: page
        })
      },
      callMoreList: function (page) {
        if (page > this.last_page) {
          return;
        }
        this.$store.dispatch("connected_device/getFolderFile", {
          item: this.file_id,
          page: page
        })
      },
      prev_item() {
        this.prev_item_no = this.file_list.indexOf(this.preview_info) - 1;
        this.preview_info = this.file_list[this.prev_item_no];
        let prev_item = this.file_list[this.prev_item_no - 1];
        this.prev_idx = this.file_list.indexOf(prev_item);

        console.log("this.prev_item_no", this.prev_idx);

        if (this.prev_idx === 0 || this.prev_item_no === -1) {
          this.preview_info = this.file_list[this.prev_item_no];
          this.file_list = this.current_list(this.preview_info);
        }

      },
      clickBtnMore(e, key) {

        let posX = e.clientX - 150;
        let posY = e.clientY;
        let contextMenu = $(".menu_layer_preview");

        contextMenu.css({
          "display": "block",
          "position": "fixed",
          "top": posY + "px",
          "left": posX + "px",
          "z-index": 90
        });

        $(contextMenu).mouseleave(function (e) {
          contextMenu.hide();
        })
      },
      view_list() {
        if (this.list_show === false) {
          $(".overlay_zoom").css("top", "75%");
          this.list_show = !this.list_show

        } else {
          $(".overlay_zoom").css("top", "90%");
          this.list_show = !this.list_show
        }
      },
      /* 상세보기 클릭 */
      clickBtnDetail() {

        if (this.detail_show === false) {

          $(".overlay_bg").addClass("fileInfo")
          this.detail_show = !this.detail_show
        } else {
          $(".overlay_bg").removeClass("fileInfo")
          this.detail_show = !this.detail_show
        }


      },
      btn_close() {
        if (this.detail_show === true) {
          $(".overlay_bg").removeClass("fileInfo")
          this.detail_show = !this.detail_show
        }

      },
      clickBtnFavoriteDel() {
        var qs = require('qs');
        axios.post('/connected_device/favorite-del',
          qs.stringify({
            id: this.preview_info.id
          })
        ).then(response => {
          if (response.status === 200) {

            //  플래그 업데이트 하기
            this.$store.commit('connected_device/update_favorite_flg_del', response.data)
          }
        });
      },
      open_viewer() {

        console.log("뷰어")

        let viewer_show = $("#viewer_show");
        viewer_show.css({
          "display": "block",
        });

      }
    }
  }
</script>

<style scoped>
  /* File Folder Info */
  .file_folder_info {
    display: block;
  }

  .file_folder_info .ffi_cont .ffi_detail {
    display: block;
  }

  .file_folder_info .ffi_cont .ffi_version {
    display: block;
  }

  .file_folder_info.none_tabMenu .ffi_navi {
    display: block;
  }

  /* Menu Layer */
  .menu_layer_preview {
    position: absolute;
    z-index: 90;
    display: none;
    padding: 5px 0px;
    border: 1px solid #CCD4DC;
    border-radius: 3px;
    background-color: white;
    box-shadow: 2.121px 2.121px 5px 0px rgba(187, 206, 238, 0.4);
  }

  .menu_layer_preview ul li {
    text-align: left;
    line-height: 0;
  }

  .menu_layer_preview ul li a {
    display: block;
    padding: 8px 16px;
    line-height: 120%;
  }

  .menu_layer_preview ul li a:hover {
    background-color: #F5F9FC;
  }

  .menu_layer_preview ul li a img.ico {
    position: relative;
    top: -2px;
    margin-right: 6px;
  }

  .overlay_zoom {
    top: 90%;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.25s ease-out;
  }

  .fade-enter, .fade-leave-to {
    opacity: 90;
  }

</style>

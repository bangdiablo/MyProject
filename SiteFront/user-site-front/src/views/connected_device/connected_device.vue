<template>
  <div>
    <Preview :visible="previewInfo.isActive" :file_list="file_list" :category_tab="category_tab"></Preview>
    <article id="contents" class="sub">
      <location/>
      <ul class="category_navi">
        <li>
          <a href="#" :class="{active: category_tab == 'all'}" @click="get_category('all')">
            전체
            <!-- 새로운 목록 있을 경우 new 아이콘 추가 -->
            <!--          <img src="@/assets/images/sub/ico_cn_new.png" alt="신규" class="new">-->
          </a>
        </li>
        <li>
          <a href="#" :class="{active: category_tab == 'document'}" @click="get_category('document')">문서</a>
        </li>
        <li>
          <a href="#" :class="{active: category_tab == 'image'}" @click="get_category('image')">사진</a>
        </li>
        <li>
          <a href="#" :class="{active: category_tab == 'video'}" @click="get_category('video')">비디오</a>
        </li>
        <li>
          <a href="#" :class="{active: category_tab == 'audio'}" @click="get_category('audio')">음악</a>
        </li>
        <li>
          <a href="#" :class="{active: category_tab == 'ocr'}" @click="get_category('ocr')">OCR</a>
        </li>
        <li>
          <a href="#" :class="{active: category_tab == 'etc'}" @click="get_category('etc')">기타</a>
        </li>
        <li>
          <a href="#" :class="{active: category_tab == 'folder'}" @click="get_category('folder')">폴더</a>
        </li>
      </ul>
      <div class="content" id="scroll-bar">
        <div class="file_folder_list">
          <div class="board_search_edit">
            <div class="btn_edit left">
              <!-- 썸네일 보기에만 전체선택 체크박스 노출 -->
              <span class="basic_select selectbox_ui">
							<b class="selected_txt">사이즈</b>
							<select id="">
								<option value="">사이즈</option>
								<option value="">1MB</option>
								<option value="">1MB~5MB</option>
								<option value="">5MB~100MB</option>
								<option value="">100MB~1GB</option>
								<option value="">1GB 이상</option>
								<option value="">임의의 크기</option>
							</select>
						</span>
              <span class="basic_select selectbox_ui">
							<b class="selected_txt">변경일</b>
							<select id="">
								<option value="">변경일</option>
								<option value="">과거 24시간</option>
								<option value="">과거 1주일</option>
								<option value="">과거 1개월</option>
								<option value="">1년 전</option>
								<option value="">임의의 날짜</option>
							</select>
						</span>
              <span class="basic_select selectbox_ui">
							<b class="selected_txt">스토리지</b>
							<select id="">
								<option value="">스토리지</option>
								<option value="">일반 스토리지</option>
								<option value="">콜드 스토리지</option>
							</select>
						</span>
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
              <button type="button"><img src="@/assets/images/component/btn_edit_reload.png" alt="새로고침" title="새로고침"/>
              </button>
              <button type="button" v-show="fileSelected"><img src="@/assets/images/component/btn_edit_download.png"
                                                               alt="다운로드" title="다운로드"/>
              </button>
              <button type="button" v-show="fileSelected"><img src="@/assets/images/component/btn_edit_share.png"
                                                               alt="공유"
                                                               title="공유"/></button>
              <button type="button" v-show="fileSelected"><img src="@/assets/images/component/btn_edit_delete.png"
                                                               alt="삭제" title="삭제"/>
              </button>
            </div>
          </div>

          <div class="ff_list" ref="fileForm">
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
                <th scope="col"><input type="checkbox" title="전체선택" v-model="checkedAll"/></th>
                <th scope="col"><a href="javascript:void(0)" class="sorting">이름</a></th>
                <th scope="col"><a href="javascript:void(0)" class="sorting on">사이즈</a></th>
                <th scope="col"><a href="javascript:void(0)" class="sorting">변경일</a></th>
                <th scope="col">액션</th>
              </tr>
              </thead>

              <tbody>

              <template v-if="folder_id">
                <tr @click.stop="get_parent(folder_id)" style="cursor:pointer;">
                  <td>
                    ...
                  </td>
                  <td colspan="4">
                  </td>
                </tr>
              </template>

              <template v-if="folderList.length >0 || fileList.length >0">
                <template v-if="folderList.length >0" v-for="item in folderList">
                  <tr :key="item.id" :class="{on: item.on}" v-model="id = item.id">
                    <td><input type="checkbox" title="선택" v-model:cheked="item.checked"/></td>
                    <td class="left"><img src="@/assets/images/sub/ico_ft_folder.png" alt="폴더" class="file_type"/>
                      <a href="#" @click="click_row_folder(item.id)" @dblclick="dblclick(item.id)"
                         @dragstart="dragStart($event)">{{ item.dir_name
                        }} </a>
                    </td>
                    <td>{{ formatFileSize(item.fi_file_size) }}</td>
                    <td>{{ kstDate(item.backup_date) }}</td>
                    <td class="item_edit">
                      <button type="button" @click.stop="clickBtnDownloadOne(item.id)"><i class="download">다운로드</i>
                      </button>
                      <button type="button" @click.stop="clickBtnShareOne(item.id)"><i class="share">공유</i></button>
                      <button type="button" @click.stop="clickBtnDetail(item.id, 'folder')"><i class="detail">상세보기</i>
                      </button>
                      <button type="button" @click.stop="clickBtnEtc($event,item.id, 'folder')"><i class="more">더 많은</i>
                      </button>
                    </td>
                  </tr>
                </template>


                <template v-if="fileList.length > 0" v-for="item in fileList">
                  <tr :key="item.id" :class="{on: item.on}">
                    <td><input type="checkbox" title="선택" v-model:cheked="item.checked"/></td>
                    <td class="left">
                      <!--   Error: “Cannot find module ‘./undefined’” 에러로 requere를 사용할수 없어                  -->
                      <img src="@/assets/images/sub/ico_pwf_word.png" class="file_type"
                           v-if="item.ext == '.docs' || item.ext == '.doc' "/>
                      <img src="@/assets/images/sub/ico_pwf_pdf.png" class="file_type" v-else-if="item.ext == '.pdf'"/>
                      <img src="@/assets/images/sub/ico_pwf_pp.png" class="file_type"
                           v-else-if="item.ext == '.pptx' || item.ext == '.ppt'"/>
                      <img src="@/assets/images/sub/ico_pwf_excel.png" class="file_type"
                           v-else-if="item.ext == '.xlsx' || item.ext == '.xls' "/>
                      <img src="@/assets/images/sub/ico_ft_photo.png" class="file_type"
                           v-else-if="item.type == 'image' "/>
                      <img src="@/assets/images/sub/ico_pwf_music.png" class="file_type"
                           v-else-if="item.type == 'audio' "/>
                      <img src="@/assets/images/sub/ico_pwf_video.png" class="file_type"
                           v-else-if="item.type == 'video' "/>
                      <img src="@/assets/images/sub/ico_ft_etc.png" class="file_type" v-else/>

                      <a href="#" @click="click_row_file(item)" @dblclick="dblclick(item)">{{ item.file_name }} </a>
                    </td>
                    <td>{{ formatFileSize(item.file_size) }}</td>
                    <td>{{ kstDate(item.backup_date) }}</td>
                    <td class="item_edit">
                      <button type="button" @click.stop="clickBtnDownloadOne(item.id)"><i class="download">다운로드</i>
                      </button>
                      <button type="button" @click.stop="clickBtnShareOne(item.id)"><i class="share">공유</i></button>
                      <button type="button" @click.stop="clickBtnDetail(item.id, 'file')"><i class="detail">상세보기</i>
                      </button>
                      <button type="button" @click.stop="clickBtnEtc($event, item.id, 'file')"
                              @mouseleave="menu_layer_leave"><i
                        class="more">더 많은</i></button>
                    </td>
                  </tr>
                </template>


              </template>

              <template class="board_empty" v-else-if="fileList.length == 0 && folder_path.length == 0 ">
                <tr>
                  <td colspan="5"> 결과가 없습니다.</td>
                </tr>
              </template>
              </tbody>
            </table>


            <!-- 썸네일 Start -->
            <!-- thumbnail -->
            <drag-select-container selectorClass="item">
              <ul class="board_thumbnail" v-if="templateType == 'thumbnail'" slot-scope="{ selectedItems }">
                <li v-if="folderList.length >0" v-for="item in folderList" :key="item.id"
                    :class="getClasses(item.id, selectedItems)" :data-item="item">
                  <label :class="{on: item.on}">
                    <input type="checkbox" v-model:cheked="item.checked"/>
                    <span class="screen_shot">
                <a href="#" @click="click_row_folder(item.id)" @dblclick="dblclick(item.id)"
                   @contextmenu="onRightClick($event,item.id, 'folder')"><img
                  src="@/assets/images/sub/preview_ft_folder.png" alt="" class="none_photo"/></a>

                      <!-- 미리보기 있을 때 -->
                      <!--                                <img v-bind:src="item.previewImgUrl" alt="" :class="{none_photo: !isPhoto(item.type), photo: isPhoto(item.type)}"/>-->
                            </span>
                    <span class="file_name">
                <a href="#" @click="click_row_folder(item.id)" @dblclick="dblclick(item.id)"
                   @contextmenu="onRightClick($event,  item.id, 'folder')">{{ item.dir_name }}</a>
              </span>
                  </label>
                </li>
                <li v-if="fileList.length >0" v-for="item in fileList" :key="item.id">
                  <label :class="{on: item.on}">
                    <input type="checkbox" v-model:cheked="item.checked"/>
                    <span class="screen_shot">
                         <a href="#" @click="click_row_folder(item.id)" @dblclick="dblclick(item.id)"
                            @contextmenu="onRightClick($event,item.id, 'file')">
                           <img src="@/assets/images/sub/preview_ft_word.png" class="none_photo"
                                v-if="item.ext == '.docs' || item.ext == '.doc' "/>
                           <img src="@/assets/images/sub/preview_ft_pdf.png" class="none_photo"
                                v-else-if="item.ext == '.pdf'"/>
                           <img src="@/assets/images/sub/preview_ft_pp.png" class="none_photo"
                                v-else-if="item.ext == '.pptx' || item.ext == '.ppt'"/>
                           <img src="@/assets/images/sub/preview_ft_excel.png" class="none_photo"
                                v-else-if="item.ext == '.xlsx' || item.ext == '.xls' "/>
                           <img src="@/assets/images/sub/preview_ft_photo.png" class="none_photo"
                                v-else-if="item.type == 'image' "/>
                           <img src="@/assets/images/sub/preview_ft_music.png" class="none_photo"
                                v-else-if="item.type == 'audio' "/>
                           <img src="@/assets/images/sub/preview_ft_video.png" class="file_type"
                                v-else-if="item.type == 'video' "/>
                           <img src="@/assets/images/sub/preview_ft_etc.png" class="none_photo" v-else/>
                         </a>

                      <!-- 미리보기 있을 때 -->
                      <!--                                <img v-bind:src="item.previewImgUrl" alt="" :class="{none_photo: !isPhoto(item.type), photo: isPhoto(item.type)}"/>-->
                            </span>
                    <span class="file_name">
                <a href="#" @click="click_row_folder(item.id)" @dblclick="dblclick(item.id)"
                   @contextmenu="onRightClick($event,item.id, 'file')">{{ item.file_name }}</a>
              </span>
                  </label>
                </li>

                <li v-if="folderList.length ==0 && fileList.length ==0">

                  <div id="empty" style="height: 300px">
                    <img src="@/assets/images/component/ico_admin_empty.png" alt="" class="ico"/>
                    <p>결과가 없습니다.</p>
                  </div>

                </li>

              </ul>
            </drag-select-container>

            <input type="hidden" id="page" value="2">

          </div>

          <!-- 썸네일 End -->

          <div class="menu_layer">
            <ul>
              <!--              <li @click.stop="clickBtnDetail(selected_id, detail_info_flg)"><a href="#">상세보기</a>-->
              <!--              </li>-->
              <li v-if="detail_info_flg =='file'"><a href="#" @click.stop="clickBtnPreview">미리보기</a></li>
              <li v-if="detail_info_flg =='file'"><a href="#" @click.stop="clickBtnCloud">클라우드 드라이브 복사</a></li>
              <li><a href="#">콜드 스토리지로 이동</a></li>
              <li v-if="favorite_flag !== 'Y'"><a href="#" @click.stop="clickBtnFavoriteAdd">즐겨찾기 등록</a></li>
              <li v-else><a href="#" @click.stop="clickBtnFavoriteDel">즐겨찾기 해제</a></li>
              <li><a href="#">태그 추가</a></li>
              <li v-if="detail_info_flg =='file'"><a href="#" @click.stop="clickBtnVersion">버전 표시</a></li>
              <li><a href="#">삭제</a></li>
            </ul>
          </div>

        </div>
      </div>

      <!-- 즐겨찾기 추가 -->
      <div class="layer_popup" id="favorite_popup_add">
        <h3>즐겨찾기 등록</h3>
        <div class="msg success">
          <h4><img src="@/assets/images/component/ico_bookMark_success.png" alt="즐겨찾기 등록"/></h4>
          <p>
            <strong>항목이 즐겨찾기에 추가되었습니다.</strong>
          </p>
        </div>
        <div class="btn_set">
          <button type="button" class="btn_basic submit" @click="btn_favorite_add_close">확인</button>
        </div>
        <button class="btn_close" @click="btn_favorite_add_close"><img
          src="@/assets/images/component/btn_popup_close.png" alt="닫기"/></button>
      </div>


      <!-- 즐겨찾기 삭제 -->
      <div class="layer_popup" id="favorite_popup_del">
        <h3>즐겨찾기 삭제</h3>
        <div class="msg warning">
          <h4><img src="@/assets/images/component/ico_bookMark_del.png" alt="즐겨찾기 삭제"/></h4>
          <p>
            <strong>항목이 즐겨찾기에서 제거되었습니다.</strong>
          </p>
        </div>

        <div class="btn_set">
          <button type="button" class="btn_basic submit" @click="btn_favorite_del_close">확인</button>
        </div>
        <button class="btn_close" @click="btn_favorite_del_close"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기"/></button>
      </div>

      <!-- 클라우드 드라이브에 복사 -->
      <div class="layer_popup" id="cloud_popup">
        <h3>클라우드 드라이브에 복사</h3>
        <ul class="cloud_copy_info">
          <li>
            <span class="category">파일</span>
            <span class="field">
				<strong>{{ cloud_data.file_name }}</strong>
			</span>
          </li>
          <li>
            <span class="category">저장소</span>
            <span class="field">
				<a href="#"><img src="@/assets/images/sub/ico_cci_cloud.png" alt="" class="ico_cloud"/>클라우드 드라이브</a> &gt; <a
              href="#">생성된 폴더명</a> &gt; <a href="#">생성된 폴더명2</a>
			</span>
          </li>
        </ul>
        <div class="cloud_files">
          <div class="cf_edit">
            <!-- 폴더 선택시 백버튼만 노출, '대상폴더' 히든 -->
            <button type="button" class="btn_back"><img src="@/assets/images/sub/btn_cf_back.png" alt="뒤로"/></button>
            <span class="cf_list_title">대상폴더</span>
            <button type="button" class="btn_new_folder" @click="cloud_new_folder"><img
              src="@/assets/images/sub/btn_cf_new_folder.png"
              alt="새 폴더"/>
            </button>
          </div>
          <div class="cf_list">
            <ul>
              <li><a href="#"><img src="@/assets/images/sub/ico_ft_folder.png" alt=""
                                   class="ico"/>생성된 폴더명1.jpg</a></li>
            </ul>
          </div>
        </div>
        <div class="btn_set">
          <div class="right">
            <button type="button" class="btn_basic cancel" @click="cloud_popup_close">취소</button>
            <button type="button" class="btn_basic submit">파일복사</button>
          </div>
        </div>
        <button class="btn_close" @click="cloud_popup_close"><img src="@/assets/images/component/btn_popup_close.png"
                                                                  alt="닫기"/></button>
      </div>

      <!-- 클라우드 드라이브에 복사 - 새 폴더 -->
      <div class="layer_popup" id="cloud_popup_new_folder">
        <h3>새 폴더</h3>
        <fieldset class="write_form">
          <legend>새 폴더</legend>
          <p>
			<span class="field">
				<input type="text" placeholder="폴더명 입력"/>
			</span>
          </p>
        </fieldset>

        <div class="btn_set">
          <div class="right">
            <button type="button" class="btn_basic cancel" @click="new_folder_close">취소</button>
            <button type="button" class="btn_basic submit">확인</button>
          </div>
        </div>
        <button class="btn_close" @click="new_folder_close"><img src="@/assets/images/component/btn_popup_close.png"
                                                                 alt="닫기"/></button>
      </div>


      <!-- 상세정보  Start -->
      <DetailInfo :visible="currentInfo.isActive" :currentTab="currentInfo.currentTab"
                  :file_name="currentInfo.file_name"
                  :detail_info="detail_info" :version_info="version_info" :detail_info_flg="detail_info_flg"/>
      <!-- 상세정보 End -->

      <!-- 미리보기 Start -->
      <!--    <fullscreen :fullscreen.sync="fullscreen" ref="fullscreen">-->

      <!--      <Preview></Preview>-->

      <!--    </fullscreen>-->


      <!-- 미리보기 End -->


    </article>
  </div>
</template>

<script>

  import {contentMixin} from '../../common/contentMixin'

  import DetailInfo from '../../components/connected_device/detail_info.vue'
  import Preview from '../../components/connected_device/preview.vue'
  import $ from "jquery";

  import DragSelect from "vue-drag-select";

  import {EventBus} from "../../plugins/event-bus.js"


  export default {
    components: {
      DetailInfo,
      Preview,
      "drag-select-container": DragSelect
    },
    mixins: [contentMixin],
    data() {
      return {
        contextAuth: [],
        firstList: '',
        templateType: 'list',
        showDeletedFile: false,
        /* 상세정보창 관련 */
        currentInfo: {
          id: '',                 // 현재 표시되는 정보의 id
          isActive: false,        // 활성화 여부
          currentTab: 'detail'    // 현재 탭
        },
        detail_info: {},
        version_info: {},
        category_tab: 'default',
        parent_folder: [],
        busy: false,
        limit: 10,
        list: [],
        selected_id: '',
        detail_info_flg: '',
        item: true,
        timer: null,
        parent_id: '',
        /* 상세정보창 관련 */
        previewInfo: {
          id: '',                 // 현재 표시되는 정보의 id
          isActive: false,     // 활성화 여부
          file_name: ''
        },
        cloud_data: {},
        file_list: {},
        item_idx: 0,
        favorite_flag: ''


      }
    },
    computed: {
      folderList() {
        return this.$store.state.connected_device.folders
      },
      fileList() {
        return this.$store.state.connected_device.files
      },
      folder_path() {
        return this.$store.state.connected_device.folder_path;
      },
      folder_id() {
        return this.$store.state.connected_device.folder_id;
      },
      current_page() {
        return this.$store.state.connected_device.current_page;
      },
      next_page() {
        return this.$store.state.connected_device.next_page;
      },
      last_page() {
        return this.$store.state.connected_device.last_page;
      },
      has_next() {
        return this.$store.state.connected_device.has_next;
      },
      info() {
        return this.folderList.getObjectById('id', this.currentInfo.id);
      },
      checkedAll: {
        get() {
          let count = 0;
          for (let i = 0; i < this.folderList.length; i++) {
            if (this.folderList[i].checked) count++;
          }
          return this.folderList.length === count;
        },
        set(val) {
          if (val)
            this.folderList.setAllObjProp('checked', true);
          else
            this.folderList.setAllObjProp('checked', false);
        }
      },


      fileSelected() {
        return this.folderList.countObjProp('checked', true) > 0;
      }
    },
    methods: {
      // 카테고리별 항목 가져오기
      get_category(keyword) {
        this.currentInfo.isActive = false;
        //  active tab 설정
        if (keyword == "all") {
          this.category_tab = 'all'
        } else if (keyword == 'document') {
          this.category_tab = 'document'
        } else if (keyword == 'image') {
          this.category_tab = 'image'
        } else if (keyword == 'video') {
          this.category_tab = 'video'
        } else if (keyword == 'audio') {
          this.category_tab = 'audio'
        } else if (keyword == 'ocr') {
          this.category_tab = 'ocr'
        } else if (keyword == 'etc') {
          this.category_tab = 'etc'
        } else if (keyword == 'folder') {
          this.category_tab = 'folder'
        }

        let data = [];

        // 파일리스트 초기화
        this.$store.commit('connected_device/reset_file', data);
        document.querySelector('#page').value = 2;

        let page = 1;
        this.$store.dispatch("connected_device/getFileByCategory", {
          storage_id: this.$store.state.connected_device.storage_id,
          category: this.category_tab,
          page: page
        })
      },
      getClasses(item, selectedItems) {

        console.log("item", item)
        console.log("selectedItems", selectedItems)

        const isActive = !!selectedItems.find(selectedItem => {
          return parseInt(selectedItem.dataset.item, 10) === item;
        });


      },
      onRightClick(e, item, flg) {

        // 기본으로 정의된 이벤트를 작동하지 못하게 하는 메서드
        e.preventDefault();
        this.detail_info_flg = flg;
        this.selected_id = item;
        let detailInfo = true;

        // todo 권한에 따른 메뉴 표시
        this.contextAuth = {
          detailInfo: detailInfo,
        };
        this.onContextMenu(e, this.contextAuth)

      },
      // 더블클릭 이벤트
      dblclick(item) {
        this.getFolderFile(item)
      },
      // 폴더 및 파일 정보 취득
      getFolderFile(folderId) {
        this.currentInfo.isActive = false;

        this.parent_folder = folderId;

        let page = parseInt(1);
        this.$store.dispatch("connected_device/getFolderFile", {
          item: folderId,
          page: page
        })
      },
      // 상위 정보 취득
      get_parent(parentId) {
        this.$store.commit('connected_device/delelte_folder_path', parentId);
        this.currentInfo.isActive = false;
        this.$store.dispatch("connected_device/getParent", {
          'parent_id': parentId
        })

      },
      /* 상단 다운로드 클릭 */
      clickBtnDownload() {

        const count = this.list.countObjProp('checked', true);

        alert(`${count}개가 선택되었습니다. 다운로드?`);

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

        alert(`${count}개가 선택되었습니다. 삭제?`);

        // TODO
        // 모달창 팝업 예정
      },

      /* 상단 새로고침 클릭 */
      refreshList() {
        this.list = JSON.parse(JSON.stringify(this.firstList));
      },

      /* row 클릭 */
      click_row_folder(item) {

        this.parent_id = item;
        this.category_tab = 'default';
        this.getFolderFile(item);
      },

      /* row 클릭 */
      click_row_file(item) {
        this.file_id = item.id;
        this.previewInfo.isActive = !this.previewInfo.isActive;
        this.item_idx = this.fileList.indexOf(item);
        EventBus.$emit('preview_open', this.item_idx);
      },

      /* row 하나에만 on */
      onlyOneOnToList(key) {

        this.list.setAllObjProp('on', false);
        this.list.getObjectById('id', key).on = true;
      },

      /* toggle row checked */
      toggleCheckedToList(key) {

        const item = this.list.getObjectById('id', key);
        item.checked = !item.checked;
      },

      /* 다운로드 클릭 */
      clickBtnDownloadOne(key) {

        this.onlyOneOnToList(key);      // on
        this.currentInfo.id = key;      // detail 정보변경
        alert("다운로드?");

        // TODO
        // 모달창 팝업 예정
      },

      /* 공유 클릭 */
      clickBtnShareOne(key) {

        this.onlyOneOnToList(key);      // on
        this.currentInfo.id = key;      // detail 정보변경
        alert("공유?");

        // TODO
        // 모달창 팝업 예정
      },

      /* 상세보기 클릭 */
      clickBtnDetail(key, flg) {
        this.detail_info_flg = flg;
        this.currentInfo.id = key;
        if (!this.currentInfo.isActive)
          this.currentInfo.currentTab = 'detail';
        this.currentInfo.isActive = true;
        if (this.detail_info_flg == 'folder') {
          this.detail_info = this.folderList.getObjectById('id', this.currentInfo.id);

        } else {
          this.detail_info = this.fileList.getObjectById('id', this.currentInfo.id);
          // 파일 버전 정보 취득
          var qs = require('qs');
          axios.post('/connected_device/version',
            qs.stringify({
              id: this.currentInfo.id
            })
          ).then(response => {
            this.version_info = response.data.data.data.versionList;
          });
        }
      },
      clickBtnEtc(e, key, flg) {

        this.onlyOneOnToList(key);      // on
        this.currentInfo.id = key;      // detail 정보변경
        this.detail_info_flg = flg;
        let item = this.fileList.getObjectById('id', this.currentInfo.id);
        this.favorite_flag = item['favorite_flag'];
        let posX = e.clientX - 150;
        let posY = e.clientY;
        let contextMenu = $(".menu_layer");

        contextMenu.css({
          "display": "block",
          "position": "fixed",
          "top": posY + "px",
          "left": posX + "px",
          "z-index": 3
        });

        $(contextMenu).mouseleave(function (e) {
          contextMenu.hide();
        })
      },
      menu_layer_leave: function () {
        let contextMenu = $(".menu_layer");
        $(contextMenu).mouseleave(function (e) {
          contextMenu.hide();
        })
      },
      handleScroll: function () {
        let page = document.querySelector('#page').value;

        if (page > this.last_page) {
          return;
        }

        document.querySelector('#page').value = parseInt(page) + 1;

        if (this.category_tab == 'default') {
          this.callMoreList(page);
        } else {
          this.callMoreCategoryList(page);
        }

      },
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
      clickBtnVersion() {
        if (!this.currentInfo.isActive)
          this.currentInfo.currentTab = 'version';

      },
      clickBtnPreview() {
        let item = this.fileList.getObjectById('id', this.currentInfo.id);
        this.previewInfo.isActive = !this.previewInfo.isActive;
        this.item_idx = this.fileList.indexOf(item);
        EventBus.$emit('preview_open', this.item_idx);
      },
      dragStart(e) {


        console.log("drag", e)

      },
      clickBtnCloud() {

        console.log("clickBtnCloud", this.currentInfo.id)

        let cloud_popup = $("#cloud_popup");

        cloud_popup.css({
          "display": "block",
        });
        this.cloud_data = this.fileList.getObjectById('id', this.currentInfo.id);


      },
      cloud_popup_close() {
        let cloud_popup = $("#cloud_popup");
        cloud_popup.css({
          "display": "none",
        });


      },
      cloud_new_folder() {

        this.cloud_popup_close();
        let cloud_popup_new_folder = $("#cloud_popup_new_folder");
        cloud_popup_new_folder.css({
          "display": "block",
        });
      },
      new_folder_close() {

        this.clickBtnCloud();
        let cloud_popup_new_folder = $("#cloud_popup_new_folder");
        cloud_popup_new_folder.css({
          "display": "none",
        });

      },
      clickBtnFavoriteAdd() {
        var qs = require('qs');
        axios.post('/connected_device/favorite',
          qs.stringify({
            id: this.currentInfo.id
          })
        ).then(response => {
          if (response.status === 200) {
            let cloud_popup_new_folder = $("#favorite_popup_add");
            cloud_popup_new_folder.css({
              "display": "block",
            });
            //  플래그 업데이트 하기
            this.$store.commit('connected_device/update_favorite_flg', response.data)
          }
        });
      },
      btn_favorite_add_close() {
        let cloud_popup_new_folder = $("#favorite_popup_add");
        cloud_popup_new_folder.css({
          "display": "none",
        });

      },
      clickBtnFavoriteDel() {
        var qs = require('qs');
        axios.post('/connected_device/favorite-del',
          qs.stringify({
            id: this.currentInfo.id
          })
        ).then(response => {
          if (response.status === 200) {
            let favorite_popup_del = $("#favorite_popup_del");
            favorite_popup_del.css({
              "display": "block",
            });
            //  플래그 업데이트 하기
            this.$store.commit('connected_device/update_favorite_flg_del', response.data)
          }
        });
      },
      btn_favorite_del_close() {
        let favorite_popup_del = $("#favorite_popup_del");
        favorite_popup_del.css({
          "display": "none",
        });
      },


        // clickFile() {
        //   // this.$refs['fullscreen'].toggle() // recommended
        //   this.fullscreen = !this.fullscreen // deprecated
        // },
        // fullscreenChange(fullscreen) {
        //   this.fullscreen = fullscreen
        // }


      },
      created() {
        EventBus.$on('update_visible', () => {
          this.currentInfo.isActive = false;
          this.previewInfo.isActive = false;

        });
      },
      mounted() {
        let vm = this;
        jQuery("article#contents.sub .content").mCustomScrollbar({
          theme: "minimal-dark",
          callbacks: {
            // onTotalScroll: function () {
            //   vm.handleScroll(this)
            // },
            onTotalScroll: function () {
              var pct = this.mcs.topPct;
              if (pct > 80) {
                console.log("pct======", pct)
                vm.handleScroll()
              }
            },
            alwaysTriggerOffsets: false
          }
        });
        jQuery(".layer_popup .cloud_files .cf_list").mCustomScrollbar({
          theme: "minimal-dark"
        });


        // $(document).ready(function ($) {
        //   jQuery("nav#gnb").mCustomScrollbar({
        //     theme: "minimal-dark"
        //   });
        //
        //   jQuery(".file_folder_info .ffi_cont").mCustomScrollbar({
        //     theme: "minimal-dark"
        //   });
        //   //셀렉트박스 UI
        //   jQuery(".selectbox_ui").each(function () {
        //     initSelectBox(jQuery(this)) //비동기로 셀렉트 박스를 만들었을 경우 initSelectBox(jQuery("#아이디")) 로 실행시켜줘야 함
        //   });
        // });


      },


    }
</script>

<style>
  #empty {
    width: 100%;
    padding: 60px 0px 0px 400px;
    text-align: center;
  }

  .img {
    max-width: 100%;
    border: 0px;
    vertical-align: middle;
  }

  /* Custom styling */
  .item {
    display: inline-flex;
    min-width: 80px;
    height: 100px;
    margin-right: 10px;
    margin-bottom: 10px;
    background-color: #ddd;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: 10px;
  }

  .item.active {
    background-color: rgb(0, 162, 255);
    color: #fff;
  }

  .scrollbar {
    height: 200px;
    overflow: auto;
  }

</style>

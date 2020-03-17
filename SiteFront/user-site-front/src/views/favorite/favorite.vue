<!--    메인 표시되는 화면은 폴더명 == 파일명으로 사용바랍니다.            -->

<template>
  <article id="contents" class="sub">
    <location/>

    <div class="content">
      <div class="file_folder_list">
        <div class="board_search_edit">
          <div class="btn_edit left">
            <!-- 썸네일 보기에만 전체선택 체크박스 노출 -->
            <span class="check_all">
							<input type="checkbox" title="전체선택">
						</span>
            <span class="basic_select selectbox_ui">
							<b class="selected_txt">카테고리</b>
							<select id="">
								<option value="">카테고리</option>
							</select>
						</span>
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
              <img src="@/assets/images/sub/btn_affe_list.png" alt="리스트형태" title="리스트형태"/>
            </button>
            <button type="button" @click="templateType='thumbnail'" v-show="templateType === 'list'">
              <img src="@/assets/images/component/btn_edit_thumbnail.png" alt="썸네일형태" title="썸네일형태"/>
            </button>
            <button type="button" @click="showDeletedFile = !showDeletedFile" v-show="!showDeletedFile">
              <img src="@/assets/images/component/btn_edit_delete_show.png" alt="삭제된 파일 표시" title="삭제된 파일 표시"/>
            </button>
            <button type="button" @click="showDeletedFile = !showDeletedFile" v-show="showDeletedFile">
              <img src="@/assets/images/component/btn_edit_delete_hide.png" alt="삭제된 파일 감추기" title="삭제된 파일 감추기"/>
            </button>
            <button type="button" @click="refreshList">
              <img src="@/assets/images/component/btn_edit_reload.png" alt="새로고침" title="새로고침"/>
            </button>
            <button type="button" v-show="fileSelected" @click="clickBtnDownload">
              <img src="@/assets/images/component/btn_edit_download.png" alt="다운로드" title="다운로드" class="ico"/>
            </button>
            <button type="button" v-show="fileSelected" @click="clickBtnShare">
              <img src="@/assets/images/component/btn_edit_share.png" alt="공유" title="공유" class="ico"/>
            </button>
            <button type="button" v-show="fileSelected" @click="clickBtnDelete">
              <img src="@/assets/images/component/btn_edit_delete.png" alt="삭제" title="삭제" class="ico"/>
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
            <th scope="col"><input type="checkbox" title="전체선택" v-model="checkedAll"/></th>
            <th scope="col"><a href="javascript:void(0)" class="sorting">이름</a></th>
            <th scope="col"><a href="javascript:void(0)" class="sorting on">오너</a></th>
            <th scope="col"><a href="javascript:void(0)" class="sorting">변경일</a></th>
            <th scope="col">기타</th>
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


        <!-- thumbnail -->
        <ul class="board_thumbnail" v-else-if="templateType == 'thumbnail'">
          <li v-for="item in list" :key="item.id">
            <label :class="{on: item.on}">
              <input type="checkbox" v-model:cheked="item.checked"/>
              <span class="screen_shot">
                                <img v-bind:src="item.previewImgUrl" alt="" class="none_photo"/>

                <!-- 미리보기 있을 때 -->
                <!--                                <img v-bind:src="item.previewImgUrl" alt="" :class="{none_photo: !isPhoto(item.type), photo: isPhoto(item.type)}"/>-->
                            </span>
              <span class="file_name">
                                <img v-bind:src="item.icoImgUrl" alt="" class="ico"/>{{ item.name }}
                            </span>
            </label>
          </li>
        </ul>
      </div>
    </div>
    <div class="file_folder_info none_category_navi" v-show="currentInfo.isActive" ref="file_folder_info">
      <ul class="ffi_navi">
        <li><a href="#" :class="{active: currentInfo.currentTab == 'detail'}"
               @click="currentInfo.currentTab = 'detail'">자세한사항</a></li>
        <li><a href="#" :class="{active: currentInfo.currentTab == 'version'}"
               @click="currentInfo.currentTab = 'version'">버전 표시</a></li>
      </ul>
      <div class="ffi_cont">
        <div class="ffi_detail" v-show="currentInfo.currentTab == 'detail'">
          <h3><img src="@/assets/images/sub/ico_ft_photo.png" alt="" class="ico"/>{{ info.name }}</h3>
          <!-- <h3><img src="@/assets/images/ico_ft_folder.png" alt="" />백업파일 123</h3>
          <h3><img src="@/assets/images/ico_ft_document.png" alt="" />백업파일 123.doc</h3>
          <h3><img src="@/assets/images/ico_ft_video.png" alt="" />백업파일 123.avi</h3>
          <h3><img src="@/assets/images/ico_ft_etc.png" alt="" />백업파일 123.dwg</h3> -->
          <div class="screen_shot">
            <img src="@/assets/images/sub/temp_photo2.png" alt="" class="photo"/>
            <!--<img src="@/assets/images/sub/preview_ft_folder.png" alt="" class="none_photo" />
            <img src="@/assets/images/sub/preview_ft_document.png" alt="" class="none_photo" />
            <img src="@/assets/images/sub/preview_ft_video.png" alt="" class="none_photo" />
            <img src="@/assets/images/sub/preview_ft_etc.png" alt="" class="none_photo" />-->
          </div>
          <ul class="menu">
            <li><a href="#"><img src="@/assets/images/sub/btn_ffi_download.png" alt="Download"/></a>
            </li>
            <li><a href="#"><img src="@/assets/images/sub/btn_ffi_share.png" alt="Share"/></a></li>
            <li><a href="#"><img src="@/assets/images/sub/btn_ffi_delete.png" alt="Delete"/></a></li>
          </ul>
          <ul class="info">
            <li><strong class="category">종류</strong><span class="field">기타</span></li>
            <li><strong class="category">사이즈</strong><span class="field">32.20KB</span></li>
            <li><strong class="category">장소</strong><span class="field">C:\Users\aoskorea\Desktopesktopesktopesktopesktopesktop</span>
            </li>
            <li><strong class="category">변경일</strong><span class="field">2019.4.10 오후 3:03:34</span>
            </li>
            <li><strong class="category">작성일</strong><span class="field">2019.4.10 오후 3:03:34</span>
            </li>
            <li><strong class="category">백업일</strong><span class="field">2019.4.10 오후 3:03:34</span>
            </li>
            <li><strong class="category">단말</strong><span class="field">DESKTOP-9HQEECE</span></li>
          </ul>
        </div>
        <div class="ffi_version" v-show="currentInfo.currentTab == 'version'">
          <h3 class="hidden_cont">버전표시</h3>
          <ul class="histroy">
            <li>
              <h4>9월 6일 오후 03:15:24</h4>
              <ul>
                <li>이름 : 08-23일.txt</li>
                <li>사이즈 : 1.28KB</li>
                <li>종류 : 일반적인 스토리지</li>
              </ul>
              <div class="menu">
                <button type="button"><img src="@/assets/images/sub/btn_ffi_download.png"
                                           alt="Download"/></button>
                <button type="button"><img src="@/assets/images/sub/btn_ffi_delete.png"
                                           alt="Delete"/></button>
              </div>
            </li>
            <li>
              <h4>9월 6일 오후 03:15:24</h4>
              <ul>
                <li>이름 : 08-23일.txt</li>
                <li>사이즈 : 1.28KB</li>
                <li>종류 : 일반적인 스토리지</li>
              </ul>
              <div class="menu">
                <button type="button"><img src="@/assets/images/sub/btn_ffi_download.png"
                                           alt="Download"/></button>
                <button type="button"><img src="@/assets/images/sub/btn_ffi_delete.png"
                                           alt="Delete"/></button>
              </div>
            </li>
            <li>
              <h4>9월 6일 오후 03:15:24</h4>
              <ul>
                <li>이름 : 08-23일.txt</li>
                <li>사이즈 : 1.28KB</li>
                <li>종류 : 일반적인 스토리지</li>
              </ul>
              <div class="menu">
                <button type="button"><img src="@/assets/images/sub/btn_ffi_download.png"
                                           alt="Download"/></button>
                <button type="button"><img src="@/assets/images/sub/btn_ffi_delete.png"
                                           alt="Delete"/></button>
              </div>
            </li>
            <li>
              <h4>9월 6일 이전 기록된 활동 없음</h4>
            </li>
          </ul>
        </div>
      </div>
      <button type="button" class="btn_close" @click="currentInfo.isActive = false">
        <img src="@/assets/images/component/btn_popup_close.png" alt="Close"/>
      </button>
    </div>

    <!-- 메시지 레이어 -->
    <div class="msg_layer">
      <img src="@/assets/images/component/bullet_msg_cancel.png" alt="" class="ico"/> 항목이 즐겨찾기에 삭제되었습니다.
      <button type="button" class="btn_close"><img src="@/assets/images/component/btn_msg_close.png" alt="Close"/>
      </button>
    </div>
    <div class="msg_layer">
      <img src="@/assets/images/component/bullet_msg_submit.png" alt="" class="ico"/> 항목이 즐겨찾기에 추가되었습니다.
      <button type="button" class="btn_close"><img src="@/assets/images/component/btn_msg_close.png" alt="Close"/>
      </button>
    </div>

    <!-- 메뉴 레이어(style top,left값을 마우스 위치에 맞게 넣어주어야 함) -->
    <div class="menu_layer">
      <ul>
        <li><a href="#">미리보기</a></li>
        <li><a href="#">클라우드 드라이브 복사</a></li>
        <li><a href="#">일반 스토리지로 이동</a></li>
        <!-- <li><a href="#">일반 스토리지로 이동 취소</a></li>
        <li><a href="#">콜드 스토리지로 이동</a></li>
        <li><a href="#">콜드 스토리지로 이동 취소</a></li> -->
        <li><a href="#">즐겨찾기 등록</a></li>
        <li><a href="#">태그 추가</a></li>
        <li><a href="#">버전 표시</a></li>
        <li><a href="#">삭제</a></li>
      </ul>
    </div>

    <!-- 태그 추가 또는 편집 -->
    <div class="layer_popup">
      <h3>태그 추가 또는 편집</h3>
      <p class="desc">
        Box Mobile Guide.pdf의 태그를 편집하는 중입니다.<br/>
        이 항목을 공동 작업한 사용자는 태그를 볼 수 있습니다.
      </p>
      <fieldset class="write_form">
        <legend>태그 추가 또는 편집</legend>
        <p>
          <span class="category"><label for="">태그</label></span>
          <span class="field tag_eidt">
                        <span class="keyword">
                            tag1
                            <button type="button" class="btn_delete"><img src="@/assets/images/sub/btn_tag_delete.png"
                                                                          alt="삭제"></button>
                        </span>
                        <span class="keyword">
                            tag1
                            <button type="button" class="btn_delete"><img src="@/assets/images/sub/btn_tag_delete.png"
                                                                          alt="삭제"></button>
                        </span>
                        <span class="keyword">
                            tag1
                            <button type="button" class="btn_delete"><img src="@/assets/images/sub/btn_tag_delete.png"
                                                                          alt="삭제"></button>
                        </span>
                        <span class="keyword">
                            tag1
                            <button type="button" class="btn_delete"><img src="@/assets/images/sub/btn_tag_delete.png"
                                                                          alt="삭제"></button>
                        </span>
                        <span class="keyword">
                            tag1
                            <button type="button" class="btn_delete"><img src="@/assets/images/sub/btn_tag_delete.png"
                                                                          alt="삭제"></button>
                        </span>
                        <input type="text" placeholder="태그입력"/>
                    </span>
        </p>
      </fieldset>
      <div class="btn_set">
        <div class="right">
          <button type="button" class="btn_basic">취소</button>
          <button type="button" class="btn_basic submit">완료</button>
        </div>
      </div>
      <button class="btn_close"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기"/></button>
    </div>

    <!-- 클라우드 드라이브에 복사 -->
    <div class="layer_popup">
      <h3>클라우드 드라이브에 복사</h3>
      <ul class="cloud_copy_info">
        <li>
          <span class="category">파일</span>
          <span class="field">
                        <strong>09-30.txt</strong>
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
          <button type="button" class="btn_new_folder"><img src="@/assets/images/sub/btn_cf_new_folder.png" alt="새 폴더"/>
          </button>
        </div>
        <div class="cf_list">
          <ul>
            <li><a href="#"><img src="@/assets/images/sub/ico_ft_folder.png" alt="" class="ico"/>생성된 폴더명1.jpg</a></li>
            <li><a href="#"><img src="@/assets/images/sub/ico_ft_photo.png" alt="" class="ico"/>생성된 이미지.doc</a></li>
            <li><a href="#"><img src="@/assets/images/sub/ico_ft_video.png" alt="" class="ico"/>생성된 비디오.mp4</a></li>
            <li><a href="#"><img src="@/assets/images/sub/ico_ft_document.png" alt="" class="ico"/>생성된 문서.doc</a></li>
            <li><a href="#"><img src="@/assets/images/sub/ico_ft_etc.png" alt="" class="ico"/>생성된 그 외.html</a></li>
            <li><a href="#"><img src="@/assets/images/sub/ico_ft_photo.png" alt="" class="ico"/>생성된 이미지.pdf</a></li>
            <li><a href="#"><img src="@/assets/images/sub/ico_ft_video.png" alt="" class="ico"/>생성된 비디오.mp3</a></li>
            <li><a href="#"><img src="@/assets/images/sub/ico_ft_document.png" alt="" class="ico"/>생성된 문서.png</a></li>
            <li><a href="#"><img src="@/assets/images/sub/ico_ft_etc.png" alt="" class="ico"/>생성된 그 외.gif</a></li>
          </ul>
        </div>
      </div>
      <div class="btn_set">
        <div class="right">
          <button type="button" class="btn_basic cancel">취소</button>
          <button type="button" class="btn_basic submit">파일복사</button>
        </div>
      </div>
      <button class="btn_close"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기"/></button>
    </div>

    <!-- 클라우드 드라이브에 복사 - 새 폴더 -->
    <div class="layer_popup">
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
          <button type="button" class="btn_basic cancel">취소</button>
          <button type="button" class="btn_basic submit">확인</button>
        </div>
      </div>
      <button class="btn_close"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기"/></button>
    </div>

    <!-- 공유 -->
    <div class="layer_popup user_mail_url">
      <h3>공유</h3>
      <ul class="lp_tab_navi">
        <li><a href="#userMailURL" class="active">사용자/메일 주소</a></li>
        <li><a href="#linkURL">링크 주소</a></li>
      </ul>
      <!-- 사용자/메일 주소 -->
      <div class="lp_tab_cont" id="userMailURL" style="display: block;">
        <fieldset class="write_form">
          <legend>사용자/메일 주소</legend>
          <p>
                        <span class="field tag_eidt">
                            <span class="keyword">
                                aoskorea@aoskorea.co.kr
                                <button type="button" class="btn_delete"><img
                                  src="@/assets/images/sub/btn_tag_delete.png" alt="삭제"></button>
                            </span>
                            <span class="keyword">
                                aoskorea@aoskorea.co.kr
                                <button type="button" class="btn_delete"><img
                                  src="@/assets/images/sub/btn_tag_delete.png" alt="삭제"></button>
                            </span>
                            <span class="keyword">
                                aoskorea@aoskorea.co.kr
                                <button type="button" class="btn_delete"><img
                                  src="@/assets/images/sub/btn_tag_delete.png" alt="삭제"></button>
                            </span>
                            <span class="keyword">
                                aoskorea@aoskorea.co.kr
                                <button type="button" class="btn_delete"><img
                                  src="@/assets/images/sub/btn_tag_delete.png" alt="삭제"></button>
                            </span>
                            <span class="keyword">
                                aoskorea@aoskorea.co.kr
                                <button type="button" class="btn_delete"><img
                                  src="@/assets/images/sub/btn_tag_delete.png" alt="삭제"></button>
                            </span>
                            <span class="keyword">
                                aoskorea@aoskorea.co.kr
                                <button type="button" class="btn_delete"><img
                                  src="@/assets/images/sub/btn_tag_delete.png" alt="삭제"></button>
                            </span>
                            <span class="keyword">
                                aoskorea@aoskorea.co.kr
                                <button type="button" class="btn_delete"><img
                                  src="@/assets/images/sub/btn_tag_delete.png" alt="삭제"></button>
                            </span>
                        </span>
            <span class="field">
                            <input type="text" placeholder="사용자/메일 주소" value="aoskorea@aoskorea.co.kr"/>
                        </span>
          </p>
        </fieldset>
      </div>

      <!-- 링크 주소 -->
      <div class="lp_tab_cont" id="linkURL">
        <fieldset class="write_form">
          <legend>링크 주소</legend>
          <p>
                        <span class="field input_btn">
                            <input type="text" placeholder="링크 주소"
                                   value="https://phoenix.incircle.jp/aos/appTicket.do?lang=ko_KR"/><button
                          type="button">복사</button>
                        </span>
          </p>
        </fieldset>
      </div>

      <!-- 공유 상세설정(감춰져있는 상세 설정영역) -->
      <div class="lp_detail_cont">
        <ul class="share_detail_setting">
          <li>
            <label for="sdsPw"><input type="checkbox"/>비밀번호 설정:</label>
            <input type="password" id="sdsPw"/>
          </li>
          <li><label><input type="checkbox"/>다운로드 알림</label></li>
          <li>
            <label for=""><input type="checkbox"/>유효기간 선택:</label>
            <span class="basic_datepicker"><input type="text"/><button type="button"><img
              src="@/assets/images/component/btn_calendar.png" alt="날짜선택"/></button></span>
          </li>
          <li><label><input type="checkbox"/>파일 다운로드 허용 안 함(표시만)</label></li>
        </ul>
      </div>
      <div class="btn_set">
        <div class="left">
          <button type="button" class="btn_detail">상세설정</button>
          <!--<button type="button" class="btn_detail">상세설정 숨기기</button>-->
        </div>
        <div class="right">
          <button type="button" class="btn_basic cancel">취소</button>
          <button type="button" class="btn_basic submit">공유</button>
        </div>
      </div>
      <button class="btn_close"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기"/></button>
    </div>


    <!-- 파일 다운로드 -->
    <div class="layer_popup">
      <h3>파일 다운로드</h3>
      <p class="desc">
        해당 파일을 저장하시겠습니까?
      </p>
      <ul class="file_download_info">
        <li><strong>AOS BOX ai Plus Download.zip</strong></li>
        <li>D:\= Project\08_AOSDataRoom\04_PSD\AOSVDR</li>
      </ul>
      <p class="check_info"><label><input type="checkbox"/>다음부터 물어보지 않기</label></p>
      <div class="btn_set">
        <div class="left">
          <button type="button" class="btn_basic cancel">취소</button>
        </div>
        <div class="right">
          <button type="button" class="btn_basic">다른 이름으로 저장</button>
          <button type="button" class="btn_basic">열기</button>
          <button type="button" class="btn_basic submit">공유</button>
        </div>
      </div>
      <button class="btn_close"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기"/></button>
    </div>

    <!-- 삭제 확인 -->
    <div class="layer_popup">
      <h3>삭제 확인</h3>
      <div class="msg warning">
        <h4><img src="@/assets/images/component/ico_lp_warning.png" alt="주의"/></h4>
        <p>
          <strong>선택한 항목을 삭제해도 되겠습니까?</strong><br/>
          파일 삭제의 완료까지 최대 15분 걸립니다.
        </p>
      </div>
      <div class="btn_set">
        <div class="right">
          <button type="button" class="btn_basic">취소</button>
          <button type="button" class="btn_basic submit">확인</button>
        </div>
      </div>
      <button class="btn_close"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기"/></button>
    </div>

    <!-- 모달 배경 -->
    <div class="modal_bg"></div>
  </article>
</template>

<script>

  import {contentMixin} from '../../common/contentMixin'


  export default {

    name: 'Share',
    mixins: [contentMixin],
    data() {
      return {
        list: [],   // ico_ft_folder.png, ico_ft_photo.png, ico_ft_document.png, ico_ft_video.png, ico_ft_etc.png
        firstList: '',
        templateType: 'list',
        showDeletedFile: false,
        /* 상세정보창 관련 */
        currentInfo: {
          id: '',                 // 현재 표시되는 정보의 id
          isActive: false,        // 활성화 여부
          currentTab: 'detail'    // 현재 탭
        },
      }
    },
    computed: {
      folderList() {
        return this.$store.state.favorite.folders
      },
      fileList() {
        return this.$store.state.favorite.files
      },
      folder_path() {
        return this.$store.state.favorite.folder_path;
      },

      info() {

        return this.list.getObjectById('id', this.currentInfo.id);
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
      fileSelected() {

        return this.list.countObjProp('checked', true) > 0;
      }
    },
    created() {
      // 등록된 즐겨찾기 정보 가져오기
      this.$store.dispatch("favorite/getFavoriteInfo", {})

    },
    mounted() {

      //클라우드 파일목록 스크롤
      jQuery("article#contents.sub .content").mCustomScrollbar({

        theme: "minimal-dark"
      });
    },
    methods: {

      isPhoto(type) {

        return type === 'photo';
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
      clickRow(key) {

        this.onlyOneOnToList(key);      // on
        this.currentInfo.id = key;      // detail 정보변경
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
      clickBtnDetail(key) {

        if (!this.currentInfo.isActive)
          this.currentInfo.currentTab = 'detail';

        this.currentInfo.isActive = this.currentInfo.id == key ? !this.currentInfo.isActive : true;

        this.onlyOneOnToList(key);      // on
        this.currentInfo.id = key;      // detail 정보변경
      },

      clickBtnEtc(key) {

        this.onlyOneOnToList(key);      // on
        this.currentInfo.id = key;      // detail 정보변경
        alert("컨텍스트 메뉴 표시 예정");
        // TODO
        // 컨텍스트 메뉴 표시 예정
        // 미리보기 / 클라우드 드라이브에 복사 / 즐겨찾기 등록 / 태그 추가 / 버전 표시 / 삭제
      }
    }
  }
</script>

<style>
</style>

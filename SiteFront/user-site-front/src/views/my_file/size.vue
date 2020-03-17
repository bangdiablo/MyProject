<!--    메인 표시되는 화면은 폴더명 == 파일명으로 사용바랍니다.            -->
<template>
    <article id="contents" class="sub">
        <location/>
        <ul class="category_navi">
            <li><a href="#" class="active">{{ $t("my_file.size.1mb_under") }} <img src="@/assets/images/sub/ico_cn_new.png" alt="신규"
                                                       class="new"/></a></li>
            <li><a href="#">1MB-5MB</a></li>
            <li><a href="#">5MB-100MB <img src="@/assets/images/sub/ico_cn_new.png" alt="신규" class="new"/></a></li>
            <li><a href="#">100MB-1GB</a></li>
            <li><a href="#">{{ $t("my_file.size.1gb_over") }}</a></li>
            <li><a href="#">{{ $t("my_file.size.option_size") }} <img src="@/assets/images/sub/ico_cn_new.png" alt="신규" class="new"/></a></li>
        </ul>
        <div class="content">
            <div class="file_folder_list">
                <div class="board_search_edit">
                    <div class="btn_edit left">
                        <button type="button"><img src="@/assets/images/sub/btn_affe_download.png" alt=""
                                                   class="ico"/><span class="txt">다운로드</span></button>
                        <button type="button"><img src="@/assets/images/sub/btn_affe_share.png" alt="" class="ico"/><span
                                class="txt">공유</span></button>
                        <button type="button"><img src="@/assets/images/sub/btn_affe_delete.png" alt=""
                                                   class="ico"/><span class="txt">삭제</span></button>
                    </div>
                    <div class="ico_btn_edit right">
                        <button type="button"><img src="@/assets/images/sub/btn_affe_list.png" alt="리스트형태"/>
                        </button>
                        <button type="button"><img src="@/assets/images/sub/btn_affe_thumbnail.png" alt="썸네일형태"/>
                        </button>
                        <button type="button"><img src="@/assets/images/sub/ico_affe_delete_show.png"
                                                   alt="삭제된 파일 표시"/></button>
                        <button type="button"><img src="@/assets/images/sub/ico_affe_delete_hide.png"
                                                   alt="삭제된 파일 감추기"/></button>
                        <button type="button"><img src="@/assets/images/sub/ico_affe_reload.png" alt="새로고침"/>
                        </button>
                    </div>
                </div>
                <table class="board_list">
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
                        <th scope="col"><input type="checkbox" title="전체선택"/></th>
                        <th scope="col"><a href="javascript:void(0)" class="sorting">이름</a></th>
                        <th scope="col"><a href="javascript:void(0)" class="sorting on">오너</a></th>
                        <th scope="col"><a href="javascript:void(0)" class="sorting">변경일</a></th>
                        <th scope="col">기타</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="on">
                        <td><input type="checkbox" title="선택"/></td>
                        <td class="left"><img src="@/assets/images/sub/ico_ft_folder.png" alt="폴더"
                                              class="file_type"/><a href="#">백업파일 113.pdf</a></td>
                        <td>Hongildong</td>
                        <td>2019.10.17</td>
                        <td class="item_edit">
                            <button type="button"><i class="download">다운로드</i></button>
                            <button type="button"><i class="share">공유</i></button>
                            <button type="button"><i class="detail">상세보기</i></button>
                            <button type="button"><i class="more">더 많은</i></button>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" title="선택"/></td>
                        <td class="left"><img src="@/assets/images/sub/ico_ft_folder.png" alt="폴더"
                                              class="file_type"/><a href="#">백업파일 113.pdf</a></td>
                        <td>Hongildong</td>
                        <td>2019.10.17</td>
                        <td class="item_edit">
                            <button type="button"><i class="download">다운로드</i></button>
                            <button type="button"><i class="share">공유</i></button>
                            <button type="button"><i class="detail">상세보기</i></button>
                            <button type="button"><i class="more">더 많은</i></button>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" title="선택"/></td>
                        <td class="left"><img src="@/assets/images/sub/ico_ft_photo.png" alt="사진"
                                              class="file_type"/><a href="#">백업파일 113.pdf</a></td>
                        <td>Hongildong</td>
                        <td>2019.10.17</td>
                        <td class="item_edit">
                            <button type="button"><i class="download">다운로드</i></button>
                            <button type="button"><i class="share">공유</i></button>
                            <button type="button"><i class="detail">상세보기</i></button>
                            <button type="button"><i class="more">더 많은</i></button>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" title="선택"/></td>
                        <td class="left"><img src="@/assets/images/sub/ico_ft_document.png" alt="문서"
                                              class="file_type"/><a href="#">백업파일 113.pdf</a></td>
                        <td>Hongildong</td>
                        <td>2019.10.17</td>
                        <td class="item_edit">
                            <button type="button"><i class="download">다운로드</i></button>
                            <button type="button"><i class="share">공유</i></button>
                            <button type="button"><i class="detail">상세보기</i></button>
                            <button type="button"><i class="more">더 많은</i></button>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" title="선택"/></td>
                        <td class="left"><img src="@/assets/images/sub/ico_ft_video.png" alt="비디오"
                                              class="file_type"/><a href="#">백업파일 113.pdf</a></td>
                        <td>Hongildong</td>
                        <td>2019.10.17</td>
                        <td class="item_edit">
                            <button type="button"><i class="download">다운로드</i></button>
                            <button type="button"><i class="share">공유</i></button>
                            <button type="button"><i class="detail">상세보기</i></button>
                            <button type="button"><i class="more">더 많은</i></button>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" title="선택"/></td>
                        <td class="left"><img src="@/assets/images/sub/ico_ft_etc.png" alt="기타"
                                              class="file_type"/><a href="#">백업파일 113.pdf</a></td>
                        <td>Hongildong</td>
                        <td>2019.10.17</td>
                        <td class="item_edit">
                            <button type="button"><i class="download">다운로드</i></button>
                            <button type="button"><i class="share">공유</i></button>
                            <button type="button"><i class="detail">상세보기</i></button>
                            <button type="button"><i class="more">더 많은</i></button>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" title="선택"/></td>
                        <td class="left"><img src="@/assets/images/sub/ico_ft_etc.png" alt="기타"
                                              class="file_type"/><a href="#">백업파일 113.pdf</a></td>
                        <td>Hongildong</td>
                        <td>2019.10.17</td>
                        <td class="item_edit">
                            <button type="button"><i class="download">다운로드</i></button>
                            <button type="button"><i class="share">공유</i></button>
                            <button type="button"><i class="detail">상세보기</i></button>
                            <button type="button"><i class="more">더 많은</i></button>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" title="선택"/></td>
                        <td class="left"><img src="@/assets/images/sub/ico_ft_etc.png" alt="기타"
                                              class="file_type"/><a href="#">백업파일 113.pdf</a></td>
                        <td>Hongildong</td>
                        <td>2019.10.17</td>
                        <td class="item_edit">
                            <button type="button"><i class="download">다운로드</i></button>
                            <button type="button"><i class="share">공유</i></button>
                            <button type="button"><i class="detail">상세보기</i></button>
                            <button type="button"><i class="more">더 많은</i></button>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" title="선택"/></td>
                        <td class="left"><img src="@/assets/images/sub/ico_ft_etc.png" alt="기타"
                                              class="file_type"/><a href="#">백업파일 113.pdf</a></td>
                        <td>Hongildong</td>
                        <td>2019.10.17</td>
                        <td class="item_edit">
                            <button type="button"><i class="download">다운로드</i></button>
                            <button type="button"><i class="share">공유</i></button>
                            <button type="button"><i class="detail">상세보기</i></button>
                            <button type="button"><i class="more">더 많은</i></button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <ul class="board_thumbnail" style="display:none">
                    <li>
                        <label class="on">
                            <input type="checkbox" checked="checked"/>
                            <span class="screen_shot">
                            <img src="@/assets/images/sub/preview_ft_folder.png" alt="" class="none_photo"/>
                        </span>
                            <span class="file_name">
                            <img src="@/assets/images/sub/ico_ft_folder.png" alt="" class="ico"/>폴더
                        </span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox"/>
                            <span class="screen_shot">
                            <img src="@/assets/images/sub/temp_photo1.png" alt="" class="photo"/>
                        </span>
                            <span class="file_name">
                            <img src="@/assets/images/sub/ico_ft_photo.png" alt="" class="ico"/>백업파일 123.png
                        </span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox"/>
                            <span class="screen_shot">
                            <img src="@/assets/images/sub/temp_photo2.png" alt="" class="photo"/>
                        </span>
                            <span class="file_name">
                            <img src="@/assets/images/sub/ico_ft_photo.png" alt="" class="ico"/>백업파일 123.png
                        </span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox"/>
                            <span class="screen_shot">
                            <img src="@/assets/images/sub/preview_ft_document.png" alt="" class="none_photo"/>
                                <!-- //스크린샷 없을 경우 -->
                        </span>
                            <span class="file_name">
                            <img src="@/assets/images/sub/ico_ft_document.png" alt="" class="ico"/>백업파일 123.pdf
                        </span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox"/>
                            <span class="screen_shot">
                            <img src="@/assets/images/sub/preview_ft_photo.png" alt="" class="none_photo"/>
                                <!-- //스크린샷 없을 경우 -->
                        </span>
                            <span class="file_name">
                            <img src="@/assets/images/sub/ico_ft_photo.png" alt="" class="ico"/>백업파일 123.pdf
                        </span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox"/>
                            <span class="screen_shot">
                            <img src="@/assets/images/sub/preview_ft_video.png" alt="" class="none_photo"/>
                                <!-- //스크린샷 없을 경우 -->
                        </span>
                            <span class="file_name">
                            <img src="@/assets/images/sub/ico_ft_video.png" alt="" class="ico"/>백업파일 123.pdf
                        </span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox"/>
                            <span class="screen_shot">
                            <img src="@/assets/images/sub/preview_ft_etc.png" alt="" class="none_photo"/>
                                <!-- //스크린샷 없을 경우 -->
                        </span>
                            <span class="file_name">
                            <img src="@/assets/images/sub/ico_ft_etc.png" alt="" class="ico"/>백업파일 123.pdf
                        </span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox"/>
                            <span class="screen_shot">
                            <img src="@/assets/images/sub/temp_photo2.png" alt="" class="photo"/>
                        </span>
                            <span class="file_name">
                            <img src="@/assets/images/sub/ico_ft_photo.png" alt="" class="ico"/>백업파일 123.png
                        </span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox"/>
                            <span class="screen_shot">
                            <img src="@/assets/images/sub/preview_ft_document.png" alt="" class="none_photo"/>
                                <!-- //스크린샷 없을 경우 -->
                        </span>
                            <span class="file_name">
                            <img src="@/assets/images/sub/ico_ft_document.png" alt="" class="ico"/>백업파일 123.pdf
                        </span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox"/>
                            <span class="screen_shot">
                            <img src="@/assets/images/sub/preview_ft_photo.png" alt="" class="none_photo"/>
                                <!-- //스크린샷 없을 경우 -->
                        </span>
                            <span class="file_name">
                            <img src="@/assets/images/sub/ico_ft_photo.png" alt="" class="ico"/>백업파일 123.pdf
                        </span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox"/>
                            <span class="screen_shot">
                            <img src="@/assets/images/sub/preview_ft_video.png" alt="" class="none_photo"/>
                                <!-- //스크린샷 없을 경우 -->
                        </span>
                            <span class="file_name">
                            <img src="@/assets/images/sub/ico_ft_video.png" alt="" class="ico"/>백업파일 123.pdf
                        </span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox"/>
                            <span class="screen_shot">
                            <img src="@/assets/images/sub/preview_ft_etc.png" alt="" class="none_photo"/>
                                <!-- //스크린샷 없을 경우 -->
                        </span>
                            <span class="file_name">
                            <img src="@/assets/images/sub/ico_ft_etc.png" alt="" class="ico"/>백업파일 123.pdf
                        </span>
                        </label>
                    </li>
                </ul>
                <div class="page_navi">
                    <a href="#" class="guide prev"><img src="@/assets/images/component/btn_page_prev.png" alt="Prev"
                                                        class="ico"></a>
                    <a href="#" class="num active">1</a>
                    <a href="#" class="num">2</a>
                    <a href="#" class="num">3</a>
                    <a href="#" class="num">4</a>
                    <a href="#" class="num">5</a>
                    <a href="#" class="guide next"><img src="@/assets/images/component/btn_page_next.png" alt="Next"
                                                        class="ico"></a>
                </div>
            </div>
        </div>
        <div class="file_folder_info">
            <ul class="ffi_navi">
                <li><a href="#" class="active">자세한사항</a></li>
                <li><a href="#">버전 표시</a></li>
            </ul>
            <div class="ffi_cont">
                <div class="ffi_detail" style="display:block">
                    <h3><img src="@/assets/images/sub/ico_ft_photo.png" alt="" class="ico"/>백업파일 123.jpg</h3>
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
                <div class="ffi_version">
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
            <button type="button" class="btn_close"><img src="@/assets/images/component/btn_popup_close.png"
                                                         alt="Close"/></button>
        </div>


        <!-- 메시지 레이어 -->
        <div class="msg_layer">
            <img src="@/assets/images/component/bullet_msg_cancel.png" alt="" class="ico" /> 항목이 즐겨찾기에 삭제되었습니다. <button type="button" class="btn_close"><img src="@/assets/images/component/btn_msg_close.png" alt="Close" /></button>
        </div>
        <div class="msg_layer">
            <img src="@/assets/images/component/bullet_msg_submit.png" alt="" class="ico" /> 항목이 즐겨찾기에 추가되었습니다. <button type="button" class="btn_close"><img src="@/assets/images/component/btn_msg_close.png" alt="Close" /></button>
        </div>

        <!-- 메뉴 레이어(style top,left값을 마우스 위치에 맞게 넣어주어야 함) -->
        <div class="menu_layer">
            <ul>
                <li><a href="#">미리보기</a></li>
                <li><a href="#">클라우드 드라이브 복사</a></li>
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
                Box Mobile Guide.pdf의 태그를 편집하는 중입니다.<br />
                이 항목을 공동 작업한 사용자는 태그를 볼 수 있습니다.
            </p>
            <fieldset class="write_form">
                <legend>태그 추가 또는 편집</legend>
                <p>
                    <span class="category"><label for="">태그</label></span>
                    <span class="field tag_eidt">
				<span class="keyword">
					tag1
					<button type="button" class="btn_delete"><img src="@/assets/images/sub/btn_tag_delete.png" alt="삭제"></button>
				</span>
				<span class="keyword">
					tag1
					<button type="button" class="btn_delete"><img src="@/assets/images/sub/btn_tag_delete.png" alt="삭제"></button>
				</span>
				<span class="keyword">
					tag1
					<button type="button" class="btn_delete"><img src="@/assets/images/sub/btn_tag_delete.png" alt="삭제"></button>
				</span>
				<span class="keyword">
					tag1
					<button type="button" class="btn_delete"><img src="@/assets/images/sub/btn_tag_delete.png" alt="삭제"></button>
				</span>
				<span class="keyword">
					tag1
					<button type="button" class="btn_delete"><img src="@/assets/images/sub/btn_tag_delete.png" alt="삭제"></button>
				</span>
				<input type="text" placeholder="태그입력" />
			</span>
                </p>
            </fieldset>
            <div class="btn_set">
                <div class="right">
                    <button type="button" class="btn_basic">취소</button>
                    <button type="button" class="btn_basic submit">완료</button>
                </div>
            </div>
            <button class="btn_close"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
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
				<a href="#"><img src="@/assets/images/sub/ico_cci_cloud.png" alt="" class="ico_cloud" />클라우드 드라이브</a> &gt; <a href="#">생성된 폴더명</a> &gt; <a href="#">생성된 폴더명2</a>
			</span>
                </li>
            </ul>
            <div class="cloud_files">
                <div class="cf_edit">
                    <button type="button" class="btn_back"><img src="@/assets/images/sub/btn_cf_back.png" alt="뒤로" /></button>
                    <button type="button" class="btn_new_folder"><img src="@/assets/images/sub/btn_cf_new_folder.png" alt="새 폴더" /></button>
                </div>
                <div class="cf_list">
                    <ul>
                        <li><a href="#"><img src="@/assets/images/sub/ico_ft_folder.png" alt="" class="ico" />생성된 폴더명1</a></li>
                        <li><a href="#"><img src="@/assets/images/sub/ico_ft_photo.png" alt="" class="ico" />생성된 이미지</a></li>
                        <li><a href="#"><img src="@/assets/images/sub/ico_ft_video.png" alt="" class="ico" />생성된 비디오</a></li>
                        <li><a href="#"><img src="@/assets/images/sub/ico_ft_document.png" alt="" class="ico" />생성된 문서</a></li>
                        <li><a href="#"><img src="@/assets/images/sub/ico_ft_etc.png" alt="" class="ico" />생성된 그 외</a></li>
                        <li><a href="#"><img src="@/assets/images/sub/ico_ft_photo.png" alt="" class="ico" />생성된 이미지</a></li>
                        <li><a href="#"><img src="@/assets/images/sub/ico_ft_video.png" alt="" class="ico" />생성된 비디오</a></li>
                        <li><a href="#"><img src="@/assets/images/sub/ico_ft_document.png" alt="" class="ico" />생성된 문서</a></li>
                        <li><a href="#"><img src="@/assets/images/sub/ico_ft_etc.png" alt="" class="ico" />생성된 그 외</a></li>
                    </ul>
                </div>
            </div>
<!--            <script>-->
<!--                //클라우드 파일목록 스크롤-->
<!--                jQuery(".layer_popup .cloud_files .cf_list").mCustomScrollbar({-->
<!--                    theme:"minimal-dark"-->
<!--                });-->
<!--            </script>-->
            <div class="btn_set">
                <div class="right">
                    <button type="button" class="btn_basic cancel">취소</button>
                    <button type="button" class="btn_basic submit">파일복사</button>
                </div>
            </div>
            <button class="btn_close"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
        </div>

        <!-- 클라우드 드라이브에 복사 - 새 폴더 -->
        <div class="layer_popup">
            <h3>새 폴더</h3>
            <fieldset class="write_form">
                <legend>새 폴더</legend>
                <p>
			<span class="field">
				<input type="text" placeholder="폴더명 입력" />
			</span>
                </p>
            </fieldset>

            <div class="btn_set">
                <div class="right">
                    <button type="button" class="btn_basic cancel">취소</button>
                    <button type="button" class="btn_basic submit">확인</button>
                </div>
            </div>
            <button class="btn_close"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
        </div>

        <!-- 공유 -->
        <div class="layer_popup">
            <h3>공유</h3>
            <ul class="lp_tab_navi">
                <li><a href="#userMailURL" class="active">사용자/메일 주소</a></li>
                <li><a href="#linkURL">링크 주소</a></li>
            </ul>
            <!-- 사용자/메일 주소 -->
            <div class="lp_tab_cont" id="userMailURL" style="display:block">
                <fieldset class="write_form">
                    <legend>사용자/메일 주소</legend>
                    <p>
				<span class="field">
					<input type="text" placeholder="사용자/메일 주소" value="aoskorea@aoskorea.co.kr" />
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
					<input type="text" placeholder="링크 주소" value="https://phoenix.incircle.jp/aos/appTicket.do?lang=ko_KR" /><button type="button">복사</button>
				</span>
                    </p>
                </fieldset>
            </div>

            <!-- 공유 상세설정(감춰져있는 상세 설정영역) -->
            <div class="lp_detail_cont">
                <ul class="share_detail_setting">
                    <li>
                        <label for="sdsPw"><input type="checkbox" />비밀번호 설정:</label>
                        <input type="password" id="sdsPw" />
                    </li>
                    <li><label><input type="checkbox" />다운로드 알림</label></li>
                    <li>
                        <label for=""><input type="checkbox" />유효기간 선택:</label>
                        <span class="basic_datepicker"><input type="text" /><button type="button"><img src="@/assets/images/component/btn_calendar.png" alt="날짜선택" /></button></span>
                    </li>
                    <li><label><input type="checkbox" />파일 다운로드 허용 안 함(표시만)</label></li>
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
            <button class="btn_close"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
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
            <p class="check_info"><label><input type="checkbox" />다음부터 물어보지 않기</label></p>
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
            <button class="btn_close"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
        </div>

        <!-- 삭제 확인 -->
        <div class="layer_popup">
            <h3>삭제 확인</h3>
            <div class="msg warning">
                <h4><img src="@/assets/images/component/ico_lp_warning.png" alt="주의" /></h4>
                <p>
                    <strong>선택한 항목을 삭제해도 되겠습니까?</strong><br />
                    파일 삭제의 완료까지 최대 15분 걸립니다.
                </p>
            </div>
            <div class="btn_set">
                <div class="right">
                    <button type="button" class="btn_basic">취소</button>
                    <button type="button" class="btn_basic submit">확인</button>
                </div>
            </div>
            <button class="btn_close"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
        </div>

        <!-- 임의 크기 범위 -->
        <div class="layer_popup">
            <h3>임의 크기 범위</h3>
            <fieldset class="range_form">
                <legend>임의 크기 범위</legend>
                <p>
                    <span class="category"><label for="minSize">시작</label></span>
                    <span class="field size">
				<input type="text" id="minSize" />
				<span class="basic_select selectbox_ui">
					<b class="selected_txt"></b>
					<select title="파일단위">
						<option value="">Byte</option>
						<option value="">KB</option>
						<option value="">MB</option>
						<option value="">GB</option>
					</select>
				</span>
			</span>
                </p>
                <p>
                    <span class="category"><label for="maxSize">종료</label></span>
                    <span class="field size">
				<input type="text" id="maxSize" />
				<span class="basic_select selectbox_ui">
					<b class="selected_txt"></b>
					<select title="파일단위">
						<option value="">Byte</option>
						<option value="">KB</option>
						<option value="">MB</option>
						<option value="">GB</option>
					</select>
				</span>
			</span>
                </p>
            </fieldset>
            <div class="btn_set">
                <div class="right">
                    <button type="button" class="btn_basic">취소</button>
                    <button type="button" class="btn_basic submit">확인</button>
                </div>
            </div>
            <button class="btn_close"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
        </div>

        <!-- 모달 배경 -->
        <div class="modal_bg"></div>
    </article>
</template>

<script>

    export default {

    }
</script>

<style>
</style>

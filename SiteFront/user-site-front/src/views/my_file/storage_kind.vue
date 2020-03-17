<!--    메인 표시되는 화면은 폴더명 == 파일명으로 사용바랍니다.            -->

<template>
    <article id="contents" class="sub">
        <location/>

        <ul class="category_navi">
            <li><a href="#" class="active">{{ $t("my_file.storage_kind_sub.normal_storage") }} <img src="@/assets/images/sub/ico_cn_new.png" alt="신규"
                                                        class="new"/></a></li>
            <li><a href="#">{{ $t("my_file.storage_kind_sub.cold_storage") }} <img src="@/assets/images/sub/ico_cn_new.png" alt="신규" class="new"/></a></li>
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
    </article>
</template>

<script>
    export default {

    }
</script>

<style>
</style>

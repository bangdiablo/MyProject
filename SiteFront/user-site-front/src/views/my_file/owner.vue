<!--    메인 표시되는 화면은 폴더명 == 파일명으로 사용바랍니다.            -->

<template>
 <article id="contents" class="sub">
        <location/>

        <div class="content">
            <div class="file_folder_list">
                <div class="board_search_edit">
                    <div class="btn_edit left">
                        <button type="button"><img src="@/assets/images/sub/btn_affe_download.png" alt=""
                                                   class="ico"/><span class="txt">{{ $t("my_file.download") }}</span></button>
                        <button type="button"><img src="@/assets/images/sub/btn_affe_share.png" alt=""
                                                   class="ico"/><span class="txt">{{ $t("my_file.share") }}</span></button>
                        <button type="button"><img src="@/assets/images/sub/btn_affe_delete.png" alt=""
                                                   class="ico"/><span class="txt">{{ $t("my_file.delete") }}</span></button>
                    </div>
                    <div class="ico_btn_edit right">
                        <button type="button"><img src="@/assets/images/sub/btn_affe_list.png" alt="리스트형태"/></button>
                        <button type="button"><img src="@/assets/images/sub/btn_affe_thumbnail.png" alt="썸네일형태"/>
                        </button>
                        <button type="button"><img src="@/assets/images/sub/ico_affe_delete_show.png"
                                                   alt="삭제된 파일 표시"/></button>
                        <button type="button"><img src="@/assets/images/sub/ico_affe_delete_hide.png"
                                                   alt="삭제된 파일 감추기"/></button>
                        <button type="button"><img src="@/assets/images/sub/ico_affe_reload.png" alt="새로고침"/></button>
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
                        <th scope="col"><input type="checkbox" :title="$t('my_file.border_list.total_select')"/></th>
                        <th scope="col"><a href="javascript:void(0)" class="sorting">{{ $t("my_file.border_list.name") }}</a></th>
                        <th scope="col"><a href="javascript:void(0)" class="sorting on">{{ $t("my_file.border_list.owner") }}</a></th>
                        <th scope="col"><a href="javascript:void(0)" class="sorting">{{ $t("my_file.border_list.change_day") }}</a></th>
                        <th scope="col">{{ $t("my_file.border_list.etc") }}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="on">
                        <td><input type="checkbox" title="선택"/></td>
                        <td class="left"><img src="@/assets/images/sub/ico_ft_folder.png" alt="폴더" class="file_type"/><a
                                href="#">백업파일 113.pdf</a></td>
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
                        <td class="left"><img src="@/assets/images/sub/ico_ft_folder.png" alt="폴더" class="file_type"/><a
                                href="#">백업파일 113.pdf</a></td>
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
                        <td class="left"><img src="@/assets/images/sub/ico_ft_video.png" alt="비디오" class="file_type"/><a
                                href="#">백업파일 113.pdf</a></td>
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
                        <td class="left"><img src="@/assets/images/sub/ico_ft_etc.png" alt="기타" class="file_type"/><a
                                href="#">백업파일 113.pdf</a></td>
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
                        <td class="left"><img src="@/assets/images/sub/ico_ft_etc.png" alt="기타" class="file_type"/><a
                                href="#">백업파일 113.pdf</a></td>
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
                        <td class="left"><img src="@/assets/images/sub/ico_ft_etc.png" alt="기타" class="file_type"/><a
                                href="#">백업파일 113.pdf</a></td>
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
                        <td class="left"><img src="@/assets/images/sub/ico_ft_etc.png" alt="기타" class="file_type"/><a
                                href="#">백업파일 113.pdf</a></td>
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
    </article>
</template>

<script>
    export default {

    }
</script>

<style>
</style>

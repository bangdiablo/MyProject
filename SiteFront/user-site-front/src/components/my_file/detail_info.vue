<!--    메인 표시되는 화면은 폴더명 == 파일명으로 사용바랍니다.            -->
<template>
    <div>
        <div class="file_folder_info" style="display:block">
            <ul class="ffi_navi">
                <li><a href="#" class="active">  {{ $t("my_file.detail_info.detail_info.title") }} </a></li>
                <li><a href="#">{{ $t("my_file.detail_info.version_info.title") }}</a></li>
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
                        <li><a href="#"><img src="@/assets/images/sub/btn_ffi_download.png" alt="Download"/></a></li>
                        <li><a href="#"><img src="@/assets/images/sub/btn_ffi_share.png" alt="Share"/></a></li>
                        <li><a href="#"><img src="@/assets/images/sub/btn_ffi_delete.png" alt="Delete"/></a></li>
                    </ul>
                    <ul class="info">
                        <li><strong class="category">{{ $t("my_file.detail_info.detail_info.file_type") }}</strong><span class="field">기타</span></li>
                        <li><strong class="category">{{ $t("my_file.detail_info.detail_info.file_size") }}</strong><span class="field">32.20KB</span></li>
                        <li><strong class="category">{{ $t("my_file.detail_info.detail_info.file_location") }}</strong><span class="field">C:\Users\aoskorea\Desktopesktopesktopesktopesktopesktop</span>
                        </li>
                        <li><strong class="category">{{ $t("my_file.detail_info.detail_info.file_change_date") }}</strong><span class="field">2019.4.10 오후 3:03:34</span>
                        </li>
                        <li><strong class="category">{{ $t("my_file.detail_info.detail_info.file_create_date") }}</strong><span class="field">2019.4.10 오후 3:03:34</span>
                        </li>
                        <li><strong class="category">{{ $t("my_file.detail_info.detail_info.file_backup_date") }}</strong><span class="field">2019.4.10 오후 3:03:34</span>
                        </li>
                        <li><strong class="category">{{ $t("my_file.detail_info.detail_info.file_device") }}</strong><span class="field">DESKTOP-9HQEECE</span></li>
                    </ul>
                </div>
                <div class="ffi_version">
                    <h3 class="hidden_cont">{{ $t("my_file.detail_info.version_info.title") }}</h3>
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
                                <button type="button"><img src="@/assets/images/sub/btn_ffi_delete.png" alt="Delete"/>
                                </button>
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
                                <button type="button"><img src="@/assets/images/sub/btn_ffi_delete.png" alt="Delete"/>
                                </button>
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
                                <button type="button"><img src="@/assets/images/sub/btn_ffi_delete.png" alt="Delete"/>
                                </button>
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
    </div>
</template>

<script>
</script>

<style>
</style>

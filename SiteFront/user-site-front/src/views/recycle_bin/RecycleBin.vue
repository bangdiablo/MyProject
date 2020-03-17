<!--    메인 표시되는 화면은 폴더명 == 파일명으로 사용바랍니다.            -->

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
                    </div>
                    <div class="ico_btn_edit right">
                        <button type="button" @click="templateType='list'" v-show="templateType === 'thumbnail'">
                            <img src="@/assets/images/sub/btn_affe_list.png" alt="리스트형태"/>
                        </button>
                        <button type="button" @click="templateType='thumbnail'" v-show="templateType === 'list'">
                            <img src="@/assets/images/sub/btn_affe_thumbnail.png" alt="썸네일형태"/>
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
                        <th scope="col"><input type="checkbox" title="전체선택" v-model="checkedAll"/></th>
                        <th scope="col"><a href="javascript:void(0)" class="sorting">이름</a></th>
                        <th scope="col"><a href="javascript:void(0)" class="sorting on">변경일</a></th>
                        <th scope="col"><a href="javascript:void(0)" class="sorting">사이즈</a></th>
                        <th scope="col">기타</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in list" @click="clickRow(item.id);toggleCheckedToList(item.id);" :key="item.id" :class="{on: item.on}">
                            <td>
                                <input type="checkbox" title="선택" v-model:cheked="item.checked" />
                            </td>
                            <td class="left">
                                <img v-bind:src="item.icoImgUrl" alt="폴더"class="file_type"/>
                                <a href="#">{{ item.name }}</a>
                            </td>
                            <td>{{ item.owner }}</td>
                            <td>{{ item.date }}</td>
                            <td class="item_edit">
                                <button type="button" @click.stop="clickBtnDownloadOne(item.id)"><i class="download">다운로드</i></button>
                                <button type="button" @click.stop="clickBtnShareOne(item.id)"><i class="share">공유</i></button>
                                <button type="button" @click.stop="clickBtnDetail(item.id)"><i class="detail">상세보기</i></button>
                                <button type="button" @click.stop="clickBtnEtc(item.id)"><i class="more">더 많은</i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>


                <!-- thumbnail -->
                <ul class="board_thumbnail" v-else-if="templateType == 'thumbnail'">
                    <li v-for="item in list" :key="item.id">
                        <label :class="{on: item.on}">
                            <input type="checkbox" v-model:checked="item.checked"/>
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

        <!-- 파일 상세 -->
        <div class="file_folder_info none_category_navi" v-show="currentInfo.isActive" ref="file_folder_info">
            <ul class="ffi_navi">
                <li><a href="#" :class="{active: currentInfo.currentTab == 'detail'}" @click="currentInfo.currentTab = 'detail'">자세한사항</a></li>
                <li><a href="#" :class="{active: currentInfo.currentTab == 'version'}" @click="currentInfo.currentTab = 'version'">버전 표시</a></li>
            </ul>
            <div class="ffi_cont">
                <div class="ffi_detail" v-show="currentInfo.currentTab == 'detail'" >
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
                        <li><a href="#"><img src="@/assets/images/sub/btn_ffi_delete.png" alt="Delete"/></a></li>
                        <li><a href="#"><img src="@/assets/images/sub/btn_ffi_return.png" alt="Return"/></a></li>
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
            <img src="@/assets/images/component/bullet_msg_cancel.png" alt="" class="ico" /> 항목이 즐겨찾기에 삭제되었습니다. <button type="button" class="btn_close"><img src="@/assets/images/component/btn_msg_close.png" alt="Close" /></button>
        </div>
        <div class="msg_layer">
            <img src="@/assets/images/component/bullet_msg_submit.png" alt="" class="ico" /> 항목이 즐겨찾기에 추가되었습니다. <button type="button" class="btn_close"><img src="@/assets/images/component/btn_msg_close.png" alt="Close" /></button>
        </div>

        <!-- 메뉴 레이어(style top,left값을 마우스 위치에 맞게 넣어주어야 함) -->
        <div class="menu_layer">
            <ul>
                <li><a href="#">미리보기</a></li>
                <li><a href="#">완전히 삭제</a></li>
                <li><a href="#">삭제 취소</a></li>
            </ul>
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
                    <strong>선택한 항목은 완전히 삭제 됩니다.</strong><br />
                    계속하시겠습니까?
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

        <!-- 모달 배경 -->
        <div class="modal_bg"></div>

    </article>
</template>

<script>
    export default {
        name: 'Share',
        data() {
            return {
                list : [],   // ico_ft_folder.png, ico_ft_photo.png, ico_ft_document.png, ico_ft_video.png, ico_ft_etc.png
                firstList: '',
                templateType: 'list',
                showDeletedFile: false,
                /* 상세정보창 관련 */
                currentInfo: {
                    id: '',                 // 현재 표시되는 정보의 id
                    isActive: false,        // 활성화 여부
                    currentTab: 'detail'    // 현재 탭
                },

                /* 싱글클릭, 더블클릭 관련 */
                singleOrDoubleClick: {
                    clickCount: 0,
                    singleClickTimer: null
                },
            }
        },
        computed: {

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








            let list = this.list,
                i;

            for (i = 0; i < list.length; i++) {

                list[i].icoImgUrl = this.getFileUrl('ico_ft_'  + list[i].type +  '.png');
                list[i].previewImgUrl = this.getFileUrl('preview_ft_'  + list[i].type +  '.png');
            }

            list = list.concat(JSON.parse(JSON.stringify(list)));

            for (i = 0; i < list.length; i++) {

                list[i].id = i + 1;

                if (list[i].id > 5) {

                    list[i].name = list[i].name.replace(/[1-9]/, list[i].id);
                }
            }

            this.list = list;
            this.firstList = JSON.parse(JSON.stringify(list));
        },
        methods: {

            isPhoto (type) {

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

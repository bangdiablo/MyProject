<template>
    <div class="policy_write_form">
        <h3>추천 백업</h3>
        <ul class="pwf_check_list">
            <li class="all">
                <label>
                    <input type="checkbox" v-model="selectAll" @click="select_all"/>전체선택
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" v-model="desktop" name="desktop"/>
                    <img src="@/assets/images/sub/ico_pwf_desktop.png" alt="" class="ico"/>데스크탑
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" v-model="document" name="document"/>
                    <img src="@/assets/images/sub/ico_pwf_document.png" alt="" class="ico"/>문서
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" v-model="afile"/>
                    <img src="@/assets/images/sub/ico_pwf_account.png" alt="" class="ico"/>회계파일
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" v-model="bookmark"/><img src="@/assets/images/sub/ico_pwf_bookmark.png"
                                                                    alt="" class="ico"/>북마크
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" v-model="picture"/><img src="@/assets/images/sub/ico_pwf_photo.png" alt=""
                                                                   class="ico"/>화상/사진
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" v-model="music"/><img src="@/assets/images/sub/ico_pwf_music.png" alt=""
                                                                 class="ico"/>음악
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" v-model="video"/><img src="@/assets/images/sub/ico_pwf_video.png" alt=""
                                                                 class="ico"/>비디오
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" v-model="ebook"/><img src="@/assets/images/sub/ico_pwf_nycard.png" alt=""
                                                                 class="ico"/>연하장
                </label>
            </li>
        </ul>
        <div class="pwf_fieldset">
            <h4><img src="@/assets/images/component/ico_add2.png" alt="" class="ico" @click="addSetRow"/> 파일위치
                <span class="note">(폴더 위치 지정은 다음 형식이어야 합니다. C:\Users\(사용자 이름)\Desktop\)</span></h4>
            <table>
                <caption>파일위치</caption>
                <colgroup>
                    <col style="width:104px;"/>
                    <col style="width:*;"/>
                    <col style="width:40px;"/>
                </colgroup>
                <tbody>
                <tr v-for="(row, index) in rows">
                    <td>
                        <button type="button" class="btn_variable"
                                @click="generalFilePopup(row.bf_filepath, index, 'file')">
                            {{$t('policy.general.insert_var') }}
                        </button>
                    </td>
                    <td><input type="text" v-model="row.bf_filepath"
                               :title="$t('policy.general.folderLocation_insert')" :key="index"/></td>
                    <td v-if="index == 0">
                        <button class="btn_add" @click="addInsertRow"><img src="@/assets/images/sub/btn_pwf_add.png"
                                                                           alt="추가"/></button>
                    </td>
                    <td v-else>
                        <button class="btn_delete" @click="addRemoveRow(index)"><img
                                src="@/assets/images/component/btn_edit_delete.png" alt="삭제"/>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="pwf_fieldset">
            <h4><img src="@/assets/images/component/ico_add2.png" alt="" class="ico" @click="addSetFolder"/> 폴더위치
                <span class="note">(폴더 위치 지정은 다음 형식이어야 합니다. C:\Users\(사용자 이름)\Desktop\)</span>
            </h4>
            <table>
                <caption>파일위치</caption>
                <colgroup>
                    <col style="width:104px;"/>
                    <col style="width:104px;"/>
                    <col style="width:*;"/>
                    <col style="width:34px;"/>
                </colgroup>
                <tbody>
                <tr v-for="(row, index) in rowsfolder">
                    <td>
                        <button type="button" class="btn_variable"
                                @click="generalFolderPopup(row.bf_filepath, index, 'folder')">{{
                            $t('policy.general.insert_var') }}
                        </button>
                    </td>
                    <td v-if="row.bf_folderpath !='' ">
                        <button type="button" class="btn_variable" @click="popFilter(row.bf_folderpath, index)">{{
                            $t('policy.general.filterAdd') }}
                        </button>
                    </td>
                    <td v-else>
                        <button type="button" class="btn_variable" disabled="disabled">
                            {{$t('policy.general.filterAdd') }}
                        </button>
                    </td>
                    <td><input type="text" v-model="row.bf_folderpath" :key="index"
                               :title="$t('policy.general.folderLocation_insert')"/></td>
                    <td v-if="index == 0">
                        <button class="btn_add" @click="addInsertRowFolder"><img
                                src="@/assets/images/sub/btn_pwf_add.png"
                                alt="추가"/></button>
                    </td>
                    <td v-else>
                        <button class="btn_delete" @click="addremoveFolder(index)"><img
                                src="@/assets/images/component/btn_edit_delete.png"
                                alt="삭제"/>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <!-- POPUP -->
        <modals-container
                :filter_modal="filter_modal">
        </modals-container>
        <div class="layer_popup preview" v-show="is_show">
            <h3>변수 삽입</h3>
            <p class="desc">다음의 변수가 AOSBOX AI Plus의 표준 폴더 경로(장소)로 식별됩니다. 변수를 복사하려면 변수를 선택하고 "변수를 삽입"를 클릭합니다. </p>
            <table class="board_list">
                <caption>변수 삽입</caption>
                <colgroup>
                    <col style="width:50px"/>
                    <col style="width:150px"/>
                    <col style="width:280px"/>
                    <col style="width:280px"/>
                </colgroup>
                <thead>
                <tr>
                    <th scope="col" colspan="2">변수</th>
                    <th scope="col">Mac OS X</th>
                    <th scope="col">Windows</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in variableList">
                    <td><input type="radio" v-model="vcheck" :value="item.bv_variable"/></td>
                    <td class="left">{{item.bv_variable}}</td>
                    <td>{{item.bv_macpath}}</td>
                    <td>{{item.bv_windowspath}}</td>
                </tr>
                </tbody>
            </table>
            <ul class="desc_list" style="margin-top:15px;">
                <li>전체 9건 중 1에서 9을 표시중</li>
            </ul>
            <div class="btn_set">
                <button v-if="insert_div == 'file'" type="button" class="btn_basic submit" @click="sendVariable">변수를
                    삽입
                </button>
                <button v-else type="button" class="btn_basic submit" @click="sendFolderVariable">변수를 삽입</button>
                <button type="button" class="btn_basic cancel" @click="generalFilePopup">닫기</button>
            </div>
            <button class="btn_close" @click="generalFilePopup">
                <img src="@/assets/images/component/btn_popup_close.png" alt="닫기"/>
            </button>
        </div>
        <!-- POPUP -->
    </div>
</template>

<script>
    import filterPopup from "./policy_filter_popup";

    export default {
        data() {
            return {
                desktop: false,
                document: false,
                afile: false,
                bookmark: false,
                picture: false,
                music: false,
                video: false,
                ebook: false,
                selectAll: false,
                selected: [],
                rows: [],
                rowsfolder: [],
                general_modal: '',
                filter_modal: '',
                cold_modal: '',
                is_show: false,
                variableList: [],
                vcheck: this.filepath,
                value: '',
                checkedData: false,
                index_div: '',
                filepath_div: '',
                insert_div: '',
            }
        },
        components: {
            // appMyModal: insertVariable,
        },
        computed: {
            setPolicyData() {
                return this.$store.state.management.policy.setPolicy
            }
        },
        watch: {
            desktop() {
                if (!this.desktop == true) {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'G') {
                            fm.wallpaperchk = 'N';
                        }
                    }
                } else {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'G') {
                            fm.wallpaperchk = 'Y';
                        }
                    }
                }
            },
            document() {
                if (!this.document == true) {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'G') {
                            fm.documentchk = 'N';
                        }
                    }
                } else {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'G') {
                            fm.documentchk = 'Y';
                        }
                    }
                }
            },
            afile() {
                if (!this.afile == true) {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'G') {
                            fm.acntnfilechk = 'N';
                        }
                    }
                } else {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'G') {
                            fm.acntnfilechk = 'Y';
                        }
                    }
                }
            },
            bookmark() {
                if (!this.bookmark == true) {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'G') {
                            fm.bookmarkchk = 'N';
                        }
                    }
                } else {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'G') {
                            fm.bookmarkchk = 'Y';
                        }
                    }
                }
            },
            picture() {
                if (!this.picture == true) {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'G') {
                            fm.imagechk = 'N';
                        }
                    }
                } else {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'G') {
                            fm.imagechk = 'Y';
                        }
                    }
                }
            },
            music() {
                if (!this.music == true) {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'G') {
                            fm.musicchk = 'N';
                        }
                    }
                } else {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'G') {
                            fm.musicchk = 'Y';
                        }
                    }
                }
            },
            video() {
                if (!this.video == true) {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'G') {
                            fm.videochk = 'N';
                        }
                    }
                } else {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'G') {
                            fm.videochk = 'Y';
                        }
                    }
                }
            },
            ebook() {
                if (!this.ebook == true) {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'G') {
                            fm.ebookchk = 'N';
                        }
                    }
                } else {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'G') {
                            fm.ebookchk = 'Y';
                        }
                    }
                }
            },
        },
        methods: {
            select_all() {
                this.selected = [];
                if (!this.selectAll) {
                    this.desktop = true;
                    this.document = true;
                    this.afile = true;
                    this.bookmark = true;
                    this.picture = true;
                    this.music = true;
                    this.video = true;
                    this.ebook = true;

                } else {
                    this.desktop = false;
                    this.document = false;
                    this.afile = false;
                    this.bookmark = false;
                    this.picture = false;
                    this.music = false;
                    this.video = false;
                    this.ebook = false;
                }
            },
            addInsertRow() {
                this.rows.push({
                    bf_filepath: ''
                });
            },
            addRemoveRow(index) {
                this.rows.splice(index, 1)
                this.setPolicyData.policyfiles.splice(index, 1)
            },
            addremoveFolder(index) {
                this.rowsfolder.splice(index, 1)
                this.setPolicyData.policyfolderfiles.splice(index, 1)
            },
            addSetRow() {
                this.rows.push({
                    bf_filepath: '',
                    bf_id: undefined
                })
            },
            addSetFolder() {
                this.rowsfolder.push({
                    bf_folderpath: '',
                    bf_id: undefined
                })
            },
            generalFilePopup(filepath, index, div) {
                this.index_div = index
                this.vcheck = filepath
                this.insert_div = div
                this.is_show = !this.is_show;
            },
            generalFolderPopup(filepath, index, div) {
                this.index_div = index
                this.vcheck = filepath
                this.insert_div = div
                this.is_show = !this.is_show;
            },
            popFilter(filepath, index, bf_id) {
                //MODAL
                this.$modal.show(filterPopup, {
                    filter_modal: 'filter_modal',
                    title: 'Filter Modal',
                    filepath: filepath,
                    index: index,
                    bfid: bf_id,
                    insert_div: 'filter',
                    modal: this.$modal,
                }, {
                    name: 'dynamic-modal',
                    width: '330px',
                    height: '130px',
                    draggable: false,
                })
            },
            addInsertRowFolder() {
                this.rowsfolder.push({
                    bf_folderpath: ''
                });
            },
            get_variable_list() {
                axios.get('/management/policy_variablelist/'
                )
                    .then((response) => {
                        this.variableList = response.data
                    })
            },
            sendVariable() {
                this.rows[this.index_div].bf_filepath = this.vcheck;
                let fileData = {
                    bf_type: 'G',
                    bf_filepath: this.vcheck,
                    bf_folderpath: null,
                    bf_extensionchk: 'N',
                    bf_filetypechk: 'N',
                    bf_regexchk: 'N',
                    bf_expression: null,
                    bf_filebackchk: 'N',
                    bf_size: null,
                    bf_volumechk: null,
                    bf_datebackchk: 'N',
                    bf_dateback: null,
                    bf_div: 1
                }
                this.setPolicyData.policyfiles.push(fileData)
                this.is_show = !this.is_show;
            },
            sendFolderVariable() {
                this.rowsfolder[this.index_div].bf_folderpath = this.vcheck;
                let fileData = {
                    bf_type: 'G',
                    bf_filepath: null,
                    bf_folderpath: this.vcheck,
                    bf_extensionchk: 'N',
                    bf_filetypechk: 'N',
                    bf_regexchk: 'N',
                    bf_expression: null,
                    bf_filebackchk: 'N',
                    bf_size: null,
                    bf_volumechk: null,
                    bf_datebackchk: 'N',
                    bf_dateback: null,
                    bf_div: 2
                }
                this.setPolicyData.policyfolderfiles.push(fileData)
                this.is_show = !this.is_show;
            },

        },
        created() {
            this.rows = [];
            this.rowsfolder = [];
            this.setPolicyData.policyfiles = [];
            this.setPolicyData.policyfolderfiles = [];
            this.get_variable_list()
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
        }


    }
</script>

<style scoped>
    .layer_popup {
        display: block;
    }
</style>

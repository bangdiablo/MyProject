<template>
    <div>
        <div class="policy_write_form">
            <h3>{{ $t('policy.general.recommend_backup') }}</h3>
            <ul class="pwf_check_list">
                <li class="all">
                    <label>
                        <input type="checkbox" v-model="selectAll" @click="select_all"/>
                        {{$t('policy.general.select_all')}}
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox" v-model="desktop"/>
                        <img src="@/assets/images/sub/ico_pwf_desktop.png" alt="" class="ico"/>
                        {{$t('policy.general.desktop') }}
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox" v-model="document"/>
                        <img src="@/assets/images/sub/ico_pwf_document.png" alt="" class="ico"/>
                        {{$t('policy.general.document') }}
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox" v-model="afile"/>
                        <img src="@/assets/images/sub/ico_pwf_account.png" alt="" class="ico"/>
                        {{$t('policy.general.afile') }}
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox" v-model="bookmark"/>
                        <img src="@/assets/images/sub/ico_pwf_bookmark.png" alt="" class="ico"/>
                        {{$t('policy.general.bookmark') }}
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox" v-model="picture"/>
                        <img src="@/assets/images/sub/ico_pwf_photo.png" alt="" class="ico"/>
                        {{$t('policy.general.picture') }}
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox" v-model="music"/>
                        <img src="@/assets/images/sub/ico_pwf_music.png" alt="" class="ico"/>
                        {{$t('policy.general.music') }}
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox" v-model="video"/>
                        <img src="@/assets/images/sub/ico_pwf_video.png" alt="" class="ico"/>
                        {{$t('policy.general.video') }}
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox" v-model="ebook"/>
                        <img src="@/assets/images/sub/ico_pwf_nycard.png" alt="" class="ico"/>{{
                        $t('policy.general.card') }}
                    </label>
                </li>
            </ul>
            <div class="pwf_fieldset">
                <h4><img src="@/assets/images/component/ico_add2.png" alt="" class="ico" @click="addSetRow"/>
                    {{$t('policy.general.fileLocation') }}
                    <span class="note">{{ $t('policy.general.file_note') }}</span>
                </h4>
                <table>
                    <caption>{{ $t('policy.general.fileLocation') }}</caption>
                    <colgroup>
                        <col style="width:104px;"/>
                        <col style="width:*;"/>
                        <col style="width:40px;"/>
                    </colgroup>
                    <tbody>
                    <tr v-for="(row, index) in generalFileList">
                        <td>
                            <button type="button" class="btn_variable"
                                    @click="insertVariable(row.bf_filepath, index, row.bf_id, 'file')">
                                {{$t('policy.general.insert_var') }}
                            </button>
                        </td>
                        <td>
                            <input type="text" :title="$t('policy.general.folderLocation_insert')"
                                   v-model="row.bf_filepath" :key="index"/>
                        </td>
                        <td v-if="index == 0">
                            <button class="btn_add" @click="addRow">
                                <img src="@/assets/images/sub/btn_pwf_add.png" alt="추가"/>
                            </button>
                        </td>
                        <td v-else>
                            <button class="btn_delete" @click="removeRow(index)">
                                <img src="@/assets/images/component/btn_edit_delete.png" alt="삭제"/>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="pwf_fieldset">
                <h4>
                    <img src="@/assets/images/component/ico_add2.png" alt="" class="ico" @click="addSetFolder"/>
                    {{$t('policy.general.folderLocation') }}
                    <span class="note">{{ $t('policy.general.file_note') }}</span>
                </h4>
                <table>
                    <caption>폴더위치</caption>
                    <colgroup>
                        <col style="width:104px;"/>
                        <col style="width:104px;"/>
                        <col style="width:*;"/>
                        <col style="width:34px;"/>
                    </colgroup>
                    <tbody>
                    <tr v-for="(row, index) in generalFolderList">
                        <td>
                            <button type="button" class="btn_variable"
                                    @click="insertFolder(row.bf_folderpath, index, row.bf_id, 'folder')">
                                {{$t('policy.general.insert_var') }}
                            </button>
                        </td>
                        <td v-if="row.bf_folderpath !='' ">
                            <button type="button" class="btn_variable"
                                    @click="popFilter(row.bf_folderpath, index, row.bf_id)">
                                {{$t('policy.general.filterAdd') }}
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
                            <button class="btn_add" @click="addFolder"><img src="@/assets/images/sub/btn_pwf_add.png"
                                                                            alt="추가"/></button>
                        </td>
                        <td v-else>
                            <button class="btn_delete" @click="removeFolder(index)"><img
                                    src="@/assets/images/component/btn_edit_delete.png"
                                    alt="삭제"/>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- POPUP -->
            <div class="layer_popup preview" v-show="Gfile_show">
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
                    <button type="button" class="btn_basic cancel" @click="insertVariable">닫기</button>
                </div>
                <button class="btn_close" @click="insertVariable">
                    <img src="@/assets/images/component/btn_popup_close.png" alt="닫기"/>
                </button>
            </div>
            <!-- POPUP END -->
            <modals-container
                    :filter_modal="filter_modal">
            </modals-container>
        </div>
    </div>
</template>

<script>
    import filterPopup from './policy_filter_popup'

    export default {
        data() {
            return {
                nomalStorageData: [],
                GfileList: [],
                GfolderList: [],
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
                checkbox_div: [],
                title: '',
                filepath: '',
                index: '',
                insert_div: '',
                index_div: '',
                filter_modal: 'generalfilter_modal',
                bfid: null,
                bf_type: 'G',
                popindex: 0,
                Gfile_show: false,
                variableList: [],
                vcheck: this.filepath,
            }
        },
        components: {
            filterPopup,
        },
        computed: {
            policyData() {
                return this.$store.state.management.policy.setPolicy.generalpolicydata
            },
            generalFileList() {
                return this.GfileList
                // return this.$store.state.management.policy.policyDataList.generalFile
            },
            generalFolderList() {
                //return this.$store.state.management.policy.policyDataList.generalFolder
                return this.GfolderList
            },
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
                            this.selected.splice(0, 1, 'N')
                        }
                    }
                } else {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'G') {
                            fm.wallpaperchk = 'Y';
                            this.selected.splice(0, 1, 'Y')
                        }
                    }
                }
            },
            document() {
                if (!this.document == true) {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'G') {
                            fm.documentchk = 'N';
                            this.selected.splice(1, 1, 'N')
                        }
                    }
                } else {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'G') {
                            fm.documentchk = 'Y';
                            this.selected.splice(1, 1, 'Y')
                        }
                    }
                }
            },
            afile() {
                if (!this.afile == true) {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'G') {
                            fm.acntnfilechk = 'N';
                            this.selected.splice(2, 1, 'N')
                        }
                    }
                } else {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'G') {
                            fm.acntnfilechk = 'Y';
                            this.selected.splice(2, 1, 'Y')
                        }
                    }
                }
            },
            bookmark() {
                if (!this.bookmark == true) {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'G') {
                            fm.bookmarkchk = 'N';
                            this.selected.splice(3, 1, 'N')
                        }
                    }
                } else {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'G') {
                            fm.bookmarkchk = 'Y';
                            this.selected.splice(3, 1, 'Y')
                        }
                    }
                }
            },
            picture() {
                if (!this.picture == true) {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'G') {
                            fm.imagechk = 'N';
                            this.selected.splice(4, 1, 'N')
                        }
                    }
                } else {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'G') {
                            fm.imagechk = 'Y';
                            this.selected.splice(4, 1, 'Y')
                        }
                    }
                }
            },
            music() {
                if (!this.music == true) {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'G') {
                            fm.musicchk = 'N';
                            this.selected.splice(5, 1, 'N')
                        }
                    }
                } else {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'G') {
                            fm.musicchk = 'Y';
                            this.selected.splice(5, 1, 'Y')
                        }
                    }
                }
            },
            video() {
                if (!this.video == true) {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'G') {
                            fm.videochk = 'N';
                            this.selected.splice(6, 1, 'N')
                        }
                    }
                } else {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'G') {
                            fm.videochk = 'Y';
                            this.selected.splice(6, 1, 'Y')
                        }
                    }
                }
            },
            ebook() {
                if (!this.ebook == true) {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'G') {
                            fm.ebookchk = 'N';
                            this.selected.splice(7, 1, 'N')
                        }
                    }
                } else {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'G') {
                            fm.ebookchk = 'Y';
                            this.selected.splice(7, 1, 'Y')
                        }
                    }
                }
            },
            selected() {
                var counter = 0;
                for (var i = 0; i < this.selected.length; i++) {
                    if(this.selected[i] === 'N'){
                        this.selected[i] = 'N';
                        counter += 1
                    }else{
                        this.selected[i] = 'Y';
                    }
                }
                if(counter > 0){
                    this.selectAll = false
                }else{
                    this.selectAll = true
                }
            }
        },
        methods: {
            addRow() {
                this.GfileList.push({
                    bf_id: null,
                    bf_type: 'G',
                    bf_filepath: '',
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
                })
            },
            addFolder() {
                this.GfolderList.push({
                    bf_id: null,
                    bf_type: 'G',
                    bf_filepath: '',
                    bf_folderpath: '',
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
                })
            },
            addInsertRow() {
                this.rows.push({
                    bf_filepath: ''
                });
            },
            addInsertRowFolder() {
                this.rowsfolder.push({
                    bf_folderpath: ''
                });
            },
            removeRow(index) {
                this.GfileList.splice(index, 1)
                this.setPolicyData.policyfiles = []
                this.setPolicyData.policyfiles = this.GfileList
            },
            addRemoveRow(index) {
                this.rows.splice(index, 1)
            },
            removeFolder(index) {
                this.GfolderList.splice(index, 1)
                this.setPolicyData.policyfolderfiles = []
                this.setPolicyData.policyfolderfiles = this.GfolderList
            },
            insertVariable(filepath, index, bf_id, div) {
                this.index_div = index
                this.vcheck = filepath
                this.bfid = bf_id
                this.insert_div = div
                this.Gfile_show = !this.Gfile_show;
            },
            insertFolder(filepath, index, bf_id, div) {
                //MODAL
                this.index_div = index
                this.vcheck = filepath
                this.bfid = bf_id
                this.insert_div = div
                this.Gfile_show = !this.Gfile_show;
            },
            popFilter(filepath, index, bf_id) {
                // console.log("popFilterpopFilterpopFilterpopFilterpopFilter====", index)
                // //MODAL
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
            select_all() {
                // this.selected = [];
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
            checkboxChecked(data) {
                axios.get('/management/policy_editlist/',
                    {
                        params: {
                            bpId: data.bpId
                        }
                    }
                ).then((response) => {
                    if (response.data.generalPolicydata != '') {
                        this.nomalStorageData = response.data.generalPolicydata
                        this.setPolicyData.policydata[0].id = response.data.generalPolicydata[0].pd_id
                        // console.log("response.datageneral===", response.data)
                        if (response.data.generalPolicydata[0].pd_wallpaperchk == "Y") {
                            this.desktop = true;
                            this.selected.push(response.data.generalPolicydata[0].pd_wallpaperchk);
                        }
                        if (response.data.generalPolicydata[0].pd_documentchk == "Y") {
                            this.document = true;
                            this.selected.push(response.data.generalPolicydata[0].pd_documentchk);
                        }
                        if (response.data.generalPolicydata[0].pd_acntnfilechk == "Y") {
                            this.afile = true;
                            this.selected.push(response.data.generalPolicydata[0].pd_acntnfilechk);
                        }
                        if (response.data.generalPolicydata[0].pd_bookmarkchk == "Y") {
                            this.bookmark = true;
                            this.selected.push(response.data.generalPolicydata[0].pd_bookmarkchk);
                        }
                        if (response.data.generalPolicydata[0].pd_imagechk == "Y") {
                            this.picture = true;
                            this.selected.push(response.data.generalPolicydata[0].pd_imagechk);
                        }
                        if (response.data.generalPolicydata[0].pd_musicchk == "Y") {
                            this.music = true;
                            this.selected.push(response.data.generalPolicydata[0].pd_musicchk);
                        }
                        if (response.data.generalPolicydata[0].pd_videochk == "Y") {
                            this.video = true;
                            this.selected.push(response.data.generalPolicydata[0].pd_videochk);
                        }
                        if (response.data.generalPolicydata[0].pd_ebookchk == "Y") {
                            this.ebook = true;
                            this.selected.push(response.data.generalPolicydata[0].pd_ebookchk);
                        }
                        if (this.selected.length == 8) {
                            this.selectAll = true;
                        }
                    }
                })
            },
            init() {
                const bpId = this.$route.params.bp_id
                let requestData = {
                    bpId: bpId
                }
                //File&Folder Data
                axios.get('/management/policy_editlist/',
                    {
                        params: {
                            bpId: requestData.bpId
                        }
                    }
                ).then((response) => {
                    this.GfileList = response.data.generalFile
                    this.GfolderList = response.data.generalFolder
                    this.setPolicyData.policyfolderfiles = response.data.generalFolder
                })

                //변수 POPUP DATA
                axios.get('/management/policy_variablelist/'
                )
                    .then((response) => {
                        this.variableList = response.data
                    })
            },
            sendVariable() {
                this.GfileList[this.index_div].bf_filepath = this.vcheck;
                this.setPolicyData.policyfiles = [];
                this.setPolicyData.policyfiles = this.GfileList
                this.Gfile_show = !this.Gfile_show;
            },
            sendFolderVariable() {
                this.GfolderList[this.index_div].bf_folderpath = this.vcheck;
                this.setPolicyData.policyfolderfiles = [];
                this.setPolicyData.policyfolderfiles = this.GfolderList
                this.Gfile_show = !this.Gfile_show;
            },
            addSetRow() {
                this.GfileList.push({
                    bf_filepath: '',
                    bf_id: undefined
                })
            },
            addSetFolder() {
                this.GfolderList.push({
                    bf_folderpath: '',
                    bf_id: undefined
                })
            },
        },
        created() {
            this.setPolicyData.policyfolderfiles = [];

            const bpId = this.$route.params.bp_id
            let requestData = {
                bpId: bpId
            }
            this.nomalStorageData = this.$store.state.management.policy.policyDataList.generalPolicydata
            this.checkboxChecked(requestData);
            this.init()
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

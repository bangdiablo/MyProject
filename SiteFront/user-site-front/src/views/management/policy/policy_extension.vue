<template>
    <div class="policy_write_form">
        <h3>섀도우 복사를 하는 확장자</h3>
        <div class="pwf_fieldset">
            <h4>이들의 확장자를 가진 파일은 볼륨 섀도 복사본 서비스를 통해서 백업됩니다.</h4>
            <table>
                <caption>섀도우 복사를 하는 확장자</caption>
                <tbody>
                <tr v-for="(row, index) in exList">
                    <!--                    <td v-if="row.ex_shadowcopy == null || row.ex_shadowcopy == 0">-->
                    <!--                        <textarea name="" id="" cols="30" rows="10"-->
                    <!--                                  placeholder="확장자는 세미 콜론으로 구분하여 주세요(예:*.doc; *.txt; *.pst)"></textarea>-->
                    <!--                    </td>-->
                    <td>
                        <textarea ref="ex_shadowcopy" :value="row.ex_shadowcopy"
                                  @input="updateShadowcopy($event.target.value)" cols="30" rows="10"
                                  placeholder="확장자는 세미 콜론으로 구분하여 주세요(예:*.doc; *.txt; *.pst)"></textarea>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <h3>블록 레벨 백업을 실시하는 확장자</h3>
        <div class="pwf_fieldset">
            <h4>다음의 확장자를 가진 파일은 블록 레벨에서 변경 부분만 백업됩니다. <span class="note">(5MB이상의 파일만 지원됩니다)</span></h4>
            <table>
                <caption>블록 레벨 백업을 실시하는 확장자</caption>
                <tbody>
                <tr v-for="(row, index) in exList">
                    <!--                    <td v-if="row.ex_blocklevel == null || row.ex_blocklevel == 0">-->
                    <!--                        <textarea name="" id="" cols="30" rows="10"-->
                    <!--                                  placeholder="확장자는 세미 콜론으로 구분하여 주세요(예:*. doc; *. txt; *.pst)"></textarea>-->
                    <!--                    </td>-->
                    <td>
                        <textarea :value="row.ex_blocklevel" @input="updateBlocklevel($event.target.value)" cols="30"
                                  rows="10" placeholder="확장자는 세미 콜론으로 구분하여 주세요(예:*. doc; *. txt; *.pst)"></textarea>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <h3>추천 백업의 확장자</h3>
        <div class="pwf_fieldset">
            <!--            <h4><a @click="activate(1)" class="sorting" :class="{on: active_el == 1}">연하장 데이터</a><span class="note">(이 추천 백업 항목에는 다음의 확장자가 포함되어 있습니다.)</span></h4>-->
            <h4>연하장 데이터 <span class="note">(이 추천 백업 항목에는 다음의 확장자가 포함되어 있습니다.)</span></h4>
            <!--            <div v-if="active_el == 1" style="display:block">-->
            <table>
                <caption>블록 레벨 백업을 실시하는 확장자</caption>
                <tbody>
                <tr v-for="(row, index) in exList">
                    <td v-if="row.ex_ebook == null || row.ex_ebook == 0">
                        <textarea :value="ebook_data" @input="updateEbook($event.target.value)" cols="30" rows="10">{{account_data}}</textarea>
                    </td>
                    <td v-else>
                        <textarea :value="row.ex_ebook" @input="updateEbook($event.target.value)" cols="30"
                                  rows="10"></textarea>
                    </td>
                </tr>
                </tbody>
            </table>
            <!--            </div>-->
        </div>
        <div class="pwf_fieldset">
            <!--            <h4><a @click="activate(2)" class="sorting" :class="{on: active_el == 2}">회계 파일</a> <span class="note">(이 추천 백업 항목에는 다음의 확장자가 포함되어 있습니다.)</span></h4>-->
            <h4>회계 파일 <span class="note">(이 추천 백업 항목에는 다음의 확장자가 포함되어 있습니다.)</span></h4>
            <!--            <div v-if="active_el == 2" style="display:block">-->
            <table>
                <caption>블록 레벨 백업을 실시하는 확장자</caption>
                <tbody>
                <tr v-for="(row, index) in exList">
                    <td v-if="row.ex_account == null || row.ex_account == 0">
                        <textarea :value="account_data" @input="updateAccount($event.target.value)" cols="30" rows="10">{{account_data}}</textarea>
                    </td>
                    <td v-else>
                        <textarea :value="row.ex_account" @input="updateAccount($event.target.value)" cols="30"
                                  rows="10">{{row.ex_account}}</textarea>
                    </td>
                </tr>
                </tbody>
            </table>
            <!--            </div>-->
        </div>

        <h3>전체의 제외 항목</h3>
        <div class="pwf_fieldset">
            <h4>모든 경우 다음의 확장자를 백업하지 않음</h4>
            <table>
                <caption>블록 레벨 백업을 실시하는 확장자</caption>
                <tbody>
                <tr v-for="(row, index) in exList">
                    <!--                    <td v-if="row.ex_exclusion == null || row.ex_exclusion == 0">-->
                    <!--                        <textarea name="" id="" cols="30" rows="10"-->
                    <!--                                  placeholder="확장자는 세미 콜론으로 구분하여 주세요(예:*. doc; *. txt; *.pst)"></textarea>-->
                    <!--                    </td>-->
                    <td>
                        <textarea :value="row.ex_exclusion" @input="updateExclusion($event.target.value)" cols="30"
                                  rows="10" placeholder="확장자는 세미 콜론으로 구분하여 주세요(예:*. doc; *. txt; *.pst)"></textarea>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="pwf_fieldset">
            <h4><img src="@/assets/images/component/ico_add2.png" alt="" class="ico" @click="addSetFolder"/> 폴더 단위로 제외
                <span class="note">(폴더 위치 지정은 다음 형식이어야 합니다. C:\Users\(사용자 이름)\Desktop\)</span></h4>
            <table>
                <caption>파일위치</caption>
                <colgroup>
                    <col style="width:104px;"/>
                    <col style="width:*;"/>
                    <col style="width:34px;"/>
                </colgroup>
                <tbody>
                <tr v-for="(row, index) in exFolderList">
                    <td>
                        <button type="button" class="btn_variable"
                                @click="insertFolder(row.bf_filepath, index, row.bf_id)">변수삽입
                        </button>
                    </td>
                    <td><input type="text" v-model="row.bf_folderpath" :key="index" title="폴더 위치 입력"/></td>
                    <td v-if="index == 0">
                        <button class="btn_add" @click="addFolderRow">
                            <img src="@/assets/images/sub/btn_pwf_add.png" alt="추가"/>
                        </button>
                    </td>
                    <td v-else>
                        <button class="btn_delete" @click="removeFolderRow(index)">
                            <img src="@/assets/images/component/btn_edit_delete.png" alt="삭제"/>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <div class="pwf_fieldset">
            <h4><img src="@/assets/images/component/ico_add2.png" alt="" class="ico" @click="addSetRow"/> 제외 파일 <span
                    class="note">(폴더 위치 지정은 다음 형식이어야 합니다. C:\Users\(사용자 이름)\Desktop\)</span></h4>
            <table>
                <caption>폴더위치</caption>
                <colgroup>
                    <col style="width:104px;"/>
                    <col style="width:*;"/>
                    <col style="width:34px;"/>
                </colgroup>
                <tbody>
                <tr v-for="(row, index) in exFileList">
                    <td>
                        <button type="button" class="btn_variable" @click="ocrmodal(row.bf_filepath, index)">변수삽입
                        </button>
                    </td>
                    <td><input type="text" v-model="row.bf_filepath" :key="index" title="폴더 위치 입력"/></td>
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
        <insertFolder
                :visible.sync="folder_popup"
                :general_modal="general_modal"
                :title="title"
                :filepath="filepath"
                :index="popindex"
                :bfid="bfid"
                :insert_div="insert_div"
        ></insertFolder>
        <LayerPopup
                :visible.sync="layer_popup"
                :cold_modal="ocr_modal"
                :title="title"
                :filepath="filepath"
                :index="popindex"
                :insert_div="insert_div"
        ></LayerPopup>
    </div>
</template>

<script>
    import $ from "jquery";
    import {EX_ACCOUNTDATA} from "../../../common/extension_data";
    import {EX_EBOOKDATA} from "../../../common/extension_data";
    import {EX_OFFICEDATA} from "../../../common/extension_data";
    import LayerPopup from "./policy_variable_coldpopup";
    import insertFolder from "./policy_variable_folderpopup";
    import {EventBus} from "../../../plugins/event-bus";

    export default {
        data() {
            return {
                ebook_data: null,
                account_data: null,
                active_el: 0,
                ex_filedata: [],
                ex_folderdata: [],
                ex_listdata: [],
                ex_shadowcopy: null,
                ex_blocklevel: null,
                ex_ebook: null,
                ex_account: null,
                ex_exclusion: null,
                title: '',
                insert_div: '',
                bfid: 0,
                popindex: 0,
                folder_popup: false,
                layer_popup: false,
                filepath: '',
                ocr_modal: 'extension_modal',
                general_modal: 'extension_modal',
            }
        },
        computed: {
            exFileList() {
                return this.ex_filedata
            },
            exFolderList() {
                return this.ex_folderdata
            },
            exList() {
                return this.ex_listdata
            },
            setPolicyData() {
                return this.$store.state.management.policy.setPolicy
            }
        },
        components: {
            LayerPopup,
            insertFolder,
        },
        created() {
            this.ebook_data = EX_EBOOKDATA
            this.account_data = EX_ACCOUNTDATA

            const bpId = this.$route.params.bp_id
            let requestData = {
                bpId: bpId
            }

            //확장자파일 리스트
            axios.get('/management/policy_exFilelist/', {params: {bpId: requestData.bpId}}
            ).then((response) => {
                this.ex_filedata = response.data.exFile
                this.ex_folderdata = response.data.exFolder
                this.setPolicyData.extensionfolder = response.data.exFolder
            })

            //확장자 리스트
            axios.get('/management/policy_extensionlist/', {params: {bpId: requestData.bpId}}
            ).then((response) => {
                this.ex_listdata = response.data
                this.setPolicyData.policyextension.ex_id = response.data[0].ex_id
                this.setPolicyData.policyextension.shadowcopy = response.data[0].ex_shadowcopy
                this.setPolicyData.policyextension.blocklevel = response.data[0].ex_blocklevel
                if (response.data[0].ex_ebook != '') {
                    this.setPolicyData.policyextension.ebook = response.data[0].ex_ebook
                } else {
                    this.setPolicyData.policyextension.ebook = this.ebook_data
                }
                if (response.data[0].ex_account != '') {
                    this.setPolicyData.policyextension.account = response.data[0].ex_account
                } else {
                    this.setPolicyData.policyextension.account = this.account_data
                }
                this.setPolicyData.policyextension.office = response.data[0].ex_office
                this.setPolicyData.policyextension.exclusion = response.data[0].ex_exclusion
                this.setPolicyData.policyextension.policyid = response.data[0].ex_policyid
            })


        },
        methods: {
            activate: function (el) {
                this.active_el = el;
            },
            addRow() {
                this.ex_filedata.push({
                    bf_filepath: ''
                })
            },
            removeRow(index) {
                this.ex_filedata.splice(index, 1)
            },
            addFolderRow() {
                this.ex_folderdata.push({
                    bf_folderpath: ''
                })
            },
            removeFolderRow(index) {
                this.ex_folderdata.splice(index, 1)
            },
            gotoData() {
                // this.setPolicyData.policyextension.shadowcopy = this.ex_shadowcopy
                // this.setPolicyData.policyextension.blocklevel = this.ex_blocklevel
                // this.setPolicyData.policyextension.ebook = this.ex_ebook
                // this.setPolicyData.policyextension.office = null
                // this.setPolicyData.policyextension.account = this.ex_account
                // this.setPolicyData.policyextension.exclusion = this.ex_exclusion
            },
            updateShadowcopy(value) {
                this.setPolicyData.policyextension.shadowcopy = value
            },
            updateBlocklevel(value) {
                this.setPolicyData.policyextension.blocklevel = value
            },
            updateEbook(value) {
                this.setPolicyData.policyextension.ebook = value
            },
            updateAccount(value) {
                this.setPolicyData.policyextension.account = value
            },
            updateExclusion(value) {
                this.setPolicyData.policyextension.exclusion = value
            },
            insertFolder(filepath, index, bf_id) {
                //MODAL
                this.general_modal = 'extension_modal'
                this.title = 'extension Folder'
                this.filepath = filepath
                this.popindex = index
                this.bfid = bf_id
                this.insert_div = 'folder'
                this.folder_popup = true
            },
            ocrmodal(filepath, index) {
                //MODAL
                this.ocr_modal = 'extension_modal'
                this.title = 'extension Modal'
                this.filepath = filepath
                this.popindex = index
                this.insert_div = 'file'
                this.layer_popup = true
            },
            addSetRow() {
                this.ex_filedata.push({
                    bf_filepath: '',
                    bf_id: undefined
                })
            },
            addSetFolder() {
                this.ex_folderdata.push({
                    bf_folderpath: '',
                    bf_id: undefined
                })
            },
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

            EventBus.$on("variable_extension_folderpath", data => {
                if (undefined !== data.bf_id) {
                    this.ex_folderdata[data.file_index].bf_folderpath = data.file_path;
                    this.setPolicyData.extensionfolder = this.ex_folderdata
                } else {
                    if (this.ex_folderdata[data.file_index]) {
                        this.ex_folderdata[data.file_index].bf_id = null
                        this.ex_folderdata[data.file_index].bf_type = 'E';
                        this.ex_folderdata[data.file_index].bf_filepath = null;
                        this.ex_folderdata[data.file_index].bf_folderpath = data.file_path;
                        this.ex_folderdata[data.file_index].bf_extensionchk = 'N';
                        this.ex_folderdata[data.file_index].bf_filetypechk = 'N';
                        this.ex_folderdata[data.file_index].bf_regexchk = 'N';
                        this.ex_folderdata[data.file_index].bf_expression = null;
                        this.ex_folderdata[data.file_index].bf_filebackchk = 'N';
                        this.ex_folderdata[data.file_index].bf_size = null;
                        this.ex_folderdata[data.file_index].bf_volumechk = null;
                        this.ex_folderdata[data.file_index].bf_datebackchk = 'N';
                        this.ex_folderdata[data.file_index].bf_dateback = null;
                        this.ex_folderdata[data.file_index].bf_div = 2;
                        this.setPolicyData.extensionfolder = this.ex_folderdata
                    }
                }
            });

            EventBus.$on("variable_extensionfile_path", data => {
                if (undefined !== data.bf_id) {
                    this.ex_filedata[data.file_index].bf_filepath = data.file_path;
                    // for (let i in this.setPolicyData.policyfiles) {
                    //     if (this.ocr_filedata[i].bf_id == data.bf_id) {
                    //         this.ocr_filedata[i].bf_filepath = data.file_path;
                    //     }
                    // }
                } else {
                    this.ex_filedata[data.file_index].bf_id = null
                    this.ex_filedata[data.file_index].bf_type = 'E';
                    this.ex_filedata[data.file_index].bf_filepath = data.file_path;
                    this.ex_filedata[data.file_index].bf_folderpath = null;
                    this.ex_filedata[data.file_index].bf_extensionchk = 'N';
                    this.ex_filedata[data.file_index].bf_filetypechk = 'N';
                    this.ex_filedata[data.file_index].bf_regexchk = 'N';
                    this.ex_filedata[data.file_index].bf_expression = null;
                    this.ex_filedata[data.file_index].bf_filebackchk = 'N';
                    this.ex_filedata[data.file_index].bf_size = null;
                    this.ex_filedata[data.file_index].bf_volumechk = null;
                    this.ex_filedata[data.file_index].bf_datebackchk = 'N';
                    this.ex_filedata[data.file_index].bf_dateback = null;
                    this.ex_filedata[data.file_index].bf_div = 1;
                    this.setPolicyData.extensionfiles = this.ex_filedata
                }
            });

        }
    }
</script>

<style scoped>

    div.pwf_fieldset h4 a.sorting {
        color: #999999;
        padding-right: 12px;
        background: url(../../../assets/images/component/bullet_sorting.png) no-repeat right 7px;
    }

    div.pwf_fieldset h4 a.sorting.on {
        background-position: right -22px;
    }
</style>

<template>
    <div class="policy_write_form">
        <h3>섀도우 복사를 하는 확장자</h3>
        <div class="pwf_fieldset">
            <h4>이들의 확장자를 가진 파일은 볼륨 섀도 복사본 서비스를 통해서 백업됩니다.</h4>
            <table>
                <caption>섀도우 복사를 하는 확장자</caption>
                <tbody>
                <tr>
                    <td>
                        <textarea name="" id="" cols="30" rows="10" v-model="ex_shadowcopy" @change="gotoData"
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
                <tr>
                    <td>
                        <textarea name="" id="" cols="30" rows="10" v-model="ex_blocklevel" @change="gotoData"
                                  placeholder="확장자는 세미 콜론으로 구분하여 주세요(예:*. doc; *. txt; *.pst)"></textarea>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <h3>추천 백업의 확장자</h3>
        <div class="pwf_fieldset">
            <h4>연하장 데이터 <span class="note">(이 추천 백업 항목에는 다음의 확장자가 포함되어 있습니다.)</span></h4>

            <table>
                <caption>블록 레벨 백업을 실시하는 확장자</caption>
                <tbody>
                <tr>
                    <td>
                            <textarea name="" id="" cols="30" rows="10" v-model="ex_ebook"
                                      @change="gotoData"></textarea>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="pwf_fieldset">
            <h4>회계 파일 <span class="note">(이 추천 백업 항목에는 다음의 확장자가 포함되어 있습니다.)</span></h4>
            <table>
                <caption>블록 레벨 백업을 실시하는 확장자</caption>
                <tbody>
                <tr>
                    <td>
                            <textarea name="" id="" cols="30" rows="10" v-model="ex_account"
                                      @change="gotoData"></textarea>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <h3>전체의 제외 항목</h3>
        <div class="pwf_fieldset">
            <h4>모든 경우 다음의 확장자를 백업하지 않음</h4>
            <table>
                <caption>블록 레벨 백업을 실시하는 확장자</caption>
                <tbody>
                <tr>
                    <td>
                        <textarea name="" id="" cols="30" rows="10" v-model="ex_exclusion" @change="gotoData"
                                  placeholder="확장자는 세미 콜론으로 구분하여 주세요(예:*. doc; *. txt; *.pst)"></textarea>
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
                <tr v-for="(row, index) in rowsfolder">
                    <td>
                        <button type="button" class="btn_variable" @click="insertFolder(row.bf_filepath, index)">변수삽입
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
            <h4><img src="@/assets/images/component/ico_add2.png" alt="" class="ico" @click="addSetRow"/> 제외 파일
                <span class="note">(폴더 위치 지정은 다음 형식이어야 합니다. C:\Users\(사용자 이름)\Desktop\)</span></h4>
            <table>
                <caption>폴더위치</caption>
                <colgroup>
                    <col style="width:104px;"/>
                    <col style="width:*;"/>
                    <col style="width:34px;"/>
                </colgroup>
                <tbody>
                <tr v-for="(row, index) in rows">
                    <td>
                        <button type="button" class="btn_variable" @click="exFilePopup(row.bf_filepath, index, 'file')">
                            변수삽입
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
        <!-- File/Folder POPUP -->
        <div class="layer_popup preview" v-show="ex_show">
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
                <button type="button" class="btn_basic cancel" @click="exFilePopup">닫기</button>
            </div>
            <button class="btn_close" @click="exFilePopup">
                <img src="@/assets/images/component/btn_popup_close.png" alt="닫기"/>
            </button>
        </div>
        <!-- END File/Folder POPUP -->
    </div>
</template>

<script>
    import $ from "jquery";
    import {EX_ACCOUNTDATA} from "../../../common/extension_data";
    import {EX_EBOOKDATA} from "../../../common/extension_data";
    import {EX_OFFICEDATA} from "../../../common/extension_data";

    export default {
        data() {
            return {
                ex_shadowcopy: null,
                ex_blocklevel: null,
                ex_ebook: null,
                ex_account: null,
                ex_exclusion: null,
                rows: [],
                rowsfolder: [],
                insert_div: '',
                filepath: '',
                ex_show: false,
                variableList: [],
                vcheck: this.filepath,
                value: '',
                index_div: 0,
                filter_show: false,
            }
        },
        computed: {
            setPolicyData() {
                return this.$store.state.management.policy.setPolicy
            }
        },
        created() {
            this.ex_ebook = EX_EBOOKDATA
            this.ex_account = EX_ACCOUNTDATA
            this.rows = [];
            this.rowsfolder = [];
            this.setPolicyData.extensionfile = [];
            this.setPolicyData.extensionfolder = [];
            this.get_variable_list()
        },
        methods: {
            get_variable_list() {
                axios.get('/management/policy_variablelist/'
                )
                    .then((response) => {
                        this.variableList = response.data
                    })
            },
            addRow() {
                this.rows.push({
                    bf_filepath: ''
                })
            },
            addSetRow() {
                this.rows.push({
                    bf_filepath: '',
                    bf_id: undefined
                })
            },
            removeRow(index) {
                this.rows.splice(index, 1)
                this.setPolicyData.extensionfile.splice(index, 1)
            },
            addFolderRow() {
                this.rowsfolder.push({
                    bf_folderpath: ''
                })
            },
            addSetFolder() {
                this.rowsfolder.push({
                    bf_folderpath: '',
                    bf_id: undefined
                })
            },
            removeFolderRow(index) {
                this.rowsfolder.splice(index, 1)
                this.setPolicyData.extensionfolder.splice(index, 1)
            },
            gotoData() {
                this.setPolicyData.policyextension.shadowcopy = this.ex_shadowcopy
                this.setPolicyData.policyextension.blocklevel = this.ex_blocklevel
                this.setPolicyData.policyextension.ebook = this.ex_ebook
                this.setPolicyData.policyextension.office = null
                this.setPolicyData.policyextension.account = this.ex_account
                this.setPolicyData.policyextension.exclusion = this.ex_exclusion
            },
            insertFolder(filepath, index, div) {
                //POPUP
                this.index_div = index
                this.vcheck = filepath
                this.insert_div = 'filter'
                this.ex_show = !this.ex_show;
            },
            exFilePopup(filepath, index, div) {
                //POPUP
                this.index_div = index
                this.vcheck = filepath
                this.insert_div = div
                this.ex_show = !this.ex_show;
            },
            sendVariable() {
                this.rows[this.index_div].bf_filepath = this.vcheck;
                let fileData = {
                    bf_type: 'E',
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
                    bf_div: 1       //file
                }
                this.setPolicyData.extensionfile.push(fileData)
                this.ex_show = !this.ex_show;
            },
            sendFolderVariable() {
                this.rowsfolder[this.index_div].bf_folderpath = this.vcheck;
                let fileData = {
                    bf_type: 'E',
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
                    bf_div: 2       //folder
                }
                this.setPolicyData.extensionfolder.push(fileData)
                this.ex_show = !this.ex_show;
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

    .layer_popup {
        display: block;
    }
</style>

<template>
    <div class="policy_write_form">
        <h3>수동 선택</h3>
        <div class="pwf_fieldset">
            <h4><img src="@/assets/images/component/ico_add2.png" alt="" class="ico" @click="addSetRow"/> 파일위치 <span
                    class="note">(폴더 위치 지정은 다음 형식이어야 합니다. C:\Users\(사용자 이름)\Desktop\)</span>
                <!--                <button class="btn_add" @click="addSetRow"><img src="@/assets/images/sub/btn_pwf_add.png" alt="추가"/>추가-->
                <!--                </button>-->
            </h4>
            <table>
                <caption>파일위치</caption>
                <colgroup>
                    <col style="width:104px;"/>
                    <col style="width:*;"/>
                    <col style="width:40px;"/>
                </colgroup>
                <tbody>
                <tr v-for="(row, index) in ocrFileList">
                    <td>
                        <button type="button" class="btn_variable"
                                @click="ocrmodal(row.bf_filepath, index, row.bf_id, 'file')">
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
                        <button class="btn_delete" @click="removeRow(index, row.bf_id)">
                            <img src="@/assets/images/component/btn_edit_delete.png" alt="삭제"/>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="pwf_fieldset">
            <h4><img src="@/assets/images/component/ico_add2.png" alt="" class="ico" @click="addSetFolder"/> 폴더위치 <span
                    class="note">(폴더 위치 지정은 다음 형식이어야 합니다. C:\Users\(사용자 이름)\Desktop\)</span>
                <!--                <button class="btn_add" @click="addSetFolder">-->
                <!--                <img src="@/assets/images/component/ico_add2.png" alt="" class="ico" @click="addSetFolder"/>-->
                <!--                    <span class="txt">추가</span>-->
                <!--                </button>-->
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
                <tr v-for="(row, index) in ocrFolderList">
                    <td>
                        <button type="button" class="btn_variable"
                                @click="insertFolder(row.bf_folderpath, index, row.bf_id, 'folder')">변수삽입
                        </button>
                    </td>
                    <td v-if="row.bf_folderpath !='' ">
                        <button type="button" class="btn_variable"
                                @click="popFilter(row.bf_folderpath, index, row.bf_id)">필터추가
                        </button>
                    </td>
                    <td v-else>
                        <button type="button" class="btn_variable" disabled="disabled">필터추가</button>
                    </td>
                    <td><input type="text" v-model="row.bf_folderpath" :key="index" title="폴더 위치 입력"/></td>
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
        <div class="layer_popup preview" v-show="Ofile_show">
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
                <button type="button" class="btn_basic cancel" @click="ocrmodal">닫기</button>
            </div>
            <button class="btn_close" @click="ocrmodal">
                <img src="@/assets/images/component/btn_popup_close.png" alt="닫기"/>
            </button>
        </div>
        <!-- POPUP END -->
        <!-- Filter POPUP -->
        <div class="layer_popup preview" v-show="Ofilter_show">
            <h3>필터 추가</h3>
            <ul class="policy_filter_add">
                <li>
                    <h4><label><input type="checkbox" v-model="bf_extensionchk"/>확장자나 조건식에서 필터</label></h4>
                    <fieldset class="extension_condition" :disabled="bf_extensionchk == false">
                        <legend>확장자나 조건식 필터</legend>
                        <p class="ec_field">
                            <label for="efInclude">
                                <input type="radio" value="Y" v-model="bf_filetypechk"/>다음 파일 유형이나 표현식만을 대상으로 하는
                            </label>
                            <textarea name="" id="efInclude" v-model="efInclude" cols="30" rows="10"
                                      :disabled="bf_filetypechk == 'N'"
                                      placeholder="확장자는 세미 콜론으로 구분하여 주세요. 예(*, exe; *.html;* .doc)"></textarea>
                            <label><input type="checkbox" v-model="efIncludechk" :disabled="bf_filetypechk == 'N'"/>정규식</label>
                        </p>
                        </p>
                        <p class="ec_field">
                            <label for="efExclude">
                                <input type="radio" value="N" v-model="bf_filetypechk"/>다음 파일 유형이나 표현식을 제외
                            </label>
                            <textarea name="" id="efExclude" v-model="efExclude" cols="30" rows="10"
                                      :disabled="bf_filetypechk == 'Y'"
                                      placeholder="확장자는 세미 콜론으로 구분하여 주세요. 예(*, exe; *.html;* .doc)"></textarea>
                            <label><input type="checkbox" v-model="efExcludechk" :disabled="bf_filetypechk == 'Y'"/>정규식</label>
                        </p>
                    </fieldset>
                </li>
                <li>
                    <h4>
                        <label id="falFileSize">
                            <input type="checkbox" v-model="bf_filebackchk"/>큰 사이즈의 파일을 백업하지 않는
                        </label>
                    </h4>
                    <p class="limit_field size">
                        <input type="text" id="falFileSize" v-model="bf_size" @keyup="onKeyup"
                               :disabled="bf_filebackchk == false"/>
                        <span class="basic_select selectbox_ui">
					<b class="selected_txt"></b>
					<select title="파일단위" v-model="bf_volumechk"
                            v-bind:style="{display: bf_filebackchk == true ? 'block' : 'none'}">
						<option value="1">Byte</option>
						<option value="2">KB</option>
						<option value="3">MB</option>
						<option value="4">GB</option>
					</select>
				</span>
                    </p>
                </li>
                <li>
                    <h4><label id="falDate"><input type="checkbox" v-model="bf_datebackchk"/>오래된 날짜의 파일을 백업하지 않는</label>
                    </h4>
                    <p class="limit_field date">
				<span class="basic_datepicker">
                    <datetime ref="datePicker" v-model="bf_dateback" :disabled="bf_datebackchk == false"></datetime>
					<button type="button" @click="openDate" :disabled="bf_datebackchk == false">
                        <img src="@/assets/images/component/btn_calendar.png" alt="달력"/>
                    </button>
				</span>
                    </p>
                </li>
            </ul>
            <div class="btn_set">
                <div class="right">
                    <button type="button" class="btn_basic cancel" @click="popFilter">취소</button>
                    <button type="button" class="btn_basic submit" @click="save">적용</button>
                </div>
            </div>
            <button class="btn_close" @click="popFilter"><img
                    src="@/assets/images/component/btn_popup_close.png"
                    alt="닫기"/></button>
        </div>
        <!-- END Filter POPUP -->
    </div>
</template>

<script>
    import $ from "jquery";
    import {Datetime} from 'vue-datetime'
    import 'vue-datetime/dist/vue-datetime.css'
    import moment from 'moment'

    export default {
        data() {
            return {
                ocr_filedata: [],
                ocr_folderdata: [],
                filepath: '',
                insert_div: '',
                popindex: 0,
                bfid: null,
                layer_popup: false,
                bf_id: null,
                bf_type: 'O',
                Ofile_show: false,
                variableList: [],
                vcheck: this.filepath,
                index_div: '',
                Ofilter_show: false,
                bf_extensionchk: '',
                bf_filetypechk: '',
                bf_filebackchk: '',
                bf_size: '',
                bf_volumechk: '',
                bf_datebackchk: '',
                bf_dateback: '',
                efInclude: '',
                efIncludechk: '',
                efExclude: '',
                efExcludechk: '',
            }
        },
        components: {
            'datetime': Datetime
        },
        watch:{
            bfid() {
                if (this.bfid != undefined && this.bfid != 0) {
                    if (this.ocr_folderdata[this.index_div].bf_extensionchk == "Y") this.bf_extensionchk = true;
                    this.bf_filetypechk = this.ocr_folderdata[this.index_div].bf_filetypechk
                    this.fileserverchk = this.ocr_folderdata[this.index_div].bf_filetypechk
                    if (this.ocr_folderdata[this.index_div].bf_filetypechk == 'Y') {
                        if (this.ocr_folderdata[this.index_div].bf_regexchk == "Y") this.efIncludechk = true;
                        this.efInclude = this.ocr_folderdata[this.index_div].bf_expression
                    } else {
                        if (this.ocr_folderdata[this.index_div].bf_regexchk == "Y") this.efExcludechk = true;
                        this.efExclude = this.ocr_folderdata[this.index_div].bf_expression
                    }
                    if (this.ocr_folderdata[this.index_div].bf_filebackchk == "Y") this.bf_filebackchk = true;
                    this.bf_size = this.ocr_folderdata[this.index_div].bf_size
                    this.bf_volumechk = this.ocr_folderdata[this.index_div].bf_volumechk
                    if (this.ocr_folderdata[this.index_div].bf_datebackchk == "Y") this.bf_datebackchk = true;
                    this.bf_dateback = this.ocr_folderdata[this.index_div].bf_dateback
                }
            },
            Ofilter_show() {
                //filter popup update
                if (this.setPolicyData.ocrfolder[this.index_div].bf_extensionchk == "Y") {
                    this.bf_extensionchk = true
                } else {
                    this.bf_extensionchk = false
                }
                this.bf_filetypechk = this.setPolicyData.ocrfolder[this.index_div].bf_filetypechk

                if (this.setPolicyData.ocrfolder[this.index_div].bf_filetypechk == 'Y') {
                    if (this.setPolicyData.ocrfolder[this.index_div].bf_regexchk == "Y") {
                        this.efIncludechk = true;
                    } else {
                        this.efIncludechk = false;
                    }
                    this.efInclude = this.setPolicyData.ocrfolder[this.index_div].bf_expression
                } else {
                    if (this.setPolicyData.ocrfolder[this.index_div].bf_regexchk == "Y") {
                        this.efExcludechk = true;
                    } else {
                        this.efExcludechk = false;
                    }
                    this.efExclude = this.setPolicyData.ocrfolder[this.index_div].bf_expression
                }
                if (this.setPolicyData.ocrfolder[this.index_div].bf_filebackchk == "Y") {
                    this.bf_filebackchk = true
                } else {
                    this.bf_filebackchk = false
                }
                this.bf_size = this.setPolicyData.ocrfolder[this.index_div].bf_size
                this.bf_volumechk = this.setPolicyData.ocrfolder[this.index_div].bf_volumechk
                if (this.setPolicyData.ocrfolder[this.index_div].bf_datebackchk == "Y") {
                    this.bf_datebackchk = true;
                } else {
                    this.bf_datebackchk = false;
                }
                this.bf_dateback = this.setPolicyData.ocrfolder[this.index_div].bf_dateback
            }
        },
        computed: {
            ocrFileList() {
                return this.ocr_filedata
            },
            ocrFolderList() {
                return this.ocr_folderdata
            },
            setPolicyData() {
                return this.$store.state.management.policy.setPolicy
            }
        },
        methods: {
            addRow() {
                this.ocr_filedata.push({
                    bf_filepath: '',
                    bf_type: 'O',
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
            removeRow(index, bf_id) {
                this.ocr_filedata.splice(index, 1)
                this.setPolicyData.ocrfiles = this.ocr_filedata
            },
            addFolder() {
                this.ocr_folderdata.push({
                    bf_folderpath: ''
                })
            },
            removeFolder(index) {
                this.ocr_folderdata.splice(index, 1)
            },
            addSetRow() {
                this.ocr_filedata.push({
                    bf_filepath: '',
                    bf_id: undefined
                })
            },
            addSetFolder() {
                this.ocr_folderdata.push({
                    bf_folderpath: '',
                    bf_id: undefined
                })
            },
            ocrmodal(filepath, index, bf_id, div) {
                this.index_div = index
                this.vcheck = filepath
                this.bfid = bf_id
                this.insert_div = div
                this.Ofile_show = !this.Ofile_show;
            },
            insertFolder(filepath, index, bf_id, div) {
                //MODAL
                this.index_div = index
                this.vcheck = filepath
                this.bfid = bf_id
                this.insert_div = div
                this.Ofile_show = !this.Ofile_show;
            },
            popFilter(filepath, index, bf_id) {
                this.index_div = index
                this.vcheck = filepath
                this.insert_div = 'filter'
                this.Ofilter_show = !this.Ofilter_show;
            },
            sendVariable() {
                this.ocr_filedata[this.index_div].bf_filepath = this.vcheck;
                this.setPolicyData.ocrfiles = [];
                this.setPolicyData.ocrfiles = this.ocr_filedata
                this.Ofile_show = !this.Ofile_show;
            },
            sendFolderVariable() {
                this.ocr_folderdata[this.index_div].bf_folderpath = this.vcheck;
                this.setPolicyData.ocrfolder = [];
                this.setPolicyData.ocrfolder = this.ocr_folderdata
                this.Ofile_show = !this.Ofile_show;
            },
            onKeyup(event) {
                //숫자만입력
                event.target.value = event.target.value.replace(/[^0-9]/g, '')
                if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
                    const next = event.target.nextElementSibling
                    if (next === null) return
                    event.target.nextElementSibling.focus()
                }
                return
            },
            openDate() {
                //datePicker OPEN
                this.$refs.datePicker.open(event)
            },
            init() {
                const bpId = this.$route.params.bp_id
                let requestData = {
                    bpId: bpId
                }
                axios.get('/management/policy_ocrFilelist/', {params: {bpId: requestData.bpId}}
                ).then((response) => {
                    this.ocr_filedata = response.data.ocrFile
                    this.ocr_folderdata = response.data.ocrFolder
                    this.setPolicyData.ocrfolder = response.data.ocrFolder
                })

                //변수 POPUP DATA
                axios.get('/management/policy_variablelist/'
                ).then((response) => {
                    this.variableList = response.data
                })
            },
            save() {
                //Filter data update
                this.setPolicyData.ocrfolder[this.index_div].bf_extensionchk = this.bf_extensionchk ? 'Y' : 'N'
                if (this.bf_filetypechk == 'Y') {
                    this.setPolicyData.ocrfolder[this.index_div].bf_regexchk = this.efIncludechk ? 'Y' : 'N'
                    this.setPolicyData.ocrfolder[this.index_div].bf_expression = this.efInclude
                } else {
                    this.setPolicyData.ocrfolder[this.index_div].bf_regexchk = this.efExcludechk ? 'Y' : 'N'
                    this.setPolicyData.ocrfolder[this.index_div].bf_expression = this.efExclude
                }
                this.setPolicyData.ocrfolder[this.index_div].bf_filebackchk = this.bf_filebackchk ? 'Y' : 'N'
                this.setPolicyData.ocrfolder[this.index_div].bf_size = this.bf_size
                this.setPolicyData.ocrfolder[this.index_div].bf_volumechk = this.bf_volumechk
                this.setPolicyData.ocrfolder[this.index_div].bf_datebackchk = this.bf_datebackchk ? 'Y' : 'N'
                this.setPolicyData.ocrfolder[this.index_div].bf_dateback =
                    this.bf_dateback ? moment(String(this.bf_dateback)).format('YYYY-MM-DD') : null
                this.Ofilter_show = !this.Ofilter_show;
            },
        },
        created() {
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
        },
    }
</script>

<style scoped>
    .layer_popup {
        display: block;
    }
</style>

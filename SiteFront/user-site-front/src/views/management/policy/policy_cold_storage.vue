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
                    <input type="checkbox" v-model="desktop"/><img src="@/assets/images/sub/ico_pwf_desktop.png" alt=""
                                                                   class="ico"/>데스크탑
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" v-model="document"/><img src="@/assets/images/sub/ico_pwf_document.png"
                                                                    alt="" class="ico"/>문서
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" v-model="afile"/><img src="@/assets/images/sub/ico_pwf_account.png" alt=""
                                                                 class="ico"/>회계파일
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
                <span class="note">(폴더 위치 지정은 다음 형식이어야 합니다. C:\Users\(사용자 이름)\Desktop\)</span>
            </h4>
            <table>
                <caption>파일위치</caption>
                <colgroup>
                    <col style="width:104px;"/>
                    <col style="width:*;"/>
                    <col style="width:40px;"/>
                </colgroup>
                <tbody>
                <tr v-for="(row, index) in coldFileList">
                    <td>
                        <button type="button" class="btn_variable"
                                @click="insertColdVariable(row.bf_filepath, index, row.bf_id, 'file')">
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
                <tr v-for="(row, index) in coldFolderList">
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
        <div class="layer_popup preview" v-show="Cfile_show">
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
                <button type="button" class="btn_basic cancel" @click="insertColdVariable">닫기</button>
            </div>
            <button class="btn_close" @click="insertColdVariable">
                <img src="@/assets/images/component/btn_popup_close.png" alt="닫기"/>
            </button>
        </div>
        <!-- POPUP END -->
        <!-- Filter POPUP -->
        <div class="layer_popup preview" v-show="cfilter_show">
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
    import {Datetime} from 'vue-datetime'
    import 'vue-datetime/dist/vue-datetime.css'
    import moment from 'moment'


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
                CfileList: [],
                CfolderList: [],
                cold_filedata: [],
                layer_popup: false,
                cold_folderdata: [],
                title: '',
                filepath: '',
                index: '',
                insert_div: '',
                popindex: 0,
                bfid: null,
                bf_type: 'C',
                index_div: '',
                Cfile_show: false,
                variableList: [],
                vcheck: this.filepath,
                cfilter_show: false,
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
        computed: {
            coldPolicyList() {
                return this.$store.state.management.policy.policyDataList.coldPolicydata
            },
            coldFileList() {
                //return this.cold_filedata.coldFile
                return this.CfileList
            },
            coldFolderList() {
                // return this.cold_filedata.coldFolder
                return this.CfolderList
            },
            setPolicyData() {
                return this.$store.state.management.policy.setPolicy
            }
        },
        watch: {
            desktop() {
                if (!this.desktop == true) {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'C') {
                            fm.wallpaperchk = 'N';
                            this.selected.splice(0, 1, 'N')
                        }
                    }
                } else {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'C') {
                            fm.wallpaperchk = 'Y';
                            this.selected.splice(0, 1, 'Y')
                        }
                    }
                }
            },
            document() {
                if (!this.document == true) {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'C') {
                            fm.documentchk = 'N';
                            this.selected.splice(1, 1, 'N')
                        }
                    }
                } else {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'C') {
                            fm.documentchk = 'Y';
                            this.selected.splice(1, 1, 'Y')
                        }
                    }
                }
            },
            afile() {
                if (!this.afile == true) {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'C') {
                            fm.acntnfilechk = 'N';
                            this.selected.splice(2, 1, 'N')
                        }
                    }
                } else {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'C') {
                            fm.acntnfilechk = 'Y';
                            this.selected.splice(2, 1, 'Y')
                        }
                    }
                }
            },
            bookmark() {
                if (!this.bookmark == true) {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'C') {
                            fm.bookmarkchk = 'N';
                            this.selected.splice(3, 1, 'N')
                        }
                    }
                } else {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'C') {
                            fm.bookmarkchk = 'Y';
                            this.selected.splice(3, 1, 'Y')
                        }
                    }
                }
            },
            picture() {
                if (!this.picture == true) {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'C') {
                            fm.imagechk = 'N';
                            this.selected.splice(4, 1, 'N')
                        }
                    }
                } else {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'C') {
                            fm.imagechk = 'Y';
                            this.selected.splice(4, 1, 'Y')
                        }
                    }
                }
            },
            music() {
                if (!this.music == true) {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'C') {
                            fm.musicchk = 'N';
                            this.selected.splice(5, 1, 'N')
                        }
                    }
                } else {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'C') {
                            fm.musicchk = 'Y';
                            this.selected.splice(5, 1, 'Y')
                        }
                    }
                }
            },
            video() {
                if (!this.video == true) {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'C') {
                            fm.videochk = 'N';
                            this.selected.splice(6, 1, 'N')
                        }
                    }
                } else {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'C') {
                            fm.videochk = 'Y';
                            this.selected.splice(6, 1, 'Y')
                        }
                    }
                }
            },
            ebook() {
                if (!this.ebook == true) {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'C') {
                            fm.ebookchk = 'N';
                            this.selected.splice(7, 1, 'N')
                        }
                    }
                } else {
                    for (let fm of this.setPolicyData.policydata) {
                        if (fm.div == 'C') {
                            fm.ebookchk = 'Y';
                            this.selected.splice(7, 1, 'Y')
                        }
                    }
                }
            },
            selected() {
                var counter = 0;
                for (var i = 0; i < this.selected.length; i++) {
                    if (this.selected[i] === 'N') {
                        this.selected[i] = 'N';
                        counter += 1
                    } else {
                        this.selected[i] = 'Y';
                    }
                }
                if (counter > 0) {
                    this.selectAll = false
                } else {
                    this.selectAll = true
                }
            },
            bfid() {
                if (this.bfid != undefined && this.bfid != 0) {
                    if (this.CfolderList[this.index_div].bf_extensionchk == "Y") this.bf_extensionchk = true;
                    this.bf_filetypechk = this.CfolderList[this.index_div].bf_filetypechk
                    this.fileserverchk = this.CfolderList[this.index_div].bf_filetypechk
                    if (this.CfolderList[this.index_div].bf_filetypechk == 'Y') {
                        if (this.CfolderList[this.index_div].bf_regexchk == "Y") this.efIncludechk = true;
                        this.efInclude = this.CfolderList[this.index_div].bf_expression
                    } else {
                        if (this.CfolderList[this.index_div].bf_regexchk == "Y") this.efExcludechk = true;
                        this.efExclude = this.CfolderList[this.index_div].bf_expression
                    }
                    if (this.CfolderList[this.index_div].bf_filebackchk == "Y") this.bf_filebackchk = true;
                    this.bf_size = this.CfolderList[this.index_div].bf_size
                    this.bf_volumechk = this.CfolderList[this.index_div].bf_volumechk
                    if (this.CfolderList[this.index_div].bf_datebackchk == "Y") this.bf_datebackchk = true;
                    this.bf_dateback = this.CfolderList[this.index_div].bf_dateback
                }
            },
            cfilter_show() {
                //filter popup update
                if (this.setPolicyData.coldfolderfiles[this.index_div].bf_extensionchk == "Y") {
                    this.bf_extensionchk = true
                } else {
                    this.bf_extensionchk = false
                }
                this.bf_filetypechk = this.setPolicyData.coldfolderfiles[this.index_div].bf_filetypechk

                if (this.setPolicyData.coldfolderfiles[this.index_div].bf_filetypechk == 'Y') {
                    if (this.setPolicyData.coldfolderfiles[this.index_div].bf_regexchk == "Y") {
                        this.efIncludechk = true;
                    } else {
                        this.efIncludechk = false;
                    }
                    this.efInclude = this.setPolicyData.coldfolderfiles[this.index_div].bf_expression
                } else {
                    if (this.setPolicyData.coldfolderfiles[this.index_div].bf_regexchk == "Y") {
                        this.efExcludechk = true;
                    } else {
                        this.efExcludechk = false;
                    }
                    this.efExclude = this.setPolicyData.coldfolderfiles[this.index_div].bf_expression
                }
                if (this.setPolicyData.coldfolderfiles[this.index_div].bf_filebackchk == "Y") {
                    this.bf_filebackchk = true
                } else {
                    this.bf_filebackchk = false
                }
                this.bf_size = this.setPolicyData.coldfolderfiles[this.index_div].bf_size
                this.bf_volumechk = this.setPolicyData.coldfolderfiles[this.index_div].bf_volumechk
                if (this.setPolicyData.coldfolderfiles[this.index_div].bf_datebackchk == "Y") {
                    this.bf_datebackchk = true;
                } else {
                    this.bf_datebackchk = false;
                }
                this.bf_dateback = this.setPolicyData.coldfolderfiles[this.index_div].bf_dateback
            }

        },
        methods: {
            init() {
                for (let i in this.coldPolicyList) {
                    if (this.coldPolicyList[i].pd_wallpaperchk == "Y") this.desktop = true;
                    if (this.coldPolicyList[i].pd_documentchk == "Y") this.document = true;
                    if (this.coldPolicyList[i].pd_acntnfilechk == "Y") this.afile = true;
                    if (this.coldPolicyList[i].pd_bookmarkchk == "Y") this.bookmark = true;
                    if (this.coldPolicyList[i].pd_imagechk == "Y") this.picture = true;
                    if (this.coldPolicyList[i].pd_musicchk == "Y") this.music = true;
                    if (this.coldPolicyList[i].pd_videochk == "Y") this.video = true;
                    if (this.coldPolicyList[i].pd_ebookchk == "Y") this.ebook = true;
                }
            },
            addRow() {
                this.coldFileList.push({
                    bf_id: null,
                    bf_type: 'C',
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
                this.coldFolderList.push({
                    bf_id: null,
                    bf_type: 'C',
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
            removeRow(index) {
                this.CfileList.splice(index, 1)
                this.setPolicyData.policycoldfiles = []
                this.setPolicyData.policycoldfiles = this.CfileList
            },
            removeFolder(index) {
                this.CfolderList.splice(index, 1)
            },
            insertColdVariable(filepath, index, bf_id, div) {
                this.index_div = index
                this.vcheck = filepath
                this.bfid = bf_id
                this.insert_div = div
                this.Cfile_show = !this.Cfile_show;
            },
            insertFolder(filepath, index, bf_id, div) {
                //MODAL
                this.index_div = index
                this.vcheck = filepath
                this.bfid = bf_id
                this.insert_div = div
                this.Cfile_show = !this.Cfile_show;
            },
            popFilter(filepath, index) {
                this.index_div = index
                this.vcheck = filepath
                this.insert_div = 'filter'
                this.cfilter_show = !this.cfilter_show;
            },
            select_all() {
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
                    if (response.data.coldPolicydata != '') {
                        this.setPolicyData.policydata[1].id = response.data.coldPolicydata[0].pd_id
                        if (response.data.coldPolicydata[0].pd_wallpaperchk == "Y") {
                            this.desktop = true;
                            this.selected.push(response.data.coldPolicydata[0].pd_wallpaperchk);
                        }
                        if (response.data.coldPolicydata[0].pd_documentchk == "Y") {
                            this.document = true;
                            this.selected.push(response.data.coldPolicydata[0].pd_documentchk);
                        }
                        if (response.data.coldPolicydata[0].pd_acntnfilechk == "Y") {
                            this.afile = true;
                            this.selected.push(response.data.coldPolicydata[0].pd_acntnfilechk);
                        }
                        if (response.data.coldPolicydata[0].pd_bookmarkchk == "Y") {
                            this.bookmark = true;
                            this.selected.push(response.data.coldPolicydata[0].pd_bookmarkchk);
                        }
                        if (response.data.coldPolicydata[0].pd_imagechk == "Y") {
                            this.picture = true;
                            this.selected.push(response.data.coldPolicydata[0].pd_imagechk);
                        }
                        if (response.data.coldPolicydata[0].pd_musicchk == "Y") {
                            this.music = true;
                            this.selected.push(response.data.coldPolicydata[0].pd_musicchk);
                        }
                        if (response.data.coldPolicydata[0].pd_videochk == "Y") {
                            this.video = true;
                            this.selected.push(response.data.coldPolicydata[0].pd_videochk);
                        }
                        if (response.data.coldPolicydata[0].pd_ebookchk == "Y") {
                            this.ebook = true;
                            this.selected.push(response.data.coldPolicydata[0].pd_ebookchk);
                        }
                        if (this.selected.length == 8) {
                            this.selectAll = true;
                        }
                    }
                })
            },
            addSetRow() {
                this.CfileList.push({
                    bf_filepath: '',
                    bf_id: undefined
                })
            },
            addSetFolder() {
                this.CfolderList.push({
                    bf_folderpath: '',
                    bf_id: undefined
                })
                this.setPolicyData.coldfolderfiles.push({
                    bf_folderpath: '',
                    bf_id: undefined
                })
            },
            searchList() {
                const bpId = this.$route.params.bp_id
                let requestData = {
                    bpId: bpId

                }
                axios.get('/management/policy_coldFilelist/',
                    {
                        params: {
                            bpId: requestData.bpId
                        }
                    }
                ).then((response) => {
                    this.CfileList = response.data.coldFile
                    this.CfolderList = response.data.coldFolder
                    this.setPolicyData.coldfolderfiles = response.data.coldFolder
                })

                //변수 POPUP DATA
                axios.get('/management/policy_variablelist/'
                ).then((response) => {
                    this.variableList = response.data
                })
            },
            sendVariable() {
                this.CfileList[this.index_div].bf_filepath = this.vcheck;
                this.setPolicyData.policycoldfiles = [];
                this.setPolicyData.policycoldfiles = this.CfileList
                this.Cfile_show = !this.Cfile_show;
            },
            sendFolderVariable() {
                this.CfolderList[this.index_div].bf_folderpath = this.vcheck;
                this.setPolicyData.coldfolderfiles = [];
                this.setPolicyData.coldfolderfiles = this.CfolderList
                this.Cfile_show = !this.Cfile_show;
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
            save() {
                //Filter data update
                this.setPolicyData.coldfolderfiles[this.index_div].bf_extensionchk = this.bf_extensionchk ? 'Y' : 'N'
                if (this.bf_filetypechk == 'Y') {
                    this.setPolicyData.coldfolderfiles[this.index_div].bf_regexchk = this.efIncludechk ? 'Y' : 'N'
                    this.setPolicyData.coldfolderfiles[this.index_div].bf_expression = this.efInclude
                } else {
                    this.setPolicyData.coldfolderfiles[this.index_div].bf_regexchk = this.efExcludechk ? 'Y' : 'N'
                    this.setPolicyData.coldfolderfiles[this.index_div].bf_expression = this.efExclude
                }
                this.setPolicyData.coldfolderfiles[this.index_div].bf_filebackchk = this.bf_filebackchk ? 'Y' : 'N'
                this.setPolicyData.coldfolderfiles[this.index_div].bf_size = this.bf_size
                this.setPolicyData.coldfolderfiles[this.index_div].bf_volumechk = this.bf_volumechk
                this.setPolicyData.coldfolderfiles[this.index_div].bf_datebackchk = this.bf_datebackchk ? 'Y' : 'N'
                this.setPolicyData.coldfolderfiles[this.index_div].bf_dateback =
                    this.bf_dateback ? moment(String(this.bf_dateback)).format('YYYY-MM-DD') : null
                this.cfilter_show = !this.cfilter_show;
            },
        },
        created() {
            this.bf_volumechk = 4
            this.setPolicyData.policycoldfiles = [];
            this.setPolicyData.coldfolderfiles = [];

            const bpId = this.$route.params.bp_id
            let requestData = {
                bpId: bpId

            }
            this.checkboxChecked(requestData);
            this.searchList()

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

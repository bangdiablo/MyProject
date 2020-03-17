<template>
    <div class="layer_popup preview" v-if="visible">
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
                        <label><input type="checkbox" v-model="efIncludechk"
                                      :disabled="bf_filetypechk == 'N'"/>정규식</label>
                    </p>
                    </p>
                    <p class="ec_field">
                        <label for="efExclude">
                            <input type="radio" value="N" v-model="bf_filetypechk"/>다음 파일 유형이나 표현식을 제외
                        </label>
                        <textarea name="" id="efExclude" v-model="efExclude" cols="30" rows="10"
                                  :disabled="bf_filetypechk == 'Y'"
                                  placeholder="확장자는 세미 콜론으로 구분하여 주세요. 예(*, exe; *.html;* .doc)"></textarea>
                        <label><input type="checkbox" v-model="efExcludechk"
                                      :disabled="bf_filetypechk == 'Y'"/>정규식</label>
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
                <button type="button" class="btn_basic cancel" @click="$emit('update:visible', false)">취소</button>
                <button type="button" class="btn_basic submit" @click="save">적용</button>
            </div>
        </div>
        <button class="btn_close" @click="$emit('update:visible', false)"><img
                src="@/assets/images/component/btn_popup_close.png"
                alt="닫기"/></button>
    </div>
</template>

<script>
    import $ from "jquery";
    import {Datetime} from 'vue-datetime'
    import 'vue-datetime/dist/vue-datetime.css'
    import moment from 'moment'
    import {EventBus} from "../../../plugins/event-bus"


    export default {
        name: "policy_coldfilter_popup",
        props: {
            visible: {
                type: Boolean,
                require: true,
                default: false
            },
            filter_modal: {
                type: String,
                require: false
            },
            title: {
                type: String,
                require: false
            },
            filepath: {
                type: String,
                require: false
            },
            index: {
                type: Number,
                require: false
            },
            bfid: {
                type: Number,
                require: false
            },
            insert_div: {
                type: String,
                require: false
            }
        },
        data() {
            return {
                bf_extensionchk: false,
                bf_filetypechk: '',
                efInclude: '',
                efIncludechk: '',
                efExclude: '',
                efExcludechk: '',
                bf_filebackchk: '',
                bf_size: '',
                bf_volumechk: '',
                bf_datebackchk: '',
                bf_dateback: '',
                coldFilter: [],
                fileserverchk: '',
                rows: [{bf_filepath: ''}],
                GfolderList: [],
                bf_iddiv: '',
                index_cold: '',
            }
        },
        components: {
            'datetime': Datetime
        },
        computed: {
            setPolicyData() {
                return this.$store.state.management.policy.setPolicy
            },
            coldFolderList() {
                // return this.$store.state.management.policy.policyDataList.generalFolder
                return this.coldFilter
            },
        },
        watch: {
            bf_extensionchk() {
                if (!this.fileserverchk) {
                    if (this.bf_extensionchk)
                        this.bf_filetypechk = 'Y'
                    else
                        this.bf_filetypechk = ''
                }
            },
            bf_filetypechk() {
                if (this.bf_filetypechk == 'N') {
                    this.efInclude = ''
                    this.efIncludechk = false
                } else {
                    this.efExclude = ''
                    this.efExcludechk = false
                }
            },
            bf_filebackchk() {
                if (!this.bf_filebackchk) {
                    this.bf_size = ''
                    this.bf_volumechk = 4
                }
            },
            bfid() {
                if (this.bfid != undefined && this.bfid != 0) {
                    if (this.coldFilter[this.index].bf_extensionchk == "Y") this.bf_extensionchk = true;
                    this.bf_filetypechk = this.coldFilter[this.index].bf_filetypechk
                    this.fileserverchk = this.coldFilter[this.index].bf_filetypechk
                    if (this.coldFilter[this.index].bf_filetypechk == 'Y') {
                        if (this.coldFilter[this.index].bf_regexchk == "Y") this.efIncludechk = true;
                        this.efInclude = this.coldFilter[this.index].bf_expression
                    } else {
                        if (this.coldFilter[this.index].bf_regexchk == "Y") this.efExcludechk = true;
                        this.efExclude = this.coldFilter[this.index].bf_expression
                    }
                    if (this.coldFilter[this.index].bf_filebackchk == "Y") this.bf_filebackchk = true;
                    this.bf_size = this.coldFilter[this.index].bf_size
                    this.bf_volumechk = this.coldFilter[this.index].bf_volumechk
                    if (this.coldFilter[this.index].bf_datebackchk == "Y") this.bf_datebackchk = true;
                    this.bf_dateback = this.coldFilter[this.index].bf_dateback
                }
            },
            index() {
                console.log("insert_div====", this.insert_div)
                if (this.insert_div == 'folder') {
                    this.coldFilter = this.setPolicyData.coldfolderfiles
                    if (this.setPolicyData.coldfolderfiles[this.index].bf_extensionchk == "Y") {
                        this.bf_extensionchk = true
                    } else {
                        this.bf_extensionchk = false
                    }
                    this.bf_filetypechk = this.setPolicyData.coldfolderfiles[this.index].bf_filetypechk
                    // this.fileserverchk = this.setPolicyData.coldfolderfiles[this.ocrfolderindex].bf_filetypechk

                    if (this.setPolicyData.coldfolderfiles[this.index].bf_filetypechk == 'Y') {
                        //this.bf_filetypechk = 'Y'
                        // this.bf_filetypechk = this.setPolicyData.coldfolderfiles[this.ocrfolderindex].bf_filetypechk
                        if (this.setPolicyData.coldfolderfiles[this.index].bf_regexchk == "Y") {
                            this.efIncludechk = true;
                        } else {
                            this.efIncludechk = false;
                        }
                        this.efInclude = this.setPolicyData.coldfolderfiles[this.index].bf_expression
                    } else {
                        //this.bf_filetypechk = 'N'
                        if (this.setPolicyData.coldfolderfiles[this.index].bf_regexchk == "Y") {
                            this.efExcludechk = true;
                        } else {
                            this.efExcludechk = false;
                        }
                        this.efExclude = this.setPolicyData.coldfolderfiles[this.index].bf_expression
                    }
                    if (this.setPolicyData.coldfolderfiles[this.index].bf_filebackchk == "Y") {
                        this.bf_filebackchk = true
                    } else {
                        this.bf_filebackchk = false
                    }
                    this.bf_size = this.setPolicyData.coldfolderfiles[this.index].bf_size
                    this.bf_volumechk = this.setPolicyData.coldfolderfiles[this.index].bf_volumechk
                    if (this.setPolicyData.coldfolderfiles[this.index].bf_datebackchk == "Y") {
                        this.bf_datebackchk = true;
                    } else {
                        this.bf_datebackchk = false;
                    }
                    this.bf_dateback = this.setPolicyData.coldfolderfiles[this.index].bf_dateback
                }
            }
        },
        methods: {
            openDate() {
                this.$refs.datePicker.open(event)
            },
            save() {
                // console.log("this.coldFilter==", this.coldFilter)
                // console.log("this.setPolicyData.coldfolderfiles==", this.setPolicyData.coldfolderfiles)
                // if (this.bfid != null) {
                //     this.coldFilter[this.index].bf_extensionchk = this.bf_extensionchk ? 'Y' : 'N'
                //     this.coldFilter[this.index].bf_filetypechk = this.bf_filetypechk
                //     this.coldFilter[this.index].bf_folderpath = this.filepath
                //     if (this.bf_filetypechk == 'Y') {
                //         this.coldFilter[this.index].bf_regexchk = this.efIncludechk ? 'Y' : 'N'
                //         this.coldFilter[this.index].bf_expression = this.efInclude
                //     } else {
                //         this.coldFilter[this.index].bf_regexchk = this.efExcludechk ? 'Y' : 'N'
                //         this.coldFilter[this.index].bf_expression = this.efExclude
                //     }
                //     this.coldFilter[this.index].bf_filebackchk = this.bf_filebackchk ? 'Y' : 'N'
                //     this.coldFilter[this.index].bf_size = this.bf_size
                //     this.coldFilter[this.index].bf_volumechk = this.bf_volumechk
                //     this.coldFilter[this.index].bf_datebackchk = this.bf_datebackchk ? 'Y' : 'N'
                //     this.coldFilter[this.index].bf_dateback = this.bf_dateback ? moment(String(this.bf_dateback)).format('YYYY-MM-DD') : null
                //     this.coldFilter = this.this.setPolicyData.coldfolderfiles
                //     this.$emit('close')
                // } else {
                this.setPolicyData.coldfolderfiles[this.index].bf_extensionchk = this.bf_extensionchk ? 'Y' : 'N'
                if (this.bf_filetypechk == 'Y') {
                    this.setPolicyData.coldfolderfiles[this.index].bf_regexchk = this.efIncludechk ? 'Y' : 'N'
                    this.setPolicyData.coldfolderfiles[this.index].bf_expression = this.efInclude
                } else {
                    this.setPolicyData.coldfolderfiles[this.index].bf_regexchk = this.efExcludechk ? 'Y' : 'N'
                    this.setPolicyData.coldfolderfiles[this.index].bf_expression = this.efExclude
                }
                this.setPolicyData.coldfolderfiles[this.index].bf_filebackchk = this.bf_filebackchk ? 'Y' : 'N'
                this.setPolicyData.coldfolderfiles[this.index].bf_size = this.bf_size
                this.setPolicyData.coldfolderfiles[this.index].bf_volumechk = this.bf_volumechk
                this.setPolicyData.coldfolderfiles[this.index].bf_datebackchk = this.bf_datebackchk ? 'Y' : 'N'
                this.setPolicyData.coldfolderfiles[this.index].bf_dateback = this.bf_dateback ? moment(String(this.bf_dateback)).format('YYYY-MM-DD') : null
                this.coldFilter = this.setPolicyData.coldfolderfiles
                this.$emit('update:visible', false);
                // }
            },
            searchList() {
                console.log("responsedata======", this.$route.params.bp_id)
                const bpId = this.$route.params.bp_id
                let requestData = {
                    bpId: bpId

                }
                axios.get('/management/policy_editlist/',
                    {
                        params: {
                            bpId: requestData.bpId
                        }
                    }
                ).then((response) => {
                    this.coldFilter = response.data.coldFolder
                    this.setPolicyData.coldfolderfiles = response.data.coldFolder
                    console.log("responsedata======", response.data.coldFolder)
                })
            },
            onKeyup(event) {
                event.target.value = event.target.value.replace(/[^0-9]/g, '')
                // console.log(event.target.value)
                if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
                    const next = event.target.nextElementSibling
                    if (next === null) return
                    event.target.nextElementSibling.focus()
                }
                return
            },
        },
        created() {
            this.bf_volumechk = 4

            EventBus.$on("coldpopFilter_bf_id", data => {
                this.bf_iddiv = data.bf_id
            })
            // this.index_cold = this.index
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
        updated() {
            // var jQuery = require('jquery')
            //셀렉트박스 UI
            jQuery(".selectbox_ui").each(function () {
                initSelectBox(jQuery(this)) //비동기로 셀렉트 박스를 만들었을 경우 initSelectBox(jQuery("#아이디")) 로 실행시켜줘야 함
            });
        },
    }
</script>

<style scoped>
    .layer_popup {
        display: block;
    }
</style>

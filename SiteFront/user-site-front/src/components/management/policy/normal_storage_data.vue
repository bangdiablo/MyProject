<template>
    <div class="policy_write_form">
        <h3>{{ $t('policy.general.recommend_backup') }}</h3>
        <ul class="pwf_check_list">
            <li class="all">
                <label>
                    <input type="checkbox"/>{{ $t('policy.general.select_all')
                    }}
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" v-model="desktop"/>
                    <img src="@/assets/images/sub/ico_pwf_desktop.png" alt="" class="ico"/>{{$t('policy.general.desktop')
                    }}
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" v-model="document"/><img src="@/assets/images/sub/ico_pwf_document.png"
                                                                    alt="" class="ico"/>{{
                    $t('policy.general.document') }}
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" v-model="afile"/><img src="@/assets/images/sub/ico_pwf_account.png" alt=""
                                                                 class="ico"/>{{
                    $t('policy.general.afile') }}
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" v-model="bookmark"/><img src="@/assets/images/sub/ico_pwf_bookmark.png"
                                                                    alt="" class="ico"/>{{
                    $t('policy.general.bookmark') }}
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" v-model="picture"/><img src="@/assets/images/sub/ico_pwf_photo.png" alt=""
                                                                   class="ico"/>{{
                    $t('policy.general.picture') }}
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" v-model="music"/><img src="@/assets/images/sub/ico_pwf_music.png" alt=""
                                                                 class="ico"/>{{
                    $t('policy.general.music') }}
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" v-model="video"/><img src="@/assets/images/sub/ico_pwf_video.png" alt=""
                                                                 class="ico"/>{{
                    $t('policy.general.video') }}
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" v-model="ebook"/><img src="@/assets/images/sub/ico_pwf_nycard.png" alt=""
                                                                 class="ico"/>{{
                    $t('policy.general.card') }}
                </label>
            </li>
        </ul>
        <div class="pwf_fieldset">
            <h4>{{ $t('policy.general.fileLocation') }} <span class="note">{{ $t('policy.general.file_note') }}</span>
            </h4>
            <table>
                <caption>{{ $t('policy.general.fileLocation') }}</caption>
                <colgroup>
                    <col style="width:104px;"/>
                    <col style="width:*;"/>
                    <col style="width:40px;"/>
                </colgroup>
                <tbody>
                <tr>
                    <td>
                        <button type="button" class="btn_variable" @click="insertVariable">{{
                            $t('policy.general.insert_var') }}111
                        </button>
                    </td>
                    <td><input type="text" :title="$t('policy.general.folderLocation_insert')"
                               :value="generalFileList.bf_filepath"/></td>
                    <td>
                        <button class="btn_add" @click="addRow"><img src="@/assets/images/sub/btn_pwf_add.png"
                                                                     alt="추가"/></button>
                    </td>
                </tr>
                <tr v-for="(row, index) in rows">
                    <td>
                        <button type="button" class="btn_variable" @click="insertVariable">{{
                            $t('policy.general.insert_var') }}{{index}}
                        </button>
                    </td>
                    <td><input type="text" :title="$t('policy.general.folderLocation_insert')"
                               v-model="row.bf_filepath"/></td>
                    <td>
                        <button class="btn_delete" @click="removeRow(index)"><img
                                src="@/assets/images/component/btn_edit_delete.png" alt="삭제"/>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="pwf_fieldset">
            <h4>{{ $t('policy.general.folderLocation') }} <span class="note">{{ $t('policy.general.file_note') }}</span>
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
                <tr>
                    <td>
                        <button type="button" class="btn_variable">{{ $t('policy.general.insert_var') }}</button>
                    </td>
                    <td>
                        <button type="button" class="btn_variable">{{ $t('policy.general.filterAdd') }}</button>
                    </td>
                    <td><input type="text" :title="$t('policy.general.folderLocation_insert')"/></td>
                    <td>
                        <button class="btn_add"><img src="@/assets/images/sub/btn_pwf_add.png" alt="추가"/></button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button type="button" class="btn_variable">{{ $t('policy.general.insert_var') }}</button>
                    </td>
                    <td>
                        <button type="button" class="btn_variable" disabled="disabled">{{ $t('policy.general.filterAdd')
                            }}
                        </button>
                    </td>
                    <td><input type="text" :title="$t('policy.general.folderLocation_insert')"/></td>
                    <td>
                        <button class="btn_delete"><img src="@/assets/images/component/btn_edit_delete.png" alt="삭제"/>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import $ from "jquery";
    import insertVariable from './po'

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
                rows: []
            }
        },
        components: {
            appMyModal: insertVariable,
        },
        computed: {
            policyData() {
                return this.$store.state.management.policy.setPolicy.generalpolicydata
            },
            coldPolicyList() {
                return this.$store.state.management.policy.policyDataList.generalPolicydata[0]
            },
            generalFileList() {
                return this.$store.state.management.policy.policyDataList.generalFile[0]
            }
        },
        methods: {
            addRow() {
                this.rows.push({
                    bf_filepath: ''
                })
            },
            removeRow(index) {
                this.rows.splice(index, 1)
            },
            insertVariable() {
                //MODAL
                this.$modal.show(insertVariable, {
                    modal: this.$modal
                }, {
                    name: 'dynamic-modal',
                    width: '330px',
                    height: '130px',
                    draggable: false,
                })
            },
            select_all() {
                this.selected = [];
                console.log("select_all===", this.policyData)

                if (!this.selectAll) {
                    for (let i in this.coldPolicyList) {
                        this.desktop.push(this.coldPolicyList[i].pd_wallpaperchk);
                    }
                }
            },
        },
        created() {
            if (this.$route.name == 'policy_edit') {
                if (this.coldPolicyList.pd_wallpaperchk == "Y") this.desktop = true;
                if (this.coldPolicyList.pd_documentchk == "Y") this.document = true;
                if (this.coldPolicyList.pd_acntnfilechk == "Y") this.afile = true;
                if (this.coldPolicyList.pd_bookmarkchk == "Y") this.bookmark = true;
                if (this.coldPolicyList.pd_imagechk == "Y") this.picture = true;
                if (this.coldPolicyList.pd_musicchk == "Y") this.music = true;
                if (this.coldPolicyList.pd_videochk == "Y") this.video = true;
                if (this.coldPolicyList.pd_ebookchk == "Y") this.ebook = true;
            }
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

</style>

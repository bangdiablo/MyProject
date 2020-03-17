<template>
    <article id="contents" class="sub">
        <h2><img src="@/assets/images/sub/ico_tit_admin.png" alt="" class="ico"/>{{
            $t('policy.policy_writing.policy_create') }}</h2>
        <!--        <p class="location">ホーム <img src="@/assets/images/sub/bullet_location.png" alt=""/> 管理 <img-->
        <!--                src="@/assets/images/sub/bullet_location.png" alt=""/> ポリシー <img-->
        <!--                src="@/assets/images/sub/bullet_location.png"-->
        <!--                alt=""/> <strong>{{ $t('policy.policy_writing.policy_create') }}</strong></p>-->
        <div class="content">
            <p class="intro_guide">{{ $t('policy.policy_writing.new_policy_write') }}</p>
            <table class="board_view">
                <caption>{{ $t('policy.policy_writing.policy_name_write') }}</caption>
                <colgroup>
                    <col style="width:180px"/>
                    <col style="width:*"/>
                </colgroup>
                <tbody>
                <tr>
                    <th scope="row"><label for="policyName">{{ $t('policy.policy_writing.policy_name') }}</label></th>
                    <td>
                        <input ref="policyName" type="email" v-model="policyName" id="policyName" style="width: 100%"/>
                        <p class="error_msg">{{ $t('policy.policy_writing.policy_name_write_enter') }}</p>
                    </td>
                </tr>
                </tbody>
            </table>
            <ul class="category_navi inner">
                <li><a href="#" :class="{active:isCurrentTab(1)}" @click="currentTab=1">{{
                    $t('policy.policy_writing.general_storage') }}</a></li>
                <li><a href="#" :class="{active:isCurrentTab(2)}" @click="currentTab=2">{{
                    $t('policy.policy_writing.cold_storage') }}</a></li>
                <li><a href="#" :class="{active:isCurrentTab(3)}" @click="currentTab=3">{{
                    $t('policy.policy_writing.ocr_data') }}</a></li>
                <li><a href="#" :class="{active:isCurrentTab(4)}" @click="currentTab=4">{{
                    $t('policy.policy_writing.extensions') }}</a></li>
                <li><a href="#" :class="{active:isCurrentTab(5)}" @click="currentTab=5">{{
                    $t('policy.policy_writing.dual_backup') }}</a></li>
                <li><a href="#" :class="{active:isCurrentTab(6)}" @click="currentTab=6">{{
                    $t('policy.policy_writing.settings') }}</a></li>
                <li><a href="#" :class="{active:isCurrentTab(7)}" @click="currentTab=7">{{
                    $t('policy.policy_writing.permission') }}</a></li>
            </ul>
            <div>
                <div v-show="isCurrentTab(1)">
                    <NormalStorageData/>
                </div>
                <div v-show="isCurrentTab(2)">
                    <ColdStorageData/>
                </div>
                <div v-show="isCurrentTab(3)">
                    <OcrData/>
                </div>
                <div v-show="isCurrentTab(4)">
                    <Extension/>
                </div>
                <div v-show="isCurrentTab(5)">
                    <Dualbackup/>
                </div>
                <div v-show="isCurrentTab(6)">
                    <Setting/>
                </div>
                <div v-show="isCurrentTab(7)">
                    <Permission/>
                </div>
            </div>
            <div class="btn_content_set">
                <button type="button" class="btn_basic cancel" @click="$router.push('/management/policy')">{{
                    $t('policy.cancel') }}
                </button>
                <button type="button" class="btn_basic submit" @click="save">{{ $t('policy.save') }}</button>
            </div>
        </div>
    </article>


</template>

<script>
    import $ from "jquery";
    import NormalStorageData from "./create_nomalpolicy"
    import ColdStorageData from "./create_coldpolicy"
    import OcrData from "./create_ocrstorage"
    import Extension from "./create_extension"
    import Setting from "./create_setting"
    import Permission from "./create_permission"
    import Dualbackup from "./policy_dualbackup"
    // import NormalStorageCreate from "./create_nomalpolicy"

    export default {
        data() {
            return {
                currentTab: 1,
                ceateTab: 1,
                policy: [],
                policyName: ''
            }
        },
        computed: {
            userinfo() {
                return this.$store.state.header.user;
            },
            isCurrentTab() {
                return (value) => {
                    return this.currentTab == value;
                };
            },
            isCreateTab() {
                return (value) => {
                    return this.ceateTab == value;
                };
            },
            policyData() {
                return this.$store.state.management.policy.policyDataList.policyData
            },
            setPolicyData() {
                return this.$store.state.management.policy.setPolicy
            },
            generalFileList() {
                return this.$store.state.management.policy.policyDataList.generalFile
            },
        },
        methods: {
            save() {
                //EDITTEST
                // this.policyName = 'EDITTEST'
                const bpId = this.$route.params.bp_id
                if (this.policyName == null || this.policyName.trim() == "") {
                    alert("정책명을 입력해 주세요.")
                    this.$refs.policyName.focus()
                    return;
                }
                this.setPolicyData.name = this.policyName

                if (this.setPolicyData.policysetting.starttime == 'Invalid date' || this.setPolicyData.policysetting.starttime == '') {
                    this.setPolicyData.policysetting.starttime = null
                }
                if (this.setPolicyData.policysetting.endtime == 'Invalid date' || this.setPolicyData.policysetting.endtime == '') {
                    this.setPolicyData.policysetting.endtime = null
                }
                if (this.setPolicyData.policysetting.bandstarttime == 'Invalid date' || this.setPolicyData.policysetting.bandstarttime == '') {
                    this.setPolicyData.policysetting.bandstarttime = null
                }
                if (this.setPolicyData.policysetting.bandendtime == 'Invalid date' || this.setPolicyData.policysetting.bandendtime == '') {
                    this.setPolicyData.policysetting.bandendtime = null
                }
                // console.log("createPolicyData========", this.setPolicyData)
                if (confirm("저장하시겠습니끼?")) {
                    axios.post('/management/policy_create/', this.setPolicyData)
                        .then((response) => {
                            alert("저장되었습니다.")
                            this.$router.push('/management/policy')
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
            },
        },
        components: {
            NormalStorageData,
            ColdStorageData,
            OcrData,
            Extension,
            Setting,
            Permission,
            Dualbackup,
            // NormalStorageCreate
        },
        created() {
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
                this.policy = response.data
                this.$store.dispatch('management/policy/policyDataList', response.data);
            })

            // TODO 수정 시 기존 정보 가져오기
            // axios
            let data = {
                id: '',
                name: '',
                createdate: '',
                dualbackchk: '',
                dualpath: '',
                dualsizechk: '',
                dualsize: '',
                account_id: this.userinfo.accountid,
                policydata: [
                    {
                        id: '',
                        div: 'G',
                        emailchk: 'N',
                        wallpaperchk: 'N',
                        documentchk: 'N',
                        officechk: 'N',
                        acntnfilechk: 'N',
                        bookmarkchk: 'N',
                        imagechk: 'N',
                        musicchk: 'N',
                        videochk: 'N',
                        ebookchk: 'N',
                        createdate: '',
                        modifydate: ''
                    },
                    {
                        id: '',
                        div: 'C',
                        emailchk: 'N',
                        wallpaperchk: 'N',
                        documentchk: 'N',
                        officechk: 'N',
                        acntnfilechk: 'N',
                        bookmarkchk: 'N',
                        imagechk: 'N',
                        musicchk: 'N',
                        videochk: 'N',
                        ebookchk: 'N',
                        createdate: '',
                        modifydate: ''
                    },
                ],
                policyfiles: [],
                policyfolderfiles: [],
                policycoldfiles: [],
                policycoldfolder: [],
                ocrfile: [],
                ocrfolder: [],
                extensionfile: [],
                extensionfolder: [],
                policyextension: {
                    id: '',
                    shadowcopy: '',
                    blocklevel: '',
                    ebook: '',
                    office: '',
                    account: '',
                    exclusion: ''
                },
                policypermission: {
                    id: '',
                    pp_deletechk: 'Y',
                    pp_sharingchk: 'Y',
                    pp_editchk: 'Y',
                    pp_pwchk: 'Y',
                    pp_changechk: 'Y',
                    pp_clientdiv: 'A',
                    pp_pluspw: '',
                    pp_backupchk: 'N',
                    pp_pausechk: 'Y',
                    pp_terminate: 'Y',
                    pp_remove: 'Y'
                },
                policysetting: {
                    id: '',
                    hidefile: '',
                    battery: 'Y',
                    presentation: '',
                    policysetting: 'Y',
                    multithread: 'Y',
                    lan: 'Y',
                    wifi: 'Y',
                    lte: 'Y',
                    schedulediv: '',
                    stime: '',
                    itime: '',
                    backtime: '',
                    starttime: null,
                    endtimechk: '',
                    endtime: null,
                    weekday: '',
                    netdiv: '',
                    upspeed: '',
                    banddiv: '',
                    bandstarttime: null,
                    bandendtime: null,
                }
            };

            this.$store.dispatch('management/policy/setPolicy', data);

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

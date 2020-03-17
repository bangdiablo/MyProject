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
                        <input type="email" @input="updateName($event.target.value)" style="width: 100%"
                               v-for="(row, index) in policyData"
                               :value="row.bp_name"/>
                        <p class="error_msg">{{ $t('policy.policy_writing.policy_name_write_enter') }}</p>
                    </td>
                </tr>
                </tbody>
            </table>
            <!--            <ul v-if="this.$route.name == 'policy_edit'" class="category_navi inner">-->
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
    import NormalStorageData from "./policy_normal_storage"
    import ColdStorageData from "./policy_cold_storage"
    import OcrData from "./policy_ocr_storage"
    import Extension from "./policy_extension"
    import Setting from "./policy_setting"
    import Permission from "./policy_permission"
    import Dualbackup from "./policy_dualbackup"
    import NormalStorageCreate from "./create_nomalpolicy"

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
                // console.log("state == ", this.$store.state.management.policy.policyDataList.policyData)
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
            updateName(value) {
                // console.log("value ========", value)
                // this.policyName = value
                this.setPolicyData.name = value
                this.policyData[0].bp_name = value
            },
            save() {
                //EDITTEST
                // this.policyName = 'EDITTEST'
                const bpId = this.$route.params.bp_id
                if (this.policyName == null || this.policyName.trim() == "") {
                    alert("정책명을 입력해 주세요.")
                    this.$refs.policyName.focus()
                    return;
                }
                console.log("edit data ========", this.setPolicyData)
                // this.setPolicyData.name = this.policyName

                if (this.$route.name == 'policy_edit') {
                    this.setPolicyData.id = bpId

                    if (confirm("수정하시겠습니끼?")) {
                        this.generalchk()
                        this.generalfile_save()
                        this.generalfolder_save()
                        this.coldfile_save()
                        this.coldfolder_save()
                        this.ocrfile_save()
                        this.ocrfolder_save()
                        this.policyextension()
                        this.extensionfolder()
                        this.extensionfiles()
                        this.setting_save()
                        this.permission_save()
                        alert("저장되었습니다.")
                        this.$router.push('/management/policy')
                    }
                }
                // console.log("save data ========", this.setPolicyData)
            },
            generalchk() {
                axios.put('/management/policy_generalchk/', this.setPolicyData)
                    .then((response) => {
                        // alert("저장되었습니다.")
                        // this.$router.push('/management/policy')
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            generalfile_save() {
                axios.put('/management/policy_edit/', this.setPolicyData)
                    .then((response) => {
                        // alert("저장되었습니다.")
                        // this.$router.push('/management/policy')
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            generalfolder_save() {
                axios.put('/management/policy_generalfolderedit/', this.setPolicyData)
                    .then((response) => {
                        // alert("저장되었습니다.")
                        // this.$router.push('/management/policy')
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            coldfile_save() {
                axios.put('/management/policy_editcoldfile/', this.setPolicyData)
                    .then((response) => {
                        // alert("저장되었습니다.")
                        // this.$router.push('/management/policy')
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            coldfolder_save() {
                axios.put('/management/policy_coldfolderedit/', this.setPolicyData)
                    .then((response) => {
                        // alert("저장되었습니다.")
                        // this.$router.push('/management/policy')
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            ocrfile_save() {
                axios.put('/management/policy_editocrfile/', this.setPolicyData)
                    .then((response) => {
                        // alert("저장되었습니다.")
                        // this.$router.push('/management/policy')
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            ocrfolder_save() {
                axios.put('/management/policy_ocrfolderedit/', this.setPolicyData)
                    .then((response) => {
                        // alert("저장되었습니다.")
                        // this.$router.push('/management/policy')
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            policyextension() {
                axios.put('/management/policy_extension/', this.setPolicyData)
                    .then((response) => {
                        // alert("저장되었습니다.")
                        // this.$router.push('/management/policy')
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            extensionfolder() {
                axios.put('/management/policy_extensionfolder/', this.setPolicyData)
                    .then((response) => {
                        // alert("저장되었습니다.")
                        // this.$router.push('/management/policy')
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            extensionfiles() {
                axios.put('/management/policy_extensionfiles/', this.setPolicyData)
                    .then((response) => {
                        // alert("저장되었습니다.")
                        // this.$router.push('/management/policy')
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            setting_save() {
                axios.put('/management/policy_settings/', this.setPolicyData)
                    .then((response) => {
                        // alert("저장되었습니다.")
                        // this.$router.push('/management/policy')
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            permission_save() {
                axios.put('/management/policy_permission/', this.setPolicyData)
                    .then((response) => {
                        // alert("저장되었습니다.")
                        // this.$router.push('/management/policy')
                    })
                    .catch((err) => {
                        console.log(err);
                    })
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
            NormalStorageCreate
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
                this.policyName = response.data.policyData[0].bp_name
                this.setPolicyData.name = response.data.policyData[0].bp_name
            })

            // console.log("ACCOUNTID========", this.userinfo.accountid)
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
                ocrfiles: [],
                ocrfolder: [],
                policycoldfiles: [],
                coldfolderfiles: [],
                extensionfiles: [],
                extensionfolder: [],
                policyextension: {
                    ex_id: 0,
                    shadowcopy: '',
                    blocklevel: '',
                    ebook: '',
                    office: '',
                    account: '',
                    exclusion: '',
                    policyid: ''
                },
                policypermission: {
                    id: '',
                    deletechk: '',
                    sharingchk: '',
                    editchk: '',
                    pwchk: '',
                    changechk: '',
                    clientdiv: '',
                    pluspw: '',
                    backupchk: '',
                    pausechk: '',
                    terminate: '',
                    remove: '',
                    policyid: ''
                },
                policysetting: {
                    id: '',
                    hidefile: '',
                    battery: '',
                    presentation: '',
                    policysetting: '',
                    multithread: '',
                    lan: '',
                    wifi: '',
                    lte: '',
                    schedulediv: '',
                    stime: '',
                    itime: '',
                    backtime: '',
                    starttime: '',
                    endtime: '',
                    netdiv: '',
                    upspeed: '',
                    banddiv: '',
                    bandstarttime: '',
                    bandendtime: '',
                    policyid: '',
                    endtimechk: '',
                    weekday: '',
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

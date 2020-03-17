<template>
    <div class="policy_write_form">
        <h3>Web 관리 페이지의 권한</h3>
        <ul class="pwf_check_list">
            <li>
                <label>
                    <input type="checkbox" v-model="pp_deletechk"/>데이터 삭제 가능
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" v-model="pp_sharingchk"/>공유 가능
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" v-model="pp_editchk"/>로그인에 사용할 메일 주소 변경 허용
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" v-model="pp_pwchk"/>패스워드의 변경 허용
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" v-model="pp_changechk"/>사용자 이름 변경 허가
                </label>
            </li>
        </ul>
        <h3>클라이언트의 권한</h3>
        <table class="setting">
            <caption>클라이언트의 권한</caption>
            <colgroup>
                <col style="width:300px"/>
                <col style="width:*"/>
            </colgroup>
            <thead>
            <tr>
                <th scope="col">
                    <label><input type="radio" value="P" v-model="clientdiv" @change="gotoData"/>클라이언트 패스 코드 설정</label>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    <p style="margin-bottom:10px">AOSBOX AI plus클라이언트에서 백업된 데이터를 표시 또는 복원할 때 패스 코드 입력을 필요로 합니다.</p>
                    <p>
                        <input ref="pass1" type="text" maxlength="1" @input="updateValue" @change="gotoData"
                               @keyup="onKeyup" :disabled="clientdiv == 'A'"
                               style="width:37px;"/>
                        <input ref="pass2" type="text" maxlength="1" @input="updateValue" @change="gotoData"
                               @keyup="onKeyup" :disabled="clientdiv == 'A'"
                               style="width:37px;"/>
                        <input ref="pass3" type="text" maxlength="1" @input="updateValue" @change="gotoData"
                               @keyup="onKeyup" :disabled="clientdiv == 'A'"
                               style="width:37px;"/>
                        <input ref="pass4" type="text" maxlength="1" @input="updateValue" @change="gotoData"
                               @keyup="onKeyup" :disabled="clientdiv == 'A'"
                               style="width:37px;"/>
                        <span class="error_msg">4자리수의 패스코드를 입력하세요</span>
                    </p>
                </td>
            </tr>
            </tbody>
        </table>
        <table class="setting">
            <caption>클라이언트의 권한</caption>
            <colgroup>
                <col style="width:300px"/>
                <col style="width:*"/>
            </colgroup>
            <thead>
            <tr>
                <th scope="col">
                    <label><input type="radio" value="A" v-model="clientdiv" @change="gotoData"/>AOSBOX AI plus권한의
                        커스터마이즈</label>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    <span class="field">
                        <label class="check_radio"><input type="checkbox" :disabled="clientdiv == 'P'"
                                                          v-model="pp_backupchk"/>즉시 백업 가능</label>
                        <label class="check_radio"><input type="checkbox" :disabled="clientdiv == 'P'"
                                                          v-model="pp_pausechk"/>일시 정지 및 재개 가능</label>
                        <label class="check_radio"><input type="checkbox" :disabled="clientdiv == 'P'"
                                                          v-model="pp_terminate"/>AOSBOX 종료 허가</label>
                        <label class="check_radio"><input type="checkbox" :disabled="clientdiv == 'P'"
                                                          v-model="pp_remove"/>AOSBOX 언인스톨 허가</label>
                    </span>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import $ from "jquery";

    export default {
        data() {
            return {
                permission_list: [],
                pp_deletechk: '',
                pp_sharingchk: '',
                pp_editchk: '',
                pp_pwchk: '',
                pp_changechk: '',
                clientdiv: '',
                pp_backupchk: '',
                pp_pausechk: '',
                pp_terminate: '',
                pp_remove: '',
            }
        },
        computed: {
            setPolicyData() {
                return this.$store.state.management.policy.setPolicy
            }
        },
        watch: {
            pp_deletechk() {
                if (!this.pp_deletechk == true) {
                    this.setPolicyData.policypermission.deletechk = 'N'
                } else {
                    this.setPolicyData.policypermission.deletechk = 'Y'
                }
            },
            pp_sharingchk() {
                if (!this.pp_sharingchk == true) {
                    this.setPolicyData.policypermission.sharingchk = 'N'
                } else {
                    this.setPolicyData.policypermission.sharingchk = 'Y'
                }
            },
            pp_editchk() {
                if (!this.pp_editchk == true) {
                    this.setPolicyData.policypermission.editchk = 'N'
                } else {
                    this.setPolicyData.policypermission.editchk = 'Y'
                }
            },
            pp_pwchk() {
                if (!this.pp_pwchk == true) {
                    this.setPolicyData.policypermission.pwchk = 'N'
                } else {
                    this.setPolicyData.policypermission.pwchk = 'Y'
                }
            },
            pp_changechk() {
                if (!this.pp_changechk == true) {
                    this.setPolicyData.policypermission.changechk = 'N'
                } else {
                    this.setPolicyData.policypermission.changechk = 'Y'
                }
            },
            pp_backupchk() {
                if (!this.pp_backupchk == true) {
                    this.setPolicyData.policypermission.backupchk = 'N'
                } else {
                    this.setPolicyData.policypermission.backupchk = 'Y'
                }
            },
            pp_pausechk() {
                if (!this.pp_pausechk == true) {
                    this.setPolicyData.policypermission.pausechk = 'N'
                } else {
                    this.setPolicyData.policypermission.pausechk = 'Y'
                }
            },
            pp_terminate() {
                if (!this.pp_terminate == true) {
                    this.setPolicyData.policypermission.terminate = 'N'
                } else {
                    this.setPolicyData.policypermission.terminate = 'Y'
                }
            },
            pp_remove() {
                if (!this.pp_remove == true) {
                    this.setPolicyData.policypermission.remove = 'N'
                } else {
                    this.setPolicyData.policypermission.remove = 'Y'
                }
            },
        },
        created() {
            const bpId = this.$route.params.bp_id
            let requestData = {
                bpId: bpId
            }
            axios.get('/management/policy_permissionlist/', {params: {bpId: requestData.bpId}}
            ).then((response) => {
                this.permission_list = response.data
                if (response.data != '') {
                    this.setPolicyData.policypermission.id = response.data[0].pp_id
                    this.setPolicyData.policypermission.policyid = response.data[0].pp_policyid
                    this.setPolicyData.policypermission.clientdiv = response.data[0].pp_clientdiv

                    if (response.data[0].pp_deletechk == "Y") this.pp_deletechk = true;
                    if (response.data[0].pp_sharingchk == "Y") this.pp_sharingchk = true;
                    if (response.data[0].pp_editchk == "Y") this.pp_editchk = true;
                    if (response.data[0].pp_pwchk == "Y") this.pp_pwchk = true;
                    if (response.data[0].pp_changechk == "Y") this.pp_changechk = true;
                    this.clientdiv = response.data[0].pp_clientdiv
                    if (response.data[0].pp_backupchk == "Y") this.pp_backupchk = true;
                    if (response.data[0].pp_pausechk == "Y") this.pp_pausechk = true;
                    if (response.data[0].pp_terminate == "Y") this.pp_terminate = true;
                    if (response.data[0].pp_remove == "Y") this.pp_remove = true;

                    //ClientPassword number(4)
                    if (response.data[0].pp_clientdiv == 'P') {
                        this.setPolicyData.policypermission.pluspw = response.data[0].pp_pluspw
                        const pluspass = String(response.data[0].pp_pluspw)
                        this.$refs.pass1.value = pluspass.substr(0, 1)
                        this.$refs.pass2.value = pluspass.substr(1, 2)
                        this.$refs.pass3.value = pluspass.substr(2, 3)
                        this.$refs.pass4.value = pluspass.substr(3, 4)
                    } else {
                        this.setPolicyData.policypermission.pluspw = null
                    }
                }
            })

        },
        methods: {
            onKeyup(event) {
                event.target.value = event.target.value.replace(/[^0-9]/g, '')
                if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
                    const next = event.target.nextElementSibling
                    if (next === null) return
                    event.target.nextElementSibling.focus()
                }
                return
            },
            gotoData() {
                this.setPolicyData.policypermission.deletechk = this.pp_deletechk ? 'Y' : 'N'
                this.setPolicyData.policypermission.sharingchk = this.pp_sharingchk ? 'Y' : 'N'
                this.setPolicyData.policypermission.editchk = this.pp_editchk ? 'Y' : 'N'
                this.setPolicyData.policypermission.pwchk = this.pp_pwchk ? 'Y' : 'N'
                this.setPolicyData.policypermission.changechk = this.pp_changechk ? 'Y' : 'N'
                this.setPolicyData.policypermission.clientdiv = this.clientdiv
                if (this.clientdiv == 'P') {
                    this.setPolicyData.policypermission.pluspw = this.$refs.pass1.value + this.$refs.pass2.value + this.$refs.pass3.value + this.$refs.pass4.value
                } else {
                    this.setPolicyData.policypermission.pluspw = null
                }
                this.setPolicyData.policypermission.backupchk = this.pp_backupchk ? 'Y' : 'N'
                this.setPolicyData.policypermission.pausechk = this.pp_pausechk ? 'Y' : 'N'
                this.setPolicyData.policypermission.terminate = this.pp_terminate ? 'Y' : 'N'
                this.setPolicyData.policypermission.remove = this.pp_remove ? 'Y' : 'N'
            },
            updateValue(event) {
                const value = event.target.value
                if (String(value).length <= 1) {
                    this.amount = value
                }
                this.$forceUpdate()
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

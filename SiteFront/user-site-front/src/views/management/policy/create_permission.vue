<template>
    <div class="policy_write_form">
        <h3>Web 관리 페이지의 권한</h3>
        <ul class="pwf_check_list" @change="gotoData">
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
                        <label class="check_radio">
                            <input type="checkbox" :disabled="clientdiv == 'P'"
                                   v-model="pp_backupchk"/>즉시 백업 가능</label>
                        <label class="check_radio">
                            <input type="checkbox" :disabled="clientdiv == 'P'"
                                   v-model="pp_pausechk"/>일시 정지 및 재개 가능</label>
                        <label class="check_radio">
                            <input type="checkbox" :disabled="clientdiv == 'P'"
                                   v-model="pp_terminate"/>AOSBOX 종료 허가</label>
                        <label class="check_radio">
                            <input type="checkbox" :disabled="clientdiv == 'P'"
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
                pp_pluspw: '',
            }
        },
        computed: {
            setPolicyData() {
                return this.$store.state.management.policy.setPolicy
            }
        },
        created() {
            const bpId = this.$route.params.bp_id
            let requestData = {
                bpId: bpId
            }

            this.pp_deletechk = 'Y'
            this.pp_sharingchk = 'Y'
            this.pp_editchk = 'Y'
            this.pp_pwchk = 'Y'
            this.pp_changechk = 'Y'
            this.clientdiv = 'A'
            this.pp_remove = 'Y'
            this.pp_pausechk = 'Y'
            this.pp_terminate = 'Y'
            this.setPolicyData.policypermission.pp_pluspw = null

        },
        methods: {
            gotoData() {
                this.setPolicyData.policypermission.pp_deletechk = this.pp_deletechk ? 'Y' : 'N'
                this.setPolicyData.policypermission.pp_sharingchk = this.pp_sharingchk ? 'Y' : 'N'
                this.setPolicyData.policypermission.pp_editchk = this.pp_editchk ? 'Y' : 'N'
                this.setPolicyData.policypermission.pp_pwchk = this.pp_pwchk ? 'Y' : 'N'
                this.setPolicyData.policypermission.pp_changechk = this.pp_changechk ? 'Y' : 'N'
                this.setPolicyData.policypermission.pp_clientdiv = this.clientdiv
                if (this.clientdiv == 'P') {
                    this.setPolicyData.policypermission.pp_pluspw = this.$refs.pass1.value + this.$refs.pass2.value + this.$refs.pass3.value + this.$refs.pass4.value
                } else {
                    this.setPolicyData.policypermission.pp_pluspw = null
                }
                this.setPolicyData.policypermission.pp_backupchk = this.pp_backupchk ? 'Y' : 'N'
                this.setPolicyData.policypermission.pp_pausechk = this.pp_remove ? 'Y' : 'N'
                this.setPolicyData.policypermission.pp_terminate = this.pp_pausechk ? 'Y' : 'N'
                this.setPolicyData.policypermission.pp_remove = this.pp_terminate ? 'Y' : 'N'
            },
            onKeyup(event) {
                event.target.value = event.target.value.replace(/[^0-9]/g, '')
                // console.log(event.target.value)
                if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
                    const next = event.target.nextElementSibling
                    if (next === null) return
                    event.target.nextElementSibling.focus()
                }
                // this.pp_pluspw = this.$refs.pass1.value + this.$refs.pass2.value + this.$refs.pass3.value + this.$refs.pass4.value
                return
            },
            updateValue(event) {
                const value = event.target.value
                // console.log(value, this.$refs.pass1.value)
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

<template>
    <div class="policy_write_form">
        <h3>일반설정</h3>
        <ul class="pwf_check_list">
            <li>
                <label>
                    <input type="checkbox" v-model="ps_hidefile"/>숨긴 파일 포함
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" v-model="ps_battery"/>배터리 모드 유효화
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" v-model="ps_presentation"/>프레젠테이션 모드를 활성화
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" v-model="ps_policysetting"/>컴퓨터 시작 시 AOSBOX AI plus를 기동
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" v-model="ps_multithread"/>다중 스레드에서 업로드(네트워크 속도에 영향을 줍니다)
                </label>
            </li>
        </ul>
        <h3>업로드 시 사용하는 접속 방법</h3>
        <ul class="pwf_check_list">
            <li>
                <label>
                    <input type="checkbox" v-model="ps_lan"/>유선 LAN
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" v-model="ps_wifi"/>무선 LAN(WiFi)
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" v-model="ps_lte"/>모바일 데이터 통신(3G/LTE)
                </label>
            </li>
        </ul>
        <h3>백업일정</h3>
        <table class="setting">
            <caption>백업일정</caption>
            <colgroup>
                <col style="width:300px"/>
                <col style="width:*"/>
            </colgroup>
            <tbody>
            <tr>
                <th scope="row" rowspan="2">
                            <span class="category">
                                <label for="cyclicalRun"><input type="radio" value="G" v-model="ps_schedulediv"
                                                                @change="gotoData"/>주기적으로 실행</label>
                            </span>
                    <span class="field">
                                <span class="basic_select selectbox_ui">
                                    <b class="selected_txt" v-bind:class="{ focus: (this.ps_schedulediv === 'G') }"></b>
                                    <select name="" id="cyclicalRun" v-model="cyclicalRun" @change="gotoData"
                                            v-bind:style="{display: ps_schedulediv == 'G' ? 'block' : 'none'}">
                                        <option :value="undefined" selected disabled>선택</option>
                                        <option value="5">5분</option>
                                        <option value="15">15분</option>
                                        <option value="30">30분</option>
                                        <option value="60">1시간</option>
                                        <option value="120">2시간</option>
                                        <option value="240">4시간</option>
                                        <option value="480">8시간</option>
                                        <option value="720">12시간</option>
                                        <option value="1440">24시간</option>
                                    </select>
                                </span>
                            </span>
                </th>
                <td>
                            <span class="category">
                                <label for="backupData">백업 데이터 무결성 검사 실행 간격</label>
                            </span>
                    <span class="field">
                                <span class="basic_select selectbox_ui">
                                    <b class="selected_txt"></b>
                                    <select name="" id="backupData" v-model="backupData" @change="gotoData"
                                            v-bind:style="{display: ps_schedulediv == 'G' ? 'block' : 'none'}">
                                        <option :value="undefined" selected disabled>선택</option>
                                        <option value="2">2시간</option>
                                        <option value="4">4시간</option>
                                        <option value="8">8시간</option>
                                        <option value="12">12시간</option>
                                        <option value="24">24시간</option>
                                        <option value="48">2일</option>
                                        <option value="96">4일</option>
                                        <option value="168">7일</option>
                                    </select>
                                </span>
                            </span>
                </td>
            </tr>
            <tr>
                <td>
                            <span class="category">
                                <label for="blockLevelBackup">블록 레벨 백업 실행 간격</label>
                            </span>
                    <span class="field">
                                <span class="basic_select selectbox_ui">
                                    <b class="selected_txt"></b>
                                    <select name="" id="blockLevelBackup" v-model="blockLevelBackup" @change="gotoData"
                                            v-bind:style="{display: ps_schedulediv == 'G' ? 'block' : 'none'}">
                                        <option :value="undefined" selected disabled>선택</option>
                                        <option value="2">2시간</option>
                                        <option value="8">8시간</option>
                                        <option value="24">24시간</option>
                                        <option value="48">48시간</option>
                                    </select>
                                </span>
                            </span>
                </td>
            </tr>
            </tbody>
        </table>
        <p class="error_msg">※ 경고:간격을 짧게 하면 컴퓨터 성능에 영향을 미칠 수 있습니다.</p>
        <table class="setting">
            <caption>백업일정</caption>
            <colgroup>
                <col style="width:300px"/>
                <col style="width:*"/>
            </colgroup>
            <tbody>
            <tr>
                <th scope="row" rowspan="2">
                            <span class="category">
                                <label for="scheduleRun"><input type="radio" value="S" v-model="ps_schedulediv"
                                                                @change="gotoData"/>일정에 따라 실행</label>
                            </span>
                    <span class="field">
<!--                                <span class="basic_select selectbox_ui">-->
                        <!--                                    <b class="selected_txt" v-bind:class="{ focus: (this.ps_schedulediv === 'S') }"></b>-->
                        <!--                                    <select name="" id="scheduleRun" v-model="scheduleRun" v-bind:style="{display: ps_schedulediv == 'S' ? 'block' : 'none'}">-->
                        <!--                                        <option :value="undefined" selected disabled>선택</option>-->
                        <!--                                        <option value="5">5분</option>-->
                        <!--                                        <option value="15">15분</option>-->
                        <!--                                        <option value="30">30분</option>-->
                        <!--                                        <option value="60">1시간</option>-->
                        <!--                                        <option value="120">2시간</option>-->
                        <!--                                        <option value="240">4시간</option>-->
                        <!--                                        <option value="480">8시간</option>-->
                        <!--                                        <option value="720">12시간</option>-->
                        <!--                                        <option value="1440">24시간</option>-->
                        <!--                                    </select>-->
                        <!--                                </span>-->
                            </span>
                </th>
                <td>
                    <span class="category">
                        <label for="startPostTime">게시시각</label>
                    </span>
                    <span class="field">
                        <span class="basic_datepicker" style="width:160px;">
<!--                            <input type="text" id="startPostTime" @click="openDatetime"   :disabled="ps_schedulediv == 'G'"/>-->
                            <datetime ref="datetimePicker" type="time" v-model="startPostTime" use12-hour
                                      :disabled="ps_schedulediv == 'G'" @change="gotoData" @input="gotoData"></datetime>
                            <button type="button" @click="openDatetime" :disabled="ps_schedulediv == 'G'">
                                <img src="@/assets/images/component/btn_clock.png" alt="시계"/>
                            </button>
                        </span>
                    </span>
                    <span class="category">
                        <label for="endPostTime"><input type="checkbox" v-model="endTimeChk"
                                                        :disabled="ps_schedulediv == 'G'"
                                                        @change="gotoData"/>종료시각</label>
                    </span>
                    <span class="field">
                        <span class="basic_datepicker" style="width:160px;">
<!--                            <input type="text" id="endPostTime" :disabled="ps_schedulediv == 'G'"/>-->
                            <datetime ref="datetimeEndPicker" type="time" use12-hour v-model="endPostTime"
                                      @change="gotoData" @input="gotoData"
                                      :disabled="endTimeChk != true"></datetime>
                            <button type="button" @click="openDateEndtime" :disabled="endTimeChk != true">
                                <img src="@/assets/images/component/btn_clock.png" alt="시계"/>
                            </button>
                        </span>
                    </span>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="category">요일 {{ availableDayString }}</span>
                    <span class="field">
                            <label class="check_radio" v-for="day in days">
                                <input name="weekdays" v-model="day.selected" type="checkbox"
                                       :disabled="ps_schedulediv == 'G'" @change="gotoData"/>{{ day.day }}
                            </label>
                    </span>
                </td>
            </tr>
            </tbody>
        </table>
        <p class="error_msg">※ 경고:간격을 짧게 하면 컴퓨터 성능에 영향을 미칠 수 있습니다.</p>
        <h3>네트워크 대역 조정</h3>
        <table class="setting">
            <caption>네트워크 대역 조정</caption>
            <colgroup>
                <col style="width:300px"/>
                <col style="width:*"/>
            </colgroup>
            <thead>
            <tr>
                <th scope="col">
                    <label><input type="checkbox" v-model="ps_netdiv" @change="gotoData"/>네트워크 대역 조정을 유효하게 한다</label>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    <span class="category">
                        <label for="uploadSpeed">업로드 속도 조절</label>
                    </span>
                    <span class="field">
                        <span class="basic_select selectbox_ui">
                            <b class="selected_txt"></b>
                            <select name="" id="uploadSpeed" v-model="uploadSpeed" @change="gotoData"
                                    v-bind:style="{display: ps_netdiv == true ? 'block' : 'none'}">
                                <option :value="undefined" selected disabled>선택</option>
                                <option value="128">128 Kbps</option>
                                <option value="256">256 Kbps</option>
                                <option value="512">512 Kmps</option>
                                <option value="1">1 Mbps</option>
                                <option value="2">2 Mbps</option>
                                <option value="4">4 Mbps</option>
                                <option value="8">8 Mbps</option>
                                <option value="16">16 Mbps</option>
                            </select>
                        </span>
                    </span>
                </td>
            </tr>
            </tbody>
        </table>
        <table class="setting">
            <caption>네트워크 대역 조정</caption>
            <colgroup>
                <col style="width:300px"/>
                <col style="width:*"/>
            </colgroup>
            <thead>
            <tr>
                <th scope="col">
                    <label><input type="checkbox" v-model="ps_banddiv" @change="gotoData"
                                  :disabled="ps_netdiv == false"/>대역 조정의 일정을 유효하게 한다</label>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    <span class="category">
                        <label for="startPostTime2">게시시각</label>
                    </span>
                    <span class="field">
                        <span class="basic_datepicker">
<!--                            <input type="text" id="startPostTime2"/>-->
                            <datetime ref="datetimePicker" type="time" v-model="startPostTime2" use12-hour
                                      :disabled="ps_banddiv == false" @change="gotoData" @input="gotoData"></datetime>
                            <button type="button" @click="openDatetime2" :disabled="ps_banddiv == false">
                                <img src="@/assets/images/component/btn_clock.png" alt="시계"/>
                            </button>
                        </span>
                    </span>
                    <span class="category">
                        <label for="endPostTime2">종료시각</label>
                    </span>
                    <span class="field">
                        <span class="basic_datepicker">
<!--                            <input type="text" id="endPostTime2"/>-->
                            <datetime ref="datetimeEndPicker" type="time" use12-hour v-model="endPostTime2"
                                      :disabled="ps_banddiv == false" @change="gotoData" @input="gotoData"></datetime>
                            <button type="button" @click="openDateEndtime2" :disabled="ps_banddiv == false">
                                <img src="@/assets/images/component/btn_clock.png" alt="시계"/>
                            </button>
                        </span>
                    </span>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import $ from "jquery";
    import {Datetime} from 'vue-datetime'
    import 'vue-datetime/dist/vue-datetime.css'
    import {Settings} from 'luxon'
    import moment from "moment";

    Settings.defaultLocale = 'ja'

    const state = {
        date1: new Date()
    };

    export default {
        data() {
            return {
                startPostTime: null,
                endPostTime: null,
                startPostTime2: null,
                endPostTime2: null,
                setting_list: [],
                cyclicalRun: '',
                scheduleRun: '',
                backupData: '',
                blockLevelBackup: '',
                ps_hidefile: false,
                ps_battery: '',
                ps_presentation: '',
                ps_policysetting: '',
                ps_multithread: '',
                ps_lan: '',
                ps_wifi: '',
                ps_lte: '',
                ps_schedulediv: null,
                mydate: new Date(),
                endTimeChk: '',
                days: [
                    {selected: false, day: '월'},
                    {selected: false, day: '화'},
                    {selected: false, day: '수'},
                    {selected: false, day: '목'},
                    {selected: false, day: '금'},
                    {selected: false, day: '토'},
                    {selected: false, day: '일'},
                ],
                availability: [],
                isWeekendsChecked: false,
                testweek: [],
                ps_netdiv: null,
                ps_banddiv: null,
                uploadSpeed: ''
                // ps_stime: (...)
                // ps_itime: (...)
                // ps_backtime: (...)
                // ps_starttime: (...)
                // ps_endtime: (...)
                // ps_netdiv: (...)
                // ps_upspeed: (...)
                // ps_banddiv: (...)
                // ps_bandstarttime: (...)
                // ps_bandendtime: (...)
                // ps_policyid: (...)
            }
        },
        components: {
            'datetime': Datetime
        },
        computed: {
            settingList() {
                return this.setting_list
            },
            selectedDays: function () {
                return this.days.filter(function (day) {
                    return day.selected;
                }).map(function (day) {
                    return day.day;
                });
            },
            availableDayString: function () {

                this.isWeekendsChecked = (this.selectedDays.indexOf('토') >= 0 && this.selectedDays.indexOf('일') >= 0);

                if (this.selectedDays.length == 7) {
                    return 'Alldays';
                }
                if (this.selectedDays.length == 2 && this.isWeekendsChecked) {
                    return 'Weekends';
                }
                if (this.selectedDays.length == 5 && !this.isWeekendsChecked) {
                    return 'Weekdays';
                }
                return this.selectedDays.join(', ');
            },
            setPolicyData() {
                return this.$store.state.management.policy.setPolicy
            }

        },
        watch: {
            ps_schedulediv(newValue) {
                if (this.ps_schedulediv == 'G') {
                    // for (var data in this.settingList) {
                    //     console.log("cyclicalRun=========", data.ps_stime)
                    // }
                    this.scheduleRun = undefined
                    // this.backupData = undefined
                    // this.blockLevelBackup = undefinedi
                    this.endTimeChk = false
                } else {
                    this.backupData = undefined
                    this.blockLevelBackup = undefined
                }
            },
            endPostTime() {
                if (this.startPostTime > this.endPostTime) {
                    alert("종료날짜가 시작날짜보다 더 빠릅니다.")
                    this.endPostTime = null
                    this.$emit('endPostTime', '')
                    return;
                }
            },
            ps_netdiv() {
                // this.ps_banddiv = false
                // console.log("ps_netdiv watch=====", this.ps_netdiv)
            },
            ps_hidefile() {
                if (!this.ps_hidefile == true) {
                    this.setPolicyData.policysetting.hidefile = 'N'
                } else {
                    this.setPolicyData.policysetting.hidefile = 'Y'
                }
                // this.setPolicyData.policysetting.hidefile = this.ps_hidefile ? 'N' : 'Y';
            },
            ps_battery() {
                if (!this.ps_battery == true) {
                    this.setPolicyData.policysetting.battery = 'N'
                } else {
                    this.setPolicyData.policysetting.battery = 'Y'
                }
            },
            ps_presentation() {
                if (!this.ps_presentation == true) {
                    this.setPolicyData.policysetting.presentation = 'N'
                } else {
                    this.setPolicyData.policysetting.presentation = 'Y'
                }
            },
            ps_policysetting() {
                if (!this.ps_policysetting == true) {
                    this.setPolicyData.policysetting.policysetting = 'N'
                } else {
                    this.setPolicyData.policysetting.policysetting = 'Y'
                }
            },
            ps_multithread() {
                if (!this.ps_multithread == true) {
                    this.setPolicyData.policysetting.multithread = 'N'
                } else {
                    this.setPolicyData.policysetting.multithread = 'Y'
                }
            },
            ps_lan() {
                if (!this.ps_multithread == true) {
                    this.setPolicyData.policysetting.lan = 'N'
                } else {
                    this.setPolicyData.policysetting.lan = 'Y'
                }
            },
            ps_wifi() {
                if (!this.ps_wifi == true) {
                    this.setPolicyData.policysetting.wifi = 'N'
                } else {
                    this.setPolicyData.policysetting.wifi = 'Y'
                }
            },
            ps_lte() {
                if (!this.ps_lte == true) {
                    this.setPolicyData.policysetting.lte = 'N'
                } else {
                    this.setPolicyData.policysetting.lte = 'Y'
                }
            },
            ps_netdiv() {
                if (!this.ps_netdiv == true) {
                    this.setPolicyData.policysetting.netdiv = 'N'
                } else {
                    this.setPolicyData.policysetting.netdiv = 'Y'
                }
            },

        },
        methods: {
            openDatetime() {
                this.$refs.datetimePicker.open(event)
            },
            openDateEndtime() {
                this.$refs.datetimeEndPicker.open(event)
            },
            openDatetime2() {
                this.$refs.datetimePicker.open(event)
            },
            openDateEndtime2() {
                this.$refs.datetimeEndPicker.open(event)
            },
            weekCheck() {
                // console.log("this.testweek=====", this.testweek)
                for (const [i, v] of this.days.entries()) {
                    for (let c of this.testweek) {
                        if (v.day == c) {
                            this.$set(this.days[i], 'selected', true)
                        }
                    }
                }
                // for (var i = 0; i <= this.days.length; i++) {
                //     // console.log(this.days[i])
                //     for (let c of this.testweek) {
                //         if (this.days[i].day == c) {
                //             this.$set(this.days[i], 'selected', true)
                //         }
                //     }
                // }
            },
            gotoData() {
                this.setPolicyData.policysetting.schedulediv = this.ps_schedulediv
                if (this.ps_schedulediv == 'G') {
                    this.setPolicyData.policysetting.stime = this.cyclicalRun
                    this.setPolicyData.policysetting.itime = this.backupData
                    this.setPolicyData.policysetting.backtime = this.blockLevelBackup
                } else {
                    this.setPolicyData.policysetting.stime = null
                    this.setPolicyData.policysetting.itime = null
                    this.setPolicyData.policysetting.backtime = null
                }
                this.setPolicyData.policysetting.starttime = moment(String(this.startPostTime)).format('YYYY-MM-DD hh:mm:ss')
                this.setPolicyData.policysetting.endtime = moment(String(this.endPostTime)).format('YYYY-MM-DD hh:mm:ss')
                this.setPolicyData.policysetting.endtimechk = this.endTimeChk ? 'Y' : 'N'
                this.setPolicyData.policysetting.weekday = this.availableDayString
                this.setPolicyData.policysetting.netdiv = this.ps_netdiv ? 'Y' : 'N'
                this.setPolicyData.policysetting.upspeed = this.uploadSpeed
                this.setPolicyData.policysetting.banddiv = this.ps_banddiv ? 'Y' : 'N'
                if (this.startPostTime2 != null) {
                    this.setPolicyData.policysetting.bandstarttime = this.startPostTime2
                }
                if (this.endPostTime2 != null) {
                    this.setPolicyData.policysetting.bandendtime = this.endPostTime2
                }
            },
        },
        created() {
            this.ps_schedulediv = 'G'
            this.scheduleRun = undefined
            this.uploadSpeed = 128
            this.cyclicalRun = 120
            this.backupData = 24
            this.blockLevelBackup = 24
            this.ps_netdiv = false

            const bpId = this.$route.params.bp_id
            let requestData = {
                bpId: bpId
            }


            //확장자파일 리스트
            axios.get('/management/policy_settinglist/', {params: {bpId: requestData.bpId}}
            ).then((response) => {
                this.setting_list = response.data
                if (response.data != '') {
                    this.setPolicyData.policysetting.id = response.data[0].ps_id
                    this.setPolicyData.policysetting.policyid = response.data[0].ps_policyid
                    if (response.data[0].ps_hidefile == "Y") this.ps_hidefile = true;
                    if (response.data[0].ps_battery == "Y") this.ps_battery = true;
                    if (response.data[0].ps_presentation == "Y") this.ps_presentation = true;
                    if (response.data[0].ps_policysetting == "Y") this.ps_policysetting = true;
                    if (response.data[0].ps_multithread == "Y") this.ps_multithread = true;
                    if (response.data[0].ps_lan == "Y") this.ps_lan = true;
                    if (response.data[0].ps_wifi == "Y") this.ps_wifi = true;
                    if (response.data[0].ps_lte == "Y") this.ps_lte = true;

                    // console.log("ps_netdiv.data======>", response.data[0].ps_netdiv)

                    this.ps_schedulediv = response.data[0].ps_schedulediv
                    this.cyclicalRun = response.data[0].ps_stime
                    this.backupData = response.data[0].ps_itime
                    this.blockLevelBackup = response.data[0].ps_backtime
                    var trimt = response.data[0].ps_weekday
                    // var jbSplit = trimt.split(',');
                    var jbSplit = trimt.split(",").map(function (item) {
                        return item.trim();
                    });
                    // console.log("week=====", jbSplit)
                    var weekday = new Object();
                    for (var i = 0; i < jbSplit.length; i++) {
                        var day = jbSplit[i];
                        // weekday[key] = weekday[i];
                        this.testweek[i] = jbSplit[i];
                    }
                    this.startPostTime = response.data[0].ps_starttime

                    if (response.data[0].ps_starttime != '' && response.data[0].ps_starttime != null) {
                        this.setPolicyData.policysetting.starttime = moment(String(response.data[0].ps_starttime)).format('YYYY-MM-DD hh:mm:ss')
                    } else {
                        this.setPolicyData.policysetting.starttime = moment(String(state.date1)).format('YYYY-MM-DD hh:mm:ss')
                    }
                    if (response.data[0].ps_endtime != '' && response.data[0].ps_endtime != null) {
                        this.setPolicyData.policysetting.endtime = moment(String(response.data[0].ps_endtime)).format('YYYY-MM-DD hh:mm:ss')
                    } else {
                        this.setPolicyData.policysetting.endtime = moment(String(state.date1)).format('YYYY-MM-DD hh:mm:ss')
                    }
                    this.endPostTime = response.data[0].ps_endtime
                    this.uploadSpeed = response.data[0].ps_upspeed
                    this.startPostTime2 = response.data[0].ps_bandstarttime
                    this.endPostTime2 = response.data[0].ps_bandendtime
                    if (response.data[0].ps_bandstarttime != '' && response.data[0].ps_bandstarttime != null) {
                        this.setPolicyData.policysetting.bandstarttime = moment(String(response.data[0].ps_bandstarttime)).format('YYYY-MM-DD hh:mm:ss')
                    } else {
                        this.setPolicyData.policysetting.bandstarttime = moment(String(state.date1)).format('YYYY-MM-DD hh:mm:ss')
                    }
                    if (response.data[0].ps_bandendtime != '' && response.data[0].ps_bandendtime != null) {
                        this.setPolicyData.policysetting.bandendtime = moment(String(response.data[0].ps_bandendtime)).format('YYYY-MM-DD hh:mm:ss')
                    } else {
                        this.setPolicyData.policysetting.bandendtime = moment(String(state.date1)).format('YYYY-MM-DD hh:mm:ss')
                    }
                    // this.ps_netdiv = response.data[0].ps_netdiv
                    if (response.data[0].ps_endtimechk == "Y") this.endTimeChk = true;
                    if (response.data[0].ps_netdiv == "Y") this.ps_netdiv = true;
                    if (response.data[0].ps_banddiv == "Y") this.ps_banddiv = true;

                    this.weekCheck()
                }
            })
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

</style>

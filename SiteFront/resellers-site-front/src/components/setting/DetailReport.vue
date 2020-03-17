<template>
    <form action="" method="">
        <dl class="settings_paragraph">
            <dt>
                <label for="check_mailReport"><input type="checkbox" id="check_mailReport">메일 리포트를 수신</label>
            </dt>
            <dd>
                <dl class="area_selection">
                    <dt>정기 리포트 메일 수신 빈도 &#58;</dt>
                    <dd>
                        <label for="report_month" name=""><input type="radio" id="report_month" name="radio_report">1개월</label>
                        <label for="report_weeks" name=""><input type="radio" id="report_weeks" name="radio_report">2주</label>
                        <label for="report_week" name=""><input type="radio" id="report_week" name="radio_report">1주</label>
                        <label for="report_day" name=""><input type="radio" id="report_day" name="radio_report">1일</label>
                    </dd>
                    <dt>
                        <label for="check_warning"><input type="checkbox" id="check_warning">사용자의 상황 목록 및 시스템 경고를 포함</label>
                    </dt>
                    <dt>
                        <label for="check_backupReminder"><input type="checkbox" id="check_backupReminder">일정 기간 이상 백업이 수행되지 않은 경우 알림 &#58;</label>
                    </dt>
                    <dd>
                        <label for="reminder_weeks"><input type="radio" id="reminder_weeks" name="radio_reminder">2주</label>
                        <label for="reminder_week"><input type="radio" id="reminder_week" name="radio_reminder">1주</label>
                        <label for="reminder_3day"><input type="radio" id="reminder_3day" name="radio_reminder">3일</label>
                        <label for="reminder_day"><input type="radio" id="reminder_day" name="radio_reminder">1일</label>
                    </dd>
                    <dd class="inputBox_wrap">
                        <table cellpadding="0" cellspacing="0">
                            <tbody>
                                <tr>
                                    <th>
                                        <label>리포트 메일 수신인 &#58;</label>
                                    </th>
                                    <td>
                                        <input type="text" placeholder="이메일을 입력해주세요.">
                                        <!-- <span class="warning_message">입력 없이 저장할 수 없습니다.</span> -->
                                        <!-- <span class="warning_message">유효한 메일 주소를 입력해 주세요.</span> -->
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label>리포트 메일 제목 &#58;</label>
                                    </th>
                                    <td>
                                        <input type="text" class="no_input">
                                        <!-- input 미입력 시 class="no_input" 추가  -->
                                        <span class="warning_message">입력 없이 저장할 수 없습니다.</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </dd>
                </dl>
            </dd>
            <dt>
                <label for="check_mailUser"><input type="checkbox" id="check_mailUser">스토리지 경고 메일을 사용자에게 전송</label>
            </dt>
            <dd>
                Note &#58; 이 기능이 활성화 되어있는 경우, 시스템은 해당 사용자에게 경고 메일을 발송합니다.
                <ul>
                    <li>
                        &dash; 사용자의 스토리지가 한계에 도달 할 때 한 번 경고를 통지 (이메일 및 알림)
                        <input type="text" class="storage_limits no_input">&nbsp;%
                        <!-- input 미입력 시 class="no_input" 추가  -->
                        <span class="warning_message">입력 없이 저장할 수 없습니다.</span>
                    </li>
                    <li>&dash; 사용자의 스토리지에 여유 공간이 없는 경우, 메일 경고 알림 (이메일 및 알림)</li>
                </ul>
            </dd>
            <dt>
                <label for="check_mailReseller"><input type="checkbox" id="check_mailReseller">스토리지 경고 메일을 당신에게 전송</label>
            </dt>
            <dd>
                Note &#58; 이 기능이 활성화 되어있는 경우, 시스템은 귀하의 이메일 주소로 아래의 정보를 전송합니다.
                <ul>
                    <li>
                        &dash; 하나의 사용자의 스토리지가 한계에 도달 할 때 1 번만 경고 메일을 발송&nbsp;
                        <input type="text" class="storage_limits">&nbsp;%
                        <!-- <span class="warning_message">입력 없이 저장할 수 없습니다.</span> -->
                    </li>
                    <li>&dash; 하나의 사용자 저장소에 여유가 없는 경우 경고 메일을 메일 발송</li>
                </ul>
            </dd>
        </dl>
    </form>
</template>

<script>
    export default {
        name: "DetailReport",
        props: ['currentTab'],
    }
</script>

<style scoped>

</style>
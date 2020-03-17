<template>
    <form action="" method="">
        <dl class="settings_paragraph">
            <dt>이 메일은 사용자가 당신에게 연락하는데 사용됩니다.</dt>
            <dd class="inputBox_wrap">
                <table cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <th>
                                <label>문의(판매) &#58;</label>
                            </th>
                            <td>
                                <input type="text" placeholder="이메일을 입력해주세요.">
                                <!-- <span class="warning_message">입력 없이 저장할 수 없습니다.</span> -->
                                <!-- <span class="warning_message">유효한 메일 주소를 입력해 주세요.</span> -->
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>문의(기술) &#58;</label>
                            </th>
                            <td>
                                <input type="text" class="no_input">
                                <!-- input 미입력 시 class="no_input" 추가  -->
                                <!-- <span class="warning_message">유효한 메일 주소를 입력해 주세요.</span> -->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </dd>
        </dl>
    </form>
</template>

<script>
    export default {
        name: "DetailContact"
    }
</script>

<style scoped>

</style>
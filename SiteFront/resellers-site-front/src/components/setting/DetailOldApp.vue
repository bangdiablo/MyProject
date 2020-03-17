<template>
    <form action="" method="">
        <dl class="settings_paragraph">
            <dt>
                <label for="check_mail_notification"><input type="checkbox" id="check_mail_notification">오래된 앱 사용중인 사용자의 메일 주소를 알림</label>
            </dt>
            <dd>
                <dl class="area_selection ">
                    <dt>대상 계정</dt>
                    <dd>
                        <label for="radio_allManagers" name=""><input type="radio" id="radio_allManagers" name="radio_mailRecipient">모든관리자</label>
                    </dd>
                    <dd>
                        <label for="radio_designatedManager" name=""><input type="radio" id="radio_designatedManager" name="radio_mailRecipient">지정된 관리자</label>
                        <span class="basic_select selectbox_ui">
                            <b class="selected_txt">관리자 선택</b>
                            <select>
                                <option value="">관리자 선택</option>
                                <option value="">관리자 선택</option>
                                <option value="">관리자 선택</option>
                                <option value="">관리자 선택</option>
                                <option value="">관리자 선택</option>
                                <option value="">관리자 선택</option>
                                <option value="">관리자 선택</option>
                            </select>
                        </span>
                    </dd>
                    <dd class="tagBox_wrap">
                        <div class="tagBox">
                            <span class="tag">Kinosita<button type="button" class="btn_tagDelete" title="삭제"></button>
                            </span>
                            <span class="tag">Kinosita<button type="button" class="btn_tagDelete" title="삭제"></button>
                            </span>
                            <span class="tag">Kinosita<button type="button" class="btn_tagDelete" title="삭제"></button>
                            </span>
                            <span class="tag">Kinosita<button type="button" class="btn_tagDelete" title="삭제"></button>
                            </span>
                        </div>
                        <span class="warning_message">최소 1명의 관리자가 선택되어야 합니다.</span>
                    </dd>
                </dl>
            </dd>
        </dl>
    </form>
</template>

<script>
    export default {
        name: "DetailOldApp"
    }
</script>

<style scoped>

</style>
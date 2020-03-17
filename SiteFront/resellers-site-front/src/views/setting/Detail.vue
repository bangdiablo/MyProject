<template>
    <section class="content">

        <!-- title bar -->
        <TitleBar/>

        <!-- sub_content -->
        <article class="sub_content sub_account_add sub_common">
            <div class="tabMenu_2depth">
                <ul class="clear_both">
                    <li><a v-on:click="activeTab=1" v-bind:class="[ activeTab === 1 ? 'active' : '']">리포트 설정</a></li>
                    <li><a v-on:click="activeTab=2" v-bind:class="[ activeTab === 2 ? 'active' : '']">로고</a></li>
                    <li><a v-on:click="activeTab=3" v-bind:class="[ activeTab === 3 ? 'active' : '']">연락처<br>(이메일)</a></li>
                    <li><a v-on:click="activeTab=4" v-bind:class="[ activeTab === 4 ? 'active' : '']">만료메일<br>알림</a></li>
                    <li><a v-on:click="activeTab=5" v-bind:class="[ activeTab === 5 ? 'active' : '']">차단유저<br>이메일 송신</a></li>
                    <li><a v-on:click="activeTab=6" v-bind:class="[ activeTab === 6 ? 'active' : '']">오래된 앱<br>알림</a></li>
                </ul>
            </div>

            <div class="settings_wrap" :class="currentTab">

                <!-- S : 리포트 설정 -->
                <DetailReport v-show="isActiveTab(1)"/>
                <!-- E : 리포트 설정 -->

                <!-- S : 로고 -->
                <DetailLogo v-show="isActiveTab(2)"/>
                <!-- E : 로고 -->

                <!-- S : 연락처(이메일) -->
                <DetailContact v-show="isActiveTab(3)"/>
                <!-- E : 연락처(이메일) -->

                <!-- S : 만료메일 알림 -->
                <DetailExpiredMail v-show="isActiveTab(4)"/>
                <!-- E : 만료메일 알림 -->

                <!-- S : 차단유저 이메일 송신 -->
                <DetailBlockedUser v-show="isActiveTab(5)"/>
                <!-- E : 차단유저 이메일 송신 -->

                <!-- S : 오래된 앱 알림 -->
                <DetailOldApp v-show="isActiveTab(6)"/>
                <!-- E : 오래된 앱 알림 -->
            </div>

            <div class="btn_wrap">
                <button class="btn_common submit">저장</button>
            </div>
        </article>
    </section>
</template>

<script>

    import DetailReport from '../../components/setting/DetailReport'
    import DetailLogo from '../../components/setting/DetailLogo'
    import DetailContact from '../../components/setting/DetailContact'
    import DetailExpiredMail from '../../components/setting/DetailExpiredMail'
    import DetailBlockedUser from '../../components/setting/DetailBlockedUser'
    import DetailOldApp from '../../components/setting/DetailOldApp'


    export default {
        name: "Detail",
        components: {
            DetailReport,
            DetailLogo,
            DetailContact,
            DetailExpiredMail,
            DetailBlockedUser,
            DetailOldApp,
        },
        data() {
            return {
                activeTab: 1
            }
        },
        computed: {
            isActiveTab() {

                return (activeTab) => {

                    return activeTab === this.activeTab;
                }
            },
            currentTab() {

                let currentTab = "";

                switch (this.activeTab) {

                    case 1:
                        currentTab = "report";
                        break;

                    case 2:
                        currentTab = "logo";
                        break;

                    case 3:
                        currentTab = "contact";
                        break;

                    case 4:
                        currentTab = "expired notification";
                        break;

                    case 5:
                        currentTab = "blockedUser notification";
                        break;

                    case 6:
                        currentTab = "oldApp notification";
                        break;
                }

                return currentTab;
            }
        },
        mounted() {

            $(function () {

                jQuery("section.content .sub_content").mCustomScrollbar({
                    theme:"minimal-dark"
                });
            });
        },
    }
</script>

<style scoped>
.settings_wrap {
    display: block;
}
</style>
<template>
    <!-- 정책이 할당되어 있는 유저 -->
    <div class="layer_popup preview">
        <h3>{{ $t('policy.policy_pop.policy_assign_user') }}</h3>
        <table class="board_list">
            <caption>{{ $t('policy.policy_pop.policy_assign_user') }}</caption>
            <colgroup>
                <col style="width:150px"/>
                <col style="width:200px"/>
                <col style="width:200px"/>
                <col style="width:200px"/>
                <col style="width:180px"/>
            </colgroup>
            <thead>
            <tr>
                <th scope="col">{{ $t('policy.policy_pop.user_coputer_name') }}</th>
                <th scope="col">{{ $t('policy.policy_pop.email') }}</th>
                <th scope="col">{{ $t('policy.policy_pop.general_storage') }}</th>
                <th scope="col">{{ $t('policy.policy_pop.cold_storage') }}</th>
                <th scope="col">{{ $t('policy.policy_pop.ocr') }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="usercntList.length == 0" class="board_empty">
                <td colspan="5">
                    <p>DATA EMPTY</p>
                </td>
            </tr>
            <tr v-for="(item, index) in usercntList">
                <td class="left">{{item.bs_name}}</td>
                <td class="left">{{item.bs_email}}</td>
                <td>{{item.bs_gnrlsto | prettyBytes}} / {{ $t('policy.policy_pop.nolimit') }}</td>
                <td>{{item.bs_coldsto}} / {{ $t('policy.policy_pop.nolimit') }}</td>
                <td>0 bytes / {{ $t('policy.policy_pop.nolimit') }}</td>
            </tr>
            </tbody>
        </table>

        <div class="btn_set">
            <button type="button" @click="$emit('close')" class="btn_basic cancel">{{ $t('policy.policy_pop.close_btn')
                }}
            </button>
        </div>
        <button class="btn_close" @click="$emit('close')"><img src="@/assets/images/component/btn_popup_close.png"
                                                               alt="닫기"/></button>
    </div>
</template>

<script>
    export default {
        name: "policy_popup",
        props: {
            bp_id: {
                type: Number,
                require: false
            },
            bp_div: {
                type: String,
                require: false
            }
        },
        data() {
            return {
                list: [],
            }
        },
        computed: {
            usercntList() {
                return this.list;
            }
        },
        methods: {
            get_policy_list_usercnt(data) {
                axios.get('/management/policy_list_usercnt/',
                    {
                        params: {
                            bp_id: data.bp_id,
                            bp_div: data.bp_div
                        }
                    }
                )
                    .then((response) => {
                        this.list = response.data
                    })
            },
        },
        filters: {
            prettyBytes: function (num) {
                if (typeof num !== 'number' || isNaN(num)) {
                    throw new TypeError('Expected a number');
                }

                var exponent;
                var unit;
                var neg = num < 0;
                var units = ['bytes', 'Kbytes', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

                if (neg) {
                    num = -num;
                }

                if (num < 1) {
                    return (neg ? '-' : '') + num + ' B';
                }

                exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);
                num = (num / Math.pow(1000, exponent)).toFixed(2) * 1;
                unit = units[exponent];

                return (neg ? '-' : '') + num + ' ' + unit;
            }
        },
        created() {
            let data = {
                bp_id: this.bp_id,
                bp_div: this.bp_div
            }
            this.get_policy_list_usercnt(data)
        },
    }
</script>

<style scoped>
    .layer_popup {
        display: inline-block;
    }
</style>

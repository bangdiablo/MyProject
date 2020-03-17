<template>
    <article id="contents" class="sub">
		<location/>

		<div class="content">
			<span class="intro_guide">파일 및 스토리지에 대해 설정합니다.</span>
			<ul class="category_navi inner">
				<li><a @click="activeTab=1" :class="{active: activeTab === 1, pointer: true}">보유 설정</a></li>
				<li><a @click="activeTab=2" :class="{active: activeTab === 2, pointer: true}">보유 설정(상세)</a></li>
				<li><a @click="activeTab=3" :class="{active: activeTab === 3, pointer: true}">클라이언트 스토리지 경고 설정</a></li>
			</ul>

			<div v-show="activeTab ===1">
				<PossessionSetting v-if="settingData.ready && selector.ready" :parentSettingData="settingData.possessionSetting" :parentSelector="selector" @changeParent="changeSettingData"/>
			</div>
			<div v-show="activeTab ===2">
				<PossessionDetailSetting v-if="settingData.ready && selector.ready" :parentSelector="selector" :parentList="list"/>
			</div>
			<div v-show="activeTab ===3">
				<ClientStorageWarringSetting v-if="settingData.ready && selector.ready" :parentSettingData="settingData.warningSetting" @changeParent="changeSettingData"/>
			</div>
		</div>
	</article>
</template>
<script>
	import PossessionSetting from "../../../components/management/setting/PossessionSetting"
	import PossessionDetailSetting from "../../../components/management/setting/PossessionDetailSetting"
	import ClientStorageWarringSetting from "../../../components/management/setting/ClientStorageWarringSetting"

    export default {
        name: "setting",
		data() {
		  return {
			activeTab: 1,
		  	list: [
		  			// {
					// 	id: '',
					// 	mode: '',	// C:생성, U:수정, D:삭제
					// 	userid: 1,
					// 	user_name: '김동수',
					// 	stoid: 1,
					// 	sto_name: 'DESKTOP-4I7C9EI',
					// 	path: 'download\\',
					// 	div: 'F',
					// 	div_name: '세대',
					// 	settingval: 'A0102',
					// 	settingval_name: '10세대',
					// 	modifydate_name: '2019-11-15'
					// }
			],
		  	settingData: {
				ready: false,
				possessionSetting: {

					general: {
						div: '',
						val: ''
					},
					cold: {
						div: '',
						val: ''
					},
					delete: {
						val: ''
					}
				},
				warningSetting: {

					hideWarn: {
						val: ''
					}
				}
			},
		  	selector: {
				ready: false,
				generation: [],
				period: []
			}
		  }
		},
		components: {
        	PossessionSetting,
			PossessionDetailSetting,
			ClientStorageWarringSetting
		},
		beforeCreate() {

        	// 설정 조회
        	axios.post("/management/setting/possessionSetting/").then(response => {

        		let data = response.data,
					setting;

        		if (data.code === 1000) {

        			setting = data.setting;
        			this.settingData.ready = true;
					this.settingData.possessionSetting.general.div = setting.st_storagediv;
					this.settingData.possessionSetting.general.val = setting.stovalCode;
					this.settingData.possessionSetting.cold.div = setting.st_colddiv;
					this.settingData.possessionSetting.cold.val = setting.coldvalCode;
					this.settingData.possessionSetting.delete.val = setting.retperfileCode;
					this.settingData.warningSetting.hideWarn.val = setting.st_period;

					this.activeTab = 1;
				}

			}).catch(ex => {

				console.log(ex);
			});

        	// selectbox 목록 조회
        	axios.post("/management/setting/getCategory/").then(response => {

				let data = response.data;

				if (data.code === 1000) {

					this.selector.ready = true;
					this.selector.generation = data.generation;
					this.selector.period = data.period;
				}

			}).catch(ex => {

				console.log(ex);
			});
		},
		created() {


		},
		methods: {

        	// 데이터 변경 (from child component)
        	changeSettingData (tabName, settingData) {

				copyObject(settingData, this.settingData[tabName]);
			}
		}
    }
</script>

<style scoped>
.right {
	float: right;
}
.button_set button {
	margin: 0px 4px;
}
</style>

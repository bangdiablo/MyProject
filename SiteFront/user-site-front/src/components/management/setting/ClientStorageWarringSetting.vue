<template>
	<div>
		<div class="setting_form">
			<h3>클라이언트 스토리지 경고 설정</h3>
			<ul class="sf_select_list">
				<li>
					<label>
						<input type="checkbox" v-model="settingData.hideWarn.checked"/>AOSBOX AI plus데스크 톱 클라이언트에서 스토리지 경고를 숨기려면
					</label>
				</li>
			</ul>
		</div>
		<div class="btn_content_set">
			<button type="button" class="btn_basic cancel" @click="cancel">취소</button>
			<button type="button" class="btn_basic submit" @click="saveSetting">저장</button>
		</div>
	</div>
</template>

<script>
    export default {
        name: "ClientStorageWarringSetting",
		props: ['parentSettingData'],
		data() {
        	return {
        		settingData: {

        			hideWarn: {
        				checked: false,
						val: ''
					}
				}
			}
		},
		created() {

        	this.setSettingData();
		},
		watch: {
        	settingData: {

				deep: true,

				handler(deep) {

					let checked = deep.hideWarn.checked;

					if (checked)
						deep.hideWarn.val = 'Y';
					else
						deep.hideWarn.val = 'N';
				}
			}
		},
		methods: {

        	// 화면 데이터에 수정 전 데이터 적용
        	setSettingData () {

        		if (this.parentSettingData.hideWarn.val == 'Y')
					this.settingData.hideWarn.checked = true;
				else
					this.settingData.hideWarn.checked = false;

				this.settingData.hideWarn.val = this.parentSettingData.hideWarn.val;
			},

			// 저장
			saveSetting() {

        		axios.post("/management/setting/save/", {tabName: 'warningSetting', data: this.settingData}).then(response => {

        			let data = response.data;

        			if (data.code === 1000) {

						this.$emit("changeParent", 'warningSetting', this.settingData);
					}

				}).catch(ex => {

					console.log(ex);
				});
			},

			// 취소
			cancel() {

        		this.setSettingData();
			}
		}
    }
</script>

<style scoped>

</style>

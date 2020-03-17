<template>
	<div>
		<div class="setting_form">
			<h3>일반 스토리지 보유</h3>
			<ul class="sf_select_list">
				<li>
					<label for="normalStorage1">
						<input type="radio" name="generalStorage" id="normalStorage1" value="F" @change="changeSettingData('general', 'div', $event)" :checked="settingData.general.div === 'F'"/>각 파일마다 유지
					</label>
					<span class="basic_select selectbox_ui">
						<b class="selected_txt" :class="{disabled: settingData.general.div != 'F'}"></b>
						<select name="" @change="changeSettingData('general', 'val', $event)" :disabled="settingData.general.div != 'F'">
							<option v-for="item in selector.generation" :value="item.bc_code" :selected="item.bc_code == settingData.general.val">{{item.bc_name}}</option>
						</select>
					</span>
				</li>
				<li>
					<label for="normalStorage2">
						<input type="radio" name="generalStorage" id="normalStorage2" value="D" @change="changeSettingData('general', 'div', $event)" :checked="settingData.general.div === 'D'"/>공유 파일의 이전 세대 삭제
					</label>
					<span class="basic_select selectbox_ui">
						<b class="selected_txt" :class="{disabled: settingData.general.div != 'D'}"></b>
						<select name="" @change="changeSettingData('general', 'val', $event)" :disabled="settingData.general.div != 'D'">
							<option v-for="item in selector.period" :value="item.bc_code" :selected="generalVal(item.bc_code)">{{item.bc_name}}</option>
						</select>
					</span>
				</li>
			</ul>
			<h3>콜드 스토리지 보유</h3>
			<ul class="sf_select_list">
				<li>
					<label for="coldStorage1">
						<input type="radio" name="coldStorage" id="coldStorage1" value="F" @change="changeSettingData('cold', 'div', $event)" :checked="settingData.cold.div === 'F'" />각 파일마다 유지
					</label>
					<span class="basic_select selectbox_ui">
						<b class="selected_txt" :class="{disabled: settingData.cold.div != 'F'}"></b>
						<select name="" @change="changeSettingData('cold', 'val', $event)" :disabled="settingData.cold.div != 'F'">
							<option v-for="item in selector.generation" :value="item.bc_code" :selected="item.bc_code == settingData.cold.val">{{item.bc_name}}</option>
						</select>
					</span>
				</li>
				<li>
					<label for="coldStorage2">
						<input type="radio" name="coldStorage" id="coldStorage2" value="D" @change="changeSettingData('cold', 'div', $event)" :checked="settingData.cold.div === 'D'" />공유 파일의 이전 세대 삭제
					</label>
					<span class="basic_select selectbox_ui">
						<b class="selected_txt" :class="{disabled: settingData.cold.div != 'D'}"></b>
						<select name="" @change="changeSettingData('cold', 'val', $event)" :disabled="settingData.cold.div != 'D'">
							<option v-for="item in selector.period" :value="item.bc_code" :selected="item.bc_code == settingData.cold.val">{{item.bc_name}}</option>
						</select>
					</span>
				</li>
			</ul>
			<h3>삭제 후 파일 유지</h3>
			<ul class="sf_select_list">
				<li>
					<label for="deleteFile">
						삭제된 파일 보유 기간
					</label>
					<span class="basic_select selectbox_ui">
						<b class="selected_txt"></b>
						<select name="" id="deleteFile" @change="changeSettingData('delete', 'val', $event)">
							<option v-for="item in selector.period" :value="item.bc_code" :selected="item.bc_code == settingData.delete.val">{{item.bc_name}}</option>
						</select>
					</span>
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
        name: "PossessionSetting",
		props: ['parentSettingData', 'parentSelector'],
		data() {

        	return {
        		settingData: {
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
					},
				},
        		selector: {
        			generation: [],
					period: []
				}
			}
		},
		created() {

        	this.selector = this.parentSelector;

        	this.$nextTick(function () {

        		this.settingData = cloneObject(this.parentSettingData);
			});
		},
		updated() {

        	$(function () {

				//셀렉트박스 UI
				jQuery(".selectbox_ui").each(function() {
					initSelectBox(jQuery(this)) //비동기로 셀렉트 박스를 만들었을 경우 initSelectBox(jQuery("#아이디")) 로 실행시켜줘야 함
				})
			});
		},
		computed: {

        	generalVal() {

        		return (code) => {

        			 return code == this.settingData.general.val;
				}
			},
		},
		methods: {

        	// 선택에 따른 화면 데이터 변경
        	changeSettingData(section, type, event) {

        		let value = event.target.value,
					$target;

        		this.settingData[section][type] = value;

        		// radio button 변경 시
        		if (type === 'div') {

        			// disabled css
        			$(event.target).closest("ul").find("b.selected_txt").each(function () {

        				if ($(this)[0] === $(event.target).closest("li").find("b.selected_txt")[0]) {
        					$(this).removeClass("disabled");

						} else {
        					$(this).addClass("disabled");
						}
					});

        			// type val 부분도 함께 업데이트
					let evt = document.createEvent("HTMLEvents");
					evt.initEvent("change", true, false);
					$(event.target).closest("ul").find("b.selected_txt").each(function () {

						if ($(this).hasClass("disabled")) {

							// do nothing

						} else {

							$target = $(this).next();
						}
					});

					$target[0].dispatchEvent(evt);
				}
			},

			// 저장
			saveSetting() {

        		axios.post("/management/setting/save/", {tabName: 'possessionSetting', data: this.settingData}).then(response => {

        			let data = response.data;

        			if (data.code === 1000) {

        				this.$emit("changeParent", 'possessionSetting', this.settingData);
					}

				}).catch(ex => {

					console.log(ex);
				});
			},

			// 취소
			cancel() {

        		this.setSettingData();
			},

			// 화면 데이터에 수정 전 데이터 적용
			setSettingData() {

        		this.settingData = cloneObject(this.parentSettingData);
			}
		}
    }
</script>

<style scoped>
.disabled {
	background-color: #d8d8d8 !important;
}
</style>

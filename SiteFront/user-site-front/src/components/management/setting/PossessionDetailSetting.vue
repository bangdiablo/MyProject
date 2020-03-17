<template>
	<div>
	<h3>보유 설정(상세)
		<span class="btn_set">
		<button type="button" @click="openLayer('addAndModifySettingLayer')">
			<img src="@/assets/images/component/btn_edit_setting_add.png" alt="" class="ico" />
			<span class="txt">보유설정 추가</span>
		</button>
		</span>
	</h3>

	<template v-if="list.length > 0">
		<table class="board_list">
				<caption>사용자 목록</caption>
				<colgroup>
					<col style="width:*px" />
					<col style="width:150px" />
					<col style="width:240px" />
					<col style="width:100px" />
					<col style="width:100px" />
					<col style="width:150px" />
					<col style="width:65px" />
				</colgroup>
				<thead>
					<tr>
						<th scope="col"><a href="javascript:void(0)" class="sorting inactive" @click="sortList" data-sort="username">사용자</a></th>
						<th scope="col"><a href="javascript:void(0)" class="sorting inactive" @click="sortList" data-sort="storage">단말기</a></th>
						<th scope="col"><a href="javascript:void(0)" class="sorting inactive" @click="sortList" data-sort="path">장소</a></th>
						<th scope="col"><a href="javascript:void(0)" class="sorting inactive" @click="sortList" data-sort="div">종류</a></th>
						<th scope="col"><a href="javascript:void(0)" class="sorting inactive" @click="sortList" data-sort="code">값</a></th>
						<th scope="col"><a href="javascript:void(0)" class="sorting inactive" @click="sortList" data-sort="modifydate">날짜</a></th>
						<th scope="col">&nbsp;</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="data in list" v-if="data.mode != 'D'">
						<td class="left"><a href="#">{{data.user_name}}</a></td>
						<td>{{data.sto_name}}</td>
						<td>{{data.path}}</td>
						<td>{{data.div_name}}</td>
						<td>{{data.settingval_name}}</td>
						<td>{{data.modifydate_name}}</td>
						<td class="item_edit">
							<button type="button" @click="showContext" @mouseleave="hideContext"><i class="more">더 많은</i></button>
							<transition name="fade">
							  <div class="menu_layer" @mouseover="showContext" @mouseleave="hideContext">
								<ul>
									<li><a href="#" @click="openLayer('addAndModifySettingLayer', data.id)">편집</a></li>
									<li><a href="#" @click="openLayer('deleteSettingLayer', data.id)">삭제</a></li>
								</ul>
							  </div>
							</transition>
						</td>
					</tr>
				</tbody>
			</table>

			<!-- 페이지 -->
			<div class="page_navi">
				<a href="#" class="guide prev" @click="getList(prevPage, true)">
				  <img src="@/assets/images/component/btn_page_prev.png" alt="Prev" class="ico">
				</a>
				<template v-for="page in pageArr">
					<a href="#" class="num" :class="{active: page.active}" @click="getList(page.pageNo, true)">{{ page.pageNo }}</a>
				</template>
				<a href="#" class="guide next" @click="getList(nextPage, true)">
					<img src="@/assets/images/component/btn_page_next.png" alt="Next" class="ico">
				</a>
			</div>
		</template>

		<div class="board_empty" v-else>
			<img src="@/assets/images/component/ico_admin_empty.png" alt="" class="ico" />
			<p>보유한 설정이 없습니다.</p>
		</div>


		<!-- 보유 설정 추가 -->
		<div class="layer_popup" ref="addAndModifySettingLayer">
			<h3>보유 설정 추가</h3>
			<fieldset class="write_form">
				<legend>보유 설정 추가 폼</legend>
				<p>
					<span class="category"><label for="spdUser">사용자</label></span>
					<span class="field">
						<span class="basic_select selectbox_ui">
							<b class="selected_txt"></b>
							<select name="" id="spdUser" v-model="layer.userid" @change="getStorageList">
								<option value="">사용자를 선택하세요</option>
								<option v-for="user in userList" :value="user.bu_id">{{getFullName(user)}}</option>
							</select>
						</span>
					</span>
				</p>
				<p>
					<span class="category"><label for="spdDevice">단말기</label></span>
					<span class="field">
						<span class="basic_select selectbox_ui">
							<b class="selected_txt"></b>
							<select name="" id="spdDevice" v-model="layer.stoid">
								<option value="">단말기를 선택하세요</option>
								<option v-for="storage in storageList" :value="storage.bs_id">{{storage.bs_name}}</option>
							</select>
						</span>
					</span>
				</p>
				<p>
					<span class="category"><label for="spdPlace">장소</label></span>
					<span class="field">
						<input type="text" id="spdPlace" v-model="layer.path"/>
					</span>
				</p>
				<ul class="setting_select_list">
					<li>
						<label>
							<input type="radio" name="settingPolicy" value="F" @change="changeLayerData($event, 'div')" class="firstSettingPolicy" :checked="layer.div === 'F'"/>각 파일마다 유지
						</label>
						<span class="basic_select selectbox_ui">
							<b class="selected_txt" :class="{disabled: layer.div != 'F'}"></b>
							<select id="firstSettingval" @change="changeLayerData($event, 'settingval')" :disabled="layer.div != 'F'">
								<option v-for="item in selector.generation" :value="item.bc_code" :selected="item.bc_code == layer.settingval">{{item.bc_name}}</option>
							</select>
						</span>
					</li>
					<li>
						<label>
							<input type="radio" name="settingPolicy" value="D" @change="changeLayerData($event, 'div')" :checked="layer.div === 'D'" />파일의 이전 세대 삭제
						</label>
						<span class="basic_select selectbox_ui">
							<b class="selected_txt" :class="{disabled: layer.div != 'D'}"></b>
							<select @change="changeLayerData($event, 'settingval')" :disabled="layer.div != 'D'">
								<option v-for="item in selector.period" :value="item.bc_code" :selected="item.bc_code == layer.settingval">{{item.bc_name}}</option>
							</select>
						</span>
					</li>
				</ul>
			</fieldset>

			<div class="btn_set">
				<div class="right">
					<button type="button" class="btn_basic cancel" @click="closeLayer">취소</button>
					<button type="button" class="btn_basic submit" @click="addAndModifySetting">확인</button>
				</div>
			</div>
			<button class="btn_close" @click="closeLayer"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
		</div>

		<!-- 보유 설정을 삭제 -->
		<div class="layer_popup" ref="deleteSettingLayer">
			<h3>보유 설정을 삭제</h3>
			<div class="msg warning">
				<h4><img src="@/assets/images/component/ico_lp_admin_warning.png" alt="보유 설정을 삭제" /></h4>
				<p>
					<strong>이 보유 설정을 삭제해도 되겠습니까?</strong>
				</p>
			</div>

			<div class="btn_set">
				<div class="right">
					<button type="button" class="btn_basic cancel" @click="closeLayer">취소</button>
					<button type="button" class="btn_basic submit" @click="deletePossessionDetailSetting">확인</button>
				</div>
			</div>
			<button class="btn_close" @click="closeLayer"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
		</div>

		<!-- 모달 배경 -->
		<div class="modal_bg" ref="modal"></div>
	</div>
</template>

<script>
	import {listAndPageMixin} from '../../../common/listAndPageMixin'

    export default {
        name: "PossessionDetailSetting",
		mixins: [listAndPageMixin],
		props: ['parentList', 'parentSelector'],
		data: function () {
        	return {
				layer: {
					id: '',
					mode: '',
					userid: 5,
					stoid: 31,
					path: 'download\\',
					div: 'F',
					settingval: ''
				},
				selector: {},
				userList: [],
				storageList: []
			}
		},
		created() {

        	this.getList();

			this.selector = this.parentSelector;

			axios.post("/management/setting/getGroupUserList/").then(response => {

				let data = response.data;

				if (data.code === 1000) {

					this.userList = data.userList;
				}

			}).catch(ex => {

				console.log(ex);
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
		methods: {

        	// 사용자 전체 이름
			getFullName(user) {

        		let fullName = user.bu_firstname,
					lastName = user.bu_lastname;

        		if (lastName !== '' && lastName !== null) {

        			fullName += ' ' + lastName;
				}

        		return fullName;
			},

        	// 목록 조회
        	getList(pageNo) {

        		if (pageNo !== undefined)
                    this.pageInfo.currentPage = pageNo;

        		axios.post("/management/setting/getList/", {
                    currentPage: this.pageInfo.currentPage,
                    dataPerPage: this.pageInfo.dataPerPage,
                    orderName : this.pageInfo.orderName,
                    orderType : this.pageInfo.orderType
                }).then(response => {


        			let code = response.data.code,
						dataList = response.data.list,
						totalCount = response.data.totalCount;

        			if (code === 1000) {

        				let list = [];

        				for (let i = 0; i < dataList.length; i++) {

        					let data = dataList[i],
								obj = {};

                            for (let prop in data) {

                                let newPropName = prop.replace('sa_', '');

                                obj[newPropName] = data[prop];
                            }

                            list.push(obj);
						}

        				this.list = list;

        				this.pageInfo.totalData = totalCount;
					}

				}).catch(ex => {

					console.log(ex);
				});
			},

        	// 보유 설정 추가
        	createPossessionDetailSetting() {

        		axios.post("/management/setting/createPossessionDetailSetting/", this.layer).then(response => {

        			let data = response.data;

        			if (data.code === 1000) {

        				this.getList();
        				this.closeLayer();
					}

				}).catch(ex => {

					console.log(ex);
				});
			},

			// 보유 설정 수정
			updatePossessionDetailSetting() {

        		let id = '',
					mode = '';

				axios.post("/management/setting/updatePossessionDetailSetting/", this.layer).then(response => {

        			let data = response.data;

        			if (data.code === 1000) {

        				this.getList();
        				this.closeLayer();
					}

				}).catch(ex => {

					console.log(ex);
				});
			},

			// 보유 설정 삭제
			deletePossessionDetailSetting() {

        		this.layer.mode = 'delete';

				axios.post("/management/setting/updatePossessionDetailSetting/", this.layer).then(response => {

        			let data = response.data;

        			if (data.code === 1000) {

        				this.getList();
        				this.closeLayer();
					}

				}).catch(ex => {

					console.log(ex);
				});
			},

			// 보유설정(상세) 등록 및 수정
			addAndModifySetting() {

        		let userid = this.layer.userid,
					stoid = this.layer.stoid,
					path = this.layer.path,
					div = this.layer.div,
					settingval = this.layer.settingval;

        		if (userid === '') {

        			alert('사용자를 선택해주세요.');
					return;

				} else if (stoid === '') {

        			alert('단말기를 선택해주세요.');
					return;

				} else if (path === '') {

        			alert('장소를 선택해주세요.');
					return;
				}

        		if (this.layer.id === '') {

        			this.createPossessionDetailSetting();

				} else {

        			this.updatePossessionDetailSetting();
				}
			},

			/* 레이어 팝업 ------------------------------------------------- */
        	// 레이어 팝업 보이기
			openLayer(layerName, id) {

				$(this.$refs.modal).show();
				$(this.$refs[layerName]).show();


				if (layerName === 'addAndModifySettingLayer') {

					this.initLayer();
					this.setLayer(id);
				}

				if (id) {

					this.layer.id = id;
				}
			},

			// 레이어 팝업 숨기기
			closeLayer() {

				$(this.$refs.modal).hide();
				$(".layer_popup").hide();
			},

			// 레이어 초기화
			initLayer() {

        		for (let prop in this.layer) {

        			if (prop == 'div')
        				this.layer[prop] = 'F';
        			else
        				this.layer[prop] = '';
				}

        		let evt = document.createEvent("HTMLEvents");
				evt.initEvent("change", true, false);
				$("#firstSettingval")[0].dispatchEvent(evt);
			},

			// 레이어 설정
			setLayer(id) {

        		let list = this.list,
					data;

        		for (let i = 0; i < list.length; i++) {

        			data = list[i];

        			if (id === data.id) {

        				this.layer.userid = data.boxUser;
        				this.layer.mode = 'update';

        				this.getStorageList(data.boxUserstorage);
        				this.layer.path = data.path;
        				this.layer.div = data.div;
        				this.layer.settingval = data.boxCode;
					}
        		}
			},

			// layer의 radio button, selectbox 변경 시
        	changeLayerData(event, prop) {

        		let $target;

        		console.log(prop)
        		this.layer[prop] = event.target.value;

        		// radio button 변경 시
        		if (prop === 'div') {

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

			// 단말기 목록 조회
			getStorageList(stoid) {

        		let userId = this.layer.userid;

        		axios.post("/management/setting/getStorageList/", {userId: userId}).then(response => {

        			let data = response.data;

        			if (data.code === 1000) {

        				this.layer.stoid = '';
						this.storageList = data.storageList;

						if (typeof stoid === 'number') {

							this.$nextTick(function () {

								console.log(stoid, typeof stoid, typeof stoid === 'number')
								console.log('this.layer.stoid', this.layer.stoid);
								console.log('stoid', stoid);
								this.layer.stoid = stoid;
							});
						}
					}

				}).catch(ex => {

					console.log(ex);
				});
			},

			/* 컨텍스트 메뉴 ----------------------------------------------- */
			// 컨텍스트 메뉴 보임
			showContext(event) {

        		$(event.target).closest('td').find('.menu_layer').show();
			},

			// 컨텍스트 메뉴 숨김
			hideContext(event) {

        		$(event.target).closest('td').find('.menu_layer').hide();
			},

			/* 정렬 ------------------------------------------------------- */
			// 목록 정렬
			sortList(event) {

				let $target = $(event.target),
					$sortings = $("a.sorting");

				// 나머지 비활성화
				$sortings.each(function () {

					if ($(this)[0] != $target[0]) {

						$(this).addClass('inactive').removeClass('on');
					}
				});

				if ($target.hasClass('inactive')) {

					// 해당 항목 활성화
					$target.removeClass('inactive');
					$target.addClass('on');

				} else {

					if ($target.hasClass('on')) {

						$target.removeClass('on');

					} else {

						$target.addClass('inactive');
					}
				}

				this.setSort();
				this.getList();
			},

			// 정렬 데이터 설정
			setSort() {

				let orderName = '',
					orderType = '';

				$("a.sorting").each(function () {

					if ($(this).hasClass("inactive")) {

						// do nothing

					} else {

						orderName = $(this).data("sort");
						orderType = $(this).hasClass('on') ? 'asc' : 'desc';
					}
				});

				this.pageInfo.orderName = orderName;
				this.pageInfo.orderType = orderType;
			}
		}
    }
</script>

<style scoped>
.disabled {
	background-color: #d8d8d8 !important;
}
</style>

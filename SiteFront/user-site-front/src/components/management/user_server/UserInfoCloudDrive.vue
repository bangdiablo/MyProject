<template>
    <div class="admin_list">

        <template v-if="list.length > 0">
            <table class="board_list">
                <caption>사용자 목록</caption>
                <colgroup>
                    <col style="width:*px" />
                    <col style="width:120px" />
                    <col style="width:140px" />
                    <col style="width:220px" />
                    <col style="width:220px" />
                    <col style="width:180px" />
                    <col style="width:65px" />
                </colgroup>
                <thead>
                <tr>
                    <th scope="col"><a href="javascript:void(0)" class="sorting">클라우드 드라이브명</a></th>
                    <th scope="col"><a href="javascript:void(0)" class="sorting on">마지막 조작</a></th>
                    <th scope="col"><a href="javascript:void(0)" class="sorting">최종 업로드</a></th>
                    <th scope="col"><a href="javascript:void(0)" class="sorting">최종 다운로드</a></th>
                    <th scope="col"><a href="javascript:void(0)" class="sorting">스토리지 제한</a></th>
                    <th scope="col"><a href="javascript:void(0)" class="sorting">사용한 용량</a></th>
                    <th scope="col">&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="data in list">
                        <td class="left">
                            <template v-if="data.status == 1">
                                <img src="@/assets/images/sub/ico_ad_clouddrive_valid.png" alt="컴퓨터" class="ico_admin" />
                            </template>
                            <template v-else-if="data.status == 2">
                                <img src="@/assets/images/sub/ico_ad_clouddrive_pause.png" alt="컴퓨터" class="ico_admin" />
                            </template>
                            <a href="#">{{data.name}}</a>
                        </td>
                        <td>{{expressDate(data.logdate, '-')}}</td>
                        <td>{{expressDate(data.update, '-')}}</td>
                        <td>{{expressDate(data.downdate, '-')}}</td>
                        <td>{{expressLimit(data.gnrllimit)}}</td>
                        <td>{{expressUsed(data.gnrlsto)}}</td>
                        <td class="item_edit">
                            <button type="button" @click="showContext($event, data.id, true)" @mouseleave="hideContext($event, data.id)">
                                <i class="more">더 많은</i>
                            </button>
                            <transition name="fade">
                                <div class="menu_layer user_context" v-show="data.context.show" @mouseenter="showContext($event, data.id)" @mouseleave="hideContext($event, data.id)" @click.stop>
                                    <ul>
                                        <li><a href="#" @click="openLayerWithValue('restrictGeneralStorageLayer', data.id, data.gnrllimit)">일반 스토리지 제한</a></li>
                                    </ul>
                                </div>
                            </transition>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- 페이지 -->
            <div class="page_navi">
              <a href="#" class="guide prev" @click="getList(prevPage)">
                <img src="@/assets/images/component/btn_page_prev.png" alt="Prev" class="ico">
              </a>
              <template v-for="page in pageArr">
                  <a href="#" class="num" :class="{active: page.active}" @click="getList(page.pageNo)">{{ page.pageNo }}</a>
              </template>
              <a href="#" class="guide next" @click="getList(nextPage)">
                  <img src="@/assets/images/component/btn_page_next.png" alt="Next" class="ico">
              </a>
            </div>
        </template>

        <div class="board_empty" v-else>
            <img src="@/assets/images/component/ico_admin_empty.png" alt="" class="ico" />
            <p>클라우드 드라이브가 없습니다.</p>
        </div>

        <!-- 일반 스토리지 제한 -->
        <div class="layer_popup" ref="restrictGeneralStorageLayer">
            <h3>일반 스토리지 제한</h3>
            <fieldset class="range_form">
                <legend>일반 스토리지 제한</legend>
                <p>
                    <span class="category"><label for="normalStorageLimit">일반 스토리지 제한</label></span>
                    <span class="field size">
				<input type="number" id="normalStorageLimit" v-model.number="layer.value.restrictGeneralStorageLayer" :disabled="layer.checked.restrictGeneralStorageLayer" /> GB
				<label class="check_option"><input type="checkbox" v-model:checked="layer.checked.restrictGeneralStorageLayer" @click="unlimit('restrictGeneralStorageLayer')"/>무제한</label>
			</span>
                </p>
            </fieldset>

            <div class="btn_set">
                <div class="right">
                    <button type="button" class="btn_basic cancel" @click="closeLayer">취소</button>
                    <button type="button" class="btn_basic submit" @click="changeStorage('gnrllimit')">확인</button>
                </div>
            </div>
            <button class="btn_close" @click="closeLayer"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
        </div>

        <!-- 모달 배경 -->
        <div class="modal_bg" ref="modal"></div>
    </div>
</template>

<script>
import {commonMethodsMixin} from '../../../common/commonMethodsMixin'
import {listAndPageMixin} from '../../../common/listAndPageMixin'

export default {
        name: "UserInfoCloudDrive",
    mixins: [commonMethodsMixin, listAndPageMixin],
        data() {
            return {
                userId: '',
                layer: {
                    checked: {
                        restrictGeneralStorageLayer: false,  // 일반 스토리지 제한
                    },
                    value: {
                        restrictGeneralStorageLayer: 0,
                    },
                    selectedId: 0
                }
            }
        },
        computed: {
            statusText() {
              return (value) => {

                  let text = "";

                  if (value === 1) text = '유효';
                  else if (value === 2) text = '일시정지';
                  else if (value === 3) text = '보존';
                  else if (value === 4) text = '삭제';

                  return text;
              }
            },
        },
        methods: {
            // 레이어 팝업 숨기기
            closeLayer() {

                $(this.$refs.modal).hide();
                $(".layer_popup").hide();
            },
            unlimit(layerName) {

               this.layer.value[layerName] = '';
            },
            changeStorage(prop, value) {

                let self = this,
                    selectedIds = [this.layer.selectedId],
                    $targetInput,
                    layerName,
                    unlimitChecked; // 무제한 체크 여부

                value = this.layer.value.restrictGeneralStorageLayer;
                $targetInput = $(this.$refs.restrictGeneralStorageLayer).find('input');
                unlimitChecked = this.layer.checked.restrictGeneralStorageLayer;

                if ((value !== '' && value <= 0) || (value === '' && !unlimitChecked)) {

                    $targetInput.css("border-color", "red");
                    return false;
                }

                axios.post('/management/changeUserStorage/', {
                    storageIds : selectedIds,
                    prop: prop,
                    value: value
                }).then(response => {

                    let data = response.data;

                    if (data.code == 1000) {

                        self.closeLayer();
                        self.getList();
                    }

                }).catch(ex => {

                    console.log(ex);
                });
            },
            showContext(event, id, adjustPosition) {

                let $target = $(event.target)[0].nodeName === 'I' ? $(event.target).closest('button') : $(event.target),
                    $td = $target.closest('td'),
                    $context = $td.find('.menu_layer.user_context'),
                    top,
                    left;

                event.stopPropagation();

                let list = this.list;

                for (let i = 0; i < list.length; i++) {

                    if (list[i].id == id) {

                        list[i].context.show = true;
                    }
                }

                if (adjustPosition) {

                    top = $target.offset().top,
                    left = $target.offset().left + 2 - $context.outerWidth();
                    $context.css("top", top + "px").css("left", left + "px");
                }
            },
            hideContext(event, id, subName) {

                event.stopPropagation();

                let list = this.list;

                for (let i = 0; i < list.length; i++) {

                    if (list[i].id == id) {

                        if (subName === undefined)
                            list[i].context.show = false;
                        else
                            list[i].context[subName].show = false;
                    }
                }

            },

            // 레이어 팝업 보이기
            openLayerWithValue(layerName, id, value) {

                let limitName;

                this.layer.selectedId = id;
                this.layer.value[layerName] = value;

                if (value === '')
                    this.layer.checked[layerName] = true;

                if (layerName === 'restrictGeneralStorageLayer')
                    $(this.$refs[layerName]).find("input").css("border-color", "#CCCCCC");

                $(this.$refs.modal).show();
                $(this.$refs[layerName]).show();
            },

            getList(pageNo) {

                const self      = this;
                let dataPerPage = this.pageInfo.dataPerPage,
                    userId      = this.userId,
                    listType    = 'Cloud',
                    url         = "/management/user_server/detail/user/" + userId + "/list/" + listType + "/",
                    currentPage;

                if (pageNo !== undefined)
                    this.pageInfo.currentPage = pageNo;

                currentPage = this.pageInfo.currentPage

                axios.post(url, {currentPage: currentPage, dataPerPage: dataPerPage}).then(response => {

                    let data = response.data;

                    if (data.code == 1000) {

                        let list = data.list,
                            totalListCount = data.totalListCount,
                            tempList = [];

                        console.log(list)
                        self.pageInfo.totalData = totalListCount;

                        for (let i = 0; i < list.length; i++) {

                            let data = list[i];
                            let obj = {};

                            for (let prop in data) {

                                let newPropName = prop.replace('bs_', '');

                                obj[newPropName] = data[prop];

                                if (prop === 'bs_gnrllimit' && data[prop] == 0)
                                    obj[newPropName] = '';
                            }

                            obj.context = {
                                show: false
                            };

                            tempList.push(obj);
                        }

                        self.list = tempList;
                        self.$emit('setTotalListCount', listType, totalListCount);
                    }
                }).catch(ex => {

                    console.log(ex);
                });
            }
        },
        created() {

            this.userId = this.$route.params.userId;
            this.getList()
        }
    }
</script>

<style scoped>
.menu_layer {
    display: block;
}
.menu_layer.user_context {
    position: fixed;
}
</style>
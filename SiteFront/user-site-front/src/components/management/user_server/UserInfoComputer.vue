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
                    <th scope="col"><a href="javascript:void(0)" class="sorting">유저명/컴퓨터 이름</a></th>
                    <th scope="col"><a href="javascript:void(0)" class="sorting on">상황</a></th>
                    <th scope="col"><a href="javascript:void(0)" class="sorting">전회 사용</a></th>
                    <th scope="col"><a href="javascript:void(0)" class="sorting">일반 스토리지 사용량/최대</a></th>
                    <th scope="col"><a href="javascript:void(0)" class="sorting">콜드 스토리지 사용량/최대</a></th>
                    <th scope="col"><a href="javascript:void(0)" class="sorting">OCR 사용량/최대</a></th>
                    <th scope="col">&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="data in list">
                        <td class="left">
                            <template v-if="data.status == 1">
                                <img src="@/assets/images/sub/ico_ad_computer_valid.png" alt="컴퓨터" class="ico_admin" />
                            </template>
                            <template v-else-if="data.status == 2">
                                <img src="@/assets/images/sub/ico_ad_computer_pause.png" alt="컴퓨터" class="ico_admin" />
                            </template>
                            <a href="#">{{data.user_computer}}</a>
                        </td>
                        <td>{{statusText(data.status)}}</td>
                        <td>{{expressDate(data.logdate, '-')}}</td>
                        <td>{{expressUsed(data.gnrlsto)}} / {{expressLimit(data.gnrllimit)}}</td>
                        <td>{{expressUsed(data.coldsto)}} / {{expressLimit(data.coldlimit)}}</td>
                        <td>{{expressUsed(data.ocr, '페이지')}} / {{expressLimit(data.ocrlimit, '페이지')}}</td>
                        <td class="item_edit">
                            <button type="button" @click="showContext($event, data.id, true)" @mouseleave="hideContext($event, data.id)">
                                <i class="more">더 많은</i>
                            </button>
<!--                            <a href="#" class="btn_more"><img src="@/assets/images/component/board_btn_more.png" alt="더 보기" @click="showContext($event, data.id)" @mouseleave="hideContext($event, data.id)"/></a>-->
                            <transition name="fade">
                                <div class="menu_layer user_context" v-show="data.context.show" @mouseenter="showContext($event, data.id)" @mouseleave="hideContext($event, data.id)" @click.stop>
                                    <ul>
                                        <li><a href="#" @click="openLayer('activateComputerLayer', data.id)">컴퓨터 유효화</a></li>
                                        <li><a href="#" @click="openLayer('pauseComputerLayer', data.id)">컴퓨터 일시정지</a></li>
                                        <li><a href="#" @click="openLayer('archiveComputerLayer', data.id)">컴퓨터 아카이브</a></li>
                                        <li><a href="#" @click="openLayer('deleteComputerLayer', data.id)">컴퓨터 삭제</a></li>
                                        <li><a href="#" @click="openLayerWithValue('changeComputerNameLayer', data.id, data.name)">컴퓨터 이름 변경</a></li>
                                        <li><a href="#" @click="openLayerWithValue('restrictGeneralStorageLayer', data.id, data.gnrllimit)">일반 스토리지 제한</a></li>
                                        <li><a href="#" @click="openLayerWithValue('restrictColdStorageLayer', data.id, data.coldlimit)">콜드 스토리지 제한</a></li>
                                        <li><a href="#" @click="openLayerWithValue('restrictOcrPageLayer', data.id, data.ocrlimit)">OCR 페이지 수 제한</a></li>
                                        <li><a href="#" @click="openLayer('backupLayer', data.id)">백업 개시</a></li>
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
            <p>컴퓨터가 없습니다.</p>
        </div>

        <!-- 컴퓨터 유효화 -->
        <div class="layer_popup" ref="activateComputerLayer">
            <h3>컴퓨터 유효화</h3>
            <div class="msg success">
                <h4><img src="@/assets/images/component/ico_lp_success.png" alt="컴퓨터 유효화" /></h4>
                <p>
                    <strong>선택한 항목을 활성화 해도 되겠습니까?</strong>
                </p>
            </div>

            <div class="btn_set">
                <div class="right">
                    <button type="button" class="btn_basic cancel" @click="closeLayer">취소</button>
                    <button type="button" class="btn_basic submit" @click="changeStorage('status', 'activate')">확인</button>
                </div>
            </div>
            <button class="btn_close" @click="closeLayer"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
        </div>

        <!-- 컴퓨터 일시 정지 -->
        <div class="layer_popup" ref="pauseComputerLayer">
            <h3>컴퓨터 일시 정지</h3>
            <div class="msg warning">
                <h4><img src="@/assets/images/component/ico_lp_warning.png" alt="컴퓨터 일시 정지" /></h4>
                <p>
                    <strong>선택한 항목을 일시정지 해도 되겠습니까?</strong>
                </p>
            </div>

            <div class="btn_set">
                <div class="right">
                    <button type="button" class="btn_basic cancel" @click="closeLayer">취소</button>
                    <button type="button" class="btn_basic submit" @click="changeStorage('status', 'pause')">확인</button>
                </div>
            </div>
            <button class="btn_close" @click="closeLayer"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
        </div>

        <!-- 컴퓨터 아카이브 -->
        <div class="layer_popup" ref="archiveComputerLayer">
            <h3>컴퓨터 아카이브</h3>
            <div class="msg warning">
                <h4><img src="@/assets/images/component/ico_lp_warning.png" alt="컴퓨터 아카이브" /></h4>
                <p>
                    <strong>경고!</strong><br />
                    컴퓨터를 보존하면 이 컴퓨터의 백업은 정지되고 재개할 수 없게 됩니다.<br />
                    진행하시겠습니까?
                </p>
            </div>

            <div class="btn_set">
                <div class="right">
                    <button type="button" class="btn_basic cancel" @click="closeLayer">취소</button>
                    <button type="button" class="btn_basic submit" @click="changeStorage('status', 'archive')">확인</button>
                </div>
            </div>
            <button class="btn_close" @click="closeLayer"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
        </div>

        <!-- 컴퓨터 삭제 -->
        <div class="layer_popup" ref="deleteComputerLayer">
            <h3>컴퓨터 삭제</h3>
            <div class="msg warning">
                <h4><img src="@/assets/images/component/ico_lp_warning.png" alt="컴퓨터 삭제" /></h4>
                <p>
                    <strong>컴퓨터를 삭제합니다.</strong><br />
                    선택한 단말을 제거하면 그 정보와 파일은<br />
                    AOSBOX AI plus부터 영구적으로 삭제되고<br />
                    두번 다시 접속할 수 없게 됩니다.<br />
                    진행하시겠습니까?
                </p>
            </div>

            <div class="btn_set">
                <div class="right">
                    <button type="button" class="btn_basic cancel" @click="closeLayer">취소</button>
                    <button type="button" class="btn_basic submit" @click="changeStorage('status', 'delete')">확인</button>
                </div>
            </div>
            <button class="btn_close" @click="closeLayer"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
        </div>

        <!-- 컴퓨터 이름 변경 -->
        <div class="layer_popup" ref="changeComputerNameLayer">
            <h3>컴퓨터 이름 변경</h3>
            <fieldset class="write_form">
                <legend>컴퓨터 이름 변경</legend>
                <p>
			<span class="category">
				<label for="comNameChange">이름</label>
			</span>
                    <span class="field">
				<input type="text" id="comNameChange" v-model="layer.value.changeComputerNameLayer"/>
			</span>
                </p>
            </fieldset>

            <div class="btn_set">
                <div class="right">
                    <button type="button" class="btn_basic cancel" @click="closeLayer">취소</button>
                    <button type="button" class="btn_basic submit" @click="changeStorage('name')">확인</button>
                </div>
            </div>
            <button class="btn_close" @click="closeLayer"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
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

        <!-- 콜드 스토리지 제한 -->
        <div class="layer_popup" ref="restrictColdStorageLayer">
            <h3>콜드 스토리지 제한</h3>
            <fieldset class="range_form">
                <legend>콜드 스토리지 제한</legend>
                <p>
                    <span class="category"><label for="coldStorageLimit">콜드 스토리지 제한</label></span>
                    <span class="field size">
				<input type="number" id="coldStorageLimit" v-model.number="layer.value.restrictColdStorageLayer" :disabled="layer.checked.restrictColdStorageLayer" /> GB
				<label class="check_option"><input type="checkbox" v-model:checked="layer.checked.restrictColdStorageLayer" @click="unlimit('restrictColdStorageLayer')" />무제한</label>
			</span>
                </p>
            </fieldset>

            <div class="btn_set">
                <div class="right">
                    <button type="button" class="btn_basic cancel" @click="closeLayer">취소</button>
                    <button type="button" class="btn_basic submit" @click="changeStorage('coldlimit')">확인</button>
                </div>
            </div>
            <button class="btn_close" @click="closeLayer"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
        </div>

        <!-- OCR 페이지 수 제한 -->
        <div class="layer_popup" ref="restrictOcrPageLayer">
            <h3>OCR 페이지 수 제한</h3>
            <fieldset class="range_form">
                <legend>OCR 페이지 수 제한</legend>
                <p>
                    <span class="category"><label for="ocrPageLimit">OCR 페이지 수 제한</label></span>
                    <span class="field size">
				<input type="number" id="ocrPageLimit" v-model.number="layer.value.restrictOcrPageLayer" :disabled="layer.checked.restrictOcrPageLayer"/> 페이지
				<label class="check_option"><input type="checkbox" v-model:checked="layer.checked.restrictOcrPageLayer" @click="unlimit('restrictOcrPageLayer')" />무제한</label>
			</span>
                </p>
            </fieldset>

            <div class="btn_set">
                <div class="right">
                    <button type="button" class="btn_basic cancel" @click="closeLayer">취소</button>
                    <button type="button" class="btn_basic submit" @click="changeStorage('ocrlimit')">확인</button>
                </div>
            </div>
            <button class="btn_close" @click="closeLayer"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
        </div>

        <!-- 백업 게시 -->
        <div class="layer_popup" ref="backupLayer">
            <h3>백업 게시</h3>
            <div class="msg warning">
                <h4><img src="@/assets/images/component/ico_lp_warning.png" alt="백업 게시" /></h4>
                <p>
                    <strong>이 단말기의 백업을 시작해도 될까요?</strong><br />
                    이 과정은 시작하기까지 최대 15분 걸리는 경우가 있습니다.
                </p>
            </div>

            <div class="btn_set">
                <div class="right">
                    <button type="button" class="btn_basic cancel" @click="closeLayer">취소</button>
                    <button type="button" class="btn_basic submit">확인</button>
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
        name: "UserInfoComputer",
        mixins: [commonMethodsMixin, listAndPageMixin],
        data() {
            return {
                userId: '',
                layer: {
                    checked: {
                        restrictGeneralStorageLayer: false,  // 일반 스토리지 제한
                        restrictColdStorageLayer: false,     // 콜드 스토리지 제한
                        restrictOcrPageLayer: false,         // OCR 페이지 수 제한
                    },
                    value: {
                        changeComputerNameLayer: '',
                        restrictGeneralStorageLayer: 0,
                        restrictColdStorageLayer: 0,
                        restrictOcrPageLayer: 0
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
            openLayer(layerName, id) {

                $(this.$refs.modal).show();
                $(this.$refs[layerName]).show();

                if (id)
                    this.layer.selectedId = id;
            },

            // 레이어 팝업 보이기
            openLayerWithValue(layerName, id, value) {

                let limitName;

                if (id)
                    this.layer.selectedId = id;

                if (value)
                    this.layer.value[layerName] = value;

                switch(layerName) {
                    case 'changeComputerNameLayer':
                        this.layer.value[layerName] = value;
                        break;

                    case 'restrictGeneralStorageLayer':
                    case 'restrictColdStorageLayer':
                    case 'restrictOcrPageLayer':
                        $(this.$refs[layerName]).find("input").css("border-color", "#CCCCCC");

                        this.layer.value[layerName] = value;

                        if (value === '')
                            this.layer.checked[layerName] = true;
                        break;

                    default:
                        // do nothing
                }

                $(this.$refs.modal).show();
                $(this.$refs[layerName]).show();
            },

            // 레이어 팝업 숨기기
            closeLayer() {

                $(this.$refs.modal).hide();
                $(".layer_popup").hide();
            },

            unlimit(layerName) {

               this.layer.value[layerName] = '';
            },

            getList(pageNo) {

                const self      = this;
                let dataPerPage = this.pageInfo.dataPerPage,
                    userId      = this.userId,
                    listType    = 'Computer',
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

                        self.pageInfo.totalData = totalListCount;

                        for (let i = 0; i < list.length; i++) {

                            let data = list[i];
                            let obj = {};

                            for (let prop in data) {

                                let newPropName = prop.replace('bs_', '');

                                obj[newPropName] = data[prop];

                                switch(prop) {
                                    case 'bs_gnrllimit':
                                    case 'bs_coldlimit':
                                    case 'bs_ocrlimit':
                                        if (data[prop] == 0)
                                            obj[newPropName] = '';
                                        break;

                                    default:
                                        // do nothing
                                }
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
            },
            changeStorage(prop, value) {

                let self = this,
                    selectedIds = [this.layer.selectedId],
                    $targetInput,
                    layerName,
                    unlimitChecked; // 무제한 체크 여부

                if (prop == 'gnrllimit' || prop == 'coldlimit' || prop == 'ocrlimit' || prop == 'name') {

                    if (prop == 'gnrllimit')
                        layerName = 'restrictGeneralStorageLayer';
                    else if (prop == 'coldlimit')
                        layerName = 'restrictColdStorageLayer';
                    else if (prop == 'ocrlimit')
                        layerName = 'restrictOcrPageLayer';
                    else if (prop == 'name')
                        layerName = 'changeComputerNameLayer';

                    value = this.layer.value[layerName];

                    if (prop == 'gnrllimit' || prop == 'coldlimit' || prop == 'ocrlimit') {

                        $targetInput = $(this.$refs[layerName]).find('input');
                        unlimitChecked = this.layer.checked[layerName];

                        if ((value !== '' && value <= 0) || (value === '' && !unlimitChecked)) {

                            $targetInput.css("border-color", "red");
                            return false;
                        }
                    }
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
            }
        },
        created() {

            this.userId = this.$route.params.userId;
            this.getList();
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
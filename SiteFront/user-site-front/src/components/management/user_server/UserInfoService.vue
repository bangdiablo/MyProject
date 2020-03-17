<template>
    <div class="admin_list">

        <template v-if="list.length > 0">
            <table class="board_list">
                <caption>사용자 목록</caption>
                <colgroup>
                    <col style="width:*px" />
                    <col style="width:170px" />
                    <col style="width:140px" />
                    <col style="width:140px" />
                    <col style="width:220px" />
                    <col style="width:220px" />
                    <col style="width:180px" />
                    <col style="width:65px" />
                </colgroup>
                <thead>
                <tr>
                    <th scope="col"><a href="javascript:void(0)" class="sorting">서비스 이름</a></th>
                    <th scope="col"><a href="javascript:void(0)" class="sorting on">메일주소/전화번호</a></th>
                    <th scope="col"><a href="javascript:void(0)" class="sorting">마지막 조작</a></th>
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
                                <img v-if="data.name == 'DB'" src="@/assets/images/sub/ico_ad_dropbox_valid.png" alt="DropBox" class="ico_admin" />
                                <img v-else-if="data.name == 'BX'" src="@/assets/images/sub/ico_ad_box_valid.png" alt="Box" class="ico_admin" />
                                <img v-else-if="data.name == 'IG'" src="@/assets/images/sub/ico_ad_instagram_valid.png" alt="Instagram" class="ico_admin" />
                                <img v-else-if="data.name == 'GD'" src="@/assets/images/sub/ico_ad_googledrive_valid.png" alt="Google Drive" class="ico_admin" />
                                <img v-else-if="data.name == 'OD'" src="@/assets/images/sub/ico_ad_onedrive_valid.png" alt="OneDrive" class="ico_admin" />
                            </template>
                            <template v-else-if="data.status == 2">
                                <img v-if="data.name == 'DB'" src="@/assets/images/sub/ico_ad_dropbox_pause.png" alt="DropBox" class="ico_admin" />
                                <img v-else-if="data.name == 'BX'" src="@/assets/images/sub/ico_ad_box_pause.png" alt="Box" class="ico_admin" />
                                <img v-else-if="data.name == 'IG'" src="@/assets/images/sub/ico_ad_instagram_pause.png" alt="Instagram" class="ico_admin" />
                                <img v-else-if="data.name == 'GD'" src="@/assets/images/sub/ico_ad_googledrive_pause.png" alt="Google Drive" class="ico_admin" />
                                <img v-else-if="data.name == 'OD'" src="@/assets/images/sub/ico_ad_onedrive_pause.png" alt="OneDrive" class="ico_admin" />
                            </template>
                            <a href="#">
                                <template v-if="data.name == 'DB'">DropBox</template>
                                <template v-if="data.name == 'BX'">Box</template>
                                <template v-if="data.name == 'IG'">Instagram</template>
                                <template v-if="data.name == 'GD'">Google Drive</template>
                                <template v-if="data.name == 'OD'">OneDrive</template>
                            </a>
                        </td>
                        <td>{{data.email}}</td>
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
                                        <li><a href="#" @click="openLayer('backupLayer', data.id)">이 드라이브를 백업</a></li>
                                        <li><a href="#" @click="openLayer('deleteServiceLayer', data.id, data.name)">{{getServiceName(data.name)}}삭제</a></li>
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
            <p>서비스가 없습니다.</p>
        </div>

        <!-- 이 드라이브를 백업 -->
        <div class="layer_popup" ref="backupLayer">
            <h3>이 드라이브를 백업</h3>
            <div class="msg warning">
                <h4><img src="@/assets/images/component/ico_lp_warning.png" alt="이 드라이브를 백업" /></h4>
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

        <!-- service 삭제 -->
        <div class="layer_popup" ref="deleteServiceLayer">
            <h3>{{layer.selectedType}} 삭제</h3>
            <div class="msg warning">
                <h4><img src="@/assets/images/component/ico_lp_warning.png" alt="백업 게시" /></h4>
                <p>
                    {{layer.selectedType}}를 제거하면 {{layer.selectedType}} 계정의 백업 서비스가 정지하고 AOSBOX AI plus의 모든 백업 데이터도 삭제됩니다.<br/>
                    속행해도 되겠습니까?
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

        <!-- 모달 배경 -->
        <div class="modal_bg" ref="modal"></div>
    </div>
</template>

<script>
import {commonMethodsMixin} from '../../../common/commonMethodsMixin'
import {listAndPageMixin} from '../../../common/listAndPageMixin'

export default {
        name: "UserInfoService",
    mixins: [commonMethodsMixin, listAndPageMixin],
        data() {
            return {
                userId: '',
                layer: {
                    selectedId: 0,
                    selectedType: ''
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

            getServiceName(serviceType) {

                let serviceName;

                switch (serviceType) {

                    case 'DB':
                        serviceName = 'DropBox';
                        break;

                    case 'BX':
                        serviceName = 'Box';
                        break;

                    case 'IG':
                        serviceName = 'Instagram';
                        break;

                    case 'GD':
                        serviceName = 'Google Drive';
                        break;

                    case 'OD':
                        serviceName = 'OneDrive';
                        break;
                }

                return serviceName;
            },

            // 레이어 팝업 보이기
            openLayer(layerName, id, serviceType) {

                $(this.$refs.modal).show();
                $(this.$refs[layerName]).show();

                if (id)
                    this.layer.selectedId = id;

                if (serviceType)
                    this.layer.selectedType = this.getServiceName(serviceType);
            },

            // 레이어 팝업 숨기기
            closeLayer() {

                $(this.$refs.modal).hide();
                $(".layer_popup").hide();
            },

            unlimit(layerName) {

               this.layer.value[layerName] = 0;
            },

            getList(pageNo) {

                const self      = this;
                let dataPerPage = this.pageInfo.dataPerPage,
                    userId      = this.userId,
                    listType    = 'CloudDriveService',
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

                                obj[prop.replace('bs_', '')] = data[prop];

                                // switch(prop) {
                                //     case 'bu_gnrlsto':
                                //     case 'bu_coldsto':
                                //     case 'bu_ocr':
                                //         if (data[prop] == null)
                                //             obj[prop.replace('bu_', '')] = 0;
                                //         break;
                                //     default:
                                //         // do nothing
                                // }
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
                    storageId = this.layer.selectedId;

                axios.post('/management/changeUserStorage/', {
                    storageId : storageId,
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
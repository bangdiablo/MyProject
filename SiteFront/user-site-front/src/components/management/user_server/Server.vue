<template>
    <div class="admin_list">
        <div class="board_search_edit">
            <fieldset class="search_form left">
                <legend>사용자검색</legend>
                <p>
                    <input type="text" v-model="pageInfo.searchText" @keydown.enter="getList(1)"/>
                    <button type="button" @click="getList(1)"><img src="@/assets/images/sub/btn_ae_search.png" alt="검색"/></button>
                </p>
            </fieldset>
            <div class="btn_edit right">
                <button type="button" @click="context.userAdd=true" @mouseleave="context.userAdd=false"><img
                        src="@/assets/images/component/btn_edit_user_add.png"
                        alt="" class="ico"/><span
                        class="txt">사용자 추가</span>
                </button>
                <transition name="fade">
                    <div class="menu_layer top_menu_layer" v-show="context.userAdd" @mouseover="context.userAdd=true" @mouseleave="context.userAdd=false">
                        <ul>
                            <li><router-link to="/management/user_server/mail_invitation">메일로 초대</router-link></li>
                            <li><router-link to="/management/user_server/manual_invitation">수동으로 추가</router-link></li>
                            <li><router-link to="/management/user_server/csv_invitation">CSV파일에서 일괄 추가</router-link></li>
                        </ul>
                    </div>
                </transition>
                <button type="button" @click="context.detail=true" @mouseleave="context.detail=false" ><img src="@/assets/images/component/btn_edit_detail.png" alt="" class="ico"/><span
                        class="txt">상세</span></button>
                <transition name="fade">
                    <div class="menu_layer top_menu_layer" id="menu_layer_detail" v-show="context.detail" @mouseover="context.detail=true" @mouseleave="context.detail=false">
                        <ul>
                            <li><a href="#" @click="checkSelectedAndOpenLayer('activateServerLayer')">서버 유효화</a></li>
                            <li><a href="#" @click="checkSelectedAndOpenLayer('pauseComputerLayer')">서버 일시 정지</a></li>
                            <li><a href="#" @click="checkSelectedAndOpenLayer('archiveServerLayer')">서버 아카이브</a></li>
                            <li><a href="#" @click="checkSelectedAndOpenLayer('deleteComputerLayer')">서버 삭제</a></li>
                            <li><a href="#" @click="restrictLayer('gnrl')">일반 스토리지 제한</a></li>
                            <li><a href="#" @click="restrictLayer('cold')">콜드 스토리지 제한</a></li>
                            <li><a href="#" @click="restrictLayer('ocr')">OCR 페이지 수 제한</a></li>
                            <li><a href="#" @click="downloadCSV">CSV 내보내기</a></li>
                        </ul>
                    </div>
                </transition>
            </div>
        </div>

        <template v-if="list.length > 0">
            <table class="board_list">
                <caption>사용자 목록</caption>
                <colgroup>
                    <col style="width:70px"/>
                    <col style="width:*px"/>
                    <col style="width:120px"/>
                    <col style="width:140px"/>
                    <col style="width:220px"/>
                    <col style="width:220px"/>
                    <col style="width:180px"/>
                    <col style="width:65px"/>
                </colgroup>
                <thead>
                <tr>
                    <th scope="col"><input type="checkbox" title="전체선택" v-model="checkedAll"/></th>
                    <th scope="col"><a href="javascript:void(0)" class="sorting inactive" @click="sortList" data-sort="manager">관리 사용자</a></th>
                    <th scope="col"><a href="javascript:void(0)" class="sorting inactive" @click="sortList" data-sort="server">서버 이름</a></th>
                    <th scope="col"><a href="javascript:void(0)" class="sorting inactive" @click="sortList" data-sort="policy">정책</a></th>
                    <th scope="col"><a href="javascript:void(0)" class="sorting inactive" @click="sortList" data-sort="general">일반 스토리지 사용량/최대</a></th>
                    <th scope="col"><a href="javascript:void(0)" class="sorting inactive" @click="sortList" data-sort="cold">콜드 스토리지 사용량/최대</a></th>
                    <th scope="col"><a href="javascript:void(0)" class="sorting inactive" @click="sortList" data-sort="ocr">OCR 사용량/최대</a></th>
                    <th scope="col">&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                <tr class="pointer" v-for="item in list" :key="item.id">
                    <td @click.stop><input type="checkbox" title="선택" v-model:cheked="item.checked" /></td>
                    <td class="left">
                        <img v-if="item.status == 1" src="@/assets/images/sub/ico_ad_server_valid.png" alt="컴퓨터" class="ico_admin"/>
                        <img v-else-if="item.status == 2" src="@/assets/images/sub/ico_ad_server_pause.png" alt="컴퓨터" class="ico_admin"/>
                        <a href="#">{{item.user_fullname}}<img src="@/assets/images/sub/ico_cn_new.png" alt="신규" class="new" v-show="item.new == 'Y'"/></a></td>
                    <td>{{item.name}}</td>
                    <td>{{setPolicyName(item.policyname)}}</td>
                    <td>{{expressUsed(item.gnrlsto)}} / {{expressLimit(item.gnrllimit)}}</td>
                    <td>{{expressUsed(item.coldsto)}} / {{expressLimit(item.coldlimit)}}</td>
                    <td>{{expressUsed(item.ocr, '페이지')}} / {{expressLimit(item.ocrlimit, '페이지')}}</td>
                    <td class="item_edit">
                        <button type="button" @click="showContext($event, item.id, true)" @mouseleave="hideContext($event, item.id)">
                            <i class="more">더 많은</i>
                        </button>
                        <transition name="fade">
                            <div class="menu_layer user_context" v-show="item.context.show" @mouseover="item.context.show=true" @mouseleave="item.context.show=false">
                                <ul>
                                    <li><a href="#" @click="checkSelectedAndOpenLayer('activateServerLayer', item.id)">서버 유효화</a></li>
                                    <li><a href="#" @click="checkSelectedAndOpenLayer('pauseComputerLayer', item.id)">서버 일시 정지</a></li>
                                    <li><a href="#" @click="checkSelectedAndOpenLayer('archiveServerLayer', item.id)">서버 아카이브</a></li>
                                    <li><a href="#" @click="checkSelectedAndOpenLayer('deleteComputerLayer', item.id)">서버 삭제</a></li>
                                    <li><a href="#" @click="checkSelectedAndOpenLayer('changeServerNameLayer', item.id)">서버 이름 변경</a></li>
                                    <li><a href="#" @click="checkSelectedAndOpenLayer('deletePolicyLayer', item.id)">정책을 삭제</a></li>
                                    <li><a href="#" @click="checkSelectedAndOpenLayer('changePolicyLayer', item.id)">정책을 수정</a></li>
                                    <li><a href="#" @click="restrictLayer('gnrl', item.id)">일반 스토리지 제한</a></li>
                                    <li><a href="#" @click="restrictLayer('cold', item.id)">콜드 스토리지 제한</a></li>
                                    <li><a href="#" @click="restrictLayer('ocr', item.id)">OCR 페이지 수 제한</a></li>
                                    <li><a href="#" @click="getStartedBackup(item.id)">백업 개시</a></li>
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
          <p>서버가 없습니다.</p>
        </div>


        <!-- 서버 선택 -->
        <div class="layer_popup" ref="noSelectedServerLayer">
            <h3>서버 선택</h3>
            <div class="msg warning">
                <h4><img src="@/assets/images/component/ico_lp_admin_warning.png" alt="서버 선택" /></h4>
                <p>
                    <strong>서버를 선택하세요.</strong>
                </p>
            </div>

            <div class="btn_set">
                <div class="center">
                    <button type="button" class="btn_basic submit" @click="closeLayer">확인</button>
                </div>
            </div>
            <button class="btn_close" @click="closeLayer"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
        </div>

        <!-- 서버 유효화 - 이미 유효화 -->
        <div class="layer_popup" ref="alreadyActivatedComputerLayer">
            <h3>서버 유효화</h3>
            <div class="msg warning">
                <h4><img src="@/assets/images/component/ico_lp_warning.png" alt="서버 유효화" /></h4>
                <p>
                    <strong>이미 유효화 되고 있습니다.</strong>
                </p>
            </div>

            <div class="btn_set">
                <div class="right">
                    <button type="button" class="btn_basic cancel" @click="closeLayer">취소</button>
                </div>
            </div>
            <button class="btn_close" @click="closeLayer"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
        </div>

        <!-- 서버 유효화 -->
        <div class="layer_popup" ref="activateServerLayer">
            <h3>서버 유효화</h3>
            <div class="msg success">
                <h4><img src="@/assets/images/component/ico_lp_success.png" alt="서버 유효화" /></h4>
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

        <!-- 서버 일시 정지 -->
        <div class="layer_popup" ref="pauseComputerLayer">
            <h3>서버 일시 정지</h3>
            <div class="msg warning">
                <h4><img src="@/assets/images/component/ico_lp_warning.png" alt="서버 일시 정지" /></h4>
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

        <!-- 서버 아카이브 -->
        <div class="layer_popup" ref="archiveServerLayer">
            <h3>서버 아카이브</h3>
            <div class="msg warning">
                <h4><img src="@/assets/images/component/ico_lp_warning.png" alt="서버 아카이브" /></h4>
                <p>
                    <strong>경고!</strong><br />
                    서버를 보존하면 이 컴퓨터의 백업은 정지되고 재개할 수 없게 됩니다.<br />
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

        <!-- 서버 삭제 -->
        <div class="layer_popup" ref="deleteComputerLayer">
            <h3>서버 삭제</h3>
            <div class="msg warning">
                <h4><img src="@/assets/images/component/ico_lp_warning.png" alt="컴퓨터 삭제" /></h4>
                <p>
                    <strong>서버를 삭제합니다.</strong><br />
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

        <!-- 서버 이름 변경 -->
        <div class="layer_popup" ref="changeServerNameLayer">
            <h3>서버 이름 변경</h3>
            <fieldset class="write_form">
                <legend>서버 이름 변경</legend>
                <p>
                    <span class="category">
                        <label for="serverNameChange">이름</label>
                    </span>
                    <span class="field">
                        <input type="text" id="serverNameChange" v-model="layer.value.name"/>
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

        <!-- 정책 삭제 -->
        <div class="layer_popup" ref="deletePolicyLayer">
            <h3>정책 삭제</h3>
            <div class="msg warning">
                <h4><img src="@/assets/images/component/ico_lp_admin_warning.png" alt="정책 삭제" /></h4>
                <p>
                    <strong>정책을 삭제합니다.</strong><br />
                    정책을 삭제하면 이 정책을 배정 받던 유저는 자신이 백업한 데이터의<br />
                    정책을 다시 선택할 필요가 있습니다. 진행하시겠습니까?
                </p>
            </div>

            <div class="btn_set">
                <div class="right">
                    <button type="button" class="btn_basic cancel" @click="closeLayer">취소</button>
                    <button type="button" class="btn_basic submit" @click="changeStorage('policy', 'delete')">확인</button>
                </div>
            </div>
            <button class="btn_close" @click="closeLayer"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
        </div>

        <!-- 정책 삭제 - 삭제할 정책이 없을 때 -->
        <div class="layer_popup" ref="noPolicyToDeleteLayer">
            <h3>정책 삭제</h3>
            <div class="msg warning">
                <h4><img src="@/assets/images/component/ico_lp_admin_warning.png" alt="정책 삭제" /></h4>
                <p><strong>삭제할 정책이 없습니다.</strong></p>
            </div>

            <div class="btn_set">
                <div class="center">
                    <button type="button" class="btn_basic cancel" @click="closeLayer">확인</button>
                </div>
            </div>
            <button class="btn_close" @click="closeLayer"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
        </div>

        <!-- 정책 수정 -->
        <div class="layer_popup" ref="changePolicyLayer">
            <h3>정책 수정</h3>
            <fieldset class="write_form">
                <legend>정책 수정</legend>
                <p>
                    <span class="category">
                        <label for="modifyPolicy_server">할당 정책을 선택합니다.</label>
                    </span>
                    <span class="field">
                        <span class="basic_select selectbox_ui">
                            <b class="selected_txt"></b>
                            <select id="modifyPolicy_server" v-model="layer.value.policyId">
                                <option value="0">사용자 정의</option>
                                <option v-for="policy in layer.value.policyList" :value="policy.bp_id" selected>{{policy.bp_name}}</option>
                            </select>
                        </span>
                    </span>
                </p>
            </fieldset>

            <div class="btn_set">
                <div class="right">
                    <button type="button" class="btn_basic cancel" @click="closeLayer">취소</button>
                    <button type="button" class="btn_basic submit" @click="changeStorage('policy', layer.value.policyId)">확인</button>
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
                        <input type="text" id="normalStorageLimit" v-model.number="layer.value.gnrllimit" :disabled="layer.checked.restrictGeneralStorageLayer"/> GB
                        <label class="check_option"><input type="checkbox" v-model:checked="layer.checked.restrictGeneralStorageLayer" @click="unlimit('gnrllimit')"/>무제한</label>
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
                        <input type="text" id="coldStorageLimit" v-model.number="layer.value.coldlimit" :disabled="layer.checked.restrictColdStorageLayer"/> GB
                        <label class="check_option"><input type="checkbox" v-model:checked="layer.checked.restrictColdStorageLayer" @click="unlimit('coldlimit')" />무제한</label>
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
                        <input type="text" id="ocrPageLimit" v-model.number="layer.value.ocrlimit" :disabled="layer.checked.restrictOcrPageLayer" /> 페이지
                        <label class="check_option"><input type="checkbox" v-model:checked="layer.checked.restrictOcrPageLayer" @click="unlimit('ocrlimit')" />무제한</label>
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
                    <button type="button" class="btn_basic submit" @click="changeStorage('backup', '', successStartedBackup)">확인</button>
                </div>
            </div>
            <button class="btn_close" @click="closeLayer"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
        </div>

        <!-- 이미 백업 진행 중 -->
        <div class="layer_popup" ref="alreadyStartedBackup">
            <h3>백업 게시</h3>
            <div class="msg warning">
                <h4><img src="@/assets/images/component/ico_lp_warning.png" alt="백업 게시" /></h4>
                <p>
                    <strong>이 단말기의 백업은 이미 진행 중입니다.</strong><br />
                    이 과정은 시작하기까지 최대 15분 걸리는 경우가 있습니다.
                </p>
            </div>

            <div class="btn_set">
                <div class="right">
                    <button type="button" class="btn_basic cancel" @click="closeLayer">확인</button>
                </div>
            </div>
            <button class="btn_close" @click="closeLayer"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
        </div>

        <!-- 백업 게시 성공 -->
        <div class="layer_popup" ref="successStartedBackup">
            <h3>백업 게시</h3>
            <div class="msg warning">
                <h4><img src="@/assets/images/component/ico_lp_warning.png" alt="백업 게시" /></h4>
                <p>
                    <strong>성공</strong><br />
                    이 단말기에서 백업은 15분 이내에 개시됩니다.
                </p>
            </div>

            <div class="btn_set">
                <div class="right">
                    <button type="button" class="btn_basic cancel" @click="closeLayer">확인</button>
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
    name: "Server",
    mixins: [commonMethodsMixin, listAndPageMixin],
    data() {
        return {
            context: {
              userAdd : false,
              detail: false
            },
            layer: {
                checked: {
                    restrictGeneralStorageLayer: false, // 일반 스토리지 제한
                    restrictColdStorageLayer: false,    // 콜드 스토리지 제한
                    restrictOcrPageLayer: false,        // OCR 페이지 수 제한
                },
                value: {
                    gnrllimit: 0,
                    coldlimit: 0,
                    ocrlimit: 0,
                    name: '',
                    policyList: [],
                    policyId: 0
                },
                selecteid: []              // 선택된 id
            },
        }
    },
    methods: {

        setPolicyName(policyname) {

            return policyname ? policyname : '사용자 정의';
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

         // 선택된 유저 정보
        getSelecteids() {

            let selecteids = [],
                list = this.list,
                data,
                i;

            for (i = 0; i < list.length; i++) {

                data = list[i];

                if (data.checked)
                    selecteids.push(data.id);
            }

            this.layer.selecteid = selecteids;

            return selecteids;
        },

        checkSelecteid(selecteids) {

            if (selecteids.length == 0) {

                this.openLayer('noSelectedServerLayer');
                return false;
            }

            return true;
        },

        checkSelectedAndOpenLayer(layerName, id) {

            let ids = [id],
                list = this.list,
                alreadyActive = false;

            if (!id)
                ids = this.getSelecteids();

            // 선택여부 검사
            if (!this.checkSelecteid(ids)) return;

            // 서버 유효화
            if (layerName === 'activateServerLayer') {

                if (this.checkAlreadyActive(ids)) return;

            // 서버 아카이브
            } else if (layerName === 'archiveServerLayer') {

            // 서버 이름변경
            } else if (layerName === 'changeServerNameLayer') {

                this.setStorageNameOnLayer(id);

            // 정책 삭제
            } else if (layerName === 'deletePolicyLayer') {

                for (let i = 0; i < this.list.length; i++) {

                    if (this.list[i].id == id) {

                        if (!this.list[i].policyid) {

                            this.openLayer('noPolicyToDeleteLayer');
                            return;
                        }
                    }
                }

            // 정책 수정
            } else if (layerName === 'changePolicyLayer') {

                let policyId;

                for (let i = 0; i < this.list.length; i++) {

                    if (id === this.list[i].id)
                        policyId = this.list[i].policyid ? this.list[i].policyid : 0;
                }

                axios.post("/management/getPolicyList/").then(response => {

                    let data = response.data;

                    if (data.code === 1000) {

                        this.layer.value.policyList = data.policyList;

                        this.layer.value.policyId = policyId;

                        setTimeout( function () {
                            initSelectBox($('#modifyPolicy_server').parent(".selectbox_ui"));
                        }, 100);
                    }

                }).catch(ex => {

                    console.log(ex);
                });
            }

            this.openLayer(layerName);
            this.layer.selecteid = ids;
        },

        setStorageNameOnLayer(id) {

            let list = this.list,
                i;

            for (i = 0; i < list.length; i++) {

                if (list[i].id == id) {

                    this.layer.value.name = list[i].name;
                }
            }
        },

        checkAlreadyActive(ids) {

            let list = this.list,
                alreadyActive = false,
                i,
                j;

            // 이미 유효화 검사
            for (i = 0; i < list.length; i++) {

                for (j = 0; j < ids.length; j++) {

                    if (list[i].id == ids[j] && list[i].status === 1) {
                        alreadyActive = true;
                        break;
                    }
                }
            }

            if (alreadyActive)
                this.openLayer('alreadyActivatedComputerLayer');

            return alreadyActive;
        },

        // 레이어 팝업 보이기
        openLayer(layerName, id) {

            $(this.$refs.modal).show();
            $(this.$refs[layerName]).show();

            if (id)
                this.layer.selecteid = id;
        },

        // 레이어 팝업 숨기기
        closeLayer() {

            $(this.$refs.modal).hide();
            $(".layer_popup").hide();
        },

        unlimit(valueName) {

           this.layer.value[valueName] = '';
        },

        // 일반 스토리지 제한, 콜드 스토리지 제한, ORC 페이지 제한 버튼 클릭 시, 레이어 팝업
        restrictLayer(layerType, id) {

            let ids = [id],
                layerName = '',
                limitName = '',
                size = '',
                check = false;

            switch(layerType) {
                case 'gnrl':
                    layerName = 'restrictGeneralStorageLayer';
                    limitName = 'gnrllimit';
                    break;

                case 'cold':
                    layerName = 'restrictColdStorageLayer';
                    limitName = 'coldlimit';
                    break;

                case 'ocr':
                    layerName = 'restrictOcrPageLayer';
                    limitName = 'ocrlimit';
                    break;
            }

            $(this.$refs[layerName]).find("input").css("border-color", "#CCCCCC");

            if (id === undefined) {

                ids = this.getSelecteids();

            } else {

                for (let i = 0; i < this.list.length; i++) {

                    if (this.list[i].id == id) {

                        size = this.list[i][limitName];
                        check = size === '' ? true : false;
                    }
                }
            }

            this.layer.value[limitName] = size;
            this.layer.checked[layerName] = check;

            // 유저 선택여부 검사
            if (!this.checkSelecteid(ids)) return;

            this.openLayer(layerName);
            this.layer.selecteid = ids;
        },

        getList(pageNo) {

            const self = this;

            if (pageNo !== undefined)
                this.pageInfo.currentPage = pageNo;

            this.setPageLoadInfo();

            axios.post("/management/user_server/list/Server/", {
                searchText: this.pageInfo.searchText,
                currentPage: this.pageInfo.currentPage,
                dataPerPage: this.pageInfo.dataPerPage,
                orderName : this.pageInfo.orderName,
                orderType : this.pageInfo.orderType
            }).then(response => {

                let data = response.data;

                if (data.code == 1000) {

                    let list = data.list,
                        totalListCount = data.totalListCount,
                        haveNew = response.data.haveNew,
                        tempList = [];

                    this.pageInfo.totalData = totalListCount;

                    self.$emit('setHaveNew', 'Server', haveNew);

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

                        obj.id = list[i].bs_id;
                        obj.checked = false;
                        obj.context = {
                            show: false
                        };

                        tempList.push(obj);
                    }

                    self.list = tempList;
                }
            }).catch(ex => {

                console.log(ex);
            });
        },

        setPageLoadInfo() {

            let payload = {
                currentPage: this.pageInfo.currentPage,
                searchText: this.pageInfo.searchText,
            };

            this.$store.dispatch('main/setPageLoadInfo', payload);
        },

        changeStorage(prop, value, func) {

            let self = this,
                selecteid = this.layer.selecteid,
                $targetInput,
                layerName,
                unlimitChecked; // 무제한 체크 여부

            switch (prop) {

                case 'name':
                case 'gnrllimit':
                case 'coldlimit':
                case 'ocrlimit':
                    value = this.layer.value[prop];
                    break;
            }

            if (prop == 'gnrllimit' || prop == 'coldlimit' || prop == 'ocrlimit') {

                if (prop == 'gnrllimit')
                    layerName = 'restrictGeneralStorageLayer';
                else if (prop == 'coldlimit')
                    layerName = 'restrictColdStorageLayer';
                else if (prop == 'ocrlimit')
                    layerName = 'restrictOcrPageLayer';

                $targetInput = $(this.$refs[layerName]).find('input');
                unlimitChecked = this.layer.checked[layerName];

                if ((value !== '' && value <= 0) || (value === '' && !unlimitChecked)) {

                    $targetInput.css("border-color", "red");
                    return false;
                }
            }

            axios.post('/management/changeUserStorage/', {
                storageIds : selecteid,
                prop: prop,
                value: value
            }).then(response => {

                let data = response.data;

                if (data.code == 1000) {

                    self.closeLayer();
                    self.getList();

                    if (func) func();
                }

            }).catch(ex => {

                console.log(ex);
            });
        },

        downloadCSV() {

            axios.post("/management/downloadCSV/list/Server/", {
                searchText: this.pageInfo.searchText,
                currentPage: this.pageInfo.currentPage,
                dataPerPage: this.pageInfo.dataPerPage,
                orderName : this.pageInfo.orderName,
                orderType : this.pageInfo.orderType
            }).then(response => {

                if(response.data.size < 1){
                    alert("Can not download");
                    return;
                }

                let blob = new Blob(['\ufeff' + response.data], {type: response.headers['content-type']});
                let link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'serverList.csv';
                link.click();

            }).catch(ex => {

                console.log(ex);
            });
        },

        // 목록 정렬
        sortList(event) {

            let $target = $(event.target),
                orderType = $target.data('sort'),
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
        },

        // 백업 개시 버튼 클릭 시
        getStartedBackup(id) {

            let backup;

            for (let i = 0; i < this.list.length; i++) {

                if (id == this.list[i].id) {

                    backup = this.list[i].backup;
                }
            }

            if (backup === 0 || backup === 1) {

                this.checkSelectedAndOpenLayer('backupLayer', id);
                return;

            } else if (backup === 2) {

                this.openLayer('alreadyStartedBackup');
                return;
            }
        },

        // 백업 개시 성공 시
        successStartedBackup() {

            this.openLayer('successStartedBackup');
        }
    },

    created() {

        let pageLoadInfo = this.$store.state.main.pageLoadInfo,
            keys = Object.keys(pageLoadInfo);

        for( let i = 0; i < keys.length; i++) {

            this.pageInfo[keys[i]] = pageLoadInfo[keys[i]];
        }

        this.getList();
    }
}

</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter, .fade-leave-active {
    opacity: 0;
}

.menu_layer {
  display: block;
}
#menu_layer_detail {
    right: 10px;
}
.menu_layer.user_context {
    position: fixed;
}
.top_menu_layer {
    top: 33px;
}
</style>

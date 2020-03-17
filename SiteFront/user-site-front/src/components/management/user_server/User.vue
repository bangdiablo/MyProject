<template>
  <div class="admin_list">
    <div class="board_search_edit">
      <fieldset class="search_form left">
        <legend>사용자검색</legend>
        <p><input type="text" v-model="pageInfo.searchText" @keydown.enter="getUserList(1)"/>
          <button type="button" @click="getUserList(1)"><img src="@/assets/images/sub/btn_ae_search.png" alt="검색"/></button>
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
              <li><a href="#" @click="makeActiveUserLayer">유저를 유효화</a></li>
              <li><a href="#" @click="makeInactiveUserLayer">유저 일시 정지</a></li>
              <li><a href="#" @click="deleteUserLayer">유저 삭제</a></li>
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

      <!-- list -->
      <table class="board_list" @keydown.esc="closeLayer">
        <caption>사용자 목록</caption>
        <colgroup>
          <col style="width:70px"/>
          <col style="width:*px"/>
          <col style="width:150px"/>
          <col style="width:240px"/>
          <col style="width:240px"/>
          <col style="width:200px"/>
          <col style="width:100px"/>
          <col style="width:65px"/>
        </colgroup>
        <thead>
        <tr>
          <th scope="col"><input type="checkbox" title="전체선택" v-model="checkedAll"/></th>
          <th scope="col"><a href="javascript:void(0)" class="sorting inactive" @click="sortList" data-sort="name">이름</a></th>
          <th scope="col"><a href="javascript:void(0)" class="sorting inactive" @click="sortList" data-sort="policy">정책</a></th>
          <th scope="col"><a href="javascript:void(0)" class="sorting inactive" @click="sortList" data-sort="general">일반 스토리지 사용량/최대</a></th>
          <th scope="col"><a href="javascript:void(0)" class="sorting inactive" @click="sortList" data-sort="cold">콜드 스토리지 사용량/최대</a></th>
          <th scope="col"><a href="javascript:void(0)" class="sorting inactive" @click="sortList" data-sort="ocr">OCR 사용량/최대</a></th>
          <th scope="col"><a href="javascript:void(0)" class="sorting inactive" @click="sortList" data-sort="kind">종류</a></th>
          <th scope="col">&nbsp;</th>
        </tr>
        </thead>
        <tbody>
          <tr class="pointer" v-for="item in list" :key="item.id" @click="goUserInfo(item.id)">
            <td @click.stop><input type="checkbox" title="선택" v-model:cheked="item.checked" /></td>
            <td class="left">
              <img v-if="isAdmin(item.admin_yn)" src="@/assets/images/sub/ico_ad_admin.png" alt="관리자" class="ico_admin"/>
              <a href="#">{{item.fullname}}<img src="@/assets/images/sub/ico_cn_new.png" alt="신규" class="new" v-show="item.new == 'Y'"/></a>
            </td>
            <td>{{setPolicyName(item.policyname)}}</td>
            <td>{{expressUsed(item.gnrlsto)}} / {{expressLimit(item.gnrllimit)}}</td>
            <td>{{expressUsed(item.coldsto)}} / {{expressLimit(item.coldlimit)}}</td>
            <td>{{expressUsed(item.ocr, '페이지')}} / {{expressLimit(item.ocrlimit, '페이지')}}</td>
            <td>{{item.permitname}}</td>
            <td class="item_edit">
              <button type="button" @click="showContext($event, item.id, true)" @mouseleave="hideContext($event, item.id)">
                <i class="more">더 많은</i>
              </button>
                <div class="menu_layer user_context" v-show="item.userContext.show" @mouseenter="showContext($event, item.id)" @mouseleave="hideContext($event, item.id)" @click.stop>
                    <ul>
                        <li>
                            <a href="#" @mouseenter="showContext($event, item.id, true, 'user', 1)" @mouseleave="hideContext($event, item.id, 'user')"> 유저 관리
                                <transition name="fade">
                                    <div class="menu_layer user" v-show="item.userContext.user.show" >
                                        <ul>
                                            <li><a href="#" @click="makeActiveUserLayer(item.id)">유저를 유효화</a></li>
                                            <li><a href="#" @click="makeInactiveUserLayer(item.id)">유저 일시 정지</a></li>
                                            <li><a href="#" @click="changeAdminAuthLayer(item.id)">관리자권한 <template v-if="isAdmin(item.admin_yn)">삭제</template><template v-else-if="!isAdmin(item.admin_yn)">부여</template></a></li>
                                            <li><a href="#" @click="openLayer('changePasswordLayer', item.id)">패스워드 변경</a></li>
                                            <li><a href="#" @click="openChangeEmailLayer(item.id)">메일 주소 변경</a></li>
                                            <li><a href="#" @click="openChangeNameLayer(item.id)">이름 변경</a></li>
                                            <li><a href="#" @click="openChangeUserPermitLayer(item.id)">사용자 종류 편집</a></li>
                                            <li><a href="#" @click="deleteUserLayer(item.id)">유저 삭제</a></li>
                                        </ul>
                                    </div>
                                </transition>
                            </a>
                        </li>
                        <li>
                            <a href="#" @mouseenter="showContext($event, item.id, true,'policy', 2)" @mouseleave="hideContext($event, item.id, 'policy')"> 정책 관리
                                <transition name="fade">
                                    <div class="menu_layer policy" v-show="item.userContext.policy.show">
                                        <ul>
                                            <li><a href="#" @click="deletePolicyLayer(item.id)">정책 삭제</a></li>
                                            <li><a href="#" @click="changePolicyLayer(item.id)">정책 수정</a></li>
                                        </ul>
                                    </div>
                                </transition>
                            </a>
                        </li>
                        <li>
                            <a href="#" @mouseenter="showContext($event, item.id, true,'restrict', 3)" @mouseleave="hideContext($event, item.id, 'restrict')"> 사용자 제한 설정
                                <transition name="fade">
                                    <div class="menu_layer restrict" v-show="item.userContext.restrict.show">
                                        <ul>
                                            <li><a href="#" @click="restrictLayer('gnrl', item.id)">일반 스토리지 제한</a></li>
                                            <li><a href="#" @click="restrictLayer('cold', item.id)">콜드 스토리지 제한</a></li>
                                            <li><a href="#" @click="restrictLayer('ocr', item.id)">OCR 페이지 수 제한</a></li>
                                        </ul>
                                    </div>
                                </transition>
                            </a>
                        </li>
                    </ul>
                </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 페이지 -->
      <div class="page_navi">
        <a href="#" class="guide prev" @click="getUserList(prevPage, true)">
          <img src="@/assets/images/component/btn_page_prev.png" alt="Prev" class="ico">
        </a>
        <template v-for="page in pageArr">
            <a href="#" class="num" :class="{active: page.active}" @click="getUserList(page.pageNo, true)">{{ page.pageNo }}</a>
        </template>
        <a href="#" class="guide next" @click="getUserList(nextPage, true)">
            <img src="@/assets/images/component/btn_page_next.png" alt="Next" class="ico">
        </a>
      </div>
    </template>

    <div class="board_empty" v-else>
      <img src="@/assets/images/component/ico_admin_empty.png" alt="" class="ico" />
      <p>유저가 없습니다.</p>
    </div>



    <!-- 유저 선택 -->
    <div class="layer_popup" ref="noSelectedUserLayer">
        <h3>유저 선택</h3>
        <div class="msg warning">
            <h4><img src="@/assets/images/component/ico_lp_admin_warning.png" alt="유저 선택" /></h4>
            <p>
                <strong>유저를 선택하세요.</strong>
            </p>
        </div>

        <div class="btn_set">
            <div class="center">
                <button type="button" class="btn_basic submit" @click="closeLayer">확인</button>
            </div>
        </div>
        <button class="btn_close" @click="closeLayer"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
    </div>

    <!-- 유저 유효화 - 이미 유효화 -->
    <div class="layer_popup" ref="alreadyActivatedUserLayer">
        <h3>유저 유효화</h3>
        <div class="msg warning">
            <h4><img src="@/assets/images/component/ico_lp_admin_warning.png" alt="유저 유효화" /></h4>
            <p>
                <strong>이미 유효화 되고 있습니다.</strong>
            </p>
        </div>

        <div class="btn_set">
            <div class="center">
                <button type="button" class="btn_basic submit" @click="closeLayer">확인</button>
            </div>
        </div>
        <button class="btn_close" @click="closeLayer"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
    </div>

    <!-- 유저 유효화 -->
    <div class="layer_popup" ref="activateUserLayer">
        <h3>유저 유효화</h3>
        <div class="msg success">
            <h4><img src="@/assets/images/component/ico_lp_admin_success.png" alt="유저 유효화" /></h4>
            <p>
                <strong>선택한 항목을 활성화 해도 되겠습니까?</strong>
            </p>
        </div>

        <div class="btn_set">
            <div class="right">
                <button type="button" class="btn_basic cancel" @click="closeLayer">취소</button>
                <button type="button" class="btn_basic submit" @click="updateUserActive(layer.selectedId, 1)">확인</button>
            </div>
        </div>
        <button class="btn_close" @click="closeLayer"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
    </div>

    <!-- 유저 일시 정지 -->
    <div class="layer_popup" ref="inactivateUserLayer">
        <h3>유저 일시 정지</h3>
        <div class="msg warning">
            <h4><img src="@/assets/images/component/ico_lp_admin_warning.png" alt="유저 일시 정지" /></h4>
            <p>
                <strong>선택한 항목을 일시정지 해도 되겠습니까?</strong>
            </p>
        </div>

        <div class="btn_set">
            <div class="right">
                <button type="button" class="btn_basic cancel" @click="closeLayer">취소</button>
                <button type="button" class="btn_basic submit" @click="updateUserActive(layer.selectedId, 2)">확인</button>
            </div>
        </div>
        <button class="btn_close" @click="closeLayer"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
    </div>

    <!-- 유저 삭제 -->
    <div class="layer_popup" ref="deleteUserLayer">
        <h3>유저 삭제</h3>
        <div class="msg warning">
            <h4><img src="@/assets/images/component/ico_lp_admin_warning.png" alt="유저 삭제" /></h4>
            <p>
                <strong>유저를 삭제합니다.</strong><br />
                선택한 단말을 제거하면 그 정보와 파일은 AOSBOX AI plus부터<br />
                영구적으로 삭제되고 두번 다시 접속할 수 없게 됩니다.<br />
                계속하시겠습니까?
            </p>
        </div>

        <div class="btn_set">
            <div class="right">
                <button type="button" class="btn_basic cancel" @click="closeLayer">취소</button>
                <button type="button" class="btn_basic submit" @click="updateUserActive(layer.selectedId, 3)">확인</button>
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
                    <input type="number" id="normalStorageLimit" v-model.number="layer.value.gnrllimit" :disabled="layer.checked.restrictGeneralStorageLayer"/> GB
                    <label class="check_option"><input type="checkbox" v-model:checked="layer.checked.restrictGeneralStorageLayer" @click="unlimit('gnrllimit')"/>무제한</label>
                </span>
            </p>
        </fieldset>

        <div class="btn_set">
            <div class="right">
                <button type="button" class="btn_basic cancel" @click="closeLayer">취소</button>
                <button type="button" class="btn_basic submit" @click="updateUserLimit('gnrllimit')">확인</button>
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
                    <input type="number" id="coldStorageLimit" v-model.number="layer.value.coldlimit" :disabled="layer.checked.restrictColdStorageLayer"/> GB
                    <label class="check_option"><input type="checkbox" v-model:checked="layer.checked.restrictColdStorageLayer" @click="unlimit('coldlimit')" />무제한</label>
                </span>
            </p>
        </fieldset>

        <div class="btn_set">
            <div class="right">
                <button type="button" class="btn_basic cancel" @click="closeLayer">취소</button>
                <button type="button" class="btn_basic submit" @click="updateUserLimit('coldlimit')">확인</button>
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
                    <input type="number" id="ocrPageLimit" v-model.number="layer.value.ocrlimit" :disabled="layer.checked.restrictOcrPageLayer" /> 페이지
                    <label class="check_option"><input type="checkbox" v-model:checked="layer.checked.restrictOcrPageLayer" @click="unlimit('ocrlimit')" />무제한</label>
                </span>
            </p>
        </fieldset>

        <div class="btn_set">
            <div class="right">
                <button type="button" class="btn_basic cancel" @click="closeLayer">취소</button>
                <button type="button" class="btn_basic submit" @click="updateUserLimit('ocrlimit')">확인</button>
            </div>
        </div>
        <button class="btn_close" @click="closeLayer"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
    </div>

    <!-- 관리자권한 부여 -->
    <div class="layer_popup" ref="giveAdminPrivilegeLayer">
        <h3>관리자권한 부여</h3>
        <div class="msg success">
            <h4><img src="@/assets/images/component/ico_lp_admin_success.png" alt="관리자권한 부여" /></h4>
            <p>
                <strong>이 사용자에게 관리자 권한을 부여하시겠습니까?</strong>
            </p>
        </div>

        <div class="btn_set">
            <div class="right">
                <button type="button" class="btn_basic cancel" @click="closeLayer">취소</button>
                <button type="button" class="btn_basic submit" @click="changeAdminAuth">확인</button>
            </div>
        </div>
        <button class="btn_close" @click="closeLayer"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
    </div>

    <!-- 관리자권한 삭제 -->
    <div class="layer_popup" ref="removeAdminPrivilegeLayer">
        <h3>관리자권한 삭제</h3>
        <div class="msg warning">
            <h4><img src="@/assets/images/component/ico_lp_admin_warning.png" alt="관리자권한 삭제" /></h4>
            <p>
                <strong>관리자 권한을 삭제해도 되겠습니까?</strong>
            </p>
        </div>

        <div class="btn_set">
            <div class="right">
                <button type="button" class="btn_basic cancel" @click="closeLayer">취소</button>
                <button type="button" class="btn_basic submit" @click="changeAdminAuth">확인</button>
            </div>
        </div>
        <button class="btn_close" @click="closeLayer"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
    </div>

    <!-- 비밀번호 변경 -->
    <div class="layer_popup" ref="changePasswordLayer">
        <h3>비밀번호 변경</h3>
        <fieldset class="write_form">
            <legend>비밀번호 변경</legend>
            <p>
                <span class="category">
                    <label for="userNewPassword">새 비밀번호</label>
                </span>
                <span class="field">
                    <input type="password" id="userNewPassword" v-model="layer.value.password" @blur="checkError('password')"/>
                    <strong class="error_msg" v-show="passwordError">
                        ※ 비밀번호 형식이 맞지 않습니다.
                    </strong>
                </span>
            </p>
            <p>
                <span class="category">
                    <label for="userNewPasswordCheck">비밀번호 확인</label>
                </span>
                <span class="field">
                    <input type="password" id="userNewPasswordCheck"  v-model="layer.value.repassword" @blur="checkError('repassword')"/>
                    <strong class="error_msg" v-show="repasswordError">
                        ※ 비밀번호가 일치하지 않습니다.
                    </strong>
                </span>
            </p>
        </fieldset>

        <div class="btn_set">
            <div class="right">
                <button type="button" class="btn_basic cancel" @click="closeLayer">취소</button>
                <button type="button" class="btn_basic submit" @click="changeUserPassword">확인</button>
            </div>
        </div>
        <button class="btn_close" @click="closeLayer"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
    </div>

    <!-- 메일 주소 변경 -->
    <div class="layer_popup" ref="changeEmailLayer">
        <h3>메일 주소 변경</h3>
        <fieldset class="write_form">
            <legend>메일 주소 변경</legend>
            <p>
                <span class="category">
                    <label for="userMailChange">메일 주소</label>
                </span>
                <span class="field">
                    <input type="email" id="userMailChange" v-model="layer.value.email" @blur="checkNewEmail"/>
                    <strong class="error_msg" v-show="error.email">
                        ※ 유효한 이메일 주소를 입력하세요
                    </strong>
                </span>
            </p>
        </fieldset>

        <div class="btn_set">
            <div class="right">
                <button type="button" class="btn_basic cancel" @click="closeLayer">취소</button>
                <button type="button" class="btn_basic submit" @click="changeUserEmail">확인</button>
            </div>
        </div>
        <button class="btn_close" @click="closeLayer"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
    </div>

    <!-- 이름 변경 -->
    <div class="layer_popup" ref="changeNameLayer">
        <h3>이름 변경</h3>
        <fieldset class="write_form">
            <legend>이름 변경</legend>
            <p>
                <span class="category">
                    <label for="userNameChange">이름</label>
                </span>
                <span class="field">
                    <input type="text" id="userNameChange" v-model="layer.value.name"/>
                </span>
            </p>
        </fieldset>

        <div class="btn_set">
            <div class="right">
                <button type="button" class="btn_basic cancel" @click="closeLayer">취소</button>
                <button type="button" class="btn_basic submit" @click="changeUserName">확인</button>
            </div>
        </div>
        <button class="btn_close" @click="closeLayer"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
    </div>

    <!-- 사용자 종류 편집 -->
    <div class="layer_popup" ref="changeUserPermitLayer">
        <h3>사용자 종류 편집</h3>
        <fieldset class="write_form">
            <legend>사용자 종류 편집</legend>
            <p>
                <span class="category">
                    <label for="searchPermission">검색 허가</label>
                </span>
                <span class="field">
                    <span class="basic_select selectbox_ui">
                        <b class="selected_txt"></b>
                        <select id="searchPermission" v-model="layer.value.permit">
                            <option value="0">백업 전용</option>
                            <option value="1">검색 전용</option>
                            <option value="2">백업과 검색</option>
                        </select>
                    </span>
                </span>
            </p>
        </fieldset>

        <div class="btn_set">
            <div class="right">
                <button type="button" class="btn_basic cancel" @click="closeLayer">취소</button>
                <button type="button" class="btn_basic submit" @click="changeUserPermit">확인</button>
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
                <button type="button" class="btn_basic submit" @click="deletePolicy">확인</button>
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
                    <label for="modifyPolicy">할당 정책을 선택합니다.</label>
                </span>
                <span class="field">
                    <span class="basic_select selectbox_ui">
                        <b class="selected_txt"></b>
                        <select id="modifyPolicy" v-model="layer.value.policyId">
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
                <button type="button" class="btn_basic submit" @click="changePolicy">확인</button>
            </div>
        </div>
        <button class="btn_close" @click="closeLayer"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
    </div>

    <!-- 모달 배경 -->
    <div class="modal_bg" ref="modal"></div>
  </div>


</template>

<script>
import * as management from '../../../store/management/vuex_management'
import {commonMethodsMixin} from '../../../common/commonMethodsMixin'
import {listAndPageMixin} from '../../../common/listAndPageMixin'

export default {
    name: "User",
    mixins: [commonMethodsMixin, listAndPageMixin],
    props: ['userType'],
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
                    sendToCsvLayer: false,              // CSV에 내보내기
                    giveAdminPrivilegeLayer: false,     // 관리자권한 부여
                    removeAdminPrivilegeLayer: false,   // 관리자권한 삭제
                    changePasswordLayer: false,         // 비밀번호 변경
                    changeEmailLayer: false,            // 메일주소 변경
                    changeNameLayer: false,             // 이름 변경
                    changeUserPermitLayer: false,       // 사용자 종류 편집
                    deletePolicyLayer: false,           // 정책 삭제
                    noPolicyToDeleteLayer: false,       // 삭제할 정책이 없습니다.
                    changePolicyLayer: false,           // 정책 수정
                },
                value: {
                    gnrllimit: 0,
                    coldlimit: 0,
                    ocrlimit: 0,
                    password: '',
                    repassword : '',
                    name: '',
                    email: '',
                    permit: 0,
                    policyList: [],
                    policyId: 0
                },
                selectedId: 'selected'              // 선택된 id
            },
            error: {
                password: false,
                repassword: false,
                email: false
            }
      }
    },
    computed: {
        passwordError() {

            return this.error.password;
        },
        repasswordError() {

            return this.error.repassword;
        },
    },
    methods: {

        setPolicyName(policyname) {

            return policyname ? policyname : '사용자 정의';
        },

        isAdmin(admin_yn) {

            return admin_yn === 'Y';
        },

        showContext(event, id, adjustYn, subName, subCount) {

            let list = this.list,
                $target,
                $context,
                top,
                left;

            event.stopPropagation();

            if (subName) {

                $target = $(event.target).closest(".menu_layer");
                $context = $target.find(".menu_layer." + subName);

            } else {

                $target = $(event.target)[0].nodeName === 'I' ? $(event.target).closest('button') : $(event.target);
                $context = $target.closest('td').find('.menu_layer.user_context');
            }

            for (let i = 0; i < list.length; i++) {

                if (list[i].id == id) {

                    if (subName)
                        list[i].userContext[subName].show = true;
                    else
                        list[i].userContext.show = true;
                }
            }

            if (adjustYn) {

                if (subName) {

                    let subContextCount = $target.find('.menu_layer').length;
                    top = $target.offset().top + ($target.outerHeight() / subContextCount) * (subCount - 1) - (1.5 * subCount);

                } else {

                    top = $target.offset().top;
                }

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
                        list[i].userContext.show = false;
                    else
                        list[i].userContext[subName].show = false;
                }
            }

        },
        getUserList(pageNo, saveCookie) {

            const self = this;

            this.$nextTick(function() {

                if (pageNo !== undefined)
                    self.pageInfo.currentPage = pageNo;

                self.setPageLoadInfo();

                if (saveCookie)
                    self.$cookies.set(self.$route.path, {currentPage: self.pageInfo.currentPage, searchText: self.pageInfo.searchText});

                axios.post("/management/user_server/list/User/", {
                    userType: self.userType,
                    searchText: self.pageInfo.searchText,
                    currentPage: self.pageInfo.currentPage,
                    dataPerPage: self.pageInfo.dataPerPage,
                    orderName : self.pageInfo.orderName,
                    orderType : self.pageInfo.orderType
                }).then(response => {

                    if (response.status == 200) {

                        let boxUsers = response.data.list,
                            totalBoxUsers = response.data.totalListCount,
                            haveNew = response.data.haveNew;

                        self.pageInfo.totalData = totalBoxUsers;
                        // this.$store.dispatch('management/setUserPagenation', {totalData: totalBoxUsers});

                        self.$emit('setHaveNew', 'User', haveNew);

                        let list = [];

                        for (let i = 0; i < boxUsers.length; i++) {

                            let data = boxUsers[i];
                            let obj = {};

                            for (let prop in data) {

                                let newPropName = prop.replace('bu_', '');

                                obj[newPropName] = data[prop];

                                switch(prop) {
                                    case 'bu_gnrlsto':
                                    case 'bu_coldsto':
                                    case 'bu_ocr':
                                        if (data[prop] == null)
                                            obj[newPropName] = 0;
                                        break;

                                    case 'bu_gnrllimit':
                                    case 'bu_coldlimit':
                                    case 'bu_ocrlimit':
                                        if (data[prop] == 0)
                                            obj[newPropName] = '';
                                        break;

                                    default:
                                        // do nothing
                                }
                            }

                            obj.id = boxUsers[i].bu_id;
                            obj.checked = false;
                            obj.userContext = {
                                show: false,
                                user: {show: false},
                                policy: {show: false},
                                restrict: {show: false}
                            };

                            list.push(obj);
                        }

                        self.list = list;
                        // this.$store.dispatch('management/setUserList', list);
                    }
                }).catch(ex => {

                    console.log(ex);
                });
            });

        },

        // 상세 페이지 이동
        goUserInfo(userId) {

            this.$router.push({ name: 'user_info', params: { userId: userId }});
        },

        // 선택된 유저 정보
        getSelectedUser() {

            let selectedUserids = [],
                list = this.list,
                user,
                i;

            for (i = 0; i < list.length; i++) {

                user = list[i];

                if (user.checked)
                    selectedUserids.push(user.id);
            }

            return selectedUserids;
        },

        checkSelectedUser(userids) {

            if (userids.length == 0) {

                this.openLayer('noSelectedUserLayer');
                return false;
            }

            return true;
        },

        // 유효화, 일시정지, 삭제
        updateUserActive(userids, active) {
            let self = this;

            axios.post('/management/updateUserActive/', {userids: userids, active: active}).then(response => {

                let data = response.data,
                    message = '';

                // if (active == 1)
                //     message = '활성화되었습니다.';
                // else if (active == 2)
                //     message = '일시정지되었습니다.';
                // else
                //     message = '삭제되었습니다.';

                if (data.code == 1000) {

                    self.closeLayer();
                    self.getUserList();
                    // alert(message);
                }

            }).catch(ex => {

                console.log(ex);
            });
        },

        // 유저를 유효화 버튼 클릭 시, 레이어 팝업
        makeActiveUserLayer(userid) {

            let userids = [userid],
                list = this.list,
                alreadyActive = false;

            if (userid instanceof Event)
                userids = this.getSelectedUser();

            // 유저 선택여부 검사
            if (!this.checkSelectedUser(userids)) return;

            // 이미 유효화 검사
            for (let i = 0; i < list.length; i++) {

                for(let j = 0; j < userids.length; j++) {

                    if (list[i].id === userids[j] && list[i].status === 1) {
                        alreadyActive = true;
                    }
                }
            }

            if (alreadyActive) {

                this.openLayer('alreadyActivatedUserLayer');
                return;
            }

            this.openLayer('activateUserLayer');
            this.layer.selectedId = userids;
        },

        // 유저 일시정지 버튼 클릭 시, 레이어 팝업
        makeInactiveUserLayer(userid) {

            let userids = [userid],
                list = this.list,
                alreadyActive = false;

            if (userid instanceof Event)
                userids = this.getSelectedUser();

            // 유저 선택여부 검사
            if (!this.checkSelectedUser(userids)) return;

            this.openLayer('inactivateUserLayer');
            this.layer.selectedId = userids;
        },

        // 유저 삭제 버튼 클릭 시, 레이어 팝업
        deleteUserLayer(userid) {

            let userids = [userid],
                list = this.list,
                alreadyActive = false;

            if (userid instanceof Event)
                userids = this.getSelectedUser();

            // 유저 선택여부 검사
            if (!this.checkSelectedUser(userids)) return;

            this.openLayer('deleteUserLayer');
            this.layer.selectedId = userids;
        },

        // 일반 스토리지 제한, 콜드 스토리지 제한, ORC 페이지 제한 버튼 클릭 시, 레이어 팝업
        restrictLayer(layerType, userid) {

            let userids = [userid],
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

            if (userid === undefined) {

                userids = this.getSelectedUser();

            } else {

                for (let i = 0; i < this.list.length; i++) {

                    if (this.list[i].id == userid) {

                        size = this.list[i][limitName];
                        check = size === '' ? true : false;
                    }
                }
            }

            this.layer.value[limitName] = size;
            this.layer.checked[layerName] = check;

            // 유저 선택여부 검사
            if (!this.checkSelectedUser(userids)) return;

            this.openLayer(layerName);
            this.layer.selectedId = userids;
        },

        updateUserLimit(type) {

            let self = this,
                size = this.layer.value[type],
                userids = this.layer.selectedId,
                $targetInput,
                layerName,
                unlimitChecked; // 무제한 체크 여부

            if (type == 'gnrllimit')
                layerName = 'restrictGeneralStorageLayer';
            else if (type == 'coldlimit')
                layerName = 'restrictColdStorageLayer';
            else if (type == 'ocrlimit')
                layerName = 'restrictOcrPageLayer';

            $targetInput = $(this.$refs[layerName]).find('input');;
            unlimitChecked = this.layer.checked[layerName];

            if ((size !== '' && size <= 0) || (size === '' && !unlimitChecked)) {

                $targetInput.css("border-color", "red");
                return false;
            }

            axios.post('/management/updateUserLimit/', {userids: userids, type: type, size: size}).then(response => {

                let data = response.data;

                if (data.code == 1000) {

                    self.closeLayer();
                    self.getUserList();
                }

            }).catch(ex => {

                console.log(ex);
            });
        },

        // 레이어 팝업 보이기
        openLayer(layerName, userId) {

            $(this.$refs.modal).show();
            $(this.$refs[layerName]).show();

            if (userId)
                this.layer.selectedId = userId;
        },

        // 레이어 팝업 숨기기
        closeLayer() {

            $(this.$refs.modal).hide();
            $(".layer_popup").hide();
        },

        unlimit(valueName) {

           this.layer.value[valueName] = '';
        },

        changeAdminAuthLayer(userId) {

            let adminYn;

            for (let i = 0; i < this.list.length; i++) {

                if (userId == this.list[i].id)
                    adminYn = this.list[i].admin_yn;
            }

            this.layer.selectedId = userId;

            if (adminYn === 'Y') {

                this.openLayer('removeAdminPrivilegeLayer');

            } else {

                this.openLayer('giveAdminPrivilegeLayer');
            }
        },

        // 관리자 권한 부여 / 삭제
        changeAdminAuth() {

            let self = this,
                userId = this.layer.selectedId;

            axios.post('/management/changeAdminAuth/', {userId: userId}).then(response => {

                let data = response.data,
                    ci = data.ci,
                    message = '';

                if (data.code == 1000) {

                    // if (ci === 1) {
                    //
                    //     message = '관리자로 변경되었습니다.';
                    //
                    // } else if (ci === 2) {
                    //
                    //     message = '관리자 권한이 해제되었습니다.';
                    // }

                    self.closeLayer();
                    self.getUserList();
                    // alert(message);
                }

            }).catch(ex => {

                console.log(ex);
            });
        },

        changeUserPassword() {

            this.checkPassword();
            this.checkRepassword();

            let error = this.error.password || this.error.repassword;

            if (!error)
                this.changeUserInfo('password');
        },

        openChangeEmailLayer(userId) {

            for (let i = 0; i < this.list.length; i++) {

                if (userId === this.list[i].id)
                    this.layer.value.email = this.list[i].email;
            }

            this.openLayer('changeEmailLayer', userId);
        },

        checkNewEmail() {

            let email = this.layer.value.email;

            if (checkValidEmail(email)) {

                this.error.email = false;

            } else {

                this.error.email = true;
            }
        },

        changeUserEmail() {

            this.checkNewEmail();

            if (!this.error.email)
                this.changeUserInfo('email');
        },

        openChangeNameLayer(userId) {

            for (let i = 0; i < this.list.length; i++) {

                if (userId === this.list[i].id) {

                    this.layer.value.name = this.list[i].firstname;

                    if (this.list[i].lastname)
                        this.layer.value.name += ' ' + this.list[i].lastname;
                }
            }

            this.openLayer('changeNameLayer', userId);
        },

        changeUserName() {

            if (this.layer.value.name.trim())
                this.changeUserInfo('name');
        },

        openChangeUserPermitLayer(userId) {

            for (let i = 0; i < this.list.length; i++) {

                if (userId === this.list[i].id)
                    this.layer.value.permit = this.list[i].permit;
            }

            this.openLayer('changeUserPermitLayer', userId);

            setTimeout( function () {
                initSelectBox($('#searchPermission').parent(".selectbox_ui"));
            }, 100);
        },

        changeUserPermit() {

            this.changeUserInfo('permit');
        },

        changeUserInfo(type) {

            let self = this,
                userId = this.layer.selectedId,
                value = this.layer.value[type],
                message = '';

            switch (type) {

                case 'password':
                    message = '패스워드';
                    break;

                case 'name':
                    message = '이름';
                    break;

                case 'email':
                    message = '메일 주소';
                    break;

                case 'permit':
                    message = '사용자 종류';
                    break;

                case 'policyId':
                    message = '정책';
                    break;
            }

            axios.post('/management/changeUserInfo/', {userId: userId, type: type, value: value}).then(response => {

                let data = response.data;

                if (data.code == 1000) {

                    self.closeLayer();
                    self.getUserList();

                } else {

                    message += ' 변경에 실패했습니다.';
                    alert(message);
                }

            }).catch(ex => {

                console.log(ex);
            });
        },

        checkError(type) {

            if (type === 'password') {

                this.checkPassword();
                this.checkRepassword();

            } else if (type === 'repassword') {

                this.checkRepassword();
            }
        },

        checkPassword() {

            let password = this.layer.value.password;

            if (password.length != 0 && password.length < 6) {

                this.error.password = true;

            } else {

                this.error.password = false;
            }
        },

        checkRepassword() {

            let password = this.layer.value.password,
                repassword = this.layer.value.repassword;

            if (password.length != 0 && repassword.length != 0 && password != repassword) {

                this.error.repassword = true;

            } else {

                this.error.repassword = false;
            }
        },

        deletePolicyLayer(userId) {

            let policyId;

            for (let i = 0; i < this.list.length; i++) {

                if (userId === this.list[i].id)
                    policyId = this.list[i].policy
            }

            if (policyId)
                this.openLayer('deletePolicyLayer', userId);
            else
                this.openLayer('noPolicyToDeleteLayer');
        },

        deletePolicy() {

            this.layer.value.policyId = 0;
            this.changeUserInfo('policyId');
        },

        changePolicyLayer(userId) {

            let self = this,
                policyId;

            for (let i = 0; i < this.list.length; i++) {

                if (userId === this.list[i].id)
                    policyId = this.list[i].policy ? this.list[i].policy : 0;
            }

            axios.post("/management/getPolicyList/", {userId: userId}).then(response => {

                let data = response.data;

                if (data.code === 1000) {

                    self.layer.value.policyList = data.policyList;

                    self.layer.value.policyId = policyId;

                    setTimeout( function () {
                        initSelectBox($('#modifyPolicy').parent(".selectbox_ui"));
                    }, 100);

                    self.openLayer('changePolicyLayer', userId);
                }

            }).catch(ex => {

                console.log(ex);
            });
        },

        changePolicy() {

            this.changeUserInfo('policyId');
        },

        setPageLoadInfo() {

            let payload = {
                currentPage: this.pageInfo.currentPage,
                searchText: this.pageInfo.searchText,
            };

            this.$store.dispatch('main/setPageLoadInfo', payload);
        },

        downloadCSV() {

            axios.post("/management/downloadCSV/list/User/", {
                userType: this.userType,
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

                let blob = new Blob(["\ufeff" + response.data], {type: response.headers['content-type']});
                let link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'userList.csv';
                link.click();

            }).catch(ex => {

                console.log(ex);
            });
        },

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
            this.getUserList();
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
        }
   },
    created() {

        let pageLoadInfo = this.$store.state.main.pageLoadInfo,
            keys = Object.keys(pageLoadInfo);

        for( let i = 0; i < keys.length; i++) {

            this.pageInfo[keys[i]] = pageLoadInfo[keys[i]];
        }

        if (Object.keys(this.$route.query).length !== 0)
            this.pageInfo = Object.assign(this.pageInfo, this.$cookies.get(this.$route.path));

        this.getUserList();
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
.menu_layer.user_context, .menu_layer.user, .menu_layer.policy, .menu_layer.restrict{
    position: fixed;
}

  /*.user_context {*/
  /*  right: 47px;*/
  /*}*/
  .user_context_user_management {
    top: -1px;
    left: -132px;
  }
  .user_context_policy_management {
    top: 30px;
    left: -89px;
  }
  .user_context_user_limit {
    top: 62px;
    left: -149px;
  }
  .layer_popup>h3 {
    position: relative !important;
    z-index: 2;
    color: #136BB5;
    font-size: 20px !important;
    font-weight: normal;
    line-height: 120%;
    padding: 2px 0px 0px 14px;
    margin-bottom: 45px !important;
}
.top_menu_layer {
    top: 33px;
}
</style>

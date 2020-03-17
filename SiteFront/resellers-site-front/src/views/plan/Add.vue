<template>
    <section class="content">
        <article class="sub_title">
            <h2><span class="ico_plan">플랜</span></h2>
            <div class="location">
                <span>홈</span>
                <span class="gt_sign">&gt;</span>
                <span class="">플랜</span>
                <span class="gt_sign">&gt;</span>
                <span class="on">플랜 추가
                </span>
                <!-- 현재 페이지 class="on" -->
            </div>
        </article>
        <article class="sub_content sub_common">
            <h3>플랜 추가</h3>
            <div class="add_form_wrap clear_both">
                <span class="top_line"></span>
                <div class="area_left">
                    <span class="h3">플랜추가</span>
                    <p>플랜을 추가하려면<br>오른쪽 정보를 입력하세요.</p>

                    <span class="h3">Home</span>
                    <p>AOSBox ProjectA</p>
                </div>
                <div class="area_right">
                    <div class="form_step">
                        <ul>
                            <li class="step01 on"><span>Step1<br><b>플랜작성</b></span></li>
                            <li class="step02"><span>Step2<br><b>플랜요약</b></span></li>

                            <li class="step01 on"><span>Step1<br><b>플랜작성</b></span></li>
                            <li class="step02 on"><span>Step2<br><b>플랜요약</b></span></li>
                        </ul>
                    </div>
                    <!-- S : plan - HOME -->
                    <fieldset style="display: block;">
                        <legend>플랜작성</legend>
                        <!-- dl class="active" 으로 활성화 표현 -->
                        <dl class="active none_marginTop">
                            <dt>플랜 종류</dt>
                            <dd>
                                <span class="basic_select selectbox_ui category01">
                                    <b class="selected_txt focus">HOME</b>
                                    <!-- class="focus" 추가 되면 화살표 방향 반대 -->
                                    <select>
                                        <option value="">HOME</option>
                                        <option value="">BUSINESS</option>
                                    </select>
                                </span>
                            </dd>
                        </dl>
                        <dl>
                            <dt>플랜 이름</dt>
                            <dd>
                                <input type="text" placeholder="플랜 이름">
                            </dd>
                        </dl>
                        <dl>
                            <dt>백업 형식</dt>
                            <dd>
                                <span class="basic_select selectbox_ui category01">
                                    <b class="selected_txt">컴퓨터</b>
                                    <select>
                                        <option value="">컴퓨터</option>
                                    </select>
                                </span>
                            </dd>
                        </dl>
                        <dl>
                            <dt>사용자</dt>
                            <dd class="quantity_box">
                                <button type="button" class="btn_minus">
                                    <span class="blind">1 감소</span>
                                </button>
                                <input type="text" title="사용자수" value="1 User">
                                <button type="button" class="btn_plus">
                                    <span class="blind">1 증가</span>
                                </button>
                            </dd>
                        </dl>
                        <dl>
                            <dt>
                                <label class="display_inlineBlock clear_both">
                                    <input type="checkbox" class="float_left" title="전체선택">
                                    <span class="display_inlineBlock float_left">일반 스토리지</span>
                                </label>
                            </dt>
                            <dd class="quantity_box disabled">
                                <!-- 비활성화 class ="disabled" 추가 -->
                                <button type="button" class="btn_minus">
                                    <span class="blind">1 감소</span>
                                </button>
                                <input type="text" title="일반 스토리지" value="무제한" disabled="disabled">
                                <button type="button" class="btn_plus">
                                    <span class="blind">1 증가</span>
                                </button>
                            </dd>
                        </dl>
                        <dl>
                            <dt>콜드 스토리지</dt>
                            <dd class="quantity_box">
                                <button type="button" class="btn_minus">
                                    <span class="blind">1 감소</span>
                                </button>
                                <input type="text" title="콜드 스토리지" value="무제한">
                                <button type="button" class="btn_plus">
                                    <span class="blind">1 증가</span>
                                </button>
                            </dd>
                        </dl>
                        <dl>
                            <dt>기간</dt>
                            <dd>
                                <span class="basic_select selectbox_ui category01">
                                    <b class="selected_txt">월간</b>
                                    <select>
                                        <option value="">월간</option>
                                        <option value="">연간</option>
                                        <option value="">무제한</option>
                                    </select>
                                </span>
                            </dd>
                        </dl>
                        <dl>
                            <dt>
                                <label class="display_inlineBlock clear_both">
                                    <input type="checkbox" class="float_left" title="전체선택">
                                    <span class="display_inlineBlock float_left">외장 드라이브 지원</span>
                                </label>
                            </dt>
                            <dd>&nbsp;</dd>
                        </dl>
                    </fieldset>
                    <!-- E : plan - HOME -->

                    <!-- S : plan - BUSINESS -->
                    <fieldset style="display: none;">
                        <legend>플랜작성</legend>
                        <!-- dl class="active" 으로 활성화 표현 -->
                        <dl class="active none_marginTop">
                            <dt>플랜 종류</dt>
                            <dd>
                                <span class="basic_select selectbox_ui category01">
                                    <b class="selected_txt focus">BUSINESS</b>
                                    <!-- class="focus" 추가 되면 화살표 방향 반대 -->
                                    <select>
                                        <option value="">HOME</option>
                                        <option value="">BUSINESS</option>
                                    </select>
                                </span>
                            </dd>
                        </dl>
                        <dl>
                            <dt>플랜 이름</dt>
                            <dd>
                                <input type="text" placeholder="플랜 이름">
                            </dd>
                        </dl>
                        <dl>
                            <dt>사용자</dt>
                            <dd class="quantity_box">
                                <button type="button" class="btn_minus">
                                    <span class="blind">1 감소</span>
                                </button>
                                <input type="text" title="사용자수" value="1">
                                <button type="button" class="btn_plus">
                                    <span class="blind">1 증가</span>
                                </button>
                            </dd>
                        </dl>
                        <dl>
                            <dt>일반 스토리지</dt>
                            <dd class="quantity_box">
                                <button type="button" class="btn_minus">
                                    <span class="blind">1 감소</span>
                                </button>
                                <input type="text" title="일반 스토리지" value="무제한">
                                <button type="button" class="btn_plus">
                                    <span class="blind">1 증가</span>
                                </button>
                            </dd>
                        </dl>
                        <dl>
                            <dt>콜드 스토리지</dt>
                            <dd class="quantity_box">
                                <button type="button" class="btn_minus">
                                    <span class="blind">1 감소</span>
                                </button>
                                <input type="text" title="콜드 스토리지" value="무제한">
                                <button type="button" class="btn_plus">
                                    <span class="blind">1 증가</span>
                                </button>
                            </dd>
                        </dl>
                        <dl>
                            <dt>
                                <label class="display_inlineBlock clear_both">
                                    <input type="checkbox" class="float_left" title="전체선택">
                                    <span class="display_inlineBlock float_left">OCR</span>
                                </label>
                            </dt>
                            <dd class="quantity_box disabled">
                                <!-- 비활성화 class ="disabled" 추가 -->
                                <button type="button" class="btn_minus">
                                    <span class="blind">1 감소</span>
                                </button>
                                <input type="text" title="OCR" value="1000 Page" disabled="disabled">
                                <button type="button" class="btn_plus">
                                    <span class="blind">1 증가</span>
                                </button>
                            </dd>
                        </dl>
                        <dl>
                            <dt>
                                <label class="display_inlineBlock clear_both">
                                    <input type="checkbox" class="float_left" title="전체선택" checked="checked">
                                    <span class="display_inlineBlock float_left">서버</span>
                                </label>
                            </dt>
                            <dd class="quantity_box">
                                <!-- 비활성화 class ="disabled" 추가 -->
                                <button type="button" class="btn_minus">
                                    <span class="blind">1 감소</span>
                                </button>
                                <input type="text" title="서버" value="무제한">
                                <button type="button" class="btn_plus">
                                    <span class="blind">1 증가</span>
                                </button>
                            </dd>
                        </dl>
                        <dl>
                            <dt>기간</dt>
                            <dd>
                                <span class="basic_select selectbox_ui category01">
                                    <b class="selected_txt">월간</b>
                                    <select>
                                        <option value="">월간</option>
                                        <option value="">연간</option>
                                        <option value="">무제한</option>
                                    </select>
                                </span>
                            </dd>
                        </dl>
                        <dl>
                            <dt>감사</dt>
                            <dd>
                                <span class="basic_select selectbox_ui category01">
                                    <b class="selected_txt">기본</b>
                                    <select>
                                        <option value="">월간</option>
                                        <option value="">연간</option>
                                        <option value="">무제한</option>
                                    </select>
                                </span>
                            </dd>
                        </dl>
                        <dl>
                            <dt>
                                <label class="display_inlineBlock clear_both">
                                    <input type="checkbox" class="float_left" title="전체선택">
                                    <span class="display_inlineBlock float_left">외장 드라이브 지원</span>
                                </label>
                            </dt>
                            <dd>&nbsp;</dd>
                        </dl>
                    </fieldset>
                    <!-- E : plan - BUSINESS -->

                    <!-- S : 요약 -->
                    <div class="summary_wrap">
                        <dl>
                            <dt>플랜종류</dt>
                            <dd>
                                HOME
                            </dd>
                        </dl>
                        <dl>
                            <dt>플랜 명</dt>
                            <dd>AOSBox ProjectA</dd>
                        </dl>
                        <dl>
                            <dt>백업형식</dt>
                            <dd>컴퓨터</dd>
                        </dl>
                        <dl>
                            <dt>사용자</dt>
                            <dd>1 User</dd>
                        </dl>
                        <dl>
                            <dt>일반 스토리지</dt>
                            <dd>&nbsp;&ndash;</dd>
                        </dl>
                        <dl>
                            <dt>콜드 스토리지</dt>
                            <dd>무제한</dd>
                        </dl>
                        <dl>
                            <dt>OCR</dt>
                            <dd>&nbsp;&ndash;</dd>
                        </dl>
                        <dl>
                            <dt>외장 드라이브</dt>
                            <dd>N</dd>
                        </dl>
                        <dl>
                            <dt>기간</dt>
                            <dd>1년</dd>
                        </dl>
                        <dl>
                            <dt>감사</dt>
                            <dd>NA</dd>
                        </dl>
                    </div>
                    <!-- E : 요약 -->

                    <div class="btn_wrap">
                        <button class="btn_common submit position_rel">다음<span class="ico_next"></span></button>

                        <button class="btn_common cancel position_rel">이전<span class="ico_back"></span></button>
                        <button class="btn_common submit position_rel">완료</button>
                    </div>
                </div>
            </div>
        </article>
    </section>
</template>

<script>
    export default {
        name: "Add",
        mounted() {

            jQuery("section.content .sub_content").mCustomScrollbar({
                theme:"minimal-dark"
            });
        }
    }
</script>

<style scoped>

</style>
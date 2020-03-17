<template>
    <section class="content">
        <article class="sub_title">
            <h2><span class="ico_license">라이센스 관리</span></h2>
            <div class="location">
                <span>홈</span>
                <span class="gt_sign">&gt;</span>
                <span class="">라이센스 관리</span>
                <span class="gt_sign">&gt;</span>
                <span class="on">라이센스 추가</span>
                <!-- 현재 페이지 class="on" -->
            </div>
        </article>
        <article class="sub_content sub_common">
            <h3>라이센스 추가</h3>
            <div class="add_form_wrap clear_both">
                <span class="top_line"></span>
                <div class="area_left license">
                    <span class="h3">라이센스 추가</span>
                    <p>라이센스를 추가하려면<br>오른쪽 정보를 입력하세요.</p>

                    <span class="h3">license</span>
                    <p>라이센스가 생성되었습니다.<br>정보를 확인해 주세요.</p>
                </div>
                <div class="area_right">
                    <div class="form_step">
                        <ul>
                            <li class="step01 on"><span>Step1<br><b>라이센스 생성</b></span></li>
                            <li class="step02"><span>Step2<br><b>라이센스 요약</b></span></li>

                            <li class="step01 on"><span>Step1<br><b>라이센스 생성</b></span></li>
                            <li class="step02 on"><span>Step2<br><b>라이센스 요약</b></span></li>
                        </ul>
                    </div>
                    <fieldset>
                        <legend>라이센스 추가</legend>
                        <div class="form_tabMenu">
                            <ul class="clear_both">
                                <li><a href="http://" class="active"><span class="ico_form_tab"></span>선택 생성</a></li>
                                <!-- a class ="active" 활성화 -->
                                <li><a href="http://"><span class="ico_form_tab ico_csv"></span>CSV파일 생성</a></li>
                            </ul>
                        </div>
                        <!-- S : license - 선택 생성 -->
                        <div class="tab_content">
                            <dl class="active">
                            <!-- dl class="active" 으로 활성화 표현 -->
                                <dt>플랜</dt>
                                <dd>
                                    <span class="basic_select selectbox_ui category01">
                                        <b class="selected_txt focus">Hadi plan</b>
                                        <!-- class="focus" 추가 되면 화살표 방향 반대 -->
                                        <select>
                                            <option value="">Hadi plan</option>
                                            <option value="">Hadi plan</option>
                                        </select>
                                    </span>
                                </dd>
                            </dl>
                            <dl>
                                <dt>라이센스 종류</dt>
                                <dd>
                                    <span class="basic_select selectbox_ui category01">
                                        <b class="selected_txt">테스트용</b>
                                        <select>
                                            <option value="">데모용</option>
                                            <option value="">유저용</option>
                                        </select>
                                    </span>
                                </dd>
                            </dl>
                            <dl>
                                <dt>라이센스 수</dt>
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
                                <dt>기간</dt>
                                <dd>
                                    <span class="basic_select selectbox_ui category01">
                                        <b class="selected_txt">1개월</b>
                                        <select>
                                            <option value="">1개월</option>
                                            <option value="">6개월</option>
                                            <option value="">1년</option>
                                            <option value="">2년</option>
                                            <option value="">3년</option>
                                            <option value="">5년</option>
                                            <option value="">무제한</option>
                                        </select>
                                    </span>
                                </dd>
                            </dl>
                            <dl>
                                <dt class="">메모<span class="textBox_msg">최대 100자까지 입력 가능</span></dt>
                                <dd>
                                    <textarea name="" id="" cols="30" rows="10"></textarea>
                                </dd>
                            </dl>
                        </div>
                        <!-- E : license - 선택 생성 -->


                        <!-- S : license - CSV파일 생성 -->
                        <div class="tab_content" style="display: none;">
                            <h5>CSV 파일 업로드</h5>
                            <button type="button" class="btn_common01 btn_next_title"><span class="ico_csv"></span>엑셀 샘플 다운로드</button>
                            <div class="area_file_add">
                                <p>Drop and Drop files here or Click</p>
                            </div>
                        </div>
                        <!-- E : license - CSV파일 생성 -->
                    </fieldset>

                    <div class="summary_wrap">
                        <dl>
                            <dt>플랜 명</dt>
                            <dd>AOSBox ProjectA</dd>
                        </dl>
                        <dl>
                            <dt>라이센스 종류</dt>
                            <dd>데모용</dd>
                        </dl>
                        <dl>
                            <dt>라이센스 수</dt>
                            <dd>10000</dd>
                        </dl>
                        <dl>
                            <dt>기간</dt>
                            <dd>1년</dd>
                        </dl>
                        <dl>
                            <dt>메모</dt>
                            <dd>영업 겁나 못하는 리셀러에게 발급함</dd>
                        </dl>
                    </div>
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
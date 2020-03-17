<template>
    <div class="admin_list">
<!--        <table class="board_list">-->
<!--            <caption>사용자 목록</caption>-->
<!--            <colgroup>-->
<!--                <col style="width:*px" />-->
<!--                <col style="width:120px" />-->
<!--                <col style="width:140px" />-->
<!--                <col style="width:220px" />-->
<!--                <col style="width:220px" />-->
<!--                <col style="width:180px" />-->
<!--                <col style="width:46px" />-->
<!--            </colgroup>-->
<!--            <thead>-->
<!--            <tr>-->
<!--                <th scope="col"><a href="javascript:void(0)" class="sorting">유저명/컴퓨터 이름</a></th>-->
<!--                <th scope="col"><a href="javascript:void(0)" class="sorting on">상황</a></th>-->
<!--                <th scope="col"><a href="javascript:void(0)" class="sorting">전회 사용</a></th>-->
<!--                <th scope="col"><a href="javascript:void(0)" class="sorting">일반 스토리지 사용량/최대</a></th>-->
<!--                <th scope="col"><a href="javascript:void(0)" class="sorting">콜드 스토리지 사용량/최대</a></th>-->
<!--                <th scope="col"><a href="javascript:void(0)" class="sorting">OCR 사용량/최대</a></th>-->
<!--                <th scope="col">&nbsp;</th>-->
<!--            </tr>-->
<!--            </thead>-->
<!--            <tbody>-->
<!--                <tr>-->
<!--                    <td class="left"><img src="@/assets/images/sub/ico_ad_server_valid.png" alt="서버" class="ico_admin" /><a href="#">JY Lee</a></td>-->
<!--                    <td>유효</td>-->
<!--                    <td>2019.07.23</td>-->
<!--                    <td>922 MB / 제한 없이</td>-->
<!--                    <td>0 bytes / 제한 없이</td>-->
<!--                    <td>5 페이지 / 제한 없이</td>-->
<!--                    <td><a href="#" class="btn_more"><img src="@/assets/images/component/board_btn_more.png" alt="더 보기" /></a></td>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                    <td class="left"><img src="@/assets/images/sub/ico_ad_server_pause.png" alt="서버" class="ico_admin" /><a href="#">Byoung Gon Kim</a></td>-->
<!--                    <td>일시정지</td>-->
<!--                    <td>2019.07.23</td>-->
<!--                    <td>922 MB / 제한 없이</td>-->
<!--                    <td>0 bytes / 제한 없이</td>-->
<!--                    <td>5 페이지 / 제한 없이</td>-->
<!--                    <td><a href="#" class="btn_more"><img src="@/assets/images/component/board_btn_more.png" alt="더 보기" /></a></td>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                    <td class="left"><img src="@/assets/images/sub/ico_ad_server_valid.png" alt="서버" class="ico_admin" /><a href="#">JY Lee</a></td>-->
<!--                    <td>유효</td>-->
<!--                    <td>2019.07.23</td>-->
<!--                    <td>922 MB / 제한 없이</td>-->
<!--                    <td>0 bytes / 제한 없이</td>-->
<!--                    <td>5 페이지 / 제한 없이</td>-->
<!--                    <td><a href="#" class="btn_more"><img src="@/assets/images/component/board_btn_more.png" alt="더 보기" /></a></td>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                    <td class="left"><img src="@/assets/images/sub/ico_ad_server_pause.png" alt="서버" class="ico_admin" /><a href="#">Byoung Gon Kim</a></td>-->
<!--                    <td>일시정지</td>-->
<!--                    <td>2019.07.23</td>-->
<!--                    <td>922 MB / 제한 없이</td>-->
<!--                    <td>0 bytes / 제한 없이</td>-->
<!--                    <td>5 페이지 / 제한 없이</td>-->
<!--                    <td><a href="#" class="btn_more"><img src="@/assets/images/component/board_btn_more.png" alt="더 보기" /></a></td>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                    <td class="left"><img src="@/assets/images/sub/ico_ad_server_valid.png" alt="서버" class="ico_admin" /><a href="#">JY Lee</a></td>-->
<!--                    <td>유효</td>-->
<!--                    <td>2019.07.23</td>-->
<!--                    <td>922 MB / 제한 없이</td>-->
<!--                    <td>0 bytes / 제한 없이</td>-->
<!--                    <td>5 페이지 / 제한 없이</td>-->
<!--                    <td><a href="#" class="btn_more"><img src="@/assets/images/component/board_btn_more.png" alt="더 보기" /></a></td>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                    <td class="left"><img src="@/assets/images/sub/ico_ad_server_pause.png" alt="서버" class="ico_admin" /><a href="#">Byoung Gon Kim</a></td>-->
<!--                    <td>일시정지</td>-->
<!--                    <td>2019.07.23</td>-->
<!--                    <td>922 MB / 제한 없이</td>-->
<!--                    <td>0 bytes / 제한 없이</td>-->
<!--                    <td>5 페이지 / 제한 없이</td>-->
<!--                    <td><a href="#" class="btn_more"><img src="@/assets/images/component/board_btn_more.png" alt="더 보기" /></a></td>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                    <td class="left"><img src="@/assets/images/sub/ico_ad_server_valid.png" alt="서버" class="ico_admin" /><a href="#">JY Lee</a></td>-->
<!--                    <td>유효</td>-->
<!--                    <td>2019.07.23</td>-->
<!--                    <td>922 MB / 제한 없이</td>-->
<!--                    <td>0 bytes / 제한 없이</td>-->
<!--                    <td>5 페이지 / 제한 없이</td>-->
<!--                    <td><a href="#" class="btn_more"><img src="@/assets/images/component/board_btn_more.png" alt="더 보기" /></a></td>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                    <td class="left"><img src="@/assets/images/sub/ico_ad_server_pause.png" alt="서버" class="ico_admin" /><a href="#">Byoung Gon Kim</a></td>-->
<!--                    <td>일시정지</td>-->
<!--                    <td>2019.07.23</td>-->
<!--                    <td>922 MB / 제한 없이</td>-->
<!--                    <td>0 bytes / 제한 없이</td>-->
<!--                    <td>5 페이지 / 제한 없이</td>-->
<!--                    <td><a href="#" class="btn_more"><img src="@/assets/images/component/board_btn_more.png" alt="더 보기" /></a></td>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                    <td class="left"><img src="@/assets/images/sub/ico_ad_server_valid.png" alt="서버" class="ico_admin" /><a href="#">JY Lee</a></td>-->
<!--                    <td>유효</td>-->
<!--                    <td>2019.07.23</td>-->
<!--                    <td>922 MB / 제한 없이</td>-->
<!--                    <td>0 bytes / 제한 없이</td>-->
<!--                    <td>5 페이지 / 제한 없이</td>-->
<!--                    <td><a href="#" class="btn_more"><img src="@/assets/images/component/board_btn_more.png" alt="더 보기" /></a></td>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                    <td class="left"><img src="@/assets/images/sub/ico_ad_server_pause.png" alt="서버" class="ico_admin" /><a href="#">Byoung Gon Kim</a></td>-->
<!--                    <td>일시정지</td>-->
<!--                    <td>2019.07.23</td>-->
<!--                    <td>922 MB / 제한 없이</td>-->
<!--                    <td>0 bytes / 제한 없이</td>-->
<!--                    <td>5 페이지 / 제한 없이</td>-->
<!--                    <td><a href="#" class="btn_more"><img src="@/assets/images/component/board_btn_more.png" alt="더 보기" /></a></td>-->
<!--                </tr>-->
<!--            </tbody>-->
<!--        </table>-->
<!--        <div class="page_navi">-->
<!--            <a href="#" class="guide prev"><img src="@/assets/images/component/btn_page_prev.png" alt="Prev" class="ico"></a>-->
<!--            <a href="#" class="num active">1</a>-->
<!--            <a href="#" class="num">2</a>-->
<!--            <a href="#" class="num">3</a>-->
<!--            <a href="#" class="num">4</a>-->
<!--            <a href="#" class="num">5</a>-->
<!--            <a href="#" class="guide next"><img src="@/assets/images/component/btn_page_next.png" alt="Next" class="ico"></a>-->
<!--        </div>-->

        <div class="board_empty">
            <img src="@/assets/images/component/ico_admin_empty.png" alt="" class="ico" />
            <p>서버가 없습니다.</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserInfoServer"
    }
</script>

<style scoped>

</style>
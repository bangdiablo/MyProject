<template>

    <article id="contents" class="sub">
      <location/>

      <div class="content">
        <p class="intro_guide">사용자는 발송된 초대 메일의 링크에서 AOSBOX AI plus의 이용 개시 절차를 실시합니다.</p>
        <table class="board_view">
          <caption>메일로 초대</caption>
          <colgroup>
            <col style="width:180px"/>
            <col style="width:*"/>
          </colgroup>
          <tbody>
          <tr>
            <th scope="row"><label for="mailAdress">메일 주소</label></th>
            <td>
<!--                <div class="bootstrap-tagsinput"></div>-->
                <input id="savedInput" type="text" ref="emails">
<!--                <input id="savedInput" type="text" value="" data-role="tagsinput" style="display: none;">-->
<!--              <input type="email" id="mailAdress" style="width: 340px"/>-->
<!--              <p class="error_msg">이름을 입력해주세요.</p>-->
              <p class="add_option">메일 주소는 쉼표, 세미 콜론 또는 공백으로 구분합니다</p>
            </td>
          </tr>
          <tr>
            <th scope="row"><label for="mailSubject">제목</label></th>
            <td>
              <input type="text" id="mailSubject" style="width:100%" ref="subject"/>
            </td>
          </tr>
          <tr>
            <th scope="row"><label for="mailMessege">메시지</label></th>
            <td>
              <textarea name="" id="" cols="30" rows="10" style="width:100%; height:276px" ref="message"></textarea>
              <p class="add_option">AOSBOX AI plus를 셋업 하는 방법을 지시하기 위한 글을 추가합니다</p>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="board_btn_set">
          <button type="button" class="btn_basic submit" @click="requestSendEmail">보내기</button>
          <router-link to="/management/user_server"><button type="button" class="btn_basic cancel">취소</button></router-link>
        </div>
        <ul class="desc_list">
          <li>수동으로 유저를 추가하려면 <router-link to="/management/user_server/manual_invitation">수동으로 추가</router-link>를 사용합니다.</li>
          <li>복수의 유저를 일괄적으로 추가하려면 <router-link to="/management/user_server/csv_invitation">CSV파일에서 일괄 추가</router-link>를 사용합니다.</li>
        </ul>
      </div>
    </article>

</template>

<script>
    import '@/plugins/bootstrap-tagsinput.js';

    export default {
        name: "MailInvitation",
        methods: {

            // 메일로 초대 보내기
            requestSendEmail() {

                let qs = require('qs'),
                    emails = this.$refs.emails.value,
                    subject = this.$refs.subject.value.trim(),
                    message = this.$refs.message.value.trim();

                if (emails === "") {

                    alert("이메일을 입력해주세요.");
                    return;
                }

                if (subject === "") {

                    alert("제목을 입력해주세요.");
                    return;
                }

                if (message === "") {

                    alert("메시지를 입력해주세요.");
                    return;
                }

                axios.post("/management/sendEmail/", qs.stringify({
                    'emails': emails,
                    'subject': subject,
                    'message': message
                })).then(result => {

                    let data = result.data;

                    if (data.code === 1000) {

                        alert("메일이 발송되었습니다.");
                        $(this.$refs.emails).tagsinput('removeAll');
                        this.$refs.subject.value = '';
                        this.$refs.message.value = '';
                    }

                }).catch(ex => {

                    console.log(ex);
                });
            }
        },
        mounted() {

            let emailTags = $('#savedInput').on('beforeItemAdd', function (event) {

                event.cancel = !IsValidEmailAddress(event.item);

            }).on('itemAdded itemRemoved', function (event) {

                // AffectCapacity();

            }).tagsinput({
                delimiterRegex: /[;,\s]+/,
                trimValue: true
            });

            function IsValidEmailAddress(emailAddress) {

                if (!isAsciiString(emailAddress) || emailAddress.length > 64) {
                    return false;
                }
                let pattern = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,15}(?:\.[a-z]{2})?)$/i);

                return pattern.test($.trim(emailAddress));
            }

            function isAsciiString(str) {
                return (/^[\x00-\x7F]*$/).test(str);
            }
        }
    }
</script>

<style scoped>
.board_btn_set {
    text-align: left;
}
</style>

<template>
    <article id="contents" class="sub">
		<location/>

		<div class="content">
			<p class="intro_guide">샘플 CSV 파일을 다운로드하고 편집하세요.</p>
			<table class="board_view">
				<caption>수동으로 초대</caption>
				<colgroup>
					<col style="width:180px" />
					<col style="width:*" />
				</colgroup>
				<tbody>
					<tr>
						<th scope="row">csv 파일 업로드</th>
						<td>
							<button type="button" class="btn_basic" @click="showTheSample"><img src="@/assets/images/sub/ico_csv.png" alt="" class="ico" />csv 샘플보기</button>
							<button type="button" class="btn_basic" @click="downloadTheSample"><img src="@/assets/images/sub/ico_csv_download.png" alt="" class="ico" />csv 샘플 다운로드</button>
						</td>
					</tr>
					<tr>
						<td colspan="2" style="height:400px;">
                            <div class="dragAndDrop" ref="dragAndDrop">
                                <div class="text">파일 드래그 엔 드랍 영역</div>
                            </div>
                            <input type="file" class="hide" ref="file" multiple>
						</td>
					</tr>
<!--                    <tr v-show="files.length">-->
<!--                        <td colspan="2" >-->
<!--                            <div v-for="file in files">-->
<!--                                {{file.name}} <span class="pointer" @click="deleteFile(file.id)">X</span>-->
<!--                            </div>-->
<!--                        </td>-->
<!--                    </tr>-->
				</tbody>
			</table>
<!--            <div class="board_btn_set">-->
<!--                <button type="button" class="btn_basic submit" @click="registMembers">추가</button>-->
<!--                <router-link to="/management/user_server"><button type="button" class="btn_basic cancel">취소</button></router-link>-->
<!--            </div>-->
			<ul class="desc_list">
				<li>AOSBOX AI plus에 사용자를 초청하려면 <router-link to="/management/user_server/mail_invitation">메일로 초대</router-link>를 사용합니다.</li>
				<li>수동으로 유저를 추가하려면 <router-link to="/management/user_server/manual_invitation">수동으로 추가</router-link>를 사용합니다.</li>
			</ul>
		</div>

        <!-- 엑셀파일 작성 안내 -->
        <div class="layer_popup" ref="exampleCsvLayer">
            <h3>엑셀파일 작성 안내</h3>
            <div class="csv_write_guide">
                <div class="photo">
                    <img src="@/assets/images/sub/photo_csv_guide.png" alt="" />
                </div>
                <ul class="desc_list">
                    <li>샘플 파일의 형식을 유지하여 가져오기를 해 주시기 바랍니다.</li>
                    <li>샘플 파일의 항목을 임의로 추가, 삭제 또는 변경하시면 정보는 저장되지 않습니다.</li>
                    <li>데이터의 순위는 위와 같이 유지하여 주시고, 데이터가 없는 열은 공란으로 남겨두세요.</li>
                    <li>데이터에 쉼포(,)가 들어 있으면 데이터가 잘못 들어갈 수 있습니다.</li>
                </ul>
            </div>

            <div class="btn_set">
                <button type="button" class="btn_basic cancel" @click="closeLayer">닫기</button>
            </div>
            <button class="btn_close" @click="closeLayer"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기" /></button>
        </div>

        <!-- 가져오기 - 실패 -->
        <div class="layer_popup" ref="failLoadCsvLayer">
            <h3>가져오기</h3>
            <div class="msg warning">
                <h4><img src="@/assets/images/component/ico_lp_warning.png" alt="가져오기" /></h4>
                <p>
                    <strong>
                        파일의 형식이 맞지 않습니다.<br />
                        올바른 CSV 파일의 형식을 선택하십시오.
                    </strong>
                </p>
            </div>

            <div class="btn_set">
                <button type="button" class="btn_basic cancel" @click="closeLayer">닫기</button>
            </div>
            <button class="btn_close" @click="closeLayer"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기"/></button>
        </div>

        <!-- 가져오기 - 성공 -->
        <div class="layer_popup" ref="successLoadCsvLayer">
            <h3>가져오기</h3>
            <div class="msg success">
                <h4><img src="@/assets/images/component/ico_lp_success.png" alt="가져오기" /></h4>
                <p>
                    <strong>가져오기에 성공하였습니다.</strong>
                </p>
            </div>

            <div class="btn_set">
                <button type="button" class="btn_basic cancel" @click="moveToUserPage">닫기</button>
            </div>
            <button class="btn_close" @click="moveToUserPage"><img src="@/assets/images/component/btn_popup_close.png" alt="닫기"/></button>
        </div>

        <!-- 모달 배경 -->
        <div class="modal_bg" ref="modal"></div>
	</article>
</template>

<script>
    import {saveAs} from 'file-saver'

    export default {
        name: "CsvInvitation",
        data() {
          return {
              files: []
          }
        },
        methods: {

            // csv 샘플보기
            showTheSample() {

                this.openLayer('exampleCsvLayer');
            },

            // csv 샘플 다운로드
            downloadTheSample() {

                saveAs('http://dbox-dev.net/AddMultipleUser.csv', 'AddMultipleUser.csv');
            },

            // 레이어 팝업 보이기
            openLayer(layerName) {

                $(this.$refs.modal).show();
                $(this.$refs[layerName]).show();
            },

            // 레이어 팝업 숨기기
            closeLayer() {

                $(this.$refs.modal).hide();
                $(".layer_popup").hide();
            },

            checkFiles(files, callback) {

                let reader = new FileReader(),
                    index = 0,
                    valid = true,
                    that = this,
                    file,
                    i;

                /*
                 * 드롭다운 된 파일이 올바른 CSV파일인지 검사
                 * 1. CSV 파일인지 검사
                 * 2. CSV 내용 형식이 맞는지 검사
                 */
                // 1
                for (i = 0; i < files.length; i++) {

                    let file = files[i];

                    if (file.name.lastIndexOf(".") == -1 || file.name.slice(file.name.lastIndexOf(".") + 1).toLowerCase() !== 'csv') {

                        this.openLayer('failLoadCsvLayer');
                        this.files = [];
                        return;
                    }
                }

                if (files.length == 0) return;

                reader.readAsBinaryString(files[index]);

                reader.onload = function(e) {

                    let data = e.target.result;

                    let dataArr = data.split("\r\n");

                    for (let j = 0; j < dataArr.length; j++) {

                        if (j === 0) continue;

                        let implData = dataArr[j];

                        if (implData === '') break;

                        let implDataArr = implData.split(",");

                        let email = implDataArr[2];
                        // console.log(email)
                        if (!validEmail(email)) {

                            this.openLayer('failLoadCsvLayer');
                            that.files = [];
                            valid = false;
                            return false;
                        }
                    }
                }

                reader.onloadend = function (e) {

                    if (valid) {

                        if (++index != files.length) {

                            reader.readAsBinaryString(files[index]);

                        } else {

                            for (i = 0; i < files.length; i++) {

                                file = files[i];
                                file.id = Math.floor(Math.random() * 10000) + "_" + new Date().getTime() + "_" + file.name;
                                that.files.push(file);
                            }

                            callback();
                        }

                    }
                }

            },

            deleteFile(fileId) {

                let files = this.files,
                    file;

                for (let i = 0; i < files.length; i++) {

                    file = files[i];

                    if (fileId === file.id)
                        this.files.splice(i, 1);
                }

            },

            // 추가
            registMembers() {

                let files = this.files;

                // 업로드할 파일이 있는지 확인 후, 진행
                if (this.files.length === 0) return;

                const formData = new FormData();
                for (let i = 0; i < files.length; i++) {

                    formData.append('files[' + i + ']', this.files[i], this.files[i].id);
                }

                axios.post('/management/registMembers/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(result => {

                    let data = result.data;

                    if (data.code == 1000) {

                        this.openLayer('successLoadCsvLayer');

                    } else {

                        this.openLayer('failLoadCsvLayer');
                        this.files = [];
                    }

                }).catch(ex => {

                    console.log(ex);
                });
            },

            moveToUserPage() {

                this.$router.push("/management/user_server");
            }

        },
        mounted() {

            let $dropZone = $(this.$refs.dragAndDrop),
                $file = $(this.$refs.file),
                that = this;

            //Drag기능
            $dropZone.on('dragenter',function(e){

                e.stopPropagation();
                e.preventDefault();

                // 드롭다운 영역 css
                $dropZone.css('background-color','#E3F2FC');

            }).on('dragleave',function(e){

                e.stopPropagation();
                e.preventDefault();

                // 드롭다운 영역 css
                $dropZone.css('background-color','#FFFFFF');

            }).on('dragover',function(e){

                e.stopPropagation();
                e.preventDefault();

                // 드롭다운 영역 css
                $dropZone.css('background-color','#E3F2FC');

            }).on('drop',function(e){

                let files = e.originalEvent.dataTransfer.files;

                // console.log(files)

                e.preventDefault();

                // 드롭다운 영역 css
                $dropZone.css('background-color','#FFFFFF');

                // 첨부한 파일 체크 & 첨부 파일 표시
                that.checkFiles(files, that.registMembers);

            }).on('click', function(e){

                $file.click();
            });

            // 파일 선택 시
            $file.on('change', function(e){

                let files = e.target.files;

                // 첨부한 파일 체크 & 첨부 파일 표시
                that.checkFiles(files, that.registMembers);
            });
        }
    }

    function validEmail(email) {

        let regex=/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

        return (email != '' && email != 'undefined' && regex.test(email));
    }

    function download(strData, strFileName, strMimeType) {
        let D = document,
            a = D.createElement("a");
            strMimeType= strMimeType || "application/octet-stream";


        if (navigator.msSaveBlob) { // IE10
            return navigator.msSaveBlob(new Blob([strData], {type: strMimeType}), strFileName);
        } /* end if(navigator.msSaveBlob) */


        if ('download' in a) { //html5 A[download]
            a.href = "data:" + strMimeType + "," + encodeURIComponent(strData);
            a.setAttribute("download", strFileName);
            a.innerHTML = "downloading...";
            D.body.appendChild(a);
            setTimeout(function() {
                a.click();
                D.body.removeChild(a);
            }, 66);
            return true;
        } /* end if('download' in a) */


        //do iframe dataURL download (old ch+FF):
        let f = D.createElement("iframe");
        D.body.appendChild(f);
        f.src = "data:" +  strMimeType   + "," + encodeURIComponent(strData);

        setTimeout(function() {
            D.body.removeChild(f);
        }, 333);
        return true;
    } /* end download() */
</script>

<style scoped>
.board_btn_set {
    text-align: left;
}
.dragAndDrop {
    display: table;
    height: 100%;
    width: 100%;
    text-align: center;
    border: gray solid 1px;
}
.dragAndDrop .text {
    display: table-cell;
    vertical-align: middle;
}
.hide {
    display: none;
}
</style>

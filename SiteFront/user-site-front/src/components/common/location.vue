<template>
  <div>
    <h2>
      <img v-bind:src="imgUrl" alt="" class="ico"/>
      <p class="location">
        <router-link :to="homePath">{{ homeName }}</router-link>
        <template v-for="(pathName, i) in pathsName">
          <img src="@/assets/images/sub/bullet_location.png" alt=""/>
          <template v-if="i === pathsName.length - 1">
            <strong>
              <router-link :to="paths[i]">{{ pathName }}</router-link>
            </strong> <!--<img src="@/assets/images/sub/bullet_location.png" alt="" v-if="folder_path.length != 0"/>
            <template  v-for="folder in folder_path">  <a href="#" @click="clickFolder(folder.id)" > {{ folder.dir_name }}  </a> <img src="@/assets/images/sub/bullet_location.png" alt=""/> </template>-->
          </template>
          <template v-else>
            <template v-if="i === 0">
              {{pathName}}
            </template>
            <template v-else>
              <router-link :to="paths[i]">{{pathName}}</router-link>
            </template>
          </template>
        </template>
      </p>
      <!-- 연결된 기기 일때만 표시-->
      <p class="sub_location" v-if="pathsName[0] == this.$t('path.connected_device.pathname')">
          <template v-for="(folder, idx) in folder_path" >
            <a href="#" @click="clickFolder(folder.id)" > {{ folder.dir_name }}  </a> <img src="@/assets/images/sub/bullet_location.png" alt=""/>
          </template>
       </p>
    </h2>

  </div>

</template>

<script>
  export default {
    data() {
      return {
        imgUrl: '',
        imgName: '',
        homePath: "/main",
        homeName: this.$t('path.home.pathname'),
        paths: [],
        pathsName: []
      }
    },
    methods: {
      clickFolder(id){
        let page = parseInt(1);
        this.$store.dispatch("connected_device/getFolderFile", {
          item: id,
          page: page
        })
      }
    },
    computed:{
      folder_path() {
        return this.$store.state.connected_device.folder_path;
      },

    },
    created() {

      let pathArr = this.$route.path.split('/'),
        path = "",
        pathKey = 'path',
        currentPath,
        imgName;

      for (let i = 1; i < pathArr.length; i++) {
        if (!isNaN(pathArr[i])) continue;
        path += "/" + pathArr[i];
        pathKey += "." + pathArr[i];
        this.paths.push(path);
        this.pathsName.push(this.$t(pathKey + ".pathname"));
      }

      imgName = this.$t(pathKey + ".imgName");

      if (imgName.indexOf("png") === -1)
        imgName = 'ico_tit_myfile.png';

      this.imgUrl = this.getFileUrl(imgName);


      // TODO 예외라 추후 수정해야 함
      currentPath = pathArr[pathArr.length - 1];

      // 연결된 기기일 경우
      if ("connected_device" == pathArr[1]) {
        this.pathsName.pop();
        this.pathsName.push(currentPath);

        if (pathArr.includes("connected_device"))
          this.imgUrl = this.getFileUrl(this.$t("path.connected_device.imgName"));

      } else if (currentPath == 'dropbox') {

        this.pathsName.pop();
        this.pathsName.push('Dropbox');

        if (pathArr.includes("storage_service"))
          this.imgUrl = this.getFileUrl(this.$t("path.storage_service.imgName"));
      }
    }
  }
</script>

<style scoped>
article#contents.sub p.sub_location {
    padding : 5px 0px 0px 28px;
    font-size: 18px;
    font-weight: 400;
}
</style>

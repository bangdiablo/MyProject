<template>
    <article class="sub_title">
        <h2><span :class="iconClass">{{pathsName[pathsName.length - 1]}}</span></h2>
        <div class="location">
            <span><router-link :to="homePath">{{ homeName }}</router-link></span>

            <template v-for="(pathName, i) in pathsName">
                <span class="gt_sign">&gt;</span>

                <template v-if="i === pathsName.length - 1">
                    <span class="on"><router-link :to="paths[i]">{{ pathName }}</router-link></span>
                </template>

                <template v-else>
                    <template v-if="i === 0">
                        <span>{{pathName}}</span>
                    </template>
                    <template v-else>
                        <span><router-link :to="paths[i]">{{pathName}}</router-link></span>
                    </template>
                </template>
            </template>
        </div>
    </article>


<!--  <div>-->
<!--    <h2>-->
<!--      <img v-bind:src="imgUrl" alt="" class="ico"/>-->
<!--      {{pathsName[pathsName.length - 1]}}-->

<!--      <div class="right">-->
<!--        <p class="location">-->
<!--          <router-link :to="homePath">{{ homeName }}</router-link>-->
<!--          <template v-for="(pathName, i) in pathsName">-->
<!--            <img src="@/assets/images/sub/bullet_location.png" alt=""/>-->
<!--            <template v-if="i === pathsName.length - 1">-->
<!--              <strong>-->
<!--                <router-link :to="paths[i]">{{ pathName }}</router-link>-->
<!--              </strong> &lt;!&ndash;<img src="@/assets/images/sub/bullet_location.png" alt="" v-if="folder_path.length != 0"/>-->
<!--              <template  v-for="folder in folder_path">  <a href="#" @click="clickFolder(folder.id)" > {{ folder.dir_name }}  </a> <img src="@/assets/images/sub/bullet_location.png" alt=""/> </template>&ndash;&gt;-->
<!--            </template>-->
<!--            <template v-else>-->
<!--              <template v-if="i === 0">-->
<!--                {{pathName}}-->
<!--              </template>-->
<!--              <template v-else>-->
<!--                <router-link :to="paths[i]">{{pathName}}</router-link>-->
<!--              </template>-->
<!--            </template>-->
<!--          </template>-->
<!--        </p>-->
<!--        &lt;!&ndash; 연결된 기기 일때만 표시&ndash;&gt;-->
<!--        <p class="sub_location" v-if="pathsName[0] == this.$t('path.connected_device.pathname')">-->
<!--            <template v-for="(folder, idx) in folder_path" >-->
<!--&lt;!&ndash;              <a href="#" @click="clickFolder(folder.id)" > {{ folder.dir_name }}  </a> <img src="@/assets/images/sub/bullet_location.png" alt=""/>&ndash;&gt;-->
<!--            </template>-->
<!--         </p>-->
<!--      </div>-->
<!--    </h2>-->

<!--  </div>-->

</template>

<script>
  import mixinFile from '../../mixin/file'

  export default {
    name: 'Location',
    mixins: [mixinFile],
    data() {
      return {
        iconClass: '',
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
        iconClass;

      for (let i = 1; i < pathArr.length; i++) {
        if (!isNaN(pathArr[i])) continue;
        path += "/" + pathArr[i];
        pathKey += "." + pathArr[i];
        this.paths.push(path);
        this.pathsName.push(this.$t(pathKey + ".pathname"));
      }

      iconClass = this.$t(pathKey + ".icon_class");

      console.log(iconClass)

      if (iconClass.indexOf("ico") === -1)
        iconClass = 'ico_reseller';

      this.iconClass = iconClass;

      // TODO 예외라 추후 수정해야 함
      currentPath = pathArr[pathArr.length - 1];
    }
  }
</script>

<style scoped>
.sub_title .location span.on a {
	color: #445eb4;
}
</style>

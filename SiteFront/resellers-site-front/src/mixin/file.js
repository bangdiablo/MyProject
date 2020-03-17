export default {
    methods : {

        getFileUrl(fileName) {

          let files = require.context('../assets/images/sub/', false, /\.png$/);

          return files('./' + fileName);
        }
    }
}
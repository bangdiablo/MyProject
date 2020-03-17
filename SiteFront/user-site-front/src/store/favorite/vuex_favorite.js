export default {
  namespaced: true,
  state: {
    devices: [],
    folders: [],
    files: [],
    folder_path: [],
    folder_id: '',
    folder_parent_id: '',
    file_id: '',
    storage_id: '',
  },
  mutations: {
    set_device_name(state, data) {
      state.devices = data
    },
    set_folders(state, data) {
      for (let i = 0; i < data.data.folderList.length; i++) {
        data.data.folderList[i]['checked'] = false;
        data.data.folderList[i]['on'] = false;
        data.data.folderList[i]['folder_type'] = true;
      }
      state.folders = data.data.folderList
    },
    set_files(state, data) {

      if (data.data.fileList.length > 0) {
        for (let i = 0; i < data.data.fileList.length; i++) {
          data.data.fileList[i]['checked'] = false;
          data.data.fileList[i]['on'] = false;
          data.data.fileList[i]['file_type'] = true;
          if (data.data.fileList[i]['type'] == 'image') {

            data.data.fileList[i]['img_ft_file_name'] = 'ico_ft_photo.png';
            data.data.fileList[i]['img_preview_file_name'] = 'preview_ft_photo.png';
            data.data.fileList[i]['kind'] = data.data.fileList[i]['ext'];

          } else if (data.data.fileList[i]['type'] == 'document') {
            if (data.data.fileList[i]['ext'] == '.xlsx' || data.data.fileList[i]['ext'] == '.xls') {
              data.data.fileList[i]['img_ft_file_name'] = 'ico_pwf_excel.png';
              data.data.fileList[i]['img_preview_file_name'] = 'preview_ft_excel.png';
              data.data.fileList[i]['kind'] = '스프레드시트';

            } else if (data.data.fileList[i]['ext'] == '.docx' || data.data.fileList[i]['ext'] == '.doc') {
              data.data.fileList[i]['img_ft_file_name'] = 'ico_pwf_word.png';
              data.data.fileList[i]['img_preview_file_name'] = 'preview_ft_word.png';
              data.data.fileList[i]['kind'] = 'document문서';

            } else if (data.data.fileList[i]['ext'] == '.pptx' || data.data.fileList[i]['ext'] == '.ppt') {
              data.data.fileList[i]['img_ft_file_name'] = 'ico_pwf_pp.png';
              data.data.fileList[i]['img_preview_file_name'] = 'preview_ft_pp.png';
              data.data.fileList[i]['kind'] = '프레젠테이션';

            } else if (data.data.fileList[i]['ext'] == '.pdf') {
              data.data.fileList[i]['img_ft_file_name'] = 'ico_pwf_pdf.png';
              data.data.fileList[i]['img_preview_file_name'] = 'preview_ft_pdf.png';
              data.data.fileList[i]['kind'] = 'PDF';

            } else {
              data.data.fileList[i]['img_ft_file_name'] = 'ico_ft_etc.png';
              data.data.fileList[i]['img_preview_file_name'] = 'preview_ft_etc.png';
              data.data.fileList[i]['kind'] = '기타';

            }
          } else if (data.data.fileList[i]['type'] == 'audio') {
            data.data.fileList[i]['img_ft_file_name'] = 'ico_pwf_music.png';
            data.data.fileList[i]['img_preview_file_name'] = 'preview_pwf_music.png';
            data.data.fileList[i]['kind'] = '음악';

          } else if (data.data.fileList[i]['type'] == 'video') {
            data.data.fileList[i]['img_ft_file_name'] = 'ico_pwf_video.png';
            data.data.fileList[i]['img_preview_file_name'] = 'preview_ft_video.png';
            data.data.fileList[i]['kind'] = '동영상';

          } else {
            data.data.fileList[i]['img_ft_file_name'] = 'ico_ft_etc.png';
            data.data.fileList[i]['img_preview_file_name'] = 'preview_ft_etc.png';
            data.data.fileList[i]['kind'] = '기타';
          }
        }
        state.files = state.files.concat(data.data.fileList)
      } else {
        state.files = data.data.fileList
      }
    },
    set_folder_path(state, data) {
      state.folder_path = data.data.folderPath
    },

    set_folder_id(state, data) {
      state.folder_id = data.data.folder_id
    },
    delelte_folder_path(state, id) {
      const findItem = state.folder_path.find(function (item) {
        return item.folderId === id
      });
      const idx = state.folder_path.indexOf(findItem);
      state.folder_path.splice(idx, 1);
    },
    set_storage_id(state, data) {
      state.storage_id = data.item
    },

    set_pagenation(state, data) {
      state.current_page = data.data.current_page;
      state.next_page = data.data.next_page;
      state.last_page = data.data.last_page;
      state.has_next = data.data.has_next;

    },
    reset_file(state) {
      state.files = []
    },
  },
  actions: {
    // 연결된 디바이스에 해당되는 폴더 및 파일 정보
    getFavoriteInfo: ({commit}, data) => {
      commit('reset_file');
      var qs = require('qs');
      axios.post('/favorite/favorite_data',
        qs.stringify({
          storage_id: data.item
        })
      ).then(result => {
        let data = result.data;
        commit('set_folders', data.data);
        commit('set_files', data.data);
        commit('set_folder_path', data.data);
        commit('set_folder_id', data.data)
      }).catch(error => {
        console.log(error)
      })
    },
    // 폴더 클릭시 하위 데이터 가져오기
    getFolderFile: ({commit}, data) => {
      commit('reset_file');
      var qs = require('qs');
      axios.post('/favorite/folder-file',
        qs.stringify({
          id: data.item,
          page: data.page
        })
      ).then(response => {
        commit('set_folders', response.data.data);
        commit('set_files', response.data.data);
        commit('set_folder_path', response.data.data);
        commit('set_folder_id', response.data.data)
      });
    },
    // 상위 클릭시 상위폴더 데이터 가져오기
    getParent: ({commit}, data) => {
      commit('reset_file');
      var qs = require('qs');
      axios.post('/favorite/parent',
        qs.stringify({
          id: data.parent_id
        })
      ).then(response => {
        commit('set_folders', response.data.data);
        commit('set_files', response.data.data);
        commit('set_folder_id', response.data.data)
      });
    },
  }
}

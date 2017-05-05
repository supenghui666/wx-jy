import * as types from './mutation-types/common';
/**
 * Created by yi on 2017-01-06.
 */
import axios from 'axios'

export default {
  [types.ACT_AXIOS_HTTP] ({ rootState }, {Vue, url, body = {}}) {
    return new Promise((resolve, reject) => {
      // 打开loading
      rootState.loadingShow = true;
      Vue.$ajax.post(url,body).then((res) => {
        if (res.status === 200) {
          // 关闭loading
          rootState.loadingShow = false;
          let data = res.data;
          if (data.status===rootState.ok) {
            resolve(data);
          }
        } else {
          alert('请求失败，服务器异常');
        }
      });
    });
  }
};
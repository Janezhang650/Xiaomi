import config from '../utils/config';

class DetailModel {
  getPhoneInfo (pid) {
    const url = `getDatas?swiper=false&phone=true&field=false`;

    return new Promise((resolve, reject) => {
      $.ajax({
        url: config.API.base_url + url,
        type: 'get',
        dataType: 'JSONP',
        jsonp: 'cb',
        success (data) {
          let dataObj = null;

          data.phone_data.filter(item => {
            if (item.id === pid) {
              dataObj = item;
            }
          });

          resolve(dataObj);
        }
      })
    })
  }
}

export { DetailModel }
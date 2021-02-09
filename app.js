const items = [
    {'Id':'1', 'Name':'tokyo'},
    {'Id':'2', 'Name':'chiba'},
    {'Id':'3', 'Name':'saitama'},
    {'Id':'4', 'Name':'kanagawa'},
    {'Id':'5', 'Name':'ibaragi'},
    {'Id':'6', 'Name':'gunma'},
    {'Id':'7', 'Name':'tochigi'}
  ];

  var app = new Vue ({
    el: '#app',
    data: {
      items: items,
      searchPrefecture: '', //入力された県名を格納
      searchRegion: '',
      prefs: '',
      // code: '',
      // name: '',
      city: null,
      temp: null,
      condition: {
        main: null
      }
    },
    beforeUpdate: function(){//mountedだとエラーになる（ライフサイクルについて）
      axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: { q: this.searchRegion, APPID: '0df130b4cca7062f4bd8ec6b62fcdcc2'}
      })
      .then(function(response){
        this.city = response.data.name
        this.temp = response.data.main.temp
        this.condition = response.data.weather[0]
      }.bind(this))
      .catch(function(error){
        console.log(error)
      })
    },
    mounted: function(){
      axios.get('https://opendata.resas-portal.go.jp/api/v1/prefectures',{
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "ZTeuqJL7rj5gSslTavfjvbmV83NSvTvFUjQsNdY8"
        }
      })
      // .then(function(response){
      //   this.code = response.data.result.prefCode
      //   this.name = response.data.result.prefName
      // })
      .then(response => this.prefs = response.data.result)
      .catch(function(error){
        console.log(error)
      })
    },
    filters: {
      roundUp(value){
        return Math.ceil(value)
      }
    },
    //検索機能
    computed: {
      eventedSearch: function(){
        let list = this.items.slice();

        if(this.searchPrefecture){
          list = list.filter(element => {
            return Object.keys(element).some(key => {
              if(key === 'Name'){
                return element[key].indexOf(this.searchPrefecture) > -1;
              }
            });
          });
        }
        return list;
      }
    },
  })
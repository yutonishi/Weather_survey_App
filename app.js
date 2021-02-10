// const items = [
//     {'Id':'1', 'Name':'tokyo'},
//     {'Id':'2', 'Name':'chiba'},
//     {'Id':'3', 'Name':'saitama'},
//   ];

const items = [
  {'Id':'1', 'Roman':'Tokyo', 'Name':'東京都'},
  {'Id':'2', 'Roman':'Chiba', 'Name':'千葉県'},
  {'Id':'3', 'Roman':'Kanagawa', 'Name':'神奈川県'},
  {'Id':'4', 'Roman':'Saitama', 'Name':'埼玉県'},
  {'Id':'5', 'Roman':'Ibaragi', 'Name':'茨城県'},
  {'Id':'6', 'Roman':'Gunma', 'Name':'郡馬県'},
  {'Id':'7', 'Roman':'Tochigi', 'Name':'栃木県'}
]

  var app = new Vue ({
    el: '#app',
    data: {
      items: items,
      nameJP: '',
      requestPref: '',
      city: null,
      temp: null,
      condition: {
        main: null
      }
    },
    methods: {
      cityName: function(cityName){
        this.nameJP = cityName;
        console.log(cityName)
      },
      pref: function(pref){
        this.requestPref = pref;
        console.log(pref)
        this.getData()
      },
      getData: function() {
        axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: { q: this.requestPref, APPID: '0df130b4cca7062f4bd8ec6b62fcdcc2'}
        })
        .then(function(response){
          this.city = response.data.name
          this.temp = response.data.main.temp
          this.condition = response.data.weather[0]
        }.bind(this))
        .catch(function(error){
          console.log(error)
        })  
      }
    },
    filters: {
      roundUp(value){
        return Math.ceil(value)
      }
    }
  })
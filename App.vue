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
      searchPrefecture: '' //入力された県名を格納
    },
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
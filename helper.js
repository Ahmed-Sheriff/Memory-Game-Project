function dd(object, string="my target", mode='l'){

    switch (mode) {
      case 'l':
          var out='';
          for (var i of object) {
            out+= i+ ":" + object[i] + "\n";
          }
          alert(string + ":" + out);
        break;
        case 'c':
            console.log(string);
            console.log(object);
          break;
    }
}

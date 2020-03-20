module.exports = function check(str, bracketsConfig) {
    let stack = [];
    
    let checkOpen = (bracket) => {
      for (let i = 0; i < bracketsConfig.length; i++) {
        let item = bracketsConfig[i];
        let bracketOpen = bracket == item[0];
        if (bracketOpen) {
          let isEqual = item[0] == item[1],
              isOpen = stack.findIndex(item => item == bracket) > -1;
          if (!isEqual || (isEqual && !isOpen)) {
            stack.push(bracket)
            return true;
          }
        }
      }
      return false;
    }
  
    let checkClose = (bracket) => {
      for (let i=0; i < bracketsConfig.length; i++) {
        let item = bracketsConfig[i]
        if (bracket == item[1]) {
          let lastOpen = stack.pop();
          if (lastOpen !== item[0]) {
            return false;
          } 
        }
      }
      return true;
    }
  
    for (let i=0; i < str.length; i++) {
      let bracket = str[i];
      if (!checkOpen(bracket)) {
        if (!checkClose(bracket)) {
          return false;
        }
      }
    }

    if (stack.length > 0) {
      return false;
    }
    return true;
  }
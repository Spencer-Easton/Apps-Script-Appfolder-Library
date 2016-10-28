function isFunction_(functionToCheck) {
 var getType = {};
 return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/*********************************************
*
*
* 
* get size of string in bytes
*********************************************/
function byteCount_(s) {
    return encodeURI(s).split(/%..|./).length - 1;
}

/*********************************************
*
*
* 
* 
*********************************************/
 function isString_(o) {
        return (Object.prototype.toString.call(o) === '[object String]');
    }

/*********************************************
*
*
* 
* 
*********************************************/
function isObject_(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };
  
 function hasOptions(obj){   
   return obj !== undefined && obj.constructor === Object && Object.keys(obj).length !== 0
 }

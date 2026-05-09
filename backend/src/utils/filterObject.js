const filterObject = function(obj,...allowedFields){
    const filteredObject = {}; // make a new object
    // and get all keys from the object
    // iterate through the keys and only return those that are allowed so that no unnecessary fileds are added 
    Object.keys(obj).forEach(function(key){
        if(allowedFields.includes(key)){
            filteredObject[key] = obj[key];
        }
    })
    return filteredObject;
}
module.exports = filterObject;
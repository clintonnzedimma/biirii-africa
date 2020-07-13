//Product list functions for biirii  

function addToCart (subId, pId) {
    Cart.add(subId, pId, 1, "XS");
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}   

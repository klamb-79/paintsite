if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartButtons = document.getElementsByClassName('btn-danger')
    

    for (var i = 0; i < removeCartButtons.length; i++) {
        var removebt = removeCartButtons[i]
        removebt.addEventListener('click', removecartitems)
    };
    var quantityinputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityinputs.length; i++) {
        var quaninput = quantityinputs[i]
        quaninput.addEventListener('change', quanchange)
    }
    var AddToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < AddToCartButtons.length; i++) {
        var atcb = AddToCartButtons[i]
        atcb.addEventListener('click', addToCart)
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchase)
    document.getElementsByClassName('clickinfo')[0].addEventListener('click', whatsapp)
    // document.getElementsByClassName('btn-purchase')[0].addEventListener('click', whatsapp)

}

function whatsapp(){
    var cartitems = document.getElementsByClassName('cart-items')[0] 
    var title2 = []
    var price = []
    var price1 = cartitems.getElementsByClassName('price')
    var span = cartitems.getElementsByClassName('title')
    // console.log(span)
    for (var i = 0; i < price1.length; i++){
        var iprice = price1[i].innerText
        price.push(iprice)
    }
    for (var i = 0; i < span.length; i++){
        var titles = span[i].innerText
        title2.push(titles)
        
        
    }
    var a, b, c = title2
    console.log(a)
    console.log('order details\n' + title2)
    console.log('price \n' + price)
    // var title = span.getElementsByClassName('title').innerText
    
   
    
    
}

function purchase() {
    
    var cartitems = document.getElementsByClassName('cart-items')[0]
    var totalcost = document.getElementsByClassName('cart-total-price')[0].innerText
    while (cartitems.hasChildNodes()) {
        var list = []
        var items = cartitems.getElementsByClassName('cart-item-title')
        var itemsPrice = cartitems.getElementsByClassName('price')
        var title = cartitems.getElementsByClassName('title')[0].innerText
        var price = cartitems.getElementsByClassName('price')[0].innerText
        list.push(title)
        console.log(title)

        
        cartitems.removeChild(cartitems.firstChild)
    }
    console.log(list)
    updateCartTotal()
}

function removecartitems(event) {
    var Clicked = event.target
    Clicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quanchange(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()


}
function addToCart(event) {
    var button = event.target
    var shopitem = button.parentElement.parentElement
    var title = shopitem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopitem.getElementsByClassName('shop-item-price')[0].innerText
    var image = shopitem.getElementsByClassName('shop-item-image')[0].src
    addItemtoCart(title, price, image)
    updateCartTotal()
}

function addItemtoCart(title, price, image) {
    var cartrow = document.createElement('div')
    cartrow.classList.add('cart-row')
    var cartitems = document.getElementsByClassName('cart-items')[0]
    var cartitemsname = cartitems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartitemsname.length; i++) {
        if (cartitemsname[i].innerText == title) {
            alert('Item already exist in your Cart')
            return
        }
    }
    var cartrowcontents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${image}" width="100" height="100">
        <span class="cart-item-title title">${title}</span>
    </div>
        <span class="cart-price cart-column price">${price}</span>
        <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`
    cartrow.innerHTML = cartrowcontents

    cartitems.append(cartrow)
    cartrow.getElementsByClassName('btn-danger')[0].addEventListener('click', removecartitems)
    cartrow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quanchange)
}


function updateCartTotal() {
    var cartItemsC = document.getElementsByClassName('cart-items')[0]

    var cartRows = cartItemsC.getElementsByClassName('cart-row')
    total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartrow = cartRows[i]
        var priceElement = cartrow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartrow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerHTML.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)

    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}


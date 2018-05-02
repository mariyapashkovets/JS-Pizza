/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок

    var beFirstTemplate=true;
    Cart.forEach(function(item){
        if(item.pizza.id===pizza.id && item.size===size){
            item.quantity++;
            beFirstTemplate=false;
        }
    });

    if (beFirstTemplate){
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1
        });
    }

    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    var cart2 =[];
    Cart.forEach(function(item){
        if(item.pizza.id !== cart_item.id && item.size !== cart_item.size){
            cart2.push(item);
        }
    });
    Cart=cart2;
    //Після видалення оновити відображення
    updateCart();
}
function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    Cart = JSON.parse(localStorage.getItem("cart"));
    if (Cart === null){
        Cart = [];
    }
    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");
    var quantity=0;
    var suma=0;
    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);
        quantity +=1;
        var $node = $(html_code);

        $node.find(".btn-success").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;

            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".btn-danger").click(function(){
            //Збільшуємо кількість замовлених піц
            if(cart_item.quantity===1){
                removeFromCart(cart_item);
                quantity-=1;
            }
            else {
                cart_item.quantity -= 1;
                //Оновлюємо відображення
                updateCart();
            }
            //Оновлюємо відображення
        });

        $node.find(".btn-default").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity = 0;
            removeFromCart(cart_item);
            quantity-=1;
            //Оновлюємо відображення
            updateCart();
        });

        $cart.append($node);


    }
    Cart.forEach(showOnePizzaInCart);

}
exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;
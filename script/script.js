const quantityButton = $(".item-quantity button");

let shipping = 19;
let total = 0;

//Add event to all buttons and change quantity in page
quantityButton.on("click", function() {
    let htmlSibling = "";
    let quantity = 0;

    if($(this).hasClass("minus")) {
        htmlSibling = $(this).next();
        quantity = parseInt(htmlSibling.html()) - 1
        htmlSibling.html(quantity.toString());
    } else {
        htmlSibling = $(this).prev();
        quantity = parseInt(htmlSibling.html()) + 1
        htmlSibling.html(quantity.toString());
    }

    getTotalAmount();
});

//GetTotalAmount
getTotalAmount();


function getTotalAmount() {
    let totalItemsAmount = 0;
    let items = 0;
    let itemPrice = 0;
    let itemPriceString = "";

    total = 0;

    $(".checkout-item").each(function() {
        items = parseInt($(this).find(".item-quantity p").html());
        itemPriceString = $(this).find(".discount-price").html().replace("$", "");
        itemPrice = parseFloat(itemPriceString);

        totalItemsAmount = items*itemPrice;
        total += totalItemsAmount;
    });

    total += shipping;

    setTotalText();
}

function setTotalText() {
    let totalAmountString =  "$" + (total).toString();
    $("#final-amount").html(totalAmountString);
}
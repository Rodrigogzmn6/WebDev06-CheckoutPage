const quantityButton = $(".item-quantity button");
const submmitButton = $("#contact-address button");

let shipping = 19;
let total = 0;
let alertMessage = "Thank you for buying :)";

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

submmitButton.on('click', function(){
    validateForm();
});

function validateForm() {
    let formFields = [];
    let isFormValid = true;

    //Get all the form fields
    $.each($("#contact-address form input"), (i, formField) => {
        if(formField.type !== "checkbox") {
            formFields.push(formField);
        }
    });
    formFields.push($("#contact-address form select")[0]);

    //Check fields validation
    $.each(formFields, (i, formField) => {
        if(formField.type === "email") {
            if(!checkEmail(formField)) {
                isFormValid = checkEmail(formField);
                return;
            }
        } else if(formField.type === "tel") {
            if(!checkTel(formField)) {
                isFormValid = checkTel(formField);
                return;
            }
        } else {
            if(!checkText(formField)) {
                isFormValid = checkText(formField);
                return;
            }
        }
    });

    alert(alertMessage);
}

function checkEmail(formField) {
    let atPos = formField.value.indexOf("@");
    let dotPos = formField.value.lastIndexOf(".");
    let valid = 
        atPos > -1 &&
        dotPos > atPos &&
        formField.value !== "";

    if (!valid) {
        alertMessage = "Please check your email address";
    } 

    return valid;
}

function checkTel(formField) {
    let valid = /^[0-9]+$/.test(formField.value) && formField.value !== "";

    if (!valid) {
        alertMessage = "Please check your phone number";
    } 
    
    return valid;
}

function checkText(formField) {
    let valid = formField.value !== "";

    if (!valid) {
        alertMessage = "Please fill all the form fields to continue";
    } 
    
    return (valid);
}
// Add SDK credentials
// REPLACE WITH YOUR PUBLIC KEY AVAILABLE IN: https://developers.mercadopago.com/panel
const mercadopago = new MercadoPago('TEST-95523676-54a7-40ec-a0dc-bc8490469f9b', {
  locale: "es-AR" // The most common are: 'pt-BR', 'es-AR' and 'en-US'
});

// Handle call to backend and generate preference.
document.getElementById("checkout-btn").addEventListener("click", function () {

  $('#checkout-btn').attr("disabled", true);

  const quantity = parseInt(document.getElementById("quantity").textContent);
  console.log(quantity);


  const orderData = {
    // quantity: document.getElementById("quantity").value,
    quantity: quantity,
    
    
    description: document.getElementById("product-description").innerHTML,

    price: document.getElementById("unit-price").innerHTML
  };

  console.log(orderData);

















  fetch("http://localhost:8080/create_preference", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (preference) {
      createCheckoutButton(preference.id);

      $(".shopping-cart").fadeOut(500);
      setTimeout(() => {
        $(".container_payment").show(500).fadeIn();
      }, 500);
    })
    .catch(function () {
      alert("Unexpected error");
      $('#checkout-btn').attr("disabled", false);
    });
});





document.getElementById("checkout-btn2").addEventListener("click", function () {

  $('#checkout-btn2').attr("disabled", true);

  const quantity = parseInt(document.getElementById("quantity2").textContent);
  console.log(quantity);


  const orderData2 = {
    quantity: quantity,
    
    
    description: document.getElementById("product-description2").innerHTML,

    price: document.getElementById("unit-price2").innerHTML
  };

  console.log(orderData2);

















  fetch("http://localhost:8080/create_preference2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData2),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (preference) {
      createCheckoutButton2(preference.id);

      $(".shopping-cart").fadeOut(500);
      setTimeout(() => {
        $(".container_payment").show(500).fadeIn();
      }, 500);
    })
    .catch(function () {
      alert("Unexpected error");
      $('#checkout-btn2').attr("disabled", false);
    });
});





document.getElementById("checkout-btn3").addEventListener("click", function () {

  $('#checkout-btn3').attr("disabled", true);

  const quantity = parseInt(document.getElementById("quantity3").textContent);
  console.log(quantity);


  const orderData3 = {
    quantity: quantity,
    
    
    description: document.getElementById("product-description3").innerHTML,

    price: document.getElementById("unit-price3").innerHTML
  };

  console.log(orderData3);

















  fetch("http://localhost:8080/create_preference3", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData3),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (preference) {
      createCheckoutButton3(preference.id);

      $(".shopping-cart").fadeOut(500);
      setTimeout(() => {
        $(".container_payment").show(500).fadeIn();
      }, 500);
    })
    .catch(function () {
      alert("Unexpected error");
      $('#checkout-btn2').attr("disabled", false);
    });
});























function createCheckoutButton(preferenceId) {
  // Initialize the checkout
  const bricksBuilder = mercadopago.bricks();

  const renderComponent = async (bricksBuilder) => {
    if (window.checkoutButton) window.checkoutButton.unmount();
    await bricksBuilder.create(
      'wallet',
      'button-checkout', // class/id where the payment button will be displayed
      {
        initialization: {
          preferenceId: preferenceId
        },
        callbacks: {
          onError: (error) => console.error(error),
          onReady: () => {}
        }
      }
    );
  };
  window.checkoutButton =  renderComponent(bricksBuilder);
}


function createCheckoutButton2(preferenceId) {
  // Initialize the checkout
  const bricksBuilder = mercadopago.bricks();

  const renderComponent = async (bricksBuilder) => {
    if (window.checkoutButton) window.checkoutButton.unmount();
    await bricksBuilder.create(
      'wallet',
      'button-checkout2', // class/id where the payment button will be displayed
      {
        initialization: {
          preferenceId: preferenceId
        },
        callbacks: {
          onError: (error) => console.error(error),
          onReady: () => {}
        }
      }
    );
  };
  window.checkoutButton =  renderComponent(bricksBuilder);
}

function createCheckoutButton3(preferenceId) {
  // Initialize the checkout
  const bricksBuilder = mercadopago.bricks();

  const renderComponent = async (bricksBuilder) => {
    if (window.checkoutButton) window.checkoutButton.unmount();
    await bricksBuilder.create(
      'wallet',
      'button-checkout3', // class/id where the payment button will be displayed
      {
        initialization: {
          preferenceId: preferenceId
        },
        callbacks: {
          onError: (error) => console.error(error),
          onReady: () => {}
        }
      }
    );
  };
  window.checkoutButton =  renderComponent(bricksBuilder);
}








// Handle price update
function updatePrice() {
  let quantity = document.getElementById("quantity").value;
  let unitPrice = document.getElementById("unit-price").innerHTML;
  let amount = parseInt(unitPrice) * parseInt(quantity);

  document.getElementById("cart-total").innerHTML = "$ " + amount;
  document.getElementById("summary-price").innerHTML = "$ " + unitPrice;
  document.getElementById("summary-quantity").innerHTML = quantity;
  document.getElementById("summary-total").innerHTML = "$ " + amount;
}

document.getElementById("quantity").addEventListener("change", updatePrice);
updatePrice();

// Go back
document.getElementById("go-back").addEventListener("click", function () {
  $(".container_payment").fadeOut(500);
  setTimeout(() => {
    $(".shopping-cart").show(500).fadeIn();
  }, 500);
  $('#checkout-btn').attr("disabled", false);
});
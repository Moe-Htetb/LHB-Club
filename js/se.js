const images = [
  {
    id: "img1",
    hoverSrc: "./SEimage/WAFFLE STRIPED T-SHIRT2.jpeg",
    outSrc: "./SEimage/WAFFLE STRIPED T-SHIRT1.jpeg",
  },
  {
    id: "img2",
    hoverSrc: "./SEimage/MASSACRE T-SHIRT2.jpeg",
    outSrc: "./SEimage/MASSACRE T-SHIRT1.jpeg",
  },
  {
    id: "img3",
    hoverSrc: "./SEimage/Hard Time T-shirt3.jpeg",
    outSrc: "./SEimage/Hard Times T-shirt1.jpeg",
  },
  {
    id: "img4",
    hoverSrc: "./SEimage/DEAL OF THE DAY T-SHIRT1.jpeg",
    outSrc: "./SEimage/DEAL OF THE DAY T-SHIRT2.jpeg",
  },
  {
    id: "img5",
    hoverSrc: "./SEimage/crewneck2.jpeg",
    outSrc: "./SEimage/crewneck1.jpeg",
  },
  {
    id: "img6",
    hoverSrc: "./SEimage/Crewneck4.jpeg",
    outSrc: "./SEimage/Crewneck3.jpeg",
  },
  {
    id: "img7",
    hoverSrc: "./SEimage/CLASSIC LOGO CREWNECK2.jpeg",
    outSrc: "./SEimage/CLASSIC LOGO CREWNECK1.jpeg",
  },
  {
    id: "img8",
    hoverSrc: "./SEimage/LOGO PIGMENT DYED CREWNECK2.jpeg",
    outSrc: "./SEimage/LOGO PIGMENT DYED CREWNECK1.jpeg",
  },
  {
    id: "img9",
    hoverSrc: "./SEimage/Logo Tote Bag2.jpg",
    outSrc: "./SEimage/Logo Tote Bag1.jpg",
  },
  {
    id: "img10",
    hoverSrc: "./SEimage/STABLE EDGE BACKPACK2.jpeg",
    outSrc: "./SEimage/STABLE EDGE BACKPACK1.jpeg",
  },
  {
    id: "img11",
    hoverSrc: "./SEimage/Stable Edge Logo Hat2.jpeg",
    outSrc: "./SEimage/Stable Edge Logo Hat1.jpeg",
  },
  {
    id: "img12",
    hoverSrc: "./SEimage/VARSITY FONT DAD HAT2.jpeg",
    outSrc: "./SEimage/VARSITY FONT DAD HAT1SEimage/.jpeg",
  },
];

images.forEach(({ id, hoverSrc, outSrc }) => {
  const imgElement = document.getElementById(id);

  imgElement.addEventListener("mouseover", () => {
    imgElement.src = hoverSrc;
  });

  imgElement.addEventListener("mouseout", () => {
    imgElement.src = outSrc;
  });
});
// Select elements from the DOM
const cartIcon = document.querySelector(".cart i");
const cartBadge = document.querySelector(".cart-badge");
const body = document.querySelector("body");
const closeCart = document.querySelector(".cartTab .close");
const overlay = document.getElementById("overlay");
const cartTabContentContainer = document.querySelector(
  ".cartTabContentContainer"
);

// Initialize cart from localStorage
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Function to update the cart badge (item count)
const updateCartBadge = () => {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  if (totalItems > 0) {
    cartBadge.textContent = totalItems;
    cartBadge.style.display = "block";
  } else {
    cartBadge.style.display = "none";
  }
};

document
  .getElementById("checkout-button")
  .addEventListener("click", function () {
    // Assuming cartItems are stored in localStorage
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Check if cart has items before proceeding to checkout
    if (cartItems.length > 0) {
      // Optionally: Store any necessary data in sessionStorage (or URL parameters)
      sessionStorage.setItem("cartCheckoutData", JSON.stringify(cartItems));

      // Navigate to the checkout page without a reload
      window.location.href = "checkout.html"; // Change this to your actual checkout page
    } else {
      alert(
        "Your cart is empty. Please add items to the cart before proceeding."
      );
    }
  });

// Function to render cart items in the cart tab
const renderCartItems = () => {
  cartTabContentContainer.innerHTML = ""; // Clear existing items

  cartItems.forEach((item, index) => {
    const itemHTML = `
     <div class="cartTabContent" style="width:400px;">
          <div class="cartTabImage"><img src="
          ${item.image}" alt="" style="width: 70px" /></div>
       
            <div style="max-width:200px; display:flex; flex-direction:column; align-items:start">

           <div class="width:200px">
             ${item.name}
             </div>
            
          
            <div style="margin-top:7px;">
              Size: <span class="cartTabSize" style="color:black;">${
                item.size
              }</span> <br> 
            </div>
            <div class="qty" style="margin-left:-14px;">
              <i class="fa-solid fa-minus" data-index="${index}"></i>
              <span id="sp" style="color:black;">${item.quantity}</span>
              <i class="fa-solid fa-plus" data-index="${index}"></i>
            </div>
          </div >
          <div style="display:flex; flex-direction:column; margin-bottom:24px;">
            <i class="fa-solid fa-xmark close" style="font-size: 20px; color: black; padding: 15px;" data-index="${index}"></i><br />
            <span class="cartTabPrice" style="color:black;">${
              item.price * item.quantity
            }$</span>
          </div>
        </div>
        <hr />
    `;
    cartTabContentContainer.insertAdjacentHTML("beforeend", itemHTML);
  });

  // Event listeners for removing, increasing, and decreasing items in the cart
  document.querySelectorAll(".fa-minus").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
        saveCartItems();
        renderCartItems();
        updateCartBadge();
        updateTotalPrice();
      }
    });
  });

  document.querySelectorAll(".fa-plus").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      cartItems[index].quantity++;
      saveCartItems();
      renderCartItems();
      updateCartBadge();
      updateTotalPrice();
    });
  });

  document.querySelectorAll(".cartTabContent .close").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      cartItems.splice(index, 1);
      saveCartItems();
      renderCartItems();
      updateCartBadge();
      updateTotalPrice();
    });
  });

  updateTotalPrice(); // Update total price after rendering
};

// Function to calculate and update the subtotal price in the cart tab
const updateTotalPrice = () => {
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  document.querySelector(
    ".CartTabSubTotalPrice"
  ).textContent = `${totalPrice}$`;
};

// Function to save cart items to localStorage
const saveCartItems = () => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

// Event listener for opening the cart tab
cartIcon.addEventListener("click", () => {
  body.classList.toggle("showCart");
  body.style.overflow = "hidden";
  overlay.style.display = "block";
  renderCartItems(); // Render the cart items when the cart tab is opened
});

// Event listener for closing the cart tab
closeCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
  body.style.overflow = "scroll";
  overlay.style.display = "none";
});

overlay.addEventListener("click", () => {
  body.classList.toggle("showCart");
  overlay.style.display = "none";
  body.style.overflow = "scroll";
});

// Load cart items and update the cart badge when the page loads
window.addEventListener("load", () => {
  updateCartBadge();
  renderCartItems(); // Ensure the cart content is also rendered on page load
});
// Listen for cart updates from the shopping page
window.addEventListener("cartUpdated", () => {
  cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  updateCartBadge();
  renderCartItems();
});

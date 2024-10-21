// Select elements from the DOM
const sizeButtons = document.querySelectorAll(".Size");
const productImage = document.querySelector("aside img");
const addToCartButton = document.querySelector(".add-to-cart");
const cartIcon = document.querySelector(".cart i");
const body = document.querySelector("body");
const closeCart = document.querySelector(".close");
const cartBadge = document.querySelector(".cart-badge");
const overlay = document.getElementById("overlay");

// Variables to store selected details
let selectedSize = "";
let quantity = 1;
const pricePerItem = 120; // Price of the product
const productName = document.getElementById("product-name").textContent;
const productImageSrc = productImage.src;

// Initialize cart from local storage
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Variables for the section page
const sectionQuantityElement = document.getElementById("sectionQuantity");
const sectionMinusButton = document.querySelector(".section-page .fa-minus");
const sectionPlusButton = document.querySelector(".section-page .fa-plus");

// Initialize quantity for section page
let sectionQuantity = parseInt(sectionQuantityElement.textContent, 10);

// Update quantity on the section page when minus button is clicked
sectionMinusButton.addEventListener("click", () => {
  if (sectionQuantity > 1) {
    sectionQuantity--; // Decrement quantity
    sectionQuantityElement.textContent = sectionQuantity; // Update section span
  }
});

// Update quantity on the section page when plus button is clicked
sectionPlusButton.addEventListener("click", () => {
  sectionQuantity++; // Increment quantity
  sectionQuantityElement.textContent = sectionQuantity; // Update section span
});

// Function to calculate and update the subtotal price
const updateTotalPrice = () => {
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  document.querySelector(
    ".CartTabSubTotalPrice"
  ).textContent = `${totalPrice}ks`;
};

// Function to update the cart badge
const updateCartBadge = () => {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  if (totalItems > 0) {
    cartBadge.textContent = totalItems;
    cartBadge.style.display = "block";
  } else {
    cartBadge.style.display = "none";
  }
};

// Function to render cart items
const renderCartItems = () => {
  const cartTabContentContainer = document.querySelector(
    ".cartTabContentContainer"
  );
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
              Size: <span class="cartTabSize">${item.size}</span> <br> 
            </div>
            <div class="qty" style="margin-left:-13px;">
              <i class="fa-solid fa-minus" data-index="${index}"></i>
              <span id="sp">${item.quantity}</span>
              <i class="fa-solid fa-plus" data-index="${index}"></i>
            </div>
          </div >
          <div style="display:flex; flex-direction:column; margin-bottom:24px;">
            <i class="fa-solid fa-xmark close" style="font-size: 20px; color: black; padding: 15px;" data-index="${index}"></i><br />
            <span class="cartTabPrice">${item.price * item.quantity}ks</span>
          </div>
        </div>
        <hr />
      `;
    cartTabContentContainer.insertAdjacentHTML("beforeend", itemHTML);
  });

  // Add event listeners for remove buttons
  document.querySelectorAll(".cartTabContent .close").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      cartItems.splice(index, 1);
      saveCartItems();
      renderCartItems();
      updateCartBadge();
      updateTotalPrice(); // Update total price when item is removed
    });
  });

  // Add event listeners for plus and minus buttons
  document.querySelectorAll(".fa-minus").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      if (cartItems[index].quantity > 1) {
        cartItems[index].quantity -= 1;
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
      cartItems[index].quantity += 1;
      saveCartItems();
      renderCartItems();
      updateCartBadge();
      updateTotalPrice();
    });
  });

  updateTotalPrice(); // Update total price when cart is rendered
};

// Function to load cart items from local storage
const loadCartItems = () => {
  const savedCartItems = localStorage.getItem("cartItems");
  if (savedCartItems) {
    cartItems = JSON.parse(savedCartItems);
  } else {
    cartItems = [];
  }
};

// Function to save cart items to local storage
const saveCartItems = () => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

// Load cart items and update badge when the page loads
window.addEventListener("load", () => {
  loadCartItems();
  updateCartBadge();
  renderCartItems(); // Ensure the cart content is also rendered on page load
});

// Add to cart button functionality
addToCartButton.addEventListener("click", () => {
  if (!selectedSize) {
    alert("Please select a size.");
    return;
  }

  // Check if item with the same name and size already exists in the cart
  const existingItemIndex = cartItems.findIndex(
    (item) => item.name === productName && item.size === selectedSize
  );

  if (existingItemIndex !== -1) {
    // Item exists in cart with the same size, so update quantity
    cartItems[existingItemIndex].quantity += sectionQuantity;
  } else {
    // Item does not exist, add new item
    const newItem = {
      name: productName,
      size: selectedSize,
      quantity: sectionQuantity,
      price: pricePerItem,
      image: productImageSrc,
    };
    cartItems.push(newItem);
  }

  // Save updated cart to localStorage
  saveCartItems();
  renderCartItems();
  updateCartBadge();
});

// Add event listeners for size selection
sizeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    sizeButtons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
    selectedSize = this.textContent;
  });
});

// Show and hide cart functionality
cartIcon.addEventListener("click", () => {
  body.classList.toggle("showCart");
  body.style.overflow = "hidden";
  overlay.style.display = "block";
});

closeCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
  body.style.overflow = "auto";
  overlay.style.display = "none";
});

overlay.addEventListener("click", () => {
  overlay.style.display = "none";
  body.style.overflow = "auto";

  body.classList.toggle("showCart");
});

// Background image change on hover
productImage.addEventListener("mouseover", () => {
  productImage.src = "./nrf-image/nrfxbanx2.jpg";
});

productImage.addEventListener("mouseout", () => {
  productImage.src = "./nrf-image/nrfxbanx1.jpg";
});

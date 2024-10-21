const images = [
  {
    id: "img1",
    hoverSrc: "./nrf-image/nrf-home-cart-2.jpeg",
    outSrc: "./nrf-image/nrf-home-cart-1.jpeg",
  },
  {
    id: "img2",
    hoverSrc: "./sisimage/The Sisburma Styling Bag.jpeg",
    outSrc: "./sisimage/The Sisburma Styling bag .jpeg",
  },
  {
    id: "img3",
    hoverSrc: "./sisimage/Sisburma Water-proof Nylon Parachute Pant cream.jpeg",
    outSrc: "./sisimage/Sisburma Water-proof Nylon Parachute Pant black.jpeg",
  },
  {
    id: "img4",
    hoverSrc: "../SEimage/NO STABLE EDGE, NO CRY T-SHIRT1.jpeg",
    outSrc: "../SEimage/NO STABLE EDGE, NO CRY T-SHIRT2.jpeg",
  },
  {
    id: "img5",
    hoverSrc: "./SEimage/Coach2.jpeg ",
    outSrc: "./SEimage/Coach1.jpeg",
  },
  {
    id: "img6",
    hoverSrc: "./nrf-image/nrf-home-cart-5.jpeg",
    outSrc: "./nrf-image/nrf-home-cart-6.jpeg",
  },
  {
    id: "img7",
    hoverSrc: "./SEimage/Logo Tote Bag2.jpg",
    outSrc: "./SEimage/Logo Tote Bag1.jpg",
  },
  {
    id: "img8",
    hoverSrc: "./SEimage/Stable Edge Logo Hat2.jpeg",
    outSrc: "./SEimage/Stable Edge Logo Hat1.jpeg",
  },
  {
    id: "img9",
    hoverSrc: "./sisimage/Cargo Shorts black.jpeg",
    outSrc: "./sisimage/Cargo Shorts white.jpeg",
  },
  {
    id: "img10",
    hoverSrc: "./sisimage/Sisburma Airlayer Topstitch white.jpeg",
    outSrc: "./sisimage/Sisburma Airlayer Topstitch black.jpeg",
  },
  {
    id: "img11",
    hoverSrc: "./nrf-image/nrfxbanx2.jpg",
    outSrc: "./nrf-image/nrfxbanx1.jpg",
  },
  {
    id: "img12",
    hoverSrc: "./nrf-image/Biashoodie2.jpg",
    outSrc: "./nrf-image/Biashoodie1.jpg",
  },
  {
    id: "img13",
    hoverSrc: "./nrf-image/cargoshortpant1.jpg",
    outSrc: "./nrf-image/cargoshortpant.jpg",
  },
  {
    id: "img14",
    hoverSrc: "./nrf-image/nrfxbanx6.jpg",
    outSrc: "./nrf-image/nrfxbanx5.jpg",
  },
  {
    id: "img15",
    hoverSrc: "./SEimage/LOGO PIGMENT DYED CREWNECK2.jpeg",
    outSrc: "./SEimage/LOGO PIGMENT DYED CREWNECK1.jpeg",
  },
  {
    id: "img16",
    hoverSrc: "./SEimage/MASSACRE T-SHIRT2.jpeg",
    outSrc: "./SEimage/MASSACRE T-SHIRT1.jpeg",
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

//  img change end

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

function userScroll() {
  const toTopBtn = document.querySelector("#to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      toTopBtn.classList.add("show");
    } else {
      toTopBtn.classList.remove("show");
    }
  });
}

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Event Listeners
document.addEventListener("DOMContentLoaded", userScroll);
document.querySelector("#to-top").addEventListener("click", scrollToTop);

// Select elements from the DOM
const cartIcon = document.querySelector(".cart i");
const cartBadge = document.querySelector(".cart-badge");
const body = document.querySelector("body");
const closeCart = document.querySelector(".cartTab .close");
const overlay = document.getElementById("overlay");
const cartTabContentContainer = document.querySelector(
  ".cartTabContentContainer"
);
const searchBar = document.getElementById("searchBar");
const searchResultsContainer = document.querySelector(".productContainer");
const searchIcon = document.getElementById("searchIcon");
const closeSearch = document.getElementById("closeSearch");
const searchContainer = document.querySelector(".searchContainer");
const searchContent = document.querySelector(".searchContent");
const toTopBtn = document.querySelector("#to-top");

// Initialize cart from localStorage
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Function to update the cart badge (item count)
const updateCartBadge = () => {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  cartBadge.textContent = totalItems;
  cartBadge.style.display = totalItems > 0 ? "block" : "none";
};

// Function to render cart items in the cart tab
const renderCartItems = () => {
  cartTabContentContainer.innerHTML = "";
  cartItems.forEach((item, index) => {
    const itemHTML = `
      <div class="cartTabContent" style="width:400px;">
        <div class="cartTabImage"><img src="${
          item.image
        }" alt="" style="width: 70px" /></div>
        <div style="max-width:200px; display:flex; flex-direction:column; align-items:start">
          <div class="width:200px">${item.name}</div>
          <div style="margin-top:7px;">Size: <span class="cartTabSize" style="color:black;">${
            item.size
          }</span></div>
          <div class="qty" style="margin-left:-14px;">
            <i class="fa-solid fa-minus" data-index="${index}"></i>
            <span id="sp" style="color:black;">${item.quantity}</span>
            <i class="fa-solid fa-plus" data-index="${index}"></i>
          </div>
        </div>
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

  // Event delegation for cart item actions
  cartTabContentContainer.addEventListener("click", (event) => {
    const index = event.target.getAttribute("data-index");
    if (
      event.target.classList.contains("fa-minus") &&
      cartItems[index].quantity > 1
    ) {
      cartItems[index].quantity--;
    } else if (event.target.classList.contains("fa-plus")) {
      cartItems[index].quantity++;
    } else if (event.target.classList.contains("close")) {
      cartItems.splice(index, 1);
    }
    saveCartItems();
    renderCartItems();
    updateCartBadge();
    updateTotalPrice();
  });

  updateTotalPrice();
};

// checkout
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
  renderCartItems();
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
  renderCartItems();
});

// Listen for cart updates from the shopping page
window.addEventListener("cartUpdated", () => {
  cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  updateCartBadge();
  renderCartItems();
});

// Image hover effect
const images = [
  {
    id: "img1",
    hoverSrc: "nrf-image/nrf-home-cart-2.jpeg",
    outSrc: "nrf-image/nrf-home-cart-1.jpeg",
  },
  {
    id: "img2",
    hoverSrc: "nrf-image/nrf-home-cart-4.jpeg",
    outSrc: "nrf-image/nrf-home-cart-3.jpeg",
  },

  {
    id: "img3",
    hoverSrc: "nrf-image/nrf-home-cart-6.jpeg",
    outSrc: "nrf-image/nrf-home-cart-5.jpeg",
  },
  {
    id: "img4",
    hoverSrc: "nrf-image/nrf-home-cart-8.jpeg",
    outSrc: "nrf-image/nrf-home-cart-7.jpeg",
  },
  {
    id: "img5",
    hoverSrc: "sisimage/SISBURMA AUBURNSTOMP.jpeg ",
    outSrc: "sisimage/SISBURMA AUBURNSTOMP...jpeg",
  },
  {
    id: "img6",
    hoverSrc: "sisimage/The Sisburma Styling Bag.jpeg",
    outSrc: "sisimage/The Sisburma Styling bag .jpeg",
  },
  {
    id: "img7",
    hoverSrc: "sisimage/Sisburma Giraffe Jacket 2colors side.jpeg",
    outSrc: "sisimage/Sisburma Giraffe Jacket 2colors.jpeg",
  },
  {
    id: "img8",
    hoverSrc: "sisimage/Sisburma Water-proof Nylon Parachute Pant Cream.jpeg",
    outSrc: "sisimage/Sisburma Water-proof Nylon Parachute Pant black.jpeg",
  },
  {
    id: "img9",
    hoverSrc: "SEimage/NO STABLE EDGE, NO CRY T-SHIRT2.jpeg",
    outSrc: "SEimage/NO STABLE EDGE, NO CRY T-SHIRT1.jpeg",
  },
  {
    id: "img10",
    hoverSrc: "SEimage/STABLE EDGE BACKPACK2.jpeg",
    outSrc: "SEimage/STABLE EDGE BACKPACK1.jpeg",
  },
  {
    id: "img11",
    hoverSrc: "SEimage/Coach2.jpeg",
    outSrc: "SEimage/Coach1.jpeg",
  },
  {
    id: "img12",
    hoverSrc: "SEimage/Contrast stitch hoodie2.jpg",
    outSrc: "SEimage/Contrast stitch hoodie1.jpg",
  },
  // ... other images ...
];

images.forEach(({ id, hoverSrc, outSrc }) => {
  const imgElement = document.getElementById(id);
  imgElement.addEventListener("mouseover", () => (imgElement.src = hoverSrc));
  imgElement.addEventListener("mouseout", () => (imgElement.src = outSrc));
});

// Scroll to top functionality
const userScroll = () => {
  window.addEventListener("scroll", () => {
    toTopBtn.classList.toggle("show", window.scrollY > 50);
  });
};

const scrollToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

// Event Listeners
document.addEventListener("DOMContentLoaded", userScroll);
toTopBtn.addEventListener("click", scrollToTop);

// Fetch product data from the JSON file
let productsData = [];
fetch("products.json")
  .then((response) => response.json())
  .then((data) => (productsData = data))
  .catch((error) => console.log("Error fetching product data:", error));

// Add event listener for search input
searchBar.addEventListener("keyup", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  searchResultsContainer.innerHTML = ""; // Clear previous results

  if (searchTerm === "") return;

  const filteredProducts = productsData.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
  );

  const limitedProducts = filteredProducts.slice(0, 5);
  limitedProducts.forEach((product) => {
    const productHTML = `
      <div class="product">
        <img src="${product.image}" alt="${product.name}" />
        <p>${product.name}<br />${product.price}</p>
        <a href="${product.link}">View Product</a>
      </div>
    `;
    searchResultsContainer.insertAdjacentHTML("beforeend", productHTML);
  });

  if (filteredProducts.length === 0) {
    searchResultsContainer.innerHTML = "<p>No products found</p>";
  }
});

// Open search when clicking the search icon
searchIcon.addEventListener("click", () => {
  body.classList.add("showSearch");
  body.style.overflow = "hidden";
});

// Close search when clicking the close button
closeSearch.addEventListener("click", () => {
  body.classList.remove("showSearch");
  body.style.overflow = "scroll";
});

// Close search when clicking outside the search content (but not inside it)
searchContainer.addEventListener("click", () => {
  body.classList.remove("showSearch");
  body.style.overflow = "scroll";
});

// Prevent searchContainer from closing when clicking inside the search content
searchContent.addEventListener("click", (e) => e.stopPropagation());

// // Select elements from the DOM
// const cartIcon = document.querySelector(".cart i");
// const cartBadge = document.querySelector(".cart-badge");
// const body = document.querySelector("body");
// const closeCart = document.querySelector(".cartTab .close");
// const overlay = document.getElementById("overlay");
// const cartTabContentContainer = document.querySelector(
//   ".cartTabContentContainer"
// );

// // Initialize cart from localStorage
// let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// // Function to update the cart badge (item count)
// const updateCartBadge = () => {
//   const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
//   if (totalItems > 0) {
//     cartBadge.textContent = totalItems;
//     cartBadge.style.display = "block";
//   } else {
//     cartBadge.style.display = "none";
//   }
// };

// // checkout
// document
//   .getElementById("checkout-button")
//   .addEventListener("click", function () {
//     // Assuming cartItems are stored in localStorage
//     const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

//     // Check if cart has items before proceeding to checkout
//     if (cartItems.length > 0) {
//       // Optionally: Store any necessary data in sessionStorage (or URL parameters)
//       sessionStorage.setItem("cartCheckoutData", JSON.stringify(cartItems));

//       // Navigate to the checkout page without a reload
//       window.location.href = "checkout.html"; // Change this to your actual checkout page
//     } else {
//       alert(
//         "Your cart is empty. Please add items to the cart before proceeding."
//       );
//     }
//   });
// // Function to render cart items in the cart tab
// const renderCartItems = () => {
//   // Clear existing items in the cart tab content container
//   cartTabContentContainer.innerHTML = "";

//   // Iterate through each item in the cartItems array
//   cartItems.forEach((item, index) => {
//     // Create HTML structure for each cart item
//     const itemHTML = `
//      <div class="cartTabContent" style="width:400px;">
//           <div class="cartTabImage"><img src="
//           ${item.image}" alt="" style="width: 70px" /></div>

//             <div style="max-width:200px; display:flex; flex-direction:column; align-items:start">

//            <div class="width:200px">
//              ${item.name}
//              </div>

//             <div style="margin-top:7px;">
//               Size: <span class="cartTabSize" style="color:black;">${
//                 item.size
//               }</span> <br>
//             </div>
//             <div class="qty" style="margin-left:-14px;">
//               <i class="fa-solid fa-minus" data-index="${index}"></i>
//               <span id="sp" style="color:black;">${item.quantity}</span>
//               <i class="fa-solid fa-plus" data-index="${index}"></i>
//             </div>
//           </div >
//           <div style="display:flex; flex-direction:column; margin-bottom:24px;">
//             <i class="fa-solid fa-xmark close" style="font-size: 20px; color: black; padding: 15px;" data-index="${index}"></i><br />
//             <span class="cartTabPrice" style="color:black;">${
//               item.price * item.quantity
//             }$</span>
//           </div>
//         </div>
//         <hr />
//     `;
//     // Insert the HTML structure into the cart tab content container
//     cartTabContentContainer.insertAdjacentHTML("beforeend", itemHTML);
//   });

//   // Add event listeners for decreasing item quantity
//   document.querySelectorAll(".fa-minus").forEach((button) => {
//     button.addEventListener("click", (event) => {
//       const index = event.target.getAttribute("data-index");
//       if (cartItems[index].quantity > 1) {
//         cartItems[index].quantity--;
//         saveCartItems(); // Save updated cart items to localStorage
//         renderCartItems(); // Re-render cart items
//         updateCartBadge(); // Update the cart badge
//         updateTotalPrice(); // Update the total price
//       }
//     });
//   });

//   // Add event listeners for increasing item quantity
//   document.querySelectorAll(".fa-plus").forEach((button) => {
//     button.addEventListener("click", (event) => {
//       const index = event.target.getAttribute("data-index");
//       cartItems[index].quantity++;
//       saveCartItems(); // Save updated cart items to localStorage
//       renderCartItems(); // Re-render cart items
//       updateCartBadge(); // Update the cart badge
//       updateTotalPrice(); // Update the total price
//     });
//   });

//   // Add event listeners for removing items from the cart
//   document.querySelectorAll(".cartTabContent .close").forEach((button) => {
//     button.addEventListener("click", (event) => {
//       const index = event.target.getAttribute("data-index");
//       cartItems.splice(index, 1); // Remove the item from the cartItems array
//       saveCartItems(); // Save updated cart items to localStorage
//       renderCartItems(); // Re-render cart items
//       updateCartBadge(); // Update the cart badge
//       updateTotalPrice(); // Update the total price
//     });
//   });

//   // Update the total price after rendering the cart items
//   updateTotalPrice();
// };

// // Function to calculate and update the subtotal price in the cart tab
// const updateTotalPrice = () => {
//   const totalPrice = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );
//   document.querySelector(
//     ".CartTabSubTotalPrice"
//   ).textContent = `${totalPrice}$`;
// };

// // Function to save cart items to localStorage
// const saveCartItems = () => {
//   localStorage.setItem("cartItems", JSON.stringify(cartItems));
// };

// // Event listener for opening the cart tab
// cartIcon.addEventListener("click", () => {
//   body.classList.toggle("showCart");
//   body.style.overflow = "hidden";
//   overlay.style.display = "block";
//   renderCartItems(); // Render the cart items when the cart tab is opened
// });

// // Event listener for closing the cart tab
// closeCart.addEventListener("click", () => {
//   body.classList.toggle("showCart");
//   body.style.overflow = "scroll";
//   overlay.style.display = "none";
// });

// overlay.addEventListener("click", () => {
//   body.classList.toggle("showCart");
//   overlay.style.display = "none";
//   body.style.overflow = "scroll";
// });

// // Load cart items and update the cart badge when the page loads
// window.addEventListener("load", () => {
//   updateCartBadge();
//   renderCartItems(); // Ensure the cart content is also rendered on page load
// });
// // Listen for cart updates from the shopping page
// window.addEventListener("cartUpdated", () => {
//   cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
//   updateCartBadge();
//   renderCartItems();
// });

// const images = [
//   {
//     id: "img1",
//     hoverSrc: "nrf-image/nrf-home-cart-2.jpeg",
//     outSrc: "nrf-image/nrf-home-cart-1.jpeg",
//   },
//   {
//     id: "img2",
//     hoverSrc: "nrf-image/nrf-home-cart-4.jpeg",
//     outSrc: "nrf-image/nrf-home-cart-3.jpeg",
//   },
//   {
//     id: "img3",
//     hoverSrc: "nrf-image/nrf-home-cart-6.jpeg",
//     outSrc: "nrf-image/nrf-home-cart-5.jpeg",
//   },
//   {
//     id: "img4",
//     hoverSrc: "nrf-image/nrf-home-cart-8.jpeg",
//     outSrc: "nrf-image/nrf-home-cart-7.jpeg",
//   },
//   {
//     id: "img5",
//     hoverSrc: "sisimage/SISBURMA AUBURNSTOMP.jpeg ",
//     outSrc: "sisimage/SISBURMA AUBURNSTOMP...jpeg",
//   },
//   {
//     id: "img6",
//     hoverSrc: "sisimage/The Sisburma Styling Bag.jpeg",
//     outSrc: "sisimage/The Sisburma Styling bag .jpeg",
//   },
//   {
//     id: "img7",
//     hoverSrc: "sisimage/Sisburma Giraffe Jacket 2colors side.jpeg",
//     outSrc: "sisimage/Sisburma Giraffe Jacket 2colors.jpeg",
//   },
//   {
//     id: "img8",
//     hoverSrc: "sisimage/Sisburma Water-proof Nylon Parachute Pant Cream.jpeg",
//     outSrc: "sisimage/Sisburma Water-proof Nylon Parachute Pant black.jpeg",
//   },
//   {
//     id: "img9",
//     hoverSrc: "SEimage/NO STABLE EDGE, NO CRY T-SHIRT2.jpeg",
//     outSrc: "SEimage/NO STABLE EDGE, NO CRY T-SHIRT1.jpeg",
//   },
//   {
//     id: "img10",
//     hoverSrc: "SEimage/STABLE EDGE BACKPACK2.jpeg",
//     outSrc: "SEimage/STABLE EDGE BACKPACK1.jpeg",
//   },
//   {
//     id: "img11",
//     hoverSrc: "SEimage/Coach2.jpeg",
//     outSrc: "SEimage/Coach1.jpeg",
//   },
//   {
//     id: "img12",
//     hoverSrc: "SEimage/Contrast stitch hoodie2.jpg",
//     outSrc: "SEimage/Contrast stitch hoodie1.jpg",
//   },
// ];

// images.forEach(({ id, hoverSrc, outSrc }) => {
//   const imgElement = document.getElementById(id);

//   imgElement.addEventListener("mouseover", () => {
//     imgElement.src = hoverSrc;
//   });

//   imgElement.addEventListener("mouseout", () => {
//     imgElement.src = outSrc;
//   });
// });

// function userScroll() {
//   const toTopBtn = document.querySelector("#to-top");

//   window.addEventListener("scroll", () => {
//     if (window.scrollY > 50) {
//       toTopBtn.classList.add("show");
//     } else {
//       toTopBtn.classList.remove("show");
//     }
//   });
// }

// function scrollToTop() {
//   document.body.scrollTop = 0;
//   document.documentElement.scrollTop = 0;
// }

// // Event Listeners
// document.addEventListener("DOMContentLoaded", userScroll);
// document.querySelector("#to-top").addEventListener("click", scrollToTop);

// const searchBar = document.getElementById("searchBar");
// const searchResultsContainer = document.querySelector(".productContainer");

// // Fetch product data from the JSON file
// let productsData = [];
// fetch("products.json")
//   .then((response) => response.json())
//   .then((data) => {
//     productsData = data; // Store the data for use in search
//   })
//   .catch((error) => console.log("Error fetching product data:", error));

// // Add event listener for search input
// searchBar.addEventListener("keyup", (e) => {
//   const searchTerm = e.target.value.toLowerCase();
//   searchResultsContainer.innerHTML = ""; // Clear previous results

//   // Filter products that match the search term
//   const filteredProducts = productsData.filter(
//     (product) =>
//       product.name.toLowerCase().includes(searchTerm) ||
//       product.category.toLowerCase().includes(searchTerm)
//   );

//   // If the search term is empty, clear the results and return
//   if (searchTerm === "") {
//     return;
//   }

//   const limitedProducts = filteredProducts.slice(0, 5);
//   // Display the search results
//   limitedProducts.forEach((product) => {
//     const productHTML = `
//       <div class="product">
//         <img src="${product.image}" alt="${product.name}" />
//         <p>${product.name}<br />${product.price}</p>
//         <a href="${product.link}">View Product</a>
//       </div>
//     `;
//     searchResultsContainer.insertAdjacentHTML("beforeend", productHTML);
//   });

//   if (filteredProducts.length === 0) {
//     searchResultsContainer.innerHTML = "<p>No products found</p>";
//   }
// });

// const searchIcon = document.getElementById("searchIcon");
// const closeSearch = document.getElementById("closeSearch");
// const searchContainer = document.querySelector(".searchContainer");
// const searchContent = document.querySelector(".searchContent"); // Assuming you have an inner div for search content

// // Open search when clicking the search icon
// searchIcon.addEventListener("click", () => {
//   body.classList.add("showSearch");
//   body.style.overflow = "hidden";
// });

// // Close search when clicking the close button
// closeSearch.addEventListener("click", () => {
//   body.classList.remove("showSearch");
//   body.style.overflow = "scroll";
// });

// // Close search when clicking outside the search content (but not inside it)
// searchContainer.addEventListener("click", () => {
//   body.classList.remove("showSearch");
//   body.style.overflow = "scroll";
// });

// // Prevent searchContainer from closing when clicking inside the search content
// searchContent.addEventListener("click", (e) => {
//   e.stopPropagation();
// });

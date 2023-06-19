var listProducts = [];
var cartListProduct = [];

getLocalStorage();
renderCart();

// Active buttons
var btnContainer = document.getElementById("buttonActive");
var btns = btnContainer.getElementsByClassName("btn-danger");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");

    if (current.length > 0) {
      document.querySelector(".active").classList.remove("active");
    }
    this.className += " active";
  });
}

// Get all products
function getAllProducts() {
  // dùng axios gọi dữ liệu từ server về
  var promise = axios({
    url: "https://shop.cyberlearn.vn/api/Product",
    method: "get",
  });
  promise.then(function (res) {
    // console.log(res);
    listProducts = res.data.content;
    renderProducts(listProducts);
    addToCart(listProducts);
  });
  promise.catch(function (err) {
    console.log(err);
  });
}

getAllProducts();

// Render Products
function renderProducts(arr) {
  var content = "";
  for (var i = 0; i < arr.length; i++) {
    var products = arr[i];

    content += `    
      <div class="product_item">
        <a onclick="getDetailedProduct('${products.id}')" data-toggle="modal"
        data-target="#exampleModalCenter" href="">
        <img src=${products.image} />
        </a>

        <div class="product_text">
          <h3>${products.name}</h3>
          <p class="shortDescription">${products.shortDescription}</p>
          <div class="buy_price">                
            <span>
              $${products.price}
            </span>
            </div>
        </div>
      </div>    
    `;
  }
  document.getElementById("allProducts").innerHTML = content;
  addToCart();
}

// Get Detailed Product
function getDetailedProduct(id) {
  var promise = axios({
    url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
    method: "get",
  });
  promise.then(function (res) {
    var product = res.data.content;
    renderDetailedProduct(product);
    renderSize(product);
    renderRelatedProducts(product);
    addToCart(product);
  });
  promise.catch(function (err) {
    console.log(err);
  });
}

// Render Detailed Product
function renderDetailedProduct(product) {
  document.getElementById("product-modal-content").innerHTML = `
  <div class="modal-content product-modal-content">
    <div class="modal-header product-modal-header">
      <h3 class="modal-title" id="exampleModalLongTitle">
      <h3>${product.name}</h3>
      <p class="description">${product.description}</p>
      </h3>    
    </div>

    <div id="product-details" class="modal-body product-modal-body">
      <img src=${product.image} />
      <h4>AVAILABLE SIZE</h4>
      <p id="available-size" class="size"></p>
      <p>In stock: ${product.quantity}</p>
      <div class="button-add-to-cart">
      <button data-id=${product.id}><i class="fa-solid fa-cart-plus"></i></button>          
      </div>
    </div>

    <div class="modal-footer product-modal-footer">
      <div class="related-products">
        <h3>Related Products</h3>
        <div id="related-products" class="related-products-content"></div>
      </div>
    </div>
  </div>
  `;
}

// Get Size
function getSize(size) {
  console.log(cartSize);
  // document.querySelector("#cartSize").innerHTML = size;
}

// Render Size
function renderSize(product) {
  var size = product.size;
  var content = "";
  for (var i = 0; i < size.length; i++) {
    content += `
    <div class="size-buttons">
    <button class="btn btn-primary" onclick="getSize(${size[i]})"> ${size[i]}</button>
    </div>
    `;
  }
  document.getElementById("available-size").innerHTML = content;
}

// Render related products
function renderRelatedProducts(product) {
  var relatedProducts = [];
  relatedProducts = product.relatedProducts;
  var content = "";
  for (var i = 0; i < relatedProducts.length; i++) {
    content += `
    <div class="related-products-item"> 
    <div class="related-products-item-content"></div>    
      <a onclick="getDetailedProduct('${relatedProducts[i].id}')">
        <img src=${relatedProducts[i].image} />       
      </a>   

      <div class="related-products-text">
        <h3>${relatedProducts[i].name}</h3>
      </div>
    </div>    
    `;
  }
  document.getElementById("related-products").innerHTML = content;
}

// Get Products by Category
function getProductByCategory(categoryId) {
  var promise = axios({
    url: `https://shop.cyberlearn.vn/api/Product/getProductByCategory?categoryId=${categoryId}`,
    method: "get",
  });
  promise.then(function (res) {
    renderProducts(res.data.content);
  });

  promise.catch(function (err) {
    console.log(err);
  });
}

const handleTotalMoney = () => {
  let total = 0;
  let totalCartQuantity = 0;
  cartListProduct.forEach((item) => {
    total += item.cartQuantity * item.price;
    totalCartQuantity += item.cartQuantity;
  });
  document.getElementById("thanhToan").innerHTML = `<div>$${total}</div>`;
  document.querySelector(".quantity-of-cart-list").style.display = "block";
  document.querySelector(".quantity-of-cart-list").innerHTML =
    totalCartQuantity;
  setLocalStorage();
};

const findItemExist = (id) =>
  cartListProduct.find((product) => product.id == id);

const handleIncreaseQuantity = (id) => {
  const itemExist = findItemExist(id);
  if (itemExist) {
    itemExist.cartQuantity += 1;
  }
  renderCart();
  handleTotalMoney();
};

const handleDecreaseQuantity = (id) => {
  const itemExist = findItemExist(id);

  if (itemExist) {
    if (itemExist.cartQuantity > 1) itemExist.cartQuantity -= 1;
  }
  renderCart();
  handleTotalMoney();
};

// Xóa item khỏi giỏ hàng
const deleteItem = (id) => {
  const index = cartListProduct.findIndex((item) => item.id == id);
  cartListProduct.splice(index, 1);
  renderCart(cartListProduct);
  setLocalStorage();
};

function renderCart(data) {
  let content = "";
  if (data) {
    let totalMoney = 0;
    let totalCartQuantity = 0;
    data.forEach((item) => {
      totalCartQuantity += item.cartQuantity;
      totalMoney += item.cartQuantity * item.price;
    });
    document.querySelector(".quantity-of-cart-list").style.display = "block";
    document.querySelector(".quantity-of-cart-list").innerHTML =
      totalCartQuantity;
    document.getElementById(
      "thanhToan"
    ).innerHTML = `<div>$${totalMoney}</div>`;
  }

  const newData = data || cartListProduct;
  newData.forEach(function (product) {
    content += `
      <div style="display:flex; align-items:center; justify-content:space-evenly" >
          <div style="width:15%; margin-bottom:10px">
            <img class="img-fluid" style="width:4rem" src="${product.image}">
          </div>
          <div style="width:40%; margin-bottom:10px">${product.name}</div>
          <div id="cartSize" style="width:10%; margin-bottom:10px"></div> 

          <div style="width:15%; margin-bottom:10px">
            <button style="border:none; background-color:white"  onclick="handleDecreaseQuantity(${
              product.id
            })"><i class="fa fa-caret-left"></i></button>
            ${product.cartQuantity}
            <button style="border:none; background-color:white" onclick="handleIncreaseQuantity(${
              product.id
            })"><i class="fa fa-caret-right"></i></button>
          </div>
          <div style="width:15%; margin-bottom:10px">$${
            product.price * product.cartQuantity
          }</div>
          <div style="width:5%"><button style="border:none; background-color:white" onclick="deleteItem(${
            product.id
          })"><i class="fa fa-trash"></i></button></div>
        
      </div>
      `;
  });
  document.querySelector(".cart-modal-body").innerHTML = content;
}

// Add to cart
function addToCart() {
  const buttonElements = document.querySelectorAll("button");

  buttonElements.forEach((el) => {
    el.addEventListener("click", () => {
      const id = el.getAttribute("data-id");
      const item = listProducts.find((product) => product.id == id);
      if (!item) return;

      const itemExist = cartListProduct.find(
        (product) => product.id === item.id
      );

      if (!itemExist) {
        cartListProduct = [
          {
            cartQuantity: 1,
            ...item,
          },
          ...cartListProduct,
        ];
      }

      renderCart();
      handleTotalMoney();
    });
  });
}

// Thanh toán
function payment() {
  if (cartListProduct !== []) {
    cartListProduct = [];
  }
  setLocalStorage();
  getLocalStorage();
}

// Clear giỏ hàng
function clearCart() {
  if (cartListProduct !== []) {
    cartListProduct = [];
  }
  setLocalStorage();
  getLocalStorage();
}

// Lưu giỏ hàng xuống local storage
function setLocalStorage() {
  // Convert từ JSON (cú pháp của JavaScript) => String
  var dataString = JSON.stringify(cartListProduct);
  // Lưu xuống local storage
  localStorage.setItem("CartList", dataString);
}

// Lấy lại data từ local storage để sử dụng
function getLocalStorage() {
  if (localStorage.getItem("CartList")) {
    // IMPORTANT: PHẢI KIỂM TRA DATA CÓ TỒN TẠI HAY KHÔNG RỒI MỚI CHO CHẠY LỆNH ĐỂ TRÁNH BỊ LỖI CODE
    var dataString = localStorage.getItem("CartList");
    // Convert từ String => JSON để sử dụng
    var dataJSON = JSON.parse(dataString);
    // Gọi lại hàm renderTable để nhập lại thông tin từ local storage ra table
    renderCart(dataJSON);
    // Thêm lại thông tin từ local storage vào arr
    cartListProduct = dataJSON;
  }
}

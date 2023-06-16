var listProducts = [];

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
function getAllProducts() {
  // dùng axios gọi dữ liệu từ server về
  var promise = axios({
    url: "https://shop.cyberlearn.vn/api/Product",
    method: "get",
  });
  promise.then(function (res) {
    console.log(res);
    listProducts = res.data.content;
    renderProducts(res.data.content);
  });
  promise.catch(function (err) {
    console.log(err);
  });
}

getAllProducts();

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
            <button>
              <i class="fa-solid fa-cart-shopping"></i>
            </button>
            <span>
              $${products.price}
            </span>                
            </div>
        </div>
      </div>    
    `;
  }
  document.getElementById("allProducts").innerHTML = content;
}

function getDetailedProduct(id) {
  console.log(id);
  var promise = axios({
    url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
    method: "get",
  });
  promise.then(function (res) {
    console.log(res.data.content);
    var product = res.data.content;
    renderDetailedProduct(product);
    renderSize(product);
  });
  promise.catch(function (err) {
    console.log(err);
  });
}

function renderDetailedProduct(product) {
  document.getElementById("modal-content").innerHTML = `
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

          <div class="related-products">
            <h3>Related Products</h3>
          </div>
          </div>


          <div class="modal-footer product-modal-footer">
              <button type="button" class="btn btn-primary">
                Add to cart
              </button>
            </div>
          </div>
  `;
}

function renderSize(product) {
  var size = product.size;
  console.log(size);
  var content = "";
  for (var i = 0; i < size.length; i++) {
    content += `
    <div class="size-buttons">
    <button class="btn btn-primary">${size[i]}</button>
    </div>
    `;
  }
  document.getElementById("available-size").innerHTML = content;
}

function getProductByCategory(categoryId) {
  var promise = axios({
    url: `https://shop.cyberlearn.vn/api/Product/getProductByCategory?categoryId=${categoryId}`,
    method: "get",
  });
  promise.then(function (res) {
    console.log(res);
    renderProducts(res.data.content);
  });

  promise.catch(function (err) {
    console.log(err);
  });
}

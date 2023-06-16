var listProducts = [];

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
              <i class="fa-solid fa-cart-shopping"></i>Buy now
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
  });
  promise.catch(function (err) {
    console.log(err);
  });
}

function renderDetailedProduct(product) {
  document.getElementById("modal-content").innerHTML = `
  <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" id="exampleModalLongTitle">
            <h3>${product.name}</h3>
            <p class="description">${product.description}</p>
            </h3>
    
          </div>
          <div id="product-details" class="modal-body">
          <img src=${product.image} />
          <p>AVAILABLE SIZE</p>
          <p class="size">${product.size}</p>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
  `;
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

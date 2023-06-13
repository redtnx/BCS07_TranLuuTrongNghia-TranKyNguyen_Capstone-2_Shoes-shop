function getAllProducts() {
  // dùng axios gọi dữ liệu từ server về
  var promise = axios({
    url: "https://shop.cyberlearn.vn/api/Product",
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

getAllProducts();

function renderProducts(arr) {
  var content = "";
  for (var i = 0; i < arr.length; i++) {
    var products = arr[i];
    content += `
    
      <div class="product_item">
        <a data-toggle="modal"
        data-target="#exampleModalCenter" href="">
        <img src=${products.image} />
        </a>

 <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" id="exampleModalLongTitle">${products.name}</h3>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
          <img src=${products.image} />
          <div class="product_text">
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
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>

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

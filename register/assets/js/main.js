function submitForm() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const cfPassword = document.getElementById("cfpassword").value;
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const gender = document.querySelector('input[name="gender"]:checked').value;

  axios
    .post("https://shop.cyberlearn.vn/api/Users/signup", {
      email,
      password,
      name,
      gender,
      phone,
    })
    .then(function (response) {
      console.log(response);
    });
}

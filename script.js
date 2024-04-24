var color, size;

fetch(
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448"
)
  .then((response) => response.json())
  .then((data) => {
    const product = data.product;

    // Populate product info
    document.querySelector(".vendor").textContent = product.vendor;
    document.querySelector(".title").textContent = product.title;
    document.querySelector(".price").textContent = product.price;
    document.querySelector(".compare-price").textContent =
      product.compare_at_price + ".00";
    document.querySelector(".description").innerHTML = product.description;

    // Calculate percentage off
    const price = parseFloat(product.price.substring(1));
    const comparePrice = parseFloat(product.compare_at_price.substring(1));
    const percentageOff = Math.round(
      ((comparePrice - price) / comparePrice) * 100
    );
    document.querySelector(".percent").textContent = `${percentageOff}% off`;

    // Populate colors
    const colors = document.querySelectorAll(".colors div");
    product.options[0].values.forEach((value, index) => {
      const colorBox = colors[index];
      const colorName = Object.keys(value)[0];

      const colorCode = value[colorName];
      colorBox.style.backgroundColor = colorCode;
      if (index === 0) {
        colorBox.classList.add("selected");
        colorBox.style.border = `3px solid ${colorCode}`;
        color = colorName;
      }
      // Add event listener to each color box
      colorBox.addEventListener("click", () => {
        colors.forEach((box) => box.classList.remove("selected"));
        colorBox.classList.add("selected");
        color = colorName;
        colorBox.style.border = `3px solid ${colorCode}`;
        colors.forEach((box) => {
          if (box !== colorBox) {
            box.style.border = "none";
          }
        });
      });
    });

    var sizeRadios = document.querySelectorAll('input[type="radio"]');

    // Add event listener to each radio button
    sizeRadios.forEach(function (radio) {
      radio.addEventListener("change", function () {
        // Remove the "selected" class from all labels
        var labels = document.querySelectorAll(".product-info form label");
        labels.forEach(function (label) {
          label.classList.remove("selected");
        });

        // Add the "selected" class to the label of the chosen size
        if (this.checked) {
          var label = this.parentElement;
          label.classList.add("selected");
          size = this.getAttribute("value");
        }
      });
      if (radio.checked) {
        size = radio.getAttribute("value");
      }
    });

    // Event listener for adding items to the cart
    document.querySelector(".cart").addEventListener("click", function () {
      // Get the product title
      var title = document.querySelector(".title").textContent;

      // Form the message
      var message = `${title} with Color ${color} and Size ${size} added to cart`;

      // Display the message
      var messageContainer = document.querySelector(".message");
      document.querySelector(".message").style.display = "block";
      messageContainer.innerHTML = message;
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

var count = 1;

function updateCountDisplay() {
  document.getElementById("count").textContent = count;
}

document.getElementById("plus-btn").addEventListener("click", function () {
  count++;
  updateCountDisplay();
});

document.getElementById("minus-btn").addEventListener("click", function () {
  if (count > 1) {
    count--;
    updateCountDisplay();
  }
});

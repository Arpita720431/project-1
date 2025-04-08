async function verifyProduct() {
  const url = document.getElementById("blockchainURL")?.value?.trim();
  const resultElement = document.getElementById("result");

  if (!url) {
      resultElement.innerText = "❌ Please enter a valid URL.";
      return;
  }

  resultElement.innerText = "Verifying, please wait...";

  try {
      // Extract Bin ID from URL
      const binId = url.split("/").pop();

      // Call backend to verify product
      const response = await fetch(`http://localhost:5000/verify?binId=${binId}`);
      if (!response.ok) throw new Error("Invalid response from server, fake product");

      const data = await response.json();
      resultElement.innerHTML = `
          ✅ Product Found: ${data.product_name} <br>
          🔹 Manufacturer: ${data.manufacturer} <br>
          📅 Manufacture Date: ${data.manufacture_date} <br>
          🏷️ Batch Number: ${data.batch_number} <br>
          🔒 Authenticity: ${data.authenticity} <br>
      `;

  } catch (error) {
      resultElement.innerText = "❌ Error: " + error.message;
  }
}

// Function to fetch product details from URL parameters
async function fetchProductDetails() {
  const params = new URLSearchParams(window.location.search);
  const binId = params.get("binId");
  const resultElement = document.getElementById("result");

  if (!binId) {
      resultElement.innerText = "❌ No product ID found!";
      return;
  }

  try {
      const response = await fetch(`http://localhost:5000/verify?binId=${binId}`);
      if (!response.ok) throw new Error("Product Not Found");

      const data = await response.json();
      resultElement.innerHTML = `
          ✅ Product Found: ${data.product_name} <br>
          🔹 Manufacturer: ${data.manufacturer} <br>
          📅 Manufacture Date: ${data.manufacture_date} <br>
          🏷️ Batch Number: ${data.batch_number} <br>
          🔒 Authenticity: ${data.authenticity} <br>
      `;

  } catch (error) {
      resultElement.innerText = "❌ Error: " + error.message;
  }
}
// Expose function for index.html
window.verifyProduct = verifyProduct;

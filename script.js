// Tambahkan pada bagian yang sesuai
document.addEventListener('DOMContentLoaded', function () {
  // Tunda 0 ms agar script berjalan setelah DOMContentLoaded
  setTimeout(function () {
    document.getElementById('splash-screen').style.opacity = 1;
  }, 0);

  // Setelah 5 detik, sembunyikan splash screen
  setTimeout(function () {
    document.getElementById('splash-screen').style.opacity = 0;
    // Setelah animasi selesai (dalam contoh, setelah 1 detik), sembunyikan elemen sepenuhnya
    setTimeout(function () {
      document.getElementById('splash-screen').style.display = 'none';
    }, 1000);
  }, 5000);

  // Code lainnya...
});

  

function showConfirmation() {
  const asset = document.getElementById("asset_id");
  const quantity = document.getElementById("quantity");

  document.getElementById("confirmation-asset").innerText =
    asset.options[asset.selectedIndex].text;
  document.getElementById("confirmation-quantity").innerText = quantity.value;
  document.getElementById("confirmation-total").innerText = (
    parseFloat(asset.options[asset.selectedIndex].text.split("Rp. ")[1]) *
    parseInt(quantity.value)
  ).toFixed(2);

  document.getElementById("order-form").classList.add("hidden");
  document.getElementById("confirmation-section").classList.remove("hidden");
}

function editOrder() {
  document.getElementById("order-form").classList.remove("hidden");
  document.getElementById("confirmation-section").classList.add("hidden");
}

let purchaseHistoryData = []; // Array untuk menyimpan data riwayat pembelian

function submitOrder() {
  // Get values from the form
  const asset = document.getElementById("asset_id");
  const quantity = document.getElementById("quantity");

  // Update confirmation section with form values
  document.getElementById("confirmation-asset").innerText =
    asset.options[asset.selectedIndex].text;
  document.getElementById("confirmation-quantity").innerText = quantity.value;
  const totalAmount = (
    parseFloat(asset.options[asset.selectedIndex].text.split("Rp. ")[1]) *
    parseInt(quantity.value)
  ).toFixed(2);
  document.getElementById("confirmation-total").innerText = totalAmount;

  // Show confirmation section
  document.getElementById("order-form").classList.add("hidden");
  document.getElementById("confirmation-section").classList.remove("hidden");

  // Add purchase history item to the array
  const newPurchase = {
    product: asset.options[asset.selectedIndex].text,
    quantity: quantity.value,
    totalAmount: totalAmount,
  };
  purchaseHistoryData.push(newPurchase);

  // Show purchase history section
  displayPurchaseHistory();
  document
    .getElementById("purchase-history-section")
    .classList.remove("hidden");
}

function editOrder() {
  // Hide confirmation and purchase history sections, show form
  document.getElementById("order-form").classList.remove("hidden");
  document.getElementById("confirmation-section").classList.add("hidden");
  document.getElementById("purchase-history-section").classList.add("hidden");

  // Clear the existing purchase history data
  purchaseHistoryData = [];

  // Redisplay the purchase history
  displayPurchaseHistory();
}

function deletePurchase(index) {
  // Remove the purchase at the specified index
  purchaseHistoryData.splice(index, 1);

  // Update the displayed purchase history
  displayPurchaseHistory();
}

function displayPurchaseHistory() {
  const purchaseHistoryTable = document
    .getElementById("purchase-history-table")
    .getElementsByTagName("tbody")[0];
  purchaseHistoryTable.innerHTML = "";

  purchaseHistoryData.forEach((purchase, index) => {
    const row = purchaseHistoryTable.insertRow();
    const cellProduct = row.insertCell(0);
    const cellQuantity = row.insertCell(1);
    const cellTotalAmount = row.insertCell(2);
    const cellActions = row.insertCell(3);

    cellProduct.textContent = purchase.product;
    cellQuantity.textContent = purchase.quantity;
    cellTotalAmount.textContent = `Rp${purchase.totalAmount.toLocaleString(
      "id-ID"
    )}`;

    // Add delete button with event listener
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deletePurchase(index));
    cellActions.appendChild(deleteButton);
  });
}

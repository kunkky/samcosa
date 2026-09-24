(function () {
  const productSelect = document.getElementById("product");
  PRODUCTS.forEach((product) => {
    const option = document.createElement("option");
    option.value = product;
    option.textContent = product;
    productSelect.appendChild(option);
  });

  const form = document.getElementById("order-form");

  function showError(fieldName, visible) {
    const el = form.querySelector(`.error[data-error-for="${fieldName}"]`);
    if (el) el.classList.toggle("visible", visible);
  }

  function isValidPhone(value) {
    const digits = value.replace(/\D/g, "");
    return digits.length >= 7;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const product = form.product.value;
    const quantity = form.quantity.value;
    const address = form.address.value.trim();
    const notes = form.notes.value.trim();

    let valid = true;

    showError("name", !name);
    if (!name) valid = false;

    const phoneOk = isValidPhone(phone);
    showError("phone", !phoneOk);
    if (!phoneOk) valid = false;

    showError("address", !address);
    if (!address) valid = false;

    if (!valid) return;

    const lines = [
      `*New ${BUSINESS_NAME} Order*`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Product: ${product}`,
      `Quantity: ${quantity}`,
      `Delivery address: ${address}`,
    ];
    if (notes) lines.push(`Notes: ${notes}`);

    const message = lines.join("\n");
    const waUrl = `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.location.href = waUrl;
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  const addProduct = () => {
    const productForm = document.getElementById("productForm");
    productForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        brand: document.getElementById("brand").value,
        imageUrl: document.getElementById("imageUrl").value,
        price: document.getElementById("price").value,
      };

      fetch("https://striveschool-api.herokuapp.com/api/product/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZTY1NjdmMzA0NjAwMWFlNTlmNWQiLCJpYXQiOjE3MTI5MDc4NjIsImV4cCI6MTcxNDExNzQ2Mn0.byc1bOGEKbPV_IlMoZ9RgrY-VegtxBJRT-hTa1R1j1E",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("notFound");
          }
        })
        .then((data) => {
          console.log("Success:", data);
          alert("Prodotto aggiunto con successo!");
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Errore durante l'aggiunta del prodotto");
        });
    });
  };
  addProduct();
});

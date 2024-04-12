document.addEventListener("DOMContentLoaded", () => {
  let apiUrl = "https://striveschool-api.herokuapp.com/api/product/";

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

      fetch(apiUrl, {
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
          productForm.reset();
          getAndshowProducts();
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Errore durante l'aggiunta del prodotto");
          productForm.reset();
        });
    });
  };

  const getAndshowProducts = () => {
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZTY1NjdmMzA0NjAwMWFlNTlmNWQiLCJpYXQiOjE3MTI5MDc4NjIsImV4cCI6MTcxNDExNzQ2Mn0.byc1bOGEKbPV_IlMoZ9RgrY-VegtxBJRT-hTa1R1j1E",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore durante il recupero dei prodotti");
        }
      })
      .then((data) => {
        const productsContainer = document.querySelector(".container");

        data.forEach((product) => {
          const productCard = document.createElement("div");
          productCard.classList.add("card", "my-3");
          productCard.innerHTML = `
                <div class="card-body">
                  <h5 class="card-title">Nome: ${product.name}</h5>
                  <p class="card-text">Descrizione: ${product.description}</p>
                  <p class="card-text"><strong>Prezzo:</strong> ${product.price}€</p>
                  <button id="remove_${product._id}" class="btn btn-danger btn-remove">Rimuovi</button>
                  <button id="${product._id}" class="btn btn-primary btn-edit">Modifica</button>
                </div>
              `;

          productsContainer.appendChild(productCard);

          const removeBtn = document.getElementById(`remove_${product._id}`);
          removeBtn.addEventListener("click", () => {
            removeProduct(product._id);
          });
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Errore durante il recupero dei prodotti");
      });
  };

  const removeProduct = (productId) => {
    fetch(apiUrl + productId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZTY1NjdmMzA0NjAwMWFlNTlmNWQiLCJpYXQiOjE3MTI5MDc4NjIsImV4cCI6MTcxNDExNzQ2Mn0.byc1bOGEKbPV_IlMoZ9RgrY-VegtxBJRT-hTa1R1j1E",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore durante la rimozione del prodotto");
        }
      })
      .then((data) => {
        console.log("Success:", data);
        window.location.assign("./backoffice.html");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Errore durante la rimozione del prodotto");
      });
  };

  addProduct();
  getAndshowProducts();
});

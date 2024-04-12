document.addEventListener("DOMContentLoaded", () => {
  let apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
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
                    <img src="${product.imageUrl}" class="card-img-top" alt="...">
                      <h5 class="card-title">Nome: ${product.name}</h5>
                      <p class="card-text">Descrizione: ${product.description}</p>
                      <p class="card-text"><strong>Prezzo:</strong> ${product.price}€</p>
                     
                      <button id="${product._id}" class="btn btn-primary btn-edit">Modifica</button>
                    </div>
                  `;

          productsContainer.appendChild(productCard);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Errore durante il recupero dei prodotti");
      });
  };
  getAndshowProducts();
});

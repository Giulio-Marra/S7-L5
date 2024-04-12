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
        const productsContainer = document.querySelector(".row");

        data.forEach((product) => {
          const productCard = document.createElement("div");
          productCard.classList.add(
            "card",
            "col-4",
            "border-0",
            "bg-transparent",
            "grow-2",
            "mt-4"
          );
          productCard.innerHTML = `
            
                    <div class="card-body p-0 border-0 bg-dark">
                    <img src="${product.imageUrl}" class="card-img-top img-fluid rounded-3 mb-3" alt="...">
                      <h5 class="card-title text-light">${product.name}</h5>
                      <p class="card-text text-light"> ${product.description}</p>
                      <p class="card-text text-light"><strong>Prezzo:</strong> ${product.price}€</p>                
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

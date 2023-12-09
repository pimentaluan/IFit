const imageSlides = document.querySelectorAll(".image-slide");
const circles = document.querySelectorAll(".circle");
let currentIndex = 0;

function showImage(index) {
  imageSlides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
  });
}

circles.forEach((circle, index) => {
  circle.addEventListener("click", () => {
    currentIndex = index;
    showImage(currentIndex);
  });
});

function nextImage() {
  currentIndex = (currentIndex + 1) % imageSlides.length;
  showImage(currentIndex);
}

setInterval(nextImage, 5000);

showImage(currentIndex);

const planSelector = document.getElementById("plan");
const priceElement = document.getElementById("price");
const planCardsContainer = document.getElementById("plan-cards");

// Array de objetos representando os planos e seus preços
const planos = [
  { nome: "Plano Mensal", preco: "R$30/mês" },
  { nome: "Plano Trimestral", preco: "R$80/trimestre" },
  { nome: "Plano Semestral", preco: "R$150/semestre" },
  { nome: "Plano Anual", preco: "R$280/ano" }
];

// Função para criar um card de plano
function createPlanCard(plan) {
  const card = document.createElement("div");
  card.classList.add("plan-card");
  card.innerHTML = `
        <h3>${plan.nome}</h3>
        <p>${plan.preco}</p>
        <img src='imgs/Mascote.png' id="mascote">
    `;
  return card;
}

// Atualiza os planos e o preço quando uma escolha é feita
planSelector.addEventListener("change", function() {
  const selectedPlan = planSelector.value;

  // Filtra o plano selecionado com base na escolha do usuário
  const filteredPlan = planos.filter(plan => plan.nome.toLowerCase().includes(selectedPlan));

  // Calcula o preço usando reduce
  const price = filteredPlan.reduce((total, plan) => total + plan.preco, "");

  priceElement.textContent = price;

  // Remove os cards existentes
  planCardsContainer.innerHTML = "";

  // Cria os cards usando map
  const planCards = filteredPlan.map(createPlanCard);
  planCards.forEach(card => planCardsContainer.appendChild(card));
});
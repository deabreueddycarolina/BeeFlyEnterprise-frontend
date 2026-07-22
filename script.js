// Ajusta estas URLs a tu backend en Render
const API_QUOTE = "https://beeflyenterprise-api.onrender.com/api/quote";
const API_CHAT  = "https://beeflyenterprise-api.onrender.com/api/chat";

// NAVBAR GOLD MODE TOGGLE
let isGoldMode = false;
const navTitle = document.querySelector('#navTitle');
const navbar = document.querySelector('#navbar');
const navLinks = document.querySelectorAll('#nav-quote, #nav-services, #nav-chat');

navTitle.addEventListener('click', () => {
  isGoldMode = !isGoldMode;
  
  if (isGoldMode) {
    // Change to gold mode
    navbar.classList.remove('bg-white', 'border-yellow-400');
    navbar.classList.add('bg-yellow-300', 'border-yellow-500');
    navbar.classList.remove('text-gray-800');
    navbar.classList.add('text-gray-900');
    
    // Make all nav links gold
    navLinks.forEach(link => {
      link.classList.remove('text-yellow-500', 'hover:text-yellow-600', 'text-blue-600', 'hover:text-blue-700', 'text-orange-600', 'hover:text-orange-700');
      link.classList.add('text-yellow-600', 'hover:text-yellow-700', 'font-extrabold');
    });
    
    navTitle.style.cursor = 'pointer';
    navTitle.title = 'Click to toggle back to normal colors';
  } else {
    // Change back to normal mode
    navbar.classList.add('bg-white', 'border-yellow-400');
    navbar.classList.remove('bg-yellow-300', 'border-yellow-500');
    navbar.classList.add('text-gray-800');
    navbar.classList.remove('text-gray-900');
    
    // Restore original colors
    document.querySelector('#nav-quote').className = 'text-yellow-600 hover:text-yellow-700 transition duration-300';
    document.querySelector('#nav-services').className = 'text-yellow-600 hover:text-yellow-700 transition duration-300';
    document.querySelector('#nav-chat').className = 'text-yellow-600 hover:text-yellow-700 transition duration-300';
    
    navLinks.forEach(link => link.classList.add('font-bold'));
    
    navTitle.title = 'Click to toggle gold colors';
  }
});

// QUOTE FORM
document.querySelector("#quoteForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.querySelector("#name").value,
    email: document.querySelector("#email").value,
    phone: document.querySelector("#phone").value,
    message: document.querySelector("#message").value
  };

  try {
    const res = await fetch(API_QUOTE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const msg = await res.text();
    document.querySelector("#confirmation").textContent = msg;
  } catch (err) {
    document.querySelector("#confirmation").textContent =
      "There was an error sending your request. Please try again.";
  }
});

// CHAT
document.querySelector("#chatSend").addEventListener("click", async () => {
  const input = document.querySelector("#chatInput");
  const message = input.value.trim();
  if (!message) return;

  addMessage("user", message);
  input.value = "";

  try {
    const res = await fetch(API_CHAT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: message })
    });

    const reply = await res.text();
    addMessage("bot", reply);
  } catch (err) {
    addMessage("bot", "There was an error. Please try again later.");
  }
});

function addMessage(sender, text) {
  const box = document.querySelector("#chatBox");
  const div = document.createElement("div");

  div.className = sender === "user" ? "text-right mb-2" : "text-left mb-2";

  const span = document.createElement('span');
  span.className = `inline-block px-3 py-2 rounded-lg ${sender === "user" ? "bg-yellow-300" : "bg-gray-200"}`;
  span.textContent = text;
  div.appendChild(span);

  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

// REVIEWS
const savedReviews = JSON.parse(localStorage.getItem('beeFlyReviews') || '[]');
const reviewList = document.querySelector('#reviewList');

const renderReviews = () => {
  reviewList.innerHTML = '';
  if (savedReviews.length === 0) {
    reviewList.innerHTML = '<p class="text-gray-600">No reviews yet. Be the first to share your experience.</p>';
    return;
  }

  savedReviews.slice().reverse().forEach(review => {
    const card = document.createElement('div');
    card.className = 'bg-white p-5 rounded-lg shadow';

    card.innerHTML = `
      <div class="flex items-center justify-between mb-3">
        <div>
          <p class="font-semibold">${review.name}</p>
          <p class="text-sm text-gray-500">${review.location}</p>
        </div>
        <span class="text-xs uppercase tracking-wide text-yellow-700">Customer</span>
      </div>
      <p class="text-gray-700">${review.text}</p>
    `;

    reviewList.appendChild(card);
  });
};

renderReviews();

document.querySelector('#reviewForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.querySelector('#reviewName').value.trim();
  const location = document.querySelector('#reviewLocation').value.trim();
  const text = document.querySelector('#reviewText').value.trim();

  if (!name || !location || !text) return;

  const review = {
    name,
    location,
    text,
    timestamp: new Date().toISOString()
  };

  savedReviews.push(review);
  localStorage.setItem('beeFlyReviews', JSON.stringify(savedReviews));
  renderReviews();

  document.querySelector('#reviewName').value = '';
  document.querySelector('#reviewLocation').value = '';
  document.querySelector('#reviewText').value = '';
});

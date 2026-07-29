// Formspree for email
const FORMSPREE_ID = "xyzghlpk"; // Test ID - replace with yours from formspree.io

// Simple chat responses
const chatResponses = {
  "services": "We offer freight delivery, dispatching services, logistics planning, and dedicated routes across NJ & NY.",
  "quote": "To get a quote, scroll to the Quote section and fill out the form with your freight details.",
  "contact": "You can reach us at beeflyenterprise@gmail.com or follow us on Instagram @beeflyenterprisellc.",
  "routes": "We serve routes across New Jersey and New York. Ask about our dedicated route agreements.",
  "default": "Thanks for reaching out! We're here to help. Ask us about our services, routes, or how to get a quote."
};

// Load global Q&A from localStorage
let globalQA = JSON.parse(localStorage.getItem('beeFlyQA') || '{}');

function getChatResponse(question) {
  const q = question.toLowerCase();
  
  // Check global Q&A first
  for (const [key, answer] of Object.entries(globalQA)) {
    if (q.includes(key.toLowerCase())) return answer;
  }
  
  // Check default responses
  for (const [key, response] of Object.entries(chatResponses)) {
    if (q.includes(key)) return response;
  }
  return chatResponses.default;
}

// NAVBAR GOLD MODE TOGGLE
let isGoldMode = false;
const navTitle = document.querySelector('#navTitle');
const navbar = document.querySelector('#navbar');
const navLinks = document.querySelectorAll('#nav-quote, #nav-services, #nav-chat');

navTitle.addEventListener('click', () => {
  isGoldMode = !isGoldMode;
  
  if (isGoldMode) {
    // Change to gold mode
    navbar.classList.remove('bg-white');
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
    navbar.classList.add('bg-white');
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

// QUOTE FORM - Send to email via Formspree
document.querySelector("#quoteForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.querySelector("#name").value,
    email: document.querySelector("#email").value,
    phone: document.querySelector("#phone").value,
    message: document.querySelector("#message").value
  };

  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      document.querySelector("#confirmation").textContent = "Quote sent! We'll contact you soon.";
      document.querySelector("#confirmation").className = "mt-4 text-green-600 font-semibold";
      document.querySelector("#quoteForm").reset();
    } else {
      document.querySelector("#confirmation").textContent = "There was an error. Please try again.";
      document.querySelector("#confirmation").className = "mt-4 text-red-600 font-semibold";
    }
  } catch (err) {
    document.querySelector("#confirmation").textContent = "There was an error sending your request. Please try again.";
    document.querySelector("#confirmation").className = "mt-4 text-red-600 font-semibold";
  }
});

// CHAT - Local responses with global Q&A
document.querySelector("#chatSend").addEventListener("click", () => {
  const input = document.querySelector("#chatInput");
  const message = input.value.trim();
  if (!message) return;

  addMessage("user", message);
  input.value = "";

  // Get local response
  setTimeout(() => {
    const reply = getChatResponse(message);
    addMessage("bot", reply);
  }, 500);
});

// Add new Q&A to global storage
function addGlobalQA(question, answer) {
  globalQA[question] = answer;
  localStorage.setItem('beeFlyQA', JSON.stringify(globalQA));
}

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

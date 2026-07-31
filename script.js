// Formspree for email
const FORMSPREE_ID = "mjgndrwd"; // Your actual Formspree ID

// Comprehensive Q&A for Bee Fly Enterprise
const chatResponses = {
  // Pricing
  "how much does it cost": "Our pricing depends on distance, truck size, and hours. Contact us at 347-756-2281 or fill out a quote request for a free estimate!",
  "pricing": "We offer both hourly rates and flat-rate options. Additional fees may apply for stairs, long carries, or oversized items. Request a free quote!",
  "do you charge by the hour": "We offer both hourly and flat-rate options depending on your move.",
  "extra fees": "Additional fees may apply for stairs, long carries, or oversized items. We'll quote all costs upfront!",
  "deposit": "Yes, a small deposit is required to confirm your booking.",

  // Services
  "services": "We offer local moves, long-distance moves, packing, loading/unloading, and furniture assembly across NJ & NY!",
  "what services": "We provide local moves, long-distance moves, packing, loading/unloading, furniture assembly, and storage options.",
  "packing": "Yes! We offer full and partial packing services. Ask about our custom packing solutions.",
  "large furniture": "Absolutely! We handle pianos, safes, appliances, and oversized furniture with professional care.",
  "storage": "Yes, we offer both short-term and long-term storage options. Contact us for details!",
  "assembly": "Yes, we can help with furniture assembly and disassembly as part of your move.",

  // Routes & Areas
  "where do you serve": "We serve all of New Jersey and New York, including NYC, Brooklyn, Queens, the Bronx, Staten Island, Long Island, and Westchester.",
  "areas": "We cover all of NJ and NY including NYC, the 5 boroughs, Long Island, Westchester, and surrounding areas.",
  "nj to ny": "Yes! NJ ↔ NY moves are one of our most common routes. We have extensive experience in this corridor.",
  "long distance": "Yes, we handle long-distance moves throughout NJ, NY, and nearby states. Request a quote for your destination!",
  "routes": "We serve routes across New Jersey and New York. Ask about our dedicated route agreements.",

  // Booking & Scheduling
  "how do i get a quote": "Call us at 347-756-2281, email beeflyenterprise.llc@gmail.com, or fill out the quote form on our website. It's free!",
  "quote": "To get a free quote, fill out the 'Request a Quote' form below with your move details, or call us at 347-756-2281.",
  "how far in advance": "We recommend booking at least 1-2 weeks in advance, especially for weekends. Last-minute moves may be available—call us!",
  "reschedule": "Yes! Contact us at least 48 hours before your scheduled move date to reschedule.",
  "weekends": "Yes, we operate 7 days a week, including weekends!",
  "when can you move": "We operate 7 days a week. We recommend booking 1-2 weeks in advance for the best availability.",

  // Trust & Safety
  "licensed": "Yes, we are fully licensed and insured in NJ and NY. Your move is in safe hands!",
  "insurance": "Yes, we carry full liability coverage. If anything is damaged, contact us immediately.",
  "damage": "We carry liability coverage and our team is professionally trained. If any item is damaged, we'll help resolve it immediately.",
  "safe": "Our team is professionally trained and all items are carefully wrapped and secured. We treat your belongings like our own!",
  "certified": "Yes, we are licensed, insured, and certified movers dedicated to your satisfaction.",

  // Spanish / Mudanza
  "¿cuánto cuesta": "El precio depende de la distancia, el tamaño del camión y las horas. ¡Contáctenos para un presupuesto gratis! Llame al 347-756-2281.",
  "mudanza": "Ofrecemos mudanzas locales, de larga distancia, empaque, carga/descarga, y ensamblaje de muebles.",
  "¿dónde sirven": "Servimos toda el área de NJ y NY incluyendo NYC, los 5 boroughs, Long Island y Westchester.",
  "empaque": "¡Sí! Ofrecemos servicios completos de empaque y embalaje. Pregúntenos por soluciones personalizadas.",
  "muebles pesados": "¡Absolutamente! Podemos mover pianos, cajas fuertes, electrodomésticos y muebles muy grandes.",

  // Contact & General
  "contact": "📧 Email: beeflyenterprise.llc@gmail.com\n📱 Phone: 347-756-2281\n📍 Location: Queens, New York\n📸 Instagram: @beeflyenterprisellc",
  "phone": "You can reach us at 347-756-2281. We're available 7 days a week!",
  "email": "Email us at beeflyenterprise.llc@gmail.com with your questions or move details.",
  "instagram": "Follow us on Instagram: @beeflyenterprisellc for updates and moving tips!",
  "help": "We're here to help! Ask us about our services, pricing, routes, booking, or anything else. What can we assist with today?",
  "default": "Thanks for reaching out! 😊 We're here to help. Ask us about our services, pricing, how to book, or how to get a free quote!"
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

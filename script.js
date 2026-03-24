//Cursor
const cursor = document.getElementById("cursor");
const ring   = document.getElementById("cursor-ring");
document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top  = e.clientY + "px";
  ring.style.left   = e.clientX + "px";
  ring.style.top    = e.clientY + "px";
});

//Scroll Reveal
const reveals = document.querySelectorAll(".about-card, .tech-stack-card, .project-card, .chat-wrapper, .contact-card");
function reveal() {
  const threshold = window.innerHeight * 0.88;
  reveals.forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < threshold) {
      setTimeout(() => el.classList.add("visible"), (i % 4) * 80);
    }
  });
}
window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

//Scroll Top
const flecha = document.getElementById("flecha");
window.addEventListener("scroll", () => {
  flecha.classList.toggle("show", scrollY > 400);
});
flecha.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

//Chatbot
const entrada      = document.getElementById("entrada");
const boton        = document.getElementById("enviar");
const chatContainer = document.getElementById("chat-container");
let historial = [];

function agregarMensaje(msg, clase) {
  const p = document.createElement("p");
  p.textContent = msg;
  p.classList.add(clase);
  chatContainer.appendChild(p);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function mandarChatbot(mensajeUsuario) {
  historial.push({ role: "user", content: mensajeUsuario });
  try {
    const res  = await fetch("https://backend-para-chatbot.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: historial })
    });
    const dato = await res.json();
    const msg  = dato.response;
    if (msg) {
      historial.push({ role: "assistant", content: msg });
      agregarMensaje(msg, "asistente");
    }
  } catch(e) {
    agregarMensaje("Error al conectar con el asistente. Inténtalo de nuevo.", "asistente");
  }
}

entrada.addEventListener("keydown", e => {
  if (e.key === "Enter" && !e.shiftKey && entrada.value.trim()) {
    e.preventDefault();
    const msg = entrada.value.trim();
    agregarMensaje(msg, "usuario");
    mandarChatbot(msg);
    entrada.value = "";
  }
});
boton.addEventListener("click", () => {
  if (entrada.value.trim()) {
    const msg = entrada.value.trim();
    agregarMensaje(msg, "usuario");
    mandarChatbot(msg);
    entrada.value = "";
  }
});

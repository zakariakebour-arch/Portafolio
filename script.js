const flecha = document.querySelector("#flecha");
const entrada = document.querySelector("#entrada");
const boton = document.querySelector("#enviar");
const chatContainer = document.querySelector("#chat-container"); 
const cursor = document.getElementById("cursor");

let historial = [];

function agregarMensaje(mensaje, clase) {
    const p = document.createElement("p");
    p.textContent = mensaje;
    p.classList.add(clase);
    chatContainer.appendChild(p);
    chatContainer.scrollTop = chatContainer.scrollHeight; 
}

async function mandarChatbot(mensajeUsuario) {
    historial.push({ role: "user", content: mensajeUsuario });

    const respuesta = await fetch("https://backend-para-chatbot.onrender.com/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            messages: historial
        })
    });

    const dato = await respuesta.json();
    console.log(dato); 
    const mensajeAsistente = dato.response;

    if (mensajeAsistente) {
        historial.push({ role: "assistant", content: mensajeAsistente });
        agregarMensaje(mensajeAsistente, "asistente");
    }

    return mensajeAsistente;
}

entrada.addEventListener("keydown", (e) => {
    if(e.key === "Enter" && !e.shiftKey && entrada.value.trim() !== "") {
        const mensaje = entrada.value.trim();
        agregarMensaje(mensaje, "usuario");
        mandarChatbot(mensaje).catch(console.error);
        entrada.value = "";
    }
});

boton.addEventListener("click", () => {
    if(entrada.value.trim() !== "") {
        const mensaje = entrada.value.trim();
        agregarMensaje(mensaje, "usuario"); 
        mandarChatbot(mensaje).catch(console.error);
        entrada.value = "";
    }
});

document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});

window.addEventListener("scroll", () => {
    flecha.style.display = scrollY > 30 ? "block" : "none";
});

flecha.addEventListener("click", () => {
    scrollTo({ top: 0, behavior: "smooth" });
});

const articles = document.querySelectorAll("article");
function reveal() {
    const t = window.innerHeight * 0.85;
    articles.forEach(a => {
        if(a.getBoundingClientRect().top < t){
            a.classList.add("visible");
        }
    });
}
window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);
// Aqui esta la configuracion para el cambio de modo oscuro a claro
const toggle = document.querySelector(".theme-switch__checkbox");
if (localStorage.getItem("tema") === "claro") {
    document.body.classList.add("light-mode");
    toggle.checked = true;
}
toggle.addEventListener("change", () => {
    if (toggle.checked) {
        document.body.classList.add("light-mode");
        localStorage.setItem("tema", "claro");
    } else {
        document.body.classList.remove("light-mode");
        localStorage.setItem("tema", "oscuro");
    }
});

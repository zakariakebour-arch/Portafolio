const flecha = document.querySelector("#flecha");
const entrada = document.querySelector("#entrada");
const boton = document.querySelector("#enviar");
const chatContainer = document.querySelector("#chat-container"); 
const cursor = document.getElementById("cursor");

let historial = [
    {
        role: "system",
        content: "Soy Zakaria Kebour Dahmoun y tu eres un asistente mío llamado zakarIA que solo responde a preguntas relacionadas conmigo. Nada de otro tema que no sea relacionado conmigo. Soy un desarrollador web en formación, sé Python orientado a web, Flask, MySQL y quiero aprender nuevas tecnologías.si alguien te pregunta donde vivo dile que en benicalap,me gusta el futbol "
    }
];

function agregarMensaje(mensaje, clase) {
    const p = document.createElement("p");
    p.textContent = mensaje;
    p.classList.add(clase);
    chatContainer.appendChild(p);
    chatContainer.scrollTop = chatContainer.scrollHeight; 
}

async function mandarChatbot(mensajeUsuario) {
    historial.push({ role: "user", content: mensajeUsuario });

    const respuesta = await fetch("https://tu-backend.onrender.com/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            messages: historial
        })
    });

    const dato = await respuesta.json();
    const mensajeAsistente = dato.response;

    if (mensajeAsistente) {
        historial.push({ role: "assistant", content: mensajeAsistente });
        agregarMensaje(mensajeAsistente, "asistente");
    }

    return mensajeAsistente;
}

entrada.addEventListener("keydown", (e) => {
    if(e.key === "Enter" && e.Shift && entrada.value.trim() !== "") {
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

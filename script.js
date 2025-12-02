        const flecha = document.querySelector("#flecha");
        const articles = document.querySelectorAll("article");
        function reveal(){
            const t = window.innerHeight * 0.85;
            articles.forEach(a=>{
                if(a.getBoundingClientRect().top < t){
                    a.classList.add("visible");
                }
            });
        }
        window.addEventListener("scroll", reveal);
        window.addEventListener("load", reveal);

        const cursor = document.getElementById("cursor");
        document.addEventListener("mousemove", e=>{
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
        });
        window.addEventListener("scroll",()=>{
            if(scrollY > 30){
                flecha.style.display = "block";
            }
            else{
                flecha.style.display = "none";
            }
        });
        flecha.addEventListener("click",()=>{
            scrollTo({
               top: 0,
               behavior: "smooth" 
            });
        })

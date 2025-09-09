document.addEventListener('DOMContentLoaded', () => {

    // --- INJEÇÃO DO PLAYER DE VÍDEO ---
    // COMENTÁRIO: Esta função insere o player de vídeo no local designado no HTML.
    // Isso mantém o HTML limpo e carrega o script do player de forma assíncrona.
    function injectVideoPlayer() {
        const videoPlaceholder = document.getElementById('video-placeholder');
        if (videoPlaceholder) {
            const script = document.createElement('script');
            script.src = 'https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js';
            script.async = true;
            document.head.appendChild(script);

            videoPlaceholder.innerHTML = `
                <div id="ifr_682b77713a21af615f615cf3_wrapper" style="margin: 0 auto; width: 100%;">
                    <div style="padding: 56.25% 0 0 0; position: relative;" id="ifr_682b77713a21af615f615cf3_aspect">
                        <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_682b77713a21af615f615cf3" 
                                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
                                referrerpolicy="origin" 
                                onload="this.onload=null, this.src='https://scripts.converteai.net/450e08d4-eaa1-4c84-ab4c-34d77b117dc8/players/682b77713a21af615f615cf3/v4/embed.html' + (location.search||'?') + '&vl=' + encodeURIComponent(location.href)">
                        </iframe>
                    </div>
                </div>`;
        }
    }
    
    injectVideoPlayer();


    // --- FUNCIONALIDADE DO CRONÔMETRO (COUNTDOWN) ---
    // COMENTÁRIO: Este cronômetro é "evergreen", o que significa que ele reinicia para cada novo visitante.
    // Ele usa o localStorage do navegador para que o tempo continue de onde parou se o usuário recarregar a página.
    function startCountdown() {
        const countdownElement = document.getElementById('countdown-timer');
        if (!countdownElement) return;

        const durationInMinutes = 19;
        const durationInSeconds = durationInMinutes * 60;
        
        let targetTime = localStorage.getItem('countdownTarget');

        if (!targetTime || new Date().getTime() > targetTime) {
            targetTime = new Date().getTime() + durationInSeconds * 1000;
            localStorage.setItem('countdownTarget', targetTime);
        }

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetTime - now;

            if (distance < 0) {
                clearInterval(interval);
                // COMENTÁRIO: Você pode adicionar aqui uma mensagem ou ação quando o tempo acabar.
                countdownElement.innerHTML = "Oferta encerrada!"; 
                return;
            }
            
            // O JSON original não mostrava dias e horas, apenas minutos e segundos
            // let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            // let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            countdownElement.innerHTML = `
                <div><span>${minutes}</span><small>Minutos</small></div>
                <div><span>${seconds}</span><small>Segundos</small></div>
            `;

        }, 1000);
    }
    
    startCountdown();
    

    // --- FUNCIONALIDADE DO FAQ (ACCORDION) ---
    // COMENTÁRIO: Adiciona a funcionalidade de clique para abrir e fechar as perguntas do FAQ.
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling;
            const wasActive = button.classList.contains('active');

            // Fecha todos os outros itens abertos para funcionar como um acordeão
            faqQuestions.forEach(b => {
                b.classList.remove('active');
                b.nextElementSibling.style.maxHeight = null;
            });
            
            // Abre ou fecha o item clicado
            if (!wasActive) {
                button.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

});
// Espera o conteúdo da página ser totalmente carregado para executar os scripts
document.addEventListener('DOMContentLoaded', () => {

    /**
     * Função para injetar o player de vídeo da Converte.ai.
     * Isso evita que o script do player atrase o carregamento inicial da página.
     */
    function injectVideoPlayer() {
        const videoPlaceholder = document.getElementById('video-placeholder');
        // Verifica se o elemento para o vídeo existe na página
        if (videoPlaceholder) {
            const script = document.createElement('script');
            script.src = 'https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js';
            script.async = true;
            document.head.appendChild(script);

            // Substitui o placeholder pelo iframe do vídeo
            videoPlaceholder.innerHTML = `
                <div id="ifr_682b77713a21af615f615cf3_wrapper" style="margin: 0 auto; width: 100%; border-radius: 8px; overflow: hidden;">
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


    /**
     * Função para iniciar o cronômetro "evergreen" de 19 minutos.
     * Ele usa o localStorage para que o tempo continue de onde parou para o mesmo visitante.
     */
    function startCountdown() {
        const countdownElement = document.getElementById('countdown-timer');
        if (!countdownElement) return;

        const DURATION_IN_MINUTES = 19;
        const DURATION_IN_SECONDS = DURATION_IN_MINUTES * 60;
        
        let targetTime = localStorage.getItem('countdownTargetTime');

        // Se o tempo não existir ou já tiver passado, define um novo tempo futuro
        if (!targetTime || new Date().getTime() > targetTime) {
            targetTime = new Date().getTime() + DURATION_IN_SECONDS * 1000;
            localStorage.setItem('countdownTargetTime', targetTime);
        }

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetTime - now;

            // Se o tempo acabar, zera o cronômetro
            if (distance < 0) {
                clearInterval(interval);
                countdownElement.innerHTML = `<div><span>00</span><small>Minutos</small></div><div><span>00</span><small>Segundos</small></div>`; 
                return;
            }
            
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Adiciona um zero à esquerda se o número for menor que 10
            const formattedMinutes = String(minutes).padStart(2, '0');
            const formattedSeconds = String(seconds).padStart(2, '0');

            countdownElement.innerHTML = `
                <div><span>${formattedMinutes}</span><small>Minutos</small></div>
                <div><span>${formattedSeconds}</span><small>Segundos</small></div>
            `;

        }, 1000);
    }
    
    startCountdown();
    

    /**
     * Função para a lógica do acordeão (FAQ).
     * Clicar em uma pergunta abre sua resposta e fecha as outras.
     */
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling;
            const isExpanded = button.getAttribute('aria-expanded') === 'true';

            // Fecha todos os itens antes de abrir o novo
            faqQuestions.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-expanded', 'false');
                btn.nextElementSibling.style.maxHeight = null;
            });
            
            // Se não estava ativo, abre o item clicado
            if (!isExpanded) {
                button.classList.add('active');
                button.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

});

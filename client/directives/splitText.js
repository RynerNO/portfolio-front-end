import anime from 'animejs/lib/anime.es.js';
export default {
    inserted: function (el) {
        const text = el.innerText;
        const characters = text.split('');
        el.innerHTML = '';
        const tl = anime.timeline({
            easing: 'easeOutExpo',
            delay: 1600,
            duration: 700
          });
        for (let char of characters) {
            const node = document.createElement('span');
            if(char === ' ') char = '\u00A0'
            node.addEventListener('mouseover', function () {
                node.classList.add('animateLetter');
                setTimeout(() => node.classList.remove('animateLetter'), 1000);
            })
            node.classList.add('char');
            node.style.display = 'inline-block';
            node.innerText = char;
            const elem = el.appendChild(node);
            tl.add({
                targets: elem,
                duration: 30,
                begin: function (anim) {
                    elem.classList.add('bounceIn')
                },
                complete: function (anim) {
                    setTimeout(() => {
                        elem.style.opacity = 1;
                        elem.classList.remove('bounceIn')
              
                    }, 120)
                }
            })  
        }

        
    }
}
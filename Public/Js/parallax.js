/**
 * je calcul offsetTop récursivement pour avoir la position par rapport au haut de la page.
 * @param {HTMLElement} element
 * @return {number}
 */
function offSetTop(element, acc = accumulator = 0){
    if (element.offsetParent) {
        return offSetTop(element.offsetParent, accumulator + element.offsetTop)
    }
    return accumulator + element.offsetTop;
}

class Parralax {

    /**
     * Constructor de l'élément
     * @param {HTMLElement} element 
     */
    constructor(element){
        this.element = element;
        this.ratio = parseFloat(element.dataset.parallax);
        this.onScroll = this.onScroll.bind(this);//bind this pour avoir le bon context à l'intérieur
        this.onIntersection = this.onIntersection.bind(this);//bind this pour avoir le bon context à l'intérieur
        this.elementY =  offSetTop(this.element) + this.element.offsetHeight / 2;
        const observer = new IntersectionObserver(this.onIntersection);//création observer
        observer.observe(element);
        this.onScroll();
    }

    onIntersection(entries){
        for(const entry of entries){
            if (entry.isIntersecting) {
                document.addEventListener("scroll", this.onScroll);
                window.addEventListener("resize", this.onScroll);
                this.elementY =  offSetTop(this.element) + this.element.offsetHeight / 2;
            }else{
                removeEventListener("scroll", this.onScroll);
            }
        }
    }

    /**
     * j'utilise cette valeur pour calculer la différence par rapport au centre de l'écran.
     */
    onScroll(){
        window.requestAnimationFrame(()=>{
            const screenY = window.scrollY + window.innerHeight / 2;
            const diffY = this.elementY - screenY;
            this.element.style.setProperty('transform', `translateY(${diffY * -1 * this.ratio}px)`);
            });
        
    }


    /**
     *  j'applique cette différence sur le translateY pour freiner ou accélérer la sensation de défilement.
     * @returns {Parralax[]}
     */
    static bind(){
        Array.from(document.querySelectorAll("[data-parallax]")).map((element)=>{
            return new Parralax(element);
        })
    }


}

Parralax.bind();
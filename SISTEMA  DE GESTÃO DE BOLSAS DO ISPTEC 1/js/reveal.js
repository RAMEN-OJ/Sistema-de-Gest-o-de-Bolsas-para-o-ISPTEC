// Animação de entrada: os itens aparecem ao descer E ao subir a página.
(() => {
    if (!("IntersectionObserver" in window)) return;
    let ultimo = scrollY, dir = 1;
    addEventListener("scroll", () => { dir = scrollY >= ultimo ? 1 : -1; ultimo = scrollY; }, { passive: true });
    const io = new IntersectionObserver((es) => {
        let i = 0;
        es.forEach((e) => {
            const el = e.target;
            if (e.isIntersecting) {
                el.style.setProperty("--ry", dir >= 0 ? "30px" : "-30px");
                el.style.transitionDelay = i++ * 70 + "ms";
                el.classList.add("in");
            } else { el.style.transitionDelay = "0ms"; el.classList.remove("in"); }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -4% 0px" });
    const SEL = ".card,.stat,.sec>h2,main>h1,main>.sub,main>h2,.row>.btn,tbody tr,.news-in>*,.ft3>div,.back";
    const ver = () => document.querySelectorAll(SEL).forEach((el) => {
        if (el.dataset.rv) return;
        el.dataset.rv = 1; el.classList.add("rv"); io.observe(el);
        el.addEventListener("transitionend", () => { el.style.transitionDelay = "0ms"; });
    });
    let t;
    new MutationObserver(() => { clearTimeout(t); t = setTimeout(ver, 40); }).observe(document.body, { childList: true, subtree: true });
    addEventListener("load", ver); ver();
})();

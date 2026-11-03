(() => {
    let t;
    try { t = localStorage.getItem("tema"); } catch {}
    t = t || (matchMedia("(prefers-color-scheme:dark)").matches ? "escuro" : "claro");
    document.documentElement.dataset.tema = t;
})();

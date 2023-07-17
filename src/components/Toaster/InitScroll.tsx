import React from "react"

function detector() {
    document.addEventListener("scroll", (e) => {
        const progress = document.querySelector("#progress");

        const st = window.scrollY || document.documentElement.scrollTop;
        const currTarget = e.target as HTMLElement;
        const direction = st > currTarget.scrollTop ? 'down' : 'up';

        if (Math.abs(st - currTarget.scrollTop) > 5 && progress) {
            progress.setAttribute('scroll-direction', direction);
        }
        currTarget.scrollTop = st;
    }, {
        passive: true
    })
}

export default function InitScroll() {
    const scrollFn = String(detector);
    const calledFunction = `(${scrollFn})()`;

    return <script dangerouslySetInnerHTML={{ __html: calledFunction }} ></script>
}
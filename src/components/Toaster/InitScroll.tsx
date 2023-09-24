function calculateScrollPosition() {

    window.addEventListener('scroll', e => {
        const siteHeader = document.querySelector("#site-header");
        const curr = e.target as HTMLElement;
        const st = window.scrollY || document.documentElement.scrollTop;
        const direction = st > curr.scrollTop ? 'down' : 'up';

        if (Math.abs(st - curr.scrollTop) > 5 && siteHeader) {
            siteHeader.setAttribute('scroll-direction', direction);
        }

        curr.scrollTop = st <= 0 ? 0 : st
    }, {
        passive: true
    })
}

export default function InitScroll() {
    const boundFn = String(calculateScrollPosition);
    const calledFunction = `(${boundFn})()`

    return <script dangerouslySetInnerHTML={{ __html: calledFunction }} ></script>
}
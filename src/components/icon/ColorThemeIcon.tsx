export default function ThemeIcon() {
    return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sun-and-moon" >
        <circle cx="12" cy="12" r="5" fill="#2D0D06" id="sun" className="sun" mask="url(#moon-mask)" />
        <g className="sun-beams" >
            <path d="M12 3V3.52941" strokeWidth="3" strokeLinecap="round" />
            <path d="M5.63604 5.63604L6.01039 6.01039" strokeWidth="3" strokeLinecap="round" />
            <path d="M3 12L3.52941 12" strokeWidth="3" strokeLinecap="round" />
            <path d="M5.63604 18.364L6.01039 17.9896" strokeWidth="3" strokeLinecap="round" />
            <path d="M12 20.4706V21" strokeWidth="3" strokeLinecap="round" />
            <path d="M17.9896 17.9896L18.364 18.364" strokeWidth="3" strokeLinecap="round" />
            <path d="M20.4706 12L21 12" strokeWidth="3" strokeLinecap="round" />
            <path d="M17.9896 6.01039L18.364 5.63604" strokeWidth="3" strokeLinecap="round" />
        </g>
        <mask className="moon" id="moon-mask" >
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <circle cx="24" cy="24" r="6" fill="black" />
        </mask>
    </svg>
}
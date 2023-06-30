export function LightTheme() {
    return <svg className="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="5" mask="url(#moon-mask)" fill="currentColor" className="sun" />
        <g className="sun-beams" stroke="currentColor" >
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
        <mask className="moon" id="moon-mask">
            <rect x={"0"} y={"0"} width={"100%"} height={"100%"} fill="white" />
            <circle cx={"24"} cy={"10"} r={"6"} fill="black" />
        </mask>
    </svg>

}

export function NightTheme() {
    return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M23.3225 13.51C22.2035 13.8631 21.0122 14.0535 19.7765 14.0535C13.2752 14.0535 8.00478 8.7831 8.00478 2.28175C8.00478 1.50109 8.08077 0.738172 8.22576 0C3.45731 1.50448 0 5.96262 0 11.2283C0 17.7296 5.27038 23 11.7717 23C17.4924 23 22.26 18.9193 23.3225 13.51Z" fill="#FFFDFC" />
    </svg>
}
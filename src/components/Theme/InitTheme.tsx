export default function InitTheme() {
    const codeToRunOnClient = `
        (() => {
            function getInitialColorMode() {
                const persistedColorPreference = window.localStorage.getItem("theme-preference");
                const hasPersistedPreference = typeof persistedColorPreference === 'string';
            
                if (hasPersistedPreference) {
                  return persistedColorPreference;
                }
            
                
                const mql = window.matchMedia('(prefers-color-scheme: dark)');
                const hasMediaQueryPreference = typeof mql.matches === 'boolean';
                if (hasMediaQueryPreference) {
                    if(mql.matched === "dark"){
                        setLocalStorage("dark")
                        return "dark"
                    } 
                    setLocalStorage("light")
                    return 'light';
                }
                
                return 'light';
            }

            function setLocalStorage(data){
                window.localStorage.setItem("theme-preference", data)
            }

            const colorMode = getInitialColorMode();

            const root = document.firstElementChild;

            root.setAttribute("data-color-mode", colorMode)
        }) ()`;
    return (
        <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />
    )
}
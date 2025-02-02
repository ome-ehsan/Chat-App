import { create } from "zustand";


export const useThemeStates = create( (set)=> ({
    theme : localStorage.getItem("user-theme") || "dark",
    setTheme : (theme)=>{
        localStorage.setItem("user-theme", theme),
        set({theme}) 
    }

}));


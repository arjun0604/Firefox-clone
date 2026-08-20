import React, { useContext, createContext, useEffect, useState } from "react";

export interface ShortcutItem{
    name:string;
    url:string;
    img:string;
}

interface SettingsContextType {
    wallpaper: string | null;
    setWallpaper: (url: string | null) => void;

    showShortcuts: boolean;
    setShowShortcuts: React.Dispatch<React.SetStateAction<boolean>>;

    showStories: boolean;
    setShowStories: React.Dispatch<React.SetStateAction<boolean>>;

    shortcutRows: number;
    setShortcutRows: React.Dispatch<React.SetStateAction<number>>;

    shortcuts: ShortcutItem[];
    setShortcuts: React.Dispatch<React.SetStateAction<ShortcutItem[]>>;
}

const SettingsContext=createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({children}:{children: React.ReactNode})
{
    const [wallpaper, setWallpaperState] = useState<string | null>(() => {
        return localStorage.getItem("firefox-wallpaper") || null;
      });
      const [showShortcuts, setShowShortcuts] = useState<boolean>(() => {
        const saved = localStorage.getItem("firefox-show-shortcuts");
        return saved !== null ? JSON.parse(saved) : true;
      });
      const [showStories, setShowStories] = useState<boolean>(() => {
        const saved = localStorage.getItem("firefox-show-stories");
        return saved !== null ? JSON.parse(saved) : true;
      });
      const [shortcutRows, setShortcutRows] = useState<number>(() => {
        const saved = localStorage.getItem("firefox-shortcut-rows");
        return saved !== null ? JSON.parse(saved) : 1;
      });
      const [shortcuts, setShortcuts] = useState<ShortcutItem[]>(() => {
        const saved = localStorage.getItem("firefox-shortcuts");
        if (saved) return JSON.parse(saved);
    return [
      { name: "YouTube", url: "https://www.youtube.com/", img: "src/assets/shortcuts/youtube_logo.avif" },
      { name: "ChatGPT", url: "https://chatgpt.com/", img: "src/assets/shortcuts/chatgpt_logo.png" },
      { name: "Gmail", url: "https://workspace.google.com/intl/en-US/gmail/", img: "src/assets/shortcuts/gmail_logo.webp" },
      { name: "LinkedIn", url: "https://www.linkedin.com/", img: "src/assets/shortcuts/linkedin_logo.png" },
      { name: "Netflix", url: "https://www.netflix.com/", img: "src/assets/shortcuts/netflix_logo.png" },
      { name: "Amazon", url: "https://www.amazon.com/", img: "src/assets/shortcuts/amazon_logo.webp" },
    ];
  });

  const setWallpaper = (url: string | null) => {
    setWallpaperState(url);
    if (url) {
      localStorage.setItem("firefox-wallpaper", url);
      document.documentElement.style.background = `url('${url}') center/cover no-repeat fixed`;
      document.body.style.background = "transparent";
    } else {
      localStorage.removeItem("firefox-wallpaper");
      document.documentElement.style.background = "";
      document.body.style.background = "";
    }
  };
 
  useEffect(() => {
    localStorage.setItem("firefox-shortcuts", JSON.stringify(shortcuts));
  }, [shortcuts]);
  useEffect(() => {
    localStorage.setItem("firefox-show-shortcuts", JSON.stringify(showShortcuts));
  }, [showShortcuts]);
  useEffect(() => {
    localStorage.setItem("firefox-show-stories", JSON.stringify(showStories));
  }, [showStories]);
  useEffect(() => {
    localStorage.setItem("firefox-shortcut-rows", JSON.stringify(shortcutRows));
  }, [shortcutRows]);
  
  useEffect(() => {
    if (wallpaper) {
      document.documentElement.style.background = `url('${wallpaper}') center/cover no-repeat fixed`;
      document.body.style.background = "transparent";
    }
  }, []);

  return(
    <SettingsContext.Provider
    value={{
        wallpaper,
        setWallpaper,
        showShortcuts,
        setShowShortcuts,
        showStories,
        setShowStories,
        shortcutRows,
        setShortcutRows,
        shortcuts,
        setShortcuts,
    }}
    >
        {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(){
    const context=useContext(SettingsContext);
    if(!context){
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
}
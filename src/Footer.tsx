import React, { useEffect, useRef } from "react"
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    DrawerClose,
} from "@/components/ui/drawer"
import { Switch } from "@/components/ui/switch"

interface FooterProps {
    showShortcuts: boolean;
    setShowShortcuts: (val: boolean) => void;
    showStories: boolean;
    setShowStories: (val: boolean) => void;
    shortcutRows: number;
    setShortcutRows: (val: number) => void;
    maxRows: number;
}

export default function Footer({ showShortcuts, setShowShortcuts, showStories, setShowStories, shortcutRows, setShortcutRows, maxRows }: FooterProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const applyBackground = (url: string | null) => {
        if (url) {
            document.documentElement.style.background = `url('${url}') center/cover no-repeat fixed`;
            document.body.style.background = "transparent";
        } else {
            document.documentElement.style.background = "";
            document.body.style.background = "";
        }
    };

    useEffect(() => {
        const saved = localStorage.getItem("firefox-wallpaper");
        if (saved) {
            applyBackground(saved);
        }
    }, []);

    const handleWallpaperSelect = (url: string) => {
        try {
            localStorage.setItem("firefox-wallpaper", url);
            applyBackground(url);
        } catch (e) {
            console.error("Failed to save wallpaper to local storage. It might be too large.", e);
            applyBackground(url);
        }
    };

    const handleReset = () => {
        localStorage.removeItem("firefox-wallpaper");
        applyBackground(null);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const url = event.target?.result as string;
                handleWallpaperSelect(url);
            };
            reader.readAsDataURL(file);
        }

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="fixed bottom-6 right-7">
            <Drawer swipeDirection="right">
                <DrawerTrigger className="bg-[#2B2A3A] hover:bg-[#423A5A] transition-colors rounded-xl p-3 text-white flex flex-row items-center gap-2 cursor-pointer shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 -960 960 960" fill="#e3e3e3">
                        <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                    </svg>
                    Customize
                </DrawerTrigger>
                <DrawerContent className="bg-[#2B2A3A] text-white border-gray-800 w-2/5 sm:w-96 lg:w-125">
                    <DrawerClose className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none cursor-pointer p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 -960 960 960" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                        <span className="sr-only">Close</span>
                    </DrawerClose>
                    <div className="flex flex-col mx-auto w-full px-2 sm:px-6 mt-10 sm:mt-15">
                        <DrawerHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-0">
                            <DrawerTitle className="text-white text-sm sm:text-base">Wallpapers</DrawerTitle>
                            <a onClick={handleReset} className="cursor-pointer text-xs text-gray-400 hover:text-white transition-colors">Reset to Default</a>
                        </DrawerHeader>
                        <div className="p-2 sm:p-4 pb-0">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                                <button type="button"
                                    onClick={() => handleWallpaperSelect("src/assets/wallpapers/animal.jpg")}
                                    className="group bg-transparent border-0 p-0 cursor-pointer focus:outline-none"
                                >
                                    <img
                                        src="src/assets/wallpapers/animal.jpg"
                                        alt="Set this animals photo as page background"
                                        className="w-full h-14 sm:h-24 object-cover rounded-xl shadow-lg group-hover:scale-105 group-hover:brightness-110 transition-all duration-200"
                                    >
                                    </img>
                                    <h3 className="mt-1 sm:mt-3 text-center text-xs sm:text-sm font-medium text-gray-300 font-sans tracking-wide">Animal</h3>
                                </button>
                                <button type="button"
                                    onClick={() => handleWallpaperSelect("src/assets/wallpapers/mountain.jpeg")}
                                    className="group bg-transparent border-0 p-0 cursor-pointer focus:outline-none"
                                >
                                    <img
                                        src="src/assets/wallpapers/mountain.jpeg"
                                        alt="Set this mountain photo as page background"
                                        className="w-full h-14 sm:h-24 object-cover rounded-xl shadow-lg group-hover:scale-105 group-hover:brightness-110 transition-all duration-200"
                                    >
                                    </img>
                                    <h3 className="mt-1 sm:mt-3 text-center text-xs sm:text-sm font-medium text-gray-300 font-sans tracking-wide">Mountain</h3>
                                </button>
                                <button type="button"
                                    onClick={() => handleWallpaperSelect("src/assets/wallpapers/sea.jpg")}
                                    className="group bg-transparent border-0 p-0 cursor-pointer focus:outline-none"
                                >
                                    <img
                                        src="src/assets/wallpapers/sea.jpg"
                                        alt="Set this sea photo as page background"
                                        className="w-full h-14 sm:h-24 object-cover rounded-xl shadow-lg group-hover:scale-105 group-hover:brightness-110 transition-all duration-200"
                                    >
                                    </img>
                                    <h3 className="mt-1 sm:mt-3 text-center text-xs sm:text-sm font-medium text-gray-300 font-sans tracking-wide">Sea</h3>
                                </button>
                                <button type="button"
                                    onClick={() => handleWallpaperSelect("src/assets/wallpapers/solid.avif")}
                                    className="group bg-transparent border-0 p-0 cursor-pointer focus:outline-none"
                                >
                                    <img
                                        src="src/assets/wallpapers/solid.avif"
                                        alt="Set this solid photo as page background"
                                        className="w-full h-14 sm:h-24 object-cover rounded-xl shadow-lg group-hover:scale-105 group-hover:brightness-110 transition-all duration-200"
                                    >
                                    </img>
                                    <h3 className="mt-1 sm:mt-3 text-center text-xs sm:text-sm font-medium text-gray-300 font-sans tracking-wide">Solid</h3>
                                </button>

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                />
                                <button type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="group bg-transparent border-0 p-0 cursor-pointer focus:outline-none"
                                >
                                    <div className="flex justify-center items-center border-2 border-dashed border-gray-500 w-full h-14 sm:h-24 rounded-xl shadow-lg group-hover:scale-105 group-hover:brightness-110 group-hover:border-gray-300 bg-black/20 hover:bg-black/40 transition-all duration-200">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 -960 960 960" fill="#e3e3e3">
                                            <path d="M480-480ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h320v80H200v560h560v-320h80v320q0 33-23.5 56.5T760-120H200Zm40-160h480L570-480 450-320l-90-120-120 160Zm440-320v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z" />
                                        </svg>
                                    </div>
                                    <h3 className="mt-1 sm:mt-3 text-center text-xs sm:text-sm font-medium text-gray-300 font-sans tracking-wide">Upload Image</h3>
                                </button>
                            </div>
                            <hr className="mt-7 mb-10 border-gray-700" />
                            <div className="flex gap-4 w-full">
                                <Switch
                                    id="shortcuts-toggle"
                                    className="mt-1 data-selected:bg-green-500 data-checked:bg-green-500"
                                    isSelected={showShortcuts}
                                    onChange={setShowShortcuts}
                                />
                                <div className="flex-1">
                                    <h3 className="text-xs sm:text-base">Shortcuts</h3>
                                    <h4 className="text-gray-400 my-1 text-xs sm:text-sm">Sites you save or visit</h4>
                                    <select
                                        className="my-1 p-1 sm:p-2 w-full sm:w-37 text-white text-xs sm:text-sm custom-select border border-gray-400 rounded bg-transparent"
                                        name="shortcut"
                                        aria-label="Shortcuts rows"
                                        value={shortcutRows.toString()}
                                        onChange={(e) => setShortcutRows(Number(e.target.value))}
                                    >
                                        {Array.from({ length: maxRows }).map((_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1} Row{i > 0 ? 's' : ''}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-4 mt-7 w-full">
                                <Switch
                                    id="stories-toggle"
                                    className="mt-1 data-selected:bg-green-500 data-checked:bg-green-500"
                                    isSelected={showStories}
                                    onChange={setShowStories}
                                />
                                <div className="flex-1">
                                    <h3 className="text-xs sm:text-base">Recommended stories</h3>
                                    <h4 className="text-gray-400 my-1 text-xs sm:text-sm">Exceptional content curated by the firefox family</h4>
                                </div>
                            </div>
                            <hr className="mt-7 mb-10 border-gray-700" />
                            <a className="cursor-pointer text-sm text-gray-400 hover:text-white transition-colors">Manage more Settings</a>
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
}
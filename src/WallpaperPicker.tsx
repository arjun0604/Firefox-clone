import React, { useState, useEffect, useRef } from "react"
import { DrawerHeader, DrawerTitle } from "@/components/ui/drawer"

export default function WallpaperPicker() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [customWallpapers, setCustomWallpapers] = useState<string[]>(() => {
        const saved = localStorage.getItem("firefox-custom-wallpapers");
        return saved ? JSON.parse(saved) : [];
    });

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
                if (url) {
                    setCustomWallpapers((prev) => {
                        const updated = prev.includes(url) ? prev : [...prev, url];
                        try {
                            localStorage.setItem("firefox-custom-wallpapers", JSON.stringify(updated));
                        } catch (err) {
                            console.error("Failed to save custom wallpapers to local storage", err);
                        }
                        return updated;
                    });
                    handleWallpaperSelect(url);
                }
            };
            reader.readAsDataURL(file);
        }

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <>
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
                        />
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
                        />
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
                        />
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
                        />
                        <h3 className="mt-1 sm:mt-3 text-center text-xs sm:text-sm font-medium text-gray-300 font-sans tracking-wide">Solid</h3>
                    </button>

                    {customWallpapers.map((url, index) => (
                        <button
                            key={`custom-${index}`}
                            type="button"
                            onClick={() => handleWallpaperSelect(url)}
                            className="group bg-transparent border-0 p-0 cursor-pointer focus:outline-none"
                        >
                            <img
                                src={url}
                                alt={`Custom uploaded wallpaper ${index + 1}`}
                                className="w-full h-14 sm:h-24 object-cover rounded-xl shadow-lg group-hover:scale-105 group-hover:brightness-110 transition-all duration-200"
                            />
                            <h3 className="mt-1 sm:mt-3 text-center text-xs sm:text-sm font-medium text-gray-300 font-sans tracking-wide">
                                Custom {customWallpapers.length > 1 ? index + 1 : ""}
                            </h3>
                        </button>
                    ))}

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
            </div>
        </>
    );
}

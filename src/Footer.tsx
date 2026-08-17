import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerClose,
} from "@/components/ui/drawer"
import WallpaperPicker from "./WallpaperPicker"
import DrawerSettings from "./DrawerSettings"

interface FooterProps {
    showShortcuts: boolean;
    setShowShortcuts: (val: boolean) => void;
    showStories: boolean;
    setShowStories: (val: boolean) => void;
    shortcutRows: number;
    setShortcutRows: (val: number) => void;
    maxRows: number;
}

export default function Footer({
    showShortcuts,
    setShowShortcuts,
    showStories,
    setShowStories,
    shortcutRows,
    setShortcutRows,
    maxRows
}: FooterProps) {
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
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 -960 960 960" fill="#e3e3e3">
                            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                        </svg>
                        <span className="sr-only">Close</span>
                    </DrawerClose>
                    <div className="flex flex-col mx-auto w-full px-2 sm:px-6 mt-10 sm:mt-15">
                        <WallpaperPicker />
                        <hr className="mt-7 mb-7 border-gray-700 mx-2 sm:mx-4" />
                        <DrawerSettings
                            showShortcuts={showShortcuts}
                            setShowShortcuts={setShowShortcuts}
                            showStories={showStories}
                            setShowStories={setShowStories}
                            shortcutRows={shortcutRows}
                            setShortcutRows={setShortcutRows}
                            maxRows={maxRows}
                        />
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
}
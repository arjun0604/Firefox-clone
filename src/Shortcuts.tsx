import { useState } from "react";
import Shortcut from "./Shortcut";
import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface ShortcutData {
    name: string;
    url: string;
    img: string;
}

interface ShortcutsProps {
    rows?: number;
    shortcuts: ShortcutData[];
    setShortcuts: (s: ShortcutData[]) => void;
}

export default function Shortcuts({ rows = 1, shortcuts, setShortcuts }: ShortcutsProps) {
    const [open, setOpen] = useState(false);
    const [newShortcut, setNewShortcut] = useState<ShortcutData>({ name: "", url: "", img: "" });

    const handleAdd = () => {
        if (newShortcut.name && newShortcut.url && newShortcut.img) {
            setShortcuts([...shortcuts, newShortcut]);
            setNewShortcut({ name: "", url: "", img: "" });
            setOpen(false);
        }
    };

    const maxItems = rows * 6;

    return (
        <div className="flex justify-center mt-4">
            <div className="grid grid-cols-6 gap-6 w-[800px] justify-items-center">
                {shortcuts.slice(0, maxItems).map((s, idx) => (
                    <Shortcut key={idx} name={s.name} url={s.url} img={s.img} />
                ))}

                {shortcuts.length < maxItems && (
                    <>
                        <div className="flex flex-col items-center">
                            <button type="button" onClick={() => setOpen(true)} className="w-16 h-16 rounded-full bg-[#2B2A3A] flex items-center justify-center mt-10 mr-4 ml-4 shadow-lg hover:shadow-2xl hover:scale-120 hover:bg-[#423A5A] transition-all duration-200 border-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2B2A3A]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 -960 960 960" fill="#e3e3e3">
                                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                                </svg>
                            </button>
                            <p className="text-white text-sm mt-2 font-medium">Add</p>
                        </div>
                        <Dialog isOpen={open} onOpenChange={setOpen} className="sm:max-w-[425px] bg-[#2B2A3A] text-white border-gray-800">
                            <DialogHeader>
                                <DialogTitle>Add Shortcut</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">Name</Label>
                                    <Input id="name" value={newShortcut.name} onChange={(e) => setNewShortcut({...newShortcut, name: e.target.value})} className="col-span-3 bg-[#1C1B22] border-gray-700 text-white" placeholder="e.g. GitHub" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="url" className="text-right">Site URL</Label>
                                    <Input id="url" value={newShortcut.url} onChange={(e) => setNewShortcut({...newShortcut, url: e.target.value})} className="col-span-3 bg-[#1C1B22] border-gray-700 text-white" placeholder="https://github.com" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="img" className="text-right">Image URL</Label>
                                    <Input id="img" value={newShortcut.img} onChange={(e) => setNewShortcut({...newShortcut, img: e.target.value})} className="col-span-3 bg-[#1C1B22] border-gray-700 text-white" placeholder="https://..." />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="button" onPress={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
                            </DialogFooter>
                        </Dialog>
                    </>
                )}
            </div>
        </div>
    );
}


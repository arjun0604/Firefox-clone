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
    const [editOpen, setEditOpen] = useState(false);
    const [editShortcut, setEditShortcut] = useState<ShortcutData>({ name: "", url: "", img: "" });
    const [editIndex, setEditIndex] = useState<number>(-1);

    const handleAdd = () => {
        if (newShortcut.name && newShortcut.url && newShortcut.img) {
            setShortcuts([...shortcuts, newShortcut]);
            setNewShortcut({ name: "", url: "", img: "" });
            setOpen(false);
        }
    };

    const onDelete = (nameToDelete: string) => {
        setShortcuts(shortcuts.filter(s => s.name !== nameToDelete));
    }

    const onEdit = (nameToEdit: string) => {
        const idx = shortcuts.findIndex((shortcut) => shortcut.name === nameToEdit);
        if (idx !== -1) {
            setEditIndex(idx);
            setEditShortcut(shortcuts[idx]);
            setEditOpen(true);
        }
    }

    const handleSaveEdit = () => {
        if (editShortcut.name && editShortcut.url && editShortcut.img) {
            setShortcuts(shortcuts.map((s, i) => i === editIndex ? editShortcut : s));
            setEditOpen(false);
        }
    };

    const maxItems = rows * 6;

    return (
        <div className="flex justify-center mt-4 px-4">
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4 lg:gap-6 w-full max-w-5xl justify-items-center">
                {shortcuts.slice(0, maxItems).map((s, idx) => (
                    <Shortcut key={idx} name={s.name} url={s.url} img={s.img} onDelete={() => onDelete(s.name)} onEdit={() => onEdit(s.name)} />
                ))}

                {shortcuts.length < maxItems && (
                    <div className="flex flex-col items-center">
                        <button type="button" onClick={() => setOpen(true)} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#2B2A3A] flex items-center justify-center mt-6 sm:mt-10 mx-2 sm:mx-4 shadow-lg hover:shadow-2xl hover:scale-120 hover:bg-[#423A5A] transition-all duration-200 border-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2B2A3A]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 -960 960 960" fill="#e3e3e3">
                                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                            </svg>
                        </button>
                        <p className="text-white text-xs sm:text-sm mt-2 font-medium">Add</p>
                    </div>
                )}
            </div>

            <Dialog isOpen={open} onOpenChange={setOpen} className="sm:max-w-106.25 bg-[#2B2A3A] text-white border-gray-800">
                <DialogHeader>
                    <DialogTitle>Add Shortcut</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="add-name" className="text-right">Name</Label>
                        <Input id="add-name" value={newShortcut.name} onChange={(e) => setNewShortcut({ ...newShortcut, name: e.target.value })} className="col-span-3 bg-[#1C1B22] border-gray-700 text-white" placeholder="e.g. GitHub" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="add-url" className="text-right">Site URL</Label>
                        <Input id="add-url" value={newShortcut.url} onChange={(e) => setNewShortcut({ ...newShortcut, url: e.target.value })} className="col-span-3 bg-[#1C1B22] border-gray-700 text-white" placeholder="https://www.github.com" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="add-img" className="text-right">Image URL</Label>
                        <Input id="add-img" value={newShortcut.img} onChange={(e) => setNewShortcut({ ...newShortcut, img: e.target.value })} className="col-span-3 bg-[#1C1B22] border-gray-700 text-white" placeholder="https://..." />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" onPress={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
                </DialogFooter>
            </Dialog>

            <Dialog isOpen={editOpen} onOpenChange={setEditOpen} className="sm:max-w-106.25 bg-[#2B2A3A] text-white border-gray-800">
                <DialogHeader>
                    <DialogTitle>Edit Shortcut</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-name" className="text-right">Name</Label>
                        <Input id="edit-name" value={editShortcut.name} onChange={(e) => setEditShortcut({ ...editShortcut, name: e.target.value })} className="col-span-3 bg-[#1C1B22] border-gray-700 text-white" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-url" className="text-right">Site URL</Label>
                        <Input id="edit-url" value={editShortcut.url} onChange={(e) => setEditShortcut({ ...editShortcut, url: e.target.value })} className="col-span-3 bg-[#1C1B22] border-gray-700 text-white" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-img" className="text-right">Image URL</Label>
                        <Input id="edit-img" value={editShortcut.img} onChange={(e) => setEditShortcut({ ...editShortcut, img: e.target.value })} className="col-span-3 bg-[#1C1B22] border-gray-700 text-white" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" onPress={handleSaveEdit} className="bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}

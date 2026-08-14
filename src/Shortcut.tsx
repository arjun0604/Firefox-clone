"use client"
import { PencilIcon, TrashIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
  

interface ShortcutProps {
    name: string;
    url: string;
    img: string;
    onDelete: () => void;
    onEdit: () => void;
}

function Shortcut({ name, url, img, onDelete, onEdit }: ShortcutProps) {
    return (
        <div className="group relative flex flex-col items-center">
            <div className="absolute top-5 right-2">
                <DropdownMenuTrigger>
                    <Button className="bg-transparent border-0 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20 hover:text-white rounded-full w-8 h-8 p-0"variant="ghost">...</Button>
                    <DropdownMenu className="bg-gray-700 border-gray-700 text-white shadow-xl">
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="hover:bg-[#423A5A] focus:bg-[#423A5A] hover:text-white focus:text-white cursor-pointer" onAction={() => onEdit()}>
                                <PencilIcon />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onAction={() => onDelete()} variant="destructive" className="hover:bg-red-900/30 focus:bg-red-900/30 text-red-500 cursor-pointer">
                                <TrashIcon />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenu>
                </DropdownMenuTrigger>
            </div>
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden flex items-center justify-center mt-6 sm:mt-10 mx-2 sm:mx-4 shadow-lg hover:shadow-2xl hover:scale-120 transition-all duration-200 border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2B2A3A]"
            >
                <img
                    src={img}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </a>

            <p className="text-white text-sm mt-2 font-medium">
                {name}
            </p>
        </div>
    );
}

export default Shortcut;
interface ShortcutProps {
    name: string;
    url: string;
    img: string;
}

function Shortcut({ name, url, img }: ShortcutProps) {
    return (
        <div className="flex flex-col items-center">
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center mt-10 mr-4 ml-4 shadow-lg hover:shadow-2xl hover:scale-120 transition-all duration-200 border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2B2A3A]"
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
import { Switch } from "@/components/ui/switch";
import { useSettings } from "./context/SettingsContext";

export default function DrawerSettings(){
    const{
        showShortcuts,
        setShowShortcuts,
        showStories,
        setShowStories,
        shortcutRows,
        setShortcutRows,
        shortcuts
    } = useSettings();

    const maxRows = Math.ceil((shortcuts.length + 1) / 6);

    return (
        <div className="p-2 sm:p-4 pt-0">
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
    );
}

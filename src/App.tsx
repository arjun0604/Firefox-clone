import { useState, useEffect } from "react"
import Header from "./Header"
import Shortcuts from "./Shortcuts"
import NewsBody from "./NewsBody"
import Footer from "./Footer"

function App() {
  const [showShortcuts, setShowShortcuts] = useState(() => {
    const saved = localStorage.getItem("firefox-show-shortcuts");
    return saved !== null ? JSON.parse(saved) : true;
  });
  
  const [showStories, setShowStories] = useState(() => {
    const saved = localStorage.getItem("firefox-show-stories");
    return saved !== null ? JSON.parse(saved) : true;
  });
  
  const [shortcutRows, setShortcutRows] = useState<number>(() => {
    const saved = localStorage.getItem("firefox-shortcut-rows");
    return saved !== null ? JSON.parse(saved) : 1;
  });
  
  const [shortcuts, setShortcuts] = useState(() => {
    const saved = localStorage.getItem("firefox-shortcuts");
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { name: "YouTube", url: "https://www.youtube.com/", img: "src/assets/shortcuts/youtube_logo.avif" },
      { name: "ChatGPT", url: "https://chatgpt.com/", img: "src/assets/shortcuts/chatgpt_logo.png" },
      { name: "Gmail", url: "https://workspace.google.com/intl/en-US/gmail/", img: "src/assets/shortcuts/gmail_logo.webp" },
      { name: "LinkedIn", url: "https://www.linkedin.com/", img: "src/assets/shortcuts/linkedin_logo.png" },
      { name: "Netflix", url: "https://www.netflix.com/", img: "src/assets/shortcuts/netflix_logo.png" },
      { name: "Amazon", url: "https://www.amazon.com/", img: "src/assets/shortcuts/amazon_logo.webp" },
    ];
  });
  
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
  
  const maxRows = Math.ceil((shortcuts.length + 1) / 6);

  return (
    <div>
      <Header/>
      {showShortcuts && <Shortcuts rows={shortcutRows} shortcuts={shortcuts} setShortcuts={setShortcuts} />}
      {showStories && <NewsBody/>}
      <Footer 
        showShortcuts={showShortcuts} 
        setShowShortcuts={setShowShortcuts} 
        showStories={showStories} 
        setShowStories={setShowStories} 
        shortcutRows={shortcutRows}
        setShortcutRows={setShortcutRows}
        maxRows={maxRows}
      />
    </div>
  )
}

export default App

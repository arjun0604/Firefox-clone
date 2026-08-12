import Header from "./Header"
import Shortcut from "./Shortcut"

function App() {

  return (
    <div className="bg-[#210340] text-white min-h-screen">
      <Header/>
      <div className="flex column justify-center">
      <Shortcut name="Youtube" 
                url="https://www.youtube.com/"
                img="src/assets/shortcuts/youtube_logo.avif"
      />

      <Shortcut name="ChatGPT"
                url="https://chatgpt.com/"
                img="src/assets/shortcuts/chatgpt_logo.png"
      />

      <Shortcut name="Gmail"
                url="https://workspace.google.com/intl/en-US/gmail/"
                img="src/assets/shortcuts/gmail_logo.webp"
      />

      <Shortcut name="LinkedIn"
                url="https://www.linkedin.com/"
                img="src/assets/shortcuts/linkedin_logo.png"
      />

      <Shortcut name="Netflix"
                url="https://www.netflix.com/"
                img="src/assets/shortcuts/netflix_logo.png"
      />

      <Shortcut name="Amazon"
                url="https://www.amazon.com/"
                img="src/assets/shortcuts/amazon_logo.webp"
      />

      </div>
      
    </div>
  )
}

export default App

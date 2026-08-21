import { useSettings } from "../context/SettingsContext";
import Header from "../Header";
import Shortcuts from "../Shortcuts";
import NewsBody from "../NewsBody";
import Footer from "../Footer";

export default function HomePage(){
  const {
    showShortcuts,
    showStories,
  } = useSettings();

  return (
    <div className="overscroll-y-none">
      <Header />
      {showShortcuts && <Shortcuts/>}
      {showStories && <NewsBody />}
      <Footer />
    </div>
  );
}
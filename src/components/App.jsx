import MarketCap from "../pages/MarketCap";
import Navbar from "./Navbar";

export default function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <div className="container mx-auto p-4">
        <MarketCap />
      </div>
    </div>
  );
}

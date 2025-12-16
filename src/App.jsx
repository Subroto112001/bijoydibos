import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { Download, Upload, Type } from "lucide-react";
import NewspaperPreview from "./components/NewspaperPreview";

const App = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [headline, setHeadline] = useState("");
  const [userImage, setUserImage] = useState(null);
  const cardRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a URL for the uploaded file
      setUserImage(URL.createObjectURL(file));
    }
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      // html2canvas config
      // scale: 2 is usually enough for mobile and ensures faster processing than 3
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#fdfbf7",
      });

      // Trigger Download
      const link = document.createElement("a");
      link.download = `BijoyBarta-${name || "71"}.png`;
      link.href = canvas.toDataURL("image/png");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Download Error:", err);
      alert("Something went wrong! Check console.");
    }
  };

  return (
    <div className="min-h-screen bg-[#e7e5e4] py-8 px-4 flex flex-col lg:flex-row items-start lg:items-center justify-center gap-8 lg:gap-12 font-sans overflow-x-hidden">
      {/* Left: Preview Section */}
      <div className="w-full max-w-[450px] mx-auto lg:mx-0 transform md:rotate-1 hover:rotate-0 transition duration-500 shadow-2xl mb-8 lg:mb-0">
        <NewspaperPreview
          ref={cardRef}
          name={name}
          location={location}
          headline={headline}
          userImage={userImage}
        />
        <p className="text-center text-xs text-gray-500 mt-4 uppercase tracking-widest hidden md:block">
          Live Preview
        </p>
      </div>

      {/* Right: Controls Section */}
      <div className="w-full max-w-md mx-auto lg:mx-0 bg-white p-6 rounded-lg shadow-xl border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 flex items-center gap-2">
          📰{" "}
          <span style={{ fontFamily: "Hind Siliguri" }}>পত্রিকা সম্পাদক</span>
        </h2>

        <div className="space-y-4">
          {/* Headline */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">
              শিরোনাম
            </label>
            <div className="flex items-center border border-gray-300 rounded p-2 mt-1 focus-within:ring-2 ring-gray-400">
              <Type size={16} className="text-gray-400 mr-2 shrink-0" />
              <input
                type="text"
                maxLength={35}
                placeholder="শিরোনাম লিখুন..."
                className="w-full outline-none text-sm"
                style={{ fontFamily: "Hind Siliguri" }}
                onChange={(e) => setHeadline(e.target.value)}
              />
            </div>
          </div>

          {/* Name & Location */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">
               প্রতিবেদকের নাম
              </label>
              <input
                type="text"
                placeholder="আপনার নাম"
                className="w-full border border-gray-300 p-2 rounded mt-1 text-sm outline-none focus:ring-2 ring-gray-400"
                style={{ fontFamily: "Hind Siliguri" }}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">
                শহর
              </label>
              <input
                type="text"
                placeholder="ঢাকা"
                className="w-full border border-gray-300 p-2 rounded mt-1 text-sm outline-none focus:ring-2 ring-gray-400"
                style={{ fontFamily: "Hind Siliguri" }}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          {/* Image Upload */}
          <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
            <Upload size={20} className="text-gray-400 mb-1" />
            <span className="text-xs text-gray-500">ছবি আপলোড করুন</span>
            <input
              type="file"
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*"
            />
          </label>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="w-full bg-[#1a1a1a] text-white font-bold py-3 rounded hover:bg-[#b91c1c] transition duration-300 flex items-center justify-center gap-2"
          >
            <Download size={18} /> প্রিন্ট করুন
          </button>
          <p className="text-center text-[12px] italic text-gray-500 mt-2">
            Developed by:{" "}
            <a
              href="https://skbarman.me/"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-gray-600 transition"
            >
              Subroto Kumar Barman
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;

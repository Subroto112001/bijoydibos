import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import {
  Download,
  Upload,
  Type,
  MapPin,
  CalendarDays,
  User,
} from "lucide-react";
import NewspaperPreview from "./components/NewspaperPreview";

const App = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [headline, setHeadline] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [isVintageDate, setIsVintageDate] = useState(true);

  const cardRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setUserImage(URL.createObjectURL(file));
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      // 1. সাময়িকভাবে স্কেল ঠিক করা (যাতে ডাউনলোডে জুম আউট না থাকে)
      const originalStyle = cardRef.current.style.transform;
      cardRef.current.style.transform = "none";

      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#f0f0eb",
      });

      // 2. ডাউনলোড শেষে আবার আগের অবস্থায় ফেরত আনা (না হলে UI ভেঙে যাবে)
      cardRef.current.style.transform = originalStyle;

      const link = document.createElement("a");
      link.download = `BijoyBarta-${name || "News"}.png`;
      link.href = canvas.toDataURL("image/png");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error:", err);
      alert("Download failed.");
    }
  };

  return (
    // মেইন কন্টেইনার: মোবাইলে flex-col (লম্বালম্বি), পিসিতে flex-row (পাশাপাশি)
    <div className="min-h-screen w-full bg-[#222222] flex flex-col lg:flex-row items-center justify-center p-4 lg:p-10 gap-6 font-sans overflow-x-hidden">
      {/* --- অংশ ১: পত্রিকার প্রিভিউ --- */}
      {/* মোবাইলে হাইট ফিক্স করা হয়েছে যাতে স্কেলিং এর কারণে স্পেস নষ্ট না হয় */}
      <div className="relative w-full lg:w-auto flex justify-center items-center h-[500px] sm:h-[600px] lg:h-auto overflow-hidden lg:overflow-visible">
        {/* স্কেলিং লজিক: মোবাইলে ৬৫% সাইজ, ট্যাবে ৮৫%, পিসিতে ১০০% */}
        <div className="transform scale-[0.65] sm:scale-[0.85] lg:scale-100 transition-transform duration-300 origin-center lg:origin-top shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-white p-1">
          <NewspaperPreview
            ref={cardRef}
            name={name}
            location={location}
            headline={headline}
            userImage={userImage}
            isVintageDate={isVintageDate}
          />
        </div>
      </div>

      {/* --- অংশ ২: কন্ট্রোল প্যানেল --- */}
      <div className="w-full max-w-sm bg-[#1a1a1a] text-white p-6 rounded-lg shadow-2xl border border-[#333] z-10">
        <div className="text-center border-b border-[#444] pb-4 mb-5">
          <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-gray-100">
            সম্পাদক প্যানেল
          </h2>
          <p className="text-[10px] text-gray-500 mt-1 uppercase">
            Create Your History
          </p>
        </div>

        <div className="space-y-4">
          {/* Headline */}
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
              প্রধান শিরোনাম
            </label>
            <div className="flex items-center bg-[#262626] border border-[#444] rounded mt-1 p-2 focus-within:border-gray-400 transition-colors">
              <Type size={16} className="text-gray-500 mr-2" />
              <input
                type="text"
                maxLength={30}
                placeholder="শিরোনাম লিখুন..."
                className="w-full bg-transparent outline-none text-sm text-white placeholder-gray-600"
                onChange={(e) => setHeadline(e.target.value)}
              />
            </div>
          </div>

          {/* Name & Location */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                প্রতিবেদক
              </label>
              <div className="flex items-center bg-[#262626] border border-[#444] rounded mt-1 p-2">
                <User size={14} className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="নাম"
                  className="w-full bg-transparent outline-none text-sm text-gray-200 placeholder-gray-600"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                স্থান
              </label>
              <div className="flex items-center bg-[#262626] border border-[#444] rounded mt-1 p-2">
                <MapPin size={14} className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="ঢাকা"
                  className="w-full bg-transparent outline-none text-sm text-gray-200 placeholder-gray-600"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Toggle & Upload */}
          <button
            onClick={() => setIsVintageDate(!isVintageDate)}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold bg-[#262626] border border-[#444] hover:bg-[#333] text-gray-300 transition rounded"
          >
            <CalendarDays size={14} />
            {isVintageDate
              ? "সংস্করণ: ১৬ই ডিসেম্বর ১৯৭১"
              : "সংস্করণ: আজকের তারিখ (২০২৫)"}
          </button>

          <label className="flex flex-col items-center justify-center w-full h-20 border border-dashed border-[#555] rounded hover:bg-[#262626] cursor-pointer transition group">
            <Upload
              size={22}
              className="text-gray-500 group-hover:text-gray-300 mb-1 transition"
            />
            <span className="text-xs text-gray-400 group-hover:text-gray-200">
              ছবি নির্বাচন করুন
            </span>
            <input
              type="file"
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*"
            />
          </label>

          {/* Download */}
          <button
            onClick={handleDownload}
            className="w-full bg-white text-black font-bold py-3 uppercase tracking-[0.15em] hover:bg-gray-200 active:scale-95 transition mt-2 rounded flex items-center justify-center gap-2 shadow-lg"
          >
            <Download size={18} /> প্রিন্ট করুন
          </button>

          <p className="text-center text-[14px] italic">
            Developed by :{" "}
            <a href="https://skbarman.me/">Subroto Kumar Barman</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;

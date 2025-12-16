import React, { forwardRef } from "react";

const NewspaperPreview = forwardRef(
  ({ name, location, headline, userImage, isVintageDate }, ref) => {
    // তারিখ এখন বাংলায় দেখাবে
    const dateStr = isVintageDate
      ? "বৃহস্পতিবার, ১৬ই ডিসেম্বর, ১৯৭১"
      : new Date().toLocaleDateString("bn-BD", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

    const year = isVintageDate ? "১৯৭১" : "২০২৫";

    return (
      <div
        ref={ref}
        // Tailwind classes used for layout
        className="w-full max-w-[550px] min-h-[700px] bg-[#f0f0eb] text-[#000000] p-4 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col font-serif"
        style={{ fontFamily: '"Times New Roman", Times, serif' }}
      >
        {/* --- Header Section --- */}
        <div className="text-center border-b-[4px] border-[#000000] pb-2 mb-1">
          <h1
            className="text-[48px] sm:text-[60px] md:text-[72px] font-black uppercase tracking-tight leading-none text-[#000000] scale-y-90"
            style={{ fontFamily: "Hind Siliguri" }}
          >
            বিজয় বার্তা
          </h1>
          <p
            className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mt-1 text-gray-800"
            style={{ fontFamily: "Hind Siliguri" }}
          >
            দ্য ন্যাশনাল ডেইলি | স্বাধীন বাংলা প্রেস
          </p>
        </div>

        {/* --- Dateline Bar (বাংলায়) --- */}
        <div
          className="flex justify-between items-center text-[10px] sm:text-[11px] font-bold border-b border-[#000000] py-1 mb-4 uppercase flex-wrap gap-2"
          style={{ fontFamily: "Hind Siliguri" }}
        >
          <span>ঢাকা, {location || "বাংলাদেশ"}</span>
          <span>{dateStr}</span>
          <span>মূল্য: ১০ পয়সা</span>
          <span>রেজিঃ ডিএ-১১৭</span>
        </div>

        {/* --- Headline --- */}
        <div className="text-center mb-4">
          <h2
            className="text-[28px] sm:text-[36px] md:text-[42px] font-black leading-[1.2] text-[#000000]"
            style={{ fontFamily: "Hind Siliguri" }}
          >
            {headline || "বাংলার আকাশে আজ স্বাধীনতার সূর্য"}
          </h2>
        </div>

        {/* --- Image Section --- */}
        <div className="mb-4">
          <div className="border border-[#000000] p-1 bg-white">
            <div className="w-full h-48 sm:h-56 md:h-64 overflow-hidden bg-[#e5e5e5] relative">
              {userImage ? (
                <img
                  src={userImage}
                  alt="News"
                  className="w-full h-full object-cover grayscale contrast-125 brightness-90"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm italic font-sans">
                  ছবি নির্বাচন করা হয়নি
                </div>
              )}
            </div>
          </div>
          <p
            className="text-[10px] sm:text-[11px] mt-1 text-center font-bold italic text-[#333333]"
            style={{ fontFamily: "Hind Siliguri" }}
          >
            চিত্র: {location || "ঢাকা"} থেকে পাঠানো বিশেষ আলোকচিত্র -
            মুক্তিযোদ্ধা জনতার উল্লাস।
          </p>
        </div>

        {/* --- Editorial Text Columns --- */}
        {/* columns-1 sm:columns-2 md:columns-3 ব্যবহার করা হয়েছে রেসপন্সিভনেসের জন্য */}
        <div
          className="text-justify text-[12px] leading-[1.5] text-[#111111] columns-1 sm:columns-2 md:columns-3 gap-5"
          style={{ columnRule: "1px solid #000000" }}
        >
          <p className="mb-3">
            <span
              className="float-left text-[42px] leading-[0.8] font-bold mr-1 mt-[-2px]"
              style={{ fontFamily: "Hind Siliguri" }}
            >
              আ
            </span>
            জ ১৬ই ডিসেম্বর, {year}। মহান বিজয় দিবস। দীর্ঘ ৯ মাস রক্তক্ষয়ী
            যুদ্ধের পর অর্জিত হয়েছে এই স্বাধীনতা। আজ বাংলার আকাশ-বাতাস বিজয়ের
            গানে মুখরিত।
          </p>

          <p className="mb-3">
            <strong>নিজস্ব সংবাদদাতা, {location || "ঢাকা"}:</strong> আজ ভোর
            থেকেই রাজপথে মানুষের ঢল। হাতে লাল-সবুজের পতাকা, মুখে "জয় বাংলা"
            স্লোগান।
            <br />
            <br />
            <strong>{name || "আমাদের প্রতিনিধি"}</strong> জানান, নতুন প্রজন্ম
            মুক্তিযুদ্ধের চেতনায় দেশ গড়ার শপথ নিয়েছে।
          </p>

          <p className="mb-3">
            ৩০ লাখ শহীদের রক্তে কেনা এই স্বাধীনতা। পাকিস্তানি হানাদার বাহিনীর
            আত্মসমর্পণের মধ্য দিয়ে আজ বিশ্বের মানচিত্রে জন্ম নিল এক নতুন
            রাষ্ট্র - <strong>বাংলাদেশ</strong>।
          </p>

          <p>
            শহরের প্রতিটি কোণায় এখন উৎসবের আমেজ। স্মৃতিসৌধে ফুল দিয়ে শ্রদ্ধা
            জানাচ্ছেন সর্বস্তরের মানুষ।
          </p>
        </div>

        {/* --- Footer (বাংলায়) --- */}
        <div
          className="mt-auto pt-4 border-t-[4px] border-[#000000] flex justify-between items-center flex-wrap gap-2"
          style={{ fontFamily: "Hind Siliguri" }}
        >
          <div>
            <p className="text-[10px] font-bold uppercase">নগর সংস্করণ</p>
            <p className="text-[9px]">
              স্বাধীন বাংলা প্রেস কর্তৃক মুদ্রিত ও প্রকাশিত
            </p>
          </div>
          <div className="border border-[#000000] px-2 py-1">
            <p className="text-[10px] font-bold uppercase">বাংলাদেশ চিরজীবী হোক</p>
          </div>
        </div>
      </div>
    );
  }
);

export default NewspaperPreview;

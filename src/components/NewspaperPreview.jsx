import React, { forwardRef, useEffect, useState, useRef } from "react";

const NewspaperPreview = forwardRef(
  ({ name, location, headline, userImage }, ref) => {
    // State to hold the processed (grayscale) image URL
    const [processedImage, setProcessedImage] = useState(null);
    // Hidden canvas ref for image processing
    const canvasRef = useRef(null);

    const date = new Date().toLocaleDateString("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // --- FIX 1: IMAGE PROCESSING (Grayscale) ---
    // This useEffect runs whenever the user uploads a new image.
    // It draws the image onto a canvas and manually converts pixels to grayscale.
    // This ensures html2canvas captures the B&W version correctly.
    useEffect(() => {
      if (!userImage || !canvasRef.current) {
        setProcessedImage(null);
        return;
      }

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        // Set canvas dimensions to match image
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw original image
        ctx.drawImage(img, 0, 0);

        // Get image data to manipulate pixels
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Loop through pixels and convert to grayscale using standard formula
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // Luminosity formula for grayscale
          const gray = 0.299 * r + 0.587 * g + 0.114 * b;

          data[i] = gray; // Red
          data[i + 1] = gray; // Green
          data[i + 2] = gray; // Blue
          // data[i+3] is Alpha (transparency), leaving it as is
        }

        // Put processed data back
        ctx.putImageData(imageData, 0, 0);

        // Additional '71 vintage effect (sepia tone & contrast on top of grayscale)
        // We do this via globalCompositeOperation to "bake it in"
        ctx.globalCompositeOperation = "overlay";
        ctx.fillStyle = "rgba(100, 80, 40, 0.3)"; // Sepia overlay
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Set the processed image as the state to be displayed
        setProcessedImage(canvas.toDataURL("image/png"));
      };

      img.src = userImage;
    }, [userImage]);

    return (
      <div
        ref={ref}
        className="w-full max-w-[450px] min-h-[550px] md:min-h-[600px] bg-[#fdfbf7] text-[#1a1a1a] p-4 md:p-6 shadow-2xl relative overflow-hidden mx-auto"
        style={{ fontFamily: '"Times New Roman", Times, serif' }}
      >
        {/* Old Paper Texture (Overlay) */}
        <div className="absolute inset-0 bg-[#fef08a] opacity-10 pointer-events-none mix-blend-multiply z-20"></div>

        {/* Hidden Canvas for image processing */}
        <canvas ref={canvasRef} style={{ display: "none" }} />

        {/* HEADER */}
        <div className="border-b-4 border-[#000000] pb-2 mb-2 text-center relative z-10">
          {/* --- FIX 2: TITLE OVERFLOW --- */}
          {/* Changed text size on small screens to text-3xl and added whitespace-nowrap */}
          <h1
            className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter mb-1 leading-none text-[#000000] whitespace-nowrap"
            style={{ fontFamily: "Hind Siliguri" }}
          >
           স্বাধীন বাংলা 
          </h1>
          <div className="flex justify-between text-[10px] md:text-xs font-bold uppercase border-t border-[#000000] pt-1 px-1 md:px-2 text-[#000000]">
            <span>ঢাকা, বাংলাদেশ</span>
            <span>{date}</span>
            <span>১৬ পৃষ্ঠা | ১০ পয়সা</span>
          </div>
        </div>

        {/* HEADLINE */}
        <div className="text-center py-2 mb-2 md:mb-4 relative z-10">
          <h2
            className="text-2xl md:text-3xl font-black leading-tight text-[#000000]"
            style={{ fontFamily: "Hind Siliguri" }}
          >
            {headline || "সারা বাংলায় উড়ছে লাল সবুজের বিজয় নিশান"}
          </h2>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 gap-3 md:gap-4 relative z-10">
          {/* Image Section */}
          <div className="w-full">
            <div className="relative border-2 border-[#000000] p-1 mb-2 bg-white">
              <div className="w-full h-48 md:h-64 overflow-hidden bg-[#d1d5db] relative">
                {processedImage ? (
                  // Use the PROCESSED image here.
                  // Removed grayscale/sepia CSS filters as they are now baked into the image.
                  <img
                    src={processedImage}
                    alt="User Grayscale"
                    className="w-full h-full object-cover contrast-125"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-[#6b7280] text-xs md:text-sm font-sans">
                    ছবি আপলোড করুন
                  </div>
                )}
                {/* Texture overlay specifically for the image area */}
                <div className="absolute inset-0 bg-[#605443] opacity-20 pointer-events-none mix-blend-overlay z-10"></div>
              </div>
              <p className="text-[10px] text-center mt-1 italic font-sans text-[#4b5563]">
                চিত্র: {location || "ঢাকা"} থেকে পাঠানো বিশেষ আলোকচিত্র
              </p>
            </div>
          </div>

          {/* Text Columns */}
          <div>
            <h3
              className="text-lg md:text-xl font-bold mb-2 border-b border-[#9ca3af] inline-block text-[#000000]"
              style={{ fontFamily: "Hind Siliguri" }}
            >
              {name ? `${name}-এর প্রতিবেদন` : "বিশেষ সংবাদদাতা"}
            </h3>

            <div className="text-justify text-xs leading-relaxed columns-1 md:columns-2 gap-4 text-[#1f2937]">
              <p className="mb-2">
                <span className="text-4xl float-left mr-1 font-bold leading-none mt-[-4px] font-serif">
                  আ
                </span>
                জ ১৬ই ডিসেম্বর। মহান বিজয় দিবস। দীর্ঘ ৯ মাস রক্তক্ষয়ী যুদ্ধের
                পর অর্জিত হয়েছে এই স্বাধীনতা। আজ বাংলার আকাশ-বাতাস বিজয়ের গানে
                মুখরিত।
              </p>
              <p className="mb-2">
                <strong>{name || "আমাদের প্রতিনিধি"}</strong> জানান,{" "}
                {location || "সারা দেশ"} জুড়ে মানুষ আজ লাল-সবুজের পতাকায়
                সেজেছে। শিশু থেকে বৃদ্ধ—সবাই আজ রাজপথে নেমে এসেছে বিজয়ের
                মিছিলে।
              </p>
              <p>
                এই বিজয়ের দিনে আমরা শ্রদ্ধাভরে স্মরণ করি ৩০ লাখ শহীদ ও ২ লাখ
                মা-বোনকে, যাদের আত্মত্যাগে আমরা পেয়েছি এই স্বাধীন মানচিত্র। জয়
                বাংলা!
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER / STAMP */}
        <div className="mt-8 pt-4 border-t-2 border-[#000000] flex justify-between items-center relative z-10">
          <div className="w-2/3">
            <p className="text-xs font-bold uppercase text-[#000000]">
              রেজিঃ ডিএ-১১৭
            </p>
            <p
              className="text-[10px] text-[#000000]"
              style={{ fontFamily: "Hind Siliguri" }}
            >
              সম্পাদক ও প্রকাশক: সুব্রত কুমার বর্মন
            </p>
          </div>

          {/* Red Stamp */}
          <div className="w-16 h-16 md:w-20 md:h-20 absolute right-1 bottom-1 md:right-2 md:bottom-2 rounded-full border-4 border-[#b91c1c] text-[#b91c1c] flex flex-col items-center justify-center -rotate-12 opacity-80 font-bold text-[8px] md:text-[10px] uppercase border-dashed bg-transparent z-10 pointer-events-none font-sans">
            <span>Verified</span>
            <span className="text-base md:text-lg leading-none">১৯৭১</span>
            <span>Freedom</span>
          </div>
        </div>
      </div>
    );
  }
);

export default NewspaperPreview;

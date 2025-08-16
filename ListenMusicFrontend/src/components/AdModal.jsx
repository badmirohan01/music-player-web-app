import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function AdfreeNotification() {
  const adfreetime = useSelector((state) => state.profile.adfreetime);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (adfreetime) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 4000); // show for 4s
      return () => clearTimeout(timer);
    }
  }, [adfreetime]);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div
        className={`bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 
          ${showMessage ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
      >
        🎉 You now have an ad-free experience!
      </div>
    </div>
  );
}

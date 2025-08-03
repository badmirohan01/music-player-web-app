import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function LoginSuccessModal() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const timeDifference = useSelector((state) => state.profile.timeDifference);
  // console.log("timeDifference:", timeDifference);
  const [adfreeDuration, setAdfreeDuration] = useState("");

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setAdfreeDuration(formatTimeOrZero(timeDifference));
  }, [timeDifference]);

  function formatTimeOrZero(ms) {
    const maxLimitMs = 30 * 60 * 1000; // 30 minutes in ms

    if (ms > maxLimitMs) return "0";

    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <div className="relative">
      {/* Modal Overlay - positioned absolutely to overlay the entire viewport */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800/30 backdrop-blur-sm flex items-center justify-center z-50">
          {/* Modal */}
          <div
            className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
            style={{ backgroundColor: "oklch(0.28 0.03 257.69)" }}
          >
            {/* Modal Content */}
            <div className="text-center">
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: "white" }}
              >
                Welcome!
              </h2>
              <p className="mb-6" style={{ color: "white" }}>
                You have {adfreeDuration} minutes of ad-free
                experience duration.
              </p>

              {/* Close Button */}
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-white rounded-lg hover:bg-gray-100 transition-colors font-medium"
                style={{ color: "oklch(0.28 0.03 257.69)" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

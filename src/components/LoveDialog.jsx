import React, { useState, useEffect } from "react";
import axios from "axios";
import { Howl } from "howler";
import { motion } from "framer-motion";

const LoveDialog = () => {
  const [name, setName] = useState("");
  const [askNameBox, setAskNameBox] = useState(true);
  const [secondBox, setSecondBox] = useState(false);
  const [thirdBox, setThirdBox] = useState(false);
  const [fourthBox, setFourthBox] = useState(false);
  const [fifthBox, setFifthBox] = useState(false);
  const [sixthBox, setSixthBox] = useState(false);
  const [seventhBox, setSeventhBox] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [message, setMessage] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [randomQuote, setRandomQuote] = useState("");
  const [popupPosition, setPopupPosition] = useState({
    top: "50%",
    left: "50%",
  });

  //   sound effects
  const popSound = new Howl({
    src: ["/Dreamy.mp3"], // Add your sound file
    volume: 0.5,
  });
  const cry = new Howl({
    src: ["/cry.mp3"], // Add your sound file
    volume: 0.5,
  });
  const Ringring = new Howl({
    src: ["/Ringring.mp3"], // Add your sound file
    volume: 0.5,
    loop: true,
  });

  const sound = new Howl({
    src: ["sound.mp3"],
    onload: () => {
      console.log("Audio loaded and ready to play!");
    },
  });

  function playSegment(start, duration) {
    sound.seek(start); // Set the playback position
    sound.play(); // Start playing
    setTimeout(() => {
      sound.stop();
    }, duration * 1000);
  }

  const zipSound = new Howl({
    src: ["/Zip Zap.mp3"], // Add your sound file
    volume: 0.5,
  });

  const generateRandomPosition = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Ensure the popup doesn't go out of bounds
    const maxTop = viewportHeight - 200; // Adjusted for popup height
    const maxLeft = viewportWidth - 300; // Adjusted for popup width

    const randomTop = Math.random() * maxTop;
    const randomLeft = Math.random() * maxLeft;

    setPopupPosition({
      top: `${randomTop}px`,
      left: `${randomLeft}px`,
      transform: "translate(-50%, -50%)",
    });
  };

  const formatDateToWords = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return formatter.format(date);
  };

  const [timer, setTimer] = useState(3); // 3-second timer for the last box
  const fetchQuote = async () => {
    try {
      const response = await axios.get("https://api.quotable.io/random");
      setRandomQuote(response.data.content); // Assuming the API returns the quote in `content`
    } catch (error) {
      console.error("Error fetching the quote:", error);
      setRandomQuote(
        "Coffee is always a good idea, even in the hardest times! ☕💖"
      );
    }
  };

  // Handle OK button click
  const handleOkClick = () => {
    fetchQuote();
    // setRandomQuote(getRandomQuote());
    setPopupVisible(true);
  };

  useEffect(() => {
    if (fifthBox && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [fifthBox, timer]);

  const handleNoChoice = () => {
    setOpenPopUp(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FFF3C7] via-[#FEC7B4] via-[#FC819E] to-[#F7418F] flex items-center justify-center p-8">
      <div className="bg-[rgba(254,254,254,0.7)] min-h-52 w-96 rounded-lg flex items-center justify-center px-12 py-8">
        {/* asks name */}
        {askNameBox && (
          <div className="flex flex-col gap-4 items-center justify-center text-center">
            <h1 className="text-2xl font-extrabold text-black mb-4">
              Secret date by Kanika 💖
            </h1>
            <div className="w-full p-4 py-2 shadow-md bg-white rounded-lg">
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="What's your name Sweetheart? 💕"
                className="w-full text-sm outline-none flex items-center justify-center"
              />
            </div>
            <button
              className="text-white bg-[#F7418F] font-bold px-4 py-2 rounded-md text-md mt-8 w-1/2 flex items-center justify-center"
              onClick={() => {
                if (name.trim() === "") {
                  alert("Please enter your name! 💖"); // Show an alert if the input is blank
                } else {
                  setAskNameBox(false);
                  popSound.play();
                  setSecondBox(true);
                }
              }}
            >
              Let's go 🚀
            </button>
          </div>
        )}

        {/* second box */}
        {secondBox && (
          <div className="flex flex-col gap-4 items-center justify-center text-center">
            <h1 className="text-2xl font-bold text-black">Hi {name}! 👋</h1>
            <p className="text-md text-black">
              Welcome to your secret date! 💌
            </p>
            <button
              className="text-white bg-[#F7418F] font-bold px-4 py-2 rounded-md text-sm mt-8 flex items-center justify-center"
              onClick={() => {
                setSecondBox(false);
                setThirdBox(true);
                setAskNameBox(false);
              }} // This will display the third box
            >
              Click here to know a secret!! 🤫
            </button>
          </div>
        )}

        {/* third box */}
        {thirdBox && (
          <div className="flex flex-col gap-4 items-center justify-center text-center">
            <h1 className="text-2xl font-bold text-black">
              Will you tell anyone? 🤔
            </h1>
            <button
              onClick={() => {
                setThirdBox(false);
                setFourthBox(true);
                zipSound.play();
              }}
              className="text-white bg-[#F7418F] font-bold px-4 py-2 rounded-md text-sm mt-8 flex items-center justify-center"
            >
              No, I won't hehe 😘
            </button>
          </div>
        )}
        {/* fourth box */}
        {fourthBox && (
          <div className="flex flex-col gap-4 items-center justify-center text-center">
            <h1 className="text-2xl font-bold text-black">Promise? 🤔</h1>
            <button
              onClick={() => {
                setFourthBox(false);
                setFifthBox(true);
                zipSound.play();
              }}
              className="text-white bg-[#F7418F] font-bold px-4 py-2 rounded-md text-sm mt-8 flex items-center justify-center"
            >
              Promise hehe! 💖
            </button>
          </div>
        )}

        {/* fifth box */}
        {fifthBox && (
          <div className="flex flex-col gap-4 items-center justify-center text-center">
            <h1 className="text-2xl font-bold text-black">
              Okay then, close your eyes and count 3! 😌
            </h1>
            <p className="text-xl text-black mt-4">
              {timer > 0 ? <span>{timer}...</span> : ""}
            </p>
            {timer === 0 && (
              <button
                className="text-white bg-[#F7418F] font-bold px-4 py-2 rounded-md text-sm -mt-5 flex items-center justify-center"
                onClick={() => {
                  setFifthBox(false);
                  setSixthBox(true);
                  zipSound.play();
                }}
              >
                Tap to know the secret!
              </button>
            )}
          </div>
        )}
        {/* sixth box */}
        {sixthBox && (
          <div className="flex flex-col gap-4 items-center justify-center text-center">
            <h1 className="text-2xl font-bold text-black">
              So, I have a coffee date planned for you... Will you come with me?
              ☕💖
            </h1>
            <div className="flex justify-center px-8 gap-6">
              <button
                onClick={() => {
                  setSixthBox(false);
                  setSeventhBox(true);
                  playSegment(47, 2);
                  // Going to the next stage
                }}
                className="text-white bg-[#F7418F] font-bold px-4 py-2 rounded-md text-sm mt-4 flex items-center justify-center"
              >
                Yes! 😍
              </button>

              <button
                onClick={() => {
                  handleNoChoice();
                  cry.play();
                }}
                className="text-white bg-[#F7418F] font-bold px-4 py-2 rounded-md text-sm mt-4 flex items-center justify-center"
              >
                No 😢
              </button>
            </div>
          </div>
        )}

        {openPopUp && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl text-center">
              <img
                src="https://user-images.githubusercontent.com/74038190/226127923-0e8b7792-7b3c-462b-951b-63c96ba1a5af.gif"
                alt="Loading animation"
                width={100}
                height={100}
                className="mx-auto my-auto" // Centers the image horizontally and vertically
              />

              <h2 className="text-xl font-bold text-black mb-4">
                Oops! This is the wrong choice 😭💔
              </h2>
              <button
                onClick={() => {
                  setOpenPopUp(false);
                  playSegment(57, 2);
                }}
                className="text-white bg-[#F7418F] font-bold px-4 py-2 rounded-md text-sm mt-8"
              >
                Okay, I understand! 😔
              </button>
            </div>
          </div>
        )}

        {seventhBox && (
          <div>
            <h1 className="text-2xl font-bold text-black mb-4">
              Pick a date for our coffee date! 📅
            </h1>
            <input
              type="date"
              className="w-64 p-2 border-2 border-[#F7418F] rounded-lg text-black mb-4"
              onChange={(e) => setSelectedDate(e.target.value)}
            />

            {/* Text area for the message */}
            <textarea
              placeholder="Write a message 💬"
              className="w-64 p-2 border-2 border-[#F7418F] rounded-lg text-black mb-4"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onClick={() => {
                playSegment(51, 3);
              }}
            ></textarea>

            {/* OK button */}
            <button
              className="text-white bg-[#F7418F] font-bold px-4 py-2 rounded-md text-sm mt-4"
              onClick={() => {
                handleOkClick();
                Ringring.play();
              }}
            >
              OK
            </button>
          </div>
        )}

        {/* Popup with bouncing effect */}
        {popupVisible && (
          <div
            className="fixed p-6 bg-white rounded-lg shadow-lg text-center animate-bounce"
            style={{
              zIndex: 9999,
              width: "300px",
              top: popupPosition.top || "50%",
              left: popupPosition.left || "50%",
              transform: popupPosition.transform || "translate(-50%, -50%)",
            }}
          >
            <img
              src="https://user-images.githubusercontent.com/74038190/226127913-88de86d3-8437-45b9-a3b6-e746b47f655a.gif"
              alt=""
              className="mx-auto my-auto"
            />
            <h2 className="text-md font-bold text-black mb-4">
              Coffee Date Scheduled! ☕
            </h2>
            <p className="text-md text-black mb-4">
              Our coffee date is finally happening yayyyy:{" "}
              {formatDateToWords(selectedDate)}
            </p>
            <p className="text-md text-black mb-4 text-[#FC819E]">
              {randomQuote}
            </p>

            <button
              className="text-white bg-[#F7418F] font-bold px-4 py-2 rounded-md text-sm"
              onClick={() => setPopupVisible(false)}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoveDialog;

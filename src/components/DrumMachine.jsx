import { useState, useEffect } from "react";
import { Switch, Slider, Stack } from "@mui/material";
import { VolumeDown, VolumeUp } from "@mui/icons-material/";

const DrumMachine = () => {
  const A = [
    "Chord_1",
    "Chord_2",
    "Chord_3",
    "Give_us_a_light",
    "Dry_Ohh",
    "Bld_H1",
    "punchy_kick_1",
    "Brk_Snr",
    "side_stick_1",
  ];

  const B = [
    "Heater-1",
    "Heater-2",
    "Heater-3",
    "Heater-4_1",
    "Heater-6",
    "Dsc_Oh",
    "Kick_n_Hat",
    "RP4_KICK_1",
    "Cev_H2",
  ];

  const C = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];

  const [displayText, setDisplayText] = useState(" ");
  const [bank, setBank] = useState(A);
  const [volume, setVolume] = useState(50);
  const [highlightedIndex, setHighlightedIndex] = useState(null);

  const handlePadClick = (index) => {
    setDisplayText(bank[index]);

    const audio = document.getElementById(index);
    audio.currentTime = 0;
    audio.volume = volume / 100;
    audio.play();

    setHighlightedIndex(index);
    setTimeout(() => setHighlightedIndex(null), 300);
  };

  const handleKeyPress = (event) => {
    const keyPressed = event.key.toUpperCase();
    const index = C.indexOf(keyPressed);

    if (index !== -1) {
      setDisplayText(bank[index]);
      const audio = document.getElementById(index);
      
      if (audio) {
        audio.currentTime = 0;
        audio.volume = volume / 100;
        audio.play();
      };

      setHighlightedIndex(index);
      setTimeout(() => setHighlightedIndex(null), 300);
    };
  };

  const handleSwitchChange = () => {
    if (JSON.stringify(bank) === JSON.stringify(A)) {
      setBank(B);
    } else {
      setBank(A);
    }
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [bank, volume]);

  return (
    <div
      className="bg-black shadow-2xl shadow-gray-500/50 text-center text-gray-400 mx-auto p-4 max-w-sm sm:grid sm:grid-cols-4"
      id="drum-machine"
    >
      <Switch onChange={handleSwitchChange} defaultChecked/>

      <div
        className="bg-black mx-auto m-3 w-40 h-10 flex align-middle sm:col-start-2 sm:col-end-4 sm:mt-0"
        id="display"
      >
        <p className="m-auto">{displayText}</p>
      </div>

      <div className="w-64 grid grid-cols-3 gap-1 mx-auto sm:col-start-1 sm:col-end-5">
        {C.map((element, index) => (
          <div
            key={index}
            className={`bg-black drum-pad h-20 w-20 duration-700 flex align-middle select-none ${
              highlightedIndex === index ? "shadow-2xl shadow-gray-500/50" : ""
            }`}
            onClick={() => handlePadClick(index)}
          >
            <p className="m-auto">{element}</p>
            <audio
              className="clip"
              id={index}
              src={
                "https://s3.amazonaws.com/freecodecamp/drums/" +
                bank[index] +
                ".mp3"
              }
            ></audio>
          </div>
        ))}
      </div>

      <div className="mt-3 mx-auto h-10 w-48 sm:col-start-1 sm:col-end-5">
        <Stack spacing={2} direction="row" alignItems="center">
          <VolumeDown />
          <Slider
            aria-label="Volume"
            value={volume}
            onChange={handleVolumeChange}
          />
          <VolumeUp />
        </Stack>
      </div>
    </div>
  );
};

export default DrumMachine;

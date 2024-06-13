import React, { useState } from "react";
import { TbSquareLetterA } from "react-icons/tb";
import { MdAccessTimeFilled } from "react-icons/md";
import { useRecoilState } from "recoil";
import { HorizontalDivider } from "../ui";
import { SettingsState } from "../../recoil/states";
import DIFFECULTY from "../../models/DIFFECULTY";

interface IProps {
  testHasStarted: boolean;
};

export const Settingsbar = ({ testHasStarted }: IProps) => {
  const [settings, setSettings] = useRecoilState(SettingsState);
  const [settingsType, setSettingsType] = useState<string>("words");

  return (
    <div
      className={`w-full flex transition-opacity duration-300 ${
        testHasStarted && "opacity-0"
      }`}
    >
      <div className='flex justify-center items-center'>
        {[DIFFECULTY.EASY, DIFFECULTY.NORMAL, DIFFECULTY.HARD].map((d) => (
          <button
            key={d}
            className={`text-xl ${
              settings.difficulty === d
                ? "text-yellowAcent"
                : "text-secondary hover:text-light"
            } p-2 text-nowrap`}
            onClick={() => setSettings({ ...settings, difficulty: d })}
          >
            {DIFFECULTY[d]}
          </button>
        ))}
      </div>
      <HorizontalDivider />
      <div className='flex flex-grow'>
        {["time", "words"].map((type) => (
          <button
            key={type}
            onClick={() => {
              setSettingsType(type);
              setSettings((prevSettings) => {
                if (type === "time") {
                  return { ...prevSettings, selectedTime: 15, wordsAmount: null };
                } else if (type === "words") {
                  return { ...prevSettings, wordsAmount: 10, selectedTime: null };
                } else {
                  return prevSettings;
                }
              });
            }}
            className={`flex items-center gap-2 text-xl ${
              settingsType === type
                ? "text-yellowAcent"
                : "text-secondary hover:text-light"
            } p-2`}
          >
            {type === "words" ? (
              <TbSquareLetterA size={24} />
            ) : type === "time" ? (
              <MdAccessTimeFilled size={24} />
            ) : (
              <></>
            )}{" "}
            {type}
          </button>
        ))}
      </div>
      <HorizontalDivider />
      {settingsType === "time" ? (
        <div className='flex justify-center items-center'>
          {[15, 30, 60, null].map((leng) => (
            <button
              key={leng}
              className={`text-xl ${
                settings.selectedTime === leng
                  ? "text-yellowAcent"
                  : "text-secondary hover:text-light"
              } p-2 text-nowrap`}
              onClick={() =>
                leng === null
                  ? (setSettings((prevSettings) => ({
                      ...prevSettings,
                      selectedTime: leng,
                    })))
                  : (setSettings((prevSettings) => ({
                      ...prevSettings,
                      selectedTime: leng,
                    })),
                    setSettings((prevSettings) => ({
                      ...prevSettings,
                      wordsAmount: null,
                    })))
              }
            >
              {leng === null ? "No limit" : leng}
            </button>
          ))}
        </div>
      ) : settingsType === "words" ? (
        <div className='flex justify-center items-center'>
          {[10, 15, 20, null].map((leng) => (
            <button
              key={leng}
              className={`text-xl ${
                settings.wordsAmount === leng
                  ? "text-yellowAcent"
                  : "text-secondary hover:text-light"
              } p-2 text-nowrap`}
              onClick={() =>
                leng === null
                  ? setSettings((prevSettings) => ({
                      ...prevSettings,
                      wordsAmount: leng,
                    }))
                  : (setSettings((prevSettings) => ({
                      ...prevSettings,
                      wordsAmount: leng,
                    })),
                    setSettings((prevSettings) => ({
                      ...prevSettings,
                      selectedTime: null,
                    })))
              }
            >
              {leng === null ? "No limit" : leng}
            </button>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Settingsbar;

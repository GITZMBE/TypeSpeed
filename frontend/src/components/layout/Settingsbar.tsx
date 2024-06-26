import React, { ComponentPropsWithoutRef, Dispatch, SetStateAction, useEffect, useState } from "react";
import { TbSquareLetterA } from "react-icons/tb";
import { MdAccessTimeFilled } from "react-icons/md";
import { useRecoilState } from "recoil";
import { HorizontalDivider, Icon } from "../ui";
import { SettingsState } from "../../recoil/states";
import DIFFECULTY from "../../models/DIFFECULTY";

interface IProps extends ComponentPropsWithoutRef<"div"> {
  testHasStarted: boolean;
};

export const Settingsbar = ({ testHasStarted, ...props }: IProps) => {
  const [settings, setSettings] = useRecoilState(SettingsState);
  const [settingsType, setSettingsType] = useState<string>("words");

  useEffect(() => {
    if (settings.selectedTime) {
      setSettingsType("time");
    } else if (settings.wordsAmount) {
      setSettingsType("words");
    }
  }, [settings])

  return (
    <div
      {...props}
      className={`w-full flex transition-opacity duration-300 ${
        testHasStarted && "opacity-0"
      }`}
    >
      <div className='flex justify-center items-center'>
        {[DIFFECULTY.EASY, DIFFECULTY.NORMAL, DIFFECULTY.HARD, DIFFECULTY.RANDOM].map((d) => (
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
              })
            }}
            className={`group flex items-center gap-2 text-xl ${
              settingsType === type
                ? "text-yellowAcent"
                : "text-secondary hover:text-light"
            } p-2`}
          >
            {type === "words" ? (
              <Icon icon="letterA" className={`w-6 h-6 ${settingsType === type
                ? "text-yellowAcent group-hover:text-yellowAcent"
                : "text-secondary group-hover:text-light"}`} />
            ) : type === "time" ? (
              <Icon icon="clock" className={`w-6 h-6 group-hover:text-light ${settingsType === type
                ? "text-yellowAcent group-hover:text-yellowAcent"
                : "text-secondary group-hover:text-light"}`} />
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

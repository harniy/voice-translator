import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "boxicons";
import Select from "./Select";
import translateText from "../api/traslate";

export default function InputBlock() {
  const [ownLanguage, setOwnLanguage] = useState("ru-ru");
  const [finalText, setFinalText] = useState("");
  const [translate, setTranslate] = useState("");

  const { transcript, listening } = useSpeechRecognition();

  useEffect(() => {
    setFinalText(transcript.replace(".", ""));
    setTranslate("");

    let timer;

    if (finalText !== "") {
      timer = setTimeout(() => {
        new Promise((res) => {
          res(translateText(ownLanguage, finalText));
        }).then((data) => setTranslate(data[0].translations[0].text));
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [transcript]);

  function startRecognition() {
    SpeechRecognition.startListening({
      language: `${ownLanguage}`,
    });
  }

  function stoptRecognition() {
    SpeechRecognition.stopListening();
  }

  /* Sound write */

  function speackText(text, language) {
    let voices = window.speechSynthesis.getVoices()

    let utter = new SpeechSynthesisUtterance();

    utter.lang = language;
    utter.voice = voices[language === 'ru-ru' ? 57 : 18]
    utter.text = text;
    window.speechSynthesis.speak(utter);

  }
  return (
    <div className="input__container">
      <Select ownLanguage={ownLanguage} setOwnLanguage={setOwnLanguage} />

      <div className="translate__section">
        <div className="input__container-block">
          <span>{finalText}</span>
          <box-icon
            type="solid"
            name="volume-full"
            title="Прочитать в слух"
            onClick={() => speackText(finalText, 'ru-ru')}
          ></box-icon>
        </div>
        <div className="input__container-block">
          <span>{translate}</span>
          <box-icon
            type="solid"
            name="volume-full"
            title="Прочитать в слух"
            onClick={() => speackText(translate, 'en-US')}
          ></box-icon>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className="input__container-button" onClick={startRecognition}>
          <box-icon type="solid" name="microphone"></box-icon>
        </button>
        <button className="input__container-button" onClick={stoptRecognition}>
          <box-icon name="stop"></box-icon>
        </button>
      </div>
      {listening && <span className="recognition__info">Listening...</span>}
    </div>
  );
}

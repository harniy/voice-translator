import React, { useState } from "react";
import { language } from "../language";

export default function Select({ ownLanguage, setOwnLanguage }) {
  const [isOpen, setIsOpen] = useState(false);

  const getDataLang = (e) => {
    setOwnLanguage(e.target.dataset.userLanguage);
  };

  function selectedLang() {
      return language.filter((el) => el.code === ownLanguage)[0].language
  }

  return (
    <div className="select__language" onClick={() => setIsOpen(!isOpen)}>
      <span>
        {selectedLang()}
      </span>
      <box-icon name="caret-down" className="arrow__icon"></box-icon>
      {isOpen && (
        <div className="language__list">
          <ul>
            {language.map(({ language, code }) => (
              <li
                key={code}
                data-user-language={code}
                className="language__list-item"
                onClick={getDataLang}
              >
                {language}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

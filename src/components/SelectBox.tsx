import React, { useState } from "react";
import style from "./SelectBox.module.scss";
import { ArrowDown } from "react-feather";
function SelectBox({ selected, setSelected }) {
  const [isActive, setActive] = useState(false);
  const options = ["Fiyat Artan", "Fiyat Azalan", "Puan"];
  return (
    <div className={style.dropdown}>
      <div
        className={style.dropdownButton}
        onClick={(e) => setActive(!isActive)}
      >
        {selected}
        <span>
          <ArrowDown size={16} />
        </span>
        {isActive && (
          <div className={style.dropdownContent}>
            {options.map((item) => (
              <div
                onClick={(e) => {
                  setSelected(item);
                  setActive(false);
                }}
                className={style.dropdownItem}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectBox;

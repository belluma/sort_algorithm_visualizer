import React, { ReactElement } from "react";
import styles from "./Dropdown.module.css";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

type Props = {
  algorithms: string[];
  value: string;
  handleChange: () => void;
};

const Dropdown = (props: Props) => {
  const menuItems: ReactElement[] = [];
  props.algorithms.forEach((a, i) => {
    menuItems.push(
      <MenuItem value={a} key={i}>
        {a}
      </MenuItem>
    );
  });

  return (
    <div className={styles.Dropdown}>
      <Select
        labelId="algorithm-selector-label"
        id="algorithm-selector"
        value={props.value}
        onChange={props.handleChange}
      >
        {menuItems}
      </Select>
    </div>
  );
};

export default Dropdown;

import React, { ReactElement } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import algorithm from "../../interfaces/algorithm";

type Props = {
  algorithms: algorithm[];
  handleChange: (e: any) => void;
};

const Dropdown = (props: Props) => {
  const selectedAlgorithm = props.algorithms.filter(
    (a) => a.selected
  )[0].name;
  const algorithms = props.algorithms;
  const menuItems: ReactElement[] = [];
  algorithms.forEach((a, i) => {
    menuItems.push(
      <MenuItem value={a.name} key={i}>
        {a.name}
      </MenuItem>
    );
  });

  return (
      <Select
        labelId="algorithm-selector-label"
        id="algorithm-selector"
        onChange={props.handleChange}
        value={selectedAlgorithm}
      >
        {menuItems}
      </Select>
  );
};

export default Dropdown;

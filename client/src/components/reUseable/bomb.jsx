import React from "react";

const Bomb = props => {
  let classes = "fa fa-bomb";
  if (!props.bombed) classes += "-o";
  return (
    <i
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    />
  );
};

export default Bomb;

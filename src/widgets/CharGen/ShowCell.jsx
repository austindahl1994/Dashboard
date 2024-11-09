import PropTypes from "prop-types";
import { useState } from "react";

export const ShowCell = ({
  xArrElement,
  index,
  editFunc,
  dimensions,
  newHeaderFunc,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [xIndex, yIndex] = index;

  const handleTDClick = (event, index) => {
    const [x, y] = index;
    //console.log(`Clicked at [${x},${y}] with maxDim of ${dimensions}`);
    if (y === dimensions[1] - 1) {
      console.log("Trying to update cell that has no header!");
      newHeaderFunc();
    } else {
      editFunc([x, y]);
    }
  };

  const handleEnter = () => {
    setIsHovering(true);
  };

  const handleExit = () => {
    setIsHovering(false);
  };

  return (
    <>
      <td
        colSpan={isHovering && typeof xArrElement !== "string" ? 2 : 1}
        onClick={(event) => {
          handleTDClick(event, [xIndex, yIndex]);
        }}
        onMouseOver={handleEnter}
        onMouseLeave={handleExit}
      >
        {typeof xArrElement === "string"
          ? xArrElement
          : xArrElement.trait
          ? `${xArrElement.trait}${
              xArrElement.percent && isHovering
                ? `, ${xArrElement.percent}`
                : ""
            }`
          : " "}
      </td>
      {typeof xArrElement !== "string" && !isHovering && (
        <td
          colSpan={1}
          onClick={(event) => {
            handleTDClick(event, [xIndex, yIndex]);
          }}
          onMouseOver={handleEnter}
          onMouseLeave={handleExit}
        >
          {xArrElement.trait ? xArrElement.percent : " "}
        </td>
      )}
    </>
  );
};

ShowCell.propTypes = {
  xArrElement: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      trait: PropTypes.string,
      percent: PropTypes.number,
    }),
  ]),
  index: PropTypes.arrayOf(PropTypes.number).isRequired,
  editFunc: PropTypes.func,
  dimensions: PropTypes.arrayOf(PropTypes.number),
  newHeaderFunc: PropTypes.func,
};

export default ShowCell;
import React, {createContext, useContext} from 'react';

const PositionContext = createContext(() => []);

const usePositionContext = () => {
  const getPosition = useContext(PositionContext);
  return getPosition;
};

const Position = ({children}) => {
  const memorizePostions = {};

  const memorizeCalculatePostion = (index, getParentPosition) => {
    if (memorizePostions[index]) return memorizePostions[index];

    memorizePostions[index] = () => [...getParentPosition(), index];

    return memorizePostions[index];
  };

  return (
    <PositionContext.Consumer>
      {(getParentPosition = () => []) => {
        return React.Children.map(children, (child, index) => {
          if (!child || !child.type) return child;

          const currentElementPostion = memorizeCalculatePostion(
            index,
            getParentPosition
          );

          return (
            <PositionContext.Provider
              key={String(index)}
              value={currentElementPostion}
            >
              {child}
            </PositionContext.Provider>
          );
        });
      }}
    </PositionContext.Consumer>
  );
};

export default Position;

export {usePositionContext};

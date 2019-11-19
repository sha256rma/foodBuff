import React from 'react';
import { IncrementContainer, IncrementButton } from './SetQuantity-Style';

export const SetQuantity = ({quantity}) => {
    
  return (
    <React.Fragment>
      <IncrementContainer>

          <IncrementButton
            disabled={quantity.value === 1}
            onClick={() => {
              quantity.setValue(quantity.value - 1);
            }}  
          >
            -
          </IncrementButton>
          
          {quantity.value}

          <IncrementButton
            disabled={quantity.value === 10}
            onClick={() => {
              quantity.setValue(quantity.value + 1);
            }}
          >
            +
          </IncrementButton> 

      </IncrementContainer>
    </React.Fragment>
  )
}

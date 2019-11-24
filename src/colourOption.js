import { css } from 'emotion';

export const colourOption = ({ cx, children, getStyles, innerRef, ...props }) => (
  <div
    ref={innerRef}
    className={cx(
      css(getStyles('option', props)),
      {
        'option': true,
        'option--is-disabled': isDisabled,
        'option--is-focused': isFocused,
        'option--is-selected': isSelected,
      }
    )} 
  >
    {children}
  </div>
)
import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Input } from 'vtex.styleguide'
import { IconClose, IconSearch } from 'vtex.dreamstore-icons'

import styles from '../styles.css'

/** Midleware component to adapt the styleguide/Input to be used by the Downshift*/
const AutocompleteInput = ({
  onGoToSearchPage,
  onClearInput,
  compactMode,
  value,
  hasIconLeft,
  iconClasses,
  iconSize,
  inputSize,
  ...restProps
}) => {
  const inputRef = useRef()

  useEffect(() => {
    if (compactMode) {
      inputRef.current.placeholder = ''
      inputRef.current.classList.add(styles.paddingInput)
    }
  }, [])

  const suffix = (
    <span
      className={`${iconClasses} flex items-center pointer`}
      onClick={() => value && onClearInput()}
    >
      {value ? (
        <IconClose type="line" size={iconSize} />
      ) : (
        !hasIconLeft && <IconSearch />
      )}
    </span>
  )

  const prefix = (
    <span className={iconClasses}>
      <IconSearch />
    </span>
  )

  const classContainer = classNames('w-100', {
    [styles.compactMode]: compactMode,
  })

  return (
    <div className="flex">
      <div className={classContainer}>
        <Input
          ref={inputRef}
          size={inputSize}
          value={value}
          prefix={hasIconLeft && prefix}
          suffix={suffix}
          {...restProps}
        />
      </div>
    </div>
  )
}

AutocompleteInput.propTypes = {
  /** Downshift prop to be passed to the input */
  autoComplete: PropTypes.string,
  /** Input ID */
  id: PropTypes.string,
  /** Downshift prop to be passed to the input */
  onBlur: PropTypes.func,
  /** Downshift prop to be passed to the input */
  onChange: PropTypes.func,
  /** Downshift prop to be passed to the input */
  onKeyDown: PropTypes.func,
  /** Downshift prop to be passed to the input */
  value: PropTypes.string,
  /** Placeholder to be used on the input */
  placeholder: PropTypes.string,
  /** Function to direct the user to the searchPage */
  onGoToSearchPage: PropTypes.func.isRequired,
  compactMode: PropTypes.bool,
  /** Clears the input */
  onClearInput: PropTypes.func,
  /** Identify if the search icon is on left or right position */
  hasIconLeft: PropTypes.bool,
  /** Custom classes for the search icon */
  iconClasses: PropTypes.string,
  /** Input Size */
  inputSize: PropTypes.string,
  /** Icon Size */
  iconSize: PropTypes.number,
}

AutocompleteInput.defaultProps = {
  inputSize: 'large',
  iconSize: 22,
}

export default AutocompleteInput

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import AutocompleteInput from './AutocompleteInput'
import ResultsLits from './ResultsList'
import DownshiftComponent from 'downshift'
import { NoSSR } from 'vtex.render-runtime'

import styles from '../styles.css'

const SearchBar = ({
  placeholder,
  emptyPlaceholder,
  onEnterPress,
  onMakeSearch,
  onInputChange,
  onGoToSearchPage,
  onClearInput,
  shouldSearch,
  inputValue,
  compactMode,
  hasIconLeft,
  iconClasses,
}) => {
  const fallback = (
    <AutocompleteInput
      placeholder={placeholder}
      onMakeSearch={onMakeSearch}
      onInputChange={onInputChange}
      onGoToSearchPage={onGoToSearchPage}
      inputValue={inputValue}
      hasIconLeft={hasIconLeft}
      iconClasses={iconClasses}
    />
  )

  return (
    <div className={styles.searchBarContainer}>
      <NoSSR onSSR={fallback}>
        <DownshiftComponent>
          {({
            getInputProps,
            selectedItem,
            highlightedIndex,
            isOpen,
            closeMenu,
          }) => (
            <div className="relative-m w-100">
              <AutocompleteInput
                compactMode={compactMode}
                onClearInput={onClearInput}
                hasIconLeft={hasIconLeft}
                iconClasses={iconClasses}
                onGoToSearchPage={() => {
                  closeMenu()
                  onGoToSearchPage()
                }}
                {...getInputProps({
                  placeholder,
                  value: inputValue,
                  onChange: onInputChange,
                  onKeyDown: event => {
                    closeMenu()
                    onEnterPress(event)
                  },
                })}
              />
              {shouldSearch && isOpen ? (
                <ResultsLits
                  {...{
                    inputValue,
                    selectedItem,
                    highlightedIndex,
                    emptyPlaceholder,
                    closeMenu,
                    onClearInput,
                  }}
                />
              ) : null}
            </div>
          )}
        </DownshiftComponent>
      </NoSSR>
    </div>
  )
}

SearchBar.propTypes = {
  /** Empty placeholder to be used on the input */
  emptyPlaceholder: PropTypes.string.isRequired,
  /** Placeholder to be used on the input */
  placeholder: PropTypes.string.isRequired,
  /** Current value of the input */
  inputValue: PropTypes.string.isRequired,
  /** Variable that controls when the search should be made */
  shouldSearch: PropTypes.bool.isRequired,
  /** Function that controls when the search should be executed */
  onMakeSearch: PropTypes.func.isRequired,
  /** Function that controls the action when the enter key is pressed */
  onEnterPress: PropTypes.func.isRequired,
  /** Function to handle input changes */
  onInputChange: PropTypes.func.isRequired,
  /** Function to direct the user to the searchPage */
  onGoToSearchPage: PropTypes.func.isRequired,
  /** Function to clear the input */
  onClearInput: PropTypes.func.isRequired,
  /** Indentify when use the compact version of the component */
  compactMode: PropTypes.bool,
  /** Identify if the search icon is on left or right position */
  hasIconLeft: PropTypes.bool,
  /** Custom classes for the search icon */
  iconClasses: PropTypes.string,
}

export default SearchBar

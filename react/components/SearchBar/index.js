import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import SearchBar from './components/SearchBar'
import { injectIntl, intlShape } from 'react-intl'

/** Canonical search bar that uses the autocomplete endpoint to search for a specific product*/
const SearchBarContainer = (
  { intl, compactMode, hasIconLeft, iconClasses, searchDelay }, //props
  context
) => {
  const [shouldSearch, setShouldSearch] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const handleClearInput = useCallback(() => {
    setInputValue('')
    setShouldSearch(false)
  }, [])

  const handleGoToSearchPage = useCallback(() => {
    const search = inputValue
    setInputValue('')
    context.navigate({
      page: 'store.search',
      params: { term: search },
      query: 'map=ft',
      fallbackToWindowLocation: false,
    })
  }, [])

  const handleEnterPress = useCallback(
    event => event.key === 'Enter' && handleGoToSearchPage(),
    []
  )

  const handleMakeSearch = useCallback(() => {
    setShouldSearch(false)
    setTimeout(() => {
      setShouldSearch(true)
    }, searchDelay)
  }, [])

  const handleInputChange = useCallback(event => {
    const value = event.target.value
    setInputValue(value)
    value.length < 2 ? setShouldSearch(false) : handleMakeSearch()
  }, [])

  const placeholder = intl.formatMessage({
    id: 'search.placeholder',
  })
  const emptyPlaceholder = intl.formatMessage({
    id: 'search.noMatches',
  })

  return (
    <SearchBar
      placeholder={placeholder}
      emptyPlaceholder={emptyPlaceholder}
      shouldSearch={shouldSearch}
      inputValue={inputValue}
      onClearInput={handleClearInput}
      onGoToSearchPage={handleGoToSearchPage}
      onEnterPress={handleEnterPress}
      onMakeSearch={handleMakeSearch}
      onInputChange={handleInputChange}
      compactMode={compactMode}
      hasIconLeft={hasIconLeft}
      iconClasses={iconClasses}
    />
  )
}

SearchBarContainer.defaultProps = {
  searchDelay: 500,
}

SearchBarContainer.contextTypes = {
  navigate: PropTypes.func,
}

SearchBarContainer.propTypes = {
  /* Internationalization */
  intl: intlShape.isRequired,
  /** Indentify when use the compact version of the component */
  compactMode: PropTypes.bool,
  /** Identify if the search icon is on left or right position */
  hasIconLeft: PropTypes.bool,
  /** Custom classes for the search icon */
  iconClasses: PropTypes.string,
  /** Delay of search foreach interaction, in ms */
  searchDelay: PropTypes.number,
}

export default injectIntl(SearchBarContainer)

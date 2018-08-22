import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Downshift from './Downshift'

import { Button } from 'vtex.styleguide'
import IconSearch from '../images/IconSearch'

export default class SearchMobile extends Component {
  static propTypes = {
    /** Set search mode. */
    isSearchMode: PropTypes.bool,
    /** Toogle search mode */
    toogleSearchMode: PropTypes.func,
    /** Input's placeholder */
    placeholder: PropTypes.string,
    /** Message that will be displayed when there is no result ot be shown */
    emptyPlaceholder: PropTypes.string,
  }

  static contextTypes = {
    navigate: PropTypes.func,
    intl: PropTypes.object,
  }

  handleToogleSearch = () => {
    this.props.toogleSearchMode()
  }

  render() {
    const { placeholder, emptyPlaceholder, isSearchMode } = this.props
    if (isSearchMode) {
      return (
        <div className="vtex-search-mobile flex justify-center items-center w-100">
          <Downshift
            placeholder={placeholder}
            emptyPlaceholder={emptyPlaceholder}
            isMobileSearchMode={isSearchMode}
          />
          <Button variation="tertiary" onClick={this.handleToogleSearch}>
            <span className="white">
              {this.context.intl.formatMessage({ id: 'searchBar.button.cancel.label' })}
            </span>
          </Button>
        </div>
      )
    }
    return (
      <span
        className="flex items-center pa4 pointer"
        onClick={this.handleToogleSearch}
      >
        <IconSearch />
      </span>
    )
  }
}
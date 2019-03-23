import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux'
import searchActionGenerators from './../../redux/actions/search/searchActionGenerators'
import './Filter.scss'

const options = [
    { value: 'Tech', label: 'Tech' },
    { value: 'Business', label: 'Business' },
    { value: 'Coding', label: 'Coding' },
    { value: 'Software', label: 'Software' },
    { value: 'Pop culture', label: 'Pop culture' },
    { value: 'Design', label: 'Design' },
    { value: 'UX', label: 'UX' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Business', label: 'Business' },
    { value: 'Investing', label: 'Investing' },
    { value: 'Venture capital', label: 'Venture capital' },
    { value: 'Entrepreneurship', label: 'Entrepreneurship' },
  ];

class Filter extends Component {
  state = {
    selectedOption: null,
  }

  handleChange = (selectedOption) => {
    this.props.dispatch(searchActionGenerators.updateFilters(selectedOption))
  }
  
  render() {
    const { filters } = this.props.search

    return (
          <div className="Filter">
            <label>Search by keyword:</label>
            <Select
                value={filters}
                onChange={this.handleChange}
                options={options}
                isMulti={true}
            />
          </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        search: state.search
    }
}

export default connect(mapStateToProps)(Filter)

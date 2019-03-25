import React, { Component } from 'react';
import classnames from 'classnames'
import { INPUT_TYPES } from '../../constants'
import './Input.scss'

class Input extends Component {

    static defaultProps = {
        onChange: () => { }
      }

    state = {
        value: ''
    }

    updateValue = (event) => {
        this.setState({ value: event.target.value})
    }

    handleBlur = () => {
        this.props.onChange(this.state.value)
    }

    handleKeypress = (event) => {
        const { inputType} = this.props

        if ( inputType === INPUT_TYPES.NUMBER) {
            if (event.which < 48 || event.which > 57) {
                event.preventDefault()
            }
        }
       
    }

    render() {
        const { value } = this.state
        const { icon, type } = this.props
        return (
            <section className='Input'>
                <input  
                onChange={this.updateValue} 
                onKeyPress={this.handleKeypress} 
                onBlur={this.handleBlur} 
                value={value}
                type={type}
                />
                
                {icon && <i className={classnames("fas", icon)}/>}
            </section>
        )
    }
}

export default Input
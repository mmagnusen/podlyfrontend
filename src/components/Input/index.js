import React, { Component } from 'react';
import classnames from 'classnames'
import {func} from 'prop-types';
import { INPUT_TYPES } from '../../constants'
import './Input.scss'

class Input extends Component {

    static propTypes = {
        onChange: func, 
        onBlur: func
    }
    
    static defaultProps = {
        onChange: () => { },
        onBlur: () => { },
        value: null
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

        const { icon, type, value, onChange, onBlur } = this.props
        
        return (
            <section className='Input'>
                <input  
                    onChange={(event) => onChange(event)} 
                    onKeyPress={this.handleKeypress} 
                    onBlur={(event) => onBlur(event)} 
                    value={value}
                    type={type}
                />
                
                {icon && <i className={classnames("fas", icon)}/>}
            </section>
        )
    }
}

export default Input
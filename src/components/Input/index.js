import React, { Component } from 'react';
import classnames from 'classnames'
import {func} from 'prop-types';
import { INPUT_TYPE } from '../../constants'
import './Input.scss'

class Input extends Component {

    state = {
        showPassword: false
    }

    static propTypes = {
        onChange: func, 
        onBlur: func,
        type: INPUT_TYPE.TEXT
    }
    
    static defaultProps = {
        onChange: () => { },
        onBlur: () => { },
        value: null
      }

    handleKeypress = (event) => {
        const { inputType} = this.props

        if ( inputType === INPUT_TYPE.NUMBER) {
            if (event.which < 48 || event.which > 57) {
                event.preventDefault()
            }
        }
       
    }

    togglePassword = () => {
        this.setState({showPassword: !this.state.showPassword})
    }

    render() {

        const { icon, type, value, onChange, onBlur } = this.props
        const { showPassword } = this.state
        
        return (
            <section className='Input'>
                <input  
                    onChange={(event) => onChange(event)} 
                    onKeyPress={this.handleKeypress} 
                    onBlur={(event) => onBlur(event)} 
                    value={value}
                    type={(type === INPUT_TYPE.PASSWORD && showPassword === true) ? INPUT_TYPE.TEXT : type}
                />
                { type === INPUT_TYPE.PASSWORD && 
                    (showPassword === true ? 
                    <i className="fas fa-eye-slash password-icon" onClick={this.togglePassword}/> 
                    : 
                    <i className="fas fa-eye password-icon" onClick={this.togglePassword}/>)}
                {icon && <i className={classnames("fas", icon)}/>}
            </section>
        )
    }
}

export default Input
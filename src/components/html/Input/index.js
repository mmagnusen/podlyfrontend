import React, { Component } from 'react';
import classnames from 'classnames';
import { func, oneOf, bool } from 'prop-types';
import { INPUT_TYPE } from '../../../constants';
import './Input.scss';

class Input extends Component {

    state = {
        showPassword: false
    }

    static propTypes = {
        autoFocus: bool,
        onChange: func, 
        onBlur: func,
        type: oneOf(Object.values(INPUT_TYPE))
    }
    
    static defaultProps = {
        autoFocus: false,
        onChange: () => { },
        onBlur: () => { },
        value: null
      }

    handleKeypress = (event) => {
        const { inputType} = this.props;

        if ( inputType === INPUT_TYPE.NUMBER) {
            if (event.which < 48 || event.which > 57) {
                event.preventDefault()
            }
        }
       
    }

    togglePassword = () => {
        this.setState({showPassword: !this.state.showPassword});
    }

    getAutoCompleteValue = (type) => {
        switch(type) {
            case INPUT_TYPE.EMAIL:
                return 'email'
            case INPUT_TYPE.PASSWORD:
                return 'currentPassword'
            default:
                return null
        }
    }

    getPlaceholder = (type, placeHolder) => {
        switch(type) {
            case INPUT_TYPE.EMAIL:
                return 'email@example.com'
            case INPUT_TYPE.PASSWORD:
                return 'your password'
            default:
                return placeHolder ? placeHolder : null
        }  
    }

    render() {

        const { icon, type, value, onChange, onBlur, placeHolder, autoFocus } = this.props;

        const { showPassword } = this.state;
        
        return (
            <section className='Input'>
                <input  
                    autoFocus={autoFocus}
                    autoComplete={this.getAutoCompleteValue(type)}
                    onChange={(event) => onChange(event)} 
                    onKeyPress={this.handleKeypress} 
                    onBlur={(event) => onBlur(event)} 
                    value={value}
                    type={(type === INPUT_TYPE.PASSWORD && showPassword === true) ? INPUT_TYPE.TEXT : type}
                    placeholder={this.getPlaceholder(type, placeHolder)}
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

export default Input;
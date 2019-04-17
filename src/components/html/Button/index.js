import React, { Component } from 'react';
import classnames from 'classnames'
import './Button.scss'

class Button extends Component {

    render() {
        const { children, onClick, disabled } = this.props;
        return (
            <div className={classnames('Button', {'disabled': disabled})}>
                <button onClick={onClick}>{children}</button>
            </div>
        )
     
    }
}

export default Button
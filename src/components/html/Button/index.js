import React, { Component } from 'react';
import './Button.scss'

class Button extends Component {

    render() {
        const { children, onClick } = this.props;
        return (
            <div className='Button'>
                <button onClick={onClick}>{children}</button>
            </div>
        )
     
    }
}

export default Button
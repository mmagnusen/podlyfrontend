import React, { Component } from 'react';
import './AuthenticationForm.scss'

class AuthenticationForm extends Component { 
    render() {
        const { children, header, classes, buttonCta, buttonAction } = this.props
        return (
            <div className='AuthenticationForm'>
                <section className='AuthenticationForm-header'>{header}</section>
                <form className={classes}>

                    {children}

                <section className='AuthenticationForm-authenticate'>
                    <button className='button' onClick={buttonAction}>{buttonCta}</button>
                </section>
            
                </form>
            </div>
        )
    }
}

export default AuthenticationForm
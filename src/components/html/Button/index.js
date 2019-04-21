import React, { Component } from 'react';
import classnames from 'classnames'
import CircularProgress from '@material-ui/core/CircularProgress';
import './Button.scss'

class Button extends Component {

    render() {
        const { children, onClick, disabled, loading = true } = this.props;
        return (
            <div className={classnames('Button', {'disabled': disabled})}>
                <button onClick={onClick}>{loading ?  <CircularProgress className='Button-loading' color="secondary" /> : children}</button>
            </div>
        )
     
    }
}

export default Button
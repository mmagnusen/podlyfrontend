import React, { Component } from 'react';
import {func} from 'prop-types';
import './TextArea.scss';

class TextArea extends Component {

    static propTypes = {
        onChange: func, 
        onBlur: func
    }
    
    static defaultProps = {
        onChange: () => { },
        onBlur: () => { },
        value: null
      }

    render() {

        const { value, onChange, onBlur } = this.props;
        
        return (
            <section className='TextArea'>
                <textarea  
                    onChange={(event) => onChange(event)} 
                    onBlur={(event) => onBlur(event)} 
                    value={value}
                />
            </section>
        )
    }
}

export default TextArea;
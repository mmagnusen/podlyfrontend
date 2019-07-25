import React from 'react';
import { Button } from '../../'
import './AuthenticationForm.scss'

const AuthenticationForm = ({ children, header, classes, buttonCta, buttonAction, canSubmit, loading }) => (
    <div className='AuthenticationForm'>
        <section className='AuthenticationForm-header'>{header}</section>
        <form className={classes}>
            {children}
        <section className='AuthenticationForm-authenticate'>
            <Button onClick={buttonAction} disabled={!canSubmit} loading={loading}>{buttonCta}</Button>
        </section>

        </form>
    </div>
);

export default AuthenticationForm;
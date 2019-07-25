export const handleResponseError = (error, authenticationType) => {
    if (authenticationType === 'register') {
        if (error.email) {
            return 'A user with this email address already exists.'
        }
        return 'There was an error creating your account. Please check details and try again.'
    }

    if (authenticationType === 'login') {
        return 'Your email/password is not recognised. Please check details and try again.'
    }

    return null;
};
import React from 'react';

const LoginTitle = () => {
    const styles = {
        title: {
            fontFamily: 'Arial, sans-serif',
            fontSize: '2em',
            color: '#2c3e50',
            marginBottom: '20px',
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    };

    return (
        <h1 style={styles.title}>Institutul Teologic Penticostal din Bucuresti</h1>
    );
};

export default LoginTitle;

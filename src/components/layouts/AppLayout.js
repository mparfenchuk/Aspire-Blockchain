import React from 'react';

import Header from './Header';

const AppLayout = ({ children }) => (
    <main>
        <Header />
        <section className="app-container">
            {children}
        </section>
    </main>
);

export default AppLayout;
import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import HomeTitle from '../components/HomeTitle';


const Home: React.FC = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setIsDrawerOpen(open);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Header toggleDrawer={toggleDrawer} />
            <HomeTitle />
            <div style={{ display: 'flex', flexGrow: 1 }}>
                <Sidebar isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
                <MainContent />
            </div>
        </div>
    );
};

export default Home;
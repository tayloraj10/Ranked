import React, { useState } from 'react';
import './Header.css';
import ThemeToggle from './ThemeToggle';
import { Box, Autocomplete, TextField } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import Sidebar from './Sidebar';
import DrawerButton from './DrawerButton';
import { useRankingContext } from '../context/RankingContext';



interface HeaderProps {
    toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const Header: React.FC<HeaderProps> = ({ toggleDrawer }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:600px)');
    const { rankings } = useRankingContext();

    const handleToggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setIsDrawerOpen(open);
    };

    return (
        <header className="app-header">
            <div className="header-inner">
                <div>
                    <DrawerButton
                        onClick={() => toggleDrawer(true)({} as React.MouseEvent)}
                        label={isMobile ? "Recent" : "Recent Rankings"}
                    />
                </div>
                <div className="header-middle">
                    {!isMobile && (<div className="brand">Ranked</div>)}
                    <Box sx={{ width: isMobile ? '40vw' : '30vw' }}>
                        <Autocomplete
                            disablePortal
                            options={rankings.sort((a, b) => new Date(b.lastVoted).getTime() - new Date(a.lastVoted).getTime()).slice(0, 5)}
                            getOptionLabel={(option => option.title)}
                            renderInput={(params) => <TextField {...params} label={isMobile ? "Search..." : "Search For Rankings..."} />}
                        />
                    </Box>
                </div>
                <div className="actions">
                    <ThemeToggle />
                </div>
            </div>
            <Sidebar toggleDrawer={handleToggleDrawer} isDrawerOpen={isDrawerOpen} />
        </header>
    );
};

export default Header;
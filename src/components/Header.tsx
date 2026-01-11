import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import ThemeToggle from './ThemeToggle';
import { Box, Autocomplete, TextField, Tooltip } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { useMediaQuery } from '@mui/material';
import DrawerButton from './DrawerButton';
import { useRankingContext } from '../context/RankingContext';
import type { RankingModel } from '../models/Ranking';
import { APP_NAME } from '../config/constants';



interface HeaderProps {
    toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const Header: React.FC<HeaderProps> = ({ toggleDrawer }) => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const { rankings } = useRankingContext();
    const navigate = useNavigate();

    const sortedRankings = useMemo(() => {
        return [...rankings].sort(
            (a, b) => new Date(b.lastVoted).getTime() - new Date(a.lastVoted).getTime()
        );
    }, [rankings]);

    const filter = useMemo(() => createFilterOptions<RankingModel>(), []);

    const handleRankingSelect = (_event: React.SyntheticEvent, value: RankingModel | null) => {
        if (value) {
            navigate(`/ranking/${value.id}`);
        }
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
                    {!isMobile && (
                        <Tooltip title="Go Home">
                            <div className="brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>{APP_NAME}</div>
                        </Tooltip>
                    )}
                    <Box sx={{ width: isMobile ? '40vw' : '20vw' }}>
                        <Autocomplete
                            disablePortal
                            options={sortedRankings}
                            getOptionLabel={(option => option.title)}
                            onChange={handleRankingSelect}
                            filterOptions={(options, state) => {
                                // Keep all rankings searchable, but only show the most recent 5
                                // when the input is empty.
                                if (!state.inputValue) return options.slice(0, 5);
                                return filter(options, state);
                            }}
                            renderInput={(params) => <TextField {...params} label={isMobile ? "Search..." : "Search For Rankings..."} />}
                            slotProps={{
                                listbox: {
                                    style: { maxHeight: '250px' }
                                }
                            }}
                            ListboxProps={{
                                style: { maxHeight: '250px' }
                            }}
                        />
                    </Box>
                </div>
                <div className="actions">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
};

export default Header;
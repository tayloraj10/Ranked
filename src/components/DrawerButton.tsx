import React from 'react';
import { Button } from '@mui/material';
import './DrawerButton.css';

type DrawerButtonProps = {
    onClick: () => void;
    label: string;
};

const DrawerButton: React.FC<DrawerButtonProps> = ({ onClick, label }) => {
    return (
        <Button
            variant="contained"
            onClick={onClick}
            className='drawer-button'
        >
            {label}
        </Button>
    );
};

export default DrawerButton;
import React from 'react';
import Button from '../../componentes/Atoms/Button/Button';

const Devices: React.FC = () => {
    // const navigate = useNavigate(); // useNavigate hook from react-router-dom   
    return (
        <div>
            <h1>Devices</h1>
            <Button
                label='Add Device'
                type='button'
                size='medium'
                onClick={() => console.log("adding device")}
            />
        </div>
    );
};

export default Devices;
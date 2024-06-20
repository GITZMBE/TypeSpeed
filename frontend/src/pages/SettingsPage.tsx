import React from 'react';
import { deleteUser } from 'api/api';
import { Container, SettingsDangerzoneField } from 'components/layout';
import { useNavigate } from 'react-router-dom';

export const SettingsPage = () => {
  const navigate = useNavigate();

  const handleDeleteUser = () => {
    deleteUser(); 
    navigate('/login'); 
    window.location.reload();
  };

  return (
    <Container>
      <SettingsDangerzoneField 
        iconName='trash' 
        title='Delete Account' 
        message='This action is not reversable' 
        dangerMessage='Your account and its data will be deleted permanently' 
        buttonText='Delete Account'
        action={handleDeleteUser}
      />
    </Container>
  )
}

export default SettingsPage;
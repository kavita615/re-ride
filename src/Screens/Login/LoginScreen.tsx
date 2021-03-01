import React from 'react';
import Body from 'src/Components/Shared/Body/Body';
import Container from 'src/Components/Shared/Container/Container';
import Padding from 'src/Components/Shared/Padding/Padding';
import LoginForm from './Components/LoginForm/LoginForm';

function LoginScreen() {
  return (
    <Container>
      <Body>
        <Padding flex={1} horizontal>
          <LoginForm />
        </Padding>
      </Body>
    </Container>
  );
}

export default LoginScreen;

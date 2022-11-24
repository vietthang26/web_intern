import {
  Button,
  Center,
  Container,
  Flex,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useUserSlice } from 'store/app/user';
import { selectorUser } from 'store/app/user/selector';
import { LoginPayload } from 'store/app/user/types';

export function LoginPage() {
  const { actions } = useUserSlice();
  const user = useSelector(selectorUser);

  const dispatch = useDispatch();
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    // validate: {
    //   username: value => (value.length < 2 ? 'Too short' : null),
    //   password: value => (value.length < 2 ? 'Too short' : null),
    // },
  });

  const handleLogin = (data: LoginPayload) => {
    dispatch(actions.loginRequest(data));
  };

  if (user?.isLoading) {
    return <div>Loading</div>;
  }

  return (
    <>
      {user?.user && <Navigate to="/" replace={true} />}
      <Center
        h={'100vh'}
        sx={theme => ({
          backgroundImage: theme.fn.gradient(),
          color: theme.colors.blue[7],
        })}
      >
        <Container
          w={400}
          p="30px 20px"
          bg={'white'}
          sx={theme => ({
            borderRadius: '10px',
          })}
        >
          <Title order={1} mb={'10px'}>
            LOGIN
          </Title>
          <form onSubmit={form.onSubmit(handleLogin)}>
            <Flex direction={'column'} gap={'1rem'}>
              <TextInput
                label="Username"
                placeholder="Username"
                {...form.getInputProps('username')}
              />
              <PasswordInput
                label="Password"
                placeholder="Password"
                {...form.getInputProps('password')}
              />
              <Button w={'100%'} type="submit">
                Login
              </Button>
            </Flex>
          </form>
        </Container>
      </Center>
    </>
  );
}

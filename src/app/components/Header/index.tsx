import React from 'react';
import {
  Button,
  Flex,
  Header as HeaderApp,
  ActionIcon,
  Text,
  Title,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useUserSlice } from 'store/app/user';
import { useDispatch, useSelector } from 'react-redux';
import { selectorUser } from 'store/app/user/selector';

export default function Header() {
  const { actions } = useUserSlice();
  const user = useSelector(selectorUser);
  const dispatch = useDispatch();
  const history = useNavigate();

  const hanldeLogout = () => {
    dispatch(actions.logout('logout'));
  };

  return (
    <HeaderApp height={60} p={'10px 5%'}>
      <Flex justify={'space-between'}>
        <Title order={2} color="blue">
          Header
        </Title>

        {user?.user ? (
          <Button variant="light" color="blue" onClick={hanldeLogout}>
            Đăng xuất
          </Button>
        ) : (
          <Button
            variant="light"
            color="blue"
            onClick={() => {
              history('/login');
            }}
          >
            Đăng nhập
          </Button>
        )}
      </Flex>
    </HeaderApp>
  );
}

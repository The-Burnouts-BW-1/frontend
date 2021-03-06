import React from 'react';
import { useForm } from 'react-hook-form';

import axios from 'axios';

import {
  Button,
  FormControl,
  FormErrorMessage,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/core';

const Register = ({ history }) => {
  const { handleSubmit, errors, register, formState } = useForm();
  // show password as text
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  // form validation
  function validateUsername(value) {
    let error;
    if (!value) {
      error = 'Username is required';
    } else if (value.length < 5) {
      error = 'Username must be at least 5 characters';
    }
    return error || true;
  }

  function validatePassword1(value) {
    let error;
    if (!value) {
      error = 'Password is required';
    } else if (value.length < 8) {
      error = 'Password must be at least 8 characters';
    }
    return error || true;
  }

  function validatePassword2(value) {
    let error;
    if (!value) {
      error = 'Password is required';
    } else if (value.length < 8) {
      error = 'Password must be at least 8 characters';
    }
    return error || true;
  }

  // submitting the form
  const submitForm = (creds) => {
    // Axios calls happen here
    console.log(creds);
    axios
      .post(
        'https://the-burnouts-production.herokuapp.com/api/registration',
        creds
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem('token', res.data.key);
        history.push('/home');
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <Flex className='LoginSplash' w='100%' minH='100vh' justify='center'>
      <Flex maxW='1440px' w='100%' justify='center'>
        <Flex
          w='40%'
          mb='10%'
          mr='8%'
          justify='center'
          align='center'
          flexDir='column'
        >
          <form onSubmit={handleSubmit(submitForm)}>
            <Flex
              w='473px'
              h='480px'
              flexDir='column'
              background='#FDFDFF'
              justify='center'
            >
              <Flex
                as='h2'
                fontSize='32px'
                fontFamily='Poppins'
                justify='center'
                mx='1'
                my='2%'
              >
                Welcome New User!
              </Flex>

              <Flex wrap='wrap' w='411px%' justify='center'>
                <FormControl isInvalid={errors.username}>
                  <Input
                    mb='30px'
                    w='404px'
                    type='text'
                    rounded='3px'
                    variant='filled'
                    name='username'
                    label='username'
                    placeholder='Username'
                    autoCapitalize='none'
                    ref={register({ validate: validateUsername })}
                  />
                  <FormErrorMessage>
                    {errors.username && errors.username.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.password1}>
                  <Flex flexDir='column'>
                    <InputGroup>
                      <Input
                        mb='30px'
                        type={show ? 'text' : 'password'}
                        w='404px'
                        rounded='3px'
                        variant='filled'
                        name='password1'
                        label='password1'
                        placeholder='***Password***'
                        autoCapitalize='none'
                        ref={register({ validate: validatePassword1 })}
                      />
                      <InputRightElement width='4.5rem' pt='3px'>
                        <Button
                          // position='fixed'
                          h='1.75rem'
                          color='rgba(72, 72, 72, 0.1)'
                          border='none'
                          size='sm'
                          backgroundColor='#FDFDFF'
                          onClick={handleClick}
                        >
                          {show ? 'Hide' : 'Show'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.password1 && errors.password1.message}
                    </FormErrorMessage>
                  </Flex>
                </FormControl>
                <FormControl isInvalid={errors.password2}>
                  <Flex flexDir='column'>
                    <InputGroup>
                      <Input
                        mb='30px'
                        type={show ? 'text' : 'password'}
                        w='404px'
                        rounded='3px'
                        variant='filled'
                        name='password2'
                        label='password2'
                        placeholder='retype password'
                        autoCapitalize='none'
                        ref={register({ validate: validatePassword2 })}
                      />
                      <InputRightElement width='4.5rem' pt='3px'>
                        <Button
                          // position='fixed'
                          h='1.75rem'
                          color='rgba(72, 72, 72, 0.1)'
                          border='none'
                          size='sm'
                          backgroundColor='#FDFDFF'
                          onClick={handleClick}
                        >
                          {show ? 'Hide' : 'Show'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.password2 && errors.password2.message}
                    </FormErrorMessage>
                  </Flex>
                </FormControl>
                <Flex w='100%' justify='center'>
                  <Button
                    border='none'
                    w='440px'
                    size='lg'
                    color='white'
                    backgroundColor='#344CD0'
                    isLoading={formState.isSubmitting}
                    type='submit'
                    data-cy='loginSubmit'
                  >
                    Register
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Register;

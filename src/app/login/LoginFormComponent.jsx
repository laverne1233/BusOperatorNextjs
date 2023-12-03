'use client'

import {
    Button,
    Checkbox,
    Flex,
    Text,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Image,
    Divider,
} from '@chakra-ui/react'
import { signIn } from 'next-auth/react'

export default function LoginFormComponent(user) {
    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex flex={4} display={{ base: "none", md: "flex" }}>
                <Image
                    alt={'Login Image'}
                    objectFit={'cover'}
                    src={
                        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
                    }
                />
            </Flex>
            <Flex p={8} flex={3} align={'center'} justify={'center'}>
                <Stack spacing={4} padding={15} w={'full'} maxW={'md'}>
                    <Heading fontSize={'2xl'} align={'center'}>Welcome to BusYan</Heading>
                    <Text align={'center'}>Enter your account</Text>
                    <FormControl id="email">
                        <Input type="email" name='email' borderRadius="10" placeholder="Email" />
                    </FormControl>
                    <FormControl id="password">
                        <Input type="password" borderRadius="10" placeholder='Password' />
                    </FormControl>
                    <Stack spacing={6}>
                        <Stack
                            direction={{ base: 'column' }}
                            align={{ base: 'start', md: 'end' }}>
                            <Text fontSize={'medium'}>Forgot password?</Text>
                        </Stack>
                        <Button type='submit' colorScheme={'blue'} variant={'solid'}>
                            Sign in
                        </Button>
                        <Stack
                            direction={{ base: 'column', md: 'row' }}
                            align={'center'}
                            justify={'center'}>
                            <Text>Dont have an account?</Text>
                            <Text color={'#00B11C'}>Sign Up</Text>
                        </Stack>
                        <Stack
                            direction={{ base: 'column', md: 'row' }}
                            align={'center'}
                            justify={'center'}>
                            <Divider />
                            <Text fontSize="small">or</Text>
                            <Divider />
                        </Stack>
                        <Button onClick={() => signIn('google')} variant={'solid'} justifyContent={'center'} gap={2}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="23" height="23" viewBox="0 0 48 48">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg>
                            Sign in with Google
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </Stack>

    )
}
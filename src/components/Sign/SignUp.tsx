import { Container, Button, PasswordInput, TextInput, Text, PinInput } from '@mantine/core';
import React, { useState } from 'react';
import UserPool from '../../UserPool/UserPool';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export function SignUp() {

    const navigate = useNavigate();

    const [pin, setPin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [clicked, setClicked] = useState(false) ;

    const signupUser = (event: any) => {
        event.preventDefault();

        UserPool.signUp(email, password, [], [], (err: any, data: any) => {
            if (err) {
                console.error(err);
            }
            console.log(data);
            setClicked(true);
            toast.info('Verification code sent to mail', {
                position: toast.POSITION.TOP_RIGHT
            });
        })
    }

    const onVerify = (event: any) => {
        event.preventDefault();
        const user = new CognitoUser({
            Username: email,
            Pool: UserPool,
        });

        user.confirmRegistration(pin, true, function (err, result) {
            if (err) {
                console.log(err);
                toast.warning('please enter valid code', {
                    position: toast.POSITION.TOP_RIGHT
                });
            } else {
                console.log(result);
                toast('Account verified', {
                    position: toast.POSITION.TOP_RIGHT
                });
                navigate("/dashboard")
            }
        });
    };

    return (
        <>
            <Container size="xs" >
                <TextInput
                    label="Email: "
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    mt='md'
                />
                <PasswordInput
                    label="Password:"
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    mt='md'
                />
                {
                    clicked && <Text size="xs" mt='md'>Enter the 6-digit verification code </Text>
                }
                {
                    clicked && <PinInput
                        size="md" length={6}
                        mask placeholder="X"
                        value={pin}
                        onChange={(event) => setPin(event)}
                        mt='md'
                    />
                }

                {
                    clicked ? <Button fullWidth mt='md' onClick={onVerify}>Verify</Button> : <Button fullWidth mt='md' onClick={signupUser}>Sign Up</Button>
                }
            </Container>
        </>
    );
}
import React, {useState} from 'react';
import { Container,Button,PasswordInput,TextInput,Text, Anchor } from '@mantine/core';
import UserPool from '../../UserPool/UserPool';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLocalStorage } from '@mantine/hooks';

interface Props {
    setTabState : React.Dispatch<React.SetStateAction<string | null>>
}

export function LogIn({setTabState}:Props) {

    const [value, setValue] = useLocalStorage({ key: 'userid', defaultValue: '' });
    const [username, setUsername] = useLocalStorage({ key: 'username', defaultValue: '' });

    const [fname, setFname] = useLocalStorage({ key: 'fname', defaultValue: '' });

    const [lname, setLname] = useLocalStorage({ key: 'lname', defaultValue: '' });


    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
  
    const onClick = (event:any) => {
      event.preventDefault();
      
    const user =  new CognitoUser({
        Username: email,
        Pool: UserPool,
    });
    
    const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
    });

    user.authenticateUser(authDetails, {
        onSuccess: (data) => {
            console.log("onSuccess: ", data);
            console.log(data.getIdToken())
            setFname(data.getIdToken().payload['custom:firstName'])
            setLname(data.getIdToken().payload['custom:lastName'])
            setValue(data.getAccessToken().payload.sub)
            setUsername(data.getIdToken().payload.email)

            toast.success('Logged in successfully', {
                position: toast.POSITION.TOP_RIGHT
            });
            navigate("/dashboard")
        },
        onFailure: (err) => {
            console.error("onFailure: ", err);
        },
        newPasswordRequired: (data) => {
            console.log("newPasswordRequired: ", data);
        }
    });

    } 

    return(
        <>
        <Container size="xs" style={{ marginTop: '15px' }}>
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
        <Button fullWidth mt='md' onClick={onClick}> Login</Button>
        <Text size="xs" mt='md'>Do not have an account yet? </Text><Anchor onClick={()=>{setTabState("signup")}} size="xs" target="_blank" underline="hover">Create Account
          </Anchor>
          </Container>
        </>
    );
    }
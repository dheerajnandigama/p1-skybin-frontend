import { Grid, Paper, Center, Button, Container, Text } from '@mantine/core';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import { SiAmazoncloudwatch } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import { BaseDemo } from './Upload';
import { Demo } from './Table';
import { Profile } from './UserProfile';
import { toast } from 'react-toastify';
import '@mantine/dropzone/styles.css';
import { Image } from '@mantine/core';
import myImage from '../../cloud-database-hosting-svgrepo-com.png';
import classes from './Dashboard.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

export function Dashboard() {

    const [opened, { toggle }] = useDisclosure(false);

    const [updateFile, setUpdateFile] = useState({})


    const [list,setList] = useState([])

    const [value, setValue] = useLocalStorage({ key: 'userid', defaultValue: '' });
    const [username, setUsername] = useLocalStorage({ key: 'username', defaultValue: '' });
    const [fname, setFname] = useLocalStorage({ key: 'fname', defaultValue: '' });

    const [lname, setLname] = useLocalStorage({ key: 'lname', defaultValue: '' });

    
    
    const demoProps = {
        bg: 'var(--mantine-color-blue-light)',
        h: 350,
        mt: 'md',

    };

    const navigate = useNavigate();
    
    const logout = () => {
        console.log("logged out")
        setValue('')
        setUsername('')
        setFname('')
        setLname('')

        toast.error('Logged out successfully', {
            position: toast.POSITION.TOP_RIGHT
        });
        navigate("/")   
    }

    const fileUploaded = () =>{
        getList()
    }

    const getList = async() => {
        if(value!==''){
            const res3 = await axios.get(`http://18.221.171.78:5000/api/v1/readList?userId=${value}`)
            console.log(res3.data)
            const sortedData= res3.data.data.sort((a:any,b:any)=>{
                return new Date(a.uploadedTime).getTime() - new Date(b.uploadedTime).getTime()
            })
            setList(res3.data.data)

        }
    }

    useEffect(()=>{
        if(value!==''){
            getList()
        }
        
    },[value])


    useEffect(()=>{

        console.log(updateFile)
        
    },[updateFile])

    return (
        <>
            <header className={classes.header}>
                <Container size="xl">
                    <div className={classes.inner}>
                        <div style={{ display: "flex", justifyContent: "flexStart", alignItems: "center" , gap:'7px'}}>
                            <Text fw={700} size="xl" c="white"> Sky Bin</Text>
                            <Image src={myImage}  h={30} w="auto" fit="contain" />
                        </div>
                        <Button variant="filled" color="red" onClick={logout}> Log Out</Button>
                    </div>
                </Container>
            </header>
                <Grid style={{ backgroundColor: '#F5F5F5'}}>
                    <Grid.Col span="auto">
                            <Profile />
                            <BaseDemo fileUploaded={fileUploaded} setUpdateFile={setUpdateFile} updateFile={updateFile}/>
                    </Grid.Col>
                    <Grid.Col span={9}>
                        <Demo list={list} fileUploaded={getList} setUpdateFile={setUpdateFile}/>
                    </Grid.Col>
                </Grid>
        </>
    );
}
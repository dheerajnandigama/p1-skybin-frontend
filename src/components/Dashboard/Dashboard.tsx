import { Grid, Paper, Center, Button, Container, Text } from '@mantine/core';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import { SiAmazoncloudwatch } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import { BaseDemo } from './Upload';
import { Demo } from './Table';
import { toast } from 'react-toastify';
import '@mantine/dropzone/styles.css';
import classes from './Dashboard.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

export function Dashboard() {
    const [opened, { toggle }] = useDisclosure(false);

    const [updateFile, setUpdateFile] = useState({})


    const [list,setList] = useState([])

    const [value, setValue] = useLocalStorage({ key: 'userid', defaultValue: '' });

    const demoProps = {
        bg: 'var(--mantine-color-blue-light)',
        h: 350,
        mt: 'md',

    };

    const navigate = useNavigate();
    
    const logout = () => {
        console.log("logged out")
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
            const res3 = await axios.get(`http://localhost:5000/api/v1/readList?userId=${value}`)
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
                        <div style={{ display: "flex", justifyContent: "flexStart", alignItems: "center" }}>
                            <Text fw={800} c="white"> Sky Bin</Text>
                            <SiAmazoncloudwatch size={24} color='white' />
                        </div>
                        <Button variant="filled" color="red" onClick={logout}> Log Out</Button>
                    </div>
                </Container>
            </header>
                <Grid>
                    <Grid.Col span="auto">
                            <BaseDemo fileUploaded={fileUploaded} setUpdateFile={setUpdateFile} updateFile={updateFile}/>
                    </Grid.Col>
                    <Grid.Col span={7}>
                        <Demo list={list} fileUploaded={getList} setUpdateFile={setUpdateFile}/>
                    </Grid.Col>
                </Grid>
        </>
    );
}
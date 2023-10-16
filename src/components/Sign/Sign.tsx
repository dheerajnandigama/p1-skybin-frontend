import { Tabs,Container,Button,PasswordInput,TextInput,Text, Anchor } from '@mantine/core';
import { FaUserCircle,FaUserFriends } from 'react-icons/fa'
import { SignUp } from './SignUp';
import { LogIn } from './LogIn';
import { useState } from 'react';

export function Sign() {
  const demoProps = {
    bg: 'var(--mantine-color-blue-light)',
    h: 420,
    mt: 'md',
  }; 
  
  const [activeTab, setActiveTab] = useState<string | null>('login')
 
  return (
    <>
      <Container size="xs"  {...demoProps} h={activeTab==='login'?350:450}>
      <Tabs variant='pills' value={activeTab} onChange={setActiveTab} >
      <Tabs.List grow justify='center' >
        <Tabs.Tab value="login" leftSection style={{ marginTop: '15px' }}>
        Log In <FaUserCircle/>
        </Tabs.Tab>
        <Tabs.Tab value="signup" rightSection style={{ marginTop: '15px' }}>
        Sign Up <FaUserFriends/>
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="login">
      <LogIn setTabState={setActiveTab}/>
      </Tabs.Panel>

      <Tabs.Panel value="signup">
      <SignUp/>
      </Tabs.Panel>
    </Tabs>
    </Container>
    </>
  );
}



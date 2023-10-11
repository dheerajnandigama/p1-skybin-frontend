import { Group, Text, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import {FaFileUpload} from 'react-icons/fa';
import axios from 'axios';
import { useLocalStorage } from '@mantine/hooks';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  fileUploaded: ()=>void,
  setUpdateFile: Dispatch<SetStateAction<{}>>
  updateFile: any
}

export function BaseDemo({fileUploaded,setUpdateFile,updateFile}: Props) {

  const [value, setValue] = useLocalStorage({ key: 'userid', defaultValue: '' });
  const [username, setUsername] = useLocalStorage({ key: 'username', defaultValue: '' });

  const preSignedUrl = async(files: FileWithPath[]) => {

    files[0].arrayBuffer()

    console.log(files[0],files[0].path,files[0].type)
    const res = await axios.post("http://localhost:5000/api/v1//uploads3File",{
      "objectKey":`${value}/${files[0].path}`,
      "contentType":files[0].type
    })
    console.log(res.data,"presigned url recieved")

    const hey = await files[0].arrayBuffer()
    console.log(hey)
    const res1 = await axios.put(res.data.signedUrl,hey)
    console.log(res1.data)
    console.log(value)

    if(updateFile?.id){

      const res2 = await axios.put("http://localhost:5000/api/v1/updates3File",{
       ...updateFile,
       "filePath":`${value}/${files[0].path}`,
       "fileName": `${files[0].name}`
      })
      console.log(res2.data)
      setUpdateFile({})

    }else{

      const res2 = await axios.post("http://localhost:5000/api/v1/insertDBdetails",{
        "userName":username,
        "userId":value,
        "filePath":`${value}/${files[0].path}`,
        "fileName": `${files[0].name}`
      })
      console.log(res2.data)
    }

    fileUploaded()
  }

  return (
    <Dropzone 
    style={{
        backgroundColor: '#F5F5F5', 
        border: '2px dashed #CCCCCC',
        marginLeft: '15px', 
      }}
      onDrop={preSignedUrl}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
    >
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <FaFileUpload
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
            
          />
        </Dropzone.Idle>

        <div>
          <Text fw = {700} size="xl" inline>
            {updateFile?.id ?`${updateFile.fileName} is selected click to update`:'Drag and Drop here'}
          </Text>
          <Text size="xl" inline>
            Click here to Import files
          </Text>
          <Text fs="italic" size="sm" c="dimmed" inline mt={7}>
            File should not exceed 10mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
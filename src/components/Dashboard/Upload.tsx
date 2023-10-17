import { Button, Group, Modal, Text, Textarea, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, FileWithPath, IMAGE_MIME_TYPE, MS_EXCEL_MIME_TYPE, MS_POWERPOINT_MIME_TYPE, MS_WORD_MIME_TYPE, PDF_MIME_TYPE } from '@mantine/dropzone';
import {FaFileUpload} from 'react-icons/fa';
import axios from 'axios';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  fileUploaded: ()=>void,
  setUpdateFile: Dispatch<SetStateAction<{}>>
  updateFile: any
}

export function BaseDemo({fileUploaded,setUpdateFile,updateFile}: Props) {

  const [opendesc, { open, close }] = useDisclosure(false);

  const openRef = useRef<() => void>(null);

  const [value, setValue] = useLocalStorage({ key: 'userid', defaultValue: '' });
  const [username, setUsername] = useLocalStorage({ key: 'username', defaultValue: '' });
  const [fname, setFname] = useLocalStorage({ key: 'fname', defaultValue: '' });
  const [lname, setLname] = useLocalStorage({ key: 'lname', defaultValue: '' });
  const [files,setNewFile]=useState<FileWithPath[]>([])
  const [desc, setDesc] = useState('');

  const preSignedUrl = async() => {

    files[0].arrayBuffer()

    console.log(files[0],files[0].path,files[0].type)
    const res = await axios.post("http://18.221.171.78:5000/api/v1/uploads3File",{
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

      const res2 = await axios.put("http://18.221.171.78:5000/api/v1/updates3File",{
       ...updateFile,
       "filePath":`${value}/${files[0].path}`,
       "fileName": `${files[0].name}`
      })
      console.log(res2.data)
      toast.info('File Updated', {
        position: toast.POSITION.TOP_RIGHT
    });
      setUpdateFile({})


    }else{

      const res2 = await axios.post("http://18.221.171.78:5000/api/v1/insertDBdetails",{
        "userName":username,
        "userId":value,
        "filePath":`${value}/${files[0].path}`,
        "fileName": `${files[0].name}`,
        "firstName": fname,
        "lastName": lname,
        "desc": desc,
      })
      toast.success('File Uploaded', {
        position: toast.POSITION.TOP_RIGHT
    });
      console.log(res2.data)
    }

    fileUploaded()
  }

  

  return (
    <div>
    <Dropzone 
    style={{
        border: '2px dashed #CCCCCC',
        marginLeft: '15px', 
        height: '250px'
      }}
      onDrop={(file)=>{
        open()
        setNewFile(file)
      }}
      onReject={(files) => {
        console.log('rejected files', files)
        toast.warning('File size exceeded than 10 MB', {
          position: toast.POSITION.TOP_RIGHT
      });
    }}
      maxSize={10 * 1024 ** 2}
      accept={[...IMAGE_MIME_TYPE, ...PDF_MIME_TYPE, ...MS_WORD_MIME_TYPE, ...MS_EXCEL_MIME_TYPE, ...MS_POWERPOINT_MIME_TYPE]}
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
            {updateFile?.id ?`${updateFile.fileName} is selected click to update`:'DRAG AND DROP HERE'}
          </Text>
          <Text fs="italic" size="lg" c="dimmed" inline mt={7}>
            File should not exceed 10mb
          </Text>
        </div>
        <div>
        <Button onClick={() => {
          openRef.current?.()
          }}>Select files</Button>
        </div>
      </Group>
     
    </Dropzone>
     <Modal opened={opendesc} onClose={close} title="Add Description">
     <Textarea
     label="File Description"
     placeholder="Enter the File Description"
     value={desc} onChange={(event) => setDesc(event.currentTarget.value)} 
   />
     <Button style={{marginTop:'5px'}} onClick={()=>{
       close()
       preSignedUrl()
     }}>Submit</Button>
     </Modal>
     </div>
  );
}
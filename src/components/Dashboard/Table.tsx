import { Table,Button } from '@mantine/core';
import axios from 'axios';
import fileDownload from 'js-file-download';
import { Dispatch, SetStateAction } from 'react';
import { FaDownload,FaEdit,FaStopCircle} from 'react-icons/fa';
import { toast } from 'react-toastify';


 

  interface Props{
    list:any[]
    fileUploaded: ()=>void
    setUpdateFile: Dispatch<SetStateAction<{}>>
  }




export function Demo({list,fileUploaded,setUpdateFile}:Props) {

  const processDownload = async (url: string, filename: string) => {
    console.log('here')
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  const process_delete = async (id:string) =>{

    const response=await axios.delete(`http://18.221.171.78:5000/api/v1/deletes3File?id=${id}`)
    toast.error('File Deleted', {
      position: toast.POSITION.TOP_RIGHT
  });
    console.log(response.data)
    console.log(fileUploaded)
    fileUploaded()


  }

  const process_update = async(element:any) => {
    console.log('hey')
    setUpdateFile(element)
  }


  let rows;

  if(list.length>0){
    rows=list.map((element) => (
      <Table.Tr key={element.id}>
        <Table.Td>{`${element.firstName} ${element.lastName}`}</Table.Td>
        <Table.Td>{element.uploadedTime}</Table.Td>
        <Table.Td>{new Date(element.modifiedTime).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}</Table.Td>
        <Table.Td>{element.fileName}</Table.Td>
        <Table.Td>{element.desc}</Table.Td>
        <Table.Td>
        <Button variant="outline" rightSection={<FaDownload size={14} />}color="blue" mr="md" onClick={()=>{
          processDownload(`https://dcnmc5xxghqrf.cloudfront.net/${element.filePath}`,element.fileName)
        }}> Download</Button>
        <Button variant="outline" rightSection={<FaEdit size={14} />}color="green" mr="md" onClick={()=>{
          process_update(element)
        }}> Update</Button>
        <Button variant="outline" rightSection={<FaStopCircle size={14} />} color="red" onClick={() => {
          process_delete(element.id)
          }}> Delete</Button>
        </Table.Td>
      </Table.Tr>
    ));

  }
  

  return (
    <Table striped highlightOnHover withTableBorder style={{marginRight: '15px',marginLeft: '15px', marginBottom: '30px', marginTop: '30px'}}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Uploaded Time</Table.Th>
          <Table.Th>Modified Time</Table.Th>
          <Table.Th>File Name</Table.Th>
          <Table.Th>Description</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
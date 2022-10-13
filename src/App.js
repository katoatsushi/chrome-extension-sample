import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import Dropzone from 'react-dropzone'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CommentForm from './fileUploader.tsx'

export default function AxiosTest() {
  const [count, setCount] = useState(0);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const ref = useRef(null);
  const onPostForm = useCallback(async(data) => {
    try {
      // Object の data を FormData 形式に変換する
      const params = new FormData();
      Object.keys(data).forEach(function(key) {
        params.append(key, this[key]);
      }, data);
      const res = await axios.post('http://localhost:3000', params, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res);
    } catch(err) {
      console.log(err);
    }
  }, []);

  const onSubmitHandler = useCallback((e) => {
    e.preventDefault();
    onPostForm({
      file: ref.current.files[0],
    });
  }, [onPostForm]);
  useEffect(()=>{
    setCount(10)
  },[])

  function Clicked(){
    setCount((prev) => prev + 1)
    var message = "テストです"
    enqueueSnackbar(message, { 
      variant: 'success',
    });
  }

  return (
    <div className="App">
      <header>
        <h1>カウント {count} </h1>
      </header>

      <Button variant="outlined" onClick={() => Clicked()}>
        カウントする
      </Button>
      <hr/>
      
      <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)} >
        {({getRootProps, getInputProps}) => (
          <Button variant="outlined">
            <FileDownloadIcon/>
            <section>
              <div {...getRootProps()} style={{color: 'black'}}>
                <input {...getInputProps()} />
                <p>ここにファイルをドラッグするか、クリックしてファイルを選択してください</p>
              </div>
            </section>
          </Button>
        )}
      </Dropzone>

      <CommentForm/>
    </div>
  );
}

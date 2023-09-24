"use client";

import React, { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { useDropzone } from "react-dropzone";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Link from "next/link";

function App() {
  const [responses, setResponses] = useState<{
    "video-audio": string;
    photo: string;
  }>({ "video-audio": "", photo: "" });

  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      video: true, // Enable video recording
      audio: true, // Enable audio recording
      onStop: (blobUrl) => {
        setResponses({ ...responses, "video-audio": blobUrl });
      },
    });

  const onDrop = (acceptedFiles: any) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const blobUrl = URL.createObjectURL(file);
      setResponses({ ...responses, photo: blobUrl });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { image: ["image/*"] },
  });

  return (
    <div className="App">
      <Grid container spacing={2}>
        <Grid item xs>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Mock получения вопросов c сервера
              </Typography>
            </CardContent>
            <CardActions>
              <Link href="./questionnaire">{"Перейти"}</Link>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Mock получения вопросов c сервера
              </Typography>
            </CardContent>
            <CardActions>
              <Link href="./uploader">{"Перейти"}</Link>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

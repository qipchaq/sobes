"use client";

import React, { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import Button from "@mui/material/Button";

const questions = [
  {
    id: 1,
    type: "text",
    text: "Enter your name:",
  },
  {
    id: 2,
    type: "single-choice",
    text: "What is your favorite color?",
    options: ["Red", "Blue", "Green", "Yellow"],
  },
  {
    id: 3,
    type: "multi-choice",
    text: "Select your hobbies:",
    options: ["Reading", "Gaming", "Cooking", "Traveling"],
  },
  {
    id: 4,
    type: "video-audio",
    text: "Record a video or audio response:",
  },
  {
    id: 5,
    type: "photo",
    text: "Upload a photo:",
  },
];

function Questionnaire() {
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
      <h1>Questionnaire</h1>
      <form>
        {questions.map((question) => (
          <div key={question.id}>
            <p>{question.text}</p>
            {question.type === "text" && <input type="text" />}
            {question.type === "single-choice" && (
              <select>
                {question.options?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            {question.type === "multi-choice" && (
              <div>
                {question.options?.map((option, index) => (
                  <label key={index}>
                    <input type="checkbox" value={option} /> {option}
                  </label>
                ))}
              </div>
            )}
            {question.type === "video-audio" && (
              <div>
                {status === "idle" && (
                  <button onClick={startRecording}>Start Recording</button>
                )}
                {status === "recording" && (
                  <button onClick={stopRecording}>Stop Recording</button>
                )}
                {mediaBlobUrl && (
                  <video controls src={mediaBlobUrl} width="300" height="200" />
                )}
              </div>
            )}
            {question.type === "photo" && (
              <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <p>Drag & drop a photo here, or click to select one</p>
                {responses.photo && (
                  <Image
                    src={responses.photo}
                    alt="Uploaded"
                    width={"200"}
                    height={200}
                  />
                )}
              </div>
            )}
          </div>
        ))}
        <button type="submit">Submit</button>
        <Button variant="contained">Text</Button>
      </form>
    </div>
  );
}

export default Questionnaire;

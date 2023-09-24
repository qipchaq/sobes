"use client";

import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";

const API_KEY = "6d207e02198a847aa98d0a2a901485a5";

function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUpload = async () => {
    try {
      if (!selectedImage) {
        console.error("No image selected.");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);

      reader.onload = async () => {
        const base64Image = reader?.result?.split(",")[1];
        const formData = new URLSearchParams();
        formData.append("key", API_KEY);
        formData.append("action", "upload");
        formData.append("data", base64Image);
        formData.append("format", "json");
        const response = await axios.post(
          "https://freeimage.host/api/1/upload",
          formData
          // `https://freeimage.host/api/1/upload?key=${API_KEY}&action=upload&data=${base64Image}&format=json`
        );

        setImageUrl(response.data.url);
      };
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleImageChange = (e: any) => {
    setSelectedImage(e.target.files[0]);
  };

  return (
    <div>
      <h1>Image Uploader</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
      {imageUrl && (
        <div>
          <h2>Uploaded Image</h2>
          <Image src={imageUrl} alt="Uploaded" width={"200"} height={200} />
        </div>
      )}
    </div>
  );
}

export default ImageUploader;

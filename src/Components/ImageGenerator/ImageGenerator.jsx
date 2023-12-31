import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import def_image from "../Assets/def_image.jpg";
const ImageGenerator = () => {
  const [image_url, setImage_url] = useState("/");
  const [loading, setLoading] = useState(false);
  let inputRef = useRef(null);
  //API Key= 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
  const imageGenerate = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    setLoading(true);
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer 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",
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: "512x512",
        }),
      }
    );

    let data = await response.json();
    // console.log(data);
    let data_array = data.data;
    setImage_url(data_array[0].url);
    setLoading(false);
  };
  return (
    <div className="ai-image-generator">
      <div className="header">
        AI Image <span>Generator</span>
      </div>
      <div className="image-loading">
        <div className="image">
          <img
            src={image_url === "/" ? def_image : image_url}
            alt="ai generated images"
          />
        </div>
        <div className="loading">
          <div className={loading ? "loading-img-full" : "loading-img"}></div>
          <div className={loading ? "loading-text" : "display-none"}>
            Loading...
          </div>
        </div>
      </div>

      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          placeholder="Enter Description"
          className="search-input"
        />
        <div
          className="generate-btn"
          onClick={() => {
            imageGenerate();
          }}
        >
          Generate
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;

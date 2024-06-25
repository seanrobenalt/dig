const fetch = require("node-fetch");
const FormData = require("form-data");

export const uploadImageToImgur = async (imageBuffer) => {
  try {
    const formData = new FormData();
    formData.append("image", imageBuffer, {
      filename: "leaders.png",
      contentType: "image/png",
    });
    formData.append("type", "file");
    formData.append("title", "Dig Leaderboard");
    formData.append("description", "Leaderboard for Dig game.");

    const response = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: "Client-ID f5ceddb030b0498",
        ...formData.getHeaders(),
      },
      body: formData,
    });

    const data = await response.json();
    return data.data.link;
  } catch (error) {
    console.error("Error uploading image to Imgur:", error);
    return null;
  }
};

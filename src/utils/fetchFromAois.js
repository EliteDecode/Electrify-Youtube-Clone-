import axios from "axios";

const Baseurl = "https://youtube-v31.p.rapidapi.com";
const options = {
  url: Baseurl,
  params: {
    maxResults: "50",
  },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_YTV3_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchFromApi = async (url) => {
  const { data } = await axios.get(`${Baseurl}/${url}`, options);

  return data;
};

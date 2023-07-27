import React, { useState, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import Videos from "./Videos";
import { fetchFromApi } from "../utils/fetchFromAois";
import ReactPlayer from "react-player";
import { CheckCircle } from "@mui/icons-material";

const VideoDetail = () => {
  const { id } = useParams();
  const [VideoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    fetchFromApi(`videos?part=snippet,statistics&id=${id}`).then((data) => {
      setVideoDetail(data?.items[0]);
    });

    fetchFromApi(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => {
        setVideos(data?.items);
      }
    );
  }, [id]);

  if (!VideoDetail?.snippet) return "Loading...";
  const {
    snippet: { title, description, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = VideoDetail;
  console.log(VideoDetail?.snippet);
  return (
    <Box minHeight="95vh">
      <Stack direction={{ sx: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color="#fff" fontWeight="bold" variant="h5" p={2}>
              {title}{" "}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={2}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color="#fff"
                >
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: 12, color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" justifyContent="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
            <Typography
              color="#fff"
              variant="subtitle2"
              sx={{ opacity: 0.8 }}
              p={2}
            >
              {description}{" "}
            </Typography>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, sm: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;

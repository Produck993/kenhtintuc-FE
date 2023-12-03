import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Paper } from "@mui/material";
import moment from "moment/moment";

export default function Home() {
  const [pageInfo, setPageInfo] = useState([]);
  const [topView, setTopView] = useState([]);
  const navigate = useNavigate();
  const handleGetData = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/posts?${qs.stringify({
          populate: {
            img_cate: {
              fields: ["name", "url"],
            },
            categories: {
              fields: ["name"],
            },
          },
          sort: {
            createdAt: "desc",
          },
        })}`,
        { encodeValuesOnly: true }
      )
      .then((res) => {
        setPageInfo(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  //Lay top
  const handlerGetDetail = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/posts?${qs.stringify({
          populate: {
            img_cate: {
              fields: ["name", "url"],
            },
            categories: {
              fields: ["name"],
            },
          },
          sort: {
            viewed: "desc",
          },
        })}`,
        { encodeValuesOnly: true }
      )
      .then((res) => {
        setTopView(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    handlerGetDetail();
    handleGetData();
  }, []);

  return (
    <>
      <main
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* Hero unit */}
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            gap: "14px",
            paddingY: "24px",
            width: "fit-content",
            borderRadius: "10px",
            boxShadow: "2px 5px 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Container maxWidth="md">
            <Card sx={{ display: "flex", gap: "8px" }} key={topView[0]?.id}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="300"
                image={`${process.env.REACT_APP_IMAGE_URL}${topView[0]?.attributes.img_cate?.data?.attributes.url}`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {topView[0]?.attributes.title || ""}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {topView[0]?.attributes.top_title || ""}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onKeyDown={() => {
                    navigate(`/details/1`);
                  }}
                >
                  Đọc tiếp bài
                </Button>
              </CardActions>
            </Card>

            {/*  */}
            <div
              style={{
                width: "100%",
                height: "20",
                color: "red",
                backgroundColor: "red",
                padding: "2px",
                marginBottom: "2px",
                margin: "20px",
                borderRadius: "10px",
                boxShadow: "2px 2px 5px rgba(0, 0, 100, 0.3)",
              }}
            ></div>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <Grid container spacing={4}>
                {pageInfo.map((card) => (
                  <Grid item key={card} xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardMedia
                        component="div"
                        sx={{
                          // 16:9
                          pt: "56.25%",
                        }}
                        image={`${process.env.REACT_APP_IMAGE_URL}${card?.attributes.img_cate?.data?.attributes.url}`}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {card?.attributes.title || ""}
                        </Typography>
                        <Typography>
                          {moment(`${card?.attributes.createdAt}`)
                            .locale("vi")
                            // .startOf("hour")
                            .fromNow()}
                          <div>{card?.attributes.author}</div>
                        </Typography>
                        <Typography
                          label="Search field"
                          type="search"
                          variant="filled"
                        >
                          {card?.attributes.top_title || ""}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          onClick={() => navigate(`/details/${card.id}`)}
                        >
                          View
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* {pageInfo.map((card, idx) => {
                return (
                  <Card
                    sx={{
                      height: "100%",
                    }}
                  >
                    <CardMedia
                      component="div"
                      height="100%"
                      image={`${process.env.REACT_APP_IMAGE_URL}${card?.attributes.img_cate?.data?.attributes.url}`}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Heading
                      </Typography>
                      <Typography>
                        This is a media card. You can use this section to
                        describe the content.
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })}` */}
            </Box>
            {/* End hero unit */}
          </Container>
        </Paper>
        {/* Box */}
      </main>
    </>
  );
}

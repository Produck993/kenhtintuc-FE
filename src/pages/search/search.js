import Box, { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import qs from "qs";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
export default function Search() {
  const navigate = useNavigate();
  let [pageDetail, setPageDetail] = useState({
    id: 0,
    title: "",
    top_title: "",
    viewed: undefined,
    date: "",
    author: "",
    body: "",
    img_cate: "",
  });
  const bodyRef = useRef(null);
  let { key } = useParams();
  console.log(key, "qerrrrrr");
  let [pageInfo, setPageInfo] = useState([]);
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
          filters: {
            title: {
              $containsi: key,
            },
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
  console.log(pageInfo);
  useEffect(() => {
    if (pageDetail && bodyRef.current) {
      bodyRef.current.innerHTML = pageDetail.body + "";
    }
  }, [pageDetail, bodyRef]);
  useEffect(() => {
    handleGetData();
  }, [key]);
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
          <Container maxWidth="lg">
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
                      <Button
                          size="small"
                          onClick={() => navigate(`/details/${card.id}`)}
                        >
                          Đọc tiếp...
                        </Button>
                        <div>{card?.attributes.author}</div>
                    </Typography>
                  </CardContent>
                  <CardActions>
    
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Container>
        </Paper>
        {/* Box */}
      </main>
    </>
  );
}

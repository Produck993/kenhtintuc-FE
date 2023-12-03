import Box, { Container, Paper } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import qs from "qs";
import { useParams } from "react-router-dom";
export default function Detail(match) {
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
  const { id } = useParams();
  const bodyRef = useRef(null);
  let timer;

  const handerEditView = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      axios
        .put(`${process.env.REACT_APP_API_URL}/posts/${id}`, {
          data: {
            viewed: pageDetail.viewed + 1,
          },
        })
        .then((res) => {
          console.log("Sucess");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, 10000);
  };

  const handlerGetdataDetail = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/posts/${id}?${qs.stringify({
          populate: {
            img_cate: {
              fields: ["name", "url"],
            },
            categories: {
              fields: ["name"],
            },
          },
        })}`
      )
      .then((res) => {
        const { id, attributes } = res.data.data;
        const { title, top_title, viewed, date, author, body, img_cate } =
          attributes;
        setPageDetail({
          ...pageDetail,
          id,
          title,
          top_title,
          viewed,
          author,
          body,
          date,
          img_cate,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    handlerGetdataDetail();
  }, []);

  useEffect(() => {
    if (pageDetail.viewed !== -1 && !Number.isNaN(pageDetail.viewed)) {
      handerEditView();
    }
  }, [pageDetail.viewed]);

  useEffect(() => {
    if (pageDetail && bodyRef.current) {
      bodyRef.current.innerHTML = pageDetail.body + "";
    }
  }, [pageDetail, bodyRef]);
  console.log(pageDetail);
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
            <h1>{pageDetail.title}</h1>
            {/* <p>{pageDetail}</p> */}
            <h3>{pageDetail.top_title}</h3>

            <p ref={bodyRef}></p>
          </Container>
        </Paper>
        {/* Box */}
      </main>
    </>
  );
}

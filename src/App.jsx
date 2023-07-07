import { useEffect, useState, useStyles } from "react";
import axios from "axios";
import "./App.css";
import Convert from "./convert.jsx";

// import Box from "@mui/material/Box";
import {
  Card,
  CardContent,
  Box,
  Typography,
  CardActions,
  Button,
  CardMedia,
  CircularProgress,
  Backdrop,
} from "@mui/material/";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = "https://api.gyanibooks.com/library/get_dummy_notes/";
  const unsplash = "https://source.unsplash.com/random/?";
  let i = 0;
  const classes = useStyles;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(url);
        const jsonData = await response.data;
        setBooks(jsonData);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);

  if (loading)
    return (
      <div>
        <Backdrop className="{classes.backdrop}" open>
          <CircularProgress color="inherit"></CircularProgress>
        </Backdrop>
      </div>
    );

  return (
    <>
      <div>
        <Typography variant="h3" align="center">
          THE DATA FETCH APP
        </Typography>
        {books.map((book) => (
          <Box height="1%" width="80%" margin="auto" marginY="5%">
            <Card
              variant="outlined"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                position: "relative",
                boxShadow: "20px 20px 50px rgba(0, 0, 0, 0.5)",
                borderRadius: "15px",
                overflow: "hidden",
                justifyContent: "center",
                borderTop: "1px solid rgba(255, 255, 255, 0.5)",
                borderLeft: " 1px solid rgba(255, 255, 255, 0.5)",
                backdropFilter: "blur(5px)",
                color: "white",
              }}
              className="CardBox"
            >
              <div
                style={{
                  padding: "20px",
                  textAlign: "center",
                  transition: "0.5s",
                }}
              >
                <CardMedia
                  component="img"
                  height="400"
                  image={unsplash.concat(i++)}
                  alt="unsplashImage"
                ></CardMedia>
                <CardContent>
                  <div key={book.id}>
                    <Typography gutterBottom variant="h5" component="div">
                      <h2 style={{textTransform:"capitalize"}}>{book.title}</h2>
                    </Typography>
                    {/* <p>{book.category}</p> */}
                    <Convert props={book.notes}></Convert>
                  </div>
                </CardContent>
              </div>
            </Card>
          </Box>
        ))}
      </div>
    </>
  );
}

export default App;

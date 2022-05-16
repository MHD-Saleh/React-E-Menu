import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CustomDeleteIconChips from "./chip";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BasicCard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const data = {
    name: [
      { T_NUM: 1, Time: 20 },
      { T_NUM: 2, Time: 15 },
      { T_NUM: 3, Time: 10 },
      { T_NUM: 4, Time: 25 },
      { T_NUM: 5, Time: 30 },
    ],
    id: [1, 2, 3, 4, 5],
  };
  return (
    <Grid container justify="flex-start" alignItems="flex-start">
      {posts.map((elem) => (
        <Grid item xs={2} key={elem.id}>
          <Box display="inline-block">
            <Card
              style={{ backgroundColor: "#757575" }}
              sx={{ minWidth: 200, minHeight: 150 }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {elem.name} MIN
                </Typography>
                <Typography variant="h5" component="div">
                  Table No : {elem.id}
                </Typography>
              </CardContent>
              <CardActions>
                <CustomDeleteIconChips />
              </CardActions>
            </Card>
          </Box>{" "}
        </Grid>
      ))}
    </Grid>
  );
}

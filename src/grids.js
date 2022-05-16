import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
} from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

export default function AltCard() {
  const classes = useStyles();
  const data = {
    name: [
      { quarter: 1, earnings: 13000 },
      { quarter: 2, earnings: 16500 },
      { quarter: 3, earnings: 14250 },
      { quarter: 4, earnings: 19000 },
    ],
    id: [1, 2, 3, 4],
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="flex-start" alignItems="flex-start">
        {data.name.map((elem) => (
          <Grid item xs={3} key={elem.id}>
            <Card>
              <CardHeader
                title={`quarter :: ${elem.id}`}
                subheader={`earnings : ${elem.name}`}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Hello World
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

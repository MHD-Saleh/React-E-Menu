import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { green, red } from "@mui/material/colors";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import CardMoreOption from "./CardMoreOption";
import instance from "../authConfig/axios";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const MessageCard = (probs) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //api/feedbackRead/1

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
            {probs.avatar}
          </Avatar>
        }
        action={probs.withmore === "true" ? <CardMoreOption /> : null}
        title={probs.title}
        subheader={probs.date}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {probs.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {probs.icon}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{probs.expaned}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default MessageCard;

import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DescriptionIcon from "@mui/icons-material/Description";

export const DBEdit = () => {
  const listStyle = {
    width: "100%",
    height: "auto",
    background: "#ffffff",
  };

  return (
    <div>
      <Typography variant="h4">編集</Typography>
      <Grid item xs={12}>
        <div style={listStyle}>
          <List>
            <ListItem>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary="サンプルのフォーム1" />
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
              >
                編集
              </Button>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary="サンプルのフォーム2" />
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
              >
                編集
              </Button>
            </ListItem>
          </List>
        </div>
      </Grid>
    </div>
  );
};

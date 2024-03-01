import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";

export const DBEdit = () => {
  const listStyle = {
    width: "100%",
    height: "auto",
    background: "#ffffff",
  };

  const editFormList = [
    {
      id: "1",
      name: "サンプルのフォーム1",
      createdAt: "2024-03-01",
    },
    {
      id: "2",
      name: "サンプルのフォーム2",
      createdAt: "2024-03-01",
    },
  ];

  return (
    <div>
      <Typography variant="h4">編集</Typography>
      <Grid item xs={12}>
        <div style={listStyle}>
          <List>
            {editFormList.map((form) => (
              <ListItem sx={{ borderBottom: "1px solid #dbdbdb" }}>
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary={form.name} />
                <ListItemText secondary={form.createdAt} />
                <Stack spacing={1} direction="row">
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<EditIcon />}
                  >
                    編集
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                  >
                    削除
                  </Button>
                </Stack>
              </ListItem>
            ))}
          </List>
        </div>
      </Grid>
    </div>
  );
};

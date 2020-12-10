import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function GroupedSelect() {
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-select">Sort Articles</InputLabel>
        <Select defaultValue="" id="grouped-select">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <ListSubheader>Popularity</ListSubheader>
          <MenuItem value={1}>Ascending</MenuItem>
          <MenuItem value={2}>Descending</MenuItem>
          <ListSubheader>Date posted</ListSubheader>
          <MenuItem value={3}>Latest</MenuItem>
          <MenuItem value={4}>Oldest</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

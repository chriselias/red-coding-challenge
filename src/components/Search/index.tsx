import Input from "components/Input";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "shared/colors";
export default function Search() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {/* <Input id="search" placeholder="Search" /> */}
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    border: "1px solid #ccc",
  },
  iconButton: {
    padding: 10,
    backgroundColor: colors.brandBlue,
  },
});

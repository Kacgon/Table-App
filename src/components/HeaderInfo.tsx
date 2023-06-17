import { Typography } from "@material-ui/core";
import '../styles/index.css'

export default function HeaderInfo() {
    
  return (
    <Typography className="header-text">
      Hi! Im Kacper, this is my simple website with product table, you are able
      to select from many categories, and search for specific item name, you can
      also check details of a selected product. Technologies i used in this
      project are: React with typescript, material ui.
    </Typography>
  );
}

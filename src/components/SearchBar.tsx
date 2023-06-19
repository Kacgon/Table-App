import { Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export type SearchBarComponentProps = {
  onChangeOfSearchBar: (event: { target: { value: any } }) => void;
  handleSearchProductIcon: () => void;
};

export function SearchBarComponent({
  onChangeOfSearchBar,
  handleSearchProductIcon,
}: SearchBarComponentProps) {
  return (
    <Box
      sx={{
        borderLeft: "#f5f4f4 2px solid",
        display: "flex",
        marginLeft: "25px",
        height: "30px",
        marginBottom: "5px",
      }}
    >
      <Box sx={{ paddingRight: "10px" }} />
      <Box>
        <TextField
          InputProps={{
            sx: { height: "3vh" },
          }}
          onChange={onChangeOfSearchBar}
          placeholder="search"
          sx={{
            width: "10vh",
            height: "3vh",
            padding: "0px",
            backgroundColor: "white",
            borderRadius: "5px",
          }}
        />
      </Box>
      <SearchIcon
        sx={{
          color: "#f7f7f7",
          marginTop: "3px",
          marginLeft: "5px",
        }}
        onClick={() => handleSearchProductIcon()}
      />
    </Box>
  );
}

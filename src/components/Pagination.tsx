import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent } from "react";

export type PaginationComponentProps = {
  handleRowsChange: (event: SelectChangeEvent<number>) => void;
  perPage: number;
  paginationOptions: number[];
  quantityOfPages: number;
  currentPage: number;
  handlePaginationChange: (event: ChangeEvent<unknown>, page: number) => void;
};

export function PaginationComponent({
  handleRowsChange,
  perPage,
  paginationOptions,
  quantityOfPages,
  currentPage,
  handlePaginationChange,
}: PaginationComponentProps) {
    
  return (
    <Box
      sx={{
        display: "grid",
        justifyItems: "center",
        marginBottom: "10px",
      }}
    >
      <FormControl size="small" sx={{ padding: "5px" }}>
        <InputLabel sx={{ marginTop: "15px" }}>Rows</InputLabel>
        <Select
          sx={{ marginTop: "15px", marginBottom: "5px" }}
          value={perPage}
          label={"RowsPerPage"}
          onChange={handleRowsChange}
        >
          {paginationOptions.map((option: number) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {quantityOfPages + 1 >= 2 && (
        <Pagination
          sx={{ paddingBottom: "10px" }}
          variant="outlined"
          color="primary"
          count={quantityOfPages + 1}
          siblingCount={1}
          size="small"
          hideNextButton
          hidePrevButton
          boundaryCount={1}
          page={currentPage}
          onChange={handlePaginationChange}
        ></Pagination>
      )}
    </Box>
  );
}

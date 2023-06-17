import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useApiHook from "../hooks/ApiHook";
import { Item } from "../models/item";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { ProductDetailsComponent } from "../components/ProductDetails";
import { useNotification } from "../hooks/Notification";
import { ToastContainer } from "react-toastify";
import HeaderInfo from "./HeaderInfo";
import { Avatar, Typography } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import { AppBar } from "@mui/material";
import { Toolbar } from "@material-ui/core";
import "../styles/searchbar.css";
import BreadCrumbsComponent from "../components/BreadCrumbs";

export default function TableOfProducts() {
  const [chosenRow, setChosenRow] = useState(0);
  const [perPage, setPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [headOfUrl, setHeadOfUrl] = useState("/products?");
  const [url, setUrl] = useState(
    `${headOfUrl}skip=${perPage * 0}&limit=${perPage}`
  );
  const [openDetails, setOpenDetails] = useState(false);
  const [dataForDetails, setDataForDetails] = useState<Item | null>(null);
  const { data, totalProducts } = useApiHook(url);
  const { success, failure } = useNotification();
  const [arrayOfCrumbs, setArrayOfCrumbs] = useState(["Products"]);
  const paginationOptions = [3, 6, 8];
  const quantityOfPages = (totalProducts / perPage) >> 0;
  const [searchPhrase, setSearchPhrasePhrase] = useState("empty");

  function onChangeOfSearchBar(event: { target: { value: any } }) {
    setSearchPhrasePhrase(event.target.value);
  }

  function handleSearchProductIcon() {
    setHeadOfUrl(`/products/search?q=${searchPhrase}&`);
    setUrl(
      `/products/search?q=${searchPhrase}&skip=${perPage * 0}&limit=${perPage}`
    );
    success(`searching for ${searchPhrase}`);
    if (!arrayOfCrumbs.includes("search")) {
      setArrayOfCrumbs((arrayOfCrumbs) => [...arrayOfCrumbs, `search`]);
    }
  }

  const changeBackgroundColorOfSelectedRow = (idToCheck: number) => {
    if (idToCheck == chosenRow) {
      return "#d28e19";
    }
  };

  const changeFontColorOfSelectedRow = (idToCheck: number) => {
    if (idToCheck == chosenRow) {
      return "white";
    }
  };

  function handleSearchBreadCrumbClick(
    message: string,
    phraseToSearch: string
  ) {
    let index = arrayOfCrumbs.indexOf(message);
    setDataForDetails(null);
    setPerPage(6);
    setHeadOfUrl(`products/search?q=${phraseToSearch}&`);
    setUrl(`products/search?q=${phraseToSearch}&skip=0&limit=6`);
    arrayOfCrumbs.splice(index + 1);
    setOpenDetails(false);
  }

  function handleBreadCrumbClick(message: string) {
    let index = arrayOfCrumbs.indexOf(message);
    setDataForDetails(null);
    setPerPage(6);
    setHeadOfUrl(`products/category/${message}?`);
    setUrl(`products/category/${message}`);
    arrayOfCrumbs.splice(index + 1);
    setOpenDetails(false);
  }

  const handlePaginationChange = (previous: number, next: number) => {
    setUrl(`${headOfUrl}skip=${previous * perPage}&limit=${perPage}`);
    setUrl(`${headOfUrl}skip=${(next - 1) * perPage}&limit=${perPage}`);
    setCurrentPage(previous);
    setCurrentPage(next);
  };

  const handleRowsChange = (event: SelectChangeEvent<number>) => {
    setUrl(`${headOfUrl}skip=${0 * perPage}&limit=${event.target.value}`);
    setCurrentPage(1);
    setPerPage(event.target.value);
  };

  function handeleDetailsButton(
    category: string,
    item: string,
    dataForDetails: Item
  ) {
    success(`Displaying details for ${item}`);
    setDataForDetails(dataForDetails);
    setOpenDetails(true);
    if (!arrayOfCrumbs.includes(item && category)) {
      setArrayOfCrumbs((arrayOfCrumbs) => [...arrayOfCrumbs, category, item]);
    } else {
      setArrayOfCrumbs((arrayOfCrumbs) => [...arrayOfCrumbs, item]);
    }
  }

  function handleCategoryButton(category: string) {
    const indexOfSearchToRemove = arrayOfCrumbs.indexOf('search')
    if (indexOfSearchToRemove > -1) { 
      arrayOfCrumbs.splice(indexOfSearchToRemove, 1);
    }
    setPerPage(6);
    setHeadOfUrl(`products/category/${category}?`);
    setUrl(`products/category/${category}`);
    if (!arrayOfCrumbs.includes(category)) {
      setArrayOfCrumbs((arrayOfCrumbs) => [...arrayOfCrumbs, category]);
    }
  }

  function returnToMainPageAfterFailedSearch(valueInCrumbsArray: string) {
    let index = arrayOfCrumbs.indexOf(valueInCrumbsArray);
    arrayOfCrumbs.splice(index);
    setUrl(`products?skip=0&limit=6`);
  }

  useEffect(() => {
    if (data?.length == 0) {
      failure("no products with this name");
    }
  }, [data]);

  return (
    <>
      <ToastContainer
        toastStyle={{ backgroundColor: "#d28e19" }}
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Header />
      <HeaderInfo />
      <Box sx={{ flexGrow: 1, paddingLeft: "20px", paddingRight: "20px" }}>
        <AppBar
          sx={{ backgroundColor: "#d28e19", borderRadius: "5px" }}
          position="sticky"
        >
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <BreadCrumbsComponent
              elements={arrayOfCrumbs}
              handleSearchBreadCrumbClick={handleSearchBreadCrumbClick}
              searchPhrase={searchPhrase}
              handleBreadCrumbClick={handleBreadCrumbClick}
            />
            {arrayOfCrumbs.length < 2 ? (
              <div className="searchbar">
                <p className="small-line" />
                <section>
                  <TextField
                    id="filled-search"
                    type="search"
                    placeholder="search"
                    onChange={onChangeOfSearchBar}
                    variant="filled"
                  />
                </section>
                <SearchIcon
                  className="search-icon"
                  onClick={() => handleSearchProductIcon()}
                />
              </div>
            ) : (
              <div />
            )}
          </Toolbar>
        </AppBar>
      </Box>
      {openDetails === true ? (
        <>
          <ProductDetailsComponent productInfo={dataForDetails} />
        </>
      ) : (
        <>
          {data?.length !== 0 ? (
            <Box
              sx={{ display: "flex", padding: "20px", paddingBottom: "5px" }}
            >
              <Box
                sx={{ width: "100%", display: "table", tableLayout: "fixed" }}
              >
                <TableContainer component={Paper}>
                  <Table
                    sx={{ backgroundColor: "#dddbd6" }}
                    aria-label="table of products"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "700" }}>
                          Id of Product
                        </TableCell>
                        <TableCell sx={{ fontWeight: "700" }}>Brand</TableCell>
                        <TableCell sx={{ fontWeight: "700" }}>Price</TableCell>
                        <TableCell sx={{ fontWeight: "700" }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: "700" }}>Category</TableCell>
                        <TableCell sx={{ fontWeight: "700" }}>Thumbnail</TableCell>
                        <TableCell sx={{ fontWeight: "700" }}>Details</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.map((row: Item) => (
                        <TableRow
                          onClick={() => setChosenRow(row.id)}
                          key={row.id}
                          sx={{
                            backgroundColor: changeBackgroundColorOfSelectedRow(
                              row.id
                            ),
                          }}
                        >
                          <TableCell
                            sx={{ color: changeFontColorOfSelectedRow(row.id) }}
                            component="th"
                            scope="row"
                          >
                            {row.id}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: changeFontColorOfSelectedRow(row.id),
                              padding: "0px",
                            }}
                          >
                            {row.brand}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: changeFontColorOfSelectedRow(row.id),
                              padding: "0px",
                            }}
                          >
                            {row.price} $
                          </TableCell>
                          <TableCell
                            sx={{
                              color: changeFontColorOfSelectedRow(row.id),
                              padding: "0px",
                            }}
                          >
                            {row.title}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: changeFontColorOfSelectedRow(row.id),
                              padding: "0px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleCategoryButton(row.category)}
                          >
                            {row.category}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: changeFontColorOfSelectedRow(row.id),
                              padding: "0px",
                            }}
                          >
                            <Avatar
                              variant="rounded"
                              alt={`Photo of${row.title} `}
                              style={{
                                width: "90px",
                                height: "100px",
                                padding: "5px",
                              }}
                              src={row.images[0]}
                            />
                          </TableCell>
                          <TableCell
                            sx={{
                              color: changeFontColorOfSelectedRow(row.id),
                              cursor: "pointer",
                              padding: "0px",
                            }}
                          >
                            {chosenRow === row.id ? (
                              <Button
                                sx={{
                                  color: changeFontColorOfSelectedRow(row.id),
                                  border: "1px white solid",
                                }}
                                onClick={() =>
                                  handeleDetailsButton(
                                    row.category,
                                    row.title,
                                    row
                                  )
                                }
                              >
                                Details
                              </Button>
                            ) : (
                              <Typography>
                                Select this row to see details
                              </Typography>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          ) : (
            <>
              <Typography
                style={{
                  display: "grid",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                Sorry no products with this name available
                <Button
                  onClick={() => returnToMainPageAfterFailedSearch("search")}
                  sx={{
                    padding: "0",
                    backgroundColor: "#d28e19",
                    color: "black",
                    border: "1px solid #d28e19",
                  }}
                >
                  Go Back to products list
                </Button>
              </Typography>
            </>
          )}
          {totalProducts > 1 ? (
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
              {quantityOfPages + 1 >= 2 ? (
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
              ) : (
                <div />
              )}
            </Box>
          ) : (
            <div />
          )}
        </>
      )}
    </>
  );
}

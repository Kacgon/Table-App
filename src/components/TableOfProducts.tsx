import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useApiHook from "../hooks/use-api.hook";
import { Product } from "../models/product";
import { Box, Button, SelectChangeEvent } from "@mui/material";
import { useEffect, useState, ChangeEvent } from "react";
import { ProductDetailsComponent } from "../components/ProductDetails";
import { useNotification } from "../hooks/use-notification.hook";
import { ToastContainer } from "react-toastify";
import HeaderInfo from "../components/HeaderInfo";
import { Avatar, Typography } from "@material-ui/core";
import { AppBar } from "@mui/material";
import { Toolbar } from "@material-ui/core";
import BreadCrumbsComponent from "../components/BreadCrumbs";
import { SearchBarComponent } from "./SearchBar";
import PaginationComponent from "./Pagination";

export default function TableOfProducts() {
  const [chosenRow, setChosenRow] = useState(0);
  const [perPage, setPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [headOfUrl, setHeadOfUrl] = useState("/products?");
  const [url, setUrl] = useState(
    `${headOfUrl}skip=${perPage * 0}&limit=${perPage}`
  );
  const [openDetails, setOpenDetails] = useState(false);
  const [dataForDetails, setDataForDetails] = useState<Product | null>(null);
  const { data, totalProducts } = useApiHook(url);
  const { success, failure } = useNotification();
  const [arrayOfCrumbs, setArrayOfCrumbs] = useState(["Products"]);
  let paginationOptions = [3, 6, 8];
  let quantityOfPages = (totalProducts / perPage) >> 0;
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
    if (idToCheck === chosenRow) {
      return "#d28e19";
    }
  };

  const changeFontColorOfSelectedRow = (idToCheck: number) => {
    if (idToCheck === chosenRow) {
      return "white";
    }
  };

  function handleBreadCrumbClick(message: string) {
    let index = arrayOfCrumbs.indexOf(message);
    const indexOfSearchToRemove = arrayOfCrumbs.indexOf("search");
    if (indexOfSearchToRemove > -1) {
      arrayOfCrumbs.splice(indexOfSearchToRemove, 1);
    }
    setDataForDetails(null);
    setPerPage(6);
    setHeadOfUrl(`products/category/${message}?`);
    setUrl(`products/category/${message}`);
    arrayOfCrumbs.splice(index + 1);
    setOpenDetails(false);
  }

  const handlePaginationChange = (
    event: ChangeEvent<unknown>,
    page: number
  ) => {
    setUrl(`${headOfUrl}skip=${page * perPage}&limit=${perPage}`);
    setUrl(`${headOfUrl}skip=${(page - 1) * perPage}&limit=${perPage}`);
    setCurrentPage(page);
    setCurrentPage(page);
  };

  const handleRowsChange = (event: SelectChangeEvent<number>) => {
    setUrl(`${headOfUrl}skip=${0 * perPage}&limit=${event.target.value}`);
    setCurrentPage(1);
    setPerPage(event.target.value as number);
  };

  function handeleDetailsButton(
    category: string,
    item: string,
    dataForDetails: Product
  ) {
    success(`Displaying details for ${item}`);
    setDataForDetails(dataForDetails);
    setOpenDetails(true);
    const indexOfSearchToRemove = arrayOfCrumbs.indexOf("search");
    if (indexOfSearchToRemove > -1) {
      arrayOfCrumbs.splice(indexOfSearchToRemove, 1);
    }
    if (!arrayOfCrumbs.includes(item && category)) {
      return setArrayOfCrumbs((arrayOfCrumbs) => [
        ...arrayOfCrumbs,
        category,
        item,
      ]);
    }
    if (!arrayOfCrumbs.includes(item)) {
      return setArrayOfCrumbs((arrayOfCrumbs) => [...arrayOfCrumbs, item]);
    }
  }

  function handleCategoryButton(category: string) {
    const indexOfSearchToRemove = arrayOfCrumbs.indexOf("search");
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
    if (data?.length === 0) {
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
      <HeaderInfo />
      <Box sx={{ flexGrow: 1, paddingLeft: "20px", paddingRight: "20px" }}>
        <AppBar
          sx={{ backgroundColor: "#d28e19", borderRadius: "5px" }}
          position="sticky"
        >
          <Toolbar>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <BreadCrumbsComponent
                elements={arrayOfCrumbs}
                handleBreadCrumbClick={handleBreadCrumbClick}
              />
              {arrayOfCrumbs.length < 2 && (
                <Box>
                  <SearchBarComponent
                    onChangeOfSearchBar={onChangeOfSearchBar}
                    handleSearchProductIcon={handleSearchProductIcon}
                  />
                </Box>
              )}
            </Box>
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
                        <TableCell sx={{ fontWeight: "700" }}>
                          Category
                        </TableCell>
                        <TableCell sx={{ fontWeight: "700" }}>
                          Thumbnail
                        </TableCell>
                        <TableCell sx={{ fontWeight: "700" }}>
                          Details
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.map((row: Product) => (
                        <TableRow
                          onClick={() => setChosenRow(row.id)}
                          key={row.id}
                          sx={{
                            color: changeFontColorOfSelectedRow(row.id),
                            backgroundColor: changeBackgroundColorOfSelectedRow(
                              row.id
                            ),
                          }}
                        >
                          <TableCell
                            sx={{ color: "inherit" }}
                            component="th"
                            scope="row"
                          >
                            {row.id}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: "inherit",
                              padding: "0px",
                            }}
                          >
                            {row.brand}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: "inherit",
                              padding: "0px",
                            }}
                          >
                            {row.price} $
                          </TableCell>
                          <TableCell
                            sx={{
                              color: "inherit",
                              padding: "0px",
                            }}
                          >
                            {row.title}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: "inherit",
                              padding: "0px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleCategoryButton(row.category)}
                          >
                            {row.category}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: "inherit",
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
                              color: "inherit",
                              cursor: "pointer",
                              padding: "0px",
                            }}
                          >
                            {chosenRow === row.id ? (
                              <Button
                                sx={{
                                  color: "inherit",
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
              <Box
                sx={{
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
              </Box>
            </>
          )}
          {totalProducts > 1 && (
            <PaginationComponent
              handlePaginationChange={handlePaginationChange}
              handleRowsChange={handleRowsChange}
              quantityOfPages={quantityOfPages}
              currentPage={currentPage}
              paginationOptions={paginationOptions}
              perPage={perPage}
            />
          )}
        </>
      )}
    </>
  );
}

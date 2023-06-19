import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

export type BreadCrumbsComponentProps = {
  elements: string[];
  handleBreadCrumbClick: (message: string) => void;
};

export default function BreadCrumbsComponent({
  elements,
  handleBreadCrumbClick,
}: BreadCrumbsComponentProps) {
  return (
    <>
      <Typography variant="h6" component="div">
        <Breadcrumbs color="inherit" aria-label="breadcrumb">
          {Object.values(elements).map((element, index) =>
            element === "Products" ? (
              elements.indexOf(element) === elements.length - 1 ? (
                <Typography key={index}>{element}</Typography>
              ) : (
                <Link key={index} underline="hover" color="inherit" href="/">
                  {element}
                </Link>
              )
            ) : element === "search" ? (
              <Link
                key={index}
                underline="hover"
                sx={{ cursor: "pointer" }}
                color="inherit"
              >
                {element}
              </Link>
            ) : elements.indexOf(element) === elements.length - 1 ? (
              <Typography key={element}>{element}</Typography>
            ) : (
              <Link
                key={index}
                underline="hover"
                sx={{ cursor: "pointer" }}
                color="inherit"
                onClick={() => handleBreadCrumbClick(element)}
              >
                {element}
              </Link>
            )
          )}
        </Breadcrumbs>
      </Typography>
    </>
  );
}

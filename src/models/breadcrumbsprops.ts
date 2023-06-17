export type BreadCrumbsComponentProps = {
  elements: string[];
  searchPhrase: string;
  handleBreadCrumbClick: (message: string) => void;
  handleSearchBreadCrumbClick: (message: string, searchPhrase: string) => void;
};

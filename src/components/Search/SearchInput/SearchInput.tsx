import { FC, ComponentProps } from "react";
import "./SearchInput.scss";

type SearchInputProps = ComponentProps<"input"> & {
  data?: any;
  label?: string;
};

const SearchInput: FC<SearchInputProps> = ({ data, label = "Search", ...props }) => {
  return (
    <div className="searchInput" role="search">
      <input
        className="searchInput__input"
        type="search"
        aria-label={label}
        autoComplete="search"
        {...props}
      />

      <figure className="searchInput__iconContainer">
        <img
          className="searchInput__icon"
          src="/icons/magnifying.svg"
          alt=""
          aria-hidden="true"
        />
      </figure>
    </div>
  );
};

export default SearchInput;

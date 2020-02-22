import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";

const SearchForm = memo(({onSubmitSearch, onChangeSearch}) => {
    return (
        <form onSubmit={onSubmitSearch}>
            <input type="text" placeholder="검색" onChange={onChangeSearch} />
            <span><FontAwesomeIcon icon={faSearch} /></span>
        </form>
    );
});

export default SearchForm; 
import StatusFilter from './StatusFilter';
import TextFilter from './TextFilter'

function SearchBar() {
    return (
        <div className="mt-4 d-flex">
            <TextFilter />
            <StatusFilter />
        </div>
    );
}

export default SearchBar;
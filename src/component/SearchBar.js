import StatusFilter from './StatusFilter';
import TextFilter from './TextFilter'

function SearchBar(props) {
    return (
        <div className="mt-4 d-flex">
            <TextFilter text={props.searchText.text} setSearchText={props.setSearchText}/>
            <StatusFilter text={props.searchText.status} setSearchText={props.setSearchText}/>
        </div>
    );
}

export default SearchBar;
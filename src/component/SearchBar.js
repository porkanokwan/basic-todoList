import StatusFilter from './StatusFilter';
import TextFilter from './TextFilter'

function SearchBar(props) {
    return (
        <div className="mt-4 d-flex">
            {/* <TextFilter text={props.searchText.text} setSearchText={props.setSearchText}/>
            <StatusFilter  setSearchText={props.setSearchText}/> */}
            <TextFilter text={props.searchText} setSearchText={props.setSearchText}/>
            <StatusFilter setSearchStatus={props.setSearchStatus}/>
        </div>
    );
}

export default SearchBar;
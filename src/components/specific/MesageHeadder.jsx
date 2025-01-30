import { useDispatch } from "react-redux";
import { setIsSearch } from "../../redux/reducers/misc";

const MessagesHeader = () => {
  const dispatch = useDispatch();
  const openSearch = () => {
    dispatch(setIsSearch(true));
  };
  return (
    <div className="flex items-center justify-between p-5 border-b bg-light-gray border-light-gray-divider text-text-primary">
      <div className="relative text-2xl font-semibold text-text-primary">Chats</div>
      {/* <button
        className="rounded-full hover:text-dull-text hover:bg-primary-hover text-text-primary"
        onClick={openSearch}
      >
        <AddIcon className="w-8 h-8" />
      </button>
      <SearchDialog /> */}
    </div>
  );
};

export default MessagesHeader;

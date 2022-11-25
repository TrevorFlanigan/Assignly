import {
  selectFileSystem,
  selectHighestChildren,
} from "@/redux/fileSystemSlice";
import { push, selectPath } from "@/redux/pathSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
const FileView = () => {
  const path = useAppSelector(selectPath);
  const dispatch = useAppDispatch();
  const highestChildren = useAppSelector(selectHighestChildren);
  console.log(highestChildren);
  const handleClick = (key: string) => {
    dispatch({ type: push.type, payload: key });
  };

  const fileSystem = useAppSelector(selectFileSystem);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {Object.keys(highestChildren).map((key) => {
        return (
          <a
            style={{ border: "1px solid black" }}
            key={key}
            href="#"
            onClick={() => handleClick(key)}
          >
            {key}
          </a>
        );
      })}
    </div>
  );
};

export default FileView;

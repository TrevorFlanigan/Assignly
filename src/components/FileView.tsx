import { selectHighestChildren } from "@/redux/fileSystemSlice";
import { push, selectPath } from "@/redux/pathSlice";
import { pin, selectPinned, unpin } from "@/redux/pinnedSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { IconPin } from "@tabler/icons";
import { MockFileContent } from "common/types";
const FileView = () => {
  const dispatch = useAppDispatch();
  const path = useAppSelector(selectPath);
  const highestChildren = useAppSelector(selectHighestChildren);

  const handleClick = (key: string) => {
    dispatch(push(key));
  };

  const handlePin = (key: string, file: MockFileContent) => {
    dispatch(
      pin({
        path: [...path, key],
        name: key,
        type: file.type,
      })
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {Object.entries(highestChildren).map(([key, file]) => {
        return (
          <div key={key}>
            <a
              style={{ border: "1px solid black" }}
              href="#"
              onClick={() => handleClick(key)}
            >
              {key}
            </a>
            <IconPin onClick={() => handlePin(key, file)} />
          </div>
        );
      })}
    </div>
  );
};

export default FileView;

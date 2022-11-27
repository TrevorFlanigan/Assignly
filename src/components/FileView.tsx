import createContextMenu from "@/MenuItem/createContextMenu";
import { selectHighestChildren } from "@/redux/fileSystemSlice";
import { push, selectPath } from "@/redux/pathSlice";
import { pin } from "@/redux/pinnedSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Table } from "@mantine/core";
import { MenuOptions, MockFileContent } from "common/types";
import FileContainer from "./FileContainer";

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
    <div
      onContextMenu={() => {
        createContextMenu([MenuOptions.NEW_FOLDER], path);
      }}
      style={{ height: "100%", width: "100%", userSelect: "none" }}
    >
      <Table striped withColumnBorders withBorder>
        <thead>
          <tr>
            <th style={{ width: "content" }}>Name</th>
            <th style={{ width: "content" }}>Type</th>
            <th style={{ width: "0px" }}></th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(highestChildren)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([name, file]) => (
              <FileContainer
                key={name}
                name={name}
                file={file}
                handleClick={handleClick}
                handlePin={handlePin}
              />
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default FileView;

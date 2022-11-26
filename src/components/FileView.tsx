import { selectHighestChildren } from "@/redux/fileSystemSlice";
import { push, selectPath } from "@/redux/pathSlice";
import { pin, selectPinned, unpin } from "@/redux/pinnedSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Table } from "@mantine/core";
import { IconPin } from "@tabler/icons";
import { MockFileContent } from "common/types";
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
    <Table striped withColumnBorders withBorder>
      <thead>
        <tr>
          <th style={{ width: "content" }}>Name</th>
          <th style={{ width: "content" }}>Type</th>
          <th style={{ width: "0px" }}></th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(highestChildren).map(([name, file]) => (
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
  );
};

export default FileView;

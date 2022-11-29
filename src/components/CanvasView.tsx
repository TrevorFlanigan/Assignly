import { selectCanvasFileSystem, selectCurrentDirectory} from "@/redux/canvasFileSystemSlice";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Button, Table } from "@mantine/core";
import { IconPin } from "@tabler/icons";
import { MockFileContent } from "common/types";

import CanvasFileContainer from "./CanvasFileContainer";
import { push, selectPath } from "@/redux/canvasPathSlice";

const CanvasView = () => {
  const dispatch = useAppDispatch();
  const path = useAppSelector(selectPath); // may be used for right panel add (path[size - 1] is file name)
  const fs = useAppSelector(selectCanvasFileSystem);
  const currentDirectory = useAppSelector(selectCurrentDirectory);

  const handleClick = (key: string) => {
    dispatch(push(key));
  };

  // console.log(currentDirectory);
  // console.log(path);
  if (typeof currentDirectory === "string") {
    return (
      <Button
        onClick={() => {
          // TODO: Add function call to right panel
          console.log(currentDirectory);
        }}
      >
        {`Add ${currentDirectory} to right panel`}
      </Button>
    );
  } else {
    return (
      <Table striped withColumnBorders withBorder>
        <thead>
          <tr>
            <th style={{ width: "content" }}> Name </th>
            <th style={{ width: "content" }}> Type </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(currentDirectory).map(([name, file]) => (
            <CanvasFileContainer
              key={name}
              name={name}
              file={file}
              handleClick={handleClick}
            />
          ))}
        </tbody>
      </Table>
    );
  }
  
};

export default CanvasView;

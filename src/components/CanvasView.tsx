import { selectCurrentDirectory } from "@/redux/canvasFileSystemSlice";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Table } from "@mantine/core";
import { IconPin } from "@tabler/icons";
import { MockFileContent } from "common/types";

import CanvasFileContainer from "./CanvasFileContainer";
import { push, selectPath } from "@/redux/canvasPathSlice";

const CanvasView = () => {
  const dispatch = useAppDispatch();
  const path = useAppSelector(selectPath); // used for right click
  const currentDirectory = useAppSelector(selectCurrentDirectory);

  const handleClick = (key: string) => {
    dispatch(push(key));
  };

  return (
    <Table striped withColumnBorders withBorder>
      <thead>
        <tr>
          <th style={{ width: "content" }}> Name </th>
          <th style={{ width: "content" }}> Type </th>
          <th style={{ width: "0px" }}></th>
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
};

export default CanvasView;

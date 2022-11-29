import {
  selectCanvasFileSystem,
  selectCurrentDirectory,
} from "@/redux/canvasFileSystemSlice";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Table } from "@mantine/core";

import { push, selectPath } from "@/redux/canvasPathSlice";
import openPDF from "@/util/openPDF";
import { FileType, MockFileContent } from "common/types";
import CanvasFileContainer from "./CanvasFileContainer";

const CanvasView = () => {
  const dispatch = useAppDispatch();
  const path = useAppSelector(selectPath); // may be used for right panel add (path[size - 1] is file name)
  const fs = useAppSelector(selectCanvasFileSystem);
  const currentDirectory = useAppSelector(selectCurrentDirectory);

  const handleClick = (key: string, file: MockFileContent) => {
    if (file.type === FileType.PDF) {
      openPDF(file.leaf!);
      return;
    }
    dispatch(push(key));
  };

  return (
    <Table striped withColumnBorders withBorder style={{ userSelect: "none" }}>
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
};

export default CanvasView;

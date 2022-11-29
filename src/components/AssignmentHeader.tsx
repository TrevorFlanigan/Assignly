import { Group, Title } from "@mantine/core";
import { MockDirectory, MockFileContent } from "common/types";

type AssignmentHeaderProps = {
  assignment: MockFileContent;
};

const AssignmentHeader = ({ assignment }: AssignmentHeaderProps) => {
  return (
    <Group>
      <Title>Asisgnment Name</Title>
    </Group>
  );
};

export default AssignmentHeader;

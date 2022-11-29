import { Button, Group, Modal, Title } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { showNotification } from "@mantine/notifications";
import { IconConfetti } from "@tabler/icons";
import { MockDirectory, MockFileContent } from "common/types";
import { useState } from "react";

type AssignmentHeaderProps = {
  assignment: MockFileContent;
};

const AssignmentHeader = ({ assignment }: AssignmentHeaderProps) => {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => {
    setOpen(true);
  };

  const handleDrop = () => {
    showNotification({
      id: "submitted",
      title: "Submitted!",
      message: "Good Job!",
      autoClose: 4000,
      icon: <IconConfetti />,
      color: "green",
    });
    setSubmitted(true);
    setOpen(false);
  };
  return (
    <Group mb={10} position="apart">
      <Modal
        title="Submit Assignment"
        onClose={() => setOpen(false)}
        opened={open}
      >
        <Dropzone style={{ border: "1px dashed black" }} onDrop={handleDrop}>
          Click or Drop Files Here
        </Dropzone>
      </Modal>
      <Title>{assignment.id}</Title>
      <Button variant={submitted ? "outline" : "filled"} onClick={handleSubmit}>
        {submitted ? "Submit Again" : "Submit"}
      </Button>
    </Group>
  );
};

export default AssignmentHeader;

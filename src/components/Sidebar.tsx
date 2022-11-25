import { Navbar } from "@mantine/core";

const Sidebar = () => {
  return (
    <Navbar width={{ base: 150 }} height={"100%"} p="xs">
      <div>Pinned</div>
      <div>Hello World</div>
      <div>Recent</div>
      <div>Hello World</div>
    </Navbar>
  );
};

export default Sidebar;

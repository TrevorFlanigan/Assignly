import { selectPinned } from "@/redux/pinnedSlice";
import { useAppSelector } from "@/redux/store";
import { Divider, Navbar } from "@mantine/core";

const Sidebar = () => {
  const pinned = useAppSelector(selectPinned);

  return (
    <Navbar width={{ base: 150 }} height={"100%"} p="xs">
      <div>Pinned</div>
      <Divider />
      <ul style={{ padding: 0 }}>
        {Object.entries(pinned).map(([key, file]) => {
          return <div key={key}>{file.name}</div>;
        })}
      </ul>
      <div>Recent</div>
      <div>Hello World</div>
    </Navbar>
  );
};

export default Sidebar;

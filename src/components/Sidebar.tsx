import { selectPinned } from "@/redux/pinnedSlice";
import { useAppSelector } from "@/redux/store";
import { Divider, Navbar } from "@mantine/core";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const pinned = useAppSelector(selectPinned);

  return (
    <Navbar width={{ base: 150 }} height={"100%"} p="xs">
      <div style={{ fontWeight: "bold" }}>Pinned</div>
      <Divider my={2} />
      {Object.entries(pinned).map(([key, file]) => {
        return <SidebarItem name={file.name} file={file} key={key} />;
      })}
      <div style={{ fontWeight: "bold", marginTop: 20 }}>
        Upcoming Assignments
      </div>
      <Divider my={2} />
      <div>(TODO Put a list of assignment here sorted by date)</div>
      <div style={{ fontWeight: "bold", marginTop: 20 }}>Recent</div>
      <Divider my={2} />
      <div>(TODO Put a list of recently accessed files)</div>
    </Navbar>
  );
};

export default Sidebar;

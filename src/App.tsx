import { AppShell, Header, Navbar } from "@mantine/core";
import { Breadcrumbs, Anchor } from "@mantine/core";
import FileView from "./components/FileView";
import HeaderWithPath from "./components/HeaderWithPath";
import Sidebar from "./components/Sidebar";
import SpotlightContext from "./context/SpotlightContext";

const items = [
  { title: "Mantine", href: "#" },
  { title: "Mantine hooks", href: "#" },
  { title: "use-id", href: "#" },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

const App: React.FC = () => {
  return (
    <SpotlightContext>
      <AppShell
        padding="md"
        navbar={<Sidebar />}
        header={<HeaderWithPath />}
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <FileView />
      </AppShell>
    </SpotlightContext>
  );
};

export default App;

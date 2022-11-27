import { AppShell } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import FileView from "./components/FileView";
import HeaderWithPath from "./components/HeaderWithPath";
import Sidebar from "./components/Sidebar";
import SpotlightContext from "./context/SpotlightContext";
import "./MenuItem/contextMenuHandler";
import useContextEvents from "./MenuItem/contextMenuHandler";
const App: React.FC = () => {
  useContextEvents();
  return (
    <NotificationsProvider>
      <SpotlightContext>
        <AppShell
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
    </NotificationsProvider>
  );
};

export default App;

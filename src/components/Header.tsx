type HeaderProps = {
  path: string[];
};

const Header = ({ path }: HeaderProps) => {
  return <div>Assignly Student Cloud: /{path.join("/")}</div>;
};

export default Header;

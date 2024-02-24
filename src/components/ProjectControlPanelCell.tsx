interface IProjectControlPanelCell {
  flex?: string;
  children: any;
  onClick?: () => void;
  isCellTitle?: boolean;
}
const ProjectControlPanelCell = ({
  flex,
  children,
  onClick,
  isCellTitle = false,
}: IProjectControlPanelCell) => {
  const height = isCellTitle ? "h-7" : "h-9";
  return (
    <div
      onClick={onClick}
      className={`border-[#4c4e69]   font-extralight  flex items-center justify-center ${height} flex-[${flex}] border-[0.9px]`}
    >
      {children}
    </div>
  );
};

export default ProjectControlPanelCell;

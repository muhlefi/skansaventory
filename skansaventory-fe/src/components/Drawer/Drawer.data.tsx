import { ReactNode } from "react";

export interface DrawerProps {
  id: string;
  title: string;
  children: ReactNode;
  renderButtonDrawer: () => ReactNode;
  handleCloseDrawer: () => void;
}

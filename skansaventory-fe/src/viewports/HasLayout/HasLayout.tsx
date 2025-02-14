import { FC, memo } from "react";
import { HasLayoutProps } from "./HasLayout.type";
import PublicLayout from "../../layouts/PublicLayout";
import PrivateLayout from "../../layouts/PrivateLayout";

const HasLayout: FC<HasLayoutProps> = ({ children, type }) => {
	if (type === 'Public') {
		return (
			<PublicLayout>
				{children}
			</PublicLayout>
		);
	} else if (type === 'Private') {
		return (
				<PrivateLayout>
					{children}
				</PrivateLayout>
		);
	}
	return children;
};

export default memo(HasLayout);
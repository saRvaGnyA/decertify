import { FC, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import NewHeader from "./NewHeader";

interface Props {
    children: ReactNode
}
const Layout: FC<Props> = ({children}) => {
    return (
        <>
            <div className="bg-gypsum overflow-hidden flex flex-col min-h-screen">
            <NewHeader></NewHeader>
                <div className="px-0 py-0 min-h-screen min-w-full mx-auto space-y-8">
                    {children}
                </div>
            <Footer />
            </div>
        </>
    )
}

export default Layout;
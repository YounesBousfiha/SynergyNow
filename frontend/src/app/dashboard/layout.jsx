import SideBar from "./_components/SideBar";
import { Toaster } from "sonner";

export default function Layout({ children }) {

    return (
        <div className="flex min-h-screen bg-[#f3f3f6]">
            <Toaster />
            <SideBar />
            {children}
        </div>
    );
}
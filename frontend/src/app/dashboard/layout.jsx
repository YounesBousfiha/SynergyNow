import SideBar from "./_components/SideBar";
import { Toaster } from "sonner";
import DashBar from './_components/DashBoardBar';
export default function Layout({ children }) {
    return (
        <div className="flex min-h-screen bg-[#f3f3f6]">
            <Toaster richColors={true} />
            <SideBar />
            <div className="flex flex-col flex-1">
                <DashBar />
                <main className="flex-1 p-4">
                    {children}
                </main>
            </div>
        </div>
    );
}
import SideBar from "./_components/SideBar";

export default function Layout({ children }) {
  return (
      <div className="flex min-h-screen bg-[#f3f3f6]">
        <SideBar />
        {children}
      </div>
  );
}
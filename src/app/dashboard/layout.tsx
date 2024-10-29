import Navbar from "@/components/dashboard/navbar/Navbar";
import SideBar from "@/components/dashboard/sidebar/SideBar";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="bg-white h-screen grid  grid-cols-1 lg:grid-cols-[240px_1fr] ">
      <div className="border hidden lg:block">
        <SideBar />
      </div>

      <div className="">
        <Navbar />
        {children}
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Layout;

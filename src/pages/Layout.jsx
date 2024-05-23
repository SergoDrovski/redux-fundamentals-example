import { Outlet } from "react-router-dom";
import Navigation from "@/features/nav/Navigation";

function Layout() {

    return (
        <>
            <Navigation/>
            <main className="">
                <section className="container mx-auto xl:max-w-[900px]">
                    <Outlet />
                </section>
            </main>
        </>
    )
}

export default Layout

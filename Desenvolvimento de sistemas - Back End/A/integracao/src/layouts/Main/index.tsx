import { Outlet } from 'react-router'


export const Main = () => {
    return (
        <div>
            <main>

                <Outlet />
            </main>
        </div>
    )
}
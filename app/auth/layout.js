
export default function Layout({ children }) {
    const variable = true
    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-3/6">
                <img
                    alt="Login Image"
                    className="object-cover w-full h-screen filter opacity-100"
                    src="https://images.unsplash.com/photo-1607424064879-708250e57647?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
            </div>
            <div className="w-full md:w-4/6">
                {children}
            </div>
        </div>
    )
}
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function OperatorNavbar() {
    const handleLogout = ()=>{
        localStorage.clear('')
        // window.location.reload()
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <Link className="navbar-brand" to="/">Channel Craft</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <li>
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/register">Create Account</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/customercontainer">Customer</Link>
                </li>
                <li className="nav-item">
                                <Link className="nav-link" to="/packcha">Packages & Channels</Link>
                            </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/order">order</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/operatorDashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                    <i className="bi bi-person-circle"></i>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login" onClick={handleLogout}>Logout</Link>
                </li>
                </div>
            </ul>
            
            </div>
            </nav>
        </div>
    )
}
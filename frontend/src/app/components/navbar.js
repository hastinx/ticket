import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../redux/reducer/authSlice'

const Navbar = ({ children, title }) => {
    const navigate = useNavigate()
    const auth = useSelector(state => state.auth)
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }

    useEffect(() => {
        if (auth.token === '') {
            navigate('/')
        }
    }, [auth])
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <Link to='/event' className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <span className="fs-5 d-none d-sm-inline">Menu</span>
                        </Link>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li className="nav-item">
                                <Link to='/event' className="nav-link align-middle px-0">
                                    <i className="fs-4 bi-house text-white"></i> <span className="ms-1 d-none d-sm-inline text-white">Event</span>
                                </Link>
                            </li>
                            {auth.admin === 1 ?
                                <li>
                                    <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                        <i className="fs-4 bi-speedometer2 text-white"></i> <span className="ms-1 d-none d-sm-inline text-white">Master</span></a>
                                    <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                        {/* <li className="w-100">
                                            <a href="#0" className="nav-link px-0"> <span className="d-none d-sm-inline">Master Category</span></a>
                                        </li>
                                        <li>
                                            <a href="#0" className="nav-link px-0"> <span className="d-none d-sm-inline">Master Venue</span></a>
                                        </li> */}
                                        <li>
                                            <Link to='/mst-event' className="nav-link px-0"> <span className="d-none d-sm-inline">Master Event</span></Link>
                                        </li>

                                    </ul>
                                </li>
                                : ''
                            }

                            {/*<li>
                                <a href="#0" className="nav-link px-0 align-middle">
                                    <i className="fs-4 bi-table text-white"></i> <span className="ms-1 d-none d-sm-inline text-white">Orders</span></a>
                            </li>
                            <li>
                                <a href="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle ">
                                    <i className="fs-4 bi-bootstrap text-white"></i> <span className="ms-1 d-none d-sm-inline text-white">Bootstrap</span></a>
                                <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <a href="#0" className="nav-link px-0"> <span className="d-none d-sm-inline">Item</span> 1</a>
                                    </li>
                                    <li>
                                        <a href="#0" className="nav-link px-0"> <span className="d-none d-sm-inline">Item</span> 2</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                    <i className="fs-4 bi-grid text-white"></i> <span className="ms-1 d-none d-sm-inline text-white">Products</span> </a>
                                <ul className="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <a href="#0" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 1</a>
                                    </li>
                                    <li>
                                        <a href="#0" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 2</a>
                                    </li>
                                    <li>
                                        <a href="#0" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 3</a>
                                    </li>
                                    <li>
                                        <a href="#0" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 4</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#0" className="nav-link px-0 align-middle">
                                    <i className="fs-4 bi-people text-white"></i> <span className="ms-1 d-none d-sm-inline text-white">Customers</span> </a>
                            </li> */}
                        </ul>
                        <hr />
                        <div className="dropdown pb-4">
                            <a href="#0" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" className="rounded-circle" />
                                <span className="d-none d-sm-inline mx-1">{auth.username}</span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">

                                <li><a className="dropdown-item" href="#0">Profile</a></li>
                                <li className="dropdown-item" onClick={() => navigate('/history')}>History</li>
                                <li><span className="dropdown-item" onClick={() => navigate('/wishlist')}>Wishlist <span class="badge text-bg-danger">{cart.count}</span></span> </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li className="dropdown-item" onClick={() => handleLogout()}>Sign out</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col py-3">
                    <h3>{title}</h3>
                    <hr />
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Navbar
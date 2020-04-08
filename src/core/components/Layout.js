import React from 'react';
import {
    MdNotifications
} from 'react-icons/md';

import '../layout.css';

const Layout = (props) =>{
    return(
        <div class="page-box">
            <div class="app-container">
                <div id="navbar1" class="app-navbar horizontal">
                    <div class="navbar-wrap">
                        <button class="no-style navbar-toggle navbar-open d-lg-none">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        <div class="app-actions">
                            <div class="dropdown item">
                                <button class="no-style" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="0, 12">
                                    <span className='icon'>
                                        <MdNotifications />
                                    </span> 
                                    <span class="badge badge-danger badge-sm">5</span>
                                </button>
                            </div>
                            <div class="dropdown item">
                                <button class="no-style" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="0, 10">
                                    <span class="d-flex align-items-center">
                                        <img src="./user.jpg" alt="" class="rounded-500 mr-1" /> 
                                        <i class="icofont-simple-down"></i>
                                    </span>
                                </button>
                                <div class="dropdown-menu dropdown-menu-right dropdown-menu-w-180">
                                    <ul class="list">
                                        <li><a href="#" class="align-items-center"><span class="icon icofont-ui-home"></span> Edit account</a></li>
                                        <li><a href="#" class="align-items-center"><span class="icon icofont-ui-user"></span> User profile</a></li>
                                        <li><a href="#" class="align-items-center"><span class="icon icofont-ui-calendar"></span> Calendar</a></li>
                                        <li><a href="#" class="align-items-center"><span class="icon icofont-ui-settings"></span> Settings</a></li>
                                        <li><a href="#" class="align-items-center"><span class="icon icofont-logout"></span> Log Out</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="navbar-skeleton horizontal">
                            <div class="left-part d-flex align-items-center"><span class="navbar-button bg animated-bg d-lg-none"></span> <span class="sk-logo bg animated-bg d-none d-lg-block"></span> <span class="search d-none d-md-block bg animated-bg"></span></div>
                            <div class="right-part d-flex align-items-center">
                                <div class="icon-box"><span class="icon bg animated-bg"></span> <span class="badge"></span></div><span class="avatar bg animated-bg"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="navbar2" class="app-navbar vertical">
                    <div class="navbar-wrap"><button class="no-style navbar-toggle navbar-close icofont-close-line d-lg-none"></button>
                        <div class="app-logo">
                            <div class="logo-wrap">
                                <img src="./logo.svg" alt="" width="147" height="33" class="logo-img" />
                            </div>
                        </div>
                        <div class="main-menu">
                            <nav class="main-menu-wrap">
                                <ul class="menu-ul">
                                    <li class="menu-item"><span class="group-title">Medicine</span></li>
                                    <li class="menu-item"><a class="item-link" href="index.html"><span class="link-icon icofont-thermometer-alt"></span> <span class="link-text">Dashboard</span></a></li>
                                    <li class="menu-item"><a class="item-link" href="appointments.html"><span class="link-icon icofont-stethoscope-alt"></span> <span class="link-text">Appointments</span></a></li>
                                    <li class="menu-item"><a class="item-link" href="doctors.html"><span class="link-icon icofont-doctor"></span> <span class="link-text">Doctors</span></a></li>
                                    <li class="menu-item"><a class="item-link" href="departments.html"><span class="link-icon icofont-nurse"></span> <span class="link-text">Departments</span></a></li>
                                    <li class="menu-item"><a class="item-link" href="patients.html"><span class="link-icon icofont-paralysis-disability"></span> <span class="link-text">Patients</span></a></li>
                                    <li class="menu-item"><a class="item-link" href="payments.html"><span class="link-icon icofont-pay"></span> <span class="link-text">Payments</span></a></li>
                                    <li class="menu-item"><span class="group-title">Apps</span></li>
                                    <li class="menu-item has-sub"><a class="item-link" href="#"><span class="link-text">Service pages</span> <span class="link-caret icofont-thin-right"></span></a>
                                        <ul class="sub">
                                            <li class="menu-item"><a class="item-link" href="invoices.html"><span class="link-text">Invoices</span></a></li>
                                            <li class="menu-item"><a class="item-link" href="pricing.html"><span class="link-text">Pricing</span></a></li>
                                            <li class="menu-item"><a class="item-link" href="edit-account.html"><span class="link-text">Edit account</span></a></li>
                                            <li class="menu-item"><a class="item-link" href="user-profile.html"><span class="link-text">User profile</span></a></li>
                                            <li class="menu-item"><a class="item-link" href="events-timeline.html"><span class="link-text">Events timeline</span></a></li>
                                        </ul>
                                    </li>
                                    <li class="menu-item has-sub"><a class="item-link" href="#"><span class="link-text">Sessions</span> <span class="link-caret icofont-thin-right"></span></a>
                                        <ul class="sub">
                                            <li class="menu-item"><a class="item-link" href="sign-in.html"><span class="link-text">Sign in</span></a></li>
                                            <li class="menu-item"><a class="item-link" href="sign-up.html"><span class="link-text">Sign up</span></a></li>
                                            <li class="menu-item"><a class="item-link" href="page-404.html"><span class="link-text">404</span></a></li>
                                            <li class="menu-item"><a class="item-link" href="page-500.html"><span class="link-text">500</span></a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div class="add-patient"><button class="btn btn-primary" data-toggle="modal" data-target="#add-patient"><span class="btn-icon icofont-plus mr-2"></span> Add Patient</button></div>
                        <div class="assistant-menu"><a class="link" href="#"><span class="link-icon icofont-ui-settings"></span>Settings </a><a class="link" href="#"><span class="link-icon icofont-question-square"></span>FAQ &amp; Support</a></div>
                        <div class="navbar-skeleton vertical">
                            <div class="top-part">
                                <div class="sk-logo bg animated-bg"></div>
                                <div class="sk-menu"><span class="sk-menu-item menu-header bg-1 animated-bg"></span> <span class="sk-menu-item bg animated-bg w-75"></span> <span class="sk-menu-item bg animated-bg w-80"></span> <span class="sk-menu-item bg animated-bg w-50"></span> <span class="sk-menu-item bg animated-bg w-75"></span> <span class="sk-menu-item bg animated-bg w-50"></span> <span class="sk-menu-item bg animated-bg w-60"></span></div>
                                <div class="sk-menu"><span class="sk-menu-item menu-header bg-1 animated-bg"></span> <span class="sk-menu-item bg animated-bg w-60"></span> <span class="sk-menu-item bg animated-bg w-40"></span> <span class="sk-menu-item bg animated-bg w-60"></span> <span class="sk-menu-item bg animated-bg w-40"></span> <span class="sk-menu-item bg animated-bg w-40"></span> <span class="sk-menu-item bg animated-bg w-40"></span> <span class="sk-menu-item bg animated-bg w-40"></span></div>
                                <div class="sk-menu"><span class="sk-menu-item menu-header bg-1 animated-bg"></span> <span class="sk-menu-item bg animated-bg w-60"></span> <span class="sk-menu-item bg animated-bg w-50"></span></div>
                                <div class="sk-button animated-bg w-90"></div>
                            </div>
                            <div class="bottom-part">
                                <div class="sk-menu"><span class="sk-menu-item bg-1 animated-bg w-60"></span> <span class="sk-menu-item bg-1 animated-bg w-80"></span></div>
                            </div>
                            <div class="horizontal-menu"><span class="sk-menu-item bg animated-bg"></span> <span class="sk-menu-item bg animated-bg"></span> <span class="sk-menu-item bg animated-bg"></span> <span class="sk-menu-item bg animated-bg"></span> <span class="sk-menu-item bg animated-bg"></span> <span class="sk-menu-item bg animated-bg"></span></div>
                        </div>
                    </div>
                </div>
                <main class="main-content">
                    {props.children}
                </main>
                <div class="app-footer">
                    <div class="footer-wrap">
                        <div class="row h-100 align-items-center">
                            <div class="col-12 col-md-6 d-none d-md-block">
                                <ul class="page-breadcrumbs">
                                    <li class="item"><a href="#" class="link">Dashboards</a> <i class="separator icofont-thin-right"></i></li>
                                    <li class="item"><a href="#" class="link">Default</a> <i class="separator icofont-thin-right"></i></li>
                                </ul>
                            </div>
                            <div class="col-12 col-md-6 text-right">
                                <div class="d-flex align-items-center justify-content-center justify-content-md-end"><span>Version 1.0.0</span> <button class="no-style ml-2 settings-btn" data-toggle="modal" data-target="#settings"><span class="icon icofont-ui-settings text-primary"></span></button></div>
                            </div>
                        </div>
                        <div class="footer-skeleton">
                            <div class="row align-items-center">
                                <div class="col-12 col-md-6 d-none d-md-block">
                                    <ul class="page-breadcrumbs">
                                        <li class="item bg-1 animated-bg"></li>
                                        <li class="item bg animated-bg"></li>
                                    </ul>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="info justify-content-center justify-content-md-end">
                                        <div class="version bg animated-bg"></div>
                                        <div class="settings animated-bg"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-overlay"></div>
            </div>
        </div>
    );
}    

export default Layout;

    
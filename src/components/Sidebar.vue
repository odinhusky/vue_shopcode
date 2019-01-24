<template>
    <div>
        <!-- Sidebar -->
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
            <div class="sidebar-sticky">
                <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>管理者</span>
                        <a class="d-flex align-items-center text-muted" href="#">
                            <span data-feather="plus-circle"></span>
                        </a>
                </h6>
                <ul class="nav flex-column mb-2">
                    <li class="nav-item">
                        <router-link to="/admin/products" class="nav-link" href="#">
                            <span data-feather="file-text"></span>
                            <i class="fas fa-boxes"></i>
                            產品列表
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/admin/orders" class="nav-link" href="#">
                            <span data-feather="file-text"></span>
                            <i class="fas fa-list-ul"></i>
                            訂單列表
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/admin/coupon" class="nav-link" href="#">
                            <span data-feather="file-text"></span>
                            <i class="fas fa-ticket-alt"></i>
                            優惠券列表
                        </router-link>
                    </li>
                </ul>
                <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>模擬功能</span>
                        <a class="d-flex align-items-center text-muted" href="#">
                            <span data-feather="plus-circle"></span>
                        </a>
                </h6>
                <ul class="nav flex-column mb-2">
                    <li class="nav-item">
                        <router-link to="/customer_order" class="nav-link" href="#">
                            <span data-feather="file-text"></span>
                            <i class="fas fa-boxes"></i>
                            模擬訂單
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>
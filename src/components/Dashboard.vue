<template>
    <div>
        <Navbar></Navbar>
        <Alert></Alert>
        <div class="container-fluid">
            <div class="row">
                <Sidebar/>
                <!-- 主要內容區塊 -->
                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <router-view></router-view>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
    import Sidebar from './Sidebar';
    import Navbar from './Navbar';
    import Alert from './Alertmessage';


    export default {
        components: {
            Sidebar,
            Navbar,
            Alert
        }
    };
</script>
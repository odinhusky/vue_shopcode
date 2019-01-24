<template>
    <div>
        <!-- 訂單列表的table -->
        <Loading :active.sync="isLoading"></Loading>
        <table class="table mt-4">
            <thead>
                <th>購買時間</th>
                <th>Email</th>
                <th>購買款項</th>
                <th>應付金額</th>
                <th>是否付款</th>
            </thead>
            <tbody v-if="show">
                <tr v-for="item in orders" :key="item.id">
                    <td>{{ item.create_at | date}}</td>
                    <td>{{item.user.email}}</td>
                    <td>
                        <ul class="list-unstyled">
                            <li v-for="(product, i) in item.products" :key="i">
                                {{ product.product.title }} 數量：{{ product.qty }}
                            </li>
                        </ul>
                    </td>
                    <td>{{item.total | currency}}</td>
                    <td>
                        <span v-if="item.is_paid" class="text-success">已付款</span>
                        <span v-else class="text-danger">未付款</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <Pagination v-if="show" :ps="pagination" v-on:emitproduct="getOrders()"></Pagination>
    </div>
</template>

<script>
import $ from 'jquery';
import Pagination from './Pagination';

export default {
    data() {
        return {
            orders: {},
            pagination: {},
            isLoading: false,
            show: false
        }
    },
    methods:{
        getOrders(page = 1) {
            const vm = this;
            vm.isLoading = true;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
            vm.$http.get(api).then((response) => {
                vm.orders = response.data.orders;
                vm.pagination = response.data.pagination;
                vm.isLoading = false;
                let num = vm.orders.length;
                console.log(vm.orders);
                console.log('num',num);
                if(num == 0){
                    vm.show = false;
                }else if(num > 0){
                    vm.show = true;
                }
            });
        },  
    },
    components: {
      Pagination,
    },
    created(){
        this.getOrders();
    }
}
</script>

   
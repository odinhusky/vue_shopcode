<template>
    <div>
        <!-- 加入整頁Loading -->
        <loading :active.sync="isLoading"></loading>

        <div class="row mt-4">
            <!-- 卡片的模板 -->
            <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
                <div class="card border-0 shadow-sm">
                    <div style="height: 150px; background-size: cover; background-position: center" :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
                    <div class="card-body">
                    <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                    <h5 class="card-title">
                        <a href="#" class="text-dark"  @click.prevent="getOneProduct(item.id)">{{ item.title }}</a>
                    </h5>
                    <p class="card-text">{{ item.content }}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
                        <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                        <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                        <div class="h5 text-primary" v-if="item.price">現在只要 {{ item.price }} 元</div>
                    </div>
                    </div>
                    <div class="card-footer d-flex">
                    <button type="button" class="btn btn-outline-secondary btn-sm" @click="getOneProduct(item.id)">
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                        查看更多
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(item.id)">
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                        加到購物車
                    </button>
                    </div>
                </div>
            </div>
            <!-- 卡片的模板 End -->
            <!-- 購物車的列表 -->
            <table class="table" v-if="showcart">
                <thead>
                    <th></th>
                    <th>品名</th>
                    <th>數量</th>
                    <th>單價</th>
                </thead>
                <tbody>
                    <tr v-for="item in cart.carts" :key="item.id">
                        <td class="align-middle">
                            <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)">
                                <i class="far fa-trash-alt"></i>
                            </button>
                        </td>
                        <td class="align-middle">
                            {{ item.product.title }}
                            <div class="text-success" v-if="item.coupon">
                            已套用優惠券
                            </div>
                        </td>
                        <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                        <td class="align-middle text-right">{{ item.final_total }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3" class="text-right">總計</td>
                        <td class="text-right">{{ cart.total }}</td>
                    </tr>
                    <tr v-if="cart.final_total !== cart.total">
                        <td colspan="3" class="text-right text-success">折扣價</td>
                        <td class="text-right text-success">{{ cart.final_total }}</td>
                    </tr>
                </tfoot>
            </table>
            <!-- 購物車的列表 End -->
            <!-- 優惠碼區塊 -->
            <div class="input-group mb-3 input-group-sm"  v-if="showcart">
                <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                        套用優惠碼
                    </button>
                </div>
            </div>
            <!-- 送出訂單的表單 -->
            <div class="my-5 row justify-content-center w-100">
                <form class="col-md-6" @submit.prevent="createOrder">
                    <div class="form-group">
                        <label for="useremail">Email</label>
                        <input type="email" class="form-control" name="email" id="useremail"
                        v-model="form.user.email" placeholder="請輸入 Email" v-validate="'required|email'">
                        <span class="text-danger" v-if="errors.has('email')">
                            {{ errors.first('email') }}
                        </span>
                    </div>
                
                    <div class="form-group">
                        <label for="username">收件人姓名</label>
                        <input type="text" class="form-control" name="name" id="username"
                        v-model="form.user.name" placeholder="輸入姓名" v-validate="'required'" :class="{'is-invalid' : errors.has('name')}">
                        <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
                    </div>
                
                    <div class="form-group">
                        <label for="usertel">收件人電話</label>
                        <input type="tel" name="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話" v-validate="'required'">
                        <span class="text-danger" v-if="errors.has('tel')">電話必須輸入</span>
                    </div>
                
                    <div class="form-group">
                        <label for="useraddress">收件人地址</label>
                        <input type="address" class="form-control" name="address" id="useraddress" v-model="form.user.address"
                        placeholder="請輸入地址" v-validate="'required'">
                        <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
                    </div>
                
                    <div class="form-group">
                        <label for="useraddress">留言</label>
                        <textarea name="" id="" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
                    </div>
                    <div class="text-right">
                        <button class="btn btn-danger">送出訂單</button>
                    </div>
                </form>
            </div>
            <!-- modal的模板 -->
            <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                            {{ oneproduct.title }}
                            </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <img :src="oneproduct.imageUrl" class="img-fluid" alt="">
                            <blockquote class="blockquote mt-3">
                                <p class="mb-0">{{ oneproduct.content }}</p>
                                <footer class="blockquote-footer text-right">{{ oneproduct.description }}</footer>
                            </blockquote>
                            <div class="d-flex justify-content-between align-items-baseline">
                                <div class="h4" v-if="!oneproduct.price">{{ oneproduct.origin_price }} 元</div>
                                <div class="h6" v-if="oneproduct.price">原價 {{ oneproduct.origin_price }} 元</div>
                                <div class="h4 text-danger" v-if="oneproduct.price">現在只要 {{ oneproduct.price }} 元</div>
                            </div> 
                            <select name="" id="" class="form-control mt-3" v-model="oneproduct.num">
                                <option :value="num" v-for="num in 10" :key="num">
                                    選購 {{ num }} {{ oneproduct.unit }}
                                </option>
                            </select>        
                        </div>

                        <div class="modal-footer">
                            <div class="text-muted text-nowrap mr-3">
                                小記 <strong>{{ oneproduct.num * oneproduct.price }}</strong> 元
                            </div>
                            <button type="button" class="btn btn-primary" @click="addtoCart(oneproduct.id, oneproduct.num)">
                                <i class="fas fa-spinner fa-spin" v-if="oneproduct.id === status.loadingItem"></i>
                                加到購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- modal的模板 -->
            
        </div>
    </div>
</template>

<script>
import $ from 'jquery'

// /** Custom Validator */
// const getMessage = (field) => `${field} 格式不正確`;

// const validate = (value) => {
//   const regex = /[0-9]{2}\-[0-9]{8}$/;
//   const regex2 = /[0]{1}[0-9]{3}\-[0-9]{6}$/;

//   return regex.test(value) || regex2.test(value);
// };

// const myValidator = {
//   getMessage,
//   validate,
// };

// /* Custom Rule */
// Validator.extend('rocphone', myValidator);

export default {
    data(){
        return {
            products: [],
            isLoading: false,
            oneproduct: {},
            cart: {},
            status: {
                loadingItem: '' //這個放的是產品的id
            },
            coupon_code: '',
            form: {
                user: {
                    name: '',
                    email: '',
                    tel: '',
                    address: ''
                },
                message: ''
            },
            // 判斷是否該出現購物車的表單
            showcart: false
        }
    },
    methods: {
        // 取得所有產品列表
        getProducts(){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
            vm.isLoading = true;
            vm.$http.get(url).then((response) => {
                console.log(response.data);
                vm.products = response.data.products;
                vm.isLoading = false;
            });
        },
        // 取得某一筆產品
        getOneProduct(id){
            console.log(id);
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
            vm.status.loadingItem = id;
            vm.$http.get(url).then((response) => {
                console.log(response.data);
                vm.oneproduct = response.data.product;
                vm.oneproduct.num = 1;
                $('#productModal').modal('show');
                // vm.isLoading = false;
                vm.status.loadingItem = '';
            });
        },
        // 加入購物車
        addtoCart(id, qty = 1){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            vm.status.loadingItem = id;
            const cart = {
                product_id: id,
                qty
            }
            vm.$http['post'](url, { data: cart }).then((response) => {
                vm.status.loadingItem = '';
                vm.getCart();
                $('#productModal').modal('hide');
            });
        },
        // 取得購物車內容的function
        getCart(){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            vm.isLoading = true;
            vm.$http.get(url).then((response) => {
                console.log('購物車內容',response.data);
                vm.cart = response.data.data;
                vm.isLoading = false;
                let num = response.data.data.carts.length;
                console.log('購物車內容數量', num);
                if(num == 0){
                    vm.showcart = false;
                }else if(num > 0){
                    vm.showcart = true;
                }
            });
        },
        // 刪除購物車特定產品
        removeCartItem(id){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
            vm.isLoading = true;
            vm.$http.delete(url).then((response) => {
                console.log(response.data.data);
                vm.getCart();
                vm.isLoading = false;
            });
        },
        // 套用優惠券
        addCouponCode(){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
            const coupon = {
                code: vm.coupon_code
            }
            vm.isLoading = true;
            vm.$http.post(url, {data: coupon}).then((response) => {
                console.log(response);
                vm.getCart();
                vm.isLoading = false;
            });
        },
        // 建立訂單
        createOrder(){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
            const order = vm.form;
            // vm.isLoading = true;
            this.$validator.validate().then(result => {
                if (result) {
                    // do stuff if is valid.
                    vm.isLoading = true;
                    vm.$http.post(url, {data: order}).then((response) => {
                        console.log('訂單已建立',response);
                        // vm.getCart();
                        if(response.data.success){
                            vm.$router.push(`customer_checkout/${response.data.orderId}`);
                        }
                        vm.isLoading = false;
                    });
                }else {
                    alert('欄位不完整');
                }
            });
        }
        
    },
    created() {
        this.getProducts();
        this.getCart();
    },
}
</script>




<template>
    <div>
        <!-- 訂單列表的table -->
        <Loading :active.sync="isLoading"></Loading>
        <!-- 新增的按鈕 -->
        <div class="text-right mt-3">
			<button class="btn btn-primary" @click="openModal(true)">新增優惠券</button>
		</div>
        <table class="mt-4 table">
            <thead>
                <th>名稱</th>
                <th>Email</th>
                <th @click="sortthis">到期日
                    <span class="icon" :class="{'inverse': timeorder}">
                        <i class="fas fa-angle-down text-success"></i>
                    </span>
                </th>
                <th>是否啟用</th>
                <th>編輯</th>      
            </thead>
            <tbody v-if="coupons.length > 0">
                <tr v-for="item in sortArray" :key="item.id" >
                    <td>{{ item.title }}</td>
                    <td>{{ item.percent }}</td>
                    <td>{{ item.due_date }}</td>
                    <td>
                        <span v-if="item.is_enabled === 1"  class="text-success">啟用</span>
                        <span v-else class="text-danger">未啟用</span>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" @click="openModal(false, item)">編輯</button>
                        <button class="btn btn-sm btn-outline-danger" @click="opendelModal(item)">刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>
        
        <!-- 頁碼 -->
        <Pagination v-if="coupons.length > 0" :ps="pagination" v-on:emitproduct="getCoupon"></Pagination>
        
        <!-- New/Modify Coupon Modal -->
        <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" @keyup.enter="updateCoupon">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title" id="exampleModalLabel">新增優惠券</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-row">
                            <div class="form-group col-md-12">
                                <label for="title">標題</label>
                                <input type="text" v-model="thisCoupon.title" class="form-control" id="title" 
                                    placeholder="請輸入優惠券標題">
                            </div>
                            <div class="form-group col-md-12">
                                <label for="code">優惠碼</label>
                                <input type="text" v-model="thisCoupon.code" class="form-control" id="code" placeholder="請輸入優惠代碼">
                            </div>
                            <div class="form-group col-md-12">
                                <label for="due_data">到期日</label>
                                <input type="date" v-model="thisCoupon.due_date" class="form-control" id="due_data" placeholder="請輸入到期日">
                            </div>
                            <div class="form-group col-md-12">
                                <label for="percent">優惠百分比</label>
                                    <input type="number" v-model="thisCoupon.percent" class="form-control" id="percent" placeholder="請輸入優惠折扣">
                            </div>
                            <div class="form-group">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" v-model="thisCoupon.is_enabled"
                                    :true-value="1"
                                    :false-value="0"
                                    id="is_enabled">
                                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="updateCoupon">更新優惠券</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delete Coupon Modal -->
        <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content border-0">
					<div class="modal-header bg-danger text-white">
						<h5 class="modal-title" id="exampleModalLabel">
							<span>刪除優惠券</span>
						</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						是否刪除 <strong class="text-danger">{{ thisCoupon.title }}</strong> 優惠券(刪除後將無法恢復)。
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
						<button type="button" class="btn btn-danger" @click="delCoupon">確認刪除</button>
					</div>
				</div>
			</div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import Pagination from './Pagination';

export default {
    data() {
        return {
            coupons: [],
            thisCoupon: {},
            isNew: false,
            pagination: {},
            isLoading: false,
            timeorder: false,
            sort: false
        }
    },
    methods:{
        getCoupon(page = 1) {
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
            const vm = this;
            vm.$http.get(api).then((response) => {
                vm.coupons = response.data.coupons;
                console.log(response.data);
                console.log(response.data.coupons);
                console.log('vm.coupons',vm.coupons.length);
                vm.pagination = response.data.pagination;
            });
        },
        openModal(isNew, item) {
            if(isNew){
                this.thisCoupon = {};
                this.isNew = true;
            }else{
                this.thisCoupon = Object.assign({}, item);
                this.isNew = false;
            }
            $('#couponModal').modal('show');
        },
        updateCoupon(){
            let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
            let httpMethod = "post";
            const vm = this;
            if(!this.isNew){
                // 如果是更新的話
                api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${this.thisCoupon.id}`;
                httpMethod = "put";
            }
            this.$http[httpMethod](api, { data: this.thisCoupon }).then((response) => {
                if (response.data.success) {
                    $("#couponModal").modal("hide");
                    this.getCoupon();
                } else {
                    $("#couponModal").modal("hide");
                    this.getCoupon();
                    console.log(response);
                }
            });
        },
        opendelModal(item){
            const vm = this;
            vm.thisCoupon = Object.assign({}, item);
            $('#deleteModal').modal('show');
        },
        delCoupon() {
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.thisCoupon.id}`;
            vm.$http.delete(api).then((response) => {
                if(response.data.success) {
                    $('#deleteModal').modal('hide');
                    vm.getCoupon();
                } else {
                    $('#deleteModal').modal('hide');
                    vm.getCoupon();
                    console.log(response);
                }
            });
        },
        sortthis() {
            const vm = this;
            // 如果點了到期日就進行排序
            vm.sort = true;
            if(vm.timeorder == true){
                // 日期大到小
                vm.timeorder = false;
            }else{
                // 日期小到大
                vm.timeorder = true;
            }
        }
    },
    computed: {
        sortArray: function () {
            var vm = this;
            return this.coupons.sort(function (a, b) {
                if(vm.sort){
                    const aTime = Math.floor(new Date(a.due_date) / 1000);
                    const bTime = Math.floor(new Date(b.due_date) / 1000);
                    if(vm.timeorder) {
                        return bTime - aTime
                    } else {
                        return aTime - bTime
                    }
                }
            });
        }
    },
    components: {
      Pagination,
    },
    created(){
        this.getCoupon();
    }
}
</script>

<style scoped>
  .icon {
    display: inline-block;
  }
  .icon.inverse {
    transform: rotate(180deg)
  }
</style>
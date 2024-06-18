<template>
    <div class="Maindiv m-2 p-3 rounded rounded-3 row">

        <div class="col-12 d-flex justify-content-start Notofont align-items-center">
            <shoppingcart ></shoppingcart>
            <h3 class="d-flex align-items-center my-0">購物車商品</h3>
        </div>

        <div class="row mt-3" v-for="item in mergedCartItems" :key="item.id">
            <div class="col-2 align-self-center">
                <img :src="imageSrc(item)" alt="" style="width: 100%; height: auto;">
            </div>

            <div class="col-10">
                <div class="row justify-content-between flex-column">
                    <div class="col-12 align-self-start">
                        <div class="fw-bolder Textsize">{{ item.name }}</div>
                    </div>
                    <div class="col-12">
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-info" @click="addToCart(item)">
                                <plus class="rounded-circle"></plus>
                            </button>
                            <div class="count d-flex align-items-center rounded rounded-3 broder broder-3 mx-3 px-3">
                                <div>
                                    數量: {{ item.quantity }}
                                </div>
                            </div>
                            <button class="btn btn-info" @click="deleteToCart(item)">
                                <minus></minus>
                            </button>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="d-flex justify-content-end">
                            <div class="fw-bolder Textsize">NT$ {{ item.price }}</div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="d-flex justify-content-end">
                            <div class="fw-bolder Textsize">總額$ {{ item.price*item.quantity }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <hr >
        </div>

        <div class="d-flex justify-content-end">
            <button class="btn btn-info">
                <truck/>
                送出訂單
            </button>
        </div>

    </div>
</template>

<script>
import truck from '../../../public/assets/truck.svg';
import shoppingcart from '../../../public/assets/shopping-cart.svg';
import plus from '../../../public/assets/plus.svg';
import minus from '../../../public/assets/minus.svg';
import { mapGetters, mapActions } from 'vuex';

export default {
    name:"Cart",
    components:{
        truck,
        shoppingcart,
        plus,
        minus,
    },
    props: {
        cartItems: Array,
        visible: Boolean,
        item: Object,
    },
    methods: {
        ...mapActions(['changeUser', 'highlightUser', 'incrementUserCount', 'getSavedUser', 'saveUserBasket', 'removeUserBasket']),
        imageSrc(item) {
            return `/assets/${item.ImageLocal}`;
        },
        addToCart(product) {
            let cart = this.currentUser.cart || [];
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                ImageLocal: product.ImageLocal
            });
            this.saveUserBasket({ userId: this.currentUser.id, cartItems: cart });
        },
        deleteToCart(product) {
            let cart = this.currentUser.cart || [];
            let deletecart = [];
            deletecart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                ImageLocal: product.ImageLocal
            });
            console.log("deletecart:", deletecart);
            this.removeUserBasket({ userId: this.currentUser.id, cartItems: deletecart });
        },
    },
    computed:{
        ...mapGetters({
            users: 'getUsers',
            currentUser: 'getCurrentUser',
            highlightedUser: 'gethighlightedUser'
        }),
        mergedCartItems() {
            const itemMap = new Map();
            // 遍歷購物車項目，合併相同的商品
            this.cartItems.forEach(item => {
                if (itemMap.has(item.id)) {
                    const existingItem = itemMap.get(item.id);
                    existingItem.quantity += 1; // 假設每個商品項目都代表一個單位
                }
                else {
                    itemMap.set(item.id, { ...item, quantity: 1 });
                }
            });
            //console.log("Array.from(itemMap.values()): ", Array.from(itemMap.values()))
            return Array.from(itemMap.values());
        },
    },
}

</script>

<style scoped>
.count{
    background-color: rgba(245, 245, 245, 0.692);
}
.Textsize{
    font-size: 20px;
}
.smallTextsize{
    font-size: 12px;
}
.Maindiv {
    background-color: rgba(216, 216, 216, 0.596);
    border: 1px solid #ccc;
}
.div2 {

    border: 1px solid #ccc;
}

</style>

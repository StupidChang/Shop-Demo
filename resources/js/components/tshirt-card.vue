<template>
    <div class="card shadow leftIn" style="width: 18rem;">
        <img :src="imageSrc()" id="CardSrc" class="card-img-top responsive-img my-2 imgbackgroud" :alt="item.name">
        <div class="card-body ">
            <p class="card-title" id="CardName">{{ item.name }}</p>
            <p class="card-text" id="CardPrice">NT$ {{ item.price }}</p>
            <rating :rating="item.rating"></rating>

        </div>
        <div class="card-footer text-muted">
            <div class="row align-items-end" >
                <button @click="addToCart(item)" type="button" class="btn btn-primary" id="liveToastBtn">加入購物車</button>
            </div>
        </div>
    </div>

</template>

<script>
import rating from './rating.vue'
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'tshirt-card',
    props: {
        item: Object,
        Cart: Object
    },
    components :{
        rating,
    },
    methods: {
        ...mapActions(['changeUser', 'highlightUser', 'incrementUserCount', 'getSavedUser', 'saveUserBasket']),
        addToCart(product) {
            let cart = this.currentUser.cart || [];
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                ImageLocal: product.ImageLocal
            });
            //alert(product.ImageLocal);
            this.saveUserBasket({ userId: this.currentUser.id, cartItems: cart });
            this.incrementUserCount(this.currentUser.id );

        },
        imageSrc() {
            // 假设您的图片存放在 public/assets/ 文件夹中
            return `/assets/${this.item.ImageLocal}`;
        }
    },
    computed: {
        ...mapGetters({
            users: 'getUsers',
            currentUser: 'getCurrentUser',
            highlightedUser: 'gethighlightedUser'
        })
    },
    watch:{
        //highlightedUser(users) {
        //    console.log('count:', this.users[this.currentUser.id]);
        //}
    }
}
</script>

<style scoped>
    .add2cart{
        color: aliceblue;
    }

    .imgbackgroud{
        background-color: rgba(134, 134, 134, 0.418);
    }

    .responsive-img {
        width: 100%;   /* 使圖片寬度充滿容器 */
        height: auto;  /* 保持圖片原始比例 */
        object-fit: cover; /* 覆蓋整個區域，可根據需要調整為 contain 等 */
    }

    .leftIn{
        animation: leftIn 1s ease-in-out 0s 1;
    }

    @keyframes leftIn {
        from {
            transform: translate3d(-15%, 0, 0);
            opacity: 0;
        }
        to {
            transform: none;
            opacity: 1;
        }
    }
</style>

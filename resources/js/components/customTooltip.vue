<template>
    <div v-if="visible" class="tooltip-content bg-light rounded container-fluid" @mouseover="keepVisible" @mouseleave="hide">
        <div class="d-flex justify-content-start fw-light" style="font-size: 15px;">
            <p>最近加入的商品</p>
        </div>

        <div class="row" v-for="item in mergedCartItems" :key="item.id">
            <div class="col-2 align-self-center">
                <img :src="imageSrc(item)" alt="" style="width: 100%; height: auto;">
            </div>

            <div class="col-10">
                <div class="row justify-content-between">
                    <div class="col-12 align-self-start">
                        <div class="fw-bolder Textsize">{{ item.name }}</div>
                    </div>
                    <div class="col-12 align-self-start d-flex justify-content-between">
                        <div class="smallTextsize">數量: {{ item.quantity }}</div>
                        <div class="fw-bolder Textsize">NT$ {{ item.price }}</div>
                    </div>
                </div>
            </div>
            <hr>
        </div>

        <div class="d-flex justify-content-end">
            <router-link class="btn btn-info" to="/ShopCart">查看購物車</router-link>
        </div>

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    props: {
        cartItems: Array,
        visible: Boolean,
        item: Object,
    },
    methods: {
        keepVisible() {
            this.$emit('update:visible', true);
        },
        hide() {
            this.$emit('update:visible', false);
        },
        imageSrc(item) {
            return `/assets/${item.ImageLocal}`;
        }
    },
    computed:{

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
.Textsize{
    font-size: 15px;
}
.smallTextsize{
    font-size: 12px;
}


.tooltip-content {
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    padding: 10px;
    z-index: 1000;
    width: 30vh;
    top: 2vh;
    right: 5px;
}

</style>

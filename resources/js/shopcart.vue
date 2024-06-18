<template>
    <Mainheader></Mainheader>

    <div class="container Maindiv">
        <customCart :cartItems="cartItems"></customCart>
    </div>

    <Mainfooder></Mainfooder>
</template>

<script>
import Mainheader from './components/header.vue'
import Mainfooder from './components/footer.vue'
import customCart from './components/customCart.vue'
import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'shopcart',
        components:{
            Mainheader,
            Mainfooder,
            customCart
        },
        computed: {
            ...mapGetters({
                users: 'getUsers',
                currentUser: 'getCurrentUser',
                highlightedUser: 'gethighlightedUser'
            }),
            cartItems() {
                if (this.currentUser && this.users.length > this.currentUser.id - 1) {
                    return this.currentUser.cart;
                }
                return [];
            }
        },
        mounted() {
            this.getAlluser();
            this.getSavedUser();

            window.addEventListener('storage', this.handleStorageChange);

            var tooltipTriggerList = [].slice.call(
                document.querySelectorAll('[data-bs-toggle="tooltip"]')
            );
            tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new Tooltip(tooltipTriggerEl);
            });

        },
        methods: {
            ...mapActions(['getAlluser', 'changeUser', 'highlightUser', 'incrementUserCount', 'getSavedUser', 'consoleUser']),
            isActiveRoute(routePath) {
                return this.$route.path === routePath;
            },
            showTooltip() {
                this.tooltipVisible = true;
            },
            hideTooltip() {
                this.tooltipVisible = false;
            },
            handleStorageChange(event) {
                if (event.storageArea === localStorage) {
                    if (event.key === 'user_1' || event.key === 'user_2' || event.key === 'user_3') {
                        if(event.key == 'user_' + this.currentUser.id){
                            console.log(`Local Storage changed for ${event.key}:`, event.newValue);
                            this.$store.dispatch('getSavedUser', event.key);
                        }
                        else{
                            console.log("非改變目前使用者，不同步更新數值。")
                        }
                    }
                }
            },
        },
        data() {
            return {

            };
        },
        beforeDestroy() {
            window.removeEventListener('storage', this.handleStorageChange);
        }
    }

</script>

<style scoped>
    .Notofont {
        font-family: "Noto Sans TC", sans-serif;
        font-optical-sizing: auto;
        font-weight: 600;
        font-style: normal;
        color: rgba(255, 255, 255, 0.829) !important;
    }

    .fadein{
        animation: fade 4s ease-in-out 0s 1 ;
    }

    .fadeleftin{
        animation: leftIn 4s ease-in-out 0s 1 ;
    }

    .Maindiv {
        background-color: rgba(216, 216, 216, 0.596);
        border: 1px solid #ccc;
    }

    @keyframes fade {
        from {
        opacity: 0;
        }
        to {
        opacity: 1;
        }
    }

    @keyframes leftIn {
        from {
            transform: translate3d(-5%, 0, 0);
            opacity: 0;
        }
        to {
            transform: none;
            opacity: 1;
        }
    }
</style>

<template>
    <nav class="navbar navbar-expand-lg navbar-light navbc">

        <div class="container"> <!-- 導航欄上層元素-->
            <div class="col-6 d-flex justify-content-start">
                <div class="Notofont fontsize mx-1 d-flex align-items-center">賣家中心</div>
                <div class="mx-1 d-flex align-items-center"> | </div>
                <div class="Notofont fontsize mx-1 d-flex align-items-center">追蹤我們</div>
                <router-link class="rounded-2 mx-1 d-flex align-items-center" to="/Home"><instagram/></router-link>
                <router-link class="rounded-2 mx-1 d-flex align-items-center" to="/Home"><facebook/></router-link>
                <router-link class="rounded-2 mx-1 d-flex align-items-center" to="/Home"><twitter/></router-link>
            </div>
            <div class="col-6 d-flex justify-content-end">
                <user/>
                <div class=" Notofont1 fontsize d-flex align-items-center rounded-pill bg-secondary px-3">目前登入用戶: {{ currentUser == null ? '尚未選取用戶' : currentUser.name }}</div>
            </div>
        </div>

        <div class="container"> <!-- 導航欄下層元素-->
            <a class="navbar-brand" href="#">
                <Logo/>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <div class="col-4">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link class="nav-link fw-bold" aria-current="page" to="/Home" :class="{ 'active': isActiveRoute('/Home') }">首頁</router-link>
                        </li>

                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle fw-bold" href="#" id="navbarDropdownMen" role="button" data-bs-toggle="dropdown" aria-expanded="false" :class="{ 'active': isActiveRoute('/Men1') }">男裝</a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMen">
                                <li><router-link class="dropdown-item" to="/Men1">男上衣類</router-link></li>
                                <li><router-link class="dropdown-item" to="/Men2">男下身類</router-link></li>
                            </ul>
                        </li>

                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle fw-bold" href="#" id="navbarDropdownWonmen" role="button" data-bs-toggle="dropdown" aria-expanded="false">女裝</a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownWonmen">
                                <li><router-link class="dropdown-item" to="/Women1">女上衣類</router-link></li>
                                <li><router-link class="dropdown-item" to="/Women2">女下身類</router-link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="col-7" v-click-outside="closeSearchResults">
                    <form class="d-flex inputPposition">
                        <input class="form-control me-2" type="search"  v-model="searchQuery" placeholder="搜尋衣服💬" @input="toggleSearchResults" aria-label="Search">
                        <button class="btn btn-outline-success" type="submit"><search/></button>
                    </form>
                    <ul v-if="showResults" class="list-group mt-3 content col" >
                        <li class="list-group-item" v-for="item in filteredItems" :key="item.id">
                            {{ item.name }}
                        </li>
                    </ul>
                </div>
                <div class="col-1 mx-4 d-flex justify-content-around">
                    <a class="btn btn-icon-only" data-bs-toggle="modal" data-bs-target="#userModal">
                        <usersSvg/>
                    </a>

                    <a class="btn btn-icon-only position-relative" @mouseover="showTooltip" @mouseleave="hideTooltip">
                        <shoppingcart/>

                        <span v-if="currentUser?.cart.length != 0" class="position-absolute top-0 start-100 translate-middle bg-danger badge rounded-pill">
                            {{ currentUser?.cart.length }}
                        </span>

                        <CustomTooltip class="fadein" :cartItems="cartItems"  v-model:visible="tooltipVisible"/>
                    </a>

                </div>
            </div>
        </div>
    </nav>

    <!-- Modal -->
    <div class="modal fade " id="userModal" tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content glass">
                <div class="modal-header">
                    <h5 class="modal-title Notofont2" id="userModalLabel" ><usersSvg class="mx-2"></usersSvg>選擇訪客</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body align-items-center">
                    <ul class="p-0">
                        <div class="row rounded rounded-3 mb-1 modelColor" v-for="user in users" :key="user.id" :class="{'highlight': user.id === highlightedUser?.id}">
                            <div class="col-2 align-self-center">
                                <usercheck v-if="currentUser?.id == user.id"></usercheck>
                                <user v-else></user>
                            </div>
                            <button  @click="highlightUser(user)"
                                    class="btn col-10 align-self-center border-0" style="font-weight: bold; " >
                                {{ user.name }}
                            </button>
                        </div>

                    </ul>
                </div>
                <div class="modal-footer justify-content-between" >
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><x class="me-2"></x>取消</button>
                    <button type="button" class="btn btn-primary" @click="changeUser({currentUser, highlightedUser})" data-bs-dismiss="modal"><check class="me-2"></check>選擇</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Logo from '../../../public/assets/copilot2.svg';
    import shoppingcart from '../../../public/assets/shopping-cart.svg';
    import usersSvg from '../../../public/assets/users.svg';
    import user from '../../../public/assets/user.svg';
    import facebook from '../../../public/assets/facebook.svg';
    import instagram from '../../../public/assets/instagram.svg';
    import twitter from '../../../public/assets/twitter.svg';
    import search from '../../../public/assets/search.svg';
    import usercheck from '../../../public/assets/user-check.svg';
    import x from '../../../public/assets/x.svg';
    import check from '../../../public/assets/check.svg';

    import axios from 'axios';
    import { mapGetters, mapActions } from 'vuex';
    import CustomTooltip from './customTooltip.vue';
    import vClickOutside from 'v-click-outside'

    export default {
        name: 'header1',
        directives: {
            clickOutside: vClickOutside.directive
        },
        components:{
            Logo,
            shoppingcart,
            usersSvg,
            user,
            facebook,
            instagram,
            twitter,
            search,
            usercheck,
            x,
            check,
            CustomTooltip
        },
        computed: {
            ...mapGetters({ //從Vuex讀取變數
                users: 'getUsers',
                currentUser: 'getCurrentUser',
                highlightedUser: 'gethighlightedUser'
            }),
            cartItems() { //建立購物車資料
                //console.log("cartItems - this.users: ", this.users);
                //console.log("cartItems - this.currentUser: ", this.currentUser);
                if (this.currentUser && this.users.length > this.currentUser.id - 1) {
                    //console.log("cartItems.currentUser:", this.currentUser);
                    //console.log("cartItems.cart.currentUser:", this.currentUser.cart);
                    return this.currentUser.cart;
                }
                return [];
            },
            filteredItems() { //搜尋欄篩選
                console.log("filteredItems: ", this.searchQuery);
                console.log("filteredItems: ", this.items);
                return this.items.filter(item => {
                    return item.name.includes(this.searchQuery);
                });
            }
        },
        mounted() {
            this.getAlluser();
            this.getSavedUser();

            window.addEventListener('storage', this.handleStorageChange); //加入同步更新監聽

            //this.consoleUser();
        },
        methods: {
            ...mapActions(['getAlluser', 'changeUser', 'highlightUser', 'incrementUserCount', 'getSavedUser', 'consoleUser']), //取得Vuex函式
            isActiveRoute(routePath) {
                return this.$route.path === routePath;
            },
            showTooltip() {
                this.tooltipVisible = true;
            },
            hideTooltip() {
                this.tooltipVisible = false;
            },
            cartItemstest() {
                try{
                    console.log("cart:", this.users[this.currentUser.id - 1].cart);
                }
                catch{

                }
            },
            toggleSearchResults() {
                this.showResults = this.searchQuery.length > 0;
            },
            handleStorageChange(event) {
                //console.log("接收資料更新: ", event)
                //console.log("ID data: ", event.storage.newVal.id)
                //console.log("event.storageArea: ", event.storageArea)

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
            consolecartItems() {
                //console.log("cartItems - this.currentUser: ", this.currentUser)
                //console.log("cartItems - this.users.length: ", this.users.length)
                if (this.currentUser && this.users.length > this.currentUser.id - 1) {
                    console.log("consolecartItems:", this.users[this.currentUser.id - 1].cart);
                    console.log("consolecartItems2:", this.users);
                    console.log("consolecartItems3:", this.currentUser);
                }
            },
            closeSearchResults() {
                this.showResults = false;
            },
        },
        created() {
            console.log("created!");
            const requests = [
                    axios.get('/api/products'),
                    axios.get('/api/products2'),
                    axios.get('/api/products3'),
                    axios.get('/api/products4')
                ];
           // 使用 axios.all 和 Promise.all 來處理多個請求
            axios.all(requests)
                .then(axios.spread((...responses) => {
                    responses.forEach(response => {
                        this.items = this.items.concat(response.data);
                    });
                    console.log("axios.item: ", this.items);
                }))
                .catch(error => {
                    console.error('Error fetching products:', error);
                });
        },
        data() {
            return {
                showResults: false,
                tooltipVisible: false,
                searchQuery: "",
                items: [],
            };
        },
        beforeDestroy() {
            window.removeEventListener('storage', this.handleStorageChange);
        }
    }

</script>

<style scoped>
    .inputPposition{
        position: relative;
    }

    .navbc{
        background-color: rgba(0, 0, 0, 0.068);
    }

    .glass {
        backdrop-filter: blur(20px);
        box-shadow: 0px 0px 30px rgba(255, 134, 184, 0.568);
        background-color: rgba(255, 255, 255, 0.01); /* 使背景也有些透明感 */
        padding: 20px; /* 增加一些內間距以提升視覺效果 */
        border-radius: 25px; /* 增加圓角以更美觀 */
    }

    .modelColor{
        background-color: rgba(230, 226, 248, 0.527)
    }

    .highlight {
        background-color: rgba(255, 110, 231, 0.705); /* 高亮顯示的樣式 */
    }

    .btn-icon-only {
        background: none;           /* 去掉背景色 */
        border: none;               /* 去掉邊框 */
        color: inherit;             /* 繼承文字顏色，如果 SVG 使用currentColor，則顏色也會繼承 */
        padding: 0;                 /* 去掉內邊距 */
        outline: none;              /* 在聚焦時去掉輪廓線 */
    }

    .Notofont1 {
        font-family: "Noto Sans TC", sans-serif;
        font-optical-sizing: auto;
        font-weight: 600;
        font-style: normal;
        color: rgba(241, 241, 241, 0.884) !important;
    }

    .Notofont {
        font-family: "Noto Sans TC", sans-serif;
        font-optical-sizing: auto;
        font-weight: 600;
        font-style: normal;
        color: rgba(59, 59, 59, 0.829) !important;
    }

    .Notofont2 {
        font-family: "Noto Sans TC", sans-serif;
        font-optical-sizing: auto;
        font-size: 20px;
        font-weight: 600;
        font-style: normal;
        color: rgb(255, 255, 255) !important;
    }

    .fontsize{
        font-size: 15px;
    }

    .navbar {
        flex-direction: column; /* 將導航項目縱向排列 */
    }

    a {
        color: #a59ff0; /* 繼承父元素的字體顏色 */
        text-decoration: none; /* 可選，去除下劃線 */
    }

    .content {
        position: absolute;
        background-color: white;
        border: 1px solid #ccc;
        padding: 10px;
        z-index: 1000;
    }

    .nav-link {
        color: #a59ff0;
        font-weight: bold;
        font-size: 18px;
        text-decoration: none;
        position: relative;
        min-width: 10vh;
        text-align: center;
        text-transform: uppercase;
        overflow: hidden;
        padding: 10px 20px;
    }

    .fadein{
        animation: fadeIn 0.8s ease-in-out 0s 1;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>

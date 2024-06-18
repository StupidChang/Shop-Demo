<template>
    <Mainheader></Mainheader>

    <div class="container">
        <div class="row mt-2 d-flex justify-content-start ">
            <div class="col-12 m-1">
                <nav aria-label="breadcrumb navbar" class="d-flex justify-content-start align-items-center">
                    <Tag/>
                    <ol class="breadcrumb mx-2 my-0">
                        <li class="breadcrumb-item" aria-current="page"><router-link to="/Home">Home</router-link></li>
                        <li class="breadcrumb-item active" aria-current="page">Men</li>
                        <li class="breadcrumb-item active" aria-current="page">Pants</li>
                    </ol>
                </nav>
            </div>
        </div>

        <div class="row mt-2">

            <div class="col-2 rounded rounded-3 glass mt-2">
                <sidebar1></sidebar1>
            </div>

            <div class="col-10">
                <div class="row justify-content-center">
                    <Tshirtcard class="m-2" v-for="item in products" :key="item.id" :item="item"></Tshirtcard>
                </div>
            </div>

        </div>
    </div>

    <Mainfooder></Mainfooder>
</template>

<script>
import axios from 'axios';
import Caorusel from "./components/carousel.vue"
import Tshirtcard from "./components/tshirt-card.vue"
import Mainheader from './components/header.vue'
import Mainfooder from './components/footer.vue'
import sidebar1 from './components/sidebar.vue'
import Tag from '././../../public/assets/tag.svg'
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Men2',
    components: {
        Caorusel,
        Mainheader,
        Mainfooder,
        Tshirtcard,
        sidebar1,
        Tag
    },
    data() {
            return {
                products: []
            };
        },
    created() {
        console.log("created!");
        axios.get('/api/products2')
            .then(response => {
                this.products = response.data;
                console.log(this.products);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    },
    computed:{
        ...mapGetters({
            users: 'getUsers',
            currentUser: 'getCurrentUser',
            highlightedUser: 'gethighlightedUser'
        })
    },
    methods: {
        ...mapActions(['changeUser', 'highlightUser', 'incrementUserCount', 'getSavedUser']),
    }

}

</script>

<style scoped>
    .glass {
        backdrop-filter: blur(20px);
        box-shadow: 0px 0px 30px rgba(126, 125, 125, 0.096);
        /*background-color: rgba(77, 77, 77, 0.342); /* 使背景也有些透明感 */
        background: rgb(0 0 0 / 10%);
        border-radius: 25px; /* 增加圓角以更美觀 */
    }

    .Notofont {
        font-family: "Noto Sans TC", sans-serif;
        font-optical-sizing: auto;
        font-weight: 600;
        font-style: normal;
        color: rgba(19, 19, 19, 0.829) !important;
    }

    .fadein{
        animation: fade 4s ease-in-out 0s 1 ;
    }

    .fadeleftin{
        animation: leftIn 4s ease-in-out 0s 1 ;
    }

    .navbar {
        flex-direction: column; /* 將導航項目縱向排列 */
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

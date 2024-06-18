<template>
    <Mainheader></Mainheader>

    <div class="container-fuild">
        <div class="row">
            <div class="col-12">
                <Caorusel2></Caorusel2>
            </div>
        </div>
    </div>

    <Mainfooder></Mainfooder>
</template>

<script>
import Caorusel2 from "./components/carousel2.vue"
import Mainheader from './components/header.vue'
import Mainfooder from './components/footer.vue'

export default {
  name: 'Page1',
  components: {
    Caorusel2,
    Mainheader,
    Mainfooder,
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

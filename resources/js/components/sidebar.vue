<template>
    <div class="row align-items-center p-3 fadeIn">
        <!----><div class="col-8 d-flex justify-content-center align-items-center mb-1">
            <dot class="mx-2" style="width: 10px; height: 10px;"></dot>
            <button class="btn btn-secondary ">
                男裝
            </button>
        </div>
        <div class="col-12 d-flex justify-content-center align-items-center mb-1">
            <dot class="mx-2" style="width: 10px; height: 10px;"></dot>
            <button class="btn btn-secondary ">
                男上衣類
            </button>
        </div>
        <div class="col-12 d-flex justify-content-center align-items-center mb-3">
            <dot class="mx-2" style="width: 10px; height: 10px;"></dot>
            <button class="btn btn-secondary">
                男下身類
            </button>
        </div>
        <hr>
        <div class="col-8 d-flex justify-content-center align-items-center mb-1">
            <dot class="mx-2" style="width: 10px; height: 10px;"></dot>
            <button class="btn btn-secondary">
                女裝
            </button>
        </div>
        <div class="col-12 d-flex justify-content-center align-items-center mb-1">
            <dot class="mx-2" style="width: 10px; height: 10px;"></dot>
            <button class="btn btn-secondary">
                女上衣類
            </button>
        </div>
        <div class="col-12 d-flex justify-content-center align-items-center mb-3">
            <dot class="mx-2" style="width: 10px; height: 10px;"></dot>
            <button class="btn btn-secondary">
                女下身類
            </button>
        </div>
        <hr>
        <!-- <div class="shape-ex1">
            <ul class="shape-ex1-list-box rounded rounded-3 ">
                <li class="shape-ex1-list">
                    <label class="shape-ex1-list-name" for="ex1_1-checkbox">男裝</label>
                    <input type="checkbox" name="ex1_1-input" id="ex1_1-checkbox" />
                    <ul class="shape-ex1-list-sec-box">
                        <li class="shape-ex1-list-sec">
                            <label class="shape-ex1-list-sec-name" for="ex1_2_1-checkbox">第二層</label>
                            <input type="radio" name="ex1_2-input" id="ex1_2_1-checkbox" />
                            <ul class="shape-ex1-list-thr-box">
                                <li class="shape-ex1-list-thr-name"><span>第三層</span></li>
                                <li class="shape-ex1-list-thr-name"><span>第三層</span></li>
                            </ul>
                        </li>
                        <li class="shape-ex1-list-sec">
                            <label class="shape-ex1-list-sec-name" for="ex1_2_2-checkbox">第二層</label>
                            <input type="radio" name="ex1_2-input" id="ex1_2_2-checkbox" />
                            <ul class="shape-ex1-list-thr-box">
                                <li class="shape-ex1-list-thr-name"><span>第三層</span></li>
                                <li class="shape-ex1-list-thr-name"><span>第三層</span></li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>-->


    </div>
</template>

<script>
    import targat1 from '../../../public/assets/target.svg'
    import dot from '../../../public/assets/dot-svgrepo-com.svg'

    export default {
        name: 'sidebar',
        components: {
            targat1,
            dot,
        },
        computed:{

        }
    }

</script>

<style scoped>
.shape-ex1{
    display: block;
    transition: all .3s linear;
}
.shape-ex1 ul{
    padding-inline-start: 0px;
}
.shape-ex1 li::marker{
    font-size: 0;
}
.shape-ex1 input[type="checkbox"],
.shape-ex1 input[type="radio"]{
    position: absolute;
    opacity: 0;
    pointer-events: none;
    top: 0;
}
.shape-ex1-list-box{
    min-width: max-content;
    width: auto;
}
.shape-ex1-list{
    position: relative;
}
.shape-ex1-list-name{
    font-size: 1.5rem;
    line-height: 2rem;
    padding-right: 1.25rem;
    padding-left: 0.625rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    background-color: rgb(209 213 219);
    display: block;
    min-width: max-content;
    position: relative;
}
.shape-ex1-list-name::after{
    content:'';
    width: 0;
    height: 0;
    border-top: 8px solid #000;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    position: absolute;
    top: calc(50% - 4px);
    right: 6px;
}
.shape-ex1-list-sec-box{
    display: none;
}
.shape-ex1-list-sec{
}
.shape-ex1-list-sec-name{
    font-size: 1.125rem;
    line-height: 1.75rem;
    padding-right: 1.25rem;
    padding-left: 0.625rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    background-color: rgb(229 231 235);
    min-width: max-content;
    display: block;
    position: relative;
}
.shape-ex1-list-sec-name::after{
    content:'';
    width: 0;
    height: 0;
    border-top: 8px solid #000;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    position: absolute;
    top: calc(50% - 4px);
    right: 6px;
}
.shape-ex1-list-thr-box{
    display: none;
}
.shape-ex1-list-thr-name{
    font-size: 1rem;
    line-height: 1.5rem;
    padding-left: 0.625rem;
    padding-right: 0.625rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    background-color: rgb(243 244 246);
    min-width: max-content;
    display: block;
    position: relative;
}
.shape-ex1 input[type="checkbox"]:checked + ul,
.shape-ex1 input[type="radio"]:checked + ul{
    display: block;
}

.fadeIn{
        animation: fadeIn 1s ease-in-out 0s 1;
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


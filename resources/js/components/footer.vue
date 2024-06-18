<template>
    <footer class="container-fuild justify-content-end mt-auto text-center">
        <div class="col-3">
            <div class="row justify-content-start">
                <p>Contact</p>
                <p>dakuneko0211@gmail.com</p>
            </div>
        </div>
        <div class="col-3">
            <p>©copyright 2023 dakuneko All rights reserved.</p>
        </div>
    </footer>
</template>

<script>
export default {
  name: 'footer1',
}
</script>

<style scoped>
@font-face {
  font-family: "源雲明體";
    src:url('../../font/GenWanMinTWSemiBold.ttf')format("truetype"),
        url('../../font/GenWanMinTWSemiBold.woff')format("woff"),
        url('../../font/GenWanMinTWSemiBold.eot')format("eot");
}

footer{
    font-size: 12px;
    position: relative;
    /*font-family: "源雲明體";*/
    height: 144px;
    width: auto;
    background: #d7dbdb4d;
    padding: 1% 2%;
    display:flex;
    justify-content: flex-end;
    align-items: center;
    background-image: url("../../assets/IMG_5900.png");
    background-position: center center; /* 使背景圖片居中 */
    background-repeat: no-repeat; /* 避免背景圖片重複 */
    background-size: cover; /* 背景圖片覆蓋整個元素，保持比例 */
    background-attachment: fixed;
}

</style>

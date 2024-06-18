<template>
    <div class="col SvgColor">
        <ratingsvg v-for="index in 5" :key="index" class="star" :style="getStarStyle(index)">{{ rating }} </ratingsvg>
    </div>
</template>

<script>
import ratingsvg from '../../../public/assets/star-fill.svg';

export default {
    name: 'Rating',
    components: {
        ratingsvg
    },
    props: {
        rating: {
            type: Number,
            default: 0
        }
    },
    methods: {
        getStarStyle(index) {
            //console.log("Rating = " + this.rating)
            const fullStars = Math.floor(this.rating);
            const partialFill = (this.rating - fullStars) * 100;  // 计算部分填充百分比

            if (index <= fullStars) {
                return 'color: gold;';  // 完全填充
            } else if (index === fullStars + 1) {
                return `color: linear-gradient(to right, gold ${partialFill}%, gray ${partialFill}%);`;
            } else {
                return 'color: gray;';  // 未填充
            }
        }
    }
}
</script>

<style scoped>
.SvgColor{
    color:  gold;
}

.stars {
    display: flex;
    height: 20px;
}

.star {
    background-color: rgba(240, 248, 255, 0);
    width: auto;
    height: 100%;
    margin-right: 2px;
}
</style>

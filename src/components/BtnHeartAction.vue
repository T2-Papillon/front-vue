<template>
    <div class="btn-heart">
        <input type="checkbox" name="" id="btn" />
        <label class="btn-love" for="btn"></label>
    </div>
</template>
<script>
export default {
    name: 'BtnHeartAction'
}
</script>
<style scoped>
.btn-hearat {
    position: relative;
}
#btn {
    position: absolute;
    left: -100%;
    top: -100%;
    opacity: 0;
    z-index: -1;
}

.btn-love {
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    height: 100%;
    width: 100%;
    cursor: pointer;
}
.btn-love:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 100px;
    margin: 0 auto;
    background: url(https://abs.twimg.com/a/1446862637/img/t1/web_heart_animation.png) red 0 0 no-repeat;
    background-size: 2900%;
    height: 100px;
    width: 100px;
}

#btn:checked + .btn-love:after {
    -webkit-animation: heart-burst steps(28) 0.8s 1 both;
    animation: heart-burst steps(28) 0.8s 1 both;
}

@-webkit-keyframes heart-burst {
    0% {
        background-position: left;
    }
    100% {
        background-position: right;
    }
}

@keyframes heart-burst {
    0% {
        background-position: left;
    }
    100% {
        background-position: right;
    }
}
</style>

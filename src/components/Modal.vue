<template>
    <div class="wrapper">
        <div class="modal">
            <p>{{value}}</p>
        </div>
    </div>
</template>

<script>


    export default {
        name: "Modal",
        props: ['value'],
    
    }
</script>

<style lang="scss" scoped>
    @import '../assets/scss/_settings.scss';
    .wrapper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(#000, .7);
        z-index: 999999;
    }

    .modal {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;

        p {
            text-align: center;
            padding: 20px;
            font-size: 30px;
            font-weight: bold;
        }
    }
</style>
<template>
    <ul>
        <li v-for="dish in dishes" :key="dish.id">
            <p>{{ dish.name }}</p>
            <img :src="dish.image" :alt="dish.name">
        </li>
    </ul>
</template>

<script>


    export default {
        name: "Index",
        data(){
            return {
                dishes: [],
                questions: []
            }
        },
        mounted() {
            this.axios.get('https://script.google.com/a/macros/s-online.co.jp/s/AKfycbwvrRsYMUM52D3RCpa_OwobeAxDLtigaXcPWOucIn1rrgqTLFWsJrbofXBhGNrmnzicdQ/exec')
                .then((res) => {
                    this.dishes = res.data;
                }).catch((e) => {
                    alert(e);
            })
        }
    }
</script>

<style scoped lang="scss">
    ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        list-style: none;
        padding: 0;
        margin: 10px;

        li {
            max-width: 150px;
            margin: 5px;

            img {
                object-fit: contain;
                width: 100%;
                height: auto;
            }
        }
    }
</style>
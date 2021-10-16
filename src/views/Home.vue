<template>
    <section class="content">
        <div class="bg" v-if="dishes.length > 0">
            <img class="bg_img" v-for="d in dishes" :key="d.id" :src="d.image" :alt="d.name">
        </div>

        <div class="main">
            <div class="main_top">
                <h1 class="main_top_title">
                    <span class="el_text">おすすめごはん</span>
                    <svg class="el_img"><use xlink:href="../assets/images/logo.svg#logo"></use></svg>
                </h1>
            </div>

            <router-link :to="{ name: 'Field' }" v-if="dishes.length > 0">
                <div class="main_link">
                    <div class="main_link_content">
                        <figure class="el_text">
                            <svg class="el_img"><use xlink:href="../assets/images/start.svg#start"></use></svg>
                        </figure>
                    </div>
                </div>
            </router-link>
        </div>
    </section>
</template>

<script>
    import { computed, onMounted } from 'vue';
    import { useStore } from 'vuex';

    export default {
        name: "Home",
        setup () {
            const store = useStore();
            const dishes = computed(() => {
                return store.state.dishes
            });

            onMounted(async () => {
                if (store.state.dishes.length <= 0){
                    store.commit('getDishes');
                }
            });

            return { dishes }
        }
    }
</script>

<style scoped lang="scss">
    @import '../assets/scss/_settings.scss';

    .content {
        position: relative;
        z-index: 1;
        width: 100%;

        .bg {
            z-index: 0;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            overflow: hidden;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            &_img {
                width: 20%;
                max-width: 100px;
                filter: blur(2px) brightness(75%) contrast(50%);
            }
        }
        .main {
            position: relative;
            z-index: 1;

            &_top {
                width: 100%;
                max-width: 800px;
                margin: auto;

                &_title {
                    width: 100%;
                    padding: 20vh 10px;

                    .el_text {
                        display: none;
                    }
                    .el_img {
                        width: 100%;
                        display: block;
                        filter: drop-shadow(0 0 3px $color-main);
                        fill: #fff;
                    }
                }

            }
            &_link {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                transition: opacity .4s;
                opacity: .8;

                &:hover {
                    opacity: 1;
                }

                &_content {
                    position: relative;
                    width: 100%;

                    &::before {
                        content: '';
                        position: absolute;
                        top: -20vh;
                        left: 0;
                        border-style: solid;
                        border-width: 0 0 20vh 100vw;
                        border-color: transparent transparent $color-main transparent;
                        z-index: 0;
                    }


                    .el_text {
                        position: relative;
                        width: 100%;
                        background: $color-base;
                        height: 30vh;

                        &::before {
                            content: '';
                            display: block;
                            height: 1vh;
                            width: 100%;
                            background-color: $color-main;
                        }
                        &::after {
                            content: '';
                            position: absolute;
                            top: -20vh;
                            left: 0;
                            border-style: solid;
                            border-width: 0 0 19vh 100vw;
                            border-color: transparent transparent $color-base transparent;
                            padding-top: 2vh;
                            z-index: 0;
                        }
                        svg {
                            display: block;
                            position: absolute;
                            top: -16vh;
                            right: 20%;
                            width: 30%;
                            max-width: 200px;
                            transform: rotate(-10deg) translateX(30%) scale(1.3, 1);
                            z-index: 1;
                            fill: $color-main;
                        }
                    }
                }
            }
        }
    }
</style>
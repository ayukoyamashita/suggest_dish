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

            <div class="main_link">
                <router-link :to="{ name: 'Field' }" v-if="dishes.length > 0" class="main_link_content">
                    <figure class="el_text">
                        <svg class="el_img"><use xlink:href="../assets/images/start.svg#start"></use></svg>
                    </figure>
                </router-link>
            </div>
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

            onMounted(() => {
                if (store.state.dishes.length <= 0){
                    store.dispatch('getDishesAction');
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
                &_content {
                    transition: all 0.8s;
                    width: 60%;
                    max-width: 300px;
                    padding: 8px 20px;
                    display: block;
                    margin: 0 auto;
                    background: rgba(0, 0, 0, 0.4);
                    border-radius: 30px;
                    border: 1px solid #fff;
                    position: relative;

                    &::before {
                        transition: all .4s;
                        content: '';
                        display: block;
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 20%;
                        height: 100%;
                        border-radius: 30px;
                        background: transparent;
                        z-index: -1;
                    }

                    .el_text {
                        text-align: center;
                    }

                    .el_img {
                        height: 40px;
                        width: 50%;
                        fill: #fff;
                    }

                    &:hover {
                        background: transparent;
                        &::before {
                            background: $color-accent-light;
                            width: 100%;
                        }
                    }
                }
            }
        }
    }
</style>
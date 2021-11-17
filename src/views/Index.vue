<template>
    <section class="content">
        <div class="top">
            <router-link :to="{ name: 'Home' }">
                <h1 class="top_title">
                    <span class="top_title_text">おすすめごはん</span>
                    <svg class="top_title_img">
                        <use xlink:href="../assets/images/logo.svg#logo"></use>
                    </svg>
                </h1>
            </router-link>
        </div>

        <div class="dishes" v-if="dishes.length > 0">
            <router-link v-for="d in dishes" :key="d.id" :to="{ name: 'Result', params: { id: d.id }}" :class=" d.id === result.id ? 'dishes_item is-suggested' : 'dishes_item'" >
                <img :src="d.image" :alt="d.name" class="dishes_item_img" width="200" height="200">
                <p class="dishes_item_name">{{ d.name }}</p>
            </router-link>
        </div>
    </section>
</template>

<script>
    import { computed, onMounted } from 'vue';
    import { useStore } from 'vuex';

    export default {
        name: "Index",
        setup () {
            const store = useStore();
            const dishes = computed(() => {
                return store.state.dishes
            });
            const result = computed( () => {
                return store.state.result
            })

            onMounted(() => {
                if (store.state.dishes.length <= 0){
                    store.dispatch('getDishesAction');
                }
            });

            return { dishes, result }
        }
    }
</script>

<style scoped lang="scss">
    @import '../assets/scss/_settings.scss';

    $max-width: 400px;

    .content {
        width: 100%;
    }
    .top {
        width: 90%;
        max-width: $max-width;
        margin: 0 auto;

        &_title {
            text-align: center;

            &_text {
                font-size: 0;
            }
            &_img {
                fill: #222;
                filter: drop-shadow(0 0 1px $color-base);
            }
        }
    }
    .dishes {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        padding: 5px;

        &_item {
            width: 50%;
            max-width: 200px;
            padding: 15px 10px 10px;
            transition: opacity .3s;

            &:hover {
                opacity: .6;
            }

            &_img {
                display: block;
                width: 100%;
                height: auto;
                margin-bottom: 10px;
                filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.2));
            }
            &_name {
                text-align: center;
            }

            &.is-suggested {
                border: 1px solid #fff;
                border-radius: 8px;
                position: relative;
                z-index: 0;

                &::before {
                    position: absolute;
                    content: 'おすすめごはん';
                    top: 0;
                    right: 0;
                    background: #fff;
                    color: #333;
                    font-size: .7rem;
                    font-weight: 600;
                    line-height: 22px;
                    display: block;
                    border-radius: 0 7px 0 8px;
                    z-index: 1;
                    padding: 0 10px;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, .8);

                }
            }
        }
    }
</style>
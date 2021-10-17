<template>
    <section class="content">
        <h1 class="title">
            <span class="title_text">おすすめごはん</span>
            <svg class="title_img"><use xlink:href="../assets/images/logo.svg#logo"></use></svg>
            <svg class="title_result"><use xlink:href="../assets/images/result.svg#result"></use></svg>
        </h1>

        <p class="loading" v-if="!showDish">Loading...</p>

        <div v-if="showDish">
            <div class="result">
                <h2 class="result_title">『 {{ dish.name }} 』</h2>
                <figure class="result_img">
                    <img :src="dish.image" :alt="dish.name">
                </figure>
            </div>

            <div class="search" v-if="showDish">
                <a :href="'https://www.google.co.jp/search?q=' + dish.name" class="search_link" target="_blank">{{ dish.name }}について調べる</a>
            </div>

            <div class="back">
                <router-link :to="{ name: 'Home' }" class="back_link">TOPに戻る</router-link>
            </div>
        </div>

    </section>
</template>

<script>
    import { computed, onMounted } from 'vue';
    import { useRoute } from 'vue-router'
    import { useStore } from 'vuex';

    export default {
        name: 'Result',
        setup () {
            const route = useRoute();
            const store = useStore();

            const dish = computed(() => {
                return store.state.dishes.find(d => d.id === route.params.id);
            });

            const showDish = computed( () => {
                return typeof dish.value == 'object';
            });

            onMounted(async () => {
                if (store.state.dishes.length <= 0){
                    store.commit('getDishes');
                }
            });

            return { dish, showDish }
        }
    }
</script>

<style scoped lang="scss">
    @import '../assets/scss/_settings.scss';

    $max-width: 400px;

    .content {
        width: 100%;
        height: 100vh;
    }
    .title {
        width: 80%;
        max-width: $max-width;
        margin: 0 auto;
        text-align: center;
        position: relative;

        &_text {
            display: none;
        }
        &_img {
            fill: $color-main;
            width: 100%;
        }
        &_result {
            position: absolute;
            bottom: -25px;
            right: -25px;
            transform: rotate(-20deg);
            fill: $color-accent-light;
            width: 30%;
            z-index: 1;
        }
    }
    .loading {
        text-align: center;
        color: $color-main-light;
    }
    .result {
        padding: 20px 0;
        width: 80%;
        max-width: $max-width;
        margin: 0 auto;
        border: 1px solid $color-accent-light;
        border-radius: 60% 40% 66% 34% / 39% 67% 33% 61%;
        position: relative;

        &::before {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            content: '';
            width: 120%;
            height: 80%;
            border: 1px solid $color-main-light;
            border-radius: 71% 29% 39% 61% / 72% 24% 76% 28%;
        }

        &_title {
            text-align: center;
            font-size: 18px;
            font-weight: 600;
            letter-spacing: 1px;
            text-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
        }
        &_img {
            width: 100%;
            margin: 20px 0;
             img {
                 object-fit: contain;
                 width: 100%;
                 height: auto;
                 filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.1));
             }
        }
    }
    .search, .back{
        width: 80%;
        max-width: $max-width;
        margin: 2px auto;

        &_link {
            display: inline-block;
            position: relative;
            padding: 8px 0;
            text-shadow: 0 0 1px rgba(0, 0, 0, 0.2);

            &::before, &::after {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                content: '';
                width: 0;
                height: 0;
                border-style: solid;
            }
            &:hover {
                opacity: 0.7;
            }
        }
    }
    .search {
        margin-top: 20px;
        text-align: right;
        color: $color-main;

        &_link {
            &::before {
                right: -15px;
                border-width: 12px 0 12px 12px;
                border-color: transparent transparent transparent $color-main;
            }
            &::after {
                right: -12px;
                border-width: 12px 0 12px 12px;
                border-color: transparent transparent transparent #fff;
            }
        }
    }
    .back {
        text-align: left;
        color: $color-main-light;

        &_link {
            &::before {
                left: -18px;
                border-width: 12px 12px 12px 0;
                border-color: transparent $color-main-light transparent transparent;
            }
            &::after {
                left: -15px;
                border-width: 12px 12px 12px 0;
                border-color: transparent #fff transparent transparent;
            }
        }
    }

</style>
<template>
    <section class="content">
        <h1 class="title">
            <span class="title_text">おすすめごはん</span>
            <svg class="title_img"><use xlink:href="../assets/images/logo.svg#logo"></use></svg>
            <svg class="title_result" v-if="isSuggested"><use xlink:href="../assets/images/result.svg#result"></use></svg>
        </h1>

        <p class="loading" v-if="!showDish">Loading...</p>

        <div v-if="showDish">
            <div class="result">
                <h2 class="result_title">{{ dish.name }}</h2>
                <figure class="result_bg">
                    <img :src="dish.image" :alt="dish.name" width="400" height="400">
                </figure>
                <figure class="result_img">
                    <img :src="dish.image" :alt="dish.name" width="400" height="400">
                </figure>
            </div>

            <div class="chart" v-if="taste.length > 0 && result.length > 0">
                <Chart :taste="taste" :result="result"></Chart>
            </div>

            <div class="feedback">
                <p class="feedback_text">結果はいかがでしたか？</p>
                <button @click="feedback('tabetai')" class="other_link tabetai"><i class="fas fa-laugh-wink"></i>食べたい！</button>
                <button @click="feedback('ma-ma-')" class="other_link mama"><i class="fas fa-smile"></i>まぁまぁ</button>
                <button @click="feedback('tabenai')" class="other_link tabenai"><i class="fas fa-dizzy"></i>食べたくない</button>
            </div>

            <div class="other">
                <router-link :to="{ name: 'Index' }" class="other_link">他のごはんをみる</router-link>
            </div>

            <div class="search" v-if="showDish">
                <a :href="'https://www.google.co.jp/search?q=' + dish.name" class="search_link" target="_blank">ごはんを検索する</a>
            </div>

            <div class="back">
                <router-link :to="{ name: 'Home' }" class="back_link">TOPに戻る</router-link>
            </div>
        </div>
        <transition name="fade">
            <Modal value="Thank You!" v-show="showModal"></Modal>
        </transition>
    </section>
</template>

<script>
    import { ref } from 'vue';
    import { computed, onMounted } from 'vue';
    import { useRoute } from 'vue-router'
    import { useStore } from 'vuex';
    import { useGtag } from "vue-gtag-next";

    import Chart from '../components/Chart';
    import Modal from '../components/Modal';

    export default {
        name: 'Result',
        components: { Chart, Modal },
        setup () {
            const route = useRoute();
            const store = useStore();

            const dish = computed(() => {
                return store.state.dishes.find(d => d.id === route.params.id);
            });

            const showDish = computed( () => {
                return typeof dish.value == 'object';
            });

            const result = computed(() => {
                let d = dish.value;
                return [d.heat, d.oily, d.salty, d.solid, d.sweetness];
            });

            const taste = computed(() => {
                let t = store.state.tastes;
                return [t.heat, t.oily, t.salty, t.solid, t.sweetness];
            });

            const isSuggested = computed(() => {
                let suggest = store.state.result
                return dish.value.id === suggest.id
            });

            const showModal = ref(false);
            const { event } = useGtag();
            const feedback = (value) => {
                showModal.value = true;
                event('feedback', {
                    'value' : value,
                });
                setTimeout(() => {showModal.value = false}, 1000);
            };

            onMounted(async () => {
                if (store.state.dishes.length <= 0){
                    store.commit('getDishes');
                }
            });

            return { dish, showDish, taste, result, isSuggested, showModal, feedback }
        }
    }
</script>

<style scoped lang="scss">
    @import '../assets/scss/_settings.scss';

    $max-width: 400px;

    .content {
        width: 100%;
        min-height: 100vh;
        padding-bottom: 30px;
        overflow: hidden;
    }
    .title {
        width: 80%;
        max-width: $max-width;
        margin: 0 auto;
        text-align: center;
        position: relative;
        z-index: 2;

        &_text {
            display: none;
        }
        &_img {
            filter: drop-shadow(0 0 2px $color-main);
            fill: #fff;
            width: 100%;
        }
        &_result {
            position: absolute;
            bottom: -25px;
            right: -25px;
            transform: rotate(-20deg);
            filter: drop-shadow(0 0 2px #000);
            fill: $color-accent-light;
            width: 30%;
            z-index: 2;
        }
    }
    .loading {
        text-align: center;
        color: $color-main-light;
    }
    .result {
        width: 80%;
        max-width: $max-width;
        margin: 20px auto 40px;
        position: relative;
        z-index: 1;

        &_title {
            text-align: center;
            font-size: 24px;
            font-weight: 600;
            letter-spacing: 1px;
            text-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
            border-bottom: 1px solid #fff;
            padding-bottom: 8px;
        }
        &_bg {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            filter: blur(8px) opacity(20%);
            width: 200%;
            z-index: -1;
            img {
                object-fit: contain;
                width: 100%;
                height: auto;
            }
        }
        &_img {
            width: 100%;
            margin: 30px 0 20px;
             img {
                 object-fit: contain;
                 width: 100%;
                 height: auto;
                 filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.1));
             }
        }
    }
    .chart {
        width: 80%;
        max-width: $max-width;
        margin: 20px auto 40px;
    }
    .search, .other, .back {
        max-width: $max-width;
        margin: 20px auto;
        text-align: center;

        &_link {
            transition: all 0.8s;
            display: block;
            padding: 8px;
            width: 80%;
            margin: 0 auto;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 24px;
            border: 1px solid #fff;
            position: relative;
            color: #fff;
            font-weight: 600;
            z-index: 1;

            &::before {
                transition: all .4s;
                content: '';
                display: block;
                position: absolute;
                top: 0;
                right: 0;
                width: 20%;
                height: 100%;
                border-radius: 24px;
                background: transparent;
                z-index: -1;
            }
        }
    }
    .search_link{
        &::before {
            left: 0;
        }
        &:hover {
            background: transparent;

            &::before {
                background: $color-accent-light;
                width: 100%;
            }
        }
    }
    .other_link{
        &::before {
            left: 0;
        }
        &:hover {
            background: transparent;

            &::before {
                background: $color-main-light;
                width: 100%;
            }
        }
    }
    .back_link:hover {
        background: transparent;

        &::before {
            background: $color-main;
            width: 100%;
        }
    }

    .feedback {
        max-width: 400px;
        text-align: center;
        margin:0 auto 30px;

        &_text {
            margin-bottom: 10px;
        }

        button {
            width: 60%;
            margin-bottom: 10px;

            .fas {
                font-size: 24px;
                margin-right: 5px;
            }

            &.tabetai {
                background-color: #b16211;
            }

            &.mama {
                background-color: #228b42;
            }

            &.tabenai {
                background-color: #41416e;
            }
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.6s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

</style>
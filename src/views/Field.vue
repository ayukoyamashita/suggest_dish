<template>
    <section class="content">
        <div class="top">
            <div class="top_progress">
                <span class="top_progress_now">Q {{ progress }}</span>
                <span class="top_progress_max">/ {{ questions.length }}</span>
            </div>

            <div class="top_title">
                <router-link :to="{ name: 'Home'}">
                    <svg class="top_title_img"><use xlink:href="../assets/images/logo.svg#logo"></use></svg>
                </router-link>
            </div>
        </div>

        <div class="main">
            <svg class="main_img"><use xlink:href="../assets/images/question.svg#question"></use></svg>
            <div class="main_content">
                <div v-for="(q, i) in questions" :key="q.id" class="main_content_item">
                    <transition name="fade">
                        <Question :question="q" :options="options[q.id]" v-if="progress === (i + 1)" @selectEvent="selectOption" />
                    </transition>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import { ref, onMounted } from 'vue'
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';

    import Question from '../components/Question';

    import questionList from '../assets/json/questions.json';
    import optionList from '../assets/json/options.json';

    export default {
        name: "Field",
        components:{ Question },
        setup() {
            const router = useRouter();
            const store = useStore();
            const dishes = ref([]);
            const result = ref({});
            const tastes = ref({
                heat: 0,
                oily: 0,
                salty: 0,
                solid: 0,
                sweetness: 0
            });
            const questions = ref([]);
            const options = ref({});
            const progress = ref(1);

            const init = () => {
                dishes.value = store.state.dishes;

                if (dishes.value.length <= 0){
                    useRouter().push({name: 'Home'});
                } else {
                    dishes.value.forEach(d => {
                        Object.keys(tastes.value).forEach(k => {
                            tastes.value[k] += Number(d[k]);
                        });
                    });

                    Object.keys(tastes.value).forEach(k => {
                        tastes.value[k] = tastes.value[k] / dishes.value.length;
                    });
                }
                setQuestions();
            }

            const setQuestions = () => {
                let indexes = [];
                while(indexes.length < 5){
                    let n = Math.floor(Math.random() * questionList.length);
                    if (!indexes.includes(n)){
                        indexes.push(n);
                        let q = questionList[n]
                        questions.value.push(q);

                        options.value[q.id] = [];
                        q.options.forEach((i) => {
                            let option = optionList.filter(o => o.id === i);
                            options.value[q.id] = options.value[q.id].concat(option);
                        });
                    }
                }
            }

            const suggest = async () => {
                let min_n = '';
                let min_d = {};
                dishes.value.forEach(d => {
                    let n = 0;
                    Object.keys(tastes.value).forEach(k => {
                        n += Math.pow(Number(d[k]) - Number(tastes.value[k]), 2);
                    });
                    n = Math.sqrt(n)

                    if ( min_n === '' || n < min_n ) {
                        min_n = n;
                        min_d = d;
                    }
                });
                result.value = min_d;
            }

            const selectOption = (id) => {
                calculateTastes(id);
                if( progress.value === questions.value.length) {
                    suggest();
                    store.commit('setResult', result.value);
                    store.commit('setTastes', tastes.value);
                    router.push({ name: 'Result', params: { id: result.value.id }});
                }
                progress.value += 1;
            }

            const calculateTastes = (id) => {
                let option = optionList.find(o => o.id === id);
                Object.keys(tastes.value).forEach(k => {
                    tastes.value[k] += option.tastes[k];
                });
            }

            onMounted(init);

            return {result, questions, options, progress, selectOption}
        }
    }
</script>

<style scoped lang="scss">
    @import '../assets/scss/_settings.scss';

    $max-width: 400px;

    .content {
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.85);
        padding: 50px 0;
    }
    .top {
        width: 90%;
        max-width: $max-width;
        margin: 0 auto;
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;

        &_progress {
            text-align: center;
            color: $color-text;
            opacity: .9;

            &_now {
                font-weight: 600;
                margin-right: 4px;
            }
            &_max {
                font-size: .8rem;

            }
        }
        &_title {
            overflow: hidden;
            text-align: center;
            flex: 1;

            &_img {
                transition: .4s;
                height: 40px;
                fill: #222;
                width: 50%;
                filter: drop-shadow(0 0 1px $color-base);

                &:hover {
                    filter: drop-shadow(0 0 2px $color-base);
                }
            }
        }
    }
    .main {
        width:90%;
        max-width: $max-width;
        margin: 0 auto;
        text-align: center;

        &_img {
            fill: $color-text
        }
        &_content {
            position: relative;

            &_item {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
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
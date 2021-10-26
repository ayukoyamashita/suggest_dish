<template>
    <section class="content">
        <div class="top">
            <div class="top_progress">
                <p class="top_progress_now">Q{{ progress }}</p>
                <p class="top_progress_max">{{ questions.length }}</p>
            </div>

            <div class="top_title">
                <router-link :to="{ name: 'Home'}">

                </router-link>
                <svg class="top_title_img"><use xlink:href="../assets/images/logo.svg#logo"></use></svg>
            </div>
        </div>

        <div class="main">
            <svg class="main_img"><use xlink:href="../assets/images/question.svg#question"></use></svg>
            <div v-for="(q, i) in questions" :key="q.id">
                <Question :question="q" :options="options[q.id]" v-if="progress === (i + 1)" @selectEvent="selectOption" />
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

    .top {
        &_title {
            &_img {
                fill: $color-text;
                width: 30%;
            }
        }
    }

</style>
<template>
    <div v-for="q in questions" :key="q.id">
        <Question :question="q" :options="options[q.id]" />
    </div>

    <button @click="suggest">Suggest</button>

    <div v-if="Object.keys(result).length > 0">
        <router-link :to="{ name: 'Result', params: { id: result.id} }" >結果({{ result.id }})を見る</router-link>
    </div>
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

            onMounted(init);

            return {result, suggest, questions, options}
        }
    }
</script>

<style scoped lang="scss">
    @import '../assets/scss/_settings.scss';


</style>
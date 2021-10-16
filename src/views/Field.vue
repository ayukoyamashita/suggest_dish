<template>
    <div>
        <input v-model="tastes.heat" type="range" min="0" max="10">
        <input v-model="tastes.oily" type="range" min="0" max="10">
        <input v-model="tastes.salty" type="range" min="0" max="10">
        <input v-model="tastes.solid" type="range" min="0" max="10">
        <input v-model="tastes.sweetness" type="range" min="0" max="10">
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

    export default {
        name: "Field",
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

            return {dishes, result, tastes, suggest}
        }
    }
</script>

<style scoped lang="scss">
    @import '../assets/scss/_settings.scss';


</style>
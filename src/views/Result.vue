<template>
    <div>{{ dish }}</div>
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

            onMounted(async () => {
                if (store.state.dishes.length <= 0){
                    store.commit('getDishes');
                }
            });

            return { dish }
        }
    }
</script>

<style scoped lang="scss">
    @import '../assets/scss/_settings.scss';

</style>
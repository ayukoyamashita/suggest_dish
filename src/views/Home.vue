<template>
    <div class="content">
        <div class="top">
            <h1 class="top_title">おすすめごはん</h1>
        </div>

        <router-link :to="{ name: 'Field' }" v-if="dishes.length > 0">
            <div class="link">
                <p class="link_text">Start</p>
            </div>
        </router-link>
    </div>

    <div v-if="dishes.length > 0">
        <img v-for="d in dishes" :key="d.id" :src="d.image" :alt="d.name">
    </div>
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
.red {
    color: $color-accent;
}
</style>
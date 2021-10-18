<template>
    <div>{{ route.params.body }}</div>
    <div>{{ route.params.id }}</div>
</template>

<script>
    import { useRoute } from 'vue-router';

    export default {
        name: "NotFound",
        setup () {
            const route = useRoute();

            return {route}
        }
    }
</script>

<style scoped>

</style>
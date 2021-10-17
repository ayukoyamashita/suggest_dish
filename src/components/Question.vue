<template>
    <div v-for="o in options" :key="o.id">
        {{ o.name }}
    </div>
</template>

<script>
    export default {
        name: "Question",
        props: ['question', 'options'],
    }
</script>

<style scoped>

</style>
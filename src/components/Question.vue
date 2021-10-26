<template>
    <div class="btnGroup">
        <button v-for="o in options" :key="o.id" class="btnGroup_btn" @click="select(o.id)">
            <span>{{ o.name }}</span>
        </button>
    </div>
</template>

<script>
    import { ref } from 'vue';

    export default {
        name: "Question",
        props: ['question', 'options'],
        setup(props, context) {
            const selectedId = ref(0);

            const select = (id) => {
                selectedId.value = id;
                context.emit('selectEvent', id);
            }

            return {selectedId, select}
        },
    }
</script>

<style lang="scss" scoped>
    .btnGroup {
        &_btn {
            display: block;
        }
    }
</style>
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
    @import '../assets/scss/_settings.scss';

    .btnGroup {
        &_btn {
            display: block;
            border-radius: 4px;
            padding: 8px 20px;
            border: 1px solid #fff;
            z-index: 1;
            margin: 10px auto;
            position: relative;
            width: 100%;
            font-weight: 600;
            text-shadow: 0 0 2px rgba(0, 0, 0, 0.6);

            &::before {
                transition: .4s;
                content: '';
                position: absolute;
                width: 10%;
                height: 100%;
                top: 0;
                z-index: -1;
            }
            &:nth-child(even)::before {
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
                left: 0;
            }
            &:nth-child(odd)::before {
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;
                right: 0;
            }
            &:first-child::before {
                background-color: $color-main;
            }
            &:nth-child(2)::before {
                background-color: $color-main-light;
            }
            &:nth-child(3)::before {
                background-color: $color-accent-light;
            }
            &:last-child::before {
                background-color: $color-accent;
            }
            &:hover {
                &::before {
                    border-radius: 4px;
                    width: 100%;
                }
            }
        }
    }
</style>
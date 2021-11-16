<template>
    <div class="btnGroup">
        <button v-for="o in options" :key="o.id" :class="selectedId === o.id ? 'btnGroup_btn selected' : 'btnGroup_btn'" @click="select(o.id)">
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
                window.setTimeout(() => {
                    context.emit('selectEvent', id);
                }, 300)
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
            margin: 15px auto;
            position: relative;
            width: 100%;
            font-weight: 600;
            text-shadow: 0 0 2px rgba(0, 0, 0, 0.6);

            &::before {
                transition: .4s;
                content: '';
                position: absolute;
                width: 0;
                height: 100%;
                top: 0;
                z-index: -1;
                border-top-left-radius: 3px;
                border-bottom-left-radius: 3px;
                left: 0;
            }
            &.selected {
                &::before {
                    background-color: $color-accent-light;
                    border-radius: 4px;
                    width: 100%;
                }
            }
        }
    }
</style>
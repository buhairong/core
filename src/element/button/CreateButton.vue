<template>
    <div class="btn"
        :style="buttonStyle"
        @click="create"
    >
        <i class="el-icon-plus"></i>
        {{text}}
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            required: true,
        },

        buttonStyle: {
            type: Object,
            default: () => ({}),
        },
    },
    methods: {
        create() {
            this.$emit('create')
        }
    },
}
</script>

<style lang="less" scoped>
.btn {
    width: 112px;
    height: 32px;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    background: #F0592E;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: default;
    .el-icon-plus {
        margin-right: 8px;
    }
}
</style>
<template>
    <div class="back-btn"
        :style="buttonStyle"
        @click="back"
    >
        {{text}}
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: '返回',
        },

        buttonStyle: {
            type: Object,
            default: () => ({}),
        },
    },
    methods: {
        back() {
            this.$router.back()
        }
    },
}
</script>

<style lang="less" scoped>
.back-btn {
    height: 40px;
    border-radius: 2px;
    display: flex;
    align-items: center;
    padding: 0 24px;
    background: #F2F3F5;
	color: #1D2129;
    font-size: 14px;
}
</style>
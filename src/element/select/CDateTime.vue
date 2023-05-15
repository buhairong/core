<template>
    <el-date-picker
        v-model="value"
        type="datetime"
        :style="selectStyle"
        :format="valueFormat"
        :value-format="valueFormat"
        :placeholder="placeholder"
        @change="changeDate"
    >
    </el-date-picker>
</template>

<script>
export default {
    props: {
        selectStyle: {
            type: Object,
            default: () => ({})
        },

        value: {
            type: String,
            default: '',
        },

        placeholder: {
            type: String,
            default: '选择时间'
        },

        valueFormat: {
            type: String,
            default: 'yyyy-MM-dd HH:mm',
        },
    },

    data() {
        return {
            
        }
    },
    
    methods: {
        changeDate(e) {
            this.$emit('update:value', e)
            this.$emit('select', e)
        },
    },
}
</script>

<style lang="less" scoped>
.el-date-editor {
    width: 200px;
    height: 32px;
    background: #F2F3F5;
    border: none;
    border-radius: 2px;
    display: flex;
    align-items: center;
    /deep/ .el-input__inner {
        background: transparent;
        height: 100%;
        border: none;
    }
    /deep/ .el-input__icon {
        display: flex;
        align-items: center;
    }
}

</style>
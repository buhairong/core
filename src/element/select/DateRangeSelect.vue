<template>
    <el-date-picker
        v-model="value"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :style="selectStyle"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        @change="changeDate"
    >
    </el-date-picker>
</template>

<script>
import { MIN_AMOUNT, MAX_AMOUNT } from '@/utils/constant'
export default {
    props: {
        selectStyle: {
            type: Object,
            default: () => ({})
        },

        value: {
            type: Array,
            default: () => [],
        },
    },

    data() {
        return {
            MIN_AMOUNT, 
            MAX_AMOUNT,
        }
    },
    
    methods: {
        changeDate(e) {
            this.$emit('select', e)
        },
    },
}
</script>

<style lang="less" scoped>
.el-date-editor {
    width: 364px;
    height: 32px;
    background: #F2F3F5;
    border: none;
    border-radius: 2px;
    display: flex;
    align-items: center;
    /deep/ .el-range-input {
        background: transparent;
    }
    /deep/ .el-input__icon {
        display: flex;
        align-items: center;
    }
    /deep/ .el-range-separator {
        display: flex;
        align-items: center;
    }
}

</style>
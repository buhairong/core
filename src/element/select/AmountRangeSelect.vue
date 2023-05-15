<template>
    <div 
        class="select-range" 
        :style="selectStyle"
    >
        <el-select 
            :value="minSelectValue" 
            :placeholder="minPlaceHolder"
            clearable
            @change="handlerSelectMinValue"
        >
            <el-option
                v-for="item in MIN_AMOUNT"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
        </el-select>
        <div class="split-line"></div>
        <el-select 
            :value="maxSelectValue" 
            :placeholder="maxPlaceHolder"
            clearable
            @change="handlerSelectMaxValue"
        >
            <el-option
                v-for="item in MAX_AMOUNT"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
        </el-select>
    </div>
</template>

<script>
import { MIN_AMOUNT, MAX_AMOUNT } from '@/utils/constant'
export default {
    props: {
        selectStyle: {
            type: Object,
            default: () => ({})
        },

        minSelectValue: {
            type: String | null,
            default: null,
        },

        maxSelectValue: {
            type: String | null,
            default: null,
        },

        minPlaceHolder: {
            type: String,
            default: '最小金额',
        },

        maxPlaceHolder: {
            type: String,
            default: '最大金额',
        },
    },

    data() {
        return {
            MIN_AMOUNT, 
            MAX_AMOUNT,
        }
    },
    
    methods: {
        handlerSelectMinValue(e) {
            this.$emit('update:minSelectValue', e)
            this.$emit('select', {
                min: e,
                max: this.maxSelectValue
            })
        },
        handlerSelectMaxValue(e) {
            this.$emit('update:maxSelectValue', e)
            this.$emit('select', {
                min: this.minSelectValue,
                max: e
            })
        },
    },
}
</script>

<style lang="less" scoped>
.select-range {
    width: 364px;
    height: 32px;
    display: flex;
    align-items: center;
    background: #F2F3F5;
    border-radius: 2px;
    .el-select {
        flex: 1;
        height: 100%;
        /deep/ .el-input {
            width: 100%;
            height: 100%;
        }
        /deep/ .el-input__inner {
            width: 100%;
            height: 100%;
            border-radius: 2px;
            background: #F2F3F5;
            padding: 0 8px;
            font-family: PingFangSC-Regular;
            box-sizing: border-box;
            border: none;
            font-size: 14px;
            color: #4E5969;
            display: flex;
            align-items: center;
            &::placeholder{
                color: #767676;
            }
        }
        /deep/ .el-input__suffix {
            display: flex;
            align-items: center;
        }
    }

    .split-line {
        width: 8px;
        height: 2px;
        border-radius: 0.5px;
        background: #C9CDD4;
        margin: 0 20px;
    }
}

</style>
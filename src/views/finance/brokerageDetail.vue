<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>财务管理</el-breadcrumb-item>
            <el-breadcrumb-item class="subscription-plan">返佣详情</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="content">
            <div class="title">查看详情</div>

            <div class="top">
                <div class="container">
                    <div class="left">
                        <div class="item">
                            <div class="item-title">收款人：</div>
                            <div class="item-content">{{ name}}</div>
                        </div>

                        <div class="item">
                            <div class="item-title">收款人银行卡号：</div>
                            <div class="item-content">{{ bankAccountId}}</div>
                        </div>

                        <div class="item">
                            <div class="item-title">反佣金额：</div>
                            <div class="item-content">{{ formatThousandNumber(money) }}</div>
                        </div>

                        <div class="item">
                            <div class="item-title">申请时间：</div>
                            <div class="item-content">{{ createTime}}</div>
                        </div>

                        <div class="item">
                            <div class="item-title">备注：</div>
                            <div class="item-content">{{ remark || '-'}}</div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="item">
                            <div class="item-title">银行预留手机号：</div>
                            <div class="item-content">{{ bankMobile}}</div>
                        </div>

                        <div class="item">
                            <div class="item-title">身份证号：</div>
                            <div class="item-content">{{ idCard}}</div>
                        </div>

                        <div class="item">
                            <div class="item-title">银行：</div>
                            <div class="item-content">{{ bankName}}</div>
                        </div>

                        <div class="item">
                            <div class="item-title">状态：</div>
                            <div class="item-content">{{ statusStr}}</div>
                        </div>

                        <div class="item">
                            <div class="item-title">完成时间：</div>
                            <div class="item-content">{{ updateTime || '-'}}</div>
                        </div>
                    </div>
                </div>

                <back-button />
            </div>

        </div>
        
    </div>
</template>

<script>
import { formatThousandNumber } from '@/utils/util'

export default {
    name: 'brokerageDetail',

    data() {
        return {
            type: null, // 1个人，2店铺
            bankAccountId: '',
            bankMobile: '',
            bankName: '',
            createTime: '',
            id: '',
            idCard: '',
            money: 0,
            name: '',
            remark: '',
            status: null,
            statusStr: '',
            updateTime: '',
            userId: null,
        }
    },

    mounted() {
        this.type = this.$route.query.type
        this.bankAccountId = this.$route.query.bankAccountId
        this.bankMobile = this.$route.query.bankMobile
        this.bankName = this.$route.query.bankName
        this.createTime = this.$route.query.createTime
        this.id = this.$route.query.id
        this.idCard = this.$route.query.idCard
        this.money = this.$route.query.money
        this.name = this.$route.query.name
        this.remark = this.$route.query.remark
        this.status = this.$route.query.status
        this.statusStr = this.$route.query.statusStr
        this.updateTime = this.$route.query.updateTime
        this.userId = this.$route.query.userId
    },

    methods: {
        formatThousandNumber(num) {
            if (num || num == 0) {
                return formatThousandNumber(num)
            }
            return 0
        },
    },
}
</script>

<style lang="less" scoped>
.content {
    display: flex;
    flex-direction: column;
    .title {
        margin-bottom: 40px;
        height: 22px;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        line-height: 22px;
        color: #1D2129;
    }
    .top {
        flex: 1;
        height: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    .container {
        display: flex;
        .left {
            width: 400px;
            margin-right: 30px;
        }
        .right {
            width: 400px;
        }
        .item {
            margin-bottom: 16px;
            display: flex;
            .item-title {
                margin-right: 8px;
                height: 21px;
                font-family: PingFang-SC-Medium;
                font-size: 14px;
                line-height: 21px;
                color: #86909C;
                width: 130px;
                text-align: right;
            }
            .item-content {
                width: 0;
                flex: 1;
                display: flex;
                flex-wrap: wrap;
                font-family: PingFang-SC-Medium;
                font-size: 14px;
                line-height: 21px;
                color: #1D2129;
            }
        }
    }
}

</style>
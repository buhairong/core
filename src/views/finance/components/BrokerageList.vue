<template>
    <div>
        <el-table 
            :data="list"
            style="width: 100%"
            :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
        >
            <el-table-column
                label="返佣金额"
            >
                <template slot-scope="scope">
                    <div>
                        <div>{{formatThousandNumber(scope.row.money)}}元</div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                label="收款人信息"
            >
                <template slot-scope="scope">
                    <div>
                        <div>{{scope.row.name}}</div>
                        <div>{{scope.row.idCard}}</div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                label="收款人银行卡号"
                prop="bankAccountId"
            >
            </el-table-column>

            <el-table-column
                label="银行"
                prop="bankName"
            >
            </el-table-column>

            <el-table-column
                label="申请时间"
                prop="createTime"
            >
            </el-table-column>

            <el-table-column
                label="状态"
            >
                <template slot-scope="scope">
                    <div :class="{'error-status': scope.row.status === 0}">{{scope.row.statusStr}}</div>
                </template>
            </el-table-column>

            <el-table-column
                label="完成时间"
            >
                <template slot-scope="scope">
                    <div>
                        <div>{{scope.row.updateTime || '-'}}</div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                label="操作"
                width="110"
                align="center"
            >
                <template slot-scope="scope">
                    <div v-if="scope.row.status === 2" class="table-btn" @click="agree(scope.row.id)">完成放款</div>
                    <div v-if="scope.row.status === 2" class="table-btn" @click="reject(scope.row.id)">信息有误</div>
                    <div class="table-btn" @click="goDetailPage(scope.row)">查看详情</div>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
            title="转账信息有误"
            :visible.sync="showRejectDialog"
            width="480px"
            :before-close="handleClose"
        >
            
            <div class="wrap">
                <div>
                    <div class="dialog-tip">备注说明</div>
                    <c-text-area 
                        :inputValue.sync="remark"
                        placeholder="请输入备注说明~最多可输入100个字"
                    />
                </div>

                <span slot="footer" class="dialog-footer">
                    <div class="dialog-btn-wrap" style="margin-top:40px">
                        <div class="btn" @click="handleClose">取消</div>
                        <div class="btn save-btn" @click="handleReject">确认</div>
                    </div>
                </span>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { updateStatusOfBrokerage } from '@/api/finance/finance'
import { formatThousandNumber } from '@/utils/util'

export default {
    props: {
        list: {
            type: Array,
            required: true,
        },
        type: {
            type: Number, // 1个人，2店铺
            required: true,
        },
    },

    data() {
        return {
            remark: '',
            showRejectDialog: false,
            rejectId: null,
        }
    },

    mounted() {
        
    },

    methods: {
        formatThousandNumber(num) {
            if (num || num == 0) {
                return formatThousandNumber(num)
            }
            return 0
        },

        agree(id) {
            this.$confirm(`确认完成这笔放款吗？`, '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
            }).then(() => {
                this.updateStatusOfBrokerage(1, id)
            })
        },

        reject(id) {
            this.showRejectDialog = true
            this.rejectId = id
        },

         handleClose() {
            this.showRejectDialog = false
            this.rejectId = null
        },

        handleReject() {
            if (!this.remark.trim()) {
                this.$message.error('请输入备注说明')
                return
            }


            this.updateStatusOfBrokerage(0, this.rejectId)
            this.handleClose()
        },

        updateStatusOfBrokerage(status, id) {
            const data = {
                status,
                id,
                remark: this.remark,
            }
            updateStatusOfBrokerage(data).then(res => {
                if (res.code === 0) {
                    this.$message.success('保存成功')
                    this.$emit('update')
                } else {
                    this.$message.error('保存失败')
                }
            }).catch(err => {
                this.$message.error('保存失败')
            })
        },

        goDetailPage(row) {
            this.$router.push({
                path: '/finance/brokerageDetail',
                query: {
                    type: this.type,
                    ...row
                },
            })
        },
    },
}
</script>

<style lang="less" scoped>
.error-status {
    color: #EA0000;
}
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  .dialog-tip {
    margin-top: 20px;
    margin-bottom: 5px;
    height: 22px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    line-height: 22px;
    color: #4E5969;
  }
}
</style>
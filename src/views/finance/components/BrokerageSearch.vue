<template>
    <div>
        <div class="title">筛选</div>

        <div class="search-wrap">
            <div class="search-line">
                <div class="search-item">
                    <div class="label">申请日期</div>
                    <date-range-select
                        :value.sync="createTimeRange"
                        :selectStyle="{
                            width: '300px'
                        }"
                        @select="handlerSelectCreateDate"
                    />
                </div>

                <div class="search-item">
                    <div class="label">完成日期</div>
                    <date-range-select
                        :value.sync="updateTimeRange"
                        :selectStyle="{
                            width: '300px'
                        }"
                        @select="handlerSelectUpdateDate"
                    />
                </div>

                <div class="search-item">
                    <div class="label">状态</div>
                    <c-select
                        :selectValue.sync="search.status"
                        :options="BROKERAGE_RISK_STATUS"
                        placeholder="请选择状态"
                    />
                </div>

                <search-button class="search-btn" @search="searchList"/>

                <reset-button class="reset-btn" @reset="reset"/>
            </div>
        </div>
    </div>
</template>

<script>
import { BROKERAGE_RISK_STATUS } from '@/utils/constant'

export default {
    props: {
        type: {
            type: Number, // 1个人，2店铺
            required: true,
        }
    },

    data() {
        return {
            BROKERAGE_RISK_STATUS,
            search: {
                type: null,
                minCreateTime: null, //	最小申请时间
                maxCreateTime: null, //	最大申请时间
                minUpdateTime: null, //	最小完成时间
                maxUpdateTime: null, //	最大完成时间
                status: null,  // 1批准，0不批准，2待放款
                page: 1,	
                size: 10,
            },
            createTimeRange: [],
            updateTimeRange: [],
            list: [],
            total: 0,
        }
    },

    mounted() {
        this.search.type = this.type
        this.searchList()
    },

    methods: {
        handlerSelectCreateDate(data) {
            this.search.minCreateTime = data[0]
            this.search.maxCreateTime = data[1]
            this.createTimeRange = data
        },

        handlerSelectUpdateDate(data) {
            this.search.minUpdateTime = data[0]
            this.search.maxUpdateTime = data[1]
            this.updateTimeRange = data
        },

        reset() {
            this.search.minCreateTime = ''
            this.search.maxCreateTime = ''
            this.createTimeRange = []
            this.search.minUpdateTime = ''
            this.search.maxUpdateTime = ''
            this.updateTimeRange = []
            this.status = null
            this.searchList()
        },

        searchList() {
            this.search.page = 1
            this.$emit('search', this.search)
        },
    },
}
</script>

<style lang="less" scoped>
.title {
  height: 28px;
  font-family: PingFangSC-Medium;
  font-size: 20px;
  line-height: 28px;
  color: #1D2129;
  margin-bottom: 23px;
}

.search-wrap {
    margin-bottom: 40px;
}
.search-line {
  display: flex;
  align-items: center;
  .search-item {
      display: flex;
      align-items: center;
      margin-right: 24px;
      .label {
          height: 22px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          line-height: 22px;
          color: #4E5969;
          margin-right: 16px;
          text-align: right;
      }
  }

  .reset-btn {
    margin-left: 12px;
  }
}
</style>
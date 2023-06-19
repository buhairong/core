<template>
  <div class="wrap">
    <div class="title">验车信息</div>
    <div class="container">
      <div class="left">
        <div class="item">
          <div class="item-title">验车门店:</div>
          <div class="item-content">{{ props.detail.deliveryName || '-' }}</div>
        </div>
      </div>
      <div class="right">
        <div class="item">
          <div class="item-title">验车人员:</div>
          <div class="item-content">{{ props.detail.name || '-' }}</div>
        </div>
      </div>
    </div>

    <div class="title">车辆照片</div>

    <div class="tab-wrap">
      <div
        v-for="tab in carPicsTypeList"
        :key="tab.id"
        class="tab"
        :class="{ 'active-tab': currentCarPicsType === tab.id }"
        @click="changeCarPicsTypeListTab(tab.id)"
      >
        {{ tab.label }}
      </div>
    </div>

    <div class="car-pics">
      <div class="car-pic" v-for="(item, index) in currentCarPics" :key="index">
        <el-image
          style="width: 180px"
          :src="item.url"
          :preview-src-list="currentCarPics.map((pic) => pic.url)"
          :initial-index="index"
        ></el-image>
        <div class="remark">
          {{ item.remark }}
        </div>
      </div>
    </div>

    <div class="title">验车报告</div>
    <div class="tab-wrap">
      <div
        v-for="(tab, index) in validJSON"
        :key="index"
        class="tab"
        :class="{ 'active-tab': currentValidJSONType === index }"
        @click="changeValidJSONTab(index)"
      >
        {{ tab.name }}
      </div>
    </div>

    <div class="valid-json-wrap">
      <div v-show="currentValidJSON.type === 'vin'">
        <el-image
          v-if="currentValidJSON.url"
          style="width: 260px"
          :src="currentValidJSON.url"
          :preview-src-list="[currentValidJSON.url]"
        ></el-image>
      </div>

      <div v-show="currentValidJSON.type === 'pickup'">
        <div class="img-list">
          <el-image
            v-for="(item, index) in currentValidJSON.imgList"
            :key="index"
            style="width: 260px; margin-right: 16px; margin-bottom: 16px"
            :src="item"
            :preview-src-list="currentValidJSON.imgList"
            :initial-index="index"
          ></el-image>
        </div>
      </div>

      <div class="check-info" v-show="currentValidJSON.children">
        <div class="second-wrap" v-for="item in currentValidJSON.children" :key="item.id">
          <div class="second-title">{{ item.name }}</div>
          <div class="second-container">
            <div class="second-item" v-if="item.type === 'tyre'">
              <div class="second-item-title">轮胎信息</div>
              <div class="second-item-content">{{ item.brand }} {{ item.size }}</div>
            </div>
            <div class="second-item">
              <div class="second-item-title">{{ item.name }}状态</div>
              <div
                class="second-item-content"
                :style="{ color: item.status === 2 ? '#F5194B' : 'rgba(10, 15, 45, 0.8)' }"
              >
                {{
                  currentValidJSON.type === 'parts'
                    ? item.status === 1
                      ? '有'
                      : '无'
                    : item.status === 1
                    ? '正常'
                    : '异常'
                }}
              </div>
            </div>
            <template v-if="item.status === 2 && currentValidJSON.type !== 'parts'">
              <div v-if="item.children">
                <div
                  v-for="(level3, index3) in item.children.filter((item: any) => item.exceptionDesc)"
                  :key="index3"
                >
                  <div class="second-title" style="margin-bottom: 12px">{{ level3.name }}</div>
                  <div class="second-item">
                    <div class="second-item-title">异常处照片</div>
                    <div class="second-item-content">
                      <div class="img-list">
                        <el-image
                          v-for="(pic, index1) in level3.imgList"
                          :key="index1"
                          style="width: 90px; margin-left: 8px; margin-bottom: 8px"
                          :src="pic"
                          :preview-src-list="level3.imgList"
                          :initial-index="index1"
                        ></el-image>
                      </div>
                    </div>
                  </div>
                  <div class="second-item">
                    <div class="desc">
                      <div class="desc-title">异常处说明</div>
                      <div class="desc-text">{{ level3.exceptionDesc }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="second-item">
                  <div class="second-item-title">异常处照片</div>
                  <div class="second-item-content">
                    <div class="img-list">
                      <el-image
                        v-for="(pic, index1) in item.imgList"
                        :key="index1"
                        style="width: 90px; margin-left: 8px; margin-bottom: 8px"
                        :src="pic"
                        :preview-src-list="item.imgList"
                        :initial-index="index1"
                      ></el-image>
                    </div>
                  </div>
                </div>
                <div class="second-item">
                  <div class="desc">
                    <div class="desc-title">异常处说明</div>
                    <div class="desc-text">{{ item.exceptionDesc }}</div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IOrderDetail, IPics } from '@/types'
import { ref } from 'vue'

interface IProps {
  detail: IOrderDetail
}

const props = defineProps<IProps>()

const carPicsTypeList = [
  { id: 0, label: '左前45度' },
  { id: 1, label: '车辆正前' },
  { id: 3, label: '车辆正侧' },
  { id: 5, label: '车辆正后' }
]
const currentCarPicsType = ref<number>(0)
const currentCarPics = ref<IPics[]>([])
const validJSON = ref<any[]>([])
const currentValidJSONType = ref<number>(0)
const currentValidJSON = ref<any>({})

if (props.detail.deliveryCheckInfo) {
  validJSON.value = JSON.parse(props.detail.deliveryCheckInfo)
}

const getCurrentCarPics = (index: number) => {
  const findItem = props.detail.deliveryCarPicsMap.find((item) => item.carPicsType === index)
  if (findItem) {
    currentCarPics.value = findItem.picsList
  }
}

const changeCarPicsTypeListTab = (index: number) => {
  currentCarPicsType.value = index
  getCurrentCarPics(index)
}

const getCurrentValidJSON = (index: number) => {
  currentValidJSON.value = validJSON.value[index]
}

const changeValidJSONTab = (index: number) => {
  currentValidJSONType.value = index
  getCurrentValidJSON(index)
}

getCurrentCarPics(0)

getCurrentValidJSON(0)
</script>

<style lang="scss" scoped>
.wrap {
  padding-left: 100px;
  .title {
    margin: 24px 0;
    height: 22px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    line-height: 22px;
    color: #1d2129;
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
        color: #86909c;
      }
      .item-content {
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        line-height: 21px;
        color: #1d2129;
      }
    }
  }

  .tab-wrap {
    margin-bottom: 32px;
    display: flex;
    .tab {
      margin-right: 32px;
      height: 22px;
      line-height: 22px;
      color: #4e5969;
      font-size: 14px;
      cursor: pointer;
    }
    .active-tab {
      color: #3446aa;
      position: relative;
    }
    .active-tab:before {
      content: '';
      display: block;
      width: 8px;
      height: 2px;
      border-radius: 1px;
      background-color: #3446aa;
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .car-pics {
    width: 900px;
    display: flex;
    flex-wrap: wrap;
    .car-pic {
      margin-right: 32px;
      margin-bottom: 32px;
      width: 400px;
      display: flex;
      .remark {
        flex: 1;
        margin-top: 8px;
        padding-left: 22px;
        line-height: 22px;
        color: #4e5969;
        font-size: 12px;
      }
    }
  }

  .valid-json-wrap {
    padding-top: 20px;
  }

  .img-list {
    display: flex;
    flex-wrap: wrap;
  }

  .check-info {
    width: 900px;
    display: flex;
    flex-wrap: wrap;
    .second-wrap {
      margin-right: 100px;
      margin-bottom: 30px;
      width: 300px;
      .second-title {
        height: 22px;
        font-family: PingFangSC-Medium;
        font-size: 15px;
        line-height: 22px;
        color: #0a0f2d;
      }
      .second-container {
        padding-top: 16px;
        padding-left: 16px;
        .second-item {
          margin-bottom: 12px;
          display: flex;
          justify-content: space-between;
          .second-item-title {
            padding-right: 12px;
            height: 22px;
            font-family: PingFang SC;
            font-size: 15px;
            line-height: 22px;
            color: rgba(10, 15, 45, 0.8);
          }
          .second-item-content {
            flex: 1;
            font-family: PingFangSC-Regular;
            font-size: 15px;
            line-height: 22px;
            letter-spacing: 0px;
            color: rgba(10, 15, 45, 0.8);
            display: flex;
            justify-content: flex-end;
          }
          .desc {
            flex: 1;
            border-radius: 8px;
            background: rgba(10, 15, 45, 0.04);
            padding: 16px;
            .desc-title {
              margin-bottom: 4px;
              height: 22px;
              font-family: PingFang SC;
              font-size: 15px;
              line-height: 22px;
              color: rgba(10, 15, 45, 0.8);
            }
            .desc-text {
              font-family: PingFang SC;
              font-size: 12px;
              line-height: 18px;
              color: #64696f;
            }
          }
        }
      }
    }
  }
}
</style>

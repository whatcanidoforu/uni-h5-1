import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRefresh = defineStore('refresh', () => {
  const thread = ref(false) // 线索
  const opportunity = ref(false) // 商机
  const customer = ref(false) // 客户
  const contract = ref(false) // 合同
  const modify = ref(false) // 合同
  const surrender = ref(false) // 退租
  const property_surrender = ref(false) // 退租
  const sale = ref(false) // 销售
  const role = ref(false) // 角色
  const receive = ref(false) // 应收明细
  const adjust = ref(false) // 费用调整
  const bill = ref(false) // 账单
  const collect = ref(false) // 收款
  const refundable = ref(false) // 押金
  const adfund = ref(false) // 押金调整
  const refund = ref(false) // 退款管理
  const workOrder = ref(false) // 工单
  const operationPlan = ref(false) // 任务计划
  const operationTask = ref(false) // 任务计划
  const spaceTree = ref(false) // 空间树
  const spaceLockApply = ref(false) // 空间锁定申请
  const agency = ref(false) // 中介管理
  const certificate_manage = ref(false) // 产证管理
  const money_age = ref(false) // 账龄分析
  const property_deviceInfo = ref(false) // 物业-设备管理
  const property_machineRoom = ref(false) // 物业-机房管理
  const property_opStandard = ref(false) // 物业-作业标准
  const property_garage = ref(false) // 物业-作业标准
  const visitOrderList = ref(false) // 带看单列表
  const intention = ref(false) // 意向定金协议
  const spaceFloor = ref(false) // 楼层
  const housingResources = ref(false) // 发布房源
  const certificateManage = ref(false) // 发布房源
  const refundManage = ref(false) // 退款管理
  const property_pmContract = ref(false) // 物业-合同列表
  const property_inspection_point = ref(false) // 物业巡检任务站点列表
  const property_inspection_task = ref(false) // 物业巡检任务任务管理列表
  const property_workorder_service = ref(false) // 工单客服中心
  const property_workorder_pool = ref(false) // 工单池
  const property_device_maintenance = ref(false) // 设备维保列表（定期&非定期）
  const applybindlist = ref(false) // 员工绑定申请列表
  const bindlist = ref(false) // 绑定列表
  const property_order_list = ref(false) // 订单列表
  const property_activity = ref(false) // 活动列表
  const property_service_list = ref(false) // 园区服务列表
  const property_notice_manage = ref(false) // 物业-公告消息
  const property_meter = ref(false) // 物业表记
  const property_black_list = ref(false) // 物业表记
  const property_device_meter_manage = ref(false) // 水电表记列表
  const property_device_meter_read = ref(false) // 水电表记，抄表记录列表

  return {
    thread,
    opportunity,
    customer,
    contract,
    modify,
    surrender,
    property_surrender,
    sale,
    role,
    receive,
    adjust,
    bill,
    collect,
    refundable,
    adfund,
    refund,
    workOrder,
    operationPlan,
    operationTask,
    spaceTree,
    spaceLockApply,
    agency,
    certificate_manage,
    money_age,
    property_deviceInfo,
    property_machineRoom,
    property_opStandard,
    property_garage,
    visitOrderList,
    intention,
    spaceFloor,
    housingResources,
    certificateManage,
    refundManage,
    property_pmContract,
    property_inspection_point,
    property_inspection_task,
    property_workorder_service,
    property_workorder_pool,
    property_device_maintenance,
    applybindlist,
    bindlist,
    property_order_list,
    property_activity,
    property_service_list,
    property_notice_manage,
    property_meter,
    property_black_list,
    property_device_meter_manage,
    property_device_meter_read
  }
})

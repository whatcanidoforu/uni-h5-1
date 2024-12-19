export type IBillWriteOffDetailReceivables = {
  amountReceivable: number
  amountReceived: number
  amountUnReceived: number
  billCode: string
  billTime: string
  feeItemName: string
  id: number
  resourceCode: string
  resourceName: string
  feeEndTime: string
  feeStartTime: string
}
export type IBillWriteOffDetail = {
  comId: number
  comName: string
  customerComId: number
  customerName: string
  parkId: number
  parkName: string
  receivables: IBillWriteOffDetailReceivables[]
  remainReceivableAmount: number
}

export type IBillWriteOffRequest = {
  recievedId?: number
  refundedId?: number
  writeOffAmount?: number
  items: IBillWriteOffDetailReceivables[]
}

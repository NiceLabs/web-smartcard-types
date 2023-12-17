/**
 * @see https://wicg.github.io/web-smart-card/#dom-smartcardreaderstatein
 */
declare interface SmartCardReaderStateIn {
  readonly readerName: string
  readonly currentState: SmartCardReaderStateFlagsIn
  readonly currentCount?: number
}

/**
 * @see https://wicg.github.io/web-smart-card/#smartcardreaderstateflagsin-dictionary
 */
declare interface SmartCardReaderStateFlagsIn {
  readonly unaware?: boolean
  readonly ignore?: boolean
  readonly unavailable?: boolean
  readonly empty?: boolean
  readonly present?: boolean
  readonly exclusive?: boolean
  readonly inuse?: boolean
  readonly mute?: boolean
  readonly unpowered?: boolean
}

/**
 * The actual state of a smart card reader.
 *
 * @see https://wicg.github.io/web-smart-card/#dom-smartcardreaderstateout
 */
declare interface SmartCardReaderStateOut {
  readonly readerName: string
  readonly eventState: SmartCardReaderStateFlagsOut
  readonly eventCount: number
  readonly answerToReset?: ArrayBuffer
}

/**
 * @see https://wicg.github.io/web-smart-card/#smartcardreaderstateflagsout-dictionary
 */
declare interface SmartCardReaderStateFlagsOut {
  readonly ignore?: boolean
  readonly changed?: boolean
  readonly unavailable?: boolean
  readonly unknown?: boolean
  readonly empty?: boolean
  readonly present?: boolean
  readonly exclusive?: boolean
  readonly inuse?: boolean
  readonly mute?: boolean
  readonly unpowered?: boolean
}

/**
 * @see https://wicg.github.io/web-smart-card/#smartcardcontext-interface
 */
declare class SmartCardContext {
  listReaders(): Promise<readonly string[]>
  getStatusChange(
    readerStates: readonly SmartCardReaderStateIn[],
    options?: SmartCardGetStatusChangeOptions
  ): Promise<readonly SmartCardReaderStateOut[]>
  connect(
    readerName: string,
    accessMode: SmartCardAccessMode,
    options?: SmartCardConnectOptions
  ): Promise<SmartCardConnectResult>
}

/**
 * @see https://wicg.github.io/web-smart-card/#dom-smartcardgetstatuschangeoptions
 */
declare interface SmartCardGetStatusChangeOptions {
  readonly timeout?: DOMHighResTimeStamp
  readonly signal?: AbortSignal
}

/**
 * @see https://wicg.github.io/web-smart-card/#dom-smartcardconnectresult
 */
declare interface SmartCardConnectResult {
  readonly connection: SmartCardConnection
  readonly activeProtocol?: SmartCardProtocol
}

/**
 * @see https://wicg.github.io/web-smart-card/#dom-smartcarddisposition
 */
declare type SmartCardDisposition = 'leave' | 'reset' | 'unpower' | 'eject'

/**
 * @see https://wicg.github.io/web-smart-card/#dom-smartcardtransactionoptions
 */
declare interface SmartCardTransactionOptions {
  readonly signal?: AbortSignal
}

/**
 * @see https://wicg.github.io/web-smart-card/#dom-smartcardtransmitoptions
 */
declare interface SmartCardTransmitOptions {
  readonly protocol?: SmartCardProtocol
}

/**
 * @see https://wicg.github.io/web-smart-card/#smartcardconnection-interface
 */
declare class SmartCardConnection {
  disconnect(disposition?: SmartCardDisposition): Promise<void>

  transmit(sendBuffer: BufferSource, options?: SmartCardTransmitOptions): Promise<ArrayBuffer>

  startTransaction(transaction: SmartCardTransactionCallback, options?: SmartCardTransactionOptions): Promise<void>

  status(): Promise<SmartCardConnectionStatus>

  control(controlCode: number, data: BufferSource): Promise<ArrayBuffer>

  getAttribute(tag: number): Promise<ArrayBuffer>

  setAttribute(tag: number, value: BufferSource): Promise<void>
}

/**
 * @see https://wicg.github.io/web-smart-card/#dom-smartcardtransactioncallback
 */
declare type SmartCardTransactionCallback = () => Promise<SmartCardDisposition | void>

/**
 * @see https://wicg.github.io/web-smart-card/#dom-smartcardprotocol
 */
declare type SmartCardProtocol = 'raw' | 't0' | 't1'

/**
 * @see https://wicg.github.io/web-smart-card/#dom-smartcardaccessmode
 */
declare type SmartCardAccessMode = 'shared' | 'exclusive' | 'direct'

/**
 * @see https://wicg.github.io/web-smart-card/#smartcardconnectionstatus-dictionary
 */
declare interface SmartCardConnectionStatus {
  readonly readerName: string
  readonly state: SmartCardConnectionState
  readonly answerToReset?: ArrayBuffer
}

/**
 * @see https://wicg.github.io/web-smart-card/#dom-smartcardconnectionstate
 */
declare type SmartCardConnectionState =
  | 'absent'
  | 'present'
  | 'swallowed'
  | 'powered'
  | 'negotiable'
  | 't0'
  | 't1'
  | 'raw'

/**
 * @see https://wicg.github.io/web-smart-card/#dom-smartcardconnectoptions
 */
declare interface SmartCardConnectOptions {
  readonly preferredProtocols: readonly SmartCardProtocol[]
}

/**
 * Methods on this interface complete asynchronously, queuing work on the smart card task source.
 *
 * @see https://wicg.github.io/web-smart-card/#smartcardresourcemanager-interface
 */
declare class SmartCardResourceManager {
  /**
   * Requests a PC/SC context from the platform's PC/SC stack.
   */
  establishContext(): Promise<SmartCardContext>
}

/**
 * @see https://wicg.github.io/web-smart-card/#smartcarderror-interface
 */
declare class SmartCardError extends DOMException {
  constructor()
  constructor(options: SmartCardErrorOptions)
  constructor(message: string, options: SmartCardErrorOptions)

  readonly responseCode: SmartCardResponseCode
}

/**
 * @see https://wicg.github.io/web-smart-card/#smartcarderroroptions-dictionary
 */
declare interface SmartCardErrorOptions {
  readonly responseCode: SmartCardResponseCode
}

/**
 * @see https://wicg.github.io/web-smart-card/#smartcardresponsecode-enum
 */
declare type SmartCardResponseCode =
  | 'no-service'
  | 'no-smartcard'
  | 'not-ready'
  | 'not-transacted'
  | 'proto-mismatch'
  | 'reader-unavailable'
  | 'removed-card'
  | 'reset-card'
  | 'server-too-busy'
  | 'sharing-violation'
  | 'system-cancelled'
  | 'unknown-reader'
  | 'unpowered-card'
  | 'unresponsive-card'
  | 'unsupported-card'
  | 'unsupported-feature'

declare interface Navigator {
  /**
   * @see https://wicg.github.io/web-smart-card/#extensions-to-the-navigator-interface
   */
  smartCard: SmartCardResourceManager
}

declare interface WorkerNavigator {
  /**
   * @see https://wicg.github.io/web-smart-card/#extensions-to-the-workernavigator-interface
   */
  smartCard: SmartCardResourceManager
}

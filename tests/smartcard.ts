async function listReaders() {
  const context = await navigator.smartCard.establishContext()
  await context.listReaders()
}

async function example1() {
  try {
    let context = await navigator.smartCard.establishContext()
    let readers = await context.listReaders()

    // Assume there's at least one reader present.
    let reader = readers[0]

    console.log('Connecting to the smart card inside ' + reader)
    // A permission prompt might be displayed before the connection is established.
    let connectResult = await context.connect(reader, 'shared', { preferredProtocols: ['t0', 't1'] })

    console.log(`Connected with protocol ${connectResult.activeProtocol}`)

    let connection = connectResult.connection

    // Send an APDU (application protocol data unit) and get the card's response
    let command = new Uint8Array([
      0x00, 0xa4, 0x04, 0x00, 0x0a, 0xa0, 0x00, 0x00, 0x00, 0x62, 0x03, 0x01, 0x0c, 0x06, 0x01,
    ])

    let responseData = connection.transmit(command)
    console.log('Card responded with: ' + responseData)

    await connection.disconnect()
  } catch (ex) {
    console.warn('A Smart Card operation failed: ' + ex)
  }
}

async function exampleTransaction1(connection: SmartCardConnection) {
  try {
    await connection.startTransaction(async () => {
      // A transaction has successfully started.
      let firstCommand = new Uint8Array([
        0x00, 0xa4, 0x04, 0x00, 0x0a, 0xa0, 0x00, 0x00, 0x00, 0x62, 0x03, 0x01, 0x0c, 0x06, 0x01,
      ])
      await connection.transmit(firstCommand)
      // Reset the card when ending the transaction.
      return 'reset'
    })
  } catch (ex) {
    // Either the transaction failed to start, the callback
    // has thrown or the transaction failed to end.
  }
}

async function createSmartCardError() {
  new SmartCardError()
  new SmartCardError({ responseCode: 'no-service' })
  new SmartCardError('message', { responseCode: 'no-service' })
}

import * as zip from '@zip.js/zip.js'
import { AppState } from './AppState'

export class Persistance {
  static PERSONS_FILENAME = 'persons.json'
  static RELATIONS_FILENAME = 'relations.json'

  static async saveAppState(appState: AppState): Promise<Blob> {
    const zipBlobWriter = new zip.BlobWriter()
    const zipWriter = new zip.ZipWriter(zipBlobWriter)

    await Promise.all([
      zipWriter.add(this.PERSONS_FILENAME, new zip.TextReader(JSON.stringify(appState.persons))),
      zipWriter.add(this.RELATIONS_FILENAME, new zip.TextReader(JSON.stringify(appState.relations)))
    ])

    return zipWriter.close()
  }

  static async loadAppState(blob: Blob): Promise<AppState> {
    const appState = new AppState()
    const zipBlobReader = new zip.BlobReader(blob)
    const zipReader = new zip.ZipReader(zipBlobReader)
    const zipEntries = await zipReader.getEntries()

    appState.persons = (await _readZippedData(this.PERSONS_FILENAME)) ?? []
    appState.relations = (await _readZippedData(this.RELATIONS_FILENAME)) ?? []

    await zipReader.close()

    return appState

    async function _readZippedData<T>(fileName: string): Promise<T | undefined> {
      const contents = await _readZippedFileContents(fileName)
      return contents ? <T>JSON.parse(contents) : undefined
    }

    async function _readZippedFileContents(fileName: string): Promise<string | undefined> {
      const zipEntry = zipEntries.find((x) => x.filename === fileName)
      if (!zipEntry) return undefined

      const zipTextWriter = new zip.TextWriter()
      return await zipEntry.getData!(zipTextWriter)
    }
  }
}

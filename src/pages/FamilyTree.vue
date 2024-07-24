<template>
  <div>Family tree</div>
  <br />
  <button @click="addPerson">Add Person</button>
  <button @click="downloadAppState">Download</button>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { AppState } from '@/model/AppState'
import { Persistance } from '@/model/Persistance'

const appState: AppState = inject('AppState')!

function addPerson() {
  appState.addPerson({ firstName: 'foo', lastName: 'bar' })
  console.log(appState)
}

async function downloadAppState() {
  const blob = await Persistance.saveAppState(appState)
  _downloadFile(blob, 'family-tree.zip')

  function _downloadFile(blob: Blob, fileName: string) {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    document.body.appendChild(a)
    a.setAttribute('style', 'display: none')
    a.href = url
    a.download = fileName
    a.click()
    window.URL.revokeObjectURL(url)
    a.remove()
  }
}
</script>

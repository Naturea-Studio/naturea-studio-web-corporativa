<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const complete = ref(false)
function download(event: SubmitEvent) {
  const form = event.currentTarget as HTMLFormElement
  if (!form.reportValidity()) return
  const data = new FormData(form)
  const fields = Array.from(data.entries()).filter(
    (entry): entry is [string, string] => typeof entry[1] === 'string' && Boolean(entry[1].trim()),
  )
  const body = [
    'Borrador de proyecto · Naturea Studio',
    '',
    ...fields.map(([key, value]) => key + ': ' + value),
  ].join('\n')
  const url = URL.createObjectURL(new Blob([body], { type: 'text/plain;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'proyecto-naturea.txt'
  link.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  complete.value = true
}
</script>
<template>
  <form class="project-form" @submit.prevent="download">
    <p class="full">
      Prepara un borrador para descargar en tu dispositivo. En esta fase, la web funciona en modo de
      prueba y el formulario no envía solicitudes.
    </p>
    <label>Nombre <input name="Nombre" autocomplete="name" required /></label>
    <label
      >Correo electrónico <input name="Correo" type="email" autocomplete="email" required
    /></label>
    <label>Teléfono (opcional) <input name="Teléfono" type="tel" autocomplete="tel" /></label>
    <label
      >Tipo de mobiliario
      <select name="Mobiliario">
        <option>Mesa de comedor</option>
        <option>Escritorio</option>
        <option>Consola</option>
        <option>Mobiliario para hostelería</option>
        <option>Otro</option>
      </select></label
    >
    <label
      >Dimensiones aproximadas <input name="Dimensiones" placeholder="Largo × ancho × alto"
    /></label>
    <label
      >Madera preferida
      <select name="Madera">
        <option>Por decidir</option>
        <option>Roble</option>
        <option>Nogal</option>
        <option>Olivo</option>
        <option>Fresno</option>
      </select></label
    >
    <label>Acabados y colores <input name="Acabados y colores" /></label>
    <label>Presupuesto aproximado <input name="Presupuesto" /></label>
    <label>Provincia <input name="Provincia" autocomplete="address-level2" /></label>
    <label>Fecha deseada <input name="Fecha" type="date" /></label>
    <label class="full"
      >Describe el proyecto
      <textarea
        name="Descripción"
        rows="5"
        :value="
          typeof route.query.configuracion === 'string'
            ? route.query.configuracion.slice(0, 500)
            : undefined
        "
        required
      />
    </label>
    <div class="full">
      <button class="button" type="submit">Descargar borrador</button>
      <p v-if="complete" role="status">
        Tu borrador está listo en las descargas del navegador. Puedes seguir editándolo aquí.
      </p>
    </div>
  </form>
</template>

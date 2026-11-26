<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../services/supabase'
import { accountReady, recovering, session } from '../services/account'

const route = useRoute()
const router = useRouter()
const changing = computed(() => route.path === '/cuenta/recuperar')
const initial =
  typeof route.query.error === 'string' || /(?:^|[&#])error=/.test(window.location.hash)
const feedback = ref(
  initial ? 'El enlace no es válido o ha caducado. Puedes solicitar uno nuevo.' : '',
)
const failed = ref(initial)
const mode = ref<'signin' | 'signup' | 'reset'>(changing.value ? 'reset' : 'signin')
const email = ref('')
const password = ref('')
const busy = ref(false)

watch(mode, () => {
  feedback.value = ''
  password.value = ''
  failed.value = false
})

async function submit() {
  if (!supabase || busy.value) return
  busy.value = true
  failed.value = false
  feedback.value = ''
  try {
    if (changing.value && recovering.value) {
      const { error } = await supabase.auth.updateUser({ password: password.value })
      if (error) throw error
      recovering.value = false
      await router.replace('/cuenta')
    } else if (mode.value === 'signup') {
      const { error } = await supabase.auth.signUp({
        email: email.value.trim(),
        password: password.value,
        options: { emailRedirectTo: window.location.origin + '/cuenta' },
      })
      if (error) throw error
      feedback.value = 'Si el alta puede completarse, recibirás un enlace de confirmación.'
    } else if (mode.value === 'reset') {
      const { error } = await supabase.auth.resetPasswordForEmail(email.value.trim(), {
        redirectTo: window.location.origin + '/cuenta/recuperar',
      })
      if (error) throw error
      feedback.value = 'Si el correo corresponde a una cuenta, recibirás un enlace de recuperación.'
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.value.trim(),
        password: password.value,
      })
      if (error) throw error
    }
    password.value = ''
  } catch {
    failed.value = true
    feedback.value =
      mode.value === 'signin'
        ? 'No se pudo iniciar sesión. Revisa tus datos o confirma el correo si acabas de registrarte.'
        : 'No se pudo completar la solicitud. Revisa los datos o vuelve a intentarlo más tarde.'
  } finally {
    busy.value = false
  }
}

async function signOut() {
  if (!supabase || busy.value) return
  busy.value = true
  try {
    const { error } = await supabase.auth.signOut({ scope: 'local' })
    if (error) throw error
    feedback.value = 'Sesión cerrada en este navegador.'
    failed.value = false
  } catch {
    feedback.value = 'No se pudo cerrar la sesión. Vuelve a intentarlo.'
    failed.value = true
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <div class="wrap inner-page">
    <header class="catalog-intro">
      <div>
        <p class="eyebrow">Área personal</p>
        <h1>{{ changing ? 'Recuperar contraseña' : 'Mi cuenta' }}</h1>
      </div>
      <p>Accede con tu correo para gestionar tu cuenta de Naturea Studio.</p>
    </header>
    <section v-if="!supabase" class="catalog-empty">
      <h2>Cuentas pendientes de conexión</h2>
      <p>Esta versión sigue funcionando como demo.</p>
      <RouterLink class="text-link" to="/cuenta/pedidos"
        >Ver pedidos de prueba guardados en este navegador</RouterLink
      >
    </section>
    <p v-else-if="!accountReady" role="status">Comprobando sesión…</p>
    <section v-else-if="session && !changing" class="feature-panel">
      <h2>Tu cuenta</h2>
      <p>{{ session.user.email }}</p>
      <div class="hero-links">
        <button type="button" class="button" :disabled="busy" @click="signOut">
          Cerrar sesión
        </button>
      </div>
      <p v-if="feedback" :role="failed ? 'alert' : 'status'">{{ feedback }}</p>
    </section>
    <section v-else class="feature-panel" style="max-width: 44rem">
      <nav v-if="!changing" class="page-links" aria-label="Opciones de acceso">
        <button
          type="button"
          class="text-link"
          :aria-pressed="mode === 'signin'"
          :disabled="busy"
          @click="mode = 'signin'"
        >
          Iniciar sesión
        </button>
        <button
          type="button"
          class="text-link"
          :aria-pressed="mode === 'signup'"
          :disabled="busy"
          @click="mode = 'signup'"
        >
          Crear cuenta
        </button>
        <button
          type="button"
          class="text-link"
          :aria-pressed="mode === 'reset'"
          :disabled="busy"
          @click="mode = 'reset'"
        >
          Recuperar contraseña
        </button>
      </nav>
      <form @submit.prevent="submit">
        <div class="feature-fields">
          <label v-if="!(changing && recovering)"
            >Correo electrónico<input
              v-model="email"
              type="email"
              autocomplete="email"
              required
              maxlength="254"
          /></label>
          <label v-if="mode !== 'reset' || (changing && recovering)"
            >{{ changing ? 'Nueva contraseña' : 'Contraseña'
            }}<input
              v-model="password"
              type="password"
              :autocomplete="changing || mode === 'signup' ? 'new-password' : 'current-password'"
              required
              :minlength="changing || mode === 'signup' ? 12 : undefined"
              maxlength="72"
          /></label>
        </div>
        <div class="page-links">
          <button class="button" type="submit" :disabled="busy">
            {{
              busy
                ? 'Un momento…'
                : changing && recovering
                  ? 'Guardar contraseña'
                  : mode === 'reset'
                    ? 'Solicitar enlace'
                    : mode === 'signup'
                      ? 'Crear cuenta'
                      : 'Iniciar sesión'
            }}</button
          ><RouterLink v-if="changing" class="text-link" to="/cuenta"
            >Volver a Mi cuenta</RouterLink
          >
        </div>
      </form>
      <p v-if="feedback" :role="failed ? 'alert' : 'status'">{{ feedback }}</p>
    </section>
  </div>
</template>

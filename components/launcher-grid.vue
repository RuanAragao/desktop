<template>
  <span class="overflow-hidden">
    <draggable
      :list="loadedApps"
      class="max-h-screen h-screen flex flex-col p-2 content-start flex-wrap"
      ghost-class="ghost"
      @start="dragging = true"
      @end="dragging = false"
    >
      <AppLauncher
        v-for="(app, index) in loadedApps"
        :key="index"
        v-bind="app"
        @click.native="() => openApp(app)"
      />
    </draggable>
    <WindowComponent
      v-for="app in runningApps"
      :key="app.slug"
      :title="app.name"
      :on-close="() => runningApps.splice(runningApps.indexOf(app), 1)"
    >
      <keep-alive>
        <component :is="app.app" />
      </keep-alive>
    </WindowComponent>
  </span>
</template>

<script lang="ts">
import draggable from 'vuedraggable'
import AppLauncher from '~/components/app-launcher.vue'
import WindowComponent from '~/components/window-component.vue'

type App = {
  name: string
  icon: string
  slug: string
  app: () => Promise<typeof import('*.vue')>
  command: string
}

export default {
  name: 'LauncherGrid',
  components: {
    draggable,
    AppLauncher,
    WindowComponent,
  },

  setup() {
    return {
      apps: [
        {
          name: 'About',
          icon: '~/applications/about/icon.png',
          slug: 'about',
          command: 'run application.about',
        },
        {
          name: 'xTerm',
          icon: '~/applications/xterm/icon.png',
          slug: 'xterm',
          command: 'run application.xterm',
        },
      ],
    }
  },

  data() {
    return {
      loadedApps: [] as App[],
      runningApps: [] as App[],
      dragging: false as boolean,
    }
  },

  async mounted() {
    this.loadedApps = await Promise.all(
      this.apps.map(
        async (app) =>
          await {
            ...app,
            icon: require(`~/applications/${app.slug}/icon.png`),
            app: () => import(`~/applications/${app.slug}/index.vue`),
          }
      )
    )
  },

  methods: {
    openApp(app: App) {
      this.runningApps.push(app)
    },
  },
}
</script>

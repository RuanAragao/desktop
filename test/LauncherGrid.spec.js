import { mount } from '@vue/test-utils'
import LauncherGrid from '@/components/launcher-grid.vue'

describe('LauncherGrid', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(LauncherGrid)
    expect(wrapper.vm).toBeTruthy()
  })
})

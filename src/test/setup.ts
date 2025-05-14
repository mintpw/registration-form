import '@testing-library/jest-dom'
import { JSDOM } from 'jsdom'
import ResizeObserver from 'resize-observer-polyfill'
import { vi } from 'vitest'

const { window } = new JSDOM()

// ResizeObserver mock
vi.stubGlobal('ResizeObserver', ResizeObserver)
window['ResizeObserver'] = ResizeObserver

// IntersectionObserver mock
const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}))
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
window['IntersectionObserver'] = IntersectionObserverMock

// Mock scroll methods
window.Element.prototype.scrollTo = () => {}
window.scrollTo = () => {}

// requestAnimationFrame mock
window.requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(cb, 1000 / 60)

// URL object mock
window.URL.createObjectURL = () => 'https://i.pravatar.cc/300'
window.URL.revokeObjectURL = () => {}

// navigator mock
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Override globalThis
Object.assign(global, { window, document: window.document })

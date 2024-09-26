export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOST?: string
      TARGET_PATH?: string
      TERM?: string
      PORT?: string
    }
  }
}

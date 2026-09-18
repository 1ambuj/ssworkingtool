/** Official release URLs — never built from user input */
export const YOUTUBE_DOWNLOADER_RELEASES_PAGE =
  import.meta.env.VITE_YT_DOWNLOADER_RELEASES_URL ||
  'https://github.com/shruti01-dev/youtube-downloader/releases'

export const YOUTUBE_DOWNLOADER_WINDOWS_URL =
  import.meta.env.VITE_YT_DOWNLOADER_WIN_URL ||
  'https://github.com/shruti01-dev/youtube-downloader/releases/latest/download/YouTube-Downloader-Setup.exe'

/** Set in .env when Mac build is published */
export const YOUTUBE_DOWNLOADER_MAC_URL =
  import.meta.env.VITE_YT_DOWNLOADER_MAC_URL?.trim() || ''

export const YOUTUBE_DOWNLOADER_FEATURES = [
  'Download YouTube videos to your computer',
  'Choose common video qualities and formats',
  'Save files for offline viewing',
  'Simple desktop installer for Windows',
] as const

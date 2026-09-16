/** Official release URLs — never built from user input */
export const PDF_STUDIO_RELEASES_PAGE =
  import.meta.env.VITE_PDF_STUDIO_RELEASES_URL ||
  'https://github.com/shruti01-dev/pdf-pro-multiple-files/releases'

export const PDF_STUDIO_WINDOWS_URL =
  import.meta.env.VITE_PDF_STUDIO_WIN_URL ||
  'https://github.com/shruti01-dev/pdf-pro-multiple-files/releases/download/v1.0.0/SSA-PDF-Studio-Setup.exe'

/** Set in .env when Mac .dmg is published on GitHub Releases */
export const PDF_STUDIO_MAC_URL =
  import.meta.env.VITE_PDF_STUDIO_MAC_URL?.trim() || ''

export const PDF_STUDIO_FEATURES = [
  'Merge multiple PDFs into one file',
  'Split PDF by pages or ranges',
  'Convert PDF to Word (.docx)',
  'Convert PDF to Excel (.xlsx)',
  'Compress PDF for email and upload',
  'Rotate, reorder, and remove pages',
  'Batch process several files at once',
] as const

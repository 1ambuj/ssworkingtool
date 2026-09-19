/** Official project URLs — never built from user input */
export const PDF_REDACTION_REPO_URL =
  import.meta.env.VITE_PDF_REDACTION_REPO_URL ||
  'https://github.com/shruti01-dev/pdf-redaction/releases/latest/download/PDF-Redaction-Setup.exe'

export const PDF_REDACTION_RELEASES_PAGE = PDF_REDACTION_REPO_URL

/** Windows download opens the GitHub project page */
export const PDF_REDACTION_WINDOWS_URL = PDF_REDACTION_REPO_URL

/** Set in .env when Mac build is published */
export const PDF_REDACTION_MAC_URL =
  import.meta.env.VITE_PDF_REDACTION_MAC_URL?.trim() || ''

export const PDF_REDACTION_FEATURES = [
  'Permanently redact sensitive areas in PDFs',
  'Marked content cannot be recovered from the export',
  'Works fully offline on Windows',
  'Upload, mark, then export a new redacted file',
] as const

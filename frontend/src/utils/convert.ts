export function dateIsoStrToLocaleStr(iso: string, locale = 'en-GB'): string {
  return new Intl.DateTimeFormat(
    locale,
    { dateStyle: 'medium', timeStyle: 'long' },
  ).format(new Date(iso))
}

export function extractSrcFromEmbed(htmlTag: string): string {
  const srcMatch = htmlTag.match(/src=["'](.*?)["']/);
  return srcMatch?.[1] ?? '';
}

export const titleCase = (s: string): string =>
  s.replace(/^_*(.)|_+(.)/g, (s, c, d) => c ? c.toUpperCase() : ' ' + d.toUpperCase())

export const getKeyData = (str: string | undefined, position:number=0): string => {
    if (!str) return "";
    const constituents = str.split("::")
    if (position > constituents.length-1) return ""
  
    return titleCase(constituents[position])
}